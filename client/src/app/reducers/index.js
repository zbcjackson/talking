import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import messages from './messages'

const rootReducer = combineReducers({
  messages,
  router
})

export default rootReducer
