import React, { Component } from 'react';

import history from '../history';

import { registerURL } from '../services/urlFactory';
import { setSession } from '../services/SessionService';
import BaseContainer from './BaseContainer';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/**
 * Representing the logic of user registration
 */
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
                email: Registration.validateEmail(),
                password: Registration.validatePassword().passwordError,
                confirmPassword: Registration.validatePassword().confirmPasswordError,
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
        let error = null;

        if (!email || email.length === 0) {
            error = '';
        } else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            error = 'Invalid email address';
        }

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
        let passwordError = null;
        let confirmPasswordError = null;

        if (!password || password.length === 0) {
            passwordError = '';
        } else if (password.length < 6) {
            passwordError = 'Password must contain atleast 6 characters';
        }


        if (confirmPassword.length && password.length) {
            if (password !== confirmPassword) {
                confirmPasswordError = 'Confirm password does not match';
            }
        }

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
                console.log(response.data.token);
                const session = {
                    authenticated: true,
                    token: response.data.token,
                };
                setSession(session);
                history.push('/');
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorMessage: {
                        open: true,
                        message: 'Email already exist!',
                    },
                });
            });
    }

    /**
    * Describes the elements on the Registration page
    * @return {String} HTML elements
    */
    render() {
        const errorEmail = !this.state.error.email
        return (
            <div className="center-container">
                <div className="login-container">
                    <div>
                        <TextField
                            id="standard-name"
                            label="Email"
                            margin="normal"
                            type="email"
                            variant="outlined"
                            required
                            value={this.state.user.email}
                            onChange={this.onChangeEmail}
                            error={!errorEmail}
                            helperText={this.state.error.email}
                        />
                    </div>
                    <div>
                        <TextField
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
                        <TextField
                            id="standard-name"
                            label="Confirm Password"
                            margin="normal"
                            required
                            type="password"
                            variant="outlined"
                            value={this.state.user.confirmPassword}
                            onChange={this.OnConfirmPassword}
                            error={this.state.error.confirmPassword}
                            helperText={this.state.error.confirmPassword}
                        />
                    </div>
                    <div>
                        <h2>
                            <Button disabled={!this.state.formValid} onClick={this.onConfirm}>Create your account</Button>
                        </h2>
                    </div>

                </div>

            </div>
        );
    }
}
export default Registration;
