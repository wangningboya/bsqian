import { userRegister, check } from '../services/register'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

  namespace: "userRegister",

  state: {
    record: {},
    flag: 0,
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
      console.log(result)
      if (result && result.success && result.rspCode === '000000') {
        message.success(result.rspMsg)
        sessionStorage.setItem('userName', result.data)
        yield put({
          type: 'updateState',
          payload: {
          },
        })
        yield put(routerRedux.push('/index'))
      } else {
        message.error(result.rspMsg)
      }
    },

    * check({
      payload = {},
    }, { select, call, put }) {
      const result = yield call(check, payload)
      if (result && result.success && result.rspCode === '1') {
        yield put({
          type: 'updateState',
          payload: {
            flag: 1
          },
        })
      } else {
        yield put({
          type: 'updateState',
          payload: {
            flag: 0
          },
        })
        message.error("账号重复")
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
