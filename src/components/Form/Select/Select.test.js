import React from 'react';
import { shallow } from 'enzyme';

import { Select, useSelect } from './Select';

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

let wrapped = shallow(<Select options={options} onClick={ () => {} }></Select>);

const SelectHook = () => {
  const props = useSelect({ options: options, onClick: () => {} });
  return <div {...props} />;
};

const hookWrapper = shallow(<SelectHook />);

describe('Select', () => {

  it('opens select', () => {
    hookWrapper.props().toggleSelect();
    expect(hookWrapper.prop('isOpen')).toEqual(true);
  });

  it('sets the selection', () => { 
    const selection = 'Option 1';
    hookWrapper.props().handleClick(selection);
    expect(hookWrapper.prop('selected')).toEqual(selection);
  });

  it('clears selected', () => { 
    const mockedEvent = { stopPropagation: () => {} }
    hookWrapper.props().resetSelect(mockedEvent);
    expect(hookWrapper.prop('selected')).toEqual('');
  });
});

const MultiSelectHook = () => {
  const props = useSelect({ isMultiSelect: true, options: options, onClick: () => {} });
  return <div {...props} />;
};

const multiHookWrapper = shallow(<MultiSelectHook />);

describe('MultiSelect', () => {

  it('opens select', () => {
    multiHookWrapper.props().toggleSelect();
    expect(multiHookWrapper.prop('isOpen')).toEqual(true);
  });

  it('sets the selection', () => { 
    const selection = 'Option 1';
    multiHookWrapper.props().handleClick(selection);
    expect(multiHookWrapper.prop('selected')).toEqual([selection]);
  });

  it('clears selected', () => { 
    const mockedEvent = { stopPropagation: () => {} }
    multiHookWrapper.props().resetSelect(mockedEvent);
    expect(multiHookWrapper.prop('selected')).toEqual([]);
  });
});
