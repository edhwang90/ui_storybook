import React from 'react';
import { ExampleForm } from './components/ExampleForm';

import './App.scss';

export const App = () => {
  return (
    <ExampleForm shouldValidateBlur={true}></ExampleForm>
    //<ExampleForm shouldValidateChange={true}></ExampleForm>
  );
}
