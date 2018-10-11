import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'
import { Table, Form, Button, Modal, Input } from 'antd'

const FormItem = Form.Item

const Demand = ({demand, loading, dispatch,form}) =>  {
  const { demandList,modalVisible, modalTitle } = demand
  const { getFieldDecorator } = form
      const columns = [{
        title: '需求编号',
        dataIndex: 'demandNO',
        key: 'demandNO',
      },{
        title: '需求类型',
        dataIndex: 'demandType',
        key: 'demandType',
        render: (text,record,index)=>{return <span>{toType(text)}</span>}
      },{
        title: '需求名称',
        dataIndex: 'demandName',
        key: 'demandName',
      },{
        title: '需求说明',
        dataIndex: 'demandDes',
        key: 'demandDes',
      },{
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        render: (text,record,index)=>{
          return <a href="javascript:;" onClick={() => {
            dispatch({
              type: "noticeList/getById",
              payload: {
                text,
              }
            })
          }}>修改</a>
        }
      }];

      const toType = (a)=>{
        if(a==0){
          return "需求"
        }else if(a==1){
          return "BUG"
        }
      }

      const add = () => {
        dispatch({
          type: "demand/updateState",
          payload: {
            modalVisible: true,
            modalTitle: "新增"
          }
        })
      }

      const close = ()=>{
        dispatch({
          type: "demand/updateState",
          payload: {
            modalVisible: false,
          }
        })
      }
      
      const modalProps = {
        title: modalTitle,
        visible: modalVisible,
        onCancel:close,
      }
        return (
                <Page>
                    <div>
                      <Button type="primary" onClick={add}>创建需求</Button>
                      <Table
                      dataSource={demandList} columns={columns}
                      rowKey={(record) => {return record.id}}
                      loading={loading.effects['demand/query']} 
                      />
                    </div>
                    <Modal {...modalProps} okText="提交" cancelText="关闭">
                      <Form>
                        <FormItem label="需求名称">
                        {getFieldDecorator("demandName", {
                          // initialValue: record.realName,
                          rules: [
                            { 
                              required: true, 
                              message:'不能为空',
                            }
                          ]
                        })(
                          <Input/>
                        )}
                        </FormItem>
                      </Form>
                    </Modal>
                </Page>
        )
}

Demand.propsTypes = {}

export default connect(({ demand,loading }) => ({ demand,loading }))(Form.create({})(Demand))
