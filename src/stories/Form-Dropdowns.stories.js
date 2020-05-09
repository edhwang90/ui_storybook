import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Select } from '../components/Form';
import { CodeBlock } from '../components/CodeBlock';

import './stories.scss';

export default {
  title: 'Dropdowns',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: false } //propTables: [Checkbox]
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

export const Selects = () => (
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
        <div className="form-group">
          <label className="form-label">Disabled Select</label>
          <Select options={options2}
                  attr="name"
                  disabled
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

<CodeBlock language="html">
  {
   `
  <div className="form-group">
    <label className="form-label">Select Obj</label>
    <Select options={optionsObjArr}
            attr="name"
            label="Select..."
            onClick={fn}></Select>
  </div>
  <div className="form-group">
    <label className="form-label">Disabled Select</label>
    <Select options={options2}
            attr="name"
            disabled
            label="Select..."
            onClick={fn}></Select>
  </div>
  <div className="form-group">
    <label className="form-label">Select String</label>
    <Select options={optionsArr}
            label="Select..."
            onClick={fn}></Select>
  </div> 
   ` 
  }
</CodeBlock>
  </div>
)

export const MultiSelects = () => (
  <div>
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
        <div className="form-group">
          <label className="form-label">Disabled Multiselect</label>
          <Select options={options2}
                  attr="name"
                  disabled
                  isMultiSelect
                  value={ [{name: 'hello', id: 1}]}
                  label="Select..."
                  onClick={action('select')}></Select>
        </div> 
      </div>
    </div>

<CodeBlock language="html">
  {
   `
  <div className="form-group">
    <label className="form-label">Multiselect</label>
    <Select options={optionsObjArr}
            attr="name"
            isMultiSelect
            label="Select..."
            onClick={fn}></Select>
  </div> 
  <div className="form-group">
    <label className="form-label">Multiselect Prefilled</label>
    <Select options={optionsObjArr}
            attr="name"
            isMultiSelect
            value={[{name: 'hello', id: 1}]}
            label="Select..."
            onClick={fn}></Select>
  </div> 
   ` 
  }
</CodeBlock>
  </div>
)