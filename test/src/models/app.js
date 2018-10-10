import { userQuery } from '../services/app'
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
                      userName: localStorage.getItem("userName")
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
          userName: localStorage.getItem("userName")
        },
        }, { select, call, put }) {
          if(payload.userName===null||payload.userName===undefined||payload.userName===""){
            yield put(routerRedux.push('/login'));
          }
          const result = yield call(userQuery, payload)
          
          if (result && result.success && result.rspCode === '000000') {
            const { data } = result
            console.log("data")
            console.log(data.user)
            console.log("data")
            yield put({
            type: 'updateState',
            payload: {
              user:data.user
              },
            })
          } else {
              
          }
        },
        * logout ({
        payload = {},
        }, { select, call, put }) {
          localStorage.clear();
          // yield put({ type: 'query' })
          yield put(routerRedux.push('/login'));
        },
      },

}