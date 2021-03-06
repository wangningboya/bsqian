import { userLogin } from '../services/login'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

  namespace: "login",

  state: {
    record: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * login({
      payload = {},
    }, { select, call, put }) {
      const result = yield call(userLogin, payload)
      if (result && result.success && result.rspCode === '000000') {
        message.success(result.rspMsg)
        const { data } = result
        sessionStorage.setItem('userName', data.userName)
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
  },

}
