import React from 'react';
import { isAuthenticated } from '../services/SessionService';

import history from '../history';

/**
 * Representing the logic of require router authentication functionality
 */
const CheckAuth = (Component) => {

    return class App extends Component {
        checkAuth = () => {
            const authenticated = isAuthenticated();
            if (authenticated) {
                history.push('/users');
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

export { CheckAuth }