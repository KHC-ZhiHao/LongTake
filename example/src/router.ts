import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/:pathMatch(.*)*',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '',
        component: () => import('@/views/main.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/home.vue')
            },
            {
                path: 'demo/:name',
                name: 'demo',
                component: () => import('@/views/demo.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
