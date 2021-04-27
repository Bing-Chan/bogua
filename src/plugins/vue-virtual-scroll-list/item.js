/**
 * item and slot component both use similar wrapper
 * we need to know their size change at any time
 */
/* eslint-disable */
import { ElTransfer } from 'element-plus'
import { defineComponent, h, onMounted, onUpdated, onBeforeUnmount, getCurrentInstance, toRefs, ref } from 'vue'
import { ItemProps, SlotProps } from './props'
/*
const Wrapper = defineComponent({
  setup(props, context) {
    console.log('this.horizontal', this.horizontal)
    const shapeKey = this.horizontal ? 'offsetWidth' : 'offsetHeight'
    const getCurrentSize = () => {
      return this.$el ? this.$el[shapeKey] : 0
    }
    const dispatchSizeChange = () => {
      this.$parent.$emit(this.event, this.uniqueKey, getCurrentSize(), this.hasInitial)
    }
    return {
      getCurrentSize,
      dispatchSizeChange
    }
    onMounted(() => {
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          dispatchSizeChange()
        })
        this.resizeObserver.observe(this.$el)
      }
    })
    onUpdated(() => {
      dispatchSizeChange()
    })
    onBeforeUnmount(() => {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
        this.resizeObserver = null
      }
    })
  },
})
*/

// wrapping for item
export const Item = defineComponent({
  name:'virtual-list-item', 
  // mixins: [Wrapper],
  props: ItemProps,
  setup(props, context) {
   
    const { proxy } = getCurrentInstance();
    let _this = getCurrentInstance()
    const elRef = ref()
    let resizeObserver = null

    console.log("parent", proxy)
    proxy.$emit(props.event)
    // tell parent current size identify by unqiue key
    const dispatchSizeChange = () => {
      // console.log("props", props)
      // console.log("root", context.attrs)
      context.emit(props.event, props.uniqueKey, 9, 'd')
    }
    
    onMounted(() => {
      if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver(entries => {
          dispatchSizeChange()
        });
        resizeObserver.observe(elRef.value)
      }
    
    })
    onUpdated(() => {
      // dispatchSizeChange()
    })
    onBeforeUnmount(() => {
      // if (this.resizeObserver) {
      //   this.resizeObserver.disconnect()
      //   this.resizeObserver = null
      // }
    })
    return {
      elRef,
      resizeObserver,
      dispatchSizeChange,
    }
  },
  render () {
    // console.log("this.elRef", this.event)
    // parent = this
    const { tag, component, extraProps = {}, index, scopedSlots = {}, uniqueKey } = this
    extraProps.source = this.source
    extraProps.index = index
    return h(tag, {
      key: uniqueKey,
      ref: "elRef",
      attrs: {
        role: 'listitem'
      }
    }, [h(component, 
       extraProps
    )])
  }
})

// wrapping for slot
export const Slot = defineComponent({
  name: 'virtual-list-slot',
  // mixins: [Wrapper],
  props: SlotProps,
  setup(props, context) {
    const {
      event,
      uniqueKey,
      tag,
      horizontal
    } = props
    const shapeKey = horizontal ? 'offsetWidth' : 'offsetHeight'
    const getCurrentSize = () => {
      console.log('getCurrentSize', getCurrentSize)
      return this.$el ? this.$el[shapeKey] : 0
    }
    // tell parent current size identify by unqiue key
    const dispatchSizeChange = () => {
      context.emit(event, uniqueKey, getCurrentSize(), this.hasInitial)
    }
    return {
      getCurrentSize,
      dispatchSizeChange
    }
    onMounted(() => {
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          dispatchSizeChange()
        })
        this.resizeObserver.observe(this.$el)
      }
    })
    onUpdated(() => {
      dispatchSizeChange()
    })
    onBeforeUnmount(() => {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
        this.resizeObserver = null
      }
    })
  },
  render () {
    const { tag, uniqueKey } = this
    return h(tag, {
      key: uniqueKey,
      attrs: {
        role: uniqueKey
      }
    }, this.$slots.default)
  }
})
