import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
// To use actions for ajax logout
// import * as actions from './../actions';

class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            // case null -> Still deciding - here we can set login process animation
            case null:
                return;

            // case false -> Currently logged out
            case false:
                return (
                    <li>
                        <a href="/auth/google" className="">Login with google</a>
                    </li>
                );

            // case default -> Currently logged in
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2"><a href="/api/logout" className="">Log out</a></li>
                ];
        }
    }

    render() {
        console.log(this.props.auth);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        { this.renderContent() }
                        {/* <li>
                            <a href="#" className="">Login with google</a>
                        </li> */}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state);
    // This returned object will passed to the Header as "props"
    return {
        // The reducers we defined can be found from "src/recucers/index.js". There we defined "auth: authReducer". So that "auth" property will be available as "state.auth" in "state" object
        auth: state.auth
    };
}

// Optimized syntax using ES6 destructuring. I don't have any idea that how this {auth} is working as {state.auth}. So for better understanding, I kept the above code for "mapStateToProps"
// function mapStateToProps({ auth }) {
//     return { auth: auth };
// }

// MapStateToProps() is only used when we want to read data from the redux store.
// Here we are reading the "state.auth"s value from redux store. So we are using MapStateToProps()
// connect()(Header)'s 2nd argument is "Header"-. If there is "mapStateToProps()" in first argument, mapStateToProps returns an object. The "keys" of that returned object will then be passed on as the props of the component they are connected to(i.e. Header). Then in "Header Component", "this.props.key" will be available.
// https://learn.co/lessons/map-state-to-props-readme
export default connect(mapStateToProps)(Header);

// We are using AJAX action "logOutUser" in Header.js. That's why we are passing "actions" to "connect()" 
// export default connect(mapStateToProps, actions)(Header);