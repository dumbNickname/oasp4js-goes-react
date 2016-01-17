import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

import { TextField, RaisedButton } from 'material-ui';


@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>

        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>

        }
        <h1>Login Material</h1>
          <div className="container">
            <div className="row">
              <TextField
                  ref="userName"
                  fullWidth
                  hintText="User name"
                  floatingLabelText="Login"/>
            </div>
            <div className="row">
                <TextField
                    ref="login"
                    fullWidth
                    hintText="Password"
                    floatingLabelText="Password"/>
            </div>
            <RaisedButton label="Default" />

            <RaisedButton label="Primary" primary={true} />

            <RaisedButton label="Secondary" secondary={true} />

        </div>
      </div>
    );
  }
}
