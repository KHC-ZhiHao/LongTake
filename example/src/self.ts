import { app } from '@/main'
import { ComponentPublicInstance, reactive, ref } from 'vue'

type RefComponent = {
    value: ComponentPublicInstance & { [key: string]: any }
}

type RefElement<E extends Element> = {
    value: E
}

export const self = {
    get route() {
        return app.$route
    },
    get router() {
        return app.$router
    },
    data<T>(data: T) {
        return reactive(data as any) as T
    },
    ref<T>() {
        return ref(null) as T extends Element ? RefElement<T> : RefComponent
    }
}
