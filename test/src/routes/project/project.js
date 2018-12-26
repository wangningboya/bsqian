import React, { Component } from 'react'
import { connect } from 'dva'
import { Page, DropOption } from '../../components'
import { Table, Form, Button, Modal, Input, Select, Icon, Row, Col, DatePicker, InputNumber  } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './index.less'
import { config } from 'utils'


const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const Search = Input.Search
const confirm = Modal.confirm
const { PROJECT_EDIT, PROJECT_DELETE } = config
const { RangePicker } = DatePicker
moment.locale('zh-cn');

const Project = ({ loading, dispatch, form, project }) => {
    const { getFieldDecorator, getFieldValue, resetFields, getFieldsValue } = form
    const { projectList, pagination, modalVisible, modalTitle, issueType, record, toState, permissions, startTime, endTime } = project

    let menuOptions = []
    if (permissions.includes(PROJECT_EDIT)) {
        menuOptions.push({ key: '1', name: '编辑' })
    }
    if (permissions.includes(PROJECT_DELETE)) {
        menuOptions.push({ key: '2', name: '删除' })
    }


    const handleMenuClick = (record, e) => {
        if (e.key === '1') {
            onEditItem(record)
        } else if (e.key === '2') {
            confirm({
                title: '是否删除此问题?',
                onOk() {
                    onDeleteItem(record.id)
                },
            })
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

    const ColProps = {
        xs: 24,
        sm: 12,
        style: {
            marginBottom: 16,
        },
    }

    const TwoColProps = {
        ...ColProps,
        xl: 96,
    }


    const columns = [
        {
            title: '项目编号',
            dataIndex: 'projectNo',
            key: 'projectNo',
        }, {
            title: '项目名称',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record) => <Link to={`project/${record.id}`}>{text}</Link>,
        }, {
            title: '销售人员',
            dataIndex: 'projectSales',
            key: 'projectSales',
        }, {
            title: '项目金额',
            dataIndex: 'projectAmount',
            key: 'projectAmount',
        }, {
            title: '项目状态',
            dataIndex: 'state',
            key: 'state',
        }, {
            title: '立项时间',
            dataIndex: 'setUpDate',
            key: 'setUpDate',
            render: (text) => { return moment(text).format('YYYY-MM-DD') },
        }, {
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text, record) => {
                return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={menuOptions} />
            },
        },
    ]

    //时间转换
    const toDate = (a) => {
        if (a !== "" && a !== null) {
            return moment(a).format("YYYYMMDD");
        }
        return "";
    }
    const timeNow = toDate(new Date())

    //新增项目
    const add = () => {
        resetFields()
        dispatch({
            type: "project/updateState",
            payload: {
                modalVisible: true,
                modalTitle: "新增",
                projectType: "0",
                record: {
                    projectType: "0",
                    projectNo: "P" + timeNow
                }
            }
        })
    }

    //条件查询
    const query = () => {
        let fields = getFieldsValue();
        fields = handleFields(fields)
        dispatch({
            type: "project/query",
            payload: fields
        })
    }

    const handleFields = (fields) => {
        const { setupTime } = fields
        if (setupTime !== undefined) {
            fields.setupTimeStart = setupTime[0].format('YYYY-MM-DD')
            fields.setupTimeEnd = setupTime[1].format('YYYY-MM-DD')
            delete fields.setupTime
        }
        return fields
    }

    const handleChange = (key, values) => {
        let fields = getFieldsValue()
        fields[key] = values
        fields = handleFields(fields)
    }

    //分页
    const listChange = (pagination) => {
        let fields = getFieldsValue();
        fields = handleFields(fields)
        fields.pageNum = pagination.current,
        fields.pageSize = pagination.pageSize,
            dispatch({
                type: "project/query",
                payload: fields
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
            userurl = "project/addIssue";
        }
        if (issueType === "1") {
            userurl = "project/updateIssue";
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
            type: "project/updateState",
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
            <div className={styles.projecBack}>
                <div className={styles.projecList}>
                    <Row style={{ paddingTop: 30, marginBottom: 15 }}>
                        <Col span={4}>
                            {getFieldDecorator("projectName", {
                            })(
                                <Search style={{ width: 200 }} onSearch={query} placeholder="项目名称"></Search>
                            )}
                        </Col>
                        <Col span={4}>
                            {getFieldDecorator("state", {
                            })(
                                <Select style={{ width: 200 }}>
                                    <Option key="" value="">全部</Option>
                                    <Option key="0" value="0">立项</Option>
                                    <Option key="1" value="1">投标</Option>
                                    <Option key="2" value="2">签约</Option>
                                    <Option key="3" value="3">验收</Option>
                                    <Option key="4" value="4">维护</Option>
                                </Select>
                            )}
                        </Col>
                        <Col span={6} >
                            {getFieldDecorator('setupTime', {
                                // initialValue: initialCreateTime
                            })(
                                <RangePicker style={{ width: '100%' }} placeholder={["开始时间", "结束时间"]} format="YYYY-MM-DD" onChange={handleChange.bind(null, 'setupTime')} />
                            )}
                        </Col>
                        <Button type="primary" onClick={query} style={{ marginRight: 15, marginLeft: 15 }}>查询</Button>
                        <Button onClick={add}>创建项目</Button>
                    </Row>
                    <Table
                        dataSource={projectList} columns={columns}
                        rowKey={(record) => { return record.id }}
                        loading={loading.effects['project/query']}
                        bordered={true}
                        pagination={{ showTotal: () => `总共 ${pagination.total} 条,共,共${pagination.pages}页`, showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ["10", "20", "50"], ...pagination }}
                        onChange={listChange}
                    />
                </div>
            </div>
            <Modal {...modalProps} okText="提交" onOk={onOk} cancelText="关闭" width={500}>
                <Form>
                    <FormItem label="项目名称" {...formItemLayout}>
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
                    <FormItem label="项目编号" {...formItemLayout}>
                        {getFieldDecorator("projectNo", {
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
                    <FormItem label="销售人员" {...formItemLayout}>
                        {getFieldDecorator("projectSales", {
                            // initialValue: record.issueContent,
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
                    <FormItem label="项目预算" {...formItemLayout}>
                        {getFieldDecorator("projectAmount", {
                            // initialValue: record.issueContent,
                            rules: [
                                {
                                    required: true,
                                    message: '不能为空',
                                }
                            ]
                        })(
                            <InputNumber />
                        )}
                    </FormItem>
                    <FormItem label="立项时间" {...formItemLayout}>
                        {getFieldDecorator("setUpDate", {
                            // initialValue: record.issueContent,
                            rules: [
                                {
                                    required: true,
                                    message: '不能为空',
                                }
                            ]
                        })(
                            <DatePicker />
                        )}
                    </FormItem>
                    <FormItem label="项目状态" {...formItemLayout}>
                        {getFieldDecorator("state", {
                            // initialValue: record.issueContent,
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
                    <FormItem label="项目描述" {...formItemLayout}>
                        {getFieldDecorator("issueContent", {
                            // initialValue: record.issueContent,
                        })(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </Page>
    )
}

Project.propsTypes = {}

export default connect(({ project, loading }) => ({ project, loading }))(Form.create({})(Project))
