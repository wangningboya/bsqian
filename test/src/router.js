import React from 'react';
import { Router, Route, Switch,Redirect, routerRedux } from 'dva/router';
import IndexPage from './routes/IndexPage';
import App from './routes/app'

import dynamic from 'dva/dynamic' // 路由按需加载
const { ConnectedRouter } = routerRedux

function RouterConfig({ history,app }) {
  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage')
})
const Login = dynamic({
  app,
  component: () => import('./routes/login/login')
})
const Index = dynamic({
  app,
  component: () => import('./routes/index/index')
})
const User = dynamic({
  app,
  component: () => import('./routes/user/user')
})
  return (
    <ConnectedRouter history={history}>
      <div>
        <App>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Index} />
            <Route path="/index" exact component={Index} />
            <Route path="/user" exact component={User} />
            <Route path="*" render={() => <Redirect to="login" />} />
          </Switch>
        </App>
      </div>
    </ConnectedRouter>
  );
}

export default RouterConfig;
