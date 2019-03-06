import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions } from '../actions'

class HomePage extends React.Component {
  componentDidMount () {
    this.props.dispatch(userActions.getAll())
  }

  render () {
    const { user } = this.props
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <p>
          <Link to='/login'>Logout</Link>
        </p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { authentication } = state
  const { user } = authentication
  return {
    user
  }
}

const connectedHomePage = connect(mapStateToProps)(HomePage)
export { connectedHomePage as HomePage }
