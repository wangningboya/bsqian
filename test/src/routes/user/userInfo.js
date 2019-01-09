import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'
import { Table, Form, Button, Modal, Input, Select, Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment';
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const Search = Input.Search

const UserInfo = ({ userInfo, loading, dispatch, form }) => {

    const { record } = userInfo
    const { getFieldDecorator, resetFields, setFieldsValue, getFieldValue } = form

    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    }

    function edit() {
        dispatch({
            type: 'userInfo/editUser',
            payload: {
                id: record.id,
                password: getFieldValue("password"),
                realName: getFieldValue("realName"),
                phone: getFieldValue("phone"),
                email: getFieldValue("email"),
            }
        })
    }

    function cancel() {
        resetFields()
    }

    return (
        <Page>
            <div className={styles.demandBack}>
                <div className={styles.demandList}>
                </div>
            </div>

            <Form>
                <FormItem label="密码" {...formItemLayout}>
                    {getFieldDecorator("password", {
                        initialValue: "",
                        rules: [
                            {
                                required: true,
                                message: '不能为空',
                            }
                        ]
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem label="真实姓名" {...formItemLayout}>
                    {getFieldDecorator("realName", {
                        initialValue: record.realName,
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
                <FormItem label="手机号" {...formItemLayout}>
                    {getFieldDecorator("phone", {
                        initialValue: record.phone,
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
                <FormItem label="邮箱" {...formItemLayout}>
                    {getFieldDecorator("email", {
                        initialValue: record.email,
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
            </Form>
            <Row style={{ marginLeft: 500 }}>
                <Button style={{ marginRight: 100 }} onClick={edit}>修改</Button>
                <Button onClick={cancel}>取消</Button>
            </Row>


        </Page>
    )
}

UserInfo.propsTypes = {}

export default connect(({ userInfo, loading }) => ({ userInfo, loading }))(Form.create({})(UserInfo))
