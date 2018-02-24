// A good Sample Application - https://github.com/gothinkster/react-redux-realworld-example-app

// This file contains general rendering logics + initial boot-up logic + Root file for react

// Importing CSS from "client/node_modules/" materialize-css. It will automatically parsed as CSS by webpack.
// import materializeCSS from 'materialize-css/dist/css/materialize.min.css'; // Or,
import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

// Provider tag is a component that acts as bonding glue between react and redux. It's a higher order component. It can accept child component.
import { Provider } from 'react-redux';
// 
import { createStore, applyMiddleware } from 'redux';

// Added during vid- 7.75
import reduxThunk from 'redux-thunk';


import App from './components/App';

// All reducers(i.e. auth, surveyReducer) are defined here
import reducers from './reducers';

// createStore(() => [], {}, applyMiddleware())
// 1st argument - () => [] - The "reducer" function is being setted over here. If there is no initial state while developing an app, this is being set to a dummy reducer () => []
//  2nd argument - {} - This is widely used for serverside rendering. When development just starts, there is no initial state. So in that particular time, it's being setted to empty object.
//  3rd argument - applyMiddleware() - middleWare or redux thunk. The details will be found in "client/src/actions/index.js"

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// ReactDOM.render() function takes two arguments. 1st-root component, 2nd-where to put this component
// root component - This is also known as App component. Routing logic will be there
// 2nd argument- Where the root/App component will be rendered in the DOM(i.e <div id="root">)


ReactDOM.render(
    // If anything changes/updated in "store", the <Provider></Provider> will tell it's child component <App /> that, there's an update available currnetly in "store". Please change all the children according to state updates. 
    // In other words, <Provider></Provider> component can read changes in redux "store". If any time the store is changes/updated, then it will inform all of it's children components about the changes found in redux "store". (7.63, time-8.30s)
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);
