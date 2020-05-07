import React from 'react';
import { shallow } from 'enzyme';

import { Toggle, useToggle } from './Toggle';


let wrappedSwitch = shallow(<Toggle type="switch" handleToggle={ () => {} } toggleFor="testToggle"></Toggle>);

const ToggleHook = () => {
  const props = useToggle({ handleToggle: () => {} });
  return <div {...props}></div>;
};

const hookWrapper = shallow(<ToggleHook></ToggleHook>);

describe('Toggle', () => {

  // it('renders the checkbox label', () => { 
  //   const label = 'Test Checkbox';
  //   expect(wrapped.find('label').text()).toEqual(label);
  // });

  it('toggles checkbox/switch', () => { 
    hookWrapper.props().toggle();
    expect(hookWrapper.prop('toggled')).toEqual(true);
  });
});