import { issueQuery } from '../services/issue'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

    namespace:"issue",

    state:{
      issueList:[],
      modalVisible: false,
      record:{},
      toState: {
        '0':'未处理',
        '1':'已创建需求',
        '2':'关闭'
      }
    },

    subscriptions: {
        setup ({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/issue') {
                  const payload = {
                      userName: sessionStorage.getItem("userName"),
                    }
                  dispatch({
                    type: 'query',
                    payload })
                }
              })
        },
      },

      effects: {
        * query ({
        payload = {},
        }, { select, call, put }) {
          const result = yield call(issueQuery,payload)
          if (result && result.success && result.rspCode === '000000') {
            yield put({
              type: 'updateState',
              payload: {
                issueList:result.data.list,
                pagination: {
                  current: Number(result.data.pageNum) || 1,
                  pageSize: Number(result.data.pageSize) || 10,
                  pages: result.data.pages,
                  total: result.data.total,
                },
                },
              })
          }else{
            message.error(result.rspMsg)
          }
        },

  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
