import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

export default {
  title: 'Buttons',
  decorators: [withInfo],
  parameters: {
    info: { source: true, inline: true, propTables: false }
  }
};

export const Buttons = () => (
  <div className="btn-container">
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
  </div>
)