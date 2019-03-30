import url from 'url-join';

const BASE = url(`https://reqres.in/api`,);

/* URL for login page */
const loginURL = () => url(BASE, '/login');

/* URL for Registration page */
const registerURL = () => url(BASE, '/register');

/**
* Returns the modelURL
* @param  {String} modelName   The model name
* @param  {Integer} resourceId The resourceId
* @return {String}             The model url
*/
const modelURL = (modelName, resourceId) => {
    let modelURL = url(BASE, modelName);
  
    if (resourceId) {
      modelURL = url(modelURL, `${resourceId}`);
    }
  
    return modelURL;
  };

  /**
 * Returns get Users URL
 * @param  {String} userId The userId
 * @return {String}        The getUsersURL
 */
const getUsers = (userId) => {
    const getUsers = modelURL('user', userId);
    const getUsersURL = url(getUsers, 'users');
  
    return getUsersURL;
  };

  export {loginURL, registerURL, modelURL, getUsers};