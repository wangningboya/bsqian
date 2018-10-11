import React from 'react';
import { Router, Route, Switch,Redirect, routerRedux,  } from 'dva/router';
import IndexPage from './routes/IndexPage';
import App from './routes/app'

import dynamic from 'dva/dynamic' // 路由按需加载
const { ConnectedRouter } = routerRedux

const Routers= function({ history,app }) {
// const IndexPage = dynamic({
//     app,
//     component: () => import('./routes/IndexPage')
// })
// const Login = dynamic({
//   app,
//   component: () => import('./routes/login/login')
// })
// const Index = dynamic({
//   app,
//   component: () => import('./routes/index/index')
// })
// const User = dynamic({
//   app,
//   component: () => import('./routes/user/user')
// })
const routes = [
  {
    path: '/login',
    models: () => [import('./models/login')],
    component: () => import('./routes/login/login'),
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
  },
  
]
  return (
    <ConnectedRouter history={history}>
        <App>
          <Switch>
            {/* <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Index} />
            <Route path="/index" exact component={Index} />
            <Route path="/user" exact component={User} />
            <Route path="*" render={() => <Redirect to="login" />} /> */}

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
