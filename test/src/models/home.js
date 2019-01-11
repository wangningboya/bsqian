import { query } from '../services/home'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

  namespace: "home",

  state: {
    user: {},
    teams: [],
    leader: {},
    projects:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/index') {
          const payload = {
            userName: sessionStorage.getItem("userName")
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
      const result = yield call(query, payload)
      console.log(result)
      if (result && result.success && result.rspCode === '000000') {
        yield put({
          type: 'updateState',
          payload: {
            user: result.data.user,
            myTaskDemandList: result.data.myTaskDemandList.list,
            myCreateDemandList: result.data.myCreateDemandList.list,
            teams: result.data.teams,
            leader: result.data.teamLeader,
            projects: result.data.projects,
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
