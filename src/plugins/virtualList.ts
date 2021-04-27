import virtualList from './vue-virtual-scroll-list'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'

export default function loadComponent(app: any) {
	app.use(virtualList)
}
