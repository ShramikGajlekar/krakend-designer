import Dashboard from './dashboard';

const routes = [
    {
        id: 1,
        path: ['/', '/dashboard'],
        exact: true,
        component: Dashboard,
    },
];

export default routes;
