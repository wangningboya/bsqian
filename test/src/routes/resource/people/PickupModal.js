import React from 'react'
import PropTypes, { element } from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'

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
  clusterOption,
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
        memberId: item.key,
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
        <FormItem label="团队" hasFeedback {...formItemLayout}>
          {getFieldDecorator('teamId', {
            initialValue: item.teamId,
            rules: [
              {
                required: true,
              },
            ],
          })(<Select>
            {clusterOption.map((items, index) => {
              return (<Select.Option key={index} value={`${items.key}`}>{items.resourceName.concat('-团队')}</Select.Option>)
            })}
          </Select>
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
  clusterOption: PropTypes.array,
  onOk: PropTypes.func,
}

export default Form.create()(modal)