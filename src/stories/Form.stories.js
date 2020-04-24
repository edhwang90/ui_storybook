import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Checkbox, FormField } from '../components/Form';

import './stories.scss';

export default {
  title: 'Form',
  decorators: [withInfo],
  parameters: {
    info: { source: true, inline: true, propTables: false }
  }
};

export const Checkboxes = () => (
  <div>
    <Checkbox toggleProp={true}
              label="Checkbox"
              id={1}
              handleToggle={action('toggle')}>
    </Checkbox>

    <Checkbox toggleProp={false}
            label="Checkbox"
            id={2}
            handleToggle={action('toggle')}>
    </Checkbox>

    <Checkbox toggleProp={false}
            label="Checkbox"
            id={3}
            disabled
            handleToggle={action('toggle')}>
    </Checkbox>
  </div>
)

export const Inputs = () => (
  <div>
    <div className="form-group">
      <label className="form-label">Username</label>
      <FormField validateOnChange onChange={action('change')}>
        <input className="form-input" type="text" placeholder="Username"></input>
      </FormField>
    </div>

    <div className="form-group">
      <label className="form-label">Password</label>
      <FormField validateOnChange onChange={action('change')}>
        <input className="form-input" type="password" placeholder="Password"></input>
      </FormField>
    </div>

    <div className="form-group">
      <label className="form-label">Email</label>
      <FormField validateOnChange onChange={action('change')}>
        <input className="form-input" type="email" placeholder="Email"></input>
      </FormField>
    </div>

    <div className="form-group">
      <label className="form-label">Bio</label>
      <FormField validateOnChange onChange={action('change')}>
        <textarea minlength="15" className="form-input" placeholder="Bio..."></textarea>
      </FormField>
    </div>
  </div>
)

// export const Unchecked = () => (
//   <Checkbox toggleProp={false}
//             label="Checkbox"
//             id="1"
//             handleToggle={action('toggle')}>
//   </Checkbox>
// )

// export const Disabled = () => (
//   <Checkbox toggleProp={false}
//             label="Checkbox"
//             id="1"
//             disabled
//             handleToggle={action('toggle')}>
//   </Checkbox>
// )
