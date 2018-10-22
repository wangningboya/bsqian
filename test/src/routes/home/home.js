import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from '../../components'
import { Row, Col, Avatar, List, Card } from 'antd'
import styles from './index.less'
import Item from 'antd/lib/list/Item';
import { Link } from 'dva/router';
import moment from 'moment'
// import InfiniteScroll from 'react-infinite-scroller';

const Index = ({ home }) => {
    const { user, demandList, demandList2 } = home
    const getHelloWord = () =>{
        let now = new Date(),hour = now.getHours() 
          if(hour < 6){ return "凌晨好！" } 
            else if (hour < 9){ return "早上好！"} 
            else if (hour < 12){return "上午好！" } 
            else if (hour < 14){return "中午好！" } 
            else if (hour < 17){return "下午好！" } 
            else if (hour < 19){return "傍晚好！" } 
            else if (hour < 22){return "晚上好！" } 
            else {return "夜里好！"} 
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
                                className = {styles.myList}
                                dataSource = {demandList}
                                split = {true}
                                header = {<div>待我处理的任务</div>}
                                pagination = {{pageSize:3}}
                                renderItem = { item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={(
                                                <div>
                                                    <Link to = {`/demand/${ item.id }` }>{item.demandName}</Link>
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
                                dataSource = {demandList2}
                                pagination = {{pageSize:3}}
                                header={<div>提交的需求</div>}
                                renderItem = { item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={(
                                                <div>
                                                    <Link to = {`/demand/${ item.id }` }>{item.demandName}</Link>
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
                                title={<div>我参与的项目</div>}
                            />
                        </Col>
                        <Col span={8}>
                            <Card
                                title={<div>团队</div>}
                            />
                        </Col>
                        
                    </Row>
                    
                </Page>
        )
}

Index.propsTypes = {}

export default connect(({ home,loading }) => ({ home,loading }))(Index)
