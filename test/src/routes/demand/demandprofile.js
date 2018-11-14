import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'
import { Card, Form, Button, Row, Col, Timeline, Modal, Input, InputNumber, Select } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.less'
import { supportsGoWithoutReloadUsingHash } from 'history/DOMUtils';
import moment from "moment";

const DemandProfile = ({ demandprofile, loading, dispatch, form }) => {
    const { demand, reviewModalVisible, predictModalVisible, devList, demandLogList } = demandprofile
    const { getFieldDecorator, getFieldValue } = form

    const confirm = Modal.confirm;
    const TextArea = Input.TextArea;
    const Option = Select.Option;

    const onReview = () => {
        dispatch({
            type: 'demandprofile/showReviewModal',
        })
    }

    const onPredict = () => {
        dispatch({
            type: 'demandprofile/showPredictModal',
        })
    }

    const onStartDev = () => {
        confirm({
            title: '确定激活本需求并开始开发吗?',
            onOk() {
                dispatch({
                    type: 'demandprofile/startDev',
                    payload: {
                        id: demand.id
                    }
                })
            },
            onCancel() {

            },
        });
    }

    const onPauseDev = () => {
        confirm({
            title: '确定暂停本需求开发吗?',
            onOk() {
              dispatch({
                type: 'demandprofile/pauseDev',
                payload: {
                  id: demand.id
                }
              })
            },
            onCancel() {
              
            },
          });
    }

    const onEndDev = () => {
        confirm({
            title: '确定结束本需求开发吗?',
            onOk() {
              dispatch({
                type: 'demandprofile/endDev',
                payload: {
                  id: demand.id
                }
              })
            },
            onCancel() {
              
            },
          });
    }

    const result = (date) => {
        switch (date) {
            case 1:
                return "通过"
            case 2:
                return "未通过"
            default:
                return "通过"
        }
    }

    const changeState = (state) => {
        switch (state) {
            case 0:
                return "提出需求"
            case 1:
                return "需求评审"
            case 2:
                return "需求评审"
            case 3:
                return "预估时间"
            case 4:
                return "开发开始"
            case 5:
                return "开发暂停"
            case 6:
                return "开发结束"
            case 7:
                return "开发关闭"
            case 8:
                return "验收通过"
            case 9:
                return "验收未通过"
        }
    }

    const reviewModalProps = {
        // item: demand,
        centered: true,
        visible: reviewModalVisible,
        maskClosable: false,
        title: '需求评审',
        okText: '通过',
        cancelText: '取消',
        onOk() {
            dispatch({
                type: 'demandprofile/reviewDemand',
                payload: {
                    id: demand.id,
                    state: 1,
                    reviewdes: getFieldValue("reviewdes"),
                },
            })
        },
        onCancel() {
            dispatch({
                type: 'demandprofile/hideReviewModal',
            })
        },
    }

    const refused = () => {
        dispatch({
            type: 'demandprofile/reviewDemand',
            payload: {
                id: demand.id,
                state: 2,
                reviewDes: getFieldValue("reviewDes"),
            },
        })
    }

    const predictModalProps = {
        // item: demand,
        centered: true,
        visible: predictModalVisible,
        maskClosable: false,
        title: '工时预估',
        okText: '确定',
        cancelText: '取消',
        onOk() {
            dispatch({
                type: 'demandprofile/predictDemand',
                payload: {
                    id: demand.id,
                    state: 3,
                    expTime: getFieldValue("expTime"),
                    devId: getFieldValue("devId"),
                },
            })
        },
        onCancel() {
            dispatch({
                type: 'demandprofile/hidePredictModal',
            })
        },
    }


    return (
        <Page>
            <div className={styles.demandBack}>
                <div style={{ paddingTop: 30, marginLeft: 20, marginRight: 20 }}>
                    <Row>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="ghost" onClick={onReview} disabled={demand.state === 0 ? false : true} > 需求评审</Button>
                            <Button type="ghost" onClick={onPredict} disabled={demand.state === 0 ? false : true} > 工时预估</Button>
                            <Button type="ghost" onClick={onStartDev} disabled={demand.state === 3 || demand.state === 5 ? false : true} > 激活开发</Button>
                            <Button type="ghost" onClick={onPauseDev} disabled={demand.state === 4 ? false : true} > 暂停开发</Button>
                            <Button type="ghost" onClick={onEndDev} disabled={demand.state === 10 ? false : true} > 开发结束</Button>
                            <Button type="ghost" disabled={demand.state === 10 ? false : true} > 验收通过</Button>
                            <Button type="ghost" disabled={demand.state === 10 ? false : true} > 验收未通过</Button>
                        </Col>
                    </Row>
                    <Card title={`${demand.demandNo} - ${demand.demandName}`} >
                        <div>{demand.demandDes}</div>
                    </Card>
                    {
                        demand.reviewDes !== null && demand.reviewDes !== undefined &&
                        <Card title={`需求评审结果[ ` + result(demand.state) + ' ]'} style={{ marginTop: 20 }}>
                            <div>{demand.reviewDes}</div>
                        </Card>
                    }
                    <Card style={{ marginTop: 20 }} title="关联属性" >
                        <div className={styles.projectname}>
                            项目名称：
                            <div className={styles.inline}>{demand.projectName}</div>
                        </div>
                        <div className={styles.projectno}>
                            项目编号：
                            <div className={styles.inline}>{demand.projectNo}</div>
                        </div>
                    </Card>

                    <Timeline style={{ marginTop: 20 }}>
                        {demandLogList.map(item => { return <Timeline.Item key={item.id}>{changeState(item.demandState)}{`-${item.opeName}-${moment(item.opeTime).format('YYYY-MM-DD HH:mm:ss')}`}</Timeline.Item> })}
                    </Timeline>

                    {reviewModalVisible && <Modal {...reviewModalProps} >
                        {getFieldDecorator('reviewDes', {
                        })(<div><TextArea></TextArea><Button type="danger" onClick={refused}>不通过</Button></div>)}
                    </Modal>}
                    {predictModalVisible && <Modal {...predictModalProps} >
                        <div>
                            预估时间：
                            {getFieldDecorator('expTime', {
                            })(<InputNumber />)}
                            开发人员：
                            {getFieldDecorator('devId', {
                            })(<Select style={{ width: 100 }}>
                                {devList.map(item => { return <Option key={item.id} value={item.id}>{item.realName}</Option> })}
                            </Select>)}
                        </div>
                    </Modal>}
                </div>
            </div>
        </Page>
    )
}

DemandProfile.propsTypes = {}

export default connect(({ demandprofile, loading }) => ({ demandprofile, loading }))(Form.create({})(DemandProfile))
