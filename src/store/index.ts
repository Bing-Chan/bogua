import { createStore } from 'vuex'
import { store as app, AppState } from '@/store/modules/actions'

export interface RootState {
  app: AppState
}

export const store = createStore({
  modules: {
    app
  }
})

export function useStore()  {
  return store
}
