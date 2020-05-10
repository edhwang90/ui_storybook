import React, {useState, useEffect} from 'react';
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
    { name: 'Business Analyst', id: 1 },
    { name: 'Data Analyst', id: 2 },
    { name: 'QA Analyst', id: 3 },
    { name: 'Front-End Developer', id: 4 },
    { name: 'Back-End Developer', id: 5 },
    { name: 'Fullstack Developer', id: 6 },
    { name: 'UX Designer', id: 7 },
    { name: 'UI Designer', id: 8 },
    { name: 'Other', id: 10 }
  ]

  // const nestedArray = [
  //   { name: 'Section 1', options: ['1', '2', '3'] },
  //   { name: 'Section 2', options: ['4', '5', '6'] },
  //   { name: 'Section 3', options: ['7', '8', '9'] },
  // ]

  const locationsArr = [
    { name: 'North America', options: [{name: 'New York', id: 1 }, { name: 'San Francisco', id: 2 }, { name: 'Austin', id: 3 }, { name: 'Chicago', id: 10 }]},
    { name: 'Europe', options: [{name: 'Berlin', id: 4 }, { name: 'London', id: 5 }, { name: 'Madrid', id: 6 }]},
    { name: 'Asia', options: [{name: 'Seoul', id: 7 }, { name: 'Hong Kong', id: 8 }, { name: 'Tokyo', id: 9 }]},
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
      value: '',
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
    handleSubmit
  } = useValidate({
    // initial dependencies
    initialForm,
    onSubmit,
    // validates on change or on submit
    validateOnChange: false
  })

  const selectRow = (data) => (
    <li><span>a</span>{data}</li>
  )

  const groupedRow = (data) => (
    <label className="different-group">{data.name} <span>{data.options.length}</span></label>
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
                       //onBlur={e => validate('email', e.target.value)}
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
                      attr="name"
                      className={form.role.errors?.length > 0 ? 'form-error' : ''}
                      label="Select..."
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
              <Select options={locationsArr}
                      value={form.role.value}
                      attr="name"
                      isGrouped
                      isMultiSelect
                      groupedRow={groupedRow}
                      className={form.locations.errors?.length > 0 ? 'form-error' : ''}
                      label="Select..."
                      onClick={e => handleChange('role', e)}>
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
