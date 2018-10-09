import { userLogin} from '../services/login'

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
        console.log(payload)
        console.log(userLogin)
        const result = yield call(userLogin, payload)
        console.log("asdeasdad")
        if (result && result.success && result.rspCode === '000000') {
          // const { data } = result
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

}