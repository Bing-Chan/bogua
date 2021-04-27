<template>
<div class="bg">
    <div  id="stage" class="canvas-content"  v-show="false" ></div>
    <el-card class="box-card" >
    <template #header>
        <div class="card-header">
        <span>文王喊你来卜卦</span>
        </div>
    </template>
    <div class="text item">
        <div class="box" :class="isLoading ? 'loadding':''"> 
        </div>
    </div>
    <div class="text item"><el-button :loading="isLoading" class="btn" @click="handelGua" type="primary">开摇</el-button></div>
    </el-card>

    <el-dialog
        title="签词"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <br/><br/>
            <span v-html="`第${guaIndex}卦`"></span><br/><br/>
            <span v-html="`卦名:${guaName}`"></span><br/><br/>
            <span v-html="guaDes"></span><br/><br/>
        <template #footer>
            <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </template>
        </el-dialog>
</div>
</template>
<script lang="ts">
import { defineComponent ,inject, reactive, toRefs, onMounted, ref, watch  } from 'vue'
import { replaceUpToLo, delSemicolon, addSemicolon, isNumber } from '@/utils/public'
import { ElMessage, ElMessageBox } from "element-plus"
import Loading from '@/utils/loading'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import * as spritejs from 'spritejs'
import yaoGua from '@/gua/index'
export default defineComponent ({
    props: {
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
        },
        data: {
            type: Object,
            default: {}
        },
    },
    setup(props: any, context: any) {
       const store = useStore()
        const { params, query } = useRoute()
        const { loading } = Loading()
        const scroller = ref()
        const $api :any = inject('$api')
        let itemList: any = []
        const dataMap = reactive({
            itemList: Array(),
            moduleMessage: [],
            itemCommon: Object(),
            dictObj: {},
            guaName:String(),
            guaIndex:String(),
            guaDes:String(),
            dialogVisible:false,
            isLoading:false
        })
        const formTempalte: any = {
            enterpriseId: query.enterpriseId,
            orderId: query.orderId,
            showCaseNumberErr: '',
            PLRId: 0,
            DateTime: '',
            DateTimeType: '',
            HearingDepartment: '',
            CaseType: '',
            CaseNumber: '',
            InvolvedAmount: '',
            AmountInResult: false,
            InvolvedUnit: '',
            InvolvedCurrency: '',
            mType: '0',
            InvolvedPersons: [
            {
                InvolvedPerson: '',
                InvolvedPersonType: ''
            },
            {
                InvolvedPerson: '',
                InvolvedPersonType: ''
            }
            ],
            JudgmentResult: '',
            Comment: '',
        }
        const getGuaInfo = async () => {
            let params = {
                oId: query.orderId,
                enterpriseId: query.enterpriseId,
                CommentType: '2705'
            }

            let res = await $api.report.getLitigationCommon(params)
        }
        const anamit = async () =>{
            const container = document.querySelector('#stage');
            const {Scene, Sprite} = spritejs;
            const scene = new Scene({container, width: 600, height:600, mode: 'stickyTop'});
            const layer = scene.layer();
            const robot = new Sprite('../assets/1.jpg');
            robot.attr({
                anchor: [0, 0.5],
                pos: [100, 100],
                width:100,
                height:100
            });
            robot.animate([
                {rotate: 180},
            ], {
                duration: 500,
                iterations: Infinity,
            });
            layer.append(robot);
        }

       const kaiYao = ():void =>{
            let result = yaoGua();
            dataMap.guaName = result.name;
            dataMap.guaIndex= result.index;
            dataMap.guaDes= result.gua;
            dataMap.isLoading = false;
            dataMap.dialogVisible = true;
       }

       const handelGua = () => {
           var self = this;
            dataMap.isLoading=true;
            debugger
            setTimeout(() => {
                kaiYao()
            }, 2000);
       }
       const handleClose = (done) => { 
            done();
       }

        onMounted(() => {
            anamit();
        })
        return {
            ...toRefs(dataMap),
            scroller,
            getGuaInfo,
            handelGua,
            store,
            handleClose
        }
    }
})
</script>
<style lang="scss" scoped>
$boxHeight:170px; //浅线条颜

.bg{
     width:100%;
     height: 100%;
    .canvas-content{
     width: 600px;
     height: 600px;
     margin: 0 auto;
    }

}

  .box-card {
    width: 80%;
    margin:0 auto;
    margin-top:20px;
    .card-header{
        font-weight: bold;
        font-size: 20px;
        color: #6289db;
    }
    .text {
            font-size: 14px;
        }
    .btn{
         width: 120px;
         font-size: 14px;
    }
        
    .item {
            padding: 20px 20px;
            & .box{
                width: $boxHeight;
                height: $boxHeight;
                // border: solid 1px #6289db;
                margin: 0 auto;
                background-image: url(data:image/png;base64,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);
                line-height: $boxHeight;
            }
            .loadding{
                animation: rotate 1s linear infinite;/*详情请看animation属性*/
            }
            @keyframes rotate {
                from{ transform:rotate(0deg)}
                from{ transform:rotate(360deg)}
            }
        }

  }

</style>