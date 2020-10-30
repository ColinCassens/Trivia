import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

//var element = React.createElement('h1', {className: 'greeting'}, 'Welcome to Trivia!')

class Quiz extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "React"
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.Q = props.Q
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
          <h3>
            {this.Q}
          </h3>
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

class Questions extends Component{
  constructor(){
    super()
    this.questions = []
    this.getQuestions = this.getQuestions.bind(this)
    this.questions = this.getQuestions()
  }

  async getQuestions(){
    return new Promise((resolve, reject) =>{
      var questions
      let request = new XMLHttpRequest()
      request.open("GET", "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
      request.send()
      request.onload = () =>{
        console.log(request)
        if(request.status === 200) {
          questions = JSON.parse(request.response)
          console.log(questions)
          resolve(questions)
        } else {
          console.log('Error')
          questions = 'ERR'
          reject(questions)
        }
      }
    })
  }

  render() {
    return this.questions.then(function(qarray){
      return(
        <div>
          {qarray.results.map(q =>{
            const { question, correct_answer, incorrect_answers } = q
            return(
              <Quiz
                Q = {question}
                CA = {correct_answer}
                IAs = {incorrect_answers}
              />
            )
          })}
        </div>
      )
    })
  }
}

let x = new Questions()
console.log(x.questions)

ReactDOM.render(
  <Questions />,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
