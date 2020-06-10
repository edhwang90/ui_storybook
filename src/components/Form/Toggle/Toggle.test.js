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

    expect(toggleHook.isToggled).toEqual(true);
  });

  it('has correct radio button state', () => { 
    const radioHook = setup({ handleToggle: () => {}, type: 'radio', value: 2, toggleGroupValue: 4 });
    const selectedRadioHook = setup({ handleToggle: () => {}, type: 'radio', value: 4, toggleGroupValue: 4 });
    
    expect(radioHook.isToggled).toEqual(false);
    expect(selectedRadioHook.isToggled).toEqual(true);
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
