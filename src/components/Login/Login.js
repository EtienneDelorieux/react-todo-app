import React, { Component } from "react";
import App from "./App";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import "./login.css";

class Login extends Component {
  state = {
    redirectToReferrer: false
  };

  render() {
    return (
      <Router>
        <div id="login">
          <form>
            <input type="text" placeholder="Pseudo" required />
             <Link to="/todo"><button type="submit">Log me in<i class="fas fa-sign-in-alt"></i></button></Link>
          </form>
          <Route exact path="/" component={Login} />
          <Route path="/todo" component={App} />
        </div>
      </Router>
    )
  }
}

export default Login;
