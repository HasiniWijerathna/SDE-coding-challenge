import {cleanup} from 'react-testing-library'

test('the user register successfully', async () => {
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
  
  test('the register fails with an error', async () => {
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
    const password = '123456'
    const validatePassword = jest.fn((password) => password);
 
    let valiedPassword = null
 
    let passwordError = null

    validatePassword(correctPassword)
    validatePassword(incorrectPassword)
 
    if(!password || password.length === 0) {
     passwordError = 'Password is required';
     expect (passwordError).toEqual('Password is required');
    } else if (password.length < 6) {
        passwordError = 'Password must contain atleast 6 characters';
    } else {
        valiedPassword = password
        expect (valiedPassword).toEqual(password);
       } 
 
    expect(validatePassword).toBeCalledWith(correctPassword);
    expect(validatePassword).toBeCalledWith(incorrectPassword);
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
    it('Send valied email to requestHandler', () => {
        expect(onChangeEmail).toBeCalledWith('hasini@gmail.com');
    });
  });

  const password = 'h12g6j'
    const onChangePassword = jest.fn((password) => password)
 
    describe('OnChange password', () => {
    onChangePassword(password)
    it('Send valied password to requestHandler', () => {
        expect(onChangePassword).toBeCalledWith(password);
    });
  });
 

  test('should fetch users', () => {

    const nameError = 'Invalied name'
    const emailError = 'Invalied email'
    const passwordError = 'Invalied Password'
    const confirmPassword = 'Confirm password does not match'
    let error = false
    const validateAll = jest.fn((nameError, emailError, passwordError, confirmPassword ) => !error)
    validateAll(nameError, emailError, passwordError, confirmPassword )
  
    expect(validateAll(nameError, emailError, passwordError, confirmPassword )).toBe(error = true)
    expect(validateAll(!nameError, !emailError, !passwordError, !confirmPassword )).toBe(error = false)

    expect(validateAll).toBeCalledWith(nameError, emailError, passwordError, confirmPassword );
    expect(validateAll).toHaveBeenCalled();
  });


 afterEach(cleanup)