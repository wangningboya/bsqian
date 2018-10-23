import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'
import { Card, Form, Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.less'

const DemandProfile = ({ demandprofile, loading, dispatch, form }) => {
    const { demand } = demandprofile
    console.log(demand)
    return (
        <Page>
            <div className={styles.demandBack}>
                <div style={{paddingTop:30,marginLeft:20,marginRight:20}}>
                    <Row>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="ghost"  > 需求评审</Button>
                        <Button type="ghost"  > 工时预估</Button>
                        <Button type="ghost"  > 激活开发</Button>
                        <Button type="ghost"  > 暂停开发</Button>
                        <Button type="ghost"  > 开发结束</Button>
                        <Button type="ghost"  > 验收通过</Button>
                        <Button type="ghost"  > 验收未通过</Button>
                        </Col>
                    </Row>
                    <Card title={`${demand.demandNo} - ${demand.demandName}`} >
                        <div>{demand.demandDes}</div>
                    </Card>
                    {
                        demand.reviewDes !== null && demand.reviewDes !== undefined &&
                        <Card title={`需求评审结果[${demand.reviewDes}]`} style={{marginTop:20}}>
                            <div>{demand.reviewDes}</div>
                        </Card>
                    }
                </div>
            </div>
        </Page>
    )
}

DemandProfile.propsTypes = {}

export default connect(({ demandprofile, loading }) => ({ demandprofile, loading }))(Form.create({})(DemandProfile))
