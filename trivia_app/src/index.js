import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

//var element = React.createElement('h1', {className: 'greeting'}, 'Welcome to Trivia!')
var questions
let request = new XMLHttpRequest()
request.open("GET", "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
request.send()
request.onload = () =>{
  console.log(request)
  if(request.status === 200) {
    questions = JSON.parse(request.response)
    console.log(questions)
  } else {
    console.log('Error')
  }
}
//var questions = JSON.parse(request.response)
//console.log(questions[1])

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption)
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <div>
          <h1>
            Trivia!
          </h1>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Option1"
              checked={this.state.selectedOption === "Option1"}
              onChange={this.onValueChange}
            />
            Option1
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Option2"
              checked={this.state.selectedOption === "Option2"}
              onChange={this.onValueChange}
            />
            Option2
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Option3"
              checked={this.state.selectedOption === "Option3"}
              onChange={this.onValueChange}
            />
            Option3
          </label>
        </div>
        <div>
          Selected option is : {this.state.selectedOption}
        </div>
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

ReactDOM.render(
  <Quiz />,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
