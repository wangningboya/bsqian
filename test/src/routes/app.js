import React, { Component } from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import {MyLayout} from '../components'

import { Layout } from 'antd';

const { Header, Sider, Content } = MyLayout


const App =({children, location, dispatch, app}) => {
    let { user, menu } = app
        let { pathname } = location
        pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
        if(pathname==='/login'){
            return (
                <div>
                    {children}
                </div>
                )
        }
        const headerProps = {
            menu,
            user,
            logout () {
              dispatch({ type: 'app/logout' })
            },
          }
        return (
            <Layout>
                <Header  {...headerProps}>
                </Header>
                <Layout>
                    <Sider></Sider>
                    <Content>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        )
}

App.propTypes = {}

export default withRouter(
    connect(({ app, loading }) => ({
        app,
        loading
    }))(App)
)