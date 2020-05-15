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
  { name: 'hello', id: 1, color: '#ff4444' },
  { name: 'goodbye', id: 2, color: '#ffbb33' },
  { name: 'aufwiedersehen', id: 3, color: '#00C851'}
];

const options3 = [
  { label: 'North America', options: [{label: 'New York', value: 1 }, { label: 'San Francisco', value: 2 }, { label: 'Austin', value: 3 }, { label: 'Chicago', value: 10 }]},
  { label: 'Europe', options: [{label: 'Berlin', value: 4 }, { label: 'London', value: 5 }, { label: 'Madrid', value: 6 }]},
  { label: 'Asia', options: [{label: 'Seoul', value: 7 }, { label: 'Hong Kong', value: 8 }, { label: 'Tokyo', value: 9 }]},
];

const selectRow = (data) => (
  <li><span className="tag" style={{backgroundColor: data.color}}></span>{data.name}</li>
)

const groupedRow = (data) => (
  <label className="different-group">{data.label} <span>{data.options.length}</span></label>
)

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

        <div className="form-group">
          <label className="form-label">Custom Select Row</label>
          <Select options={options2}
                  attr="name"
                  selectRow={selectRow}
                  label="Select..."
                  onClick={action('select')}></Select>
        </div> 
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Custom Grouped Select</label>
          <Select options={options3}
                  attr="label"
                  isGrouped
                  label="Select..."
                  onClick={action('select')}></Select>
        </div> 
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Grouped Select</label>
          <Select options={options3}
                  attr="label"
                  isGrouped
                  groupedRow={groupedRow}
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
  <div className="form-group">
    <label className="form-label">Custom Select Row</label>
    <Select options={options2}
            attr="name"
            selectRow={selectRow}
            label="Select..."
            onClick={fn}></Select>
  </div> 
  <div className="form-group">
    <label className="form-label">Grouped Select</label>
    <Select options={options3}
            attr="label"
            isGrouped
            label="Select..."
            onClick={fn}></Select>
  </div> 
  <div className="form-group">
    <label className="form-label">Custom Grouped Select</label>
    <Select options={options3}
            attr="label"
            isGrouped
            groupedRow={groupedRow}
            label="Select..."
            onClick={fn}></Select>
  </div> 
   ` 
  }
</CodeBlock>
<h3>Custom Rows</h3>
<CodeBlock language="js">
  {
  `
  const selectRow = (data) => (
    <li><span className="tag" style={{backgroundColor: data.color}}></span>{data.name}</li>
  )
  const groupedRow = (data) => (
    <label className="different-group">{data.label} <span>{data.options.length}</span></label>
  )
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
          <label className="form-label">Custom Multiselect Row</label>
          <Select options={options2}
                  attr="name"
                  selectRow={selectRow}
                  isMultiSelect
                  value={ [{name: 'hello', id: 1}]}
                  label="Select..."
                  onClick={action('select')}></Select>
        </div> 
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Grouped Multiselect</label>
          <Select options={options3}
                  attr="label"
                  isGrouped
                  isMultiSelect
                  label="Select..."
                  onClick={action('select')}></Select>
        </div> 
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Custom Grouped Multiselect</label>
          <Select options={options3}
                  attr="label"
                  isGrouped
                  groupedRow={groupedRow}
                  isMultiSelect
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
    <label className="form-label">Disabled Multiselect</label>
    <Select options={options2}
            attr="name"
            disabled
            isMultiSelect
            value={ [{name: 'hello', id: 1}]}
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
  <div className="form-group">
    <label className="form-label">Custom Multiselect Row</label>
    <Select options={options2}
            attr="name"
            selectRow={selectRow}
            isMultiSelect
            value={ [{name: 'hello', id: 1}]}
            label="Select..."
            onClick={fn}></Select>
  </div> 
  <div className="form-group">
    <label className="form-label">Grouped Multiselect</label>
    <Select options={options3}
            attr="label"
            isGrouped
            isMultiSelect
            label="Select..."
            onClick={fn}></Select>
  </div> 
  <div className="form-group">
    <label className="form-label">Custom Grouped Multiselect</label>
    <Select options={options3}
            attr="label"
            isGrouped
            groupedRow={groupedRow}
            isMultiSelect
            label="Select..."
            onClick={fn}></Select>
  </div> 
   ` 
  }
</CodeBlock>
<h3>Custom Rows</h3>
<CodeBlock language="js">
  {
  `
  const selectRow = (data) => (
    <li><span className="tag" style={{backgroundColor: data.color}}></span>{data.name}</li>
  )
  const groupedRow = (data) => (
    <label className="different-group">{data.label} <span>{data.options.length}</span></label>
  )
  `
  }
</CodeBlock>
  </div>
)