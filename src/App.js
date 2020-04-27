import React, {useState, useEffect} from 'react';
import { Select, FormField } from './components/Form'

import './App.scss';

function App() {
  const [testVal, setTestVal] = useState('');
  const [testVal2, setTestVal2] = useState('');
  const [testVal3, setTestVal3] = useState('');
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
    '523512351235123512351235123512351235',
    '235',
    '512',
    '3462',
    '51',
    '8457',
    '93859',
    '12',
    '235',
    '73',
    '08',
    '09',
    '984'
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
    <div className="sandbox">
      <br />
      <br />

      <div className="row">
        <div className="col">
          <div className="form-group">
            <label className="form-label">Username</label>
            <FormField validateOnChange onChange={e => setTestVal2(e)}>
              <input minlength="3" className="form-input" type="text" placeholder="Username"></input>
            </FormField>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <Select options={options}
                    //attr="name"
                    //required
                    //isMultiSelect
                    //value={ [{name: 'hello', id: 5}, {name: 'goodbye', id: 9}]}
                    //value={{name: 'hello', id: 5}}

                    label="Select..."
                    onClick={(e) => submit(e)}></Select>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
                <label className="form-label">Email</label>
                <Select options={options}
                        //attr="name"
                        //required
                        isMultiSelect
                        //value={ [{name: 'hello', id: 5}, {name: 'goodbye', id: 9}]}
                        //value={{name: 'hello', id: 5}}

                        label="Select..."
                        onClick={(e) => submit(e)}></Select>
              </div> 

              <div className="form-group">
            <label className="form-label">Username</label>
            <FormField validateOnChange onChange={e => setTestVal2(e)}>
              <input minlength="3" className="form-input" type="text" placeholder="Username"></input>
            </FormField>
          </div>
        </div>
        
      </div>
      <div className="row">
      <div className="col">   

        </div>
      </div>
  


    </div>
  );
}

export default App;
