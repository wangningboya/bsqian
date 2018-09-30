import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'


class Footer extends Component {
    render() {
        return (
            <Layout.Footer>
                foot
            </Layout.Footer>
        )
    }
}

export default connect()(Footer)