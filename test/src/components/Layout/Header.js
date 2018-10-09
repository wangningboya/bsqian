import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Menu,Icon } from 'antd'
import styles from './Header.less'

const {SubMenu} = Menu

const Header = ({user}) =>  {
        return (
                <Layout.Header  className={styles.background}>
                    <div>
                        <Menu mode="horizontal">
                        <SubMenu
                            style={{
                            float: 'right',
                            }}
                            title={<span>
                            <Icon type="user" />
                            {localStorage.getItem("userName")}
                            </span>}
                        >
                            <Menu.Item key="logout">
                                Sign out
                            </Menu.Item>
                        </SubMenu>
                        </Menu>
                    </div>
                </Layout.Header>     
        )
}

export default connect()(Header)