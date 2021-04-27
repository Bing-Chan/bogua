import { inject } from 'vue'
const $api :any = inject('$api')
const componentsData = {
    mod2702: async () => {
        const res: any = await $api.report.getLitigationList()
        console.log(res.data)
    }
}

export default { componentsData }