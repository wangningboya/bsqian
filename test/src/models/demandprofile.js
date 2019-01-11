import { getDemandById, getDemandLogById, reviewDemand, predictDemand, getDev, startDev, pauseDev, endDev, getDemandTime } from '../services/demand'
import { } from 'antd'
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
            if (result && result.success && result.rspCode === '000000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        demand: result.data.demand,
                        devList: devResult.data,
                        demandLogList: demandLog.data,
                        demandTime: demandTime.data
                    },
                })
            } else {

            }
        },

        * reviewDemand({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(reviewDemand, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
                yield put({ type: 'hideReviewModal' })
            } else {
            }
        },

        * predictDemand({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(predictDemand, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
                yield put({ type: 'hidePredictModal' })
            } else {
            }
        },

        * startDev({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(startDev, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
            } else {
            }
        },

        * pauseDev({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(pauseDev, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
            } else {
            }
        },

        * endDev({ payload }, { select, call, put }) {
            const id = yield select(({ demandprofile }) => demandprofile.demand.id)
            const result = yield call(endDev, payload)
            if (result && result.success && result.rspCode === '000000') {
                yield put({ type: 'query', payload: { id: id } })
            } else {
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
