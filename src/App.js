import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Input, FormField } from './components/Form'

function App() {
  const [testVal, setTestVal] = useState('');
  // const handleClick = (e) => {
  //   console.log(e.target.value);
  // }

//   useEffect(() => {
// console.log('ue', testVal);
//   }, [testVal])

  const submit = (e) => {
    console.log(testVal);
  }

  return (
    <div className="App">
      {/* <FormField label="Email" type="email" name="forEmail">

      </FormField> */}
      <br />
      <br />

      <div className="form-group">
        <label className="form-label">Email</label>
        <FormField validateOnChange onChange={(e) => setTestVal(e.target.value)}>
          <input className="form-input" type="email" placeholder="Email"></input>
        </FormField>
      </div>

      <div className="form-group">
        <label className="form-label">Bio</label>
        <FormField validateOnChange onChange={(e) => setTestVal(e.target.value)}>
          <textarea minlength="15" className="form-input" placeholder="Bio..."></textarea>
        </FormField>
      </div>

    </div>
  );
}

export default App;
