import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

import { Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// Alert Options
const alertOptions = {
    timeout: 5000,
    position: 'top center'
};

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Footer from "./layout/Footer";
import Page from "./welcome/Page";
import Dashboard from "./course/Dashboard";

import {Provider} from 'react-redux';
import store from "../store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Fragment>
                    {/*<Header/>*/}
                    <Alerts />
                    <Dashboard />
                    <Footer />
                </Fragment>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
