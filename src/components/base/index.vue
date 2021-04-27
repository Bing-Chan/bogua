<template>
<DynamicScrollerItem
	:item="item"
	:active="active"
	:data-index="index">
	<div class="pub-form-mod pub-form-civil">
		<div class="pub-form-hd">
			<h4 class="title">
				基本信息
			</h4>
		</div>
		<div class="pub-form-bd">
			<div class="pub-form-item pub-form-border">
				<div class="pub-form-col-2" v-if="isHide('报告类型')">
					<span class="label">报告类型</span>
					<div class="content">
                        <div class="txt">{{source.reportType}}</div>
					</div>
				</div>
				<div class="pub-form-col-2" v-if="isHide('客户简称')">
					<span class="label">客户简称</span>
					<div class="content">
                        <div class="txt">{{source.customName}}</div>
					</div>
				</div>
				<div class="pub-form-col-2 w100" v-if="isHide('备注')">
					<span class="label">备注</span>
					<div class="content">
                        <div class="txt">{{source.remark}}</div>
					</div>
				</div>
				<div class="pub-form-col-2 w100" v-if="isHide('特殊要求')">
					<span class="label">特殊要求</span>
					<div class="content">
                        <div class="txt">{{source.special}}</div>
					</div>
				</div>
                <div class="pub-form-col-2 w100" v-if="isHide('重复报告记录')">
					<span class="label">重复报告记录</span>
					<div class="content">
                        <div class="txt" v-html="source.reportRecord"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</DynamicScrollerItem>
</template>
<script lang="ts">
import { Props } from 'element-plus/lib/el-transfer/src/transfer'
import { defineComponent, Prop, reactive, toRefs, Component, PropType } from 'vue'
import { Columns } from '@/model/moduleObject'
import { hideColumn } from '@/utils/module'
// export interface col {
// 	Items: null | [],
// 	columnName: string
// 	id: number,
// 	isHide: boolean,
// 	moduleId: string,
// 	pId: number,
// 	sort: number
// }
// export interface mod {
// 	id: number,
// 	name: string,
// 	component: Component,
// 	size: number,
// 	columns: Array<col>
// }
export default defineComponent ({
	props: {
		columns: {
			type: Array as PropType<Columns[]>,
			default: []
		},
		item: {
			type: Array,
			default: []
		},
        acitve: {
            type: Number,
            default: 0
        },
        index:{
            type: Number,
            default: 0
        }
	},
	setup(props, context) {
		const dataMap = reactive({
			source: {
				reportType: '信用报告(star 特殊)',
				customName: 'AZ',
				remark: '备注信息',
				special: '特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求特殊要求',
				reportRecord: '112009782-046:212015009     到期时间：2020/8/10 23:59:59     中国企业民事诉讼调查报告<br> 112009782-047:212015009     到期时间：2020/8/10 23:59:59     中国企业民事诉讼调查报告<br> 112009782-048:212015009     到期时间：2020/8/10 23:59:59     中国企业民事诉讼调查报告<br> 112009782-049:212015009     到期时间：2020/8/10 23:59:59     中国企业民事诉讼调查报告<br> 112009782-050:212015009     到期时间：2020/8/10 23:59:59     中国企业民事诉讼调查报告'
			}
			
		})
		const isHide = (name: string) => {
			return hideColumn(props.columns, name)
			// return !props.columns.filter(item => item.columnName === name)[0].isHide
		}
		return {
			...toRefs(dataMap),
			isHide
		}
	}
})
</script>