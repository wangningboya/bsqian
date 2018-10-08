import modelExtend from 'dva-model-extend'
import { pageModel } from 'models/common'
import { userLogin} from 'services/login'

export default {

    namespace:"userLogin",

    state:{
      record:{},
    },

    subscriptions: {
        setup ({ dispatch, history }) {

        },
      },

      effects: {
        * login ({
        payload = {},
        }, { select, call, put }) {
           
            console.log("ssssssssssssss")
          const result = yield call(userLogin, payload)
          if (result && result.success && result.rspCode === '000000') {
            const { data } = result
            yield put({
              type: 'updateState',
              payload: {

              },
            })
          } else {
            throw data
          }
        },
      },

}