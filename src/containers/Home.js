import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import history from "../history";
import home from '../resources/home.png'; 


/**
 * Representing the Home page
 */
class Home extends Component {
/**
* Navigates user to the users page
*/
  navigateToHome = () => {
    history.push('/users');
  }
    render() {
        return (
            <div className="center-container">
                <div>
                    <Card>
                        <CardContent>
                            <CardMedia className="error-card-container"
                                component="img"
                                alt="Contemplative Reptile"
                                image={home}
                                title="Contemplative Reptile"
                                onClick={this.navigateToHome}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Home;