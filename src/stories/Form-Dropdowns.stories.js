import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Select } from '../components/Form';
import { Expandable } from '../components/Expandable';
import { CodeBlock } from '../components/CodeBlock';

import './stories.scss';

export default {
  title: 'Dropdowns',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: [Select] } //propTables: [Checkbox]
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

const options4= [
  { label: 'Strings', options: ['a', 'b', 'c', 'd']},
  { label: 'Integers', options: [1,2,3,4,5,6]}
];

const selectRow = (data) => (
  <React.Fragment><span className="tag" style={{backgroundColor: data.color}}></span>{data.name}</React.Fragment>
)

const groupedRow = (data) => (
  <label className="different-group">{data.label} <span>{data.options.length}</span></label>
)

export const Selects = () => (
  <section className="sample-selects">
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Select String</label>
          <Select options={options}
                  label="Select..."
                  onClick={action('select')}></Select>
        </div> 

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={options}
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
        </div>
        
        <div className="form-group">
          <label className="form-label">Select Obj</label>
          <Select options={options2}
                  attr="name"
                  label="Select Obj..."
                  onClick={action('select')}></Select>
        </div>

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={optionsObjArr}
        attr="name"
        label="Select Obj..."
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
        </div>

        <div className="form-group">
          <label className="form-label">Select is Clearable</label>
          <Select options={options}
                  isClearable
                  onClick={action('select')}></Select>
        </div> 

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={options}
        isClearable
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
        </div>

        <div className="form-group">
          <label className="form-label">Disabled Select</label>
          <Select options={options2}
                  attr="name"
                  disabled
                  label="Select..."
                  onClick={action('select')}></Select>
        </div>

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={options2}
        attr="name"
        disabled
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
        </div>

        <div className="form-group">
          <label className="form-label">Grouped Select</label>
          <Select options={options3}
                  attr="label"
                  isGrouped
                  onClick={action('select')}></Select>
        </div> 

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={options3}
        attr="label"
        isGrouped
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
        </div>

        <div className="form-group">
          <label className="form-label">Custom Select Row</label>
          <Select options={options2}
                  attr="name"
                  selectRow={selectRow}
                  onClick={action('select')}></Select>
        </div> 

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
            <div>
{/* White space bug */}
<CodeBlock language="html">
{
`
const selectRow = (data) => (
  <React.Fragment>
    <span className="tag" 
          style={{backgroundColor: data.color}}>
    </span>
    {data.name}
  </React.Fragment>
)
`
}
</CodeBlock>
<CodeBlock language="html">
{`
<Select options={options2}
        attr="name"
        selectRow={selectRow}
        onClick={fn}></Select>
`}
</CodeBlock>
            </div>
          </Expandable>
        </div>

        <div className="form-group">
          <label className="form-label">Custom Grouped Select</label>
          <Select options={options3}
                  attr="label"
                  isGrouped
                  groupedRow={groupedRow}
                  onClick={action('select')}></Select>
        </div> 

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
            <div>
{/* White space bug */}
<CodeBlock language="html">
{
`
const groupedRow = (data) => (
  <label className="different-group">
    {data.label}
    <span>{data.options.length}</span>
  </label>
)
`
}
</CodeBlock>
<CodeBlock language="html">
{`
<Select options={options3}
        attr="label"
        isGrouped
        groupedRow={groupedRow}
        onClick={fn}></Select>
`}
</CodeBlock>
            </div>
          </Expandable>
        </div>
      </div>
    </div>
  </section>
)

export const MultiSelects = () => (
  <section className="sample-multiselects">
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Multiselect</label>
          <Select options={options}
                  isMultiSelect
                  label="Select..."
                  onClick={action('select')}></Select>
        </div> 

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={options2}
        attr="name"
        isMultiSelect
        label="Select..."
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
        </div>

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
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={options2}
        attr="name"
        isMultiSelect
        value={[{name: 'hello', id: 1}]}
        label="Select..."
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
        </div>

        <div className="form-group">
          <label className="form-label">Multiselect Fixed Prefilled</label>
          <Select options={options2}
                  attr="name"
                  isMultiSelect
                  value={ [{name: 'hello', id: 1, isFixed: true}]}
                  label="Select..."
                  onClick={action('select')}></Select>
        </div>

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={options2}
        attr="name"
        isMultiSelect
        value={[{name: 'hello', id: 1, isFixed: true}]}
        label="Select..."
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
        </div> 

        <div className="form-group">
          <label className="form-label">Multiselect is Clearable</label>
          <Select options={options2}
                  attr="name"
                  isMultiSelect
                  isClearable
                  label="Select..."
                  onClick={action('select')}></Select>
        </div> 

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={options2}
        attr="name"
        isMultiSelect
        isClearable
        label="Select..."
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
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

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={options2}
        attr="name"
        disabled
        isMultiSelect
        value={[{name: 'hello', id: 1}]}
        label="Select..."
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
        </div>

        <div className="form-group">
          <label className="form-label">Custom Multiselect Row</label>
          <Select options={options2}
                  attr="name"
                  selectRow={selectRow}
                  isMultiSelect
                  value={ [{name: 'hello', id: 1, color: '#ff4444'}]}
                  label="Select..."
                  onClick={action('select')}></Select>
        </div> 

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
            <div>
{/* White space bug */}
<CodeBlock language="html">
{`
const selectRow = (data) => (
  <React.Fragment>
    <span className="tag" 
          style={{backgroundColor: data.color}}>
    </span>
    {data.name}
  </React.Fragment>
)
`}
</CodeBlock>
<CodeBlock language="html">
{`
<Select options={options2}
        attr="name"
        selectRow={selectRow}
        isMultiSelect
        value={[{name: 'hello', id: 1, color: '#ff4444'}]}
        label="Select..."
        onClick={fn}></Select>
`}
</CodeBlock>
            </div>
          </Expandable>
        </div>

        <div className="form-group">
          <label className="form-label">Grouped Multiselect</label>
          <Select options={options3}
                  attr="label"
                  isGrouped
                  isMultiSelect
                  label="Select..."
                  onClick={action('select')}></Select>
        </div> 

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
{/* White space bug */}
<CodeBlock language="html">
{`
<Select options={options3}
        attr="label"
        isGrouped
        isMultiSelect
        label="Select..."
        onClick={fn}></Select>
`}
</CodeBlock>
          </Expandable>
        </div>

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

        <div className="form-group">
          <Expandable className="view-code">
            <span className="label-container">
              <span>View code</span>
              <span className="expandable-icon"></span>
            </span>
            <div>
{/* White space bug */}
<CodeBlock language="html">
{`
const groupedRow = (data) => (
  <label className="different-group">
    {data.label} 
    <span>{data.options.length}</span>
  </label>
)
`}
</CodeBlock>
<CodeBlock language="html">
{`
<Select options={options3}
        attr="label"
        isGrouped
        groupedRow={groupedRow}
        isMultiSelect
        label="Select..."
        onClick={fn}></Select>
`}
</CodeBlock>
            </div>
          </Expandable>
        </div>
      </div>
    </div>
  </section>
)