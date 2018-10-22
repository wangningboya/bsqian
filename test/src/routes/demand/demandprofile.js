import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'
import { Card, Form, Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'; 

const DemandProfile = ({demandprofile, loading, dispatch, form}) =>  {
        const { demand } = demandprofile
        console.log("demand")
        console.log(demand)
        console.log("demand")
        return (
                <Page>
                        <Row>
                                <Col span={24} style={{display:'flex',justifyContent:'flex-end'}}>
                                        <Button  type="ghost"  > 需求评审</Button>
                                        <Button  type="ghost"  > 工时预估</Button>
                                        <Button  type="ghost"  > 激活开发</Button>
                                        <Button  type="ghost"  > 暂停开发</Button>
                                        <Button  type="ghost"  > 开发结束</Button>
                                        <Button  type="ghost"  > 验收通过</Button>
                                        <Button  type="ghost"  > 验收未通过</Button>
                                </Col>
                        </Row>
                        <Card title={`${demand.demandNo} - ${demand.demandName}`} >
                                <div>{demand.demandDes}</div>
                        </Card>
                </Page>
        )
}

DemandProfile.propsTypes = {}

export default connect(({ demandprofile,loading }) => ({ demandprofile,loading }))(Form.create({})(DemandProfile))
