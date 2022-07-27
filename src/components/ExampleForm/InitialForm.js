// Default form rules/values
const customValidate = (formField) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Sample custom validation error.');
    }, 2000)
 })
};

export const initialForm = {
  email: { 
    value: '',
    rules: [
      { type: 'required' },
      { type: 'type', value: 'email'}
    ],
    customValidation: customValidate
  },
  password: { 
    value: '',
    rules: [
      { type: 'minlength', value: 8 }, 
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
    value: false,
  },
  yearsExp: {
    value: '',
    rules: [{ type: 'required' }]
  },
  commMethods: {
    value: [],
    rules: [{ type: 'required' }]
  },
  terms: {
    value: false,
    rules: [{ type: 'required' }]
  }
};