import React, { Component } from 'react'
import { connect } from 'dva'
import { Page } from '../../components'
import { Table, Form, Button, Modal, Input, Select, Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'; 

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const Search = Input.Search

const Demand = ({demand, loading, dispatch,form}) =>  {
  const { demandList,modalVisible, modalTitle, projectList, accList, pId, dId, pagination, record, usertype } = demand
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
          
          if(record.state == 0||record == 3){
            return <a href="javascript:;" onClick={() => {
              add();
              console.log(record)
              dispatch({
                type: "demand/updateState",
                payload: {
                  modalVisible: true,
                  modalTitle:"修改",
                  usertype:"1",
                  record,
                  dId:record.id,
                  pId:record.projectId,
                }
              })
            }}>修改</a>
          }
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
          case 1:
            return "审核未通过";
          case 2:
            return "预估时间";
          case 3:
            return "开发开始";
          case 4:
            return "开发暂停";
          case 5:
            return "开发结束";
          case 6:
            return "开发关闭";
          case 7:
            return "验收通过";
          case 8:
            return "验收未通过";
          default:
            return "";
        }
      }

      //时间转换
      const toDate = (a) =>{
        if(a!=""&&a!=null){
            return moment(a).format("YYYYMMDD");
        }
        return "";
      }
      const timeNow = toDate(new Date())

      //新增需求
      const add = () => {
        resetFields()
        dispatch({
          type: "demand/updateState",
          payload: {
            modalVisible: true,
            modalTitle: "新增",
            usertype:"0",
            record:{
              demandType: "0",
              demandNo: "D"+timeNow
            }
          }
        })
        dispatch({
          type: "demand/modalQuery",
          payload: {
          }
        })
      }

      //条件查询
      const query = () => {
        dispatch({
          type: "demand/query",
          payload: {
            demandName: getFieldValue("demandName2"),
            state: getFieldValue("state"),
          }
        })
      }

      //点击modal的取消或者ESC
      const close = ()=>{
        dispatch({
          type: "demand/updateState",
          payload: {
            modalVisible: false,
          }
        })
      }

      //点击modal的提交
      const onOk = () => {
        let userurl = "";
        if(usertype == 0){
          userurl = "demand/addDemand";
        }
        if(usertype == 1){
          userurl = "demand/updateDemand";
        }
        dispatch({
          type: userurl,
          payload: {
            id:dId,
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

      

    //   const addonBefore = (
    //     <p>{"D"+toDate(new Date().toString())}</p>
    //   )

      

      //项目改变获取项目经理名字
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

      //分页
      const listChange = (pagination) =>{
        dispatch({
          type: "demand/query",
          payload: {
            pageNum:pagination.current,
            pageSize:pagination.pageSize,
            userName: localStorage.getItem("userName"),
            demandName: getFieldValue("demandName2"),
            state: getFieldValue("state"),
          }
        })
      }


        return (
                <Page>
                    <div>
                      <Row style={{marginTop:15,marginBottom:15}}>
                        <Col span={4}>
                          {getFieldDecorator("demandName2", {
                          })(
                            <Search  style={{width:200}} onSearch={query}></Search>
                          )}
                        </Col>
                        <Col span={4}>
                          {getFieldDecorator("state", {
                          })(
                            <Select style={{width:200}}>
                            <Option key="" value= "">全部</Option>
                            <Option key="0" value= "0">提出需求</Option>
                            <Option key="1" value= "1">审核未通过</Option>
                            <Option key="2" value= "2">预估时间</Option>
                            <Option key="3" value= "3">开发开始</Option>
                            <Option key="4" value= "4">开发暂停</Option>
                            <Option key="5" value= "5">开发结束</Option>
                            <Option key="6" value= "6">开发关闭</Option>
                            <Option key="7" value= "7">验收通过</Option>
                            <Option key="8" value= "8">验收未通过</Option>
                          </Select>
                          )}
                        </Col>
                        <Button type="primary" onClick={query} style={{marginRight:15}}>查询</Button>
                        <Button onClick={add}>创建需求</Button>
                      </Row>
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
                          initialValue: record.demandName,
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
                          initialValue: record.demandType+"",
                          rules: [
                            { 
                              required: true, 
                              message:'不能为空',
                            }
                          ]
                        })(
                          <Select>
                            <Option key='0' value='0'>需求</Option>
                            <Option key='1' value='1'>BUG</Option>
                          </Select>
                        )}
                        </FormItem>
                        <FormItem label="需求编号" {...formItemLayout}>
                        {getFieldDecorator("demandNo", {
                          initialValue: record.demandNo,
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
                        <FormItem label="需求描述" {...formItemLayout}>
                        {getFieldDecorator("demandDes", {
                          initialValue: record.demandDes,
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
                          initialValue: record.projectName,
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
                          initialValue: record.accId,
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
                          initialValue: record.pmname,
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
