/**
 * Reduxion Store
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-12-22
 *
 * Description : Represents a collection of reducers and relays dispatched events.
 **/

import GlobalDispatcher, { Dispatcher } from './dispatcher';

export default class Store extends Dispatcher {

    constructor(...reducers) {
        // Initialize the dispatcher.
        super();

        // Initialize reducers and the store.
        this._reducers = reducers;
        this._store = { };

        this._reducers.forEach(reducer => {
            this._store[reducer.name] = reducer.getState();
        });
        GlobalDispatcher.subscribe(this._reduce.bind(this));
    }

    getState() {
        // Returns the state of the store.
        return this._store;
    }

    _reduce(type, data) {
        // Triggers events for each reducer.
        if (typeof type === 'undefined') {
            return;
        }
        this._reducers.forEach(reducer => {
            if (reducer[type]) {
                reducer[type](data);
                this._store[reducer.name] = reducer.getState();
            }
        });

        // Emit store changes.
        this.emit('reduce', this._store);
    }

}
