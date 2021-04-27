import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
// import i18n from '@/locales'
// import { useStore } from '@/store'
export default function loadComponent(app: any) {
  app.use(ElementPlus, { size: 'small', locale })
  // app.use(ElementPlus, { size: useStore().state.app.size, i18n: i18n.global.t })
  // app.use(ElButton)
  // app.use(ElSelect)
  // app.use(ElBreadcrumb)
  // app.use(ElBreadcrumbItem)
  // app.use(ElIcon)
  // app.use(ElDropdown)
  // app.use(ElDropdownMenu)
  // app.use(ElDropdownItem)
  // app.use(ElPopover)
  // app.use(ElForm)
  // app.use(ElFormItem)
  // app.use(ElLoading)
  // app.use(ElInput)
  // app.use(ElTooltip)
  // app.use(ElDialog)
  // app.use(ElScrollbar)
  // app.use(ElMenu)
  // app.use(ElSubmenu)
  // app.use(ElMenuItem)
  // app.config.globalProperties.$message = ElMessage
}
