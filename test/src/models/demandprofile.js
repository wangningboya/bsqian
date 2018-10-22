import { getDemandById } from '../services/demand'
import {  } from 'antd'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'

export default {

    namespace:"demandprofile",

    state:{
        demand:{}
    },

    subscriptions: {
        setup ({ dispatch, history }) {
            history.listen((location) => {
                const match = pathToRegexp('/demand/:id').exec(location.pathname)
                if (match) {
                    dispatch({ 
                        type: 'query', 
                        payload: { 
                            id: match[1] 
                        } 
                    })
                }
              })
        },
      },

      effects: {
        * query ({
        payload = {},
        }, { select, call, put }) {
            const result = yield call(getDemandById,payload)
            console.log(result)
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                      demand: result.data.demand
                      },
                    })
            }else {

            }
        }
    
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
