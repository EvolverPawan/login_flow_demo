import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { signupReducer } from './signup.reducer'
import { alert } from './alert.reducer'

const rootReducer = combineReducers({
  authentication,
  signupReducer,
  alert
})

export default rootReducer
