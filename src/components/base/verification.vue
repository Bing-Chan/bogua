<template>
<DynamicScrollerItem
	:item="item"
	:active="active"
	:data-index="index">
	<div class="pub-form-mod pub-form-civil">
		<div class="pub-form-hd">
			<h4 class="title">信息核实</h4>
		</div>
		<div class="pub-form-bd">
			<div class="pub-form-item pub-form-border" v-for="(item, i) in verifyObj.otherCheckItems" :key="i">
				<template v-if="item.item !== '英文名称'">
					<div class="pub-form-col">
						<span class="label">{{item.item}}</span>
						<div class="content">
							<span class="txt">{{item.sourceContent}}</span>
						</div>
					</div>
					<div class="pub-form-col">
						<el-select v-model="item.itemResult">
							<el-option
								v-for="(ele, index) in checkList" :key="index" :label="ele.name" :value="ele.value">
							</el-option>
						</el-select>
					</div>
					<div class="pub-form-col">
						<el-input type="text" v-model="item.verifyContent" :placeholder="`${item.item}核名后的信息`"/>
						<i :class="{'el-icon-arrow-right': !item.toggle || item.toggle === 'undefined', 'el-icon-arrow-down': item.toggle === true,'position-in': true}" @click="toggle(item)"></i>
					</div>
					<div class="pub-form-col w100" v-show="item.toggle">
						<span class="label">备注</span>
						<div class="content">
							<el-input type="text" v-model="item.itemComment" :placeholder="`${item.item}的备注信息`"/>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="pub-form-col">
						<span class="label">{{item.item}}</span>
						<div class="content">
							<span class="txt">{{item.sourceContent}}</span>
						</div>
					</div>
					<div class="pub-form-col">
						<el-select v-model="item.itemResult">
							<el-option
								v-for="(ele, index) in checkList" :key="index" :label="ele.name" :value="ele.value">
							</el-option>
						</el-select>
					</div>
					<div class="pub-form-col">
						<el-input type="text" v-model="item.verifyContent" class="input-with-select" :placeholder="`${item.item}核名后的信息`">
							<el-select v-model="verifyObj.enNameAttribute" slot="prepend" placeholder="请选择">
								<el-option 
									v-for="item in verifyObj.enNameAttribute"
									:key="item"
									:label="item"
									:value="item">
								</el-option>
							</el-select>
						</el-input>
						<i :class="{'el-icon-arrow-right': !item.toggle || item.toggle === 'undefined', 'el-icon-arrow-down': item.toggle === true,'position-in': true}" @click="toggle(item)"></i>
					</div>
					<div class="pub-form-col w100">
						<span class="label">信息来源</span>
						<div class="content">
							<el-checkbox-group v-model="verifyObj.enNameSource">
								<el-checkbox-button v-for="item in verifyObj.enNameSource" :key="item" :label="item"></el-checkbox-button>
							</el-checkbox-group>
						</div>
					</div>
					<div class="pub-form-col w100" v-show="item.toggle">
						<span class="label">备注</span>
						<div class="content">
							<el-input type="text" v-model="item.itemComment" :placeholder="`${item.item}备注`" />
						</div>
					</div>
				</template>
			</div>
			<div class="pub-form-item pub-form-border">
				<div class="pub-form-col w100" style="flex:auto">
					<span class="label">微博</span>
					<div class="content">
						<el-input type="text" v-model="verifyObj.weibo" placeholder="微博信息"/>
					</div>
				</div>
				<div class="pub-form-col w100" style="flex:auto">
					<span class="label">微信</span>
					<div class="content">
						<el-input type="text" v-model="verifyObj.wechat" placeholder="微信信息"/>
					</div>
				</div>
			</div>
		</div>
		<phoneCheckItems :verifyObj="verifyObj" :dictObj="dictObj" />
		<div class="pub-form-bd">
			<div class="pub-form-item pub-form-border">
				<div class="pub-form-col w100" style="flex: auto;">
					<span class="label">企业信息备注</span>
					<div class="content">
						<el-input type="textarea" v-model="verifyObj.comment" placeholder="多行输入"></el-input>
						<i class="pub-form-icon el-icon-info add-icon-color"></i>
					</div>
				</div>
				<div class="pub-form-col w100" style="flex: auto;">
					<span class="label">调查经过</span>
					<div class="content">
						<el-input type="textarea" v-model="verifyObj.surveyHistory" placeholder="调查经过"></el-input>
					</div>
				</div>
				<div class="pub-form-col w100" style="flex: auto;">
					<span class="label"></span>
					<div class="content label-flex">
						<div class="label-box" v-for="item in labelList" :key="item.name">
							<span>{{item.name}}</span>
							<span :class="{'circle': true,'disabled': item.value == 0}">{{item.value}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pub-form-fd">
			<el-button class="pub-button-space">取消</el-button>
			<el-button class="pub-button-space" type="primary">保存</el-button>
		</div>
	</div>
</DynamicScrollerItem>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs ,onBeforeMount, inject } from 'vue'
export default defineComponent ({
	props: {
		columns: {
			type: Array,
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
	setup() {
        const $api :any = inject('$api')
		const dataMap = reactive({
			checkList: [
                {
                    name: '请选择',
                    value: ''
                },{
                    name: '正确',
                    value: '0'
                },{
                    name: '不正确',
                    value: '1'
                },{
                    name: '未核实到',
                    value: '2'
                },{
                    name: '不完整',
                    value: '3'
                },{
                    name: '原名称',
                    value: '4'
                },{
                    name: '见备注',
                    value: '5'
                }
            ],
            labelList: [
                {
                    name: '铭牌',
                    value: '1'
                },{
                    name: '门牌路牌',
                    value: '0'
                },{
                    name: '周边交通',
                    value: '3'
                },{
                    name: '办公区域',
                    value: '2'
                },{
                    name: '办公外部区域',
                    value: '2'
                }
            ],
            verifyObj: {}
		})
        
        const toggle = (item: any) => {
            if (!item.toggle || item.toggle == 'undefined') {
                // this.$set(item, 'toggle', true)
            } else {
                // this.$set(item, 'toggle', false)
            }
        }
        const getVerification = async() => {
			const params = {
				enterpriseId: '602536089',
                orderId: '202103100008'
			}
            const res: any = await $api.verification.getEnterpriseCheckName(params)
        }
        onBeforeMount(() => {
			getVerification()
		})
		return {
			...toRefs(dataMap),
            getVerification,
            toggle
		}
	}
})
</script>
<style scoped>
>>>.input-with-select .el-input-group__prepend {
	width: 50px;
    background-color: #fff;
}
.width {
	width: calc(50% - 75px);
}
.label-flex {
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
</style>