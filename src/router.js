import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Config from './config';

// import base controller
import MainIndexController from './controllers/Main/Index.controller';
import SearchIndexController from './controllers/Search/Index.controller';

const ApplicationRoutes = (props) => (
    <Switch>
        <Route exact path={`${Config.hostUrl}`} render={(controller_props) => <MainIndexController {...props} {...controller_props} />} />
        <Route exact path={`${Config.hostUrl}search`} render={(controller_props) => <SearchIndexController {...props} {...controller_props} />} />
    </Switch>
);

export default ApplicationRoutes;
