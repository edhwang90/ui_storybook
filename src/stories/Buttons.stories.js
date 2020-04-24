import React from 'react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Button } from '../components/Button';
import { Link } from '../components/Link';

export default {
  title: 'Buttons',
  decorators: [withInfo],
  parameters: {
    info: { source: true, inline: true, propTables: false }
  }
};

export const Buttons = () => (
  <div>
      <Button onClick={action('click')}>
        Primary
      </Button>

      <Button className="is-alternate"
          onClick={action('click')}>
            Alternate
      </Button>

      <Button className="is-danger"
          onClick={action('click')}>
            Danger
      </Button>

      <Button className="is-warning"
          onClick={action('click')}>
            Warning
      </Button>

      <Button className="is-success"
          onClick={action('click')}>
            Success
      </Button>
  </div>
)

export const Links = () => (
  <div>
    <Link route="http://google.com" title="to link">Default link</Link>
    <Link route="http://google.com" isNewTab={true} title="to new tab">Link to new tab</Link>
  </div>
)