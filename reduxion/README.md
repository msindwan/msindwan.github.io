# Reduxion

Reduxion is another take on redux that combines elements of flux for clarity and convenience including a global dispatcher for actions. It also makes use of ES6 features including inheritence and class notation for reducers.

## Dependencies

Reduxion requires **Node.js >= 4.3.2**

## API

Reduxion is written in ES6 and requires babel for transpilation. The API is identical to redux with a few exceptions (i.e you can't add middleware). You can import the following modules from the npm package:

``` js
import { Action, Reducer, Store } from 'reduxion';
```
[See the login example](https://msindwan.github.io/reduxion/example) for usage.

### Action

An action is a function wrapper that calls the provided callback and implicitly emits an event when the callback terminates.

``` js
import { Action } from 'reduxion';

// Performs an action.
const MyAction = Action('MyAction', data => {
    return data;
});

export default MyAction;
```

When added to a store, reducers with functions named `MyAction` will be called with data returned from the action.

### Reducer

Reducers inherit from the `Reducer` class and include functions that match an action type string.

``` js
import { Reducer } from 'reduxion';

const INITIAL_STATE = {};

export default class MyReducer extends Reducer {

    constructor(name) {
        super(name, INITIAL_STATE);
    }

    // Reducer function to handle myAction.
    MyAction(data) {
        // Magic goes here
        this.setState({ /* update the state here */ });
    }

}
```

### Store

The store combines reducers into one state object that a component subscribes to for updates.

``` js
import MyReducer from './reducers/myReducer';
import { Store } from 'reduxion';

// Create the app reducers.
const reducer = new MyReducer('myReducerName');

// Create a new store with all of the reducers.
export default new Store(reducer);
```

The state of the store is a collection of reducer states namespaced by the reducer's name. For example, `myStore.getState()` would return an object with the key `myReducerName` mapping to `MyReducer`'s state.

## License

Licensed under the MIT License.
