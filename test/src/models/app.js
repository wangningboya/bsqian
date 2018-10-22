import { userQuery,logout } from '../services/app'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

    namespace:"app",

    state:{
        user:{},
        menu:[],
    },

    subscriptions: {
        setupHistory ({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname !== '/login') {
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
        payload = {
          userName: sessionStorage.getItem("userName")
        },
        }, { select, call, put }) {
          if(payload.userName===null||payload.userName===undefined||payload.userName===""){
            yield put(routerRedux.push('/login'));
          }
          const result = yield call(userQuery, payload)
          if (result && result.success && result.rspCode === '000000') {
            const { data } = result
            yield put({
            type: 'updateState',
            payload: {
              user:data.user,
              menu:data.authList
              },
            })
          } else {
              
          }
        },
        * logout ({
        payload = {},
        }, { select, call, put }) {
          const data = yield call(logout, payload)
          if (data.success) {
            message.success(data.rspMsg)
            sessionStorage.clear();
            yield put(routerRedux.push('/login'));
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
