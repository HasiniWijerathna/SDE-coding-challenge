import {cleanup} from 'react-testing-library'

  test('Returns the modelURL', () => {
  
    let BASE = `https://reqres.in/api/`;

    let modelName = 'users/';
    let resourceId = 2;
    const url = 'https://reqres.in/api/users/2'

   
    const modelURL = jest.fn((modelName,resourceId) => url);
    if (resourceId) {
       let url = BASE + modelName + resourceId;
        expect (url).toEqual('https://reqres.in/api/users/2');
      }
 
      modelURL('users',2);
      expect(modelURL).toHaveBeenCalled();
  
 });


 test('Returns the loginURL', () => {
  
    let BASE = `https://reqres.in/api`;
    let modelName = '/login';

    const url = BASE + modelName;

    expect(url).toEqual('https://reqres.in/api/login');
  
 });

 test('Returns the registerURL', () => {
  
    let BASE = `https://reqres.in/api`;
    let modelName = '/register';

    const url = BASE + modelName;

    expect(url).toEqual('https://reqres.in/api/register');
  
 });



 const getUsers = (userId) => {
    const getUsers = modelURL('user', userId);
    const getUsersURL = url(getUsers, 'users');
  
    return getUsersURL;
  };

  test('Returns the get user URL', () => {
  
    let BASE = `https://reqres.in/api/`;

    let modelName = 'users';
    const url = 'https://reqres.in/api/users/'
    let getUsersURL = BASE+modelName

   
    const getUsers = jest.fn((modelName) => url);
    
    expect (getUsersURL).toEqual('https://reqres.in/api/users');
      
 
    getUsers('users');
      expect(getUsers).toHaveBeenCalled();
  
 });

 afterEach(cleanup)
