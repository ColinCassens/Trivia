import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import Loader from 'react-loader-spinner';

class Quiz extends Component {
  constructor(props) {
    super()
    this.state = {
      points: 0,
      id: 0,
      in_progress: true
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
    this.setState({
      id: this.state.id + 1,
      selectedOption: ''
    })

    // Check to see if correct answer is submitted
    if(this.state.selectedOption === this.questions[this.state.id].correct_answer){
      this.setState({
        points: this.state.points + 10
      })
    } if(this.state.id + 1 === this.questions.length){
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

//Class for getting the Questions from the API and calling Quiz
class Questions extends Component{
  constructor(){
    super()
    this.state = {
      questions: [],
      loading: true
    }
  }

  /* Wait for the API call to mount
      Once mounted save questions
      and change loading to false
  */
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

  //Randomize Answer Order for Quiz
  randomize_order(question){
    const { incorrect_answers, correct_answer } = question
    incorrect_answers.push(correct_answer)
    var shuffled = incorrect_answers
      .map((x) => ({sort: Math.random(), value: x}))
      .sort((a,b) => a.sort - b.sort)
      .map((x) => x.value)
    return shuffled
  }

  //Get Questions from API using Promise
  async getQuestions(){
    return new Promise((resolve, reject) =>{
      var questions
      let request = new XMLHttpRequest()
      request.open("GET", "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
      request.send()
      request.onload = () =>{
        if(request.status === 200) {
          questions = JSON.parse(request.response)
          resolve(questions)
        } else {
          questions = 'ERR IN API CALL'
          reject(questions)
        }
      }
    })
  }

  render() {
    const {questions, loading} = this.state
    return(
      <div>
        {loading ? LoadSpinner() : <Quiz questions = {questions}/>}
      </div>  
    )
  }
}

// Loading Spinner settings
function LoadSpinner (){
  return (
    <Loader
      type='TailSpin'
      color='#61dafb'
      height='100'
      width='100'
    />
  )
}

class Home extends Component{
  constructor (){
    super()
    this.state = {
      submited: false,
      category: 'computers',
      count: '5',
      difficulty: 'Easy'
    }
    this.formSubmit = this.formSubmit.bind(this)
  }

  formSubmit(){ 
    this.setState({
      submited: true
    })
  }

  init_screen (){
    return(
      <div className='App'>
        <header className='App-header'>
          <div>
            <h1>Trivia!</h1>
          </div>
          <form onSubmit={this.formSubmit}>
            <div className='home_container'>
              <div className='option_boxes'>
                <div>
                  <label>Category</label>
                  <br></br>
                  <select name='category' id='category' onClick={this.onValueChange}>
                    <option value='computers'>Computers</option>
                    <option value='sports'>Sports</option>
                    <option value='film'>Film</option>
                    <option value='music '>Music</option>
                  </select>
                </div>
                <div>
                  <label># Questions</label>
                  <br></br>
                  <select name='count' id='count' onClick={this.onValueChange}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                  </select>
                </div>
              </div>
              <div className='option_boxes'>
                <label>Difficulty</label>
                <br></br>
                <select name='diff' id='diff' onClick={this.onValueChange}>
                  <option value='Easy'>Easy</option>
                  <option value='Medium'>Medium</option>
                  <option value='Hard'>Hard</option>
                </select>
              </div>
              <br></br>
            </div>
            <div>
              <button className='btn btn-default' type='submit'>
                Begin
              </button>
            </div>
          </form>
        </header>
      </div>
    )
  }

  render(){
    const {submited} = this.state
    return(
      <div>
        {submited ? <Questions /> : this.init_screen()}
      </div>
    )
  }
}

class App extends Component{
  render(){
    const H = new Home()
    return(
      <div className="App">
        <header className="App-header">
          {/* {H.render()} */}
          <Home />
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