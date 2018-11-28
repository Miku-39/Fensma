import { takeLatest } from 'redux-saga/effects'

import * as Constant from '../Constant'
import loginSaga from './SessionSaga'
import { fetchBillsSaga, fetchOrdersSaga, updateBillSaga, updateOrderSaga } from './DataSaga'
function * sagaWatcher(screen) {
    yield [
        takeLatest(Constant.USER_REQUESTED_LOGIN_ACTION, loginSaga),
        takeLatest(Constant.BILLS_FETCH_REQUESTED_ACTION, fetchBillsSaga),
        takeLatest(Constant.UPDATE_BILL_ACTION, updateBillSaga),
        takeLatest(Constant.ORDERS_FETCH_REQUESTED_ACTION, fetchOrdersSaga),
        takeLatest(Constant.UPDATE_ORDER_ACTION, updateOrderSaga)
    ]
}

export default sagaWatcher
