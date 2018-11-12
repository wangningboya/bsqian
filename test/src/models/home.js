import { userQuery, myTask, myCreate } from '../services/home'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

    namespace:"home",

    state:{
      user:{},
    },

    subscriptions: {
        setup ({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/index') {
                  const payload = {
                      userName: sessionStorage.getItem("userName")
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
          const userResult = yield call(userQuery, payload)
          const demandResult = yield call(myTask, payload)
          const demandResult2 = yield call(myCreate, payload)

          if (userResult && userResult.success && userResult.rspCode === '000000') {
            yield put({
            type: 'updateState',
            payload: {
                user:userResult.data.user,
                demandList:demandResult.data.list,
                demandList2:demandResult2.data.list
              },
            })
          } else {
            message.error(userResult.rspMsg)
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
