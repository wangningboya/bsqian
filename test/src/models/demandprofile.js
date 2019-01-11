import { getDemandById, getDemandLogById, reviewDemand, predictDemand, getDev, startDev, pauseDev, endDev, getDemandTime, getCurrentUser, passDev, failDev } from '../services/demand'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import pathToRegexp from 'path-to-regexp'

export default {

    namespace: "demandprofile",

    state: {
        demand: {},
        devList: [],
        demandLogList: [],
        reviewModalVisible: false,
        predictModalVisible: false,
        demandTime: "0",
        currentUser: {}
    },

    subscriptions: {
        setup({ dispatch, history }) {
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
        * query({
            payload = {},
        }, { select, call, put }) {
            const result = yield call(getDemandById, payload)
            const demandLog = yield call(getDemandLogById, payload)
            const devResult = yield call(getDev)
            const demandTime = yield call(getDemandTime, payload)
            const currentUser = yield call(getCurrentUser)
            console.log(result)
            console.log(currentUser)
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        demand: result.data.demand,
                        devList: devResult.data,
                        demandLogList: demandLog.data,
                        demandTime: demandTime.data,
                        currentUser: currentUser.data
                    },
                })
            } else {
                message.error(result.rspMsg)
            }
        },

        * reviewDemand({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(reviewDemand, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
                yield put({ type: 'hideReviewModal' })
            } else {
                message.error(result.rspMsg)
            }
        },

        * predictDemand({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(predictDemand, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
                yield put({ type: 'hidePredictModal' })
            } else {
                message.error(result.rspMsg)
            }
        },

        * startDev({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(startDev, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
            } else {
                message.error(result.rspMsg)
            }
        },

        * pauseDev({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(pauseDev, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
            } else {
                message.error(result.rspMsg)
            }
        },

        * endDev({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(endDev, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
            } else {
                message.error(result.rspMsg)
            }
        },

        * passDev({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(passDev, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
            } else {
                message.error(result.rspMsg)
            }
        },

        * failDev({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(failDev, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
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

        showReviewModal(state, { payload }) {
            return { ...state, ...payload, reviewModalVisible: true }
        },

        hideReviewModal(state) {
            return { ...state, reviewModalVisible: false }
        },
        showPredictModal(state, { payload }) {
            return { ...state, ...payload, predictModalVisible: true }
        },

        hidePredictModal(state) {
            return { ...state, predictModalVisible: false }
        },
        showModal(state, { payload }) {
            return { ...state, ...payload, createModalVisible: true }
        },
    },

}
