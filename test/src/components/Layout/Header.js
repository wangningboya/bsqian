import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import styles from './Header.less'


class Header extends Component {
    render() {
        return (
                <Layout.Header>
                    header
                </Layout.Header>     
        )
    }
}

export default connect()(Header)