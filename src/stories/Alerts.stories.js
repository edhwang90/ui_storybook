import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { CodeBlock } from '../components/CodeBlock';

import { DialogueBox } from '../components/DialogueBox';
import { Toaster } from '../components/Toaster';

export default {
  title: 'Alerts',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: false }
  }
};

const testButton= () => {
  alert('click')
}


export const Alert = () => (
  <React.Fragment>
      <DialogueBox message="Custom message for alert"
                   isCancelConfirm={true}
                   title="Standard Alert">
      </DialogueBox>

      <DialogueBox message="Custom message with custom call to actions"
                   isCancelConfirm={true}
                   title="Custom Call to Actions">
                      <button className="btn" 
                              onClick={testButton}>
                              Cancel
                      </button>
                      <button className="btn is-primary" 
                              onClick={testButton}>
                              Confirm
                      </button>
      </DialogueBox>
  </React.Fragment>

)

export const Toasts = () => (
  <React.Fragment>
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
    </div>
  </Toaster>
  </React.Fragment>
)