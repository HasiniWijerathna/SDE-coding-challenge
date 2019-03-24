
import React, {Component} from 'react';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
import Home from './Home';

it("renders", () =>{
    const { asFragment} = render(
        <div>Home Component</div>
      );
      expect(asFragment()).toMatchSnapshot()
});