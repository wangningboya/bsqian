import React, { Component } from 'react'
import { connect } from 'dva'
import { Page, DropOption } from '../../components'
import { Table, Form, Button, Modal, Input, Select, Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment';
import styles from './index.less'
import { config } from 'utils'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const Search = Input.Search
const confirm = Modal.confirm
const {ISSUE_CLOSED , ISSUE_EDIT, ISSUE_DELETE} = config

const Issue = ({ loading, dispatch, form, issue }) => {
  const { getFieldDecorator, getFieldValue, resetFields } = form
  const { issueList, pagination, modalVisible, modalTitle, issueType, record, toState, permissions } = issue

  let menuOptions = []
  if(permissions.includes(ISSUE_EDIT)){
    menuOptions.push({ key: '1', name: '编辑' })
  }
  if(permissions.includes(ISSUE_CLOSED)){
    menuOptions.push({ key: '2', name: '关闭' })
  }
  if(permissions.includes(ISSUE_DELETE)){
    menuOptions.push( { key: '3', name: '删除' })
  }


  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '3') {
      confirm({
        title: '是否删除此问题?',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    } else if (e.key === '2') {
      onCloseItem(record)
    }
  }

  const onEditItem = (record) => {
    console.log(record)
  }

  const onDeleteItem = (id) => {
    console.log(id)
  }

  const onCloseItem = (id) => {
    console.log(id)
  }


  const columns = [{
    align: 'center',
    title: '问题编号',
    dataIndex: 'issueNo',
    key: 'issueNo',
  }, {
    align: 'center',
    title: '问题名称',
    dataIndex: 'issueName',
    key: 'issueName',
    render: (text, record, index) => <Link to={`issue/${record.id}`}>{text}</Link>
  }, {
    align: 'center',
    title: '问题状态',
    dataIndex: 'state',
    key: 'state',
    render: (text, record, index) => { return <span>{toState[text + ""]}</span> }
  }, {
    align: 'center',
    title: '操作',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    render: (text, record, index) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={menuOptions} />
    }
  }];

  //时间转换
  const toDate = (a) => {
    if (a !== "" && a !== null) {
      return moment(a).format("YYYYMMDD");
    }
    return "";
  }
  const timeNow = toDate(new Date())

  //新增问题
  const add = () => {
    resetFields()
    dispatch({
      type: "issue/updateState",
      payload: {
        modalVisible: true,
        modalTitle: "新增",
        issueType: "0",
        record: {
          issueType: "0",
          issueNo: "I" + timeNow
        }
      }
    })
    dispatch({
      type: "issue/modalQuery",
      payload: {
      }
    })
  }

  //条件查询
  const query = () => {
    dispatch({
      type: "issue/query",
      payload: {
        issueName: getFieldValue("issueName2"),
        state: getFieldValue("state"),
      }
    })
  }

  //分页
  const listChange = (pagination) => {
    dispatch({
      type: "issue/query",
      payload: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
        userName: sessionStorage.getItem("userName"),
        issueName: getFieldValue("issueName2"),
        state: getFieldValue("state"),
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

  //点击modal的提交
  const onOk = () => {
    let userurl = "";
    if (issueType === "0") {
      userurl = "issue/addIssue";
    }
    if (issueType === "1") {
      userurl = "issue/updateIssue";
    }
    dispatch({
      type: userurl,
      payload: {
        issueName: getFieldValue("issueName"),
        issueNo: getFieldValue("issueNo"),
        issueContent: getFieldValue("issueContent"),
      }
    })
  }

  //点击modal的取消或者ESC
  const close = () => {
    dispatch({
      type: "issue/updateState",
      payload: {
        modalVisible: false,
      }
    })
  }

  const modalProps = {
    title: modalTitle,
    visible: modalVisible,
    onCancel: close,
  }

  return (
    <Page>
      <div className={styles.issueBack}>
        <div className={styles.issueList}>
          <Row style={{ paddingTop: 30, marginBottom: 15 }}>
            <Col span={4}>
              {getFieldDecorator("issueName2", {
              })(
                <Search style={{ width: 200 }} onSearch={query}></Search>
              )}
            </Col>
            <Col span={4}>
              {getFieldDecorator("state", {
              })(
                <Select style={{ width: 200 }}>
                  <Option key="" value="">全部</Option>
                  <Option key="0" value="0">未处理</Option>
                  <Option key="1" value="1">已创建需求</Option>
                  <Option key="2" value="2">关闭</Option>
                  <Option key="3" value="3"></Option>
                </Select>
              )}
            </Col>
            <Button type="primary" onClick={query} style={{ marginRight: 15 }}>查询</Button>
            <Button onClick={add}>创建问题</Button>
          </Row>
          <Table
            dataSource={issueList} columns={columns}
            rowKey={(record) => { return record.id }}
            loading={loading.effects['issue/query']}
            bordered={true}
            pagination={{ showTotal: () => `总共 ${pagination.total} 条,共,共${pagination.pages}页`, showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ["10", "20", "50"], ...pagination }}
            onChange={listChange}
          />
        </div>
      </div>
      <Modal {...modalProps} okText="提交" onOk={onOk} cancelText="关闭" width={800}>
        <Form>
          <FormItem label="问题名称" {...formItemLayout}>
            {getFieldDecorator("issueName", {
              initialValue: record.issueName,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                }
              ]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="问题编号" {...formItemLayout}>
            {getFieldDecorator("issueNo", {
              initialValue: record.issueNo,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                }
              ]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="问题描述" {...formItemLayout}>
            {getFieldDecorator("issueContent", {
              initialValue: record.issueContent,
              rules: [
                {
                  required: true,
                  message: '不能为空',
                }
              ]
            })(
              <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
        </Form>
      </Modal>
    </Page>
  )
}

Issue.propsTypes = {}

export default connect(({ issue, loading }) => ({ issue, loading }))(Form.create({})(Issue))
