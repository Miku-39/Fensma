import { Map } from 'immutable'

import * as Constant from '../Constant'

const initialState = Map({
  token: null,
  userId: null,
  user: null,
  companyId: null,
  accountId: null,
  account: null,
  roles: [],
  inProgress: null,
  error: null,
})

const reducer = (state = initialState, action) => {
  switch (action.type){
    case Constant.USER_REQUESTED_LOGIN_ACTION:
      return initialState

    case Constant.LOGIN_IN_PROGRESS_ACTION:
      return state.merge({ inProgress: action.payload })

    case Constant.USER_LOGGED_IN_ACTION:
      const { token, userId, user, companyId, accountId, account, roles } = action.payload      
      return state.merge({ token, userId, user, companyId, accountId, account, roles, inProgress: false })

    case Constant.LOGIN_FAILED_ACTION: 
      return state.merge({
        inProgress: false,
        error: action.payload
      })

    case Constant.DISMISS_LOGIN_ERROR_DIALOG_ACTION: 
      return state.merge({
        error: null
      })

    default: 
       return state
  }
}

export default reducer
