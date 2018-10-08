import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { login} from '../services/login'

export default modelExtend(pageModel,{

    namespace:"login",

    state:{
      record:{},
    },

    subscriptions: {
        setup ({ dispatch, history }) {
            // alert("654654654")
        //   history.listen((location) => {
        //     if (location.pathname === '/userQueryList') {
        //       const payload = location.query
        //       dispatch({
        //         type: 'query',
        //         payload })
        //     }
        //   })
        },
      },

      effects: {
        * login ({
        payload = {},
        }, { select, call, put }) {
            alert("6666a")
          const result = yield call(login, payload)
          alert("aaaa")
          if (result && result.success && result.rspCode === '000000') {
            const { data } = result;
            console.log(data);
            yield put({
              type: 'updateState',
              payload: {
            
              },
            })
          } else {
            // throw data
          }
        },
      },

      reducers: {
   
     },
  
})