import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { InfoBar } from 'components';
import { routeActions } from 'redux-simple-router';
import config from '../../config';

import '../../theme/bootstrap.global.scss';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';


@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  // Needed for Material UI lib
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  // Needed for Material UI lib
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  static reduxAsyncConnect(params, store) {
    const {dispatch, getState} = store;
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    // const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>


        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <InfoBar/>

        <div className="well text-center">
          Have questions? Ask for help <a
          href="https://github.com/erikras/react-redux-universal-hot-example/issues"
          target="_blank">on Github</a> or in the <a
          href="https://discord.gg/0ZcbPKXt5bZZb1Ko" target="_blank">#react-redux-universal</a> Discord channel.
        </div>
      </div>
    );
  }
}

//
// App.childContextTypes = {
//   muiTheme: React.PropTypes.object
// };

// export default App;
