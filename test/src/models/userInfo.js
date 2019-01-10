import { userQuery, editUser } from '../services/userInfo'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

    namespace: "userInfo",

    state: {
        demandList: [],
        modalVisible: false,
        projectList: [],
        accList: [],
        pId: "",
        record: {},
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/userInfo') {
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
            const result = yield call(userQuery, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        record: result.data.user,
                    },
                })
            } else {
                message.error(result.rspMsg)
            }
        },

        * editUser({
            payload = {},
        }, { select, call, put }) {
            const result = yield call(editUser, payload)
            if (result && result.success && result.rspCode === '000000') {
                message.success(result.rspMsg)
                yield put({
                    type: 'query',
                    payload: {
                        userName: sessionStorage.getItem("userName"),
                    },
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
