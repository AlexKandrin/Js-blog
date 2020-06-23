import {Component} from '../core/component'
import {apiService} from "../services/api.service";
import {TransformService} from "../services/transform.service";
import {renderPost} from "../templates/post.template";

export class PostsComponent extends Component {
	constructor(id, {loader}) {
		super(id);
		this.loader = loader
	}

	init() {
		this.$el.addEventListener('click', buttonHandler.bind(this))
	}

	async onShow() {
		this.loader.show()
		const fbData = await apiService.fetchPosts()
		this.loader.hide()
		let html = `<p class="center">Вы пока не создали никаких постов</p>`
		if (fbData) {
			let posts = TransformService.fbObjectToArray(fbData)
			html = posts.map(post => renderPost(post,{withButton:true})).join(' ')
		}

		this.$el.insertAdjacentHTML('afterbegin', html)
	}

	onHide() {
		this.$el.innerHTML = ''
	}
}

function buttonHandler(event) {
	// if(event.target.hasAttribute('data-id')){
	// 	console.log(event.target.getAttribute('data-id'))
	// }
	const $el = event.target
	const id = $el.dataset.id
	const title=$el.dataset.title

	if (id) {
		let favorites = JSON.parse(localStorage.getItem('favorites')) || []
		const candidate=favorites.find(elem=>elem.id===id)

		if (favorites.includes(candidate)) {
			//Удаляем элемент
			$el.textContent = 'Сохранить'
			$el.classList.add('button-primary')
			$el.classList.remove('button-danger')
			favorites = favorites.filter(item => item.id !== id)

		} else {
			//Добавляем элемент
			$el.classList.add('button-danger')
			$el.classList.remove('button-primary')
			favorites.push({id,title})
			$el.textContent = 'Удалить'
		}
		localStorage.setItem('favorites', JSON.stringify(favorites))
		console.log(favorites)
	}

}