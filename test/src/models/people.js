import { query, restimeline, remove, dismiss, getout, pickup, createTeam } from '../services/people'
import { message } from 'antd'

export default {

  namespace: 'people',

  state: {
    buttonGroupVisible: false,
    addButtonVisible: false,
    selectedKey: '',
    createModalVisible: false,
    pickupModalVisible: false,
    deleteButtonVisible: false,
    modalType: 'create',
    currentItem: {},
    peopleData: [],
    teamOption: [],
    candidateOption: [],
    timelineData: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/people') {
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
      // console.log(result)
      // console.log(result.data.data)
      // console.log(result.data.team)
      // console.log(result.data.candidate)
      // return
      if (result.success) {
        yield put({
          type: 'updateState',
          payload: {
            peopleData: result.data.data,
            teamOption: result.data.team,
            candidateOption: result.data.candidate,
          },
        })
      } else {
        message.error(result.rspMsg)
      }
    },

    * createTeam({
      payload,
    }, { call, put }) {
      console.log("createTeam")
      console.log(payload)
      const data = yield call(createTeam, payload)
      if (data.success) {
        message.success(data.rspMsg)
        yield put({ type: 'query' })
        yield put({ type: 'hideCreateModal' })
      } else {
        message.error(data.rspMsg)
      }
    },

    * pickup({
      payload,
    }, { call, put }) {
      const data = yield call(pickup, payload)
      if (data.success) {
        message.success(data.rspMsg)
        yield put({ type: 'query' })
        yield put({ type: 'hidePickupModal' })
      } else {
        message.error(data.rspMsg)
      }
    },

    * getout({
      payload,
    }, { call, put }) {
      const data = yield call(getout, payload)
      if (data.success) {
        message.success(data.rspMsg)
        yield put({ type: 'query' })
      } else {
        message.error(data.rspMsg)
      }
    },

    * dismiss({
      payload,
    }, { call, put }) {
      const data = yield call(dismiss, payload)
      if (data.success) {
        message.success(data.rspMsg)
        yield put({ type: 'query' })
      } else {
        message.error(data.rspMsg)
      }
    },

    * remove({
      payload,
    }, { call, put }) {
      const data = yield call(remove, payload)
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * querytimeline({ payload }, { select, call, put }) {
      const id = yield select(({ people }) => people.currentItem.key)
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

    showCreateModal(state, { payload }) {
      return { ...state, ...payload, createModalVisible: true }
    },

    hideCreateModal(state) {
      return { ...state, createModalVisible: false }
    },

    showPickupModal(state, { payload }) {
      return { ...state, ...payload, pickupModalVisible: true }
    },

    hidePickupModal(state) {
      return { ...state, pickupModalVisible: false }
    },
  },
}
