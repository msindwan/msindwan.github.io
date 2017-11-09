/**
 * Reduxion Example
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-12-22
 *
 * Description: Example Reduxion App Entry point.
 **/

import LoginForm from './components/LoginForm';
import AppStore from './store';
import ReactDOM from 'react-dom';
import React from 'react';

// App Component.
const App = React.createClass({

    getInitialState() {
        return AppStore.getState();
    },

    componentDidMount() {
        AppStore.subscribe(( _, store) => this.setState(store));
    },

    render() {
        return (
            <div>
                <div className="sign-in-header">
                    <h1>Reduxtion Login Example</h1>
                    <p>View the console to see actions that were dispatched.</p>
                    <img className='logo' src="logo.svg"></img>
                </div>
                <div className="sign-in-container">
                    <div>
                        <LoginForm
                            authorizing={this.state.login.authorizing}
                            password={this.state.login.password}
                            email={this.state.login.email} />
                    </div>
                </div>
            </div>
        );
    }

});

// App entry point.
window.addEventListener("load", function() {
    ReactDOM.render((
        <App />
    ), document.getElementById("app"));
});
