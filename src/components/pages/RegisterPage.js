import React, { Component } from "react";
import RegisterForm from "./../forms/RegisterForm";

class RegisterPage extends Component {
    render() {
        return(
            <div>
                <h1>Register a new user</h1>
                <RegisterForm onRegisterFormSubmit={this.props.onRegisterFormSubmit} />
            </div>
        );
    }
}

export default RegisterPage;