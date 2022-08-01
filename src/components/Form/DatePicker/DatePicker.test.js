import React from 'react';
import {render, act} from '@testing-library/react'

import { useDatePicker } from './DatePicker';

const setup = (args) => {
  const returnVal = {};

  const TestComponent = () => {
    Object.assign(returnVal, useDatePicker(args));
    return null;
  }

  render(<TestComponent></TestComponent>);
  return returnVal;
}

describe('DatePicker', () => {

  it('opens the calendar', () => {
    const dateHook = setup({ onClick: () => {} });

    act(() => {
      dateHook.toggleCalendar();
    })

    expect(dateHook.isOpen).toEqual(true);
  });

  it('sets the date', () => { 
    const dateHook = setup({ onClick: () => {} });
    const date = '01/01/2020';
    const dateTimeStamp = new Date(2020, 0, 1);

    act(() => {
      dateHook.setDate(date);
    })

    expect(new Date(dateHook.selectedDate)).toEqual(dateTimeStamp);
  });

  it('clears the date', () => { 
    const dateHook = setup({ onClick: () => {} });

    act(() => {
      dateHook.clearDate();
    })
    
    expect(dateHook.selectedDate).toEqual('');
  });
});