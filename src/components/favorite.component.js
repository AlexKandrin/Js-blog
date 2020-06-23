import {Component} from '../core/component'
import {apiService} from "../services/api.service";
import {renderPost} from "../templates/post.template";

export class FavoriteComponent extends Component {
	constructor(id, options) {
		super(id);
		this.loader = options.loader
	}

	init() {
		this.$el.addEventListener('click', linkClickHandler.bind(this))
	}

	onShow() {
		const favorites = JSON.parse(localStorage.getItem('favorites'))
		const html = renderList(favorites)
		this.$el.insertAdjacentHTML('afterbegin', html)
	}

	onHide() {
		this.$el.innerHTML = ''
	}
}

function renderList(list = []) {
	if (list && list.length) {
		return `
		<ul>
		${list.map(item => {
			return `<li class="li-fav">
	<a class="js-link" href='#' data-id="${item.id}" >${item.title}</a>
	<button class="button-round button-small button-primary"
	data-deleteId="${item.id}">Удалить пост из базы</button>
			</li>`
		}).join(' ')}
</ul>
		`
	} else {
		return `<p class="center">В избранном пока нет постов</p>`
	}
}

async function linkClickHandler(event) {
	event.preventDefault()

	if (event.target.classList.contains('js-link')) {
		this.$el.innerHTML = ''
		this.loader.show()
		const post = await apiService.fetchPostById(event.target.dataset.id)
		this.loader.hide()
		const html = renderPost(post, {withButton: false})
		this.$el.insertAdjacentHTML('afterbegin', html)
	}
	else{
		if (event.target.dataset.deleteid) {
			this.$el.innerHTML = ''
			this.loader.show()

			await apiService.deletePostById(event.target.dataset.deleteid)

			let favorites = JSON.parse(localStorage.getItem('favorites'))
			favorites = favorites.filter(post => post.id !== event.target.dataset.deleteid)
			localStorage.setItem('favorites', JSON.stringify(favorites) || [])
			const html = renderList(favorites)
			this.$el.insertAdjacentHTML('afterbegin', html)

			this.loader.hide()
		}
	}
}



