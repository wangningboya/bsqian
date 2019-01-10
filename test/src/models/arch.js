import { remove, query, create, update } from '../services/arch'
// import { pageModel } from 'models/common'
import { arrayToTree } from '../utils'
import { message } from 'antd'


export default {

  namespace: 'arch',

  state: {
    addButtonGroupVisible: false,
    editButtonGroupVisible: false,
    delButtonGroupVisible: false,
    modalVisible: false,
    modalType: 'create',
    currentItem: {},
    archData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/arch') {
          const payload = {}
          dispatch({
            type: 'query',
            payload
          })
        }
      })
    },
  },

  effects: {
    * query({
      payload = {},
    }, { select, call, put }) {
      const result = yield call(query, payload)
      if (result && result.success && result.rspCode === '000000') {
        const archTree = arrayToTree(result.data, 'id', 'parentId')
        yield put({
          type: 'updateState',
          payload: {
            archData: archTree,
          },
        })
      } else {
        message.error(result.rspMsg)
      }
    },

    * create({
      payload
    }, { select, call, put }) {
      const result = yield call(create, payload)
      if (result && result.success && result.rspCode === '000000') {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        message.error(result.rspMsg)
      }
    },

    * update({
      payload
    }, { select, call, put }) {
      const result = yield call(update, payload)
      if (result && result.success && result.rspCode === '000000') {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        message.error(result.rspMsg)
      }
    },

    * remove({
      payload,
    }, { select, call, put }) {
      const result = yield call(remove, payload)
      if (result && result.success && result.rspCode === '000000') {
        yield put({ type: 'query' })
      } else {
        message.error(result.rspMsg)
      }
    },
  },

  reducers: {

    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

  },
}
