import React, { Component } from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import {MyLayout} from '../components'

import { Layout } from 'antd';

const { Header, Sider, Footer, Content } = MyLayout


class App extends Component {
    render() {
        let { children,location } = this.props
        let { pathname } = location
        pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
        if(pathname==='/login'){
            return (
                <div>
                    {children}
                </div>
                )
        }
        return (
            <Layout>
                <Header>
                </Header>
                <Layout>
                    <Sider></Sider>
                    <Content>
                        {children}
                    </Content>
                </Layout>
                <Footer></Footer>
            </Layout>
        )
    }
}

App.propTypes = {}

export default withRouter(
    connect(({ app, loading }) => ({
        app,
        loading
    }))(App)
)