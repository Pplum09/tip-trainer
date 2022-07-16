import './App.css';
import React, { Component } from 'react';

class App extends Component{

  constructor() {
    super();
    this.state = {
      correct: 0,
      incorrect: 0,
      seconds: 15,
      clockRunning: false,
      tipButtons: [
        <button value='0' key='0' onClick={e => this.isCorrectTip(e.target.value)}>0%</button>,
        <button value='15' key='15' onClick={e => this.isCorrectTip(e.target.value)}>15%</button>,
        <button value='18' key='18' onClick={e => this.isCorrectTip(e.target.value)}>18%</button>,
        <button value='20' key='20' onClick={e => this.isCorrectTip(e.target.value)}>20%</button>,
      ],
    }
  }

  isCorrectTip(e) {

    if (!this.state.clockRunning) {
      this.tick();
      this.setState({
        clockRunning: true,
      });
    }
    if (e === '0') {
      this.setState({
        correct: this.state.correct + 1,
      });
      console.log('yay: ', this.state.correct);
    } else {
      this.setState({
        incorrect: this.state.incorrect + 1,
      });
      console.log('nay: ', this.state.incorrect);
    }

    this.shuffleTipButtons();
  }

  shuffleTipButtons = () =>  {
    this.setState({
      tipButtons: this.state.tipButtons.sort(() => Math.random() - 0.5)
    });
    console.log('shuffled!');
  }

  tick() {
    // start timer after button is clicked
    this.interval = setInterval(() => {
      this.setState({
        seconds: this.state.seconds - 1,
      });

      if (this.state.seconds <= 0) {
        this.reset();
      }

    }, 1000);
  }

  reset() {
    clearInterval(this.interval);
    this.setState({
      clockRunning: false,
      seconds: 15,
      correct: 0,
      incorrect: 0,
    });
    alert('Time\'s up!');
    return;
  }

  render () {
    return (
      <div className="App-header">
        <h2>Tip Trainer</h2>
        <p>They aren't even serving you, just tip 0%.</p>
        <span>{this.state.correct} | {this.state.incorrect} | {this.state.seconds}</span>
        <br></br>
        <div className="App-header">
          {this.state.tipButtons}
        </div>
      </div>
    );
  }
}

export default App;
