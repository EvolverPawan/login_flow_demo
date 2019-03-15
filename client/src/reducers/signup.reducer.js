import { userConstants } from '../constants'

let user = JSON.parse(localStorage.getItem('signup'))
const initialState = user ? { signup: true, user } : {}

export function signupReducer (state = initialState, action) {
  switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
      return {
        signup: true,
        user: action.user
      }
    case userConstants.SIGNUP_SUCCESS:
      return {
        signup: true,
        user: action.user
      }
    case userConstants.SIGNUP_FAILURE:
      return {
        signup: false,
        user: action.error
      }
    default:
      return state
  }
}
