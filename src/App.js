import React, { useEffect, useState } from 'react';
import { ExampleForm } from './components/ExampleForm';
import { OutsideClickHandler } from './Utils';
import { ProgressBar } from './components/ProgressBar';
import { Toaster } from './components/Toaster';

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
    <div className="sandbox">
      <h1>Sandbox</h1>

      {/* <OutsideClickHandler onOutsideClick={() => { console.log('test') }}>
        <p>
          asdfasdfasdfasdf
        </p>
        <p>23521531235</p>
      </OutsideClickHandler> */}

      {/* <ProgressBar completed={testProgressBar.completed}
                   bgColor={testProgressBar.bgColor}></ProgressBar> */}

      <div className="multiple-toasts">
       <Toaster className="toast-default">
          <div className="toaster-header">
            Default
          </div>
          <div className="toaster-content">
            Default
          </div>
        </Toaster>
        <Toaster className="toast-warning" dismissable={false}>
          <div className="toaster-header">
            Alert
          </div>
          <div className="toaster-content">
            this is an alert.
          </div>
        </Toaster>
        <Toaster className="toast-success">
        <div className="toaster-header">
            Success
          </div>
          <div className="toaster-content">
            this is a success
          </div>
        </Toaster>
        <Toaster className="toast-error">
        <div className="toaster-header">
            Error
          </div>
          <div className="toaster-content">
            this is a n error with description.
            this is a n error with description.
            this is a n error with description.
            this is a n error with description.
            this is a n error with description.
          </div>
        </Toaster>
      </div>

<h2>asasdgasdg</h2>
    </div>
  );
}
