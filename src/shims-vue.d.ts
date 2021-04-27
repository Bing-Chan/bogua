/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue3-virtual-scroller'

// 对vue进行类型补充说明
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $api: void // 这里可以用$Api具体的类型代替any
//   }
// }


// import { ElMessage } from 'element-plus'
// declare module '@vue/runtime-core' {
//     interface ComponentCustomProperties {
//       $message: ElMessage
//     }
//   }
