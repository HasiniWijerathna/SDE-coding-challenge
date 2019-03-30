import React from 'react'
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'


import User from './User';

describe('User Card', () => {
    test('it renders the user', () => {
      // Arrange
      const props = {
       
      key:1,
      userData:{},
      onRemoveItem:(Function),
      onChangeFirstName:(Function),
      onChangeLastName:(Function),
      onUpdateItem:(Function),
      nameError:{}
      }

      render(<User {...props} />)
    })
  })



const id = 1;
const firstname = 'John'
const lastName = 'Doe'

const onRemoveItem = jest.fn((id) => 1);
const onUpdateItem = jest.fn((id) => 1);
const onChangeFirstName = jest.fn((firstname) => 'John')
const onChangeLasttName = jest.fn((lastName) => 'Doe')


describe('Delete', () => {
     onRemoveItem(id)
    it('Pass the props with selected user id for remove', () => {
        expect(onRemoveItem).toBeCalledWith(1);
    });
  });

  describe('Update', () => {
    onUpdateItem(id)
   it('Pass the props with the selected user id for edit', () => {
       expect(onUpdateItem).toBeCalledWith(1);
   });
 });

 describe('Update Firstname', () => {
    onChangeFirstName(firstname)
   it('Pass the props to update firstname', () => {
       expect(onChangeFirstName).toBeCalledWith('John');
   });
 });

 describe('Update Lastname', () => {
    onChangeLasttName(lastName)
   it('Pass the props to update lastname', () => {
       expect(onChangeLasttName).toBeCalledWith('Doe');
   });
 });

 afterEach(cleanup)