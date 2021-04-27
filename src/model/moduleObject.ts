/**
 * @description 报告模块模型
 */
import { Component } from 'vue'
export interface ModuleItem {
	id: number,
	data: any,
	components: Modules
	dataIndex: number,
	lastIndex: boolean
}
export interface Columns {
	Items: null | [],
	columnName: string
	id: number,
	isHide: boolean,
	moduleId: string,
	pId: number,
	sort: number
}
export interface Modules {
	id: number,
	name: string,
	component: Component,
	// size: number,
	columns: Array<Columns>
}
export interface getModules {
	Items: [] | null,
	isReadonly: boolean,
	moduleId: string,
	moduleName: string,
	moduleParentId: string,
	orderType: string,
	sort: number,
	columns: Array<Columns>
}
