import {Component} from "../core/component";

export class ModalComponent extends Component{
	constructor(id) {
		super(id);
	}

	init(){
		this.$el.addEventListener('click',modalHandler.bind(this))
	}
}

function modalHandler() {
this.hide()
}