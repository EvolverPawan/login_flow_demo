import { userConstants } from '../constants'
import { userService } from '../services'
import { alertActions } from './'
import { history } from '../helpers'

export const userActions = {
  login,
  logout,
  signup
}

function signup (username, password) {
  return dispatch => {
    dispatch(request({ username }))
    userService.signup(username, password)
      .then(
        user => {
          dispatch(success(user))
          history.push('/')
          dispatch(alertActions.success('Registration successful. Please login'))
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }
  function request (user) { return { type: userConstants.SIGNUP_REQUEST, user } }
  function success (user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
  function failure (error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}
function login (username, password) {
  return dispatch => {
    dispatch(request({ username }))
    userService.login(username, password)
      .then(
        user => {
          dispatch(success(user))
          history.push('/')
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }

  function request (user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success (user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure (error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout () {
  userService.logout()
  return { type: userConstants.LOGOUT }
}
