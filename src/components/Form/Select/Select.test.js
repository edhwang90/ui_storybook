import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react'

import { useSelect } from './Select';

const options = [
  'Option 1',
  'Option 2',
  'Option 3'
];

const optionsObjs = [
  { id: 1, value: 'Option 1' },
  { id: 2, value: 'Option 2' },
  { id: 3, value: 'Option 3' }
];

const setup = (args) => {
  const returnVal = {};

  const TestComponent = () => {
    Object.assign(returnVal, useSelect(args));
    return null;
  }

  render(<TestComponent></TestComponent>);
  return returnVal;
}

describe('Select', () => {

  it('opens select', () => {
    const selectHook = setup({ options, onClick: () => {} });

    act(() => {
      selectHook.openSelect();
    })

    expect(selectHook.isOpen).toEqual(true);
  });

  it('sets the selection', () => { 
    const selectHook = setup({ options, onClick: () => {} });
    const selection = 'Option 1';

    act(() => {
      selectHook.clickSelect(selection);
    })

    expect(selectHook.selected).toEqual(selection);
  });

  it('clears selected', () => { 
    const selectHook = setup({ options, onClick: () => {} });
    const selection = 'Option 1';
    const mockedEvent = { stopPropagation: () => {} }

    act(() => {
      selectHook.clickSelect(selection);
    })

    act(() => {
      selectHook.resetSelect(mockedEvent);
    })

    expect(selectHook.selected).toEqual('');
  });
});

describe('MultiSelect', () => {

  it('opens select', () => {
    const multiSelectHook = setup({ isMultiSelect: true, options, onClick: () => {} });

    act(() => {
      multiSelectHook.openSelect();
    })

    expect(multiSelectHook.isOpen).toEqual(true);
  });

  it('sets the selection', () => { 
    const multiSelectHook = setup({ isMultiSelect: true, options, onClick: () => {} });
    const selection = 'Option 1';

    act(() => {
      multiSelectHook.clickSelect(selection);
    })

    expect(multiSelectHook.selected).toEqual([selection]);
  });

  it('clears selected', () => { 
    const multiSelectHook = setup({ isMultiSelect: true, options, onClick: () => {} });
    const selection = 'Option 1';
    const mockedEvent = { stopPropagation: () => {} }

    act(() => {
      multiSelectHook.clickSelect(selection);
    })

    act(() => {
      multiSelectHook.resetSelect(mockedEvent);
    })

    expect(multiSelectHook.selected).toEqual([]);
  });
});
