import { demandQuery,projectQuery,accQuery,addDemand } from '../services/demand'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {

    namespace:"demand",

    state:{
      demandList:[],
      modalVisible: false,
      projectList: [],
      accList: [],
      pId:"",
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
          const demandResult = yield call(demandQuery,payload)
          const projectResult = yield call(projectQuery)
          const accResult = yield call(accQuery)
          console.log(demandResult)
          if (demandResult && demandResult.success && demandResult.rspCode === '000000' && projectResult && projectResult.success && projectResult.rspCode === '000000' && accResult && accResult.success && accResult.rspCode === '000000') {
            yield put({
              type: 'updateState',
              payload: {
                demandList:demandResult.data.demandList,
                projectList:projectResult.data.projectList,
                accList:accResult.data.userList,
                },
              })
          }else{
            
          }
        },
        * addDemand ({
        payload = {},
        }, { select, call, put }) {
          const result = yield call(addDemand,payload)
          if (result && result.success && result.rspCode === '000000') {
            yield put({
              type: 'updateState',
              payload: {
                modalVisible: false
                },
              })
              yield put({ type: 'query' })
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
