import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Row, Button, message } from 'antd'
import styles from './index.less'

const FormItem = Form.Item

const Register = ({ userRegister, dispatch, form }) => {

    const { getFieldDecorator, validateFieldsAndScroll, validFunction, getFieldValue } = form
    const { flag } = userRegister
    function register() {
        if (flag === 1) {
            validateFieldsAndScroll((errors, values) => {
                dispatch({
                    type: 'userRegister/register',
                    payload: values
                })
            })
        } else {
            message.error("账号重复")
        }
    }

    function check() {
        dispatch({
            type: 'userRegister/check',
            payload: {
                userName: getFieldValue("userName"),
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
                        <Input placeholder="用户名" autoComplete="off" onBlur={check} />
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
                    })(
                        <Input placeholder="手机" autoComplete="off" />
                    )}
                </FormItem>
                <FormItem label="邮箱" {...formItemLayout}>
                    {getFieldDecorator('email', {
                        initialValue: "",
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
