/**
 * Reduxion Action
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-12-22
 *
 * Description : Exposes a function wrapper to implicitly emit events.
 **/

import GlobalDispatcher from './dispatcher';

// Export a function wrapper that will emit an event when
// the callback is completed.
export default function(action, func) {
    return function(...args) {
        const state = func.apply(this, args);
        GlobalDispatcher.emit(action, state);
    };
}
