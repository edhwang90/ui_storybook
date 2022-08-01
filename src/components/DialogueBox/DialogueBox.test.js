import React from 'react';
import { render, expect, act } from '@testing-library/react';

import { DialogueBox } from './DialogueBox';

const setup = (args) => {
  const returnVal = {};

  const TestComponent = () => {
    Object.assign(returnVal, useDialogBox(args));
    return null;
  }

  render(<TestComponent></TestComponent>);
  return returnVal;
}