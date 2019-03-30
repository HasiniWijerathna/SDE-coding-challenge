import React, { Component } from 'react';
import { isAuthenticated } from '../services/SessionService';

import history from '../history';

/**
 * Representing the logic of check router authentication functionality
 */
const RequireAuth = (Component) => {

    return class App extends Component {
        checkAuth = () => {
            const authenticated = isAuthenticated();
            if (authenticated) {
                this.props.history.push('/users')
            } else {
                history.push('/login')
            }
        };

        componentWillMount() {
            this.checkAuth();
        }
        render() {
            return <Component {...this.props} />
        }
    }
}

export { RequireAuth }