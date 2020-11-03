import logo from './logo.svg';
import './App.css';
import Questions from './index.js';
import { Component } from 'react';

class App extends Component{
  render(){
    return (
      <div className="App">
         <header className="App-header">
          <Questions />
         </header>
       </div>
    );
  }
}

export default App;
