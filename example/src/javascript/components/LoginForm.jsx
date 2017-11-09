/**
 * Reduxion Example Login Form
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-12-22
 *
 * Description : The login form.
 **/

import { updateEmailAddress, updatePassword, login } from '../actions/login';
import React from 'react';

const LoginForm = React.createClass({

    // Handler for email changes.
    onEmailChange(e) {
        updateEmailAddress(e.target.value);
    },

    // Handler for password changes.
    onPasswordChange(e) {
        updatePassword(e.target.value);
    },

    // Handler for form submissions.
    onSubmit(e) {
        e.preventDefault();
        login({
            email: this.props.email,
            password: this.props.password
        });
    },

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        value={this.props.email}
                        placeholder="Email Address"
                        onChange={this.onEmailChange}>
                    </input>
                    <input
                        value={this.props.password}
                        placeholder="Password" type="password"
                        onChange={this.onPasswordChange}>
                    </input>
                    <button className="btn btn-primary" disabled={this.props.authorizing} type="submit">Sign In</button>
                </form>
            </div>
        );
    }

});

export default LoginForm;
