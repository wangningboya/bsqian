import React from 'react'
import PropTypes, { element } from 'prop-types'
import { Form, Input, Modal, Select, DatePicker, Cascader } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

let chosseitem

const modal = ({
  item = {},
  parentItem = {},
  archData,
  roleList,
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
        resType: parentItem.resType === undefined ? item.resType : parentItem.resType,
      }
      delete data.resourceDepart
      data.resourceDepart = chosseitem
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const onChange = (value) => {
    chosseitem = value.join(',')
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resourceName', {
            initialValue: item.resourceName,
            rules: [
              {
                required: true,
                message: '请输入姓名!',
              },
            ],
          })(<Input />
          )}
        </FormItem>
        <FormItem label="职级" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resourcePhase', {
            initialValue: item.resourcePhase,
            rules: [
              {
                required: true,
                message: '请输入职级!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="职位" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resourceTitle', {
            initialValue: item.resourceTitle,
            rules: [
              {
                required: true,
                message: '请输入职位!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="部门" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resourceDepart', {
            initialValue: item.resourceDepart === undefined || item.resourceDepart === null ? [] : item.resourceDepart.split(','),
            rules: [
              {
                required: true,
                message: '请选择部门!',
              },
            ],
          })(<Cascader options={archData} onChange={onChange} />)}
        </FormItem>
        <FormItem label="角色" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resRoleId', {
            initialValue: item.resRoleId,
            rules: [
              {
                required: true,
                message: '请输选择角色!',
              },
            ],
          })(
            <Select>
              {roleList.map((items, index) => {
                return <Option key={`${index}`} value={`${items.id}`}>{items.roleName}</Option>
              })}
            </Select>
          )}
        </FormItem>
        <FormItem label="联系方式" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resourceTel', {
            initialValue: item.resourceTel,
            rules: [
              {
                required: true,
                message: '请输入手机号码!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="电子邮件" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resourceEmail', {
            initialValue: item.resourceEmail,
            rules: [
              {
                type: 'email', message: '输入的E-mail格式不符!',
              }, {
                required: true, message: '请输入E—mail!',
              }],
          })(<Input />)}
        </FormItem>
        <FormItem label="入职时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resourceSetupDate', {
            initialValue: moment(item.resourceSetupDate),
            rules: [
              {
                required: true,
                message: '请选择入职时间!',
              },
            ],
          })(<DatePicker style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem label="描述" hasFeedback {...formItemLayout}>
          {getFieldDecorator('resourceDescription', {
            initialValue: item.resourceDescription,
            rules: [
              {
                required: true,
                message: '请输入简单描述!',
              },
            ],
          })(<Input.TextArea placeholder="请输入简单的描述信息" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  archData: PropTypes.array,
  parentItem: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
