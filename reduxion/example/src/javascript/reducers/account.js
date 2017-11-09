/**
 * Reduxion Example Account Reducer
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-12-22
 *
 * Description : The reducer for account details.
 **/

import { Reducer } from '../../../../src/index';

// This reducer serves no purpose other than to demonstrate
// combining reducers into one store.
export default class AccountReducer extends Reducer {

    constructor(name) {
        super(name, {});
    }

    // Reducer function to handle login completion.
    loginCompleted(credentials) {
        alert(`Login Completed with email '${credentials.email}'!`);
    }

}
