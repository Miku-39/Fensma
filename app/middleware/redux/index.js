import { Platform } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'remote-redux-devtools'

import rootReducer from './reducers'
import saga from './saga' 


const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
//const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)

export default store
