import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'

class Index extends Component {
    render() {
        return (
                <Page>
                    index
                </Page>
        )
    }
}

Index.propsTypes = {}

export default connect()(Index)
