import { query, create, remove, update, createResType, restimeline } from '../services/organization'
import { arrayToTree } from '../utils'
import { message } from 'antd'

export default {

  namespace: 'organization',

  state: {
    buttonGroupVisible: false,
    modalVisible: false,
    deleteButtonVisible: false,
    buttonResTypeVisible: false,
    modalType: 'create',
    resModalVisible: false,
    currentItem: {},
    orgData: [],
    timelineData: [],
    archData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/organization') {
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
      payload,
    }, { call, put }) {
      const result = yield call(query, payload)

      if (result && result.success && result.rspCode === '000000') {
        yield put({
          type: 'updateState',
          payload: {
            orgData: result.data.orgData,
            archData: arrayToTree(result.data.archData, 'id', 'parentId'),
          },
        })
      } else {
        message.error(result.rspMsg)
      }
    },

    * create({ payload }, { call, put }) {
      const result = yield call(create, payload)
      if (result && result.success && result.rspCode === '000000') {
        message.success(result.rspMsg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        message.error(result.rspMsg)
      }
    },

    * update({ payload }, { select, call, put }) {
      const id = yield select(({ organization }) => organization.currentItem.key)
      const newUser = { ...payload, id }
      const result = yield call(update, newUser)
      if (result && result.success && result.rspCode === '000000') {
        message.success(result.rspMsg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        message.error(result.rspMsg)
      }
    },

    * remove({
      payload,
    }, { select, call, put }) {
      const id = yield select(({ organization }) => organization.currentItem.key)
      const newUser = { ...payload, id }
      const result = yield call(remove, newUser)
      if (result && result.success && result.rspCode === '000000') {
        message.success(result.rspMsg)
        yield put({ type: 'query' })
      } else {
        message.error(result.rspMsg)
      }
    },

    * querytimeline({ payload }, { select, call, put }) {
      const id = yield select(({ organization }) => organization.currentItem.key)
      const newUser = { ...payload, id }
      const { success, data } = yield call(restimeline, newUser)
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            timelineData: data,
          },
        })
      } else {
        message.error(data.rspMsg)
      }
    },

    * restypecreate({ payload }, { call, put }) {
      const result = yield call(createResType, payload)
      if (result && result.success && result.rspCode === '000000') {
        message.success(result.rspMsg)
        yield put({ type: 'hideResModal' })
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

    showButtonGroup(state, { payload }) {
      return { ...state, ...payload, buttonGroupVisible: true }
    },

    hideButtonGroup(state) {
      return { ...state, buttonGroupVisible: false }
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
    showResModal(state, { payload }) {
      return { ...state, ...payload, resModalVisible: true }
    },

    hideResModal(state) {
      return { ...state, resModalVisible: false }
    },
  },
}