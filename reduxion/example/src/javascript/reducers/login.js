/**
 * Reduxion Example Login Reducer
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-12-22
 *
 * Description : The reducer for logging in.
 **/

import { Reducer } from '../../../../src/index';

const INTIAL_STATE = {
    email: '',
    password: '',
    authorizing: false
};

export default class LoginReducer extends Reducer {

    constructor(name) {
        super(name, INTIAL_STATE);
    }

    // Reducer function to update the state with a new email.
    updateEmailAddress(email) {
        console.info(`Email changed from '${this.state.email}' to '${email}'`);
        this.setState({
            email: email
        });
    }

    // Reducer function to update the state with a new password.
    updatePassword(password) {
        console.info(`Password changed from '${this.state.password}' to '${password}'`);
        this.setState({
            password: password
        });
    }

    // Reducer function to update the state with an authorization flag set to true.
    loginRequested() {
        this.setState({
            authorizing: true
        });
    }

    // Reducer function to update the state with an authorization flag set to false.
    loginCompleted() {
        this.setState({
            authorizing: false
        });
    }

}
