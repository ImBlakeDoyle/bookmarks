import React, { Component } from "react";
import LoginForm from "./../forms/LoginForm";

class LoginPage extends Component {
    render() {
        return(
            <div>
                <h1>Login</h1>
                <LoginForm onLoginFormSubmit={this.props.onLoginFormSubmit} />
            </div>
        );
    }
}

export default LoginPage;