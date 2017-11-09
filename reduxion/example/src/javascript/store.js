/**
 * Reduxion Example Store
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-12-22
 *
 * Description: Example store.
 **/

import AccountReducer from './reducers/account';
import LoginReducer from './reducers/login';
import { Store } from '../../../src/index';

// Create the app reducers.
const accountReducer = new AccountReducer('account');
const loginReducer = new LoginReducer('login');

// Create a new store with all of the reducers.
export default new Store(loginReducer, accountReducer);
