/**
 * Reduxion Dispatcher
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-12-22
 *
 * Description : Exposes a dispatcher class as well as a global dispatcher for actions.
 **/

class Dispatcher {

    constructor() {
        // Initialize listeners.
        this._listeners = [];
    }

    subscribe(listener) {
        // Add a listener.
        this._listeners.push(listener);
    }

    unsubscribe(listener) {
        // Remove a listener.
        const index = this._listeners.index(listener);
        if (index > -1) {
            this._listeners.splice(1, index);
        }
    }

    emit(type, data) {
        // Dispatch the event to all listeners.
        this._listeners.forEach(listener => {
            listener(type, data);
        });
    }

}

export default new Dispatcher();
export { Dispatcher };
