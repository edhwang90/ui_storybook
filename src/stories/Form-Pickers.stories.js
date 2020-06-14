import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { DatePicker } from '../components/Form';
import { CodeBlock } from '../components/CodeBlock';

import './stories.scss';

export default {
  title: 'Pickers',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: [DatePicker] } //propTables: [Checkbox]
  }
};

export const DatePickers = () => (
  <section className="sample-datepickers">
    <div className="row">
      <div className="col">
        <div className="form-group">
          <label className="form-label">Select a date</label>
          <DatePicker onClick={action('select')} 
                      value="12/01/2020" 
                      format="MM/DD/YYYY" 
                      placeholder="MM/DD/YYYY"></DatePicker>
        </div>
        <div className="form-group">
          <label className="form-label">Select a date</label>
          <DatePicker onClick={action('select')} 
                      format="DD/MM/YYYY" 
                      placeholder="DD/MM/YYYY"></DatePicker>
        </div>
      </div>
      <div className="col">
       <div className="form-group">
          <label className="form-label">Disabled date</label>
          <DatePicker onClick={action('select')} 
                      disabled
                      value="12/01/2020" 
                      format="MM/DD/YYYY" 
                      placeholder="MM/DD/YYYY"></DatePicker>
        </div>
      </div>
    </div>
<CodeBlock language="html">
{
`
<div className="form-group">
  <label className="form-label">Select a date</label>
  <DatePicker onClick={fn} 
              value="12/01/2020" 
              format="MM/DD/YYYY" 
              placeholder="MM/DD/YYYY"></DatePicker>
</div>
<div className="form-group">
  <label className="form-label">Select a date</label>
  <DatePicker onClick={fn} 
              format="DD/MM/YYYY" 
              placeholder="DD/MM/YYYY"></DatePicker>
</div>
<div className="form-group">
  <label className="form-label">Disabled date</label>
  <DatePicker onClick={fn} 
              format="DD/MM/YYYY" 
              placeholder="DD/MM/YYYY"></DatePicker>
</div>
`
}
</CodeBlock>
  </section>
)