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
      <p>
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      </p>
        </div>
      </div>
  


    </div>
  );
}

export default App;
