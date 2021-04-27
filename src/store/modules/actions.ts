
import {
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
    Module
  } from 'vuex'
import { RootState } from '@/store'
import { Modules, ModuleItem } from '@/model/moduleObject'
import { LitigationList } from '@/model/reportObject'
import { asyncFun } from '@/utils/async'
import api from '@/http/api'
import { useRoute } from 'vue-router'
import { CHANGE_DATA,FUNCLIST,UPDATE_DATA,CHANGE_DIC_DATA } from '@/store/modules/mutations-type'

/* 
export { AppState }

export interface AppState {
    device: DeviceType
    sidebar: {
      opened: boolean
      withoutAnimation: boolean
    }
    language: string
    size: string
  }

export type AppStore<S = AppState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
& {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
};
*/
export interface AppState {
  data: Array<any>,
  async: Array<Function>,
  complete: Boolean,
  dictObj: Object,
}

const state: AppState = {
    data: [],
    async: [],
    complete: false,
    dictObj: {},
}

const getter = {
  getDataLength: 0
}
const mutations = {
  [CHANGE_DATA]: (state, payload) => {
      state.data = state.data.concat(payload.data)
      if (!state.async.done) {
        state.async.next()
      }
    },
  [FUNCLIST]: (state, payload) => {
      state.async = payload
      if(state.async.run){
      state.async.run()
      }
    },
  [UPDATE_DATA]: (state, payload) => {
      if (payload.type === 'del') {
        state.data.splice(payload.index, 1)
      } else if (payload.type === 'add') {
        state.data.splice(payload.index+1, 0 , payload.data)
      }
      let dataIndex = 1
      let filterArr = state.data.filter((ele: any) => {
        return ele.components.name === payload.data.components.name
      })
      state.data.forEach((item: any, i: number) => {
        if (item.components.name === payload.data.components.name) {
          item.dataIndex = dataIndex++
          item.lastIndex = dataIndex === filterArr.length + 1 ? true : false
        }
      });
    },
    [CHANGE_DIC_DATA]: (state, payload) => {
      state.dictObj = payload.dictObj
    }
}
const actions = {
}

export const store: Module<AppState, RootState> = {
    state,
    mutations,
    actions
}