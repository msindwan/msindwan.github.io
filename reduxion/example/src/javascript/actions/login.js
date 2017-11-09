/**
 * Reduxion Example Actions
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-12-22
 *
 * Description : App actions.
 **/

import { Action } from '../../../../src/index';

// Updates the email address.
const updateEmailAddress = Action('updateEmailAddress', email => {
    return email;
});

// Updates the password.
const updatePassword = Action('updatePassword', password => {
    return password;
});

// Attempts to login with the credentials provided.
const login = Action('login', credentials => {
    Action('loginRequested', f => f)();

    // Simulate an async action.
    setTimeout(() => {
        Action('loginCompleted', () => credentials)();
    }, 1000);
});

export {
    updateEmailAddress,
    updatePassword,
    login
};
