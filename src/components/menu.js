export const menuItems = [
    {
        id: 2,
        label: 'menuitems.dashboard.list.sales',
        icon: "ri-dashboard-line",
        link: '/'
    },
    {
        id: 3,
        label: 'general.status',
        icon: "ri-pencil-ruler-2-line",
        middleware: 'status read',
        link: '/status'
    },
    {
        id: 4,
        label: 'general.roomType',
        icon: "ri-markup-line",
        middleware: 'roomType read',
        link: '/room-type'
    },
    {
        id: 5,
        label: 'general.room',
        middleware: 'room read',
        icon: "ri-bar-chart-line",
        link: '/room'
    },
    {
        id: 6,
        label: 'general.order',
        middleware: 'order read',
        icon: "ri-shopping-cart-2-line",
        link: '/order'
    },
    {
        id: 7,
        label: 'general.reservation',
        middleware: 'reservation read',
        icon: "ri-building-4-line",
        link: '/reservation'
    },
    {
        id: 8,
        label: 'general.user',
        middleware: 'user read',
        icon: "ri-shield-user-line",
        link: '/user'
    },
    {
        id: 9,
        label: 'general.role',
        middleware: 'role read',
        icon: "ri-folders-line",
        link: '/role'
    },
];

