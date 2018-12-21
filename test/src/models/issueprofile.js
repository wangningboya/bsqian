import { getIssueById } from '../services/issue'
import { } from 'antd'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'

export default {

    namespace: "issueprofile",

    state: {
        issue: {},
        creatModalVisible: false,
        modalType: 'create',
        projects: [],
        products: [],
        resources: [],
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
            console.log(result)
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        user: result.data.user,
                        issue:result.data.issue
                    },
                })
            } else {

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
