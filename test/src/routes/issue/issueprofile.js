
import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'
import { Card, Form, Button, Row, Col, Timeline, Modal, Input, InputNumber, Select, message, List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.less'
import { supportsGoWithoutReloadUsingHash } from 'history/DOMUtils';
import moment from "moment";
import { config } from 'utils'



const { ISSUE_TRANSFER } = config

const IssueProfile = ({ issueprofile, loading, dispatch, form }) => {
    const { getFieldDecorator, getFieldValue } = form
    const { user, issue, createModalVisible, modalType, projects, products, resources } = issueprofile

    const confirm = Modal.confirm;
    const TextArea = Input.TextArea;
    const Option = Select.Option;


    const transfer = (e) => {

        if (user.permissions.includes(ISSUE_TRANSFER)) {
            dispatch({
                type: 'issueprofile/showModal'
            })
        } else {
            message.warning('没有权限，请与管理员联系');
        }

    }

    const createModalProps = {
        item: issue,
        visible: createModalVisible,
        maskClosable: false,
        modalType,
        products,
        projects,
        resources,
        confirmLoading: loading.effects['issueprofile/update'],
        title: `${modalType === 'create' ? '创建需求' : '编辑需求'}`,
        wrapClassName: 'vertical-center-modal',
        onOk(data) {
            dispatch({
                type: 'issueprofile/createDemand',
                payload: data,
            })
        },
        onCancel() {
            dispatch({
                type: 'issueprofile/hideModal',
            })
        },
    }

    return (
        <Page>
            <div className={styles.issueBack}>
                <div style={{ paddingTop: 30, marginLeft: 20, marginRight: 20 }}>
                    <Card title={issue.issueName} extra={<Button onClick={() => transfer(issue)}>创建需求</Button>}>
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
                                        title={ <Link to={`/demand/${item.id}`}>{(item.demandName)}</Link> }
                                        description={<div dangerouslySetInnerHTML={{ __html: item.demandDes }}></div>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </div>
        </Page>
    )
}

IssueProfile.propsTypes = {}

export default connect(({ issueprofile, loading }) => ({ issueprofile, loading }))(Form.create({})(IssueProfile))
