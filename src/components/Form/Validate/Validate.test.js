import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

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
  it ('should validate on change', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useValidate({initialForm, validateOnChange: true }))

    act(() => {
      result.current.handleChange('email', 'test');
    })

    await waitForNextUpdate();

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

    expect(result.current.form).toEqual(updatedForm);
  })

  it ('should validate on explicit call', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useValidate({initialForm, validateOnChange: false }))

    act(() => {
      result.current.handleChange('email', 'test');
    })

    act(() => {
      result.current.validate('email');
    })

    await waitForNextUpdate();

    const updatedForm = {
      email: {
        value: 'test',
        rules: [ {type: 'type', value: 'email' } ],
        errors: ['Please enter a valid email address.'],
        isLoading: false,
      },
      password: {
        value: '',
        rules: [ {type: 'required'} ]
      },
      error: true
    };

    expect(result.current.form).toEqual(updatedForm);
  })

  it('should validate all fields', async () => {
    const { result, wait } = renderHook(() => useValidate({initialForm, validateOnChange: false }))

    act(() => {
      result.current.submit();
    })

    await wait(() => {
      return !result.current.form.isLoading;
    });

    const updatedForm = {
      email: {
        value: '',
        rules: [ {type: 'type', value: 'email' } ],
        errors: [
          'Please enter a valid email address.'
        ]
      },
      password: {
        value: '',
        rules: [ {type: 'required'} ],
        errors: [ 'This field is required.' ]
      },
      error: true,
      isLoading: false
    };

    expect(result.current.form).toEqual(updatedForm);
  });
});