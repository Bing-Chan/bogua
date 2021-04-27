import { InfoShowType } from '@/http/config'
export interface Headers{
    token: string
    contentType: string
}

export interface NetworkConfig{
    host?: string
    timeout?: number
    loading?: false
    errorShowType?: InfoShowType
    header?: {}
}