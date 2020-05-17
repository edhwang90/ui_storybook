import React, {useState, useEffect} from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { App } from '../App';
import { Toggle, Select, DatePicker, useValidate } from '../components/Form';
import { CodeBlock } from '../components/CodeBlock';

import './stories.scss';

export default {
  title: 'Validation',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: false } //propTables: [Checkbox]
  }
};

export const FormValidation = () => (
  <section className="sample-validation">
    <App></App>
  </section>
)
