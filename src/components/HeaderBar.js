import React, { Component } from 'react';
import history from "../history";
import { resetSession } from "../services/SessionService";
import { withStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';

class HeaderBar extends Component {

  /**
   * Sets the authenticated false and navigates to the home page
   */
  signOut = () => {
    resetSession();
    history.push('/login');
  }

  render() {

    return (
      <div>
        <div children="search-bar-container">
          <div className="search-bar-signout">
            <LogoutButton onClick={this.signOut}>
              Logout
            </LogoutButton>
          </div>
        </div>
      </div>
    );
  }
}


const LogoutButton = withStyles({
  root: {
    background: '#ffffff',
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#c8d2d2"
    },
    border: 0,

    height: 38,
    width: 80,
    padding: '0 30px',
  },

})(Button);


export default HeaderBar;
