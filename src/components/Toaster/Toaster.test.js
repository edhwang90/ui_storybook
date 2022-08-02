import React from 'react';
import { render, act } from '@testing-library/react';

import { useToaster } from './Toaster';

const setup = (args) => {
  const returnVal = {};

  const TestComponent = () => {
    Object.assign(returnVal, useToaster(args));
    return null;
  }

  render(<TestComponent></TestComponent>);
  return returnVal;
}

describe('Toaster', () => {
  
  it('dismiss on click', () => {
    const toasterHook = setup({ show: true, canDismiss: true })

    act(() => {
      toasterHook.onToastClick();
    })

    expect(toasterHook.isVisible).toEqual(false);
  })

  it('no dismiss for permanent', () => {
    const toasterHook = setup({ show: true, canDismiss: false })

    act(() => {
      toasterHook.onToastClick();
    })

    expect(toasterHook.isVisible).toEqual(true);
  })
})