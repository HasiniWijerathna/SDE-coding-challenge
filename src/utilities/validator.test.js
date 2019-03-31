import { cleanup } from 'react-testing-library'

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

    test('Validate name', () => {

        const correctName = 'Hasini'
        const incorrectName = 'hasi@#'
        const name = 'HasiniNimesha'
        let error = null
        const validateName = jest.fn((name) => error);
    
    
        let nameError = null
    
        validateName(correctName)
        validateName(incorrectName)
    
        if (!name || name.length === 0) {
            nameError = 'Name is required';
            expect(nameError).toEqual('Name is required');
        } else if (name && !/^[a-zA-Z]*$/.test(name)) {
            nameError = 'Invalid name';
            expect(nameError).toEqual('Invalid name');
        } else if (!/[A-Z].*/.test(name)) {
            nameError = 'Must starts with capital case';
            expect(nameError).toEqual('Must starts with capital case');
        } else if (name.split(" ").length > 1) {
            nameError = 'Invalid name';
            expect(nameError).toEqual('Invalid name');
        }
    
        expect(validateName).toBeCalledWith(correctName);
        expect(validateName).toBeCalledWith(incorrectName);
        expect(validateName).toHaveBeenCalled();
    
    });
    
    afterEach(cleanup)