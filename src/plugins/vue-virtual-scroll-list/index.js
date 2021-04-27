/**
 * virtual list default component
 */

// import Vue from 'vue'
import { defineComponent, reactive, toRefs, onBeforeMount, onMounted, onBeforeUnmount, h ,watch, ref, getCurrentInstance } from 'vue'
// import { defineComponent ,inject, reactive, toRefs, onBeforeMount,  } from 'vue'
import Virtual from './virtual'
import { Item, Slot } from './item'
import { VirtualProps } from './props'
import App from '@/App.vue'
import mitt from './mitt'
/* eslint-disable */
const EVENT_TYPE = {
  ITEM: 'item_resize',
  SLOT: 'slot_resize'
}
const SLOT_TYPE = {
  HEADER: 'header', // string value also use for aria role attribute
  FOOTER: 'footer'
}
const VirtualList = defineComponent({
  name: 'virtual-list',
  props: VirtualProps,

  // data () {
  //   return {
  //     range: null
  //   }
  // },

  
  emits: [EVENT_TYPE.ITEM],
  setup (props, context) {
    const { 
      dataKey,
      dataSources,
      dataComponent,
      keeps,
      extraProps,
      estimateSize,
      direction,
      start,
      offset,
      topThreshold,
      bottomThreshold,
      pageMode,
      rootTag,
      wrapTag,
      wrapClass,
      wrapStyle,
      itemTag,
      itemClass,
      itemClassAdd,
      itemStyle,
      headerTag,
      headerClass,
      headerStyle,
      footerTag,
      footerClass,
      footerStyle,
      itemScopedSlots } =  props

    let virtual = null
    const { proxy } = getCurrentInstance();
    console.log('proxy', proxy)
    const dataMap = reactive({
      isHorizontal: direction === 'horizontal',
      directionKey : direction === 'horizontal' ? 'scrollLeft' : 'scrollTop',
      range: null,
      item_resize: (id, size) => {
        console.log("item_resize")
      }
    })
    
    // this.isHorizontal = this.direction === 'horizontal'
    // this.directionKey = this.isHorizontal ? 'scrollLeft' : 'scrollTop'

    // this.installVirtual()
    console.log("EVENT_TYPE.ITEM", EVENT_TYPE.ITEM)
    // listen item size change
    // proxy.$el.$on(EVENT_TYPE.ITEM, onItemResized)
      // document.addEventListener(EVENT_TYPE.ITEM, onItemResized)
    const item_resize = (id, size) => {
      console.log("item_resize")
    }
    // // listen slot size change
    // if (this.$slots.header || this.$slots.footer) {
    //   this.$on(EVENT_TYPE.SLOT, onSlotResized)
    // }

    // get item size by id
    const getSize = (id) => {
      return virtual.sizes.get(id)
    }

    // get the total number of stored (rendered) items
    const getSizes = () => {
      return virtual.sizes.size
    }

    // return current scroll offset
    const getOffset = () => {
      if (pageMode) {
        return document.documentElement[dataMap.directionKey] || document.body[dataMap.directionKey]
      } else {
        const { root } = ref(null)
        return root ? Math.ceil(root[dataMap.directionKey]) : 0
      }
    }

    // return client viewport size
    const getClientSize = () => {
      const key = dataMap.isHorizontal ? 'clientWidth' : 'clientHeight'
      if (pageMode) {
        return document.documentElement[key] || document.body[key]
      } else {
        const { root } = ref(null)
        return root ? Math.ceil(root[key]) : 0
      }
    }

    // return all scroll size
    const getScrollSize = () => {
      const key = dataMap.isHorizontal ? 'scrollWidth' : 'scrollHeight'
      if (pageMode) {
        return document.documentElement[key] || document.body[key]
      } else {
        const { root } = ref(null)
        return root ? Math.ceil(root[key]) : 0
      }
    }

    // set current scroll position to a expectant offset
    const scrollToOffset = (offset) => {
      if (pageMode) {
        document.body[dataMap.directionKey] = offset
        document.documentElement[dataMap.directionKey] = offset
      } else {
        const { root } = ref(null)
        if (root) {
          root[directionKey] = offset
        }
      }
    }

    // set current scroll position to a expectant index
    const scrollToIndex = (index) => {
      // scroll to bottom
      if (index >= dataSources.length - 1) {
        scrollToBottom()
      } else {
        const offset = virtual.getOffset(index)
        scrollToOffset(offset)
      }
    }

    // set current scroll position to bottom
    const scrollToBottom = () => {
      const { shepherd } = ref(null)
      // const { shepherd } = this.$refs
      if (shepherd) {
        const offset = shepherd[dataMap.isHorizontal ? 'offsetLeft' : 'offsetTop']
        scrollToOffset(offset)

        // check if it's really scrolled to the bottom
        // maybe list doesn't render and calculate to last range
        // so we need retry in next event loop until it really at bottom
        setTimeout(() => {
          if (getOffset() + getClientSize() < getScrollSize()) {
            scrollToBottom()
          }
        }, 3)
      }
    }

    // when using page mode we need update slot header size manually
    // taking root offset relative to the browser as slot header size
    const updatePageModeFront = () => {
      const { root } = ref(null)
      if (root) {
        const rect = root.getBoundingClientRect()
        const { defaultView } = root.ownerDocument
        const offsetFront = dataMap.isHorizontal ? (rect.left + defaultView.pageXOffset) : (rect.top + defaultView.pageYOffset)
        virtual.updateParam('slotHeaderSize', offsetFront)
      }
    }

    // reset all state back to initial
    const reset = () => {
      virtual.destroy()
      scrollToOffset(0)
      installVirtual()
    }

    // ----------- public method end -----------

    const installVirtual = () => {
      virtual = new Virtual({
        slotHeaderSize: 0,
        slotFooterSize: 0,
        keeps: keeps,
        estimateSize: estimateSize,
        buffer: Math.round(keeps / 3), // recommend for a third of keeps
        uniqueIds: getUniqueIdFromDataSources()
      }, onRangeChanged)
      // sync initial range
      dataMap.range = virtual.getRange()
    }

    const getUniqueIdFromDataSources = () => {
      const { dataKey, dataSources } = props
      // const dataKey
      return dataSources.map((dataSource) => typeof dataKey === 'function' ? dataKey(dataSource) : dataSource[dataKey])
    }

    // event called when each item mounted or size changed
    const onItemResized = (id, size) => {
      console.log("xxxxxxxxxxxxxxxxxxxe")
      console.log("onItemResized", id, size)
      virtual.saveSize(id, size)
      context.emit('resized', id, size)
    }

    // event called when slot mounted or size changed
    const onSlotResized = (type, size, hasInit) => {
      if (type === SLOT_TYPE.HEADER) {
        virtual.updateParam('slotHeaderSize', size)
      } else if (type === SLOT_TYPE.FOOTER) {
        virtual.updateParam('slotFooterSize', size)
      }

      if (hasInit) {
        virtual.handleSlotSizeChange()
      }
    }

    // here is the rerendering entry
    const onRangeChanged = (range) => {
      dataMap.range = range
    }

    const onScroll = (evt) => {
      console.log("onscroll")
      const offset = getOffset()
      const clientSize = getClientSize()
      const scrollSize = getScrollSize()

      // iOS scroll-spring-back behavior will make direction mistake
      if (offset < 0 || (offset + clientSize > scrollSize + 1) || !scrollSize) {
        return
      }

      virtual.handleScroll(offset)
      emitEvent(offset, clientSize, scrollSize, evt)
    }

    // emit event in special position
    const emitEvent = (offset, clientSize, scrollSize, evt) => {
      context.emit('scroll', evt, virtual.getRange())

      if (virtual.isFront() && !!dataSources.length && (offset - topThreshold <= 0)) {
        context.emit('totop')
      } else if (virtual.isBehind() && (offset + clientSize + bottomThreshold >= scrollSize)) {
        context.emit('tobottom')
      }
    }

    // get the real render slots based on range data
    // in-place patch strategy will try to reuse components as possible
    // so those components that are reused will not trigger lifecycle mounted
    const getRenderSlots = (h) => {
      const slots = []
      const { start, end } = dataMap.range
      const { dataSources, dataKey, itemClass, itemTag, itemStyle, extraProps, dataComponent, itemScopedSlots } = props
      for (let index = start; index <= end; index++) {
        const dataSource = dataSources[index]
        if (dataSource) {
          const uniqueKey = typeof dataKey === 'function' ? dataKey(dataSource) : dataSource[dataKey]
          if (typeof uniqueKey === 'string' || typeof uniqueKey === 'number') {
            slots.push(h(Item, {
              index,
              tag: itemTag,
              event: EVENT_TYPE.ITEM,
              horizontal: dataMap.isHorizontal,
              uniqueKey: uniqueKey,
              source: dataSource,
              extraProps: extraProps,
              component: dataComponent,
              scopedSlots: itemScopedSlots,
              directionKey: dataMap.directionKey,
              style: itemStyle,
              class: `${itemClass}${itemClassAdd ? ' ' + itemClassAdd(index) : ''}`,
              emits: [EVENT_TYPE.ITEM],
            }))
          } else {
            console.warn(`Cannot get the data-key '${dataKey}' from data-sources.`)
          }
        } else {
          console.warn(`Cannot get the index '${index}' from data-sources.`)
        }
      }
      console.log(slots)
      return slots
    }
   
    watch(dataSources.length, () => {
      console.log("watchhandleDataSourcesChange")
      virtual.updateParam('uniqueIds', getUniqueIdFromDataSources())
      virtual.handleDataSourcesChange()
    })
  
    watch(keeps, (newValue) => {
        virtual.updateParam('keeps', newValue)
        virtual.handleSlotSizeChange()
    })
  
    watch(start, (newValue) => {
      scrollToIndex(newValue)
    })
  
    watch(offset, (newValue) => {
      scrollToOffset(newValue)
    })

    onBeforeMount(() => {
      installVirtual()
    })

    onMounted(() => {
      // set position
      if (start) {
        scrollToIndex(start)
      } else if (offset) {
        scrollToOffset(offset)
      }
  
      // in page mode we bind scroll event to document
      if (pageMode) {
        updatePageModeFront()
  
        document.addEventListener('scroll', onScroll, {
          passive: false
        })
      }
    })

    onBeforeUnmount(() => {
      virtual.destroy()
      if (pageMode) {
        document.removeEventListener('scroll', onScroll)
      }
    })
    return {
      virtual,
      ...toRefs(dataMap),
      installVirtual,
      getUniqueIdFromDataSources,
      onItemResized,
      onSlotResized,
      onRangeChanged,
      onScroll,
      emitEvent,
      getRenderSlots,
      item_resize
      
    }
  },

  // // set back offset when awake from keep-alive
  // activated () {
  //   this.scrollToOffset(this.virtual.offset)
  // }


  // render function, a closer-to-the-compiler alternative to templates
  // https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
  render (props) {
    const { header, footer } = this.$slots
    const { padFront, padBehind } = this.range
    const { isHorizontal, pageMode, rootTag, wrapTag, wrapClass, wrapStyle, headerTag, headerClass, headerStyle, footerTag, footerClass, footerStyle } = this
    const paddingStyle = { padding: isHorizontal ? `0px ${padBehind}px 0px ${padFront}px` : `${padFront}px 0px ${padBehind}px` }
    const wrapperStyle = wrapStyle ? Object.assign({}, wrapStyle, paddingStyle) : paddingStyle
    console.log('rootTag', rootTag)
    return h(rootTag, {
      ref: 'root',
      on: {
        '&scroll': !pageMode && onScroll
      }
    }, [
      // header slot
      header ? h(Slot, {
        class: headerClass,
        style: headerStyle,
        props: {
          tag: headerTag,
          event: EVENT_TYPE.SLOT,
          uniqueKey: SLOT_TYPE.HEADER
        }
      }, header) : null,

      // main list
      h(wrapTag, {
        class: wrapClass,
        attrs: {
          role: 'group'
        },
        style: wrapperStyle
      }, this.getRenderSlots(h)),

      // footer slot
      footer ? h(Slot, {
        class: footerClass,
        style: footerStyle,
        props: {
          tag: footerTag,
          event: EVENT_TYPE.SLOT,
          uniqueKey: SLOT_TYPE.FOOTER
        }
      }, footer) : null,

      // an empty element use to scroll to bottom
      h('div', {
        ref: 'shepherd',
        style: {
          width: isHorizontal ? '0px' : '100%',
          height: isHorizontal ? '100%' : '0px'
        }
      })
    ])
  }
})

export default VirtualList
