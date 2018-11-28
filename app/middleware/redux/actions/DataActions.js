import * as Constant from '../Constant'

export const billsFetchRequestedAction = () => {
return {
        type: Constant.BILLS_FETCH_REQUESTED_ACTION
    }
}

export const ordersFetchRequestedAction = () => {
return {
        type: Constant.ORDERS_FETCH_REQUESTED_ACTION
    }
}

export const billsFetchInProgressAction = (inProgress) => {
    return {
        type: Constant.BILLS_FETCHING_IN_PROGRESS_ACTION,
        payload: inProgress
    }
}

export const ordersFetchInProgressAction = (inProgress) => {
    return {
        type: Constant.ORDERS_FETCHING_IN_PROGRESS_ACTION,
        payload: inProgress
    }
}

export const billsFetchedAction = (data) => {
    return {
        type: Constant.BILLS_FETCHED_ACTION,
        payload: data
    }
}

export const ordersFetchedAction = (data) => {
    return {
        type: Constant.ORDERS_FETCHED_ACTION,
        payload: data
    }
}

export const billsFetchingFailedAction = (error) => {
    return {
        type: Constant.BILLS_FETCHING_FAILED,
        payload: error
    }
}

export const ordersFetchingFailedAction = (error) => {
    return {
        type: Constant.ORDERS_FETCHING_FAILED,
        payload: error
    }
}

export const dismissDataErrorDialogAction = () => {
    return {
        type: Constant.DISMISS_DATA_ERROR_DIALOG_ACTION
    }
}

export const updateBillAction = (bill) => {
    return {
        type: Constant.UPDATE_BILL_ACTION,
        payload: bill
    }
}

export const updateOrderAction = (bill) => {
    return {
        type: Constant.UPDATE_ORDER_ACTION,
        payload: bill
    }
}

export const updateBillInProgressAction = (inProgress) => {
    return {
        type: Constant.UPDATE_BILL_IN_PROGRESS_ACTION,
        payload: inProgress
    }
}

export const updateOrderInProgressAction = (inProgress) => {
    return {
        type: Constant.UPDATE_ORDER_IN_PROGRESS_ACTION,
        payload: inProgress
    }
}

export const billUpdatedAction = () => {
    return {
        type: Constant.BILL_UPDATED_ACTION
    }
}

export const orderUpdatedAction = () => {
    return {
        type: Constant.ORDER_UPDATED_ACTION
    }
}

export const updateBillFailedAction = (error) => {
    return {
        type: Constant.UPDATE_BILL_FAILED_ACTION,
        payload: error
    }
}

export const updateOrderFailedAction = (error) => {
    return {
        type: Constant.UPDATE_ORDER_FAILED_ACTION,
        payload: error
    }
}

export const dismissBillUpdatedDialog = () => {
    return {
        type: Constant.DISMISS_BILL_UPDATED_DIALOG
    }
}

export const dismissOrderUpdatedDialog = () => {
    return {
        type: Constant.DISMISS_ORDER_UPDATED_DIALOG
    }
}

export const dismissUpdateBillStatusErrorDialog = () => {
    return {
        type: Constant.DISMISS_UPDATE_BILL_STATUS_ERROR_DIALOG_ACTION
    }
}

export const dismissUpdateOrderStatusErrorDialog = () => {
    return {
        type: Constant.DISMISS_UPDATE_ORDER_STATUS_ERROR_DIALOG_ACTION
    }
}
