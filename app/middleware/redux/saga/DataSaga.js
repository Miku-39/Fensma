import { call, put, select } from 'redux-saga/effects'

import * as Constant from '../Constant'
import {
    billsFetchInProgressAction,
    billsFetchedAction,
    billsFetchingFailedAction,
    updateBillInProgressAction,
    billUpdatedAction,
    updateBillFailedAction,
    ordersFetchInProgressAction,
    ordersFetchedAction,
    ordersFetchingFailedAction,
    updateOrderInProgressAction,
    orderUpdatedAction,
    updateOrderFailedAction
} from '../actions/DataActions'
import { fetchBills, fetchOrders, updateBillStatus } from '../../api'

export function * fetchBillsSaga() {
    yield put(billsFetchInProgressAction(true))
    const state = yield select()
    const { userId } = state.session.toJS()

    try {
        const response = yield call(fetchBills, userId)
        yield put(billsFetchInProgressAction(false))
        yield put(billsFetchedAction(response.data))
    }
    catch(error) {
        yield put(billsFetchInProgressAction(false))
        yield put(billsFetchingFailedAction(error))
    }
}


export function * updateBillSaga(action) {
    yield put(updateBillInProgressAction(true))

    try {
        yield call(updateBillStatus, action.payload)
        yield put(updateBillInProgressAction(false))
        yield put(billUpdatedAction())
    }
    catch(error) {
        yield put(updateBillInProgressAction(false))
        yield put(updateBillFailedAction(error))
    }
}



export function * fetchOrdersSaga() {
    yield put(ordersFetchInProgressAction(true))
    const state = yield select()
    const { userId } = state.session.toJS()

    try {
        const response = yield call(fetchOrders, userId)
        yield put(ordersFetchInProgressAction(false))
        yield put(ordersFetchedAction(response.data))
    }
    catch(error) {
        yield put(ordersFetchInProgressAction(false))
        yield put(ordersFetchingFailedAction(error))
    }
}

export function * updateOrderSaga(action) {
    yield put(updateOrderInProgressAction(true))

    try {
        yield call(updateOrderStatus, action.payload)
        yield put(updateOrderInProgressAction(false))
        yield put(orderUpdatedAction())
    }
    catch(error) {
        yield put(updateOrderInProgressAction(false))
        yield put(updateOrderFailedAction(error))
    }
}
