import * as Constant from '../Constant'

export const loginRequestedAction = (user, password) => {
    return {
        type: Constant.USER_REQUESTED_LOGIN_ACTION,
        payload: {
            user, 
            password
        }
    }
}

export const loginInProgressAction = (inProgress) => {
    return {
        type: Constant.LOGIN_IN_PROGRESS_ACTION,
        payload: inProgress
    }
}

export const userLoggedInAction = (payload) => {
    return {
        type: Constant.USER_LOGGED_IN_ACTION,
        payload
    }
}

export const loginFailedAction = (error) => {
    return {
        type: Constant.LOGIN_FAILED_ACTION,
        payload: error
    }
}

export const dismissLoginErrorDialog = () => {
    return {
        type: Constant.DISMISS_LOGIN_ERROR_DIALOG_ACTION
    }
}

