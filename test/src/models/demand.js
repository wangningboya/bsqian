import { demandQuery } from '../services/demand'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

    namespace:"demand",

    state:{
      demandList:[],
      modalVisible: false,
    },

    subscriptions: {
        setup ({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/demand') {
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
        payload = {},
        }, { select, call, put }) {
          const result = yield call(demandQuery,payload)
          console.log(result)
          if (result && result.success && result.rspCode === '000000') {
            const {data} = result
            yield put({
              type: 'updateState',
              payload: {
                demandList:data.demandList,
                },
              })
          }else{
            
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
