import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'
import {Row, Col} from 'antd'

class Index extends Component {
    render() {
        return (
                <Page>
                    <div>
                        <Row>
                            <Col span={16}>16</Col>
                            <Col span={4}>4</Col>
                            <Col span={4}>4</Col>
                        </Row>
                    </div>
                </Page>
        )
    }
}

Index.propsTypes = {}

export default connect()(Index)
