
import {cleanup} from 'react-testing-library'

test('the user login successfully', async () => {
    const user = {
        "email": "peter@klaven",
        "password": "cityslicka"
    }
    const response  = {
        "token": "QpwL5tke4Pnpja7X"
    }
    const onConfirm = jest.fn((user) => response);
    const data = await onConfirm(user);
    
    expect(data).toBe(response);
  });
  
  test('the login fails with an error', async () => {
      const user = {
        "email": "peter@klaven"
    }
    
    const error = "Missing password"

    const onConfirm = jest.fn((user) => error);

    try {
      await onConfirm(user);
    } catch (e) {
      expect(e).toMatch("Missing password");
    }
  });

  test('Validate password', () => {

   const correctPassword = 'ab345hjo'
   const incorrectPassword = '123'
   const password = '123'
   const validatePassword = jest.fn((password) => password);

   let valiedPassword = null

   let passwordError = null

   validatePassword(correctPassword)
   validatePassword(incorrectPassword)

   if(!password || password.length === 0) {
    passwordError = 'Password is required';
    expect (passwordError).toEqual('Password is required');
   } else {
    valiedPassword = password
    expect (valiedPassword).toEqual(password);
   }

   expect(validatePassword).toBeCalledWith(password);
   expect(validatePassword).toHaveBeenCalled();

  });


  test('Validate email', () => {

    const correctEmail= 'hasini@gmail.com'
    const incorrectEmail= 'hasini@mail'
    const email = 'hasinin@gmail.com'
    const validateEmail = jest.fn((email) => email);
 
    let valiedEmail = null
 
    let emailError = null
 
    validateEmail(correctEmail)
    validateEmail(incorrectEmail)
 
    

    if (!email || email.length === 0) {
        emailError = 'Email required';
        expect (emailError).toEqual('Email required');
    } else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        emailError = 'Invalid email address';
        expect (emailError).toEqual('Invalid email address');
    } else {
        valiedEmail = email
        expect (valiedEmail).toEqual(email);
    }
 
    expect(validateEmail).toBeCalledWith(correctEmail);
    expect(validateEmail).toBeCalledWith(incorrectEmail);
    expect(validateEmail).toHaveBeenCalled();
 
   });

   const email = 'hasini@gmail.com'
   const onChangeEmail = jest.fn((email) => 'hasini@gmail.com')

   describe('OnChange email', () => {
    onChangeEmail(email)
   it('Set valied email to the state', () => {
       expect(onChangeEmail).toBeCalledWith('hasini@gmail.com');
   });
 });


 test('Open snack bar', () => {
    let open = false
    const handleClose = jest.fn((open) => !open)

    handleClose(open)

    if(open) {
     expect(open).toBe(true)
    }
  });
  
  afterEach(cleanup)




