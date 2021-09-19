import React from "react";
import {
  Router,
  Switch,
  Route,
  // eslint-disable-next-line
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./home";
import NotFound from "./404";
import Login from "./login";
import Logout from "./logout";
import Register from "./register";
import Demo from "./demo";
import { history } from "../helpers/history";

class Webpages extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={["/", "/home"]}>
            <Home state={this.props.state} />
          </Route>
          <Route path="/login">
            {this.props.state.user.loggedIn === true ? (
              <Redirect to="/" />
            ) : (
              <Login state={this.props.state} />
            )}
          </Route>
          <Route path="/register">
            {this.props.state.user.loggedIn === true ? (
              <Redirect to="/" />
            ) : (
              <Register state={this.props.state} />
            )}
          </Route>
          <Route path="/logout">
            {this.props.state.user.loggedIn === false ? (
              <Redirect to="/" />
            ) : (
              <Logout state={this.props.state} />
            )}
          </Route>
          <Route path="/404">
            <NotFound state={this.props.state} />
          </Route>
          <Route path="/demo">
            <Demo lol={"SOME LOL TEXT"} />
          </Route>
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default Webpages;
