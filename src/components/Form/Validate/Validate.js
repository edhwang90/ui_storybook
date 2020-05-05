import { useState } from 'react';

const checkMinlength = (value, ruleValue) => {
  const valueLength = value.length
  return valueLength < ruleValue;
}

const checkMaxlength = (value, ruleValue) => {
  const valueLength = value.length
  return valueLength > ruleValue;
}

// contains rule accepts: 
// string seperated by a comma(,). Example: '@, #, %'
// passes if atleast 1 is included
const checkContains = (value, ruleValue) => {
  const specialChars = ruleValue.split(',').map(s => s.trim());

  for (const char of specialChars) {
    if (value.includes(char)) return true;
  }

  return false;
}

const checkType = (value, ruleValue) => {
  let errorObj = { error: false, message: ''};
  switch (ruleValue) {
    case 'email':
      const w3cEmailRegex = RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$', 'g');
      if (!w3cEmailRegex.test(value)) {
        errorObj.error = true;
        errorObj.message = 'Please enter a valid email address.';
      }
      break;
    case 'url':
      const urlRegex = RegExp('^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$', 'i');
      if (!urlRegex.test(value)) {
        errorObj.error = true;
        errorObj.message = 'Please enter a valid url.';
      }
      break;
    case 'number':
      if (isNaN(value)) {
        errorObj.error = true;
        errorObj.message = 'Please provide a numeric value.';
      }
      break;
    default:
      break;
  }

  return errorObj;
}

export const useValidate = (props) => {
  const { initialForm, onSubmit, validateOnChange } = props;

  const [form, setForm] = useState(initialForm || {});

  const getFieldObj = (field, value) => {
    let changeField = {};
    changeField[field] = { ...form[field], value: value };
    return changeField[field];
  }

  const validateField = (fieldObj) => {
    let validateObj = fieldObj;
    let errorsArr = [];

    for (let i = 0; i<validateObj.rules?.length; i++) {
      const rule = validateObj.rules[i];

      switch (rule.type) {
        case 'required':
          if (!validateObj.value || validateObj.value.length <= 0) {
            errorsArr.push('This field is required.');
          }
          break;
        case 'type': 
          const checkedType = checkType(validateObj.value, rule.value);
          if (checkedType.error) {
            errorsArr.push(checkedType.message);
          }
          break;
        case 'minlength':
          if (checkMinlength(validateObj.value, rule.value)) {
            errorsArr.push(`Please lengthen this text to ${rule.value} characters or more. You are currently using ${validateObj.value.length} character(s).`);
          }
          break;
        case 'maxlength':
          if (checkMaxlength(validateObj.value, rule.value)) {
            errorsArr.push(`Please lengthen this text to ${rule.value} characters or less. You are currently using ${validateObj.value.length} character(s).`);
          }
          break;
        case 'contains':
          if (!checkContains(validateObj.value, rule.value)) {
            errorsArr.push(`Please include atleast 1 instance of the ${rule.value} character(s).`);
          }
          break;
        default:
          break;
      }
    }

    validateObj = { ...validateObj, errors: errorsArr };

    return validateObj;
  }

  const handleChange = (field, value) => {
    const fieldObj = getFieldObj(field, value);
    let newForm;

    if (validateOnChange) {
      const validated = validateField(fieldObj);
      newForm = validated.error ? {...form, [field]: validated, error: true} : {...form, [field]: validated};
    }
    else {
      newForm = {...form, [field]: fieldObj}
    }
    console.log('form', newForm);
    setForm(newForm);
  }

  const validate = (field, value) => {
    const fieldObj = getFieldObj(field, value);
    const validated = validateField(fieldObj);
    const newForm = validated.error ? {...form, [field]: validated, error: true} : {...form, [field]: validated};
    setForm(newForm);
  }

  const handleSubmit = () => {
    let newForm = form;
    for (const field in newForm) {
      const validated = validateField(form[field]);
      newForm = validated.errors?.length > 0 ? {...newForm, [field]: validated, error: true} : {...newForm, [field]: validated};
    }
    setForm(newForm);
    onSubmit(newForm);
  }

  return {
    form,
    handleChange,
    validate,
    handleSubmit
  }
}