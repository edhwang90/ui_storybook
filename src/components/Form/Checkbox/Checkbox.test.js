import React from 'react';
import { shallow } from 'enzyme';

import { Checkbox, useCheckbox } from './Checkbox';


let wrapped = shallow(<Checkbox handleToggle={ () => {} } label="Test Checkbox"></Checkbox>);

const CheckboxHook = () => {
  const props = useCheckbox({ handleToggle: () => {} });
  return <div {...props} />;
};

const hookWrapper = shallow(<CheckboxHook />);

describe('Checkbox', () => {
  
  it('renders the checkbox label', () => { 
    const label = 'Test Checkbox';
    expect(wrapped.find('label').text()).toEqual(label);
  });

  it('toggles checkbox', () => { 
    hookWrapper.props().checkToggle();
    expect(hookWrapper.prop('checked')).toEqual(true);
  });
});