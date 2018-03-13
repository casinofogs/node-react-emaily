import axios from 'axios';
import { FETCH_USER } from './types';
// This LOGOUT_USER type for AJAX logout
// import { LOGOUT_USER } from './types';

// img src- 04/020

// Now the real question is,- how the action creator communicates with redux store, with a created action.

// By default - When React component calls a action creator, Action creator produces/returns an action. This returned "action" automatically passed to redux's "dispatch function". We dont have the explicit control over that passing operation. It is done automatically.
// Example code

// Action creator "fetchUser"
// const fetchUser = () => {
//     const response = axios.get('/api/currentUser');

//     // Returning the "action"
//     return {
//         type: FETCH_USER,
//         payload: response
//     };
// };

// Now here is the catch. We want to take the explicit control over that "returned action -> dispatch function" operation. That is why we are using redux-thunk.

// Understanding how redux-thunk works
// https://medium.com/@gethylgeorge/understanding-how-redux-thunk-works-72de3bdebc50


// When we are using redux-thunk, Action creator is no longer going to returning a action. Instead It will pass the action to a "dispatch function". This "dispatch function" belongs to the redux store.

// If we call an "dispatch function" with an "action", this "action" will be automatically forwarded to all the "reducers" inside the redux store of this application.

// "dispatch function's" sole purpose is to sending the actions to the reducers.

// The only thing redux-thunk is doing for us is that, it is giving us the direct access to "dispatch function".

// When we are using redux-thunk, action is not returned automatically (which is by default rule). Instead we can pass the "action" manually to a "dispatch function". And thus the control of passing "actions" to "dispatch function" is in our hand.

// Technical concept
// In "/project-root/client/src/index.js" we passed the redux-thunk as middleware to do the job.
// const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// This middleware/redux-thunk checks the return value of any given "action creator" (i.e. fetchUser).

// If middleware/redux-thunk sees that the return value from any action creator is not an action(i.e. "return {type: FETCH_USER, payload: res"), but is a function (i.e. "return () => {...}"), redux-thunk will automatically call that function(i.e. "() => {...}").

// If middleware/redux-thunk sees that, we returned a function(i.e. "return () => {...}"), instead of returning a action(i.e. "return {type: FETCH_USER, payload: res"), redux-thunk will automatically call that function(i.e. "() => {axios...}"). And "dispatch function" will be available, to be passed as an argument to that function(i.e. "(dispatch) => {axios...}").

// We are passing this object "{ type: FETCH_USER, payload: res }" inside dispatch(). So this object will be forwarded to all reducers inside the redux store.

export const fetchUser = () => async (dispatch) => {

    // Here we could use fetch() API. But error handling with it is more pain. And also fetch() can't carry cookie by default. So we are using axios.
    const res = await axios.get('/api/currentUser');

    // *** From - https://medium.com/@gethylgeorge/understanding-how-redux-thunk-works-72de3bdebc50 . See+read the "Understanding the middleware and thunk" section.
    // dispatch() generally called from redux-store by "store.dispatch()"
    // Here in this code, dispatch() is not being used directly from redux store(i.e. createStore()). Instead, it's used from redux-thunk. Redux thunk wraps it like --> dispatch = nextFunction(store.dispatch). Read the blog for more.

    // Inside dispatch's argument object, we are giving "payload" property. It will be available to all reducers as "action.payload" when this "dispatch function" would get called. We used "action.payload" in "/client/src/reducers/authReducer.js"
    dispatch({ type: FETCH_USER, payload: res.data });
};


// Original before refactor
// export const fetchUser = () => {
//     return (dispatch) => {
//         axios
//             .get('/api/currentUser')
//             .then((res) => dispatch({ type: FETCH_USER, payload: res }));
//     }
// };


// ES6 Arrow function rules
// If there is only one expression inside a fat arrow function, then we donot need to use curly braces

// export const fetchUser = () => dispatch => {
//     axios
//         .get('/api/currentUser')
//         .then((res) => dispatch({ type: FETCH_USER, payload: res }));
// };


// Handling Ajax logout Action
// export const logOutUser = () => async (dispatch) => {
//     await axios.get('/api/logout');
//     dispatch({ type: LOGOUT_USER });
// };

// Async/Await with ES5
// export const fetchUser = () => {
//     return async function(dispatch) {
//         const res = await axios.get('/api/currentUser');
//         dispatch({ type: FETCH_USER, payload: res.data });
//     };
// };



export const handleToken = (token) => async dispatch => {

    // This token object will be available in NODE backend as, req.body
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
};