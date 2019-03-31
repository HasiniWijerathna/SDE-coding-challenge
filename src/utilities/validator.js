
/**
* Returns the email validation error
* @param  {String}  email   user email
* @return {String}          email error
*/
const emailValidator = (email) => {
    let error = null;

    if (!email || email.length === 0) {
        error = '';
    } else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        error = 'Invalid email address';
    }
    return error;
  };

/**
 * Returns the password validation error
 * @param  {String}  password   user password
 * @return {String}             password error
 */
const passwordValidator = (password = '') => {
    let passwordError = null;

    if (!password || password.length === 0) {
        passwordError = '';
    } else if (password.length < 6) {
        passwordError = 'Password must contain atleast 6 characters';
    }

    return  passwordError ;
}

/**
 * Returns the confirm password validation error
 * @param  {String}  confirmPassword   user confirm password
 * @return {String}             confirm password  error
 */
const confirmPasswordValidator = (password = '', confirmPassword = '') => {
    let confirmPasswordError = null;

    if (confirmPassword.length && password.length) {
        if (password !== confirmPassword) {
            confirmPasswordError = 'Confirm password does not match';
        }
    }
    return  confirmPasswordError ;
}

/**
 * Returns the login password validation error
 * @param  {String}  loginPassword   user login password
 * @return {String}                  login password error
 */
const loginPasswordValidator = (password) => {
    let passwordError = '';

    if (!password || password.length === 0) {
      passwordError = 'Password is required';
    }
    return passwordError ;
}

/**
 * Returns the edit name validation error
 * @param  {String}  name   user edit name
 * @return {String}         edit name error
 */
const nameValidator = (name) => {
    let error = null
    if (!name || name.length === 0) {
        error = 'Name is required';
    } else if (name && !/^[a-zA-Z]*$/.test(name)) {
        error = 'Invalid name';
    } else if (!/[A-Z].*/.test(name)) {
        error = 'Must starts with capital case';
    } else if (name.split(" ").length > 1) {
        error = 'Invalid name';
    }
    return error
}

  export {emailValidator, passwordValidator, confirmPasswordValidator, loginPasswordValidator, nameValidator};