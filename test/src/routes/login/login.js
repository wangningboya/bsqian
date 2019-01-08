import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Row, Button } from 'antd'
import styles from './index.less'
import { Link } from 'react-router-dom'

const FormItem = Form.Item

const Login = ({ login, dispatch, form }) => {

    const { getFieldDecorator, validateFieldsAndScroll } = form

    function handleOk() {
        validateFieldsAndScroll((errors, values) => {
            //   if(errors){
            //     return
            //   }
            dispatch({
                type: 'login/login',
                payload: values
            })
        })
    }

    function register() {
        <Link to={`register`}></Link>
    }

    return (
        <div className={styles.Form}>
            <Form>
                <FormItem hasFeedback>
                    {getFieldDecorator('userName', {
                    })(<Input placeholder="用户名" />)}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                    })(<Input type="password" placeholder="密码" />)}
                </FormItem>
                <Row>
                    <Button type="primary" onClick={handleOk} style={{ marginRight: 110 }}>
                        登录
                            </Button>
                    <Button type="primary" onClick={register}>
                        <Link to={`/register`}>注册</Link>
                    </Button>
                </Row>
            </Form>
        </div>
    )

}

export default connect(({ userLogin }) => ({ userLogin }))(Form.create({})(Login))
