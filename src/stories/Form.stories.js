import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Checkbox, Select, DatePicker } from '../components/Form';

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
    <Checkbox label="Default"
              handleToggle={action('toggle')}>
    </Checkbox>

    <Checkbox label="Prefilled"
              value={true}
              handleToggle={action('toggle')}>
    </Checkbox>

    <Checkbox label="Disabled"
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
          <input onChange={action('change')}
                 className="form-input"
                 type="text" 
                 placeholder="Username">
          </input>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input onChange={action('change')}
                  className="form-input" 
                  type="password" 
                  placeholder="Password">
          </input>
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input onChange={action('change')}
                  className="form-input" 
                  type="email" 
                  placeholder="Email">
          </input>
        </div>

        <div className="form-group">
          <label className="form-label">Textarea</label>
          <textarea onChange={action('change')}
                    className="form-input" 
                    placeholder="Bio...">
          </textarea>
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
        <div className="input-container">
          <span className="form-input-prepend">💯</span>
          <input onChange={action('change')}
                 className="form-input" 
                 type="text" 
                 placeholder="Twitter">
          </input>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Prepend Textarea</label>
        <div className="input-container">
          <span className="form-input-prepend">👍</span>
          <textarea onChange={action('change')} 
                    className="form-input" 
                    placeholder="Type here...">
          </textarea>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="form-group">
        <label className="form-label">Append</label>
        <div className="input-container">
          <input onChange={action('change')}
                 className="form-input" 
                 type="text" 
                 placeholder="Twitter">
          </input>
          <span className="form-input-append">😀</span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Append Button</label>
        <div className="input-container">
          <input onChange={action('change')}
                 className="form-input" 
                 type="text" 
                 placeholder="Username">
          </input>
          <button onClick={action('click')} 
                  className="btn is-primary form-input-append"
                  type="button">
                  Click!
          </button>
        </div>
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
                  onClick={action('select')}></Select>
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
                  onClick={action('select')}></Select>
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
                  onClick={action('select')}></Select>
        </div> 
      </div>
    </div>
  </div>
)

export const DatePickers = () => (
  <div>
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Select a date</label>
          <DatePicker onClick={action('select')} value="12/01/2020" format="MM/DD/YYYY" placeholder="MM/DD/YYYY"></DatePicker>
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label className="form-label">Select a date</label>
          <DatePicker onClick={action('select')} format="DD/MM/YYYY" placeholder="DD/MM/YYYY"></DatePicker>
        </div>
      </div>
    </div>
  </div>
)