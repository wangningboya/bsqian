
import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'
import { Card, Form, Button, Row, Col, Timeline, Modal, Input, InputNumber, Select, message, List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.less'
import { supportsGoWithoutReloadUsingHash } from 'history/DOMUtils';
import moment from "moment";
import { config } from 'utils'


const FormItem = Form.Item
const { ISSUE_TRANSFER } = config

const IssueProfile = ({ issueprofile, loading, dispatch, form }) => {
    const { getFieldDecorator, getFieldValue, getFieldsValue, resetFields } = form
    const { user, issue, createModalVisible, record, projectList, accList } = issueprofile

    const confirm = Modal.confirm;
    const TextArea = Input.TextArea;
    const Option = Select.Option;


    const transfer = (e) => {
        if (user.permissions.includes(ISSUE_TRANSFER)) {
            resetFields()
            dispatch({
                type: 'issueprofile/showModal',
                payload: {
                    record: {
                        demandNo: "D" + timeNow,
                        issueId: e.id
                    }
                }
            })
            dispatch({
                type: "issueprofile/modalQuery",
                payload: {
                }
            })
        } else {
            message.warning('没有权限，请与管理员联系');
        }
    }

    //时间转换
    const toDate = (a) => {
        if (a !== "" && a !== null) {
            return moment(a).format("YYYYMMDD");
        }
        return "";
    }
    const timeNow = toDate(new Date())

    //点击modal的取消或者ESC
    const close = () => {
        dispatch({
            type: "issueprofile/updateState",
            payload: {
                createModalVisible: false,
            }
        })
    }

    const createModalProps = {
        item: issue,
        visible: createModalVisible,
        maskClosable: true,
        confirmLoading: loading.effects['issueprofile/update'],
        title: '问题转需求',
        onCancel: close,
        // onOk(data) {
        //     dispatch({
        //         type: 'issueprofile/createDemand',
        //         payload: data,
        //     })
        // },
        // onCancel() {
        //     alert("asdasdasd")
        //     dispatch({
        //         type: 'issueprofile/hideModal',
        //     })
        // },
    }

    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    }

    //点击modal的提交
    const onOk = () => {
        dispatch({
            type: "issueprofile/issueToDemand",
            payload: {
                issueId: record.issueId,
                demandName: getFieldValue("demandName"),
                demandNo: getFieldValue("demandNo"),
                demandDes: getFieldValue("demandDes"),
                projectId: getFieldValue("projectName"),
                accId: getFieldValue("accName"),
            }
        })
    }

    return (
        <Page>
            <div className={styles.issueBack}>
                <div style={{ paddingTop: 30, marginLeft: 20, marginRight: 20 }}>
                    <Card title={issue.issueName} extra={<Button onClick={() => transfer(issue)}>问题转需求</Button>}>
                        <div dangerouslySetInnerHTML={{ __html: issue.issueContent }}></div>
                    </Card>

                    <Card
                        title="相关需求"
                        style={{ marginTop: 24 }}
                        bordered={false}
                        bodyStyle={{ padding: '8px 32px 32px 32px' }}
                    >

                        <List
                            itemLayout="horizontal"
                            dataSource={issue.demands === null ? [] : issue.demands}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="align-right" />}
                                        title={<Link to={`/demand/${item.id}`}>{(item.demandName)}</Link>}
                                        description={<div dangerouslySetInnerHTML={{ __html: item.demandDes }}></div>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </div>
            <Modal {...createModalProps} okText="提交" onOk={onOk} cancelText="关闭" width={800}>
                <Form>
                    <FormItem label="需求名称" {...formItemLayout}>
                        {getFieldDecorator("demandName", {
                            initialValue: record.demandName,
                            rules: [
                                {
                                    required: true,
                                    message: '不能为空',
                                }
                            ]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="需求编号" {...formItemLayout}>
                        {getFieldDecorator("demandNo", {
                            initialValue: record.demandNo,
                            rules: [
                                {
                                    required: true,
                                    message: '不能为空',
                                }
                            ]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="需求描述" {...formItemLayout}>
                        {getFieldDecorator("demandDes", {
                            initialValue: record.demandDes,
                            rules: [
                                {
                                    required: true,
                                    message: '不能为空',
                                }
                            ]
                        })(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                    <FormItem label="项目名称" {...formItemLayout}>
                        {getFieldDecorator("projectName", {
                            initialValue: record.projectName,
                            rules: [
                                {
                                    required: true,
                                    message: '不能为空',
                                }
                            ]
                        })(
                            <Select>
                                {projectList.map((items) => {
                                    return <Option key={`${items.id}`} value={`${items.id}`}>{items.projectName}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="需求评审人员" {...formItemLayout}>
                        {getFieldDecorator("accName", {
                            initialValue: record.accId,
                            rules: [
                                {
                                    required: true,
                                    message: '不能为空',
                                }
                            ]
                        })(
                            <Select>
                                {accList.map((items, index) => {
                                    return <Option key={`${index}`} value={`${items.userName}`}>{items.realName}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </Page>
    )
}

IssueProfile.propsTypes = {}

export default connect(({ issueprofile, loading }) => ({ issueprofile, loading }))(Form.create({})(IssueProfile))
