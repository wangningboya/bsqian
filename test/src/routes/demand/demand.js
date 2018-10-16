import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'
import { Table, Form, Button, Modal, Input, Select } from 'antd'
import { Link } from 'react-router-dom'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

const Demand = ({demand, loading, dispatch,form}) =>  {
  const { demandList,modalVisible, modalTitle, projectList, accList, pId, pagination } = demand
  const { getFieldDecorator, resetFields, setFieldsValue, getFieldValue } = form
      const columns = [{
        align: 'center',
        title: '需求编号',
        dataIndex: 'demandNo',
        key: 'demandNo',
      },{
        align: 'center',
        title: '需求类型',
        dataIndex: 'demandType',
        key: 'demandType',
        render: (text,record,index)=>{return <span>{toType(text)}</span>}
      },{
        align: 'center',
        title: '需求名称',
        dataIndex: 'demandName',
        key: 'demandName',
        // render: (text,record,index)=>{return <a>{(text)}</a>}
        render: (text,record,index)=>{return <Link to={`demand/${record.id}`}>{(text)}</Link>}
      },{
        align: 'center',
        title: '需求说明',
        dataIndex: 'demandDes',
        key: 'demandDes',
      },{
        align: 'center',
        title: '项目编号',
        dataIndex: 'projectNo',
        key: 'projectNo',
      },{
        align: 'center',
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
      },{
        align: 'center',
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (text,record,index)=>{return <span>{toState(text)}</span>}
      },{
        align: 'center',
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
        switch(a){
          case 0:
            return "需求";
          case 1:
            return "BUG";
          default:
            return "";
        }
      }

      const toState = (a) =>{
        switch(a){
          case 0:
            return "提出需求";
          default:
            return "";
        }
      }

      const add = () => {
        resetFields()
        dispatch({
          type: "demand/modalQuery",
          payload: {
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

      const onOk = () => {
        dispatch({
          type: "demand/addDemand",
          payload: {
            demandName: getFieldValue("demandName"),
            demandType: getFieldValue("demandType"),
            demandNo: getFieldValue("demandNo"),
            demandDes: getFieldValue("demandDes"),
            projectId: pId,       
            accId: getFieldValue("accName"),
          }
        })
      }
      
      const modalProps = {
        title: modalTitle,
        visible: modalVisible,
        onCancel:close,
      }

      const formItemLayout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 14,
        },
      }

      const projectChange = (value) =>{
        projectList.map((items,i) => {
            if(items.projectName === value){
              setFieldsValue({
                PMName: items.pmname,
              })
              dispatch({
                type:"demand/updateState",
                payload:{
                  pId:items.id
                }
              })
            }
        })
      }

      const listChange = (pagination) =>{
        dispatch({
          type: "demand/query",
          payload: {
            pageNum:pagination.current,
            pageSize:pagination.pageSize,
            userName: localStorage.getItem("userName"),
          }
        })
      }


        return (
                <Page>
                    <div>
                      <Button type="primary" onClick={add}>创建需求</Button>
                      <Table
                      dataSource={demandList} columns={columns}
                      rowKey={(record) => {return record.id}}
                      loading={loading.effects['demand/query']} 
                      bordered={true}
                      pagination={{showTotal:() => `总共 ${pagination.total} 条,共,共${pagination.pages}页`, showSizeChanger: true, showQuickJumper: true, pageSizeOptions:[10,20,50], ...pagination}}
                      onChange={listChange}
                      />
                    </div>
                    <Modal {...modalProps} okText="提交" onOk={onOk} cancelText="关闭" width={800}>
                      <Form>
                      <FormItem label="需求名称" {...formItemLayout}>
                        {getFieldDecorator("demandName", {
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
                        <FormItem label="需求类型" {...formItemLayout}>
                        {getFieldDecorator("demandType", {
                          initialValue: "0",
                          rules: [
                            { 
                              required: true, 
                              message:'不能为空',
                            }
                          ]
                        })(
                          <Select>
                            <Option value="0">需求</Option>
                            <Option value="1">BUG</Option>
                          </Select>
                        )}
                        </FormItem>
                        <FormItem label="需求编号" {...formItemLayout}>
                        {getFieldDecorator("demandNo", {
                          initialValue:"D",
                          rules: [
                            { 
                              required: true, 
                              message:'不能为空',
                            }
                          ]
                        })(
                          <Input />
                        )}
                        </FormItem>
                        <FormItem label="需求描述" {...formItemLayout}>
                        {getFieldDecorator("demandDes", {
                          rules: [
                            { 
                              required: true, 
                              message:'不能为空',
                            }
                          ]
                        })(
                          <TextArea autosize={{ minRows: 2, maxRows: 6 }}/>
                        )}
                        </FormItem>
                        <FormItem label="项目名称" {...formItemLayout}>
                        {getFieldDecorator("projectName", {
                          rules: [
                            { 
                              required: true, 
                              message:'不能为空',
                            }
                          ]
                        })(
                          <Select onChange={projectChange}>
                            {projectList.map((items) => {
                              return <Option key={`${items.id}`} value={`${items.projectName}`}>{items.projectName}</Option>
                            })}
                          </Select>
                        )}
                        </FormItem>
                        <FormItem label="需求评审人员" {...formItemLayout}>
                        {getFieldDecorator("accName", {
                          rules: [
                            { 
                              required: true, 
                              message:'不能为空',
                            }
                          ]
                        })(
                          <Select>
                            {accList.map((items,index) => {
                              return <Option key={`${index}`} value={`${items.userName}`}>{items.realName}</Option>
                            })}
                          </Select>
                        )}
                        </FormItem>
                        <FormItem label="项目经理" {...formItemLayout}>
                        {getFieldDecorator("PMName", {
                        })(
                          <Input disabled={true}/>
                        )}
                        </FormItem>
                      </Form>
                    </Modal>
                </Page>
        )
}

Demand.propsTypes = {}

export default connect(({ demand,loading }) => ({ demand,loading }))(Form.create({})(Demand))
