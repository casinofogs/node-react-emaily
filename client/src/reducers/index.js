import { combineReducers } from 'redux';
import authReducer from './authReducer';

// We are passing an object literal to combineReducers(). The keys inside of that object literal, represents the "state" object's keys that we used in "authReducer.js". (7.64)
export default combineReducers({
    auth: authReducer // This "auth" key will be available as "state.auth" in React component files. We used it in "project-root/client/src/components/Header.js" inside "mapStateToProps(state)".
});

// This exported object will be used in "project-root/client/src/index.js" as "reducers" in "createStore()". 