import React, { useEffect, useState } from 'react';
import { ExampleForm } from './components/ExampleForm';
import { OutsideClickHandler } from './Utils';
import { ProgressBar } from './components/ProgressBar';
import { Toaster } from './components/Toaster';
import { DialogueBox } from './components/DialogueBox';
import { Wizard } from './components/Wizard';


import './App.scss';

export const App = () => {
  const [testProgressBar, setTestProgressBar] = useState(0);

  const [alertVisible, setAlertVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  const showToasts = (e) => {
    setIsVisible(true);
  }

  const Page1 = () => (<h1>Page 1</h1>);
  const Page2 = () => (<h1>Page 2</h1>);
  const Page3 = () => (<h1>Page 3</h1>);

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
      <button className="btn" onClick={showToasts}>Show Toasts</button>

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
                show={isVisible}
                isPermanent={true}
                canDismiss={false}>
          <div className="toaster-header">
            Default Color
          </div>
          <div className="toaster-content">
            isPermanent=true
            and canDismiss=false
          </div>
        </Toaster>
        <Toaster className="toast-warning" 
                 show={isVisible}
                 isPermanent={true}>
          <div className="toaster-header">
            Warning Color
          </div>
          <div className="toaster-content">
             This is a warning message.
          </div>
        </Toaster>
        {/* <Toaster className="toast-success">
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
        </Toaster> */}
      </div>
      <Wizard className="wizard" steps={3}>
        <Wizard.Pages className="wizard-content">
          <Page1 />
          <Page2 />
          <Page3 />
        </Wizard.Pages>
        <div className="wizard-buttons">
          <Wizard.ButtonPrev />
          <Wizard.ButtonNext />
        </div>
      </Wizard>
    </div>
  );
}
