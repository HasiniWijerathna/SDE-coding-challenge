import React from 'react';

import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.css'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#ffffff',
    },
    text: {
    
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    secondary: {
      light: '#4da9b7',
      main: '#017a87',
      dark: '#004e5a',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: "'Lato', sans-serif",
    textTransform: "none",
    useNextVariants: true,



    button: {
      text: { // Name of the rule
        color: 'white', // Some CSS
      },
      textTransform: "none",

    },
    multilineColor: {
      color: 'red'
    },

  }
});


const App = props => ({
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HeaderBar />
        {props.children}
        <FooterBar />
      </MuiThemeProvider>

    );
  }
});

export default App;