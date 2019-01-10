import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import moment from 'moment'
import { connect } from 'dva'
import { Page } from '../../../components'
import { Row, Col, Button, Tree, Input, Icon, Modal, Card, Timeline } from 'antd'
import CreateModal from './Modal'
import ResModal from './ResModal'
import DescriptionList from '../../../components/DescriptionList'
import styles from './index.less'

const TreeNode = Tree.TreeNode
const Search = Input.Search
const confirm = Modal.confirm
const { Description } = DescriptionList

const timeLineData = [
  {
    logTypeName: '进入公司',
    logContant: '加入鑫义大家庭',
    occurTime: '2017-07-02',
  }, {
    logTypeName: '进入项目组',
    logContant: '进入了王小二团队',
    occurTime: '2017-07-10',
  },
]

const Organization = ({ organization, dispatch, loading, location }) => {
  const { archData, timelineData, orgData, resModalVisible, buttonGroupVisible, buttonResTypeVisible, deleteButtonVisible, modalVisible, modalType, currentItem } = organization

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    parentItem: modalType === 'create' ? currentItem : {},
    visible: modalVisible,
    maskClosable: false,
    modalType,
    archData,
    confirmLoading: loading.effects['organization/update'],
    title: `${modalType === 'create' ? '创建资源' : '编辑资源'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `organization/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'organization/hideModal',
      })
    },
  }

  const resModalProps = {
    item: currentItem,
    visible: resModalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['organization/restypecreate'],
    title: '创建资源类型',
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: 'organization/restypecreate',
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'organization/hideResModal',
      })
    },
  }

  const onAdd = () => {
    dispatch(
      {
        type: 'organization/showModal',
        payload: {
          modalType: 'create',
        },
      }
    )
  }

  const onSelect = (selectedKeys, info) => {
    if (info.node.props.dataRef.type === 1) {
      dispatch({
        type: 'organization/updateState',
        payload: {
          buttonResTypeVisible: false,
          buttonGroupVisible: info.selected,
          deleteButtonVisible: false,
          currentItem: info.node.props.dataRef,
        },
      })
    } else if (info.node.props.dataRef.type === 2) {
      dispatch({
        type: 'organization/updateState',
        payload: {
          buttonResTypeVisible: false,
          buttonGroupVisible: false,
          deleteButtonVisible: true,
          currentItem: info.node.props.dataRef,
        },
      })
      dispatch({
        type: 'organization/querytimeline',
      })
    } else if (info.node.props.dataRef.type === 0) {
      dispatch({
        type: 'organization/updateState',
        payload: {
          buttonResTypeVisible: true,
          buttonGroupVisible: false,
          deleteButtonVisible: false,
          currentItem: info.node.props.dataRef,
        },
      })
    }
  }

  const onDelete = () => {
    confirm({
      title: '确定删除该资源信息吗?',
      onOk() {
        dispatch({
          type: 'organization/remove',
          payload: {
            item: currentItem,
          },
        })
      },
    })
  }

  const onEditItem = () => {
    dispatch({
      type: 'organization/showModal',
      payload: {
        modalType: 'update',
      },
    })
  }

  const onAddResType = () => {
    dispatch({
      type: 'organization/showResModal',
    })
  }

  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.resourceName.concat('(', item.children.length, ')')} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode title={item.resourceName + '(' + item.resourcePhase + ')'} key={item.key} dataRef={item} />
    })
  }

  return (
    <Page inner>
      <Row gutter={24}>
        <Col span={8}>
          {buttonResTypeVisible &&
            <Button onClick={onAddResType} size={'small'}>
              <Icon type="plus" />添加资源类型
            </Button>
          }
          {buttonGroupVisible &&
            <Button onClick={onAdd} size={'small'}>
              <Icon type="plus" />添加资源
            </Button>
          }
          {deleteButtonVisible &&
            <Button.Group size={'small'} >
              <Button onClick={onEditItem}>
                <Icon type="edit" />编辑资源
              </Button>
              <Button type="danger" onClick={onDelete}>
                <Icon type="delete" />删除资源
              </Button>
            </Button.Group>
          }
          <Tree
            showLine
            onSelect={onSelect}
          >
            {renderTreeNodes(orgData)}
          </Tree>
        </Col>
        <Col span={16}>
          {deleteButtonVisible &&
            <Card title="资源信息">
              <Card.Grid style={{ width: '100%' }}>
                <DescriptionList size="small" style={{ marginBottom: 16 }} title="个人基本信息">
                  <Description term="姓名">{currentItem.resourceName}</Description>
                  <Description term="职位">{currentItem.resourceTitle}</Description>
                  <Description term="职级">{currentItem.resourcePhase}</Description>
                  <Description term="联系方式">{currentItem.resourceTel}</Description>
                  <Description term="联系方式">{currentItem.resourceEmail}</Description>
                  <Description term="所属部门">{currentItem.resourceDepartName}</Description>
                  <Description term="入职时间">{moment(currentItem.resourceSetupDate).format('YYYY-MM-DD')}</Description>
                  <Description term="描述">{currentItem.resourceDescription}</Description>
                </DescriptionList>
              </Card.Grid>
              <Card.Grid style={{ width: '100%' }}>
                {<div><h3> 工作历程 </h3> <br /> </div>}
                <Timeline>
                  {timelineData.map((item, index) => {
                    return <Timeline.Item key={index}> {item.logContent.concat(' ').concat(moment(item.occurTime).format('YYYY-MM-DD'))}</Timeline.Item>
                  })}
                </Timeline>
              </Card.Grid>
            </Card>
          }
          {buttonGroupVisible &&
            <Card title={currentItem.resourceName.concat('组信息')} >
              <DescriptionList size="small" style={{ marginBottom: 16 }} >
                <Description term="总人数">{currentItem.children.length}</Description>
              </DescriptionList>
            </Card>
          }
        </Col>
      </Row>
      {modalVisible && <CreateModal {...modalProps} />}
      {resModalVisible && <ResModal {...resModalProps} />}
    </Page>
  )
}

Organization.propTypes = {
  organization: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ organization, loading }) => ({ organization, loading }))(Organization)
