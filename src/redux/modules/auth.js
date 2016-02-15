const LOAD_USER = 'redux-oasp/auth/LOAD_USER';
const LOAD_USER_SUCCESS = 'redux-oasp/auth/LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'redux-oasp/auth/LOAD_USER_FAIL';
const LOGIN = 'redux-oasp/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-oasp/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-oasp/auth/LOGIN_FAIL';
const LOGOUT = 'redux-oasp/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-oasp/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-oasp/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: (client) => client.get('/currentuser')
  };
}

export function login(name, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/oasp/login', {
      data: {
        j_username: name,
        j_password: password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
