import { t } from '@/locale/index'
import { app } from '@/main'
import { ComponentPublicInstance, reactive, ref } from 'vue'
import { FlowRecord } from './repository/flow-record'

const status = reactive({
    memo: '',
    videoUrl: '',
    records: [] as FlowRecord[]
})

type RefComponent = {
    value: ComponentPublicInstance & { [key: string]: any }
}

type RefElement<E extends Element> = {
    value: E
}

export const self = {
    t,
    status,
    get route() {
        return app.$route
    },
    get router() {
        return app.$router
    },
    statusToToken() {
        let data = {
            memo: self.status.memo,
            records: self.status.records.map(e => e.export()),
            videoUrl: self.status.videoUrl
        }
        return encodeURIComponent(btoa(escape(JSON.stringify(data))))
    },
    tokenToStatus(token: string) {
        let { videoUrl, records, memo } = JSON.parse(unescape(atob(decodeURIComponent(token))))
        status.memo = memo
        status.videoUrl = videoUrl
        status.records = records.map(([name, desc, sTime, eTime]) => {
            let record = new FlowRecord()
            record.name = name
            record.desc = desc
            record.range = [sTime, eTime]
            return record
        })
    },
    data<T>(data: T) {
        return reactive(data as any) as T
    },
    ref<T>() {
        return ref(null) as T extends Element ? RefElement<T> : RefComponent
    },
    refs<T extends { value: any }>() {
        let items = [] as T['value'][]
        return {
            link: el => items.push(el),
            items
        }
    }
}
