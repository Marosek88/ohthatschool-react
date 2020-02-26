import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux';

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// Alert Options
const alertOptions = {
    timeout: 5000,
    position: 'top center'
};

import Register from "./accounts/Register";
import Login from "./accounts/Login";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Footer from "./layout/Footer";
import PrivateRoute from "./common/PrivateRoute";
import Page from "./welcome/Page";
import ProfileDashboard from "./profile/ProfileDashboard";
import EducatorDashboard from "./educator/EducatorDashboard";


import store from "../store";
import {loadUser} from "../actions/auth";

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header/>
                            <div className="content">
                                <Alerts/>
                                <Switch>
                                    <Route exact path="/" component={Page}/>
                                    <Route exact path="/register" component={Register}/>
                                    <Route exact path="/login" component={Login}/>
                                    <PrivateRoute exact path="/profile" component={ProfileDashboard}/>
                                    <PrivateRoute exact path="/profile/educator" component={EducatorDashboard}/>
                                </Switch>
                            </div>
                            <Footer/>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
