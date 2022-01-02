import Vue from 'vue'
import VueRouter from 'vue-router'
import Horsens from "@/views/Horsens";

Vue.use(VueRouter)

const routes = [
    {
        path: '/horsens',
        name: 'Horsens',
        component: Horsens
    },
    {
        path: '/aarhus',
        name: 'Aarhus',
        component: () => import("@/views/Aarhus")
    },
    {
        path: '/copenhagen',
        name: 'Copenhagen',
        component: () => import("@/views/Copenhagen")
    }
]

const router = new VueRouter({
    routes
})

export default router
