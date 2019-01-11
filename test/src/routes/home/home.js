import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from '../../components'
import { Row, Col, Avatar, List, Card } from 'antd'
import styles from './index.less'
import { Link } from 'dva/router';
import moment from 'moment'
// import InfiniteScroll from 'react-infinite-scroller';

const Index = ({ home }) => {
    const { user, myTaskDemandList, myCreateDemandList, leader, teams, projects } = home
    const getHelloWord = () => {
        let now = new Date(), hour = now.getHours()
        if (hour < 6) { return "凌晨好！" }
        else if (hour < 9) { return "早上好！" }
        else if (hour < 12) { return "上午好！" }
        else if (hour < 14) { return "中午好！" }
        else if (hour < 17) { return "下午好！" }
        else if (hour < 19) { return "傍晚好！" }
        else if (hour < 22) { return "晚上好！" }
        else { return "夜里好！" }
    }

    return (
        <Page>
            <div className={styles.header}>
                <div>
                    <Avatar className={styles.avater} size="large" src="/src/img/xjj.jpg" alt="头像" />
                </div>
                <div className={styles.title}>{getHelloWord()}{user.realName},祝你开心每一天</div>
            </div>
            <Row gutter={24}>
                <Col span={16}>
                    <List
                        className={styles.myList}
                        dataSource={myTaskDemandList}
                        split={true}
                        header={<div>待我处理的任务</div>}
                        pagination={{ pageSize: 3 }}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    title={(
                                        <div>
                                            <Link to={`/demand/${item.id}`}>{item.demandName}</Link>
                                        </div>
                                    )}
                                />
                                <div>
                                    交付时间：
                                            {item.deliveryTime && (
                                        <span title={item.deliveryTime}>
                                            {moment(item.deliveryTime).format("YYYY-MM-DD")}
                                        </span>
                                    )}
                                </div>
                            </List.Item>
                        )}
                    />
                    <List
                        className={styles.myList}
                        dataSource={myCreateDemandList}
                        pagination={{ pageSize: 3 }}
                        header={<div>我提交的需求</div>}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    title={(
                                        <div>
                                            <Link to={`/demand/${item.id}`}>{item.demandName}</Link>
                                        </div>
                                    )}
                                />
                                <div>
                                    交付时间：
                                            {item.deliveryTime && (
                                        <span title={item.deliveryTime}>
                                            {moment(item.deliveryTime).format("YYYY-MM-DD")}
                                        </span>
                                    )}
                                </div>
                            </List.Item>
                        )}
                    />
                    <Card
                        className={styles.projectList}
                        style={{ marginBottom: 24 }}
                        title="我参与的项目"
                        bordered={false}
                        bodyStyle={{ padding: 0 }}
                    >
                        {
                            projects.map(item => (
                                <Card.Grid className={styles.projectGrid} key={item.id}>
                                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                                        <Card.Meta
                                            title={(
                                                <div className={styles.cardTitle}>
                                                    {item.projectName}
                                                </div>
                                            )}
                                            description={item.projDescription}
                                        />
                                        <div className={styles.projectItemContent}>
                                            {item.gmtCreate && (
                                                <span className={styles.datetime} title={item.gmtCreate}>
                                                    {moment(item.gmtCreate).fromNow()}
                                                </span>
                                            )}
                                        </div>
                                    </Card>
                                </Card.Grid>
                            ))
                        }
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
                        bordered={false}
                        title="团队"
                    >
                        <div className={styles.members}>
                            <Row gutter={48}>
                                {(leader !== null && leader !== undefined) &&
                                    <Col span={24} key={`members-item-${leader.id}`}>
                                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="small" >L</Avatar>
                                        <span className={styles.member}>{leader.resName}</span>
                                    </Col>
                                }
                                {
                                    teams.map(item => (
                                        <Col span={12} key={`members-item-${item.id}`}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} size="small" >M</Avatar>
                                            <span className={styles.member}>{item.resName}</span>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                    </Card>
                </Col>

            </Row>

        </Page>
    )
}

Index.propsTypes = {}

export default connect(({ home, loading }) => ({ home, loading }))(Index)
