import React from 'react'
import { shallow } from 'enzyme';

import { useValidate } from './Validate';

const initialForm = {
  email: {
    value: '',
    rules: [ {type: 'type', value: 'email' } ]
  },
  password: {
    value: '',
    rules: [ {type: 'required'} ]
  }
};

describe('Validate', () => {
  it('should validate all fields', () => {
    // new Form
    const ValidateHook = () => {
      const props = useValidate({ initialForm, onSubmit: () => {} })
      return <div {...props}></div>
    }
    
    const hookWrapper = shallow(<ValidateHook></ValidateHook>);
    
    const updatedForm = {
      email: {
        value: '',
        rules: [ {type: 'type', value: 'email' } ],
        errors: ['Please enter a valid email address.']
      },
      password: {
        value: '',
        rules: [ {type: 'required'} ],
        errors: [ 'This field is required.' ]
      },
      error: true
    };

    hookWrapper.props().handleSubmit();
    expect(hookWrapper.prop('form')).toEqual(updatedForm); 
  })

  it('should validate field', () => {
    // new Form
    const ValidateHook = () => {
      const props = useValidate({ initialForm, onSubmit: () => {} })
      return <div {...props}></div>
    }
    
    const hookWrapper = shallow(<ValidateHook></ValidateHook>);
    
    const updatedForm = {
      email: {
        value: 'test',
        rules: [ {type: 'type', value: 'email' } ],
        errors: ['Please enter a valid email address.']
      },
      password: {
        value: '',
        rules: [ {type: 'required'} ]
      },
      error: true
    };

    hookWrapper.props().validate('email', 'test');
    expect(hookWrapper.prop('form')).toEqual(updatedForm);
  });

  it('should not validate field on change', () => {
    // new Form
    const ValidateHook = () => {
      const props = useValidate({ initialForm, onSubmit: () => {} })
      return <div {...props}></div>
    }
    
    const hookWrapper = shallow(<ValidateHook></ValidateHook>);
    
    const updatedForm = {
      email: {
        value: 'test',
        rules: [ {type: 'type', value: 'email' } ]
      },
      password: {
        value: '',
        rules: [ {type: 'required'} ]
      }
    };

    hookWrapper.props().handleChange('email', 'test');
    expect(hookWrapper.prop('form')).toEqual(updatedForm);
  });

  it('should validate field on change', () => {
    // new Form
    const ValidateHook = () => {
      const props = useValidate({ validateOnChange: true, initialForm, onSubmit: () => {} })
      return <div {...props}></div>
    }
    
    const hookWrapper = shallow(<ValidateHook></ValidateHook>);
    
    const updatedForm = {
      email: {
        value: 'test',
        rules: [ {type: 'type', value: 'email' } ],
        errors: ['Please enter a valid email address.']
      },
      password: {
        value: '',
        rules: [ {type: 'required'} ]
      },
      error: true
    };

    hookWrapper.props().handleChange('email', 'test');
    expect(hookWrapper.prop('form')).toEqual(updatedForm);
  });

});