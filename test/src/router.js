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
  return (
    <ConnectedRouter history={history}>
    <App>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="*" render={() => <Redirect to="login" />} />
      </Switch>
    </App>
    </ConnectedRouter>
  );
}

export default RouterConfig;
