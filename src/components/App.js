import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./../styles/App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import BookmarksPage from "./pages/BookmarksPage";
import LocalApi from "./../apis/local";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import { removeAuthToken } from "./../actions";

class App extends Component {

    logout = () => {
        this.props.removeAuthToken();
    }

    render() {
        const { token } = this.props;

        return (
            <BrowserRouter>
                <div>
                    { token && <button onClick={this.logout}>Logout</button> }
                    { token && <h4>User is logged in!</h4> }
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/register" render={(props) => {
                            return <RegisterPage {...props} onRegisterFormSubmit={this.onRegisterFormSubmit} />
                        }} />
                        <Route exact path="/login" render={(props) => {
                            return <LoginPage {...props} onLoginFormSubmit={this.onLoginFormSubmit} />
                        }} />
                        <PrivateRoute exact path="/bookmarks" component={BookmarksPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps, {removeAuthToken})(App);
