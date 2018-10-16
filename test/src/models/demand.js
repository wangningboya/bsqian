import { demandQuery,projectQuery,accQuery,addDemand, updateDemand } from '../services/demand'
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
      record:{},
    },

    subscriptions: {
        setup ({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/demand') {
                  const payload = {
                      userName: localStorage.getItem("userName"),
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
          console.log("result")
          console.log(result)
          console.log("result")
          if (result && result.success && result.rspCode === '000000') {
            yield put({
              type: 'updateState',
              payload: {
                demandList:result.data.demandList,
                pagination: {
                  current: Number(result.data.demandListPage.pageNum) || 1,
                  pageSize: Number(result.data.demandListPage.pageSize) || 10,
                  pages: result.data.demandListPage.pages,
                  total: result.data.demandListPage.total,
                },
                },
              })
          }else{
            message.error(result.rspMsg)
          }
        },
        * modalQuery ({
        payload = {},
        }, { select, call, put }) {
          const projectResult = yield call(projectQuery)
          const accResult = yield call(accQuery)
          if (projectResult && projectResult.success && projectResult.rspCode === '000000' && accResult && accResult.success && accResult.rspCode === '000000') {
            yield put({
              type: 'updateState',
              payload: {
                projectList:projectResult.data.projectList,
                accList:accResult.data.userList,
                },
              })
          }else{
            message.error("查询失败")
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
            message.error(result.rspMsg)
          }
        },

        * updateDemand ({
        payload = {},
        }, { select, call, put }) {
          const result = yield call(updateDemand,payload)
          if (result && result.success && result.rspCode === '000000') {
            yield put({
              type: 'updateState',
              payload: {
                modalVisible: false
                },
              })
              yield put({ type: 'query' })
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
