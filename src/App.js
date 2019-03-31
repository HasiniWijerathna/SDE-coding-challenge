import React from 'react';
import './App.css'


const App = props => ({
  render() {
    return (
      <div>
        {props.children}
      </div>

    );
  }
});

export default App;