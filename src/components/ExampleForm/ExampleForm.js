import React, {useState, useEffect, useCallback} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { Toggle, Select, DatePicker, useValidate } from '../Form'

import './ExampleForm.scss';

export const ExampleForm = () => {

  const industryArray = [
    'Accounting & Legal',
    'Banking & Financial Services',
    'Computer Software & Hardware',
    'Consulting',
    'Government',
    'Education',
    'Internet & Tech',
    'Recruiting & Staffing',
    'Nonprofit',
    'Hospitality',
    'Transportation & Logistics'
  ]

  const rolesArray = [
    { label: 'Business Analyst', value: 1 },
    { label: 'Data Analyst', value: 2 },
    { label: 'QA Analyst', value: 3 },
    { label: 'Front-End Developer', value: 4 },
    { label: 'Back-End Developer', value: 5 },
    { label: 'Fullstack Developer', value: 6 },
    { label: 'UX Designer', value: 7 },
    { label: 'UI Designer', value: 8 },
    { label: 'Other', value: 10 }
  ]

  const nestedArray = [
    { label: 'Section 1', id: 1, options: ['1', '2', '3'] },
    { label: 'Section 2', id: 2, options: ['4', '5', '6'] },
    { label: 'Section 3', id: 3, options: ['7', '8', '9'] },
  ]

  const locationsArray = [
    { label: 'North America', options: [{label: 'New York', value: 1 }, { label: 'San Francisco', value: 2 }, { label: 'Austin', value: 3 }, { label: 'Chicago', value: 10 }]},
    { label: 'Europe', options: [{label: 'Berlin', value: 4 }, { label: 'London', value: 5 }, { label: 'Madrid', value: 6 }]},
    { label: 'Asia', options: [{label: 'Seoul', value: 7 }, { label: 'Hong Kong', value: 8 }, { label: 'Tokyo', value: 9 }]},
  ]

  const initialForm = {
    email: { 
      value: '',
      rules: [
        { type: 'required' },
        { type: 'type', value: 'email'}
      ] 
    },
    password: { 
      value: '',
      rules: [
        { type: 'minlength', value: 5 }, 
        { type: 'contains', value: '@, #, %' },
        { type: 'maxlength', value: 10 }
      ]
    },
    industry: { 
      value: '',
      rules: [{ type: 'required' }] 
    },
    role: { 
      value: '',
      rules: [{ type: 'required' }] 
    },
    locations: {
      //value: '',
     // value: {label: 'North America', options: [{label: 'New York', value: 1 }]},
      value: [{label: 'New York', value: 1, isFixed: true, group: { label: 'North America'} }],
      rules: []
    },
    startDate: { 
      value: '',
      rules: [{ type: 'required' }]
    },
    flexible: {
      value: '',
      rules: [{ type: 'required' }]
    },
    terms: {
      value: '',
      rules: [{ type: 'required' }]
    }
  };

  const onSubmit = (form) => {
    console.log('new submit', form);
  }

  const {
    // output for use on form component
    form,
    handleChange,
    // available for explicit call
    validate,
    handleSubmit,
  } = useValidate({
    // initial dependencies
    initialForm,
    onSubmit,
    // validates on change or on submit
    validateOnChange: false
  })

  const handleBlur = useCallback((field) => {
    validate(field, form[field].value);
  });

  const selectRow = (data) => (
    <li className="test"><span>a</span>{data}</li>
  )

  const groupedRow = (data) => (
    <label className="different-group">{data.label} <span>{data.options.length}</span></label>
  )

  return (
    <div className="sandbox">
      <form>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label className="form-label">Email<span className="required">*</span></label>
              <div className="input-container">
                <input onChange={e => handleChange('email', e.target.value)}
                       className={`form-input ${form.email.errors?.length > 0 ? 'form-error' : ''}`}
                       value={form.email.value}
                       onBlur={e => validate('email')}
                       type="email" 
                       placeholder="Email">
                </input>
                <span className="form-input-append"><FontAwesomeIcon icon={faCoffee} /></span>
              </div>
              { 
                form.email.errors &&
                form.email.errors.map((err, index) => (
                  <span key={index} className="error-message">{err}</span>
                ))
              }
            </div>
            <div className="form-group">
              <label className="form-label">Password<span className="required">*</span></label>
              <div className="input-container">
                <span className="form-input-prepend"><FontAwesomeIcon icon={faCoffee} /></span>
                <input className={`form-input ${form.password.errors?.length > 0 ? 'form-error' : ''}`}
                       value={form.password.value}
                       onBlur={e => validate('password')}
                       onChange={e => handleChange('password', e.target.value)}
                       type="password" 
                       placeholder="Password">
                </input>
              </div>
              { 
                form.password.errors &&
                form.password.errors.map((err, index) => (
                  <span key={index} className="error-message">{err}</span>
                ))
              }
            </div>
            <div className="form-group">
              <label className="form-label">Industry Experience<span className="required">*</span></label>
              <Select value={form.industry.value}
                      className={form.industry.errors?.length > 0 ? 'form-error' : ''}
                      label="Select..."
                      options={industryArray}
                      isMultiSelect
                      onBlur={e => validate('industry')}
                      onClick={e => handleChange('industry', e)}>
              </Select>
              { 
                form.industry.errors &&
                form.industry.errors.map((err, index) => (
                  <span key={index} className="error-message">{err}</span>
                ))
              }
            </div>

            <div className="form-group">
              <label className="form-label">Role<span className="required">*</span></label>
              <Select options={rolesArray}
                      value={form.role.value}
                      attr="label"
                      className={form.role.errors?.length > 0 ? 'form-error' : ''}
                      label="Select..."
                      onBlur={e => validate('role')}
                      onClick={e => handleChange('role', e)}>
               </Select>
              { 
                form.role.errors &&
                form.role.errors.map((err, index) => (
                  <span key={index} className="error-message">{err}</span>
                ))
              }
            </div> 

            <div className="form-group">
              <label className="form-label">Interested Location(s)</label>
              <Select //options={nestedArray}
                      options={locationsArray}
                      attr="label"
                      value={form.locations.value}
                      isGrouped
                      isMultiSelect
                      selectRow={selectRow}
                      //groupedRow={groupedRow}
                      className={form.locations.errors?.length > 0 ? 'form-error' : ''}
                      label="Select..."
                      onBlur={e => validate('locations')}
                      onClick={e => handleChange('locations', e)}>
               </Select>
              { 
                form.locations.errors &&
                form.locations.errors.map((err, index) => (
                  <span key={index} className="error-message">{err}</span>
                ))
              }
            </div> 

            <div className="form-group">
              <label className="form-label">Select a date<span className="required">*</span></label>
              <DatePicker onClick={e => handleChange('startDate', e)} 
                          onBlur={e => validate('startDate')}
                          className={form.startDate.errors?.length > 0 ? 'form-error' : ''}
                          format="MM/DD/YYYY" 
                          placeholder="MM/DD/YYYY"></DatePicker>
              { 
                form.startDate.errors &&
                form.startDate.errors.map((err, index) => (
                  <span key={index} className="error-message">{err}</span>
                ))
              }
            </div>

            <div className="form-group">
              <div className="row flex-center">
                <Toggle type="switch"
                        toggleFor="flexibleDate"
                        className={form.flexible.errors?.length > 0 ? 'form-error' : ''}
                        onBlur={e => validate('flexible')}
                        handleToggle={e => handleChange('flexible', e)}>
                </Toggle>
                <label className="toggle-label" htmlFor="flexibleDate">Flexible date<span className="required">*</span></label>
              </div>
              <div className="row">
                { 
                  form.flexible.errors &&
                  form.flexible.errors.map((err, index) => (
                    <span key={index} className="error-message">{err}</span>
                  ))
                }
              </div>
            </div>

            <div className="form-group">
              <div className="row flex-center">
                <Toggle type="checkbox"
                        toggleFor="agreeTerms"
                        className={form.terms.errors?.length > 0 ? 'form-error' : ''}
                        onBlur={e => validate('terms')}
                        handleToggle={e => handleChange('terms', e)}>
                </Toggle>
                <label htmlFor="agreeTerms" className="toggle-label">Agree to terms<span className="required">*</span></label>
              </div>
              <div className="row">
                { 
                  form.terms.errors &&
                  form.terms.errors.map((err, index) => (
                    <span key={index} className="error-message">{err}</span>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button onClick={handleSubmit} type="button" className="btn is-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
