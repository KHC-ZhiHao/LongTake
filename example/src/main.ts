import '@/styles/index.scss'
import '@/styles/theme.scss'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'

import App from './app.vue'
import i18n from './locale'
import store from './store'
import router from './router'

export const vue = createApp(App)

vue.use(i18n)
vue.use(store)
vue.use(router)
vue.use(ElementPlus, {
    i18n: i18n.global.t
})

export const app = vue.mount('#app')
