import React, { Component } from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import {MyLayout} from '../components'

import { Layout, Slider } from 'antd';

const { Header, Sider, Footer, Content } = MyLayout

class App extends Component {
    render() {
        let { children } = this.props
        return (
            <Layout>
                <Header></Header>
                <Layout>
                    <Sider></Sider>
                    <Content></Content>
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