import Dashboard from './dashboard';
import { ServiceConfigPage } from './service-configuration';
import { ServiceDiscoveryPage } from './service-discovery';
import { EndpointConfigPage } from './endpoints';

const routes = [
    {
        id: 1,
        path: ['/', '/dashboard'],
        exact: true,
        component: Dashboard,
    },
    {
        id: 2,
        path: ['/service-configuration'],
        exact: true,
        component: ServiceConfigPage,
    },
    {
        id: 3,
        path: ['/service-discovery'],
        exact: true,
        component: ServiceDiscoveryPage,
    },
    {
        id: 4,
        path: ['/endpoints/:endpointIndex'],
        exact: true,
        component: EndpointConfigPage,
    },
];

export default routes;
