import React, { Component } from 'react'
import { connect } from 'dva'
import { Menu, Icon,Layout } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Sider.less'
import lodash from 'lodash'

const SubMenu = Menu.SubMenu;

const Sider =({menu}) => {
    
    //数组格式转树状结构
    const arrayToTree = (array, id = 'id', parentID = 'parentID', children = 'children') => {
        let data = lodash.cloneDeep(array)
        let result = []
        let hash = {}
        data.forEach((item, index) => {
        hash[data[index][id]] = data[index]
        })
        data.forEach((item) => {
        let hash2 = hash[item[parentID]]
        if (hash2) {
            !hash2[children] && (hash2[children] = [])
            hash2[children].push(item)
        } else {
            result.push(item)
        }
        })
        return result
    }
    const menuTree=arrayToTree(menu.filter(a => a.parentID !== '-1'), 'id', 'parentID')
    console.log(menu)
    console.log(menuTree)
    // 递归生成菜单
    const getMenu = (menuTree2) => {
        return menuTree2.map((item) => {
        if (item.children) {
            return (
            <Menu.SubMenu
                key={item.id}
                title={<span>
                {item.image && <Icon type={item.image} />}
                { item.authName}
                </span>}
            >
                {getMenu(item.children)}
            </Menu.SubMenu>
            )
        }
        return (
            <Menu.Item key={item.id}>
            <Link to={item.url || '#'}>
            {item.image && <Icon type={item.image} />}
            { item.authName}
            </Link>
            </Menu.Item>
        )
        })
    }
    const menuItems = getMenu(menuTree)

        return (
            <Layout.Sider width={300}>
                <Menu
                    mode="inline"
                    theme="light"
                    className={styles.Menu}
                >
                    {menuItems}
                </Menu>
            </Layout.Sider>
        )
}

export default connect()(Sider)