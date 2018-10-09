import { userQuery } from '../services/app'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

    namespace:"app",

    state:{
        user:[]
    },

    subscriptions: {
        setupHistory ({ dispatch, history }) {
            history.listen((location) => {
            //     if (location.pathname === '/index') {
                  const payload = {
                      userName: localStorage.getItem("userName")
                    }
                    alert("asdasdasd")
                  dispatch({
                    type: 'query',
                    payload })
                // }
              })
        },
      },

      effects: {
        * query ({
        payload = {},
        }, { select, call, put }) {
          if(payload.userName===null||payload.userName===undefined||payload.userName===""){
            yield put(routerRedux.push('/login'))
          }
          alert("aaaa")
          const result = yield call(userQuery, payload)
          
          if (result && result.success && result.rspCode === '000000') {
            const { data } = result
            yield put({
            type: 'updateState',
            payload: {
              },
            })
          } else {

          }
        },
      },

}
