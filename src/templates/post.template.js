export function renderPost(post, options = {}) {
	const tag = post.type === 'note'
		? `<li class="tag tag-blue tag-rounded">Заметка</li>`
		: `<li class="tag tag-rounded">Новость</li>`

	const favorites=JSON.parse(localStorage.getItem('favorites')) || []
	const candidate=favorites.find(elem=>elem.id===post.id)

	const button = favorites.includes(candidate)
		? `<button type="button" class='button-round button-small button-danger' data-id="${post.id}" data-title="${post.title}">Удалить</button>`
		: `<button type="button" class='button-round button-small button-primary' data-id="${post.id}"data-title="${post.title}">Сохранить</button>`

	return `
	    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${options.withButton ? button : ''}
      </div>
    </div>
	`
}