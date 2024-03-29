import React, {useState, memo, useEffect, useCallback} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCircleNotch, faSync } from '@fortawesome/free-solid-svg-icons'
import { LoadingIcon } from '../LoadingIcon';

import { initialForm } from './InitialForm';
import { Toggle, Select, DatePicker, useValidate } from '../Form'

import './ExampleForm.scss';

// Sample options
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
  { name: 'Business Analyst', color: '#ff4444', acr: 'BA', value: 1 },
  { name: 'Data Analyst', color: '#ff4444', acr: 'DA', value: 2 },
  { name: 'QA Analyst', color: '#ffbb33', acr: 'QA', value: 3 },
  { name: 'Front-End Developer', color: '#ffbb33', acr: 'FED', value: 4 },
  { name: 'Back-End Developer', color: '#ffbb33', acr: 'BED', value: 5 },
  { name: 'Fullstack Developer', color: '#ffbb33', acr: 'FD', value: 6 },
  { name: 'UX Designer', color: '#00C851', acr: 'UXD', value: 7 },
  { name: 'UI Designer', color: '#00C851', acr:'UID', value: 8 },
  { name: 'Other', color: '#33b5e5', acr: 'O', value: 10 }
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

const yearsOptions = [
  { label: '0 - 1', value: 1 },
  { label: '2 - 3', value: 2 },
  { label: '4 - 5', value: 3 },
  { label: '5 +', value: 4 },
]

const commOptions = [
  { label: 'Mobile/Cellular', value: 1 },
  { label: 'Email', value: 2 },
  { label: 'Social Media', value: 3 }
]

