import { useStore } from '@/store'
const store = useStore()
export class asyncFun implements asyncFun {
    funcArr: Array<any>
    constructor(arr: Array<any>) {
        this.funcArr = arr
    }
    next(): void {
        if(this.funcArr.length > 0) {
            const fn = this.funcArr.shift()
            const {name, params, componentItem } = fn
            if(typeof fn === 'object'){
                store.dispatch(name, {params, componentItem})
            }
        } else {
            store.state.app.complete = true
        }
        
    }
    run(): void {
        this.next()
    }
}