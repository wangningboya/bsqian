import { projectQuery, addProject, pmQuery, deleteProject } from '../services/project'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

    namespace: "project",

    state: {
        projectList: [],
        modalVisible: false,
        record: {},
        permissions: [],
        toState: {
            '0': '未处理',
            '1': '已创建需求',
            '2': '关闭'
        },
        pmList: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/project') {
                    const payload = {
                        userName: sessionStorage.getItem("userName"),
                    }
                    dispatch({
                        type: 'query',
                        payload
                    })
                }
            })
        },
    },

    effects: {
        * query({
            payload = {},
        }, { select, call, put }) {
            const result = yield call(projectQuery, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        projectList: result.data.projectList.list,
                        permissions: result.data.user.permissions,
                        pagination: {
                            current: Number(result.data.projectList.pageNum) || 1,
                            pageSize: Number(result.data.projectList.pageSize) || 10,
                            pages: result.data.projectList.pages,
                            total: result.data.projectList.total,
                        },
                    },
                })
            } else {
                message.error(result.rspMsg)
            }
        },

        * addProject({
            payload = {},
        }, { select, call, put }) {
            const result = yield call(addProject, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        modalVisible: false
                    },
                })
                yield put({
                    type: 'query',
                    payload: {

                    }
                })
            } else {
                message.error(result.rspMsg)
            }
        },

        * modalQuery({
            payload = {},
        }, { select, call, put }) {
            const result = yield call(pmQuery)
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        pmList: result.data.userList,
                    },
                })
            } else {
                message.error("查询失败")
            }
        },

        * deleteProject({
            payload = {},
        }, { select, call, put }) {
            const result = yield call(deleteProject, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'query',
                    payload: {

                    }
                })
            } else {
                message.error(result.rspMsg)
            }
        },

    },

    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}
