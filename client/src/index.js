import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./helpers/store";
import { connect, Provider } from "react-redux";

import { userActions } from "./actions/user.actions";
import { fetchActions } from "./actions/fetch.actions";
import { history } from "./helpers/history.js";

const mapStateToProps = (state) => {
  return {
    user: {
      loggingIn: state.authentication.loggingIn,
      loggedIn: state.authentication.loggedIn,
      registering: state.authentication.registering,
      registered: state.authentication.registered,
      data: state.authentication.data,
      error: state.authentication.error,
      type: state.authentication.type
    },
    fetch: {
      fetching: state.fetch.fetching,
      fetched: state.fetch.fetched,
    },
    history: history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: {
      login: (email, password, rememberMe) => {
        dispatch(userActions.login(email, password, rememberMe));
      },
      register: (email, password) => {
        dispatch(userActions.register(email, password));
      },
      logout: () => {
        dispatch(userActions.logout());
      },
      getStatus: () => {
        dispatch(userActions.getStatus());
      },
    },
    fetchActions: {
      request: () => {
        dispatch(fetchActions.request());
      },
      success: () => {
        dispatch(fetchActions.success());
      },
      error: () => {
        dispatch(fetchActions.error());
      },
      clear: () => {
        dispatch(fetchActions.clear());
      }
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);
class AppWraper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

ReactDOM.render(<AppWraper />, document.getElementById("root"));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
