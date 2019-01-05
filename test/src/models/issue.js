import { issueQuery, addIssue, deleteIssue, closeIssue } from '../services/issue'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

  namespace: "issue",

  state: {
    issueList: [],
    modalVisible: false,
    record: {},
    permissions: [],
    toState: {
      '0': '未处理',
      '1': '已创建需求',
      '2': '关闭'
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/issue') {
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
      const result = yield call(issueQuery, payload)
      if (result && result.success && result.rspCode === '000000') {
        yield put({
          type: 'updateState',
          payload: {
            issueList: result.data.issuePageInfo.list,
            permissions: result.data.user.permissions,
            pagination: {
              current: Number(result.data.issuePageInfo.pageNum) || 1,
              pageSize: Number(result.data.issuePageInfo.pageSize) || 10,
              pages: result.data.issuePageInfo.pages,
              total: result.data.issuePageInfo.total,
            },
          },
        })
      } else {
        message.error(result.rspMsg)
      }
    },

    * addIssue({
      payload = {},
    }, { select, call, put }) {
      const result = yield call(addIssue, payload)
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

    * deleteIssue({
      payload = {},
    }, { select, call, put }) {
      const result = yield call(deleteIssue, payload)
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

    * closeIssue({
      payload = {},
    }, { select, call, put }) {
      const result = yield call(closeIssue, payload)
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
