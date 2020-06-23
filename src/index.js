import {HeaderComponent} from '../src/components/header.component'
import {NavigationComponent} from "./components/navigation.component";
import {FavoriteComponent} from "./components/favorite.component";
import {PostsComponent} from "./components/posts.component";
import {CreateComponent} from "./components/create.component";
import {LoaderComponent} from "./components/loader.component";
import { ModalComponent} from "./components/modal.component";

new HeaderComponent('header')

const navigation=new NavigationComponent('navigation')
const loader=new LoaderComponent('loader')

const favorite=new FavoriteComponent('favorite',{loader})
const posts=new PostsComponent('posts',{loader:loader})
const create=new CreateComponent('create')
const modal=new ModalComponent('modal')

navigation.registerTabs([
	{name:'favorite',component:favorite},
	{name:'posts',component:posts},
	{name:'create',component:create},
])

