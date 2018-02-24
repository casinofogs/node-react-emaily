import { FETCH_USER } from './../actions/types';

// This LOGOUT_USER type for AJAX logout
// import { LOGOUT_USER } from './types';

// If the request got pending due to slow speed of internet or any other problem, the value of state = null. 'null' indicates "we really dont know whats up right now"
// If the request completed and user logged in, then he value of state = UserModel
// If the request completed and user is not logged in, then he value of state = false

export default (state = null, action) => {

    // console.log(action.payload);
    
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; // payload may be stayed empty if user is not logged in. So we are using JS trick to pass to "false" value to state
        
        // For AJAX logout    
        // case LOGOUT_USER:
        //     return false;

        default: return state
    }
};