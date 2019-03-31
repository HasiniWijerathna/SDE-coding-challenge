
import {cleanup} from 'react-testing-library'
import axiosMock from 'axios';


test('Error Handler', () => {
     const unauthorizedResponse = 401;
     const networkError = 'Network Error';

    const error1 = {error: unauthorizedResponse};
    const error2 = {error: networkError}
    const errorHandler = jest.fn(error => error);
   
  
    errorHandler(error1);
    errorHandler(error2);

    expect(errorHandler).toHaveNthReturnedWith(1, error1);
    expect(errorHandler).toHaveNthReturnedWith(2, error2);
    expect(errorHandler).toHaveBeenCalled();
   
  });


jest.mock('axios');

test('Make GET request', async () => {
  const users = [{name: 'Bob'}];
  const getResponse = {data: users};

  const getURL = 'https://reqres.in/api/users?page=2'

  axiosMock.get.mockResolvedValue(getResponse);

  const makeGETRequest = jest.fn(axiosMock.get.mockResolvedValue(getResponse))
   makeGETRequest(axiosMock.get(getURL));


  await axiosMock.get.mockResolvedValueOnce({data: getResponse});


  await expect(axiosMock.get.mockImplementation(() => Promise.resolve(getResponse)))
  await expect(axiosMock.get).toHaveBeenCalledWith(getURL)
  await expect(makeGETRequest).toHaveBeenCalledTimes(1)

  
});

test('Make POST request', async () => {
    const postRespince = {data : {
      "name": "morpheus",
      "job": "leader",
      "id": "116",
      "createdAt": "2019-03-30T10:30:32.636Z"
  }}

    const postURL = "https://reqres.in/api/users"

    axiosMock.post.mockResolvedValue(postRespince);
  
    const makePOSTrequest = jest.fn(axiosMock.post.mockResolvedValue(postRespince))
     makePOSTrequest(axiosMock.post(postURL))

    await axiosMock.post.mockResolvedValueOnce({data: postRespince});
  
  
    await expect(axiosMock.post.mockImplementation(() => Promise.resolve(postRespince)))
    await  expect(axiosMock.post).toHaveBeenCalledWith(postURL)
    await  expect(makePOSTrequest).toHaveBeenCalledTimes(1)
  
      
  });

  test('Make DELETE request', async () => {
    const deleteResponse = {data : 204}

    const deleteURL = "https://reqres.in/api/users/2"

    axiosMock.post.mockResolvedValue(deleteResponse);
  
    const makeDELETErequest = jest.fn(axiosMock.post.mockResolvedValue(deleteResponse))
     makeDELETErequest(axiosMock.delete(deleteURL))

    await axiosMock.post.mockResolvedValueOnce({data: deleteResponse});
  
  
    await expect(axiosMock.delete.mockImplementation(() => Promise.resolve(deleteResponse)))
    await expect(axiosMock.delete).toHaveBeenCalledWith(deleteURL)
    await expect(makeDELETErequest).toHaveBeenCalledTimes(1)
  
      
  });
  
  test('Make PUT request', async () => {
    const putResponse = {data : {
        "name": "morpheus",
        "job": "zion resident",
        "updatedAt": "2019-03-30T10:40:37.550Z"
    }}

    const putURL = "https://reqres.in/api/users/2"

    axiosMock.put.mockResolvedValue(putResponse);
  
    const makePUTrequest = jest.fn(axiosMock.post.mockResolvedValue(putResponse))
     makePUTrequest(axiosMock.put(putURL))

    await axiosMock.post.mockResolvedValueOnce({data: putResponse});
  
  
    await expect(axiosMock.put.mockImplementation(() => Promise.resolve(postRespince)))
    await expect(axiosMock.put).toHaveBeenCalledWith(putURL)
    await expect(makePUTrequest).toHaveBeenCalledTimes(1)
  
      
  });
  

  afterEach(cleanup)


