import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '../components/Button';

export default {
  title: 'Buttons',
  component: Button,
};

export const PrimaryButton = () => (
  <Button onClick={action('click')}>
    Click me!
  </Button>
)

export const AlternateButton = () => (
  <Button className="is-alternate"
          onClick={action('click')}>
            Click me!
  </Button>
)

export const DangerButton = () => (
  <Button className="is-danger"
          onClick={action('click')}>
            Click me!
  </Button>
)

export const WarningButton = () => (
  <Button className="is-warning"
          onClick={action('click')}>
            Click me!
  </Button>
)

export const SuccessButton = () => (
  <Button className="is-success"
          onClick={action('click')}>
            Click me!
  </Button>
)

export const DisabledButton = () => (
  <Button className="is-primary"
          disabled
          onClick={action('click')}>
            Click me!
  </Button>
)