import { getIssueById, projectQuery, accQuery, issueToDemand } from '../services/issue'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'

export default {

    namespace: "issueprofile",

    state: {
        issue: {},
        creatModalVisible: false,
        record: {},
        projectList: [],
        accList: [],
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                const match = pathToRegexp('/issue/:id').exec(location.pathname)
                if (match) {
                    dispatch({
                        type: 'query',
                        payload: {
                            id: match[1]
                        }
                    })
                }
            })
        },
    },

    effects: {
        * query({
            payload = {},
        }, { select, call, put }) {
            const result = yield call(getIssueById, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        user: result.data.user,
                        issue: result.data.issue
                    },
                })
            } else {

            }
        },

        * modalQuery({
            payload = {},
        }, { select, call, put }) {
            const projectResult = yield call(projectQuery)
            const accResult = yield call(accQuery)
            if (projectResult && projectResult.success && projectResult.rspCode === '000000' && accResult && accResult.success && accResult.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        projectList: projectResult.data.projectList,
                        accList: accResult.data.userList,
                    },
                })
            } else {
                message.error("查询失败")
            }
        },

        * issueToDemand({
            payload = {},
        }, { select, call, put }) {
            const result = yield call(issueToDemand, payload)
            const issueId = payload.issueId
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        createModalVisible: false,
                        record:{}
                    },
                })
                yield put({
                    type: 'query',
                    payload: {
                        id: issueId
                    }
                })
            } else {
                message.error("转换失败")
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

        showModal(state, { payload }) {
            return { ...state, ...payload, createModalVisible: true }
        },
    },

}
