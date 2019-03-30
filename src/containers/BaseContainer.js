import {Component} from 'react';
import { resetSession} from '../services/SessionService';
import {get, post, httDelete, put} from '../services/Requests';

import history from '../history';

/**
 * Response type unauthorized request
 * @type {Number}
 */
const unauthorizedResponse = 401;
/**
 * Checks if the error type is unauthorized
 * @param  {error} error  Error object
 */
const errorHandler = (error) => {
  /**
   * Checks if the error type is unauthorizd and if so resets the session and navigates to
   * the login page.Else throws the error to the requested page
   */
  if(error.response && error.response.status === unauthorizedResponse) {
    resetSession();
    history.push('/login');
  } else {
    throw error;
  }
};
/**
* Represents the logic of generic functionalities
*/
class BaseComponent extends Component {
  /**
  * Class constructor
  * @param {Object} props User define component
  */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
    };
  }

/**
 * Makes GET request from server
 * @param  {string}  url The URL to GET request
 * @return {Promise}     Request Promise object
 */
  makeGETRequest(url) {

    return get(url)
      .then((response) => {
        return response.data;
      })
      .catch(errorHandler);
  }
/**
 * Makes POST request from server
 * @param  {string}  url The URL to POST request
 * @param  {Object}  data The data object
 * @return {Promise}     Request Promise object
 */
  makePOSTrequest(url, data) {
    return post(url, data)
      .then((response) => {
        return response;
      })
      .catch(errorHandler);
  }
/**
 * Makes PUT request from server
 * @param  {String} url  The URL to PUT request
 * @param  {Object} data The data object
 * @return {Promise}      Request promise object
 */
  makePUTrequest(url, data) {
    console.log('PUT URL AND DATA');
    console.log(url);
    console.log(data);
    return put(url, data)
    .then((response) => {
      return response;
    })
    .catch(errorHandler);
  }
/**
 * Makes DELETE request from the server
 * @param  {String} url The URL to DELETE from
 * @return {Promise}     Request Promise Object
 */
  makeDELETErequest(url) {
    return httDelete(url)
    .then((response) => {
      // return true;
    })
    .catch(errorHandler);
  }
}

export default BaseComponent;