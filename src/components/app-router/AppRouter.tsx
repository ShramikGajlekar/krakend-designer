import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../../pages/routes';

const AppRouter: React.FC = () => {
    return (
        <Switch>
            {routes.map((route) => (
                <Route key={route.id} exact={route.exact} path={route.path} component={route.component} />
            ))}
        </Switch>
    );
};

export default AppRouter;
