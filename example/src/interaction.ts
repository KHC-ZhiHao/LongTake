import store from '@/store'
import { ElNotification } from 'element-plus'

export const showError = (message) => {
    ElNotification({
        type: 'error',
        title: '糟糕',
        message: message,
        position: 'bottom-right'
    })
}

export const showSuccess = (message) => {
    ElNotification({
        type: 'success',
        title: '成功',
        duration: 1500,
        message: message,
        position: 'bottom-right'
    })
}

export const showConfirm = (message: string, handler: (done: () => void) => void) => {
    store.commit('confirm/open', {
        message,
        handler
    })
}
