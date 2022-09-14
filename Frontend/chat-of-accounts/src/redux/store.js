import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import { catalogReducer } from './reducers/catalogReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    catalog: catalogReducer
});


export const store = createStore(
    reducers, 
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;
