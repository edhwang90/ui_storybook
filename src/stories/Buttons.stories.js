import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { CodeBlock } from '../components/CodeBlock';


export default {
  title: 'Buttons',
  decorators: [withInfo],
  parameters: {
    info: { source: false, inline: true, propTables: false }
  }
};

export const Buttons = () => (
  <div>
    <div className="btn-group">
        <button className="btn" 
                onClick={action('click')} 
                type="button">
                Button
        </button>

        <button className="btn is-primary"
                onClick={action('click')}
                type="button">
                Primary
        </button>

        <button className="btn is-clear"
                onClick={action('click')}
                type="button">
                Clear
        </button>

        <button className="btn is-alternate"
                onClick={action('click')}
                type="button">
                Alternate
        </button>

        <button className="btn is-danger"
                onClick={action('click')}
                type="button">
                Danger
        </button>

        <button className="btn is-warning"
                onClick={action('click')}
                type="button">
                Warning
        </button>

        <button className="btn is-success"
                onClick={action('click')}
                type="button">
                Success
        </button>
    </div>
<CodeBlock language="html">
  {
  `
  <button className="btn" 
          onClick={fn} 
          type="button">
    Button
  </button>

  <button className="btn is-primary"
          onClick={fn}
          type="button">
    Primary
  </button>

  <button className="btn is-clear"
          onClick={fn}
          type="button">
    Clear
  </button>

  <button className="btn is-alternate"
          onClick={fn}
          type="button">
    Alternate
  </button>

  <button className="btn is-danger"
          onClick={fn}
          type="button">
    Danger
  </button>

  <button className="btn is-warning"
          onClick={fn}
          type="button">
    Warning
  </button>

  <button className="btn is-success"
          onClick={fn}
          type="button">
    Success
  </button>
  `
  }
</CodeBlock>
  </div>
)

export const Links = () => (
  <div>
    <a className="link"
       href="http://google.com" 
       title="to link">
       Default link
    </a>
    <a className="link"
       href="http://google.com" 
       rel='noopener noreferrer'
       target='_blank'
       title="to new tab">
       Link to new tab
    </a>
<CodeBlock language="html">
  {
  `
  <a className="link"
     href="http://google.com" 
     title="to link">
     Default link
  </a>
  <a className="link"
     href="http://google.com" 
     rel='noopener noreferrer'
     target='_blank'
     title="to new tab">
     Link to new tab
  </a>
  `
  }
</CodeBlock>
  </div>
)