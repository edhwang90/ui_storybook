import React, { useEffect, useState } from 'react';
import { ExampleForm } from './components/ExampleForm';
import { OutsideClickHandler } from './Utils';
import { ProgressBar } from './components/ProgressBar';
import { Toaster } from './components/Toaster';
import { DialogueBox } from './components/DialogueBox';

import './App.scss';

export const App = () => {
  const [testProgressBar, setTestProgressBar] = useState(0);

  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    // setInterval(() => setTestProgressBar(
    //                     { 
    //                       completed: Math.floor(Math.random() * 100) + 1, 
    //                       bgColor: '#28a745'
    //                     }), 2000);
  },[])

  const showAlert = () => {
    setAlertVisible(true);
  }

  const testButton= (e) => {
    console.log('click', e)
    setAlertVisible(false);
  }

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

      <button className="btn is-error" onClick={showAlert}>Show Alert</button>

      <DialogueBox message="test message"
                   isVisible={alertVisible}
                   title="test title">
                    <button className="btn" onClick={() => testButton('Cancel')}>
                        Cancel
                    </button>
                    <button className="btn is-primary" onClick={() => testButton('Confirm')}>
                        Confirm
                    </button>
      </DialogueBox>


      <div className="multiple-toasts">
       <Toaster className="toast-default"
                isPermanent={true}
                canDismiss={false}>
          <div className="toaster-header">
            Default
          </div>
          <div className="toaster-content">
            Default
          </div>
        </Toaster>
        <Toaster className="toast-warning" 
                 isPermanent={true}>
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
          </div>
        </Toaster>
      </div>

<h2>asasdgasdg</h2>
    </div>
  );
}
