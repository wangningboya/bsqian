import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Menu,Icon } from 'antd'
import styles from './Header.less'

const {SubMenu} = Menu

const Header = ({user, logout}) =>  {

    const logoutuser=()=>{
        logout();
    }

        return (
                <Layout.Header  className={styles.background}>
                    <div>
                        <Menu mode="horizontal" onClick={logoutuser}>
                        <SubMenu
                            style={{
                            float: 'right',
                            }}
                            title={<span>
                            <Icon type="user" />
                            {user.realName}
                            </span>}
                        >
                            <Menu.Item key="logout">
                                登出
                            </Menu.Item>
                        </SubMenu>
                        </Menu>
                    </div>
                </Layout.Header>     
        )
}

export default Header