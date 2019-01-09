import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from '../../../components'
import moment from 'moment';
import { Row, Col, Button, Tree, Input, Icon, Card, Modal } from 'antd'
import CreateModal from './Modal'
import DescriptionList from '../../../components/DescriptionList'

const TreeNode = Tree.TreeNode
const Search = Input.Search
const confirm = Modal.confirm
const { Description } = DescriptionList

const Arch = ({ arch, dispatch, loading, location }) => {
  const { archData, addButtonGroupVisible, editButtonGroupVisible, delButtonGroupVisible, currentItem, modalType, modalVisible } = arch

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    parentItem: modalType === 'create' ? currentItem : {},
    visible: modalVisible,
    maskClosable: false,
    modalType,
    confirmLoading: loading.effects['people/createTeam'],
    title: `${modalType === 'create' ? '创建部门' : '编辑部门'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `arch/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'arch/hideModal',
      })
    },
  }

  const onAdd = () => {
    dispatch(
      {
        type: 'arch/showModal',
        payload: {
          modalType: 'create',
        },
      }
    )
  }

  const onEditItem = () => {
    dispatch(
      {
        type: 'arch/showModal',
        payload: {
          modalType: 'update',
        },
      }
    )
  }

  const onDeleteItem = () => {
    confirm({
      title: '确定删除吗?',
      onOk () {
        dispatch({
          type: 'arch/remove',
          payload: {
            id: currentItem.id,
          },
        })
      },
    })
  }

  const onSelect = (selectedKeys, info) => {
    if (info.node.props.dataRef.parentId === null) {
      dispatch({
        type: 'arch/updateState',
        payload: {
          addButtonGroupVisible: true,
          editButtonGroupVisible: false,
          delButtonGroupVisible: false,
          currentItem: info.node.props.dataRef,
        },
      })
    } else {
      dispatch({
        type: 'arch/updateState',
        payload: {
          addButtonGroupVisible: true,
          editButtonGroupVisible: true,
          delButtonGroupVisible: true,
          currentItem: info.node.props.dataRef,
        },
      })
    }
  }

  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.depName} key={item.id} dataRef={item}>
            { renderTreeNodes(item.children) }
          </TreeNode>
        )
      }
      return <TreeNode title={item.depName} key={item.id} dataRef={item} />
    })
  }
  return (
    <Page inner>
      <Row gutter={24}>
        <Col span={8}>
          { addButtonGroupVisible &&
            <Button onClick={onAdd} size={'small'}>
              <Icon type="plus" />添加
            </Button>
          }
          { editButtonGroupVisible &&
            <Button size={'small'} onClick={onEditItem}>
              <Icon type="edit" />编辑
            </Button>
          }
          { delButtonGroupVisible &&
            <Button type="danger" size={'small'} onClick={onDeleteItem}>
              <Icon type="delete" />删除
            </Button>
          }
          <Tree
            showLine
            onSelect={onSelect}
          >
            {renderTreeNodes(archData)}
          </Tree>
        </Col>
        <Col span={16}>
          <Card title="部门基本信息" >
            <DescriptionList size="small" style={{ marginBottom: 16 }}>
              <Description term="部门名称">{currentItem.depName}</Description>
              <Description term="部门代码">{currentItem.depCode}</Description>
              <Description term="创立时间">{moment(currentItem.createTime).format("YYYY-MM-DD")}{}</Description>
            </DescriptionList>
          </Card>
        </Col>
      </Row>
      {modalVisible && <CreateModal {...modalProps} />}
    </Page>
  )
}

Arch.propTypes = {
  arch: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ arch, loading }) => ({ arch, loading }))(Arch)
