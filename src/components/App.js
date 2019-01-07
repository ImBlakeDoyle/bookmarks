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

class App extends Component {
    // state = { token: sessionStorage.getItem("token") }

    constructor(props) {
        super(props);
        const token = sessionStorage.getItem("token");
        this.state = { token };

        if (token) {
            LocalApi.setAuthHeader(token);
        }

        LocalApi.handleTokenError(() => {
            this.logout();
        })
    }

    logout = () => {
        sessionStorage.clear();
        this.setState({ token: null});
    }

    onRegisterFormSubmit = (token, cb) => {
        sessionStorage.setItem("token", token);
        LocalApi.setAuthHeader(token);
        this.setState({ token }, cb);
    }

    onLoginFormSubmit = (token, cb) => {
        sessionStorage.setItem("token", token);
        LocalApi.setAuthHeader(token);
        this.setState({ token }, cb)
    }

    render() {
        const { token } = this.state;

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
                        <PrivateRoute exact path="/bookmarks" token={token} component={BookmarksPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
