import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Page from "./welcome/Page";
import Dashboard from "./course/Dashboard";

import {Provider} from 'react-redux';
import store from "../store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    {/*<Header/>*/}
                    <Dashboard/>
                    <Footer/>
                </Fragment>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
