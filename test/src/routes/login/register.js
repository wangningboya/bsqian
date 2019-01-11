import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Row, Button, message } from 'antd'
import styles from './index.less'

const FormItem = Form.Item

const Register = ({ userRegister, dispatch, form }) => {

    const { userNameFlag, phoneFlag } = userRegister
    const { getFieldDecorator, validateFieldsAndScroll, validFunction, getFieldValue } = form

    function register() {
        if (userNameFlag === 0) {
            message.error("账号重复")
            return;
        }
        if (phoneFlag === 0) {
            message.error("手机号重复")
            return;
        }
        validateFieldsAndScroll((errors, values) => {
            dispatch({
                type: 'userRegister/register',
                payload: values
            })
        })
    }

    function checkUserName() {
        dispatch({
            type: 'userRegister/checkUserName',
            payload: {
                userName: getFieldValue("userName"),
            }
        })
    }

    function checkPhone() {
        dispatch({
            type: 'userRegister/checkPhone',
            payload: {
                phone: getFieldValue("phone"),
            }
        })
    }

    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    }

    // const validFunctions = (rule, value, callback) => {
    //     const arr = value ? value.split(';') : [];
    //     for (let i = 0; i < arr.length; i++) {
    //         const single = arr[i];
    //             callback('请输入符合规范的域名/IP'); // 校验未通过
    //             break;
    //     }
    //     if (arr.length > 10) {
    //         callback('最多添加10个'); // 校验未通过

    //     }

    //     callback(); // 校验通过

    // }

    return (
        <div className={styles.rForm}>
            <Form>
                <FormItem label="账号" {...formItemLayout}>
                    {getFieldDecorator('userName', {
                        initialValue: "",
                        rules: [
                            {
                                required: true,
                                message: '不能为空',
                            },
                            // {
                            //     validator: validFunctions
                            // }
                        ]
                    })(
                        <Input placeholder="用户名" autoComplete="off" onBlur={checkUserName} />
                    )}
                </FormItem>
                <FormItem label="密码" {...formItemLayout}>
                    {getFieldDecorator('password', {
                        initialValue: "",
                        rules: [
                            {
                                required: true,
                                message: '不能为空',
                            }
                        ]
                    })(
                        <Input type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem label="真实姓名" {...formItemLayout}>
                    {getFieldDecorator('realName', {
                        initialValue: "",
                        rules: [
                            {
                                required: true,
                                message: '不能为空',
                            }
                        ]
                    })(
                        <Input placeholder="真实姓名" autoComplete="off" />
                    )}
                </FormItem>
                <FormItem label="手机" {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        initialValue: "",
                        rules: [
                            {
                                required: true,
                                message: '不能为空',
                            }
                        ],
                    })(
                        <Input placeholder="手机" autoComplete="off" onBlur={checkPhone} />
                    )}
                </FormItem>
                <FormItem label="邮箱" {...formItemLayout}>
                    {getFieldDecorator('email', {
                        initialValue: "",
                        rules: [
                            {
                                type: 'email', message: '输入的E-mail格式不符!',
                            }, {
                                required: true, message: '请输入E—mail!',
                            }],
                    })(
                        <Input placeholder="邮箱" autoComplete="off" />
                    )}
                </FormItem>
                <Row>
                    <Button type="primary" onClick={register}>
                        注册
                            </Button>
                </Row>
            </Form>
        </div>
    )

}

export default connect(({ userRegister }) => ({ userRegister }))(Form.create({})(Register))
