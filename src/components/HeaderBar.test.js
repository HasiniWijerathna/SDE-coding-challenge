import React, {Component} from 'react';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
import HeaderBar from './HeaderBar';

it("renders", () =>{
    const { asFragment} = render(
        <div>HeaderBar</div>
      );
      expect(asFragment()).toMatchSnapshot()
});