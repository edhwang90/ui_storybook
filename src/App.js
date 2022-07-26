import React from 'react';
import { ExampleForm } from './components/ExampleForm';
import { OutsideClickHandler } from './Utils';

import './App.scss';

export const App = () => {
  return (
    //<ExampleForm shouldValidateBlur={true}></ExampleForm>
    <React.Fragment>
      <h1>Sandbox</h1>
      
      <OutsideClickHandler onOutsideClick={() => { console.log('test') }}>
        <p>
          asdfasdfasdfasdf
        </p>
        <p>23521531235</p>
      </OutsideClickHandler>
    </React.Fragment>
  );
}
