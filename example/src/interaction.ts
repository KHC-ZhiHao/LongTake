import store from '@/store'
import { t } from '@/locale'
import { parseMessage } from '@/utils/parse'
import { ElNotification } from 'element-plus'

export const showError = (message) => {
    ElNotification({
        type: 'error',
        title: t('糟糕'),
        message: parseMessage(message),
        position: 'bottom-right'
    })
}

export const showSuccess = (message) => {
    ElNotification({
        type: 'success',
        title: t('成功'),
        duration: 1500,
        message: parseMessage(message),
        position: 'bottom-right'
    })
}

export const showConfirm = (message: string, handler: (done: () => void) => void) => {
    store.commit('confirm/open', {
        message,
        handler
    })
}
