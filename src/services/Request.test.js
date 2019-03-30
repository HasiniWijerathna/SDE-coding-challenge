
import {cleanup} from 'react-testing-library'
import axiosMock from 'axios';



  test('Generate headers', () => {
    const session = {
        authenticated: true,
        token: 'QpwL5tke4Pnpja7X'
    };
    const headers = {};

    if(session.authenticated) {
        headers['Authorization'] = `Bearer: ${session.token}`;
    }
    const generateHeaders = jest.fn(() => headers['Authorization']);
 
    generateHeaders();

   expect(headers['Authorization'] ).toBe(`Bearer: ${session.token}`);
   expect(generateHeaders).toHaveBeenCalled();
  
 });


jest.mock('axios');

test('Get request', async () => {
  const users = [{name: 'Bob'}];
  const getResponse = {data: users};

  const getURL = 'https://reqres.in/api/users?page=2'

  axiosMock.get.mockResolvedValue(getResponse);

  const get = jest.fn(axiosMock.get.mockResolvedValue(getResponse))
   get(axiosMock.get(getURL));


  await axiosMock.get.mockResolvedValueOnce({data: getResponse});


  await expect(axiosMock.get.mockImplementation(() => Promise.resolve(getResponse)))
  await expect(axiosMock.get).toHaveBeenCalledWith(getURL)
  await expect(get).toHaveBeenCalledTimes(1)
  
});


test('Post request', async () => {
    const postRespince = {data : {
      "name": "morpheus",
      "job": "leader",
      "id": "116",
      "createdAt": "2019-03-30T10:30:32.636Z"
  }}

    const postURL = "https://reqres.in/api/users"

    axiosMock.post.mockResolvedValue(postRespince);
  
    const post = jest.fn(axiosMock.post.mockResolvedValue(postRespince))
    post(axiosMock.post(postURL))

    await axiosMock.post.mockResolvedValueOnce({data: postRespince});
  
  
    await expect(axiosMock.post.mockImplementation(() => Promise.resolve(postRespince)))
    await  expect(axiosMock.post).toHaveBeenCalledWith(postURL)
    await  expect(post).toHaveBeenCalledTimes(1)
  
      
  });

  test('Delete request', async () => {
    const deleteResponse = {data : 204}

    const deleteURL = "https://reqres.in/api/users/2"

    axiosMock.post.mockResolvedValue(deleteResponse);
  
    const httDelete = jest.fn(axiosMock.post.mockResolvedValue(deleteResponse))
    httDelete(axiosMock.delete(deleteURL))

    await axiosMock.post.mockResolvedValueOnce({data: deleteResponse});
  
  
    await expect(axiosMock.delete.mockImplementation(() => Promise.resolve(deleteResponse)))
    await expect(axiosMock.delete).toHaveBeenCalledWith(deleteURL)
    await expect(httDelete).toHaveBeenCalledTimes(1)
  
      
  });
  
  test('Put request', async () => {
    const putResponse = {data : {
        "name": "morpheus",
        "job": "zion resident",
        "updatedAt": "2019-03-30T10:40:37.550Z"
    }}

    const putURL = "https://reqres.in/api/users/2"

    axiosMock.put.mockResolvedValue(putResponse);
  
    const put = jest.fn(axiosMock.post.mockResolvedValue(putResponse))
    put(axiosMock.put(putURL))

    await axiosMock.post.mockResolvedValueOnce({data: putResponse});
  
  
    await expect(axiosMock.put.mockImplementation(() => Promise.resolve(postRespince)))
    await expect(axiosMock.put).toHaveBeenCalledWith(putURL)
    await expect(put).toHaveBeenCalledTimes(1)
  
      
  });
  

  afterEach(cleanup)
