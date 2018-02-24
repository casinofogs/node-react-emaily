// This file works as rendering layer + React Router

import React, { Component } from 'react';

// BrowserRouter is a component, the brain of React router. It tells the react router, how to behave. It sees the url in browser's address bar and updates the component according to the view of that url. BrowserRouter COMPONENT TAKES ATMOST ONE CHILD COMPONENT.
// Route - https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf . It's also a component. It sets up the rule that tells, how to handle the urls/routes. See vid - 7.69
// For, <Route path='/roster'/>
// when the pathname is '/', the path does not match. When the pathname is '/roster' or '/roster/2', the path matches
// If you only want to match '/roster', then you need to use the "exact" prop. The following will match '/roster', but not '/roster/2'. That is <Route exact path='/roster'/>
import { BrowserRouter, Route } from 'react-router-dom';

// We will use connect to hook up the actions with react in App component
import { connect } from 'react-redux';

// This actions will pass to connect()
import * as actions from './../actions';

// Importing components
import Header from './Header';
import Landing from './Landing';

// Dummy components
// const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
// const Landing = () => <h2>Landing</h2>;


// Here We are defining the App as class based component in order to use the react component life cycle. And to also call some action creator(like fetchUser()) when the application boots up for first time.
class App extends Component {
    // We are not using componentWillMount(). Because in future, it will be called multiple times behind the scene. And the request handling time difference between componentWillMount & componentDidMount is almost 0. They both perform ajax request. must read - https://daveceddia.com/where-fetch-data-componentwillmount-vs-componentdidmount/
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        // Router implementation - https://gist.github.com/siakaramalegos/df4620c52e829f6107c75d5c3f0ad7f5
        // https://reacttraining.com/react-router/web/api/BrowserRouter
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};


// After using <Switch>

// {/* <BrowserRouter>
//     <div>
//         <Header />
//         <Switch>
//             <Route exact path="/" component={Landing} />
//             <Route exact path="/surveys" component={Dashboard} />
//             <Route path="/surveys/new" component={SurveyNew} />
//         </Switch>
//     </div>
// </BrowserRouter> */}


// Now we have to connect the actions used in App component, with redux. That is why, we used "connect()" . 
// connect()'s first argument is - mapStateToProps which should be a function. MapStateToProps is only used when we want to read data from the redux store. This is currently "null" right now. Because right now, we don't need to read data from redux store.
// connect()(App)'s 2nd argument is "App"-. If there is "mapStateToProps()" in first argument, mapStateToProps returns an object. The "keys" of that returned object will then be passed on as the props of the component they are connected to(i.e. App). Then in "App Component", "this.props.key" will be available.
// read this for info - https://medium.com/mofed/reduxs-mysterious-connect-function-526efe1122e4
// *** Easy, diagram details - https://www.sohamkamani.com/blog/2017/03/31/react-redux-connect-explained/
// In the App.js file, we didn't need access to any state from Redux, we only needed to get access to the action creators.  So rather than create a 'mapStateToProps' function, we passed the action creators in connect().
// MapStateToProps is only used when we want to read data from the redux store.
// https://learn.co/lessons/map-state-to-props-readme
export default connect(null, actions)(App);

// export default App;