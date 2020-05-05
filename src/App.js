import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { Checkbox, Select, DatePicker, useValidate } from './components/Form'


import './App.scss';

function App() {

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
    startDate: { 
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
    form,
    handleChange,
    validate,
    handleSubmit
  } = useValidate({
    initialForm,
    onSubmit,
    validateOnChange: true
  })

  return (
    <div className="sandbox">
      <form>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-container">
                <input onChange={e => handleChange('email', e.target.value)}
                       className="form-input" 
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
              <label className="form-label">Password</label>
              <div className="input-container">
                <span className="form-input-prepend"><FontAwesomeIcon icon={faCoffee} /></span>
                <input className="form-input"
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
              <label className="form-label">Industry Experience</label>
              <Select options={industryArray}
                      value={form.industry.value}
                      label="Select..."
                      isMultiSelect
                      onClick={e => handleChange('industry', e)}></Select>
              { 
                form.industry.errors &&
                form.industry.errors.map((err, index) => (
                  <span key={index} className="error-message">{err}</span>
                ))
              }
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <Select options={rolesArray}
                      value={form.role.value}
                      attr="name"
                      label="Select..."
                      onClick={e => handleChange('role', e)}></Select>
              { 
                form.role.errors &&
                form.role.errors.map((err, index) => (
                  <span key={index} className="error-message">{err}</span>
                ))
              }
            </div> 

            <div className="form-group">
              <label className="form-label">Select a date</label>
              <DatePicker onClick={e => handleChange('startDate', e)} format="MM/DD/YYYY" placeholder="MM/DD/YYYY"></DatePicker>
              { 
                form.startDate.errors &&
                form.startDate.errors.map((err, index) => (
                  <span key={index} className="error-message">{err}</span>
                ))
              }
            </div>

            <div className="form-group">
              <Checkbox label="Agree to terms"
                        handleToggle={e => handleChange('terms', e)}>
              </Checkbox>
              { 
                form.terms.errors &&
                form.terms.errors.map((err, index) => (
                  <span key={index} className="error-message">{err}</span>
                ))
              }
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

export default App;
