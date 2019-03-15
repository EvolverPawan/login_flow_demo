import React from 'react'
import { connect } from 'react-redux'
import { userActions } from '../actions'

class SignupPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const { name, value } = e.target
    console.log('name : ', name, ' value:', value)
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()

    this.setState({ submitted: true })
    const { username, password } = this.state
    const { dispatch } = this.props
    if (username && password) {
      dispatch(userActions.signup(username, password))
    }
  }

  render () {
    const { username, password, submitted } = this.state
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2>Signup</h2>
        <form name='form' onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
            <label htmlFor='username'>Username</label>
            <input type='text' className='form-control' name='username' value={username} onChange={this.handleChange} />
            {submitted && !username &&
              <div className='help-block'>Username is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} />
            {submitted && !password &&
              <div className='help-block'>Password is required</div>
            }
          </div>
          <div className='form-group'>
            <button className='btn btn-primary'>Signup</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { loggingIn } = state.authentication
  return {
    loggingIn
  }
}

const connectedLoginPage = connect(mapStateToProps)(SignupPage)
export { connectedLoginPage as SignupPage }
