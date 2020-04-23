import React from 'react';
import { action } from '@storybook/addon-actions';
import { Checkbox } from '../components/Checkbox/Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

export const Checked = () => (
  <Checkbox toggleProp={true}
            label="Checkbox"
            id="1"
            handleToggle={action('toggle')}>
  </Checkbox>
  
)

export const Unchecked = () => (
  <Checkbox toggleProp={false}
            label="Checkbox"
            id="1"
            handleToggle={action('toggle')}>
  </Checkbox>
)

export const Disabled = () => (
  <Checkbox toggleProp={false}
            label="Checkbox"
            id="1"
            disabled
            handleToggle={action('toggle')}>
  </Checkbox>
)
