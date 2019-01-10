import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        level: item.resType,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="资源类型名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resourceTypeName', {
            rules: [
              {
                required: true,
                message: '请输入资源类型名称!',
              },
            ],
          })(<Input />
          )}
        </FormItem>
        <FormItem label="资源类型代码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resourceTypeCode', {
            rules: [
              {
                required: true,
                message: '请输入资源类型代码(例如：JAVA_DEV_RES)!',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  parentItem: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
