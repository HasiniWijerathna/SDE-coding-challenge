import React, {Component} from 'react';
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library'
import FooterBar from './FooterBar';

it("renders", () =>{
    const { asFragment} = render(
        <div>Footer</div>
      );
      expect(asFragment()).toMatchSnapshot()
});