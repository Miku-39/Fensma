import { call, put } from 'redux-saga/effects'

import * as Constant from '../Constant'
import { loginInProgressAction, 
    userLoggedInAction,
    loginFailedAction
} from '../actions/SessionActions'
import { login, authorize, setAuthHeader } from '../../api'


function * loginSaga(action) {
    const { user, password } = action.payload
    yield put(loginInProgressAction(true)) 

    try {
        const loginResponse = yield call(login, user, password)
        const { access_token } = loginResponse.data
        yield call(setAuthHeader, access_token)        

        const sessionResponse = yield call(authorize)
        const { id, name, companyId, accountId, accountName, roles } = sessionResponse.data

        const session = {
            token: access_token,
            userId: id,
            user: name,
            companyId: companyId,
            accountId: accountId,
            account: accountName,
            roles: roles
        }

        yield put(loginInProgressAction(false))
        yield put(userLoggedInAction(session))
    }
    catch (error) {
        yield put(loginInProgressAction(false)) 
        yield put(loginFailedAction(error.message))
    }
}

export default loginSaga