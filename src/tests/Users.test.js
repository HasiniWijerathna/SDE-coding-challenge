import { cleanup } from 'react-testing-library'
import axiosMock from 'axios';

jest.mock('axios');

test('Should fetch users data', async () => {
    const users = [{
        "data": [
            {
                "id": 5,
                "first_name": "Charles",
                "last_name": "Morris",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
            },
            {
                "id": 6,
                "first_name": "Tracey",
                "last_name": "Ramos",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
            }
        ]
    }];
    const getResponse = { data: users };

    const getURL = 'https://reqres.in/api/users?page=2'

    axiosMock.get.mockResolvedValue(getResponse);

    const fetchData = jest.fn(axiosMock.get.mockResolvedValue(getResponse))
    fetchData(axiosMock.get(getURL));


    await axiosMock.get.mockResolvedValueOnce({ data: getResponse });


    await expect(axiosMock.get.mockImplementation(() => Promise.resolve(getResponse)))
    await expect(axiosMock.get).toHaveBeenCalledWith(getURL)
    await expect(fetchData).toHaveBeenCalledTimes(1)

});


test('Should delete user', async () => {
    const deleteResponse = { data: 204 }

    const deleteURL = "https://reqres.in/api/users/2"

    axiosMock.post.mockResolvedValue(deleteResponse);

    const deleteData = jest.fn(axiosMock.post.mockResolvedValue(deleteResponse))
    deleteData(axiosMock.delete(deleteURL))

    await axiosMock.post.mockResolvedValueOnce({ data: deleteResponse });


    await expect(axiosMock.delete.mockImplementation(() => Promise.resolve(deleteResponse)))
    await expect(axiosMock.delete).toHaveBeenCalledWith(deleteURL)
    await expect(deleteData).toHaveBeenCalledTimes(1)


});

test('Should update user', async () => {
    const putResponse = {
        data: {
            "name": "morpheus",
            "job": "zion resident",
            "updatedAt": "2019-03-30T10:40:37.550Z"
        }
    }

    const putURL = "https://reqres.in/api/users/2"

    axiosMock.put.mockResolvedValue(putResponse);

    const updateData = jest.fn(axiosMock.post.mockResolvedValue(putResponse))
    updateData(axiosMock.put(putURL))

    await axiosMock.post.mockResolvedValueOnce({ data: putResponse });


    await expect(axiosMock.put.mockImplementation(() => Promise.resolve(postRespince)))
    await expect(axiosMock.put).toHaveBeenCalledWith(putURL)
    await expect(updateData).toHaveBeenCalledTimes(1)


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


test('Should update state with edited user', () => {

    const firstName = 'Hasini'
    const lastName = 'Wijeratne'
    const id = 5
    const users = [
        {
            "id": 5,
            "first_name": "Charles",
            "last_name": "Morris",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
            "id": 6,
            "first_name": "Tracey",
            "last_name": "Ramos",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
    ]

    const list = users.map((user) => {
        if (user.id === id) {
            user.first_name = firstName ? firstName : user.first_name;
            expect(user.first_name).toEqual('Hasini');
            user.last_name = lastName ? lastName : user.last_name;
            expect(user.last_name).toEqual('Wijeratne');
            return user;
        } else {
            return user;
        }
    });

    const onUpdateItem = jest.fn((id) => users);
    onUpdateItem(id)

    expect(onUpdateItem).toBeCalledWith(5);
    expect(onUpdateItem).toHaveBeenCalled();

});


const id = 1;
const firstname = 'John'
const lastName = 'Doe'

const onRemoveItem = jest.fn((id) => 1);

const onChangeFirstName = jest.fn((firstname) => 'John')
const onChangeLasttName = jest.fn((lastName) => 'Doe')

describe('Should update Firstname', () => {
    onChangeFirstName(firstname)
    it('Pass the props to update firstname', () => {
        expect(onChangeFirstName).toBeCalledWith('John');
    });
});

describe('Should update Lastname', () => {
    onChangeLasttName(lastName)
    it('Pass the props to update lastname', () => {
        expect(onChangeLasttName).toBeCalledWith('Doe');
    });
});

describe('Delete', () => {
    onRemoveItem(id)
    it('Pass the props with selected user id for remove', () => {
        expect(onRemoveItem).toBeCalledWith(1);
    });
});



test('Should filter users list by serach term', () => {

    const searchQuery = 'CHARLS';
    const user = {
        "id": 5,
        "first_name": "charls",
        "last_name": "Morris",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
    }

    const users = [
        {
            "id": 5,
            "first_name": "charls",
            "last_name": "Morris",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
            "id": 6,
            "first_name": "Tracey",
            "last_name": "Ramos",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
    ]

    let searchTerm = searchQuery.toLowerCase(),

        filteredBySearch = users.filter((user) => {
            let searchValue = user.first_name.toLowerCase();
            return searchValue.indexOf(searchTerm) !== -1;
        });

    const searchHandler = jest.fn((searchQuery) => filteredBySearch);
    searchHandler(searchQuery)
    expect(filteredBySearch).toEqual([{
        id: 5,
        first_name: 'charls',
        last_name: 'Morris',
        avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg'
    }]);

    expect(searchHandler).toBeCalledWith('CHARLS');
    expect(searchHandler).toHaveBeenCalled();

});

afterEach(cleanup)




