import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';

class Quiz extends Component {
  constructor(props) {
    super()
    this.state = {
      points: 0,
      id: 0,
      in_progress: true,
    }
    this.onValueChange = this.onValueChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
    this.questions = props.questions
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    })
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption)
    // Check to see if correct answer is submitted
    if(this.state.selectedOption === this.questions[this.state.id].correct_answer){
      this.setState({
        id: this.state.id + 1,
        points: this.state.points + 10
      })
    }else{
      this.setState({
        id: this.state.id + 1
      })
    }
    if(this.state.id + 1 === this.questions.length){
      this.setState({
        in_progress: false
      })
    }
  }

  render() {
    var {in_progress} = this.state
    return (
      <div>
        {in_progress ? (<form onSubmit={this.formSubmit}>
            <div>
              <h1>
                Trivia!
              </h1>
              <h2>
                Current Score: {this.state.points}
              </h2>
              <h2>
                Question Number #{this.state.id + 1}
              </h2>
              <h3>
                {this.questions[this.state.id].question}
              </h3>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value={this.questions[this.state.id].rand[0]}
                  checked={this.state.selectedOption === this.questions[this.state.id].rand[0]}
                  onChange={this.onValueChange}
                />
                {this.questions[this.state.id].rand[0]}
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value={this.questions[this.state.id].rand[1]}
                  checked={this.state.selectedOption === this.questions[this.state.id].rand[1]}
                  onChange={this.onValueChange}
                />
                {this.questions[this.state.id].rand[1]}
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value={this.questions[this.state.id].rand[2]}
                  checked={this.state.selectedOption === this.questions[this.state.id].rand[2]}
                  onChange={this.onValueChange}
                />
                {this.questions[this.state.id].rand[2]}
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value={this.questions[this.state.id].rand[3]}
                  checked={this.state.selectedOption === this.questions[this.state.id].rand[3]}
                  onChange={this.onValueChange}
                />
                {this.questions[this.state.id].rand[3]}
              </label>
            </div>
            <div>
              Selected Answer is : {this.state.selectedOption}
            </div>
            <button className="btn btn-default" type="submit">
              Submit
            </button>
          </form> ): <h1> Quiz Complete! You Finished With {this.state.points} Points</h1>
        }
      </div>
    );
  }
}

class Questions extends Component{
  constructor(){
    super()
    this.state = {
      questions: [],
      loading: true
    }
  }

  componentDidMount(){
    this.getQuestions().then(qs => {
      console.log(qs.results)
      var holder = qs.results
      holder.map((x) => {
        x['rand'] = this.randomize_order(x)
      })
      this.setState({
        questions: holder,
        loading: false
      })
    })
  }

  randomize_order(question){
    const { incorrect_answers, correct_answer } = question
    incorrect_answers.push(correct_answer)
    var shuffled = incorrect_answers
      .map((x) => ({sort: Math.random(), value: x}))
      .sort((a,b) => a.sort - b.sort)
      .map((x) => x.value)
    return shuffled
  }

  async getQuestions(){
    return new Promise((resolve, reject) =>{
      var questions
      let request = new XMLHttpRequest()
      request.open("GET", "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
      request.send()
      request.onload = () =>{
        // console.log(request)
        if(request.status === 200) {
          questions = JSON.parse(request.response)
          // console.log(questions)
          resolve(questions)
        } else {
          // console.log('Error')
          questions = 'ERR'
          reject(questions)
        }
      }
    })
  }

  render() {
    const {questions, loading} = this.state
    return(
      <div>
        {loading ? <h2>Loading...</h2> : <Quiz questions = {questions}/>}
      </div>  
    )
  }
}

class App extends Component{
  render(){
    return(
      <div className="App">
        <header className="App-header">
          <Questions />
        </header>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default Questions