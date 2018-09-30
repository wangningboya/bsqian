import React, { Component } from 'react'
import { connect } from 'dva'
import { Menu, Icon,Layout } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Header.less'

const SubMenu = Menu.SubMenu;

class Sider extends Component {
    render() {
        return (
            <Layout.Sider>
                <Menu
                    // selectedKeys={[location.pathname]}
                    mode="inline"
                    theme="dark"
                    className={styles.Menu}
                >
                <Menu.Item key="/">
                        <Link to="/">
                            <Icon type="home" />Home
                        </Link>
                </Menu.Item>
                <SubMenu title="aaa">
                    <Menu.Item key="/users">
                        <Link to="/users">
                            <Icon type="bars" />Users
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/404">
                        <Link to="/page-you-dont-know">
                            <Icon type="frown-circle" />404
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/antd">
                        <a href="https://www.baidu.com">baidu</a>
                    </Menu.Item>
                </SubMenu>
                </Menu>
            </Layout.Sider>
        )
    }
}

export default connect()(Sider)