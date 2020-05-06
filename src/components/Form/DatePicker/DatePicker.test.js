import React from 'react';
import { shallow } from 'enzyme';

import { DatePicker, useDatePicker } from './DatePicker';

let wrapped = shallow(<DatePicker onClick={ () => {} }></DatePicker>);

const DatePickerHook = () => {
  const props = useDatePicker({ onClick: () => {} });
  return <div {...props} />;
};

const hookWrapper = shallow(<DatePickerHook />);

describe('DatePicker', () => {

  it('opens the calendar', () => {
    hookWrapper.props().toggleCalendar();
    expect(hookWrapper.prop('isOpen')).toEqual(true);
  });

  it('sets the date', () => { 
    const date = '01/01/2020';
    hookWrapper.props().setDate(date);
    expect(hookWrapper.prop('selectedDate')).toEqual(date);
  });

  it('clears the date', () => { 
    hookWrapper.props().clearDate();
    expect(hookWrapper.prop('selectedDate')).toEqual('');
  });
});