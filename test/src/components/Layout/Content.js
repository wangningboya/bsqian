import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import styles from './Content.less'


class Content extends Component {
    render() {
        const { children } = this.props
        return (
            <Layout.Content>
                {children}
            </Layout.Content>   
        )
    }
}

export default connect()(Content)