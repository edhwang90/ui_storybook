import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react'

import { Toggle, useToggle } from './Toggle';

const setup = (args) => {
  const returnVal = {};

  const TestComponent = () => {
    Object.assign(returnVal, useToggle(args));
    return null;
  }

  render(<TestComponent></TestComponent>);
  return returnVal;
}

const toggleHook = setup({ handleToggle: () => {} });

describe('Toggle', () => {
  it('toggles checkbox/switch', () => { 
    act(() => {
      toggleHook.toggle();
    })

    expect(toggleHook.toggled).toEqual(true);
  });

  it('has correct initial state', () => {
    const { unmount } = 
      render(<Toggle toggleFor="MockToggle" 
                     type="checkbox"
                     disabled
                     handleToggle={() => {}}></Toggle>);

    const toggle = document.getElementById('MockToggle');   
    expect(toggle.disabled).toEqual(true);
    unmount();
  })
});
