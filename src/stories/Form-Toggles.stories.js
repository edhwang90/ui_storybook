import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Toggle } from '../components/Form';
import { CodeBlock } from '../components/CodeBlock';

import './stories.scss';

export default {
  title: 'Toggles',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: false } //propTables: [Checkbox]
  }
};

export const Checkboxes = () => (
  <div>
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
        <label htmlFor="Disabled" className="toggle-label">Disabled</label>
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
    <label htmlFor="Disabled" className="toggle-label">Disabled</label>
  </div>
  `
  }
</CodeBlock>
  </div>
)

export const Switches = () => (
  <div>
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
        <label htmlFor="Disabled" className="toggle-label">Disabled</label>
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
    <label htmlFor="Disabled" className="toggle-label">Disabled</label>
  </div>
  `
  }
</CodeBlock>
  </div>
)

