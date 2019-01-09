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
  parentItem = {},
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
        parentId: parentItem.id === undefined ? item.id : parentItem.id,
        ...getFieldsValue(),
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
        <FormItem label="部门名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('depName', {
            initialValue: item.depName,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input />
          )}
        </FormItem>
        <FormItem label="部门代码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('depCode', {
            initialValue: item.depCode,
            rules: [
              {
                required: true,
                message: '不能为空',
              },
            ],
          })(<Input />
          )}
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
