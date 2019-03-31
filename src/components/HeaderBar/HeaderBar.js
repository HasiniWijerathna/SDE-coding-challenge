import React, { Component } from 'react';
import history from "../../history";
import { resetSession } from "../../services/SessionService/SessionService";
import HeaderAppBar from "./HeaderAppBar";

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
          <HeaderAppBar onSignOut={this.signOut}/>
        </div>
    );
  }
}

export default HeaderBar;