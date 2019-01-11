import { userRegister, checkUserName, checkPhone } from '../services/register'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

  namespace: "userRegister",

  state: {
    record: {},
    userNameFlag: 0,
    phoneFlag:0,
  },

  subscriptions: {
    setup({ dispatch, history }) {

    },
  },

  effects: {
    * register({
      payload = {},
    }, { select, call, put }) {
      const result = yield call(userRegister, payload)
      if (result && result.success && result.rspCode === '000000') {
        message.success(result.rspMsg)
        // sessionStorage.setItem('userName', result.data)
        yield put({
          type: 'updateState',
          payload: {
          },
        })
        yield put(routerRedux.push('/login'))
      } else {
        message.error(result.rspMsg)
      }
    },

    * checkUserName({
      payload = {},
    }, { select, call, put }) {
      const result = yield call(checkUserName, payload)
      if (result && result.success && result.rspCode === '1') {
        yield put({
          type: 'updateState',
          payload: {
            userNameFlag: 1
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            userNameFlag: 0
          },
        })
        message.error("账号重复")
      }
    },

    * checkPhone({
      payload = {},
    }, { select, call, put }) {
      const result = yield call(checkPhone, payload)
      if (result && result.success && result.rspCode === '1') {
        yield put({
          type: 'updateState',
          payload: {
            phoneFlag: 1
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            phoneFlag: 0
          },
        })
        message.error("手机号重复")
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
