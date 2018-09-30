import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'

class User extends Component {
    render() {
        return (
                <Page>
                    user
                </Page>
        )
    }
}

User.propsTypes = {}

export default connect()(User)
