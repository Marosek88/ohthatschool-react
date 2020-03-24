import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Provider} from 'react-redux';

import {Provider as AlertProvider, transitions} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// Alert Options
const alertOptions = {
    timeout: 6000,
    position: 'middle',
    offset: '30px',
    transition: transitions.SCALE,
    containerStyle: {
        width: 400,
    },
};

import Register from "./accounts/Register";
import Login from "./accounts/Login";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Footer from "./layout/Footer";
import PrivateRoute from "./common/PrivateRoute";
import WelcomeDashboard from "./welcome/WelcomeDashboard";
import ProfileDashboard from "./profile/ProfileDashboard";
import SettingsDashboard from "./profile/settings/SettingsDashboard";
import EducatorDashboard from "./educator/EducatorDashboard";
import EducatorCreateDashboard from "./educator/create/EducatorCreateDashboard";
import CourseDashboard from "./educator/course/CourseDashboard";
import ModuleDashboard from "./educator/course/module/ModuleDashboard";
import LessonDashboard from "./educator/course/module/lesson/LessonDashboard";


import store from "../store";
import {loadUser} from "../actions/auth";

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        const uuid_regex = '([0-9a-f]{8}\\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\\b[0-9a-f]{12})';
        const course_url = `/profile/educator/my_courses/:course${uuid_regex}`;
        const module_url = `/profile/educator/my_courses/:course${uuid_regex}/module/${uuid_regex}`;
        const lesson_url = `/profile/educator/my_courses/:course${uuid_regex}/module/${uuid_regex}/lesson/${uuid_regex}`;
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header/>
                            <div className="content">
                                <Alerts/>
                                <Switch>
                                    <Route exact path="/" component={WelcomeDashboard}/>
                                    <Route exact path="/register" component={Register}/>
                                    <Route exact path="/login" component={Login}/>
                                    <PrivateRoute exact path="/profile" component={ProfileDashboard}/>
                                    <PrivateRoute exact path="/profile/settings" component={SettingsDashboard}/>
                                    <PrivateRoute exact path="/profile/educator" component={EducatorDashboard}/>
                                    <PrivateRoute exact path="/profile/educator/create" component={EducatorCreateDashboard}/>
                                    <PrivateRoute
                                        exact path={course_url}
                                        component={CourseDashboard}
                                    />
                                    <PrivateRoute
                                        exact path={module_url}
                                        component={ModuleDashboard}
                                    />
                                    <PrivateRoute
                                        exact path={lesson_url}
                                        component={LessonDashboard}
                                    />
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
