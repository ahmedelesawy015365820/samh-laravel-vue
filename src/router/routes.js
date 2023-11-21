import store from '@/state/store'
import auth from "../middleware/auth";
import guest from "../middleware/guest";

export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/account/login'),
        meta: {
            middleware: [guest]
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/pages/account/register'),
        meta: {
            middleware: [guest]
        },
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/pages/dashboard/sales/index'),
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/status',
        name: 'status',
        component: () => import('../views/pages/status/index'),
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/room-type',
        name: 'roomType',
        component: () => import('../views/pages/roomType/index'),
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/room',
        name: 'room',
        component: () => import('../views/pages/room/index'),
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../views/pages/user/index'),
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/role',
        name: 'role',
        component: () => import('../views/pages/role/index'),
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('../views/pages/order/index'),
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/reservation',
        name: 'reservation',
        component: () => import('../views/pages/reservation/index'),
        meta: {
            middleware: [auth]
        }
    },
]