import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Checkbox, FormField, Select } from '../components/Form';
import { Button } from '../components/Button';

import './stories.scss';

export default {
  title: 'Form',
  decorators: [withInfo],
  parameters: {
    info: { source: true, inline: true, propTables: false }
  }
};

const options = [
  'Lorem ipsum',
  'Sed ut perspiciatis unde omnis iste natus',
  'voluptatem',
  'laudantium',
  'quasi'
];

const options2 = [
  { name: 'hello', id: 1 },
  { name: 'goodbye', id: 2 },
  { name: 'aufwiedersehen', id: 3}
];

export const Checkboxes = () => (
  <div>
    <Checkbox toggleProp={false}
              label="Default"
              id={1}
              handleToggle={action('toggle')}>
    </Checkbox>

    <Checkbox toggleProp={true}
            label="Prefilled"
            id={2}
            handleToggle={action('toggle')}>
    </Checkbox>

    <Checkbox toggleProp={false}
            label="Disabled"
            id={3}
            disabled
            handleToggle={action('toggle')}>
    </Checkbox>
  </div>
)

export const Inputs = () => (
  <div className="story-inputs">
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Text</label>
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
      </div>
      <div className="col">
        <div className="form-group">
          <label className="form-label">Email</label>
          <FormField validateOnChange onChange={action('change')}>
            <input className="form-input" type="email" placeholder="Email"></input>
          </FormField>
        </div>

        <div className="form-group">
          <label className="form-label">Textarea</label>
          <FormField validateOnChange onChange={action('change')}>
            <textarea minLength="15" className="form-input" placeholder="Bio..."></textarea>
          </FormField>
        </div>
      </div>
    </div>
  </div>
)

export const InputGroups = () => (
  <div className="row">
    <div className="col">
      <div className="form-group">
        <label className="form-label">Prepend Input</label>
        <FormField validateOnChange onChange={action('change')}>
          <span className="form-input-prepend">💯</span>
          <input className="form-input" type="text" placeholder="Twitter"></input>
        </FormField>
      </div>
      <div className="form-group">
        <label className="form-label">Prepend Textarea</label>
        <FormField validateOnChange onChange={action('change')}>
          <span className="form-input-prepend">👍</span>
          <textarea className="form-input" placeholder="Type here..."></textarea>
        </FormField>
      </div>
    </div>
    <div className="col">
      <div className="form-group">
        <label className="form-label">Append</label>
        <FormField validateOnChange onChange={action('change')}>
          <input className="form-input" type="text" placeholder="Twitter"></input>
          <span className="form-input-append">😀</span>
        </FormField>
      </div>

      <div className="form-group">
        <label className="form-label">Append Button</label>
        <FormField validateOnChange onChange={e => setTestVal2(e)}>
          <input minLength="3" className="form-input" type="text" placeholder="Username"></input>
          <Button onClick={action('click')} className="form-input-append is-primary">
            Click!
          </Button>
        </FormField>
      </div>
    </div>
  </div>
)

export const Dropdowns = () => (
  <div>
    <div className="row">
      <div className="col">
          <div className="form-group">
            <label className="form-label">Select Obj</label>
            <Select options={options2}
                    attr="name"
                    label="Select..."
                    onClick={action('select')}></Select>
          </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label className="form-label">Select String</label>
          <Select options={options}
                  label="Select..."
                  onClick={action('change')}></Select>
        </div> 
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Multiselect</label>
          <Select options={options2}
                  attr="name"
                  isMultiSelect
                  label="Select..."
                  onClick={action('change')}></Select>
        </div> 
      </div>
      <div className="col">
        <div className="form-group">
          <label className="form-label">Multiselect Prefilled</label>
          <Select options={options2}
                  attr="name"
                  isMultiSelect
                  value={ [{name: 'hello', id: 1}]}
                  label="Select..."
                  onClick={action('change')}></Select>
        </div> 
      </div>
    </div>
  </div>
)