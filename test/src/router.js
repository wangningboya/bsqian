import React from 'react';
import { Route, Switch,Redirect, routerRedux,  } from 'dva/router';
import IndexPage from './routes/IndexPage';
import App from './routes/app'

import dynamic from 'dva/dynamic' // 路由按需加载
const { ConnectedRouter } = routerRedux

const Routers= function({ history,app }) {
const routes = [
  {
    path: '/login',
    models: () => [import('./models/login')],
    component: () => import('./routes/login/login'),
  },{
    path: '/register',
    models: () => [import('./models/register')],
    component: () => import('./routes/login/register'),
  },{
    path: '/index',
    models: () => [import('./models/home')],
    component: () => import('./routes/home/home'),
  },{
    path: '/user',
    models: () => [import('./models/user')],
    component: () => import('./routes/user/user'),
  },{
    path: '/demand',
    models: () => [import('./models/demand')],
    component: () => import('./routes/demand/demand'),
  },{
    path: '/demand/:id',
    models: () => [import('./models/demandprofile')],
    component: () => import('./routes/demand/demandprofile'),
  },{
    path: '/issue',
    models: () => [import('./models/issue')],
    component: () => import('./routes/issue/issue'),
  },{
    path: '/issue/:id',
    models: () => [import('./models/issueprofile')],
    component: () => import('./routes/issue/issueprofile'),
  },{
    path: '/project',
    models: () => [import('./models/project')],
    component: () => import('./routes/project/project'),
  },
  
]
  return (
    <ConnectedRouter history={history}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/index" />)} />
            {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          </Switch>
        </App>
    </ConnectedRouter>
  );
}

export default Routers;
