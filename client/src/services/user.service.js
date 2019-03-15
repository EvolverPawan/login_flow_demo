import config from '../config'
import firebaseApp from '../Firebase'
// import { compose } from '../../../../../../Library/Caches/typescript/3.3/node_modules/redux'

export const userService = {
  login,
  logout,
  signup
}

function login (username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  }
  return fetch (`${config.apiUrl}/api/users/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))
      return user
    })
}

function signup (username, password) {
  if (process.env.REACT_APP_ENABLE_FIREBASE_AUTHENTICATION === 'TRUE') {
    return firebaseApp.auth().createUserWithEmailAndPassword(username, password)
    // .then(function (user) {
    //   const currentUser = firebaseApp.auth().currentUser
    //   console.log('currentUser', currentUser)
    //   console.log('user', user)
    //   return user
    // }, function (error) {
    //   const errorCode = error.code
    //   const errorMessage = error.message
    //   console.log('errorCode:', errorCode, ' errorMessage:', errorMessage)
    //   return error
    // })
  }
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function handleResponse (response) {
  console.log('response', response)
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        // location.reload(true)
      }

      const error = (data && data.msg) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
