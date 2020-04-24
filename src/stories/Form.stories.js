import React from 'react';
import { action } from '@storybook/addon-actions';
import { Checkbox } from '../components/Checkbox';
import { withInfo } from '@storybook/addon-info';

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
              id="1"
              handleToggle={action('toggle')}>
    </Checkbox>

    <Checkbox toggleProp={false}
            label="Checkbox"
            id="2"
            handleToggle={action('toggle')}>
    </Checkbox>

    <Checkbox toggleProp={false}
            label="Checkbox"
            id="3"
            disabled
            handleToggle={action('toggle')}>
    </Checkbox>
  </div>
)

export const Inputs = () => (
  <input type="checkbox"></input>
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
