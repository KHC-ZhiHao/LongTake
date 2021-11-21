import '@/styles/index.scss'
import 'element-plus/dist/index.css'
import 'codemirror-editor-vue3/dist/style.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/dracula.css'

import Codemirror from 'codemirror-editor-vue3'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'

import App from './app.vue'
import store from './store'
import router from './router'

export const vue = createApp(App)

vue.use(store)
vue.use(router)
vue.use(Codemirror)
vue.use(ElementPlus)

export const app = vue.mount('#app')
