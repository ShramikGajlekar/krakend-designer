import Dashboard from './dashboard';
import { ServiceConfigPage } from './service-configuration';

const routes = [
    {
        id: 1,
        path: ['/', '/dashboard'],
        exact: true,
        component: Dashboard,
    },
    {
        id: 1,
        path: ['/service-configuration'],
        exact: true,
        component: ServiceConfigPage,
    },
];

export default routes;
