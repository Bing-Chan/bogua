import VueVirtualScroller from 'vue3-virtual-scroller'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'

export default function loadComponent(app: any) {
	app.use(VueVirtualScroller)
}

