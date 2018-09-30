import React, { Component } from 'react'
import { connect } from 'dva'
import {Form, Input} from 'antd'

class Login extends Component {
    render() {
        return (
                <div>
                    <Form>
                        账号：<Input />
                        密码：<Input />
                    </Form>
                </div>
        )
    }
}

Login.propsTypes = {}

export default connect()(Login)
