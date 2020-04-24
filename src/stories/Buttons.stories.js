import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '../components/Button';
import { withInfo } from '@storybook/addon-info';

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

// export const PrimaryButton = () => (
//   <Button onClick={action('click')}>
//     Click me!
//   </Button>
// )

// export const AlternateButton = () => (
//   <Button className="is-alternate"
//           onClick={action('click')}>
//             Click me!
//   </Button>
// )

// export const DangerButton = () => (
//   <Button className="is-danger"
//           onClick={action('click')}>
//             Click me!
//   </Button>
// )

// export const WarningButton = () => (
//   <Button className="is-warning"
//           onClick={action('click')}>
//             Click me!
//   </Button>
// )

// export const SuccessButton = () => (
//   <Button className="is-success"
//           onClick={action('click')}>
//             Click me!
//   </Button>
// )

// export const DisabledButton = () => (
//   <Button className="is-primary"
//           disabled
//           onClick={action('click')}>
//             Click me!
//   </Button>
// )