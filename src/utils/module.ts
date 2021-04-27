import { getModules, Columns } from '@/model/moduleObject'
export const hideColumn = (columns: Array<Columns>, name: string) => {
    return !columns.filter(item => item.columnName === name)[0].isHide
}

export const formatModule = (data: Array<getModules>) => {
    return data.reduce((acc: any, cur: any) => {
        if(cur.Items && cur.Items.length > 0) {
            cur = formatModule(cur.Items)
        } 
        return acc.concat(cur);
    }, []);
}