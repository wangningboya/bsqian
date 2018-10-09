import React, { Component } from 'react'
import { connect } from 'dva'
import {Form, Input, Row, Button} from 'antd'

const FormItem = Form.Item

const Login =({userLogins, dispatch, form}) => {

    const {getFieldDecorator, validateFieldsAndScroll} = form

    function handleOk () {
        validateFieldsAndScroll((errors, values) => {
        //   if(errors){
        //     return
        //   }
          alert("111")
          console.log(values)
          dispatch({
               type: 'userLogin/login',
               payload: values 
            })
        })
      }
        return (
                <div>
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
                            <Button type="primary" onClick={handleOk}>
                                登录
                            </Button>
                        </Row>
                    </Form>
                </div>
        )

}

export default connect(({ userLogin }) => ({ userLogin }))(Form.create({})(Login))
