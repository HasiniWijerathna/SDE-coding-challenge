import React from 'react';

import {registerURL} from '../../services/urlFactoryService/urlFactory';
import {setSession} from '../../services/SessionService/SessionService';
import history from '../../history';
import BaseContainer from '../BaseContainer/BaseContainer';
import { emailValidator, 
        passwordValidator,
        confirmPasswordValidator
        } from '../../utilities/validator';

import {withStyles} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Registration extends BaseContainer {

    /**
    * Class constructor
    * @param {Object} props User define component
    */
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            formValid: false,
            error: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            focused: {
                username: false,
                name: false,
                email: false,
                password: false,
                confirmPassword: false,
            },
            errorMessage: {
                open: false,
                message: '',
            },
        };

    }

    /**
     * validate email
     * @param  {String} email The email
     * @return {String}       Relevent error of the incorrect email
     */
    static validateEmail(email = '') {
        const  error = emailValidator(email)
        return error;
    }

    /**
     * Validates the user credentials
     * @return {Boolean} valied user credentials
     */
    validateAll() {
        return !this.state.error.name && !this.state.error.email &&
            !this.state.error.password && !this.state.error.confirmPassword;
    }

    /**
     * Event changer for the email
     * @param  {String} changeEvent Changer event of the email
     */
    onChangeEmail = (changeEvent) => {

        const newEmail = `${changeEvent.target.value}`;
        const user = this.state.user;
        const error = this.state.error;
        const emailError = Registration.validateEmail(newEmail);

        user.email = newEmail;
        error.email = emailError;


        this.setState({
            formValid: this.validateAll(),
            user,
            error,
        });
    }

    /**
     * Validate password
     * @param  {String} password        The password
     * @param  {String} confirmPassword The confirmPassword
     * @return {String}          Relevent error of the incorrect password
     */
    static validatePassword(password = '', confirmPassword = '') {

       const passwordError = passwordValidator(password)
       const confirmPasswordError = confirmPasswordValidator(password, confirmPassword)

        return { passwordError, confirmPasswordError };
    }

    /**
    * Event changer for the password
    * @param  {String} changeEvent Changer event of the password
    */
    onChangePassword = (changeEvent) => {
        const password = changeEvent.target.value;
        const user = this.state.user;
        const confirmPassword = `${user.confirmPassword}`;
        const error = this.state.error;
        const validationErrors = Registration.validatePassword(password, confirmPassword);

        user.password = password;
        error.password = validationErrors.passwordError;
        error.confirmPassword = validationErrors.confirmPasswordError;

        this.setState({
            formValid: this.validateAll(),
            user,
            error,
        });
    }

    /**
    * Checks the password with the confirmPassword
    * @param {Event} changeEvent The confirm password
    */
    OnConfirmPassword = (changeEvent) => {
        const confirmPassword = changeEvent.target.value;
        const user = this.state.user;
        const password = user.password;
        const error = this.state.error;
        const validationErrors = Registration.validatePassword(password, confirmPassword);

        user.confirmPassword = confirmPassword;
        error.password = validationErrors.passwordError;
        error.confirmPassword = validationErrors.confirmPasswordError;

        this.setState({
            formValid: this.validateAll(),
            user,
            error,
        });
    }

    /**
    * Sends a POST Request to register the user
    */
    onConfirm = () => {
        const data = {
            email: this.state.user.email,
            password: this.state.user.password,
        };
        this.makePOSTrequest(registerURL(), data)
            .then((response) => {
                const session = {
                    authenticated: true,
                    token: response.data.token,
                };
                setSession(session);
                history.push('/');
            })
            .catch((error) => {
                this.setState({
                    errorMessage: {
                        open: true,
                        message: 'Email already exist!',
                    },
                });
            });
    }
   /**
   * Navigate to login
   */
  navigateToLogin = () => {
    history.push('/login');
  }

    /**
    * Describes the elements on the Registration page
    * @return {String} HTML elements
    */
    render() {
        return (
            <div className="center-container">
                < Card>
                    <CardContent>
                        <div className="form-card-container">
                            <div className="card-header-text-content">Create Account</div>
                            <div className="form-card-content">
                                <div>
                                    <TextField className="form-text-fields"
                                                id="standard-name"
                                                label="Email"
                                                margin="normal"
                                                type="email"
                                                variant="outlined"
                                                required
                                                value={this.state.user.email}
                                                onChange={this.onChangeEmail}
                                                helperText={this.state.error.email}

                                />
                                </div>
                                <div><TextField className="form-text-fields"
                                                 id="standard-name"
                                                 label="Password"
                                                 margin="normal"
                                                 required
                                                 type="password"
                                                 variant="outlined"
                                                 value={this.state.user.password}
                                                 onChange={this.onChangePassword}
                                                 helperText={this.state.error.password}
                                />
                                </div>
                                <div>
                                    <TextField className="form-text-fields"
                                               id="standard-name"
                                               label="Confirm Password"
                                               margin="normal"
                                               required
                                               type="password"
                                               variant="outlined"
                                               value={this.state.user.confirmPassword}
                                               onChange={this.OnConfirmPassword}
                                               helperText={this.state.error.confirmPassword}
                                    />
                                </div>
                                <div className="card-primary-button">
                                    <CreateButton
                                        variant="outlined"
                                        onClick={this.onConfirm} disabled={!this.state.formValid} >Create</CreateButton>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className="form-card-actions-container">
                            <div className="card-secondary-button">
                                <Button size="small" onClick={this.navigateToLogin}>Already have an account?</Button>
                            </div>
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
const CreateButton = withStyles({
    root: {
        background: '#4CAF50',
        borderRadius: 3,
        "&:hover": {
            backgroundColor: "#5bdd5f"
        },
        border: 0,
        color: 'white',
        height: 48,
        width: 600,
        padding: '0 30px',
    },

})(Button);

export default Registration;