import React, { Component } from "react";
import "./login.css";

class Login extends Component {
  render() {
    return (
      <div id="login">
        <form>
          <input type="text" placeholder="Pseudo" required />
          <button type="submit">Log me in<i class="fas fa-sign-in-alt"></i></button>
        </form>
      </div>
    )
  }
}

export default Login;