// Example form component
export const ExampleForm = (props) => {
  const { shouldValidateBlur, shouldValidateChange } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [asyncOptions, setAsyncOptions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        setAsyncOptions(json);
    })
    }, 5000)
  }, [])

  const {
    // output for use on form component
    form,
    handleChange,
    // available for explicit call
    validate,
    // available for updating form post submit
    updateForm,
    submit,
  } = useValidate({
    // initial dependencies
    initialForm,
    // validates on change or on submit
    validateOnChange: shouldValidateChange
  })

  const mockCall = () => {
    return new Promise(function(resolve,reject){
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  const handleSubmit = () => {
    setIsLoading(true);
    // for sake of demonstration: show errors for both 
    // client side validation and server side validation
    // therefore server side call before client side validation
    mockCall().then(res => {
      submit().then(validatedForm => {
        // log for debug
        console.log('%cForm Output: ', 'color: #28a745; background: #e9f6ec', validatedForm);
        // Generic message to notify error existence
        setFormErrors(['There are errors in the submitted form.']);

        // Update form available for server side errors
        // example: additional email error
        updateForm({...validatedForm, email: {...validatedForm['email'], errors: [...validatedForm['email'].errors, 'Sample custom error from backend. (i.e. duplicate)']}})
      }).finally(() => {
        setIsLoading(false);
      })
    })
  }

  const selectRow = (data) => (
    <React.Fragment><span className="tag" style={{backgroundColor: data.color}}></span>{data.name}</React.Fragment>
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
                {
                  (form.email.isLoading || form.isLoading) &&
                  <LoadingIcon className="with-append"></LoadingIcon>
                }
                <input onChange={e => handleChange('email', e.target.value)}
                       className={`form-input ${form.email.errors?.length > 0 ? 'form-error' : ''}`}
                       onBlur={e => shouldValidateBlur ? validate('email') : ''}
                       type="email" 
                       placeholder="Email">
                </input> 
                <div className="form-input-append">
                  <FontAwesomeIcon fixedWidth icon={faCoffee} />
                </div>
              </div>
              { (form.email.isLoading || form.isLoading) &&
                <span className="loading-message">Checking custom validation<span>.</span><span>.</span><span>.</span></span>
              }

              { (!form.email.isLoading && !form.isLoading) &&
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
                       onBlur={e => shouldValidateBlur ? validate('password') : ''}
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
                      //isLoading={asyncOptions.length <= 0 ? true : false}
                      //options={asyncOptions}
                      //attr="name"
                      options={industryArray}
                      isMultiSelect
                      isClearable
                      onBlur={e => shouldValidateBlur ? validate('industry') : ''}
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
                      selectRow={selectRow}
                      //isMultiSelect
                      onBlur={e => shouldValidateBlur ? validate('role') : ''}
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
                      isGrouped
                      isMultiSelect
                      isClearable
                      value={form.locations.value}
                      //selectRow={selectRow}
                      //groupedRow={groupedRow}
                      className={form.locations.errors?.length > 0 ? 'form-error' : ''}
                      label="Select..."
                      onBlur={e => shouldValidateBlur ? validate('locations') : ''}
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
                          onBlur={e => shouldValidateBlur ? validate('startDate') : ''}
                          value={form.startDate.value}
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
                        value={form.flexible.value}
                        onBlur={e => shouldValidateBlur ? validate('flexible') : ''}
                        handleToggle={e => handleChange('flexible', e)}>
                </Toggle>
                <label className="toggle-label" htmlFor="flexibleDate">Flexible date</label>
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
              <div className="row">
                <label className="form-label">Years of Experience<span className="required">*</span></label>
              </div>
              <div className="row">
                {
                  yearsOptions.map((option, index) => (
                    <React.Fragment key={index}>
                      <div className="col">
                        <div className="row flex-center">
                          <Toggle type="radio"
                                  toggleFor={`option${option.label}`}
                                  toggleGroupValue={form.yearsExp.value}
                                  className={form.yearsExp.errors?.length > 0 ? 'form-error' : ''}
                                  value={option.value}
                                  onBlur={e => shouldValidateBlur ? validate('yearsExp') : ''}
                                  handleToggle={e => handleChange('yearsExp', e)}>
                          </Toggle>
                          <label htmlFor={`option${option.label}`} className="toggle-label">{option.label}</label>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                }
              </div>
              <div className="row">
                { 
                  form.yearsExp.errors &&
                  form.yearsExp.errors.map((err, index) => (
                    <span key={index} className="error-message">{err}</span>
                  ))
                }
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred method(s) of communication<span className="required">*</span></label>
              
              <div className="row">
                <div className="col">
                  {
                    commOptions.map((option, index) => (
                      <div className="toggle-group" key={index}>
                        <div className="row flex-center">
                          <Toggle type="checkbox"
                                  toggleFor={`option${option.label}`}
                                  className={form.commMethods.errors?.length > 0 ? 'form-error' : ''}
                                  value={option.value}
                                  toggleGroupValue={form.commMethods.value}
                                  onBlur={e => shouldValidateBlur ? validate('commMethods') : ''}
                                  handleToggle={e => handleChange('commMethods', e)}>
                          </Toggle>
                          <label htmlFor={`option${option.label}`} className="toggle-label">{option.label}</label>
                        </div> 
                      </div>
                    ))
                  }
                </div>

              </div>
              <div className="row">
                { 
                  form.commMethods.errors &&
                  form.commMethods.errors.map((err, index) => (
                    <span key={index} className="error-message">{err}</span>
                  ))
                }
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Terms</label>

              <div className="row flex-center">
                <Toggle type="checkbox"
                        toggleFor="agreeTerms"
                        className={form.terms.errors?.length > 0 ? 'form-error' : ''}
                        value={form.terms.value}
                        onBlur={e => shouldValidateBlur ? validate('terms') : ''}
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
            <button onClick={handleSubmit} 
                    type="button" 
                    className="btn is-primary">
                      {
                        !isLoading && "Submit"
                      }
                      {
                        isLoading &&
                        <LoadingIcon></LoadingIcon>
                      }
            </button>
          </div>
        </div>
        <div className="row">
                { 
                  formErrors &&
                  formErrors.map((err, index) => (
                    <span key={index} className="error-message">{err}</span>
                  ))
                }
              </div>
      </form>
    </div>
  );
}
