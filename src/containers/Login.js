import React from 'react';

import history from '../history';

import BaseContainer from './BaseContainer';
import { setSession } from '../services/SessionService';
import { loginURL } from '../services/urlFactory';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

import { loginPasswordValidator, emailValidator} from '../utilities/validator'

/**
* Representing the logic of user login function
*/
class Login extends BaseContainer {
  /**
  * Class constructor
  */
  constructor(props) {
    super(props);

    let pathname = '/';
    if (props.location.state && props.location.state.nextPathname) {
      pathname = props.location.state.nextPathname;
    }

    this.state = {
      nextPathname: pathname,
      user: {
        email: '',
        password: '',
      },
      errorMessage: {
        open: false,
        message: '',
        email: '',
        password: ''
      },
      open: false,
      error: false
    };
  }

  /**
  * Sends a POST Request to fetch the user
  */
  onConfirm = () => {
    const data = {
      email: this.state.user.email,
      password: this.state.user.password,
    };
    this.makePOSTrequest(loginURL(), data)
      .then((response) => {
        if (response.status === 200) {
          const session = {
            authenticated: true,
            token: response.data.token,
            user: data,
          };
          setSession(session);
          history.push(this.state.nextPathname);
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: {
            open: true,
            message: 'OOPS Something went wrong',
          },
          open: true
        });
      });
  }

  /**
  * Event changer for the password
  * @param  {String} changeEvent Changer event of the password
  */
  onChangePassword = (changeEvent) => {
    const password = changeEvent.target.value;
    const user = this.state.user;
    const passwordError = Login.validatePassword(password);
    const errorMessage = this.state.errorMessage;

    user.password = password;
    errorMessage.password = passwordError;

    this.setState({
      user,
      errorMessage
    });

  }

  /**
  * Validate password
  * @param  {String} password        The password
  * @param  {String} confirmPassword The confirmPassword
  * @return {String}          Relevent error of the incorrect password
  */
  static validatePassword(password = '') {
    let passwordError = loginPasswordValidator(password)
    return { passwordError };
  }

  /**
  * Event changer for the email
  * @param  {String} changeEvent Changer event of the email
  */
  onChangeEmail = (changeEvent) => {
    const email = `${changeEvent.target.value}`;
    const user = this.state.user;
    const errorMessage = this.state.errorMessage;
    const emailError = Login.validateEmail(email);
    user.email = email;
    errorMessage.email = emailError;

    this.setState({
      user,
      errorMessage
    });
  }

  /**
   * validate email
   * @param  {String} email The email
   * @return {String}       Relevent error of the incorrect email
   */
  static validateEmail(email = '') {
    let error = null;
    error = emailValidator(email)
    return error;
  }

  /**
   * Navigates to the registration page
   */
  signUp() {
    history.push('/registration');
  }

  /**
   * Snack bar close
   */
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  }

  /**
  * Validates the user credentials
  * @return {Boolean} valied user credentials
  */
  validateAll = () => {
    return !this.state.errorMessage.password.passwordError && !this.state.errorMessage.email
  }

  render() {
    const buttonDisable = this.validateAll();
    return (
      <div className="center-container">

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={1200}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.errorMessage.message}</span>}
        />

        < Card>
          <CardContent>
            <div className="form-card-container">
              <div className="login-card-header">
                <div className="login-card-header-text">
                  <div className="card-header-text-content">LOGIN</div>

                </div>
              </div>
              <div className="form-card-content">
                <div><TextField className="form-text-fields"
                  id="standard-name"
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={this.state.user.name}
                  onChange={this.onChangeEmail}
                  helperText={this.state.errorMessage.email}
                />
                </div>
                <div><TextField className="form-text-fields"
                  id="standard-name"
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  value={this.state.user.password}
                  onChange={this.onChangePassword}  
                />
                </div>
                <div className="card-primary-button">
                  <LoginButton
                    variant="outlined"
                    onClick={this.onConfirm}
                    disabled={!buttonDisable}>Login</LoginButton>
                </div>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <div className="form-card-actions-container">
              <div className="card-secondary-button">
                <Button size="small" onClick={this.signUp}>Create account</Button>
              </div>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const LoginButton = withStyles({
  root: {
    background: '#1976D2',
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#2196F3"
    },
    border: 0,
    color: 'white',
    height: 48,
    width: 600,
    padding: '0 30px',
  },

})(Button);

export default Login;