import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { Select, DatePicker } from './components/Form'


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
    email: { value: '' },
    password: { value: '' },
    industry: { value: '' },
    role: { value: '' },
    startDate: { value: '' }
  }

  const [email, setEmail] = useState({ value: '' });
  const [password, setPassword] = useState({ value: '' });
  const [industry, setIndustry] = useState({ value: '' });
  const [role, setRole] = useState({ value: '' });
  const [startDate, setStartDate] = useState({ value: '' });
  const [form, setForm] = useState(initialForm)
  
  useEffect((e) => {
    console.log('a', form);
  }, [form])

  const onFormChange = (field, value) => {
    const newForm = {... form, ...validateField(field, value)}
    setForm(newForm)
  }

  const validateField = (field, value) => {
    const changeField = {};
    let errorMsg = 'has error';
    changeField[field] = { value: value, error: errorMsg}
    return changeField
  }

  const submit = (e) => {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <div className="sandbox">
      <form>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-container">
                <input onChange={e => onFormChange('email', e.target.value)}
                       className="form-input" 
                       type="email" 
                       placeholder="Email">
                </input>
                <span className="form-input-append"><FontAwesomeIcon icon={faCoffee} /></span>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-container">
                <span className="form-input-prepend"><FontAwesomeIcon icon={faCoffee} /></span>
                <input className="form-input"
                       onChange={e => onFormChange('password', e.target.value)}
                       type="password" 
                       placeholder="Password">
                </input>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Industry Experience</label>
              <Select options={industryArray}
                      label="Select..."
                      isMultiSelect
                      onClick={(e) => setIndustry({ value: e})}></Select>
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <Select options={rolesArray}
                      attr="name"
                      label="Select..."
                      onClick={(e) => setRole({ value: e})}></Select>
            </div> 

            <div className="form-group">
              <label className="form-label">Select a date</label>
              <DatePicker onClick={e => setStartDate(e)} format="MM/DD/YYYY" placeholder="MM/DD/YYYY"></DatePicker>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button onClick={e => submit(e)} type="submit" className="btn is-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
