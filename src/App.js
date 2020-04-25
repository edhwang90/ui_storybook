import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Select } from './components/Form'

function App() {
  const [testVal, setTestVal] = useState('');
  // const handleClick = (e) => {
  //   console.log(e.target.value);
  // }

//   useEffect(() => {
// console.log('ue', testVal);
//   }, [testVal])
  const options = [
    '1',
    '2',
    '3',
    '523512351235123512351235123512351235'
  ]

  const options2 = [
    { name: 'hello', id: 1 },
    { name: 'goodbye', id: 2 },
    { name: 'aufwiedersehen', id: 3}
  ]

  const submit = (e) => {
    console.log(e);
  }

  return (
    <div className="App">
      <br />
      <br />

      <div className="form-group">
        <label className="form-label">Email</label>
        <Select options={options2}
                attr="name"
                label="Select..."
                onClick={(e) => submit(e)}></Select>
      </div>

    </div>
  );
}

export default App;
