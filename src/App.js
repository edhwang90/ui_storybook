import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from './components/Button'

function App() {
  const handleClick = () => {
console.log('click');
  }
  return (
    <div className="App">
      <Button onClick={handleClick}>test</Button>
      <Button disabled onClick={handleClick}>test</Button>
      <Button className="is-alternate" onClick={handleClick}>test</Button>
      <Button className="is-danger" onClick={handleClick}>test</Button>
      <Button className="is-warning" onClick={handleClick}>test</Button>
      <Button className="is-success" onClick={handleClick}>test</Button>
    </div>
  );
}

export default App;
