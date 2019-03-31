import React from 'react';
import FooterBar from './components/FooterBar';
import './App.css'


const App = props => ({
  render() {
    return (
      <div>
        {/* <HeaderBar /> */}
        {props.children}
        {/* <FooterBar /> */}
      </div>

    );
  }
});

export default App;