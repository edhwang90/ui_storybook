import React, { useEffect, useState } from 'react';
import { ExampleForm } from './components/ExampleForm';
import { OutsideClickHandler } from './Utils';
import { ProgressBar } from './components/ProgressBar';

import './App.scss';

export const App = () => {
  const [testProgressBar, setTestProgressBar] = useState(0);

  useEffect(() => {
    setInterval(() => setTestProgressBar(
                        { 
                          completed: Math.floor(Math.random() * 100) + 1, 
                          bgColor: '#28a745'
                        }), 2000);
  },[])

  return (
    //<ExampleForm shouldValidateBlur={true}></ExampleForm>
    <React.Fragment>
      <h1>Sandbox</h1>

      {/* <OutsideClickHandler onOutsideClick={() => { console.log('test') }}>
        <p>
          asdfasdfasdfasdf
        </p>
        <p>23521531235</p>
      </OutsideClickHandler> */}

      <ProgressBar completed={testProgressBar.completed}
                   bgColor={testProgressBar.bgColor}></ProgressBar>

    </React.Fragment>
  );
}
