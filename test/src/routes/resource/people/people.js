import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import moment from 'moment'
import { connect } from 'dva'
import { Page } from '../../../components'
import { Row, Col, Button, Tree, Input, Icon, Modal, Card, Timeline } from 'antd'
import CreateModal from './CreateModal'
import PickupModal from './PickupModal'
import DescriptionList from '../../../components/DescriptionList'

const TreeNode = Tree.TreeNode
const confirm = Modal.confirm
const { Description } = DescriptionList

const People = ({ people, dispatch, loading, location }) => {
    const { timelineData, candidateOption, teamOption, peopleData, buttonGroupVisible, deleteButtonVisible, addButtonVisible, currentItem, modalType, createModalVisible, pickupModalVisible } = people

    const createModalProps = {
        item: modalType === 'create' ? {} : currentItem,
        visible: createModalVisible,
        clusterOption: candidateOption,
        maskClosable: false,
        modalType,
        confirmLoading: loading.effects['people/createTeam'],
        title: `${modalType === 'create' ? '创建团队' : '编辑团队'}`,
        wrapClassName: 'vertical-center-modal',
        onOk(data) {
            dispatch({
                type: 'people/createTeam',
                payload: data,
            })
        },
        onCancel() {
            dispatch({
                type: 'people/hideCreateModal',
            })
        },
    }

    const pickupModalProps = {
        item: currentItem,
        visible: pickupModalVisible,
        clusterOption: teamOption,
        maskClosable: false,
        modalType,
        confirmLoading: loading.effects['people/pickup'],
        title: `${modalType === 'create' ? '选择团队' : '编辑团队'}`,
        wrapClassName: 'vertical-center-modal',
        onOk(data) {
            dispatch({
                type: 'people/pickup',
                payload: data,
            })
        },
        onCancel() {
            dispatch({
                type: 'people/hidePickupModal',
            })
        },
    }

    const onAdd = () => {
        dispatch(
            {
                type: 'people/showCreateModal',
                payload: {
                    modalType: 'create',
                },
            }
        )
    }

    const onPickup = () => {
        dispatch(
            {
                type: 'people/showPickupModal',
                payload: {
                    modalType: 'create',
                },
            }
        )
    }

    const onSelect = (selectedKeys, info) => {
        if (info.node.props.dataRef.type === 0) {
            dispatch({
                type: 'people/updateState',
                payload: {
                    buttonGroupVisible: false,
                    deleteButtonVisible: false,
                    addButtonVisible: true,
                    currentItem: info.node.props.dataRef,
                },
            })
        } else if (info.node.props.dataRef.type === 1) {
            dispatch({
                type: 'people/updateState',
                payload: {
                    buttonGroupVisible: true,
                    deleteButtonVisible: false,
                    addButtonVisible: false,
                    currentItem: info.node.props.dataRef,
                },
            })
        } else if (info.node.props.dataRef.type === 2 || info.node.props.dataRef.type === 3) {
            dispatch({
                type: 'people/updateState',
                payload: {
                    buttonGroupVisible: false,
                    deleteButtonVisible: true,
                    addButtonVisible: false,
                    currentItem: info.node.props.dataRef,
                },
            })
            dispatch({
                type: 'people/querytimeline',
            })
        } else if (info.node.props.dataRef.type === 4) {
            dispatch({
                type: 'people/updateState',
                payload: {
                    buttonGroupVisible: false,
                    deleteButtonVisible: false,
                    addButtonVisible: false,
                    currentItem: info.node.props.dataRef,
                },
            })
        }
    }

    const onDismiss = () => {
        confirm({
            title: '确定解散【'.concat(currentItem.resourceName).concat('团队】吗?'),
            onOk() {
                dispatch({
                    type: 'people/dismiss',
                    payload: {
                        teamId: currentItem.key,
                    },
                })
            },
        })
    }

    const onGetout = () => {
        confirm({
            title: '确定撤出【'.concat(currentItem.resourceName).concat('】吗?'),
            onOk() {
                dispatch({
                    type: 'people/getout',
                    payload: {
                        memberId: currentItem.key,
                    },
                })
            },
        })
    }

    const renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.type === 1 ? item.resourceName.concat('_团队') : item.resourceName} key={item.key} dataRef={item}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode title={item.resourceName.concat('(', item.resourcePhase, ')')} key={item.key} dataRef={item} />
        })
    }

    return (
        <Page inner>
            <Row gutter={24}>
                <Col span={8}>
                    {addButtonVisible &&
                        <Button onClick={onAdd} size={'small'}>
                            <Icon type="plus" />添加团队
                        </Button>
                    }
                    <Tree
                        showLine
                        onSelect={onSelect}
                    >
                        {renderTreeNodes(peopleData)}
                    </Tree>
                </Col>
                <Col span={16}>
                    {deleteButtonVisible &&
                        <Card title="资源信息" extra={currentItem.type === 3 ? <Button type="primary" size={'small'} icon="check" onClick={onPickup}>选中</Button> : <Button type="danger" size={'small'} icon="to-top" onClick={onGetout}>撤出</Button>}>
                            <Card.Grid style={{ width: '100%' }}>
                                <DescriptionList size="small" style={{ marginBottom: 16 }} title={currentItem.type === 1 ? '团队基本信息' : '人员基本信息'}>
                                    <Description term="姓名">{currentItem.resourceName}</Description>
                                    <Description term="职位">{currentItem.resourceTitle}</Description>
                                    <Description term="职级">{currentItem.resourcePhase}</Description>
                                    <Description term="联系方式">{currentItem.resourceTel}</Description>
                                    <Description term="电子邮箱">{currentItem.resourceEmail}</Description>
                                    <Description term="所属部门">{currentItem.resourceDepartName}</Description>
                                    <Description term="入职时间">{moment(currentItem.resourceSetupDate).format('YYYY-MM-DD')}</Description>
                                    <Description term="描述">{currentItem.resourceDescription}</Description>
                                </DescriptionList>
                            </Card.Grid>
                            <Card.Grid style={{ width: '100%' }}>
                                {<div><h3> 工作历程 </h3> <br /> </div>}
                                <Timeline>
                                    {timelineData.map((item, index) => {
                                        return <Timeline.Item key={index}> {item.logContent.concat(' ').concat(moment(item.occurTime).format('YYYY-MM-DD HH:mm:ss'))}</Timeline.Item>
                                    })}
                                </Timeline>
                            </Card.Grid>
                        </Card>
                    }
                    {buttonGroupVisible &&
                        <Card title="团队基本信息" extra={<Button type="danger" size={'small'} icon="close" onClick={onDismiss}>解散</Button>}>
                            <DescriptionList size="small" style={{ marginBottom: 16 }}>
                                <Description term="负责人">{currentItem.resourceName}</Description>
                                <Description term="联系方式">{currentItem.resourceTel}</Description>
                                <Description term="电子邮箱">{currentItem.resourceEmail}</Description>
                                <Description term="团队人数">{currentItem.children.length}</Description>
                            </DescriptionList>
                        </Card>
                    }
                </Col>
            </Row>
            {createModalVisible && <CreateModal {...createModalProps} />}
            {pickupModalVisible && <PickupModal {...pickupModalProps} />}
        </Page>
    )
}

People.propTypes = {
    people: PropTypes.object,
    loading: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
}

export default connect(({ people, loading }) => ({ people, loading }))(People)
