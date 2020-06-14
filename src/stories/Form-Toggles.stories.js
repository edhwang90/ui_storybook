import React, {useState} from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Toggle } from '../components/Form';
import { CodeBlock } from '../components/CodeBlock';

import './stories.scss';

export default {
  title: 'Toggles',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: [Toggle] } //propTables: [Checkbox]
  }
};

export const Checkboxes = () => (
  <section className="sample-checkboxes">
    <div className="form-group">
      <div className="row flex-center">
        <Toggle type="checkbox"
                toggleFor="Default"
                handleToggle={action('toggle')}>
        </Toggle>
        <label htmlFor="Default" className="toggle-label">Default</label>
      </div>
    </div>

    <div className="form-group">
      <div className="row flex-center">
        <Toggle type="checkbox"
                toggleFor="Prefilled"
                value={true}
                handleToggle={action('toggle')}>
        </Toggle>
        <label htmlFor="Prefilled" className="toggle-label">Prefilled</label>
      </div>
    </div>

    <div className="form-group">
      <div className="row flex-center">
        <Toggle type="checkbox"
                toggleFor="Disabled"
                disabled
                handleToggle={action('toggle')}>
        </Toggle>
        <label htmlFor="Disabled" className="toggle-label disabled">Disabled</label>
      </div>
    </div>
  
<CodeBlock language="html">
  {
  `
<div className="row flex-center">
  <Toggle type="checkbox"
          toggleFor="Default"
          handleToggle={fn}>
  </Toggle>
  <label htmlFor="Default" className="toggle-label">Default</label>
</div>

<div className="row flex-center">
  <Toggle type="checkbox"
          toggleFor="Prefilled"
          value={true}
          handleToggle={fn}>
  </Toggle>
  <label htmlFor="Prefilled" className="toggle-label">Prefilled</label>
</div>

<div className="row flex-center">
  <Toggle type="checkbox"
          toggleFor="Disabled"
          disabled
          handleToggle={fn}>
  </Toggle>
  <label htmlFor="Disabled" className="toggle-label disabled">Disabled</label>
</div>
  `
  }
</CodeBlock>
  </section>
)

export const Radio = () => {
  const radioOptions = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3 - Prefilled', value: 3 },
    { label: 'Option 4 - Disabled', value: 4 }
  ];

  const [radioEx, setRadioEx] = useState({label: 'TestRadioValue', value: 3});

  const handleRadio = (e) => {
    setRadioEx({label: 'TestRadioValue', value: e});
  }
  return (
    <section className="sample-radio">
      {
        radioOptions.map((option, index) => (
          <div className="form-group" key={index}>
            <div className="row flex-center">
              <Toggle type="radio"
                      value={option.value}
                      toggleGroupValue={radioEx.value}
                      disabled={option.value === 4 ? true : false }
                      toggleFor={`radio${option.value}`}
                      handleToggle={e => handleRadio(e)}>
              </Toggle>
              <label htmlFor={`radio${option.value}`} className={`toggle-label ${option.value === 4 ? 'disabled' : ''}`}>{option.label}</label>
            </div>
          </div>
        ))
      }
  
<CodeBlock language="html">
  {
  `
<Toggle type="radio"
        value={option.value}
        toggleGroupValue={radioEx.value}
        toggleFor="uniqueRadioOptionName"
        handleToggle={fn}>
</Toggle>
<label htmlFor="uniqueRadioOptionName" className="toggle-label">Radio Option Label</label>
  `
  }
</CodeBlock>
  </section>
  )
}

export const Switches = () => (
  <section className="sample-switches">
    <div className="form-group">
      <div className="row flex-center">
        <Toggle type="switch"
                toggleFor="Default"
                handleToggle={action('toggle')}>
        </Toggle>
        <label htmlFor="Default" className="toggle-label">Default</label>
      </div>
    </div>

    <div className="form-group">
      <div className="row flex-center">
        <Toggle type="switch"
                toggleFor="Prefilled"
                value={true}
                handleToggle={action('toggle')}>
        </Toggle>
        <label htmlFor="Prefilled" className="toggle-label">Prefilled</label>
      </div>
    </div>

    <div className="form-group">
      <div className="row flex-center">
        <Toggle type="switch"
                toggleFor="Disabled"
                disabled
                handleToggle={action('toggle')}>
        </Toggle>
        <label htmlFor="Disabled" className="toggle-label disabled">Disabled</label>
      </div>
    </div>
  
<CodeBlock language="html">
  {
  `
<div className="row flex-center">
  <Toggle type="switch"
          toggleFor="Default"
          handleToggle={fn}>
  </Toggle>
  <label htmlFor="Default" className="toggle-label">Default</label>
</div>

<div className="row flex-center">
  <Toggle type="switch"
          toggleFor="Prefilled"
          value={true}
          handleToggle={fn}>
  </Toggle>
  <label htmlFor="Prefilled" className="toggle-label">Prefilled</label>
</div>

<div className="row flex-center">
  <Toggle type="switch"
          toggleFor="Disabled"
          disabled
          handleToggle={fn}>
  </Toggle>
  <label htmlFor="Disabled" className="toggle-label disabled">Disabled</label>
</div>
  `
  }
</CodeBlock>
  </section>
)

