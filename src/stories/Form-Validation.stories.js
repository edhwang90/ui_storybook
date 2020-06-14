import React from 'react';
import { withInfo } from '@storybook/addon-info';

import { ExampleForm } from '../components/ExampleForm';
import { useValidate } from '../components/Form/Validate';
import { CodeBlock } from '../components/CodeBlock';

import './stories.scss';

export default {
  title: 'Validation',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: [useValidate] } //propTables: [Checkbox]
  }
};

export const OnSubmit = () => (
  <section className="sample-validation">
    <ExampleForm></ExampleForm>

<CodeBlock language="js">
{
`
// custom validation method example
const customValidate = (formField) => {
  // mock fetch call 
  return fetch('https://jsonplaceholder.typicode.com/comments/3')
          .then(response => response.json())
          .then(json => {
            return (json.name);
          })
}

const initialForm = {
  email: { 
    value: '',
    // Available rules (types): 'required', 'type', 'minlength'
    //                          'maxlength', 'contains'
    rules: [
      { type: 'required' },
      // Available types: 'email', 'url', 'number'
      { type: 'type', value: 'email'},
    ],
    // Custom validation must be supplied a promise
    customValidation: customValidate,
    // String array of error messages, optional initial inclusion
    errors: []
  },
  password: { 
    value: '',
    rules: [
      { type: 'minlength', value: 5 }, 
      // Comma(',') seperated characters
      { type: 'contains', value: '@, #, %' },
      { type: 'maxlength', value: 10 }
    ],
    errors: []
  },
  locations: {
    // Preset value, with fixed option
    value: [{label: 'New York', value: 1, isFixed: true, group: { label: 'North America'} }],
    rules: []
  },
  startDate: { 
    value: '',
    rules: [{ type: 'required' }]
  },
  flexible: {
    value: false,
  },
  yearsExp: {
    value: '',
    rules: [{ type: 'required' }]
  },
  commMethods: {
    value: [],
    rules: [{ type: 'required' }]
  },
  terms: {
    value: false,
    rules: [{ type: 'required' }]
  }
};

// useValidate hook initiation
const {
  // output for use on form component
  form,
  handleChange,
  // available for explicit call for situations such as onBlur handling
  validate,
  // available for updating form after submit/backend validation
  updateForm,
  submit,
} = useValidate({
  // initial dependencies
  initialForm,
  // validates on change or on submit
  validateOnChange: true
})
`
}
</CodeBlock>
  </section>
)

export const OnBlur = () => (
  <section className="sample-validation">
    <ExampleForm shouldValidateBlur={true}></ExampleForm>
  </section>
)

export const OnChange = () => (
  <section className="sample-validation">
    <ExampleForm shouldValidateChange={true}></ExampleForm>
  </section>
)
