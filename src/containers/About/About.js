import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {MiniInfoBar} from 'components';

import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(state => ({user: state.auth.user}), authActions)
export default class About extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({
    showKitten: !this.state.showKitten
  });

  handleSubmit = (event) => {
    event.preventDefault();
    const userNameInput = this.refs.username;
    const pswdInput = this.refs.password;

    this.props.login(userNameInput.value, pswdInput.value);
    userNameInput.value = '';
    pswdInput.value = '';
  }

  render() {
    const {showKitten} = this.state;
    const {user, logout} = this.props;

    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>About Us</h1>
        <Helmet title="About Us"/>

        <p>This project was originally created by Erik Rasmussen (<a href="https://twitter.com/erikras" target="_blank">@erikras</a>), but has since seen many contributions from the open source community. Thank you to
          <a href="https://github.com/erikras/react-redux-universal-hot-example/graphs/contributors" target="_blank">all the contributors</a>.
        </p>

        <h3>Mini Bar
          <span style={{
            color: '#aaa'
          }}>(not that kind)</span>
        </h3>

        <p>Hey! You found the mini info bar! The following component is display-only. Note that it shows the same time as the info bar.</p>

        <h1>Login</h1>
        {!user && <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="password" ref="password" placeholder="Enter a password" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
}

        <MiniInfoBar/>

        <h3>Images</h3>

        <p>
          Psst! Would you like to see a kitten?

          <button className={'btn btn-' + (showKitten
            ? 'danger'
            : 'success')} style={{
            marginLeft: 50
          }} onClick={this.handleToggleKitten}>
            {showKitten
              ? 'No! Take it away!'
              : 'Yes! Please!'}</button>
        </p>

        {showKitten && <div><img src={kitten}/></div>}
      </div>
    );
  }
}
