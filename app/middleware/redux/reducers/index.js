import { combineReducers } from 'redux'
import session from './SessionReducer'
import data from './DataReducer'

const root = combineReducers({
  session,
  data
})

export default root
