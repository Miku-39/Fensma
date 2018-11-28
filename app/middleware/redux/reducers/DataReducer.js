import { Map } from 'immutable'

import * as Constant from '../Constant'


const initialState = Map({
  bills: [],
  orders: [],
  fetchingInProgress: null,
  updateBillInProgress: null,
  updateOrderInProgress: null,
  billUpdated: null,
  orderUpdated: null,
  error: null,
  updateBillStatusError: null,
  updateOrderStatusError: null,
  shouldRefreshBiils: null,
  shouldRefreshOrders: null
})

const dataReducer = (state = initialState, action) => {
  switch (action.type){
    case Constant.BILLS_FETCH_REQUESTED_ACTION:
      return state.merge({fetchingInProgress: null, error: null, shouldRefreshBiils: null})

    case Constant.ORDERS_FETCH_REQUESTED_ACTION:
      return state.merge({fetchingInProgress: null, error: null, shouldRefreshOrders: null})

    case Constant.BILLS_FETCHING_IN_PROGRESS_ACTION:
      return state.merge({fetchingInProgress: action.payload})

    case Constant.ORDERS_FETCHING_IN_PROGRESS_ACTION:
      return state.merge({fetchingInProgress: action.payload})

    case Constant.BILLS_FETCHED_ACTION:
      return state.merge({bills: action.payload, fetchingInProgress: false, error: null})

    case Constant.ORDERS_FETCHED_ACTION:
      return state.merge({orders: action.payload, fetchingInProgress: false, error: null})

    case Constant.BILLS_FETCHING_FAILED:
      return state.merge({fetchingInProgress: false, error: action.payload})

    case Constant.ORDERS_FETCHING_FAILED:
      return state.merge({fetchingInProgress: false, error: action.payload})

    case Constant.DISMISS_DATA_ERROR_DIALOG_ACTION:
      return state.merge({error: null})

    case Constant.UPDATE_BILL_ACTION:
      return state.merge({billUpdated: null})

    case Constant.UPDATE_ORDER_ACTION:
      return state.merge({orderUpdated: null})

    case Constant.UPDATE_BILL_IN_PROGRESS_ACTION:
      return state.merge({updateBillInProgress: action.payload})

    case Constant.UPDATE_ORDER_IN_PROGRESS_ACTION:
      return state.merge({updateOrderInProgress: action.payload})

    case Constant.BILL_UPDATED_ACTION:
      return state.merge({billUpdated: true, shouldRefreshBiils: true})

    case Constant.ORDER_UPDATED_ACTION:
      return state.merge({orderUpdated: true, shouldRefreshOrders: true})

    case Constant.UPDATE_BILL_FAILED_ACTION:
      return state.merge({updateBillStatusError: action.payload})

    case Constant.UPDATE_ORDER_FAILED_ACTION:
      return state.merge({updateOrderStatusError: action.payload})

    case Constant.DISMISS_BILL_UPDATED_DIALOG:
      return state.merge({billUpdated: null})

    case Constant.DISMISS_ORDER_UPDATED_DIALOG:
      return state.merge({orderUpdated: null})

    case Constant.DISMISS_UPDATE_BILL_STATUS_ERROR_DIALOG_ACTION:
      return state.merge({updateBillStatusError: null})

    case Constant.DISMISS_UPDATE_ORDER_STATUS_ERROR_DIALOG_ACTION:
      return state.merge({updateOrderStatusError: null})

    default: return state
  }
}

export default dataReducer
