export interface RootObject<T>{
  code: number
  msg: string
  data: T
}
export interface ModuleList<T> {
	[index:number]: T
}
export interface ModuleInfo<T> {
    total: number
    Columns: T[]
    Items: T[]
    isReadonly: boolean
    moduleId: string
    moduleName: string
    moduleParentId: string
    orderType: string
    sort: number
}