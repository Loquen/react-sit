import React, { Component } from 'react';
import './Countdown.css';

import SetTime from './SetTime';

class Countdown extends Component {

  constructor() {
    super();
    // Set intial timer to 1500s or 25min
    /*this.initialState = { 
      time: {}, 
      seconds: 1500,
		  isRunning: false,
    };  */
    this.state = { 
      time: {}, 
      seconds: 1500,
      isRunning: false,
      userSeconds: 1500
    }; 

    this.timer = 0;
  }

  // Converts the Time from seconds to H, M, S for display
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60)); // Seconds divided by 3600

    let divisor_for_minutes = secs % (60 * 60); // Get the remainder of mins after hours
    let minutes = Math.floor(divisor_for_minutes / 60); // Remaining seconds divided by 60

    let divisor_for_seconds = divisor_for_minutes % 60; // Get the remainder of secs after minutes
    let seconds = Math.ceil(divisor_for_seconds); // Remaining seconds 

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj; 
  }


  // Initial setup of State, Passing in the converted seconds 
  // in the correct format to our state variable: time
  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  
  // Begin countdown timer if there are seconds on the clock
  startTimer = () => {
    if (this.state.seconds > 0) {
      this.setState({ isRunning: true });
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  // Stop the Timer at the current time 
  stopTimer = () => {
  	this.setState({ isRunning: false });
  	clearInterval(this.timer);
  }

  // Handle action of start/stop button depending on state 'isRunning'
  handleTimer = () => {
  	if(this.state.isRunning) {
      console.log("Stopping timer");
  		this.stopTimer();
  	} else {
      console.log("Starting timer");
  		this.startTimer();
  	}
  }


  // Reset the timer to beginning
  resetTimer = () => {
  	// Stop the timer before trying to reset
  	if(this.state.isRunning){
  		this.stopTimer();
  	}

  	this.setState({seconds: this.state.userSeconds}, () => {
      console.log("Resetting timer");
      this.componentDidMount();
    });

  	
  }

  // Perform countdown action
  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      
      // Play Sound!
      this.playSound();
      clearInterval(this.timer);      
    }
  }

  // Play a sound 
  playSound() {
    console.log("playing sound");
    document.getElementById('bell').play(); // Grab audio element and play it
  }

  setTimeCallback = (userSeconds) => {
    // Now we have the userSeconds that need to be converted and updated in the timer
    this.setState({ 
      userSeconds: userSeconds,
      seconds: userSeconds
      }, () => {
        console.log(this.state.seconds);

        // Stop the timer if it's running 
        if(this.state.isRunning){
          this.stopTimer();
        }

        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        
    });
  }

  render() {
    return(
      <div>
        <div className="Countdown">
          <span className="timeValue">H: {this.state.time.h}</span>
          <span className="timeValue">M: {this.state.time.m}</span>
          <span className="timeValue"> S: {this.state.time.s} </span>
        </div>
        <div className="Button">
        	<button onClick={this.handleTimer}>{this.state.isRunning ? 'Stop' : 'Start'}</button>
        	<button onClick={this.resetTimer}>Reset</button>
        </div>
        <div>
          <audio id="bell" ref="audio_tag" src="https://upload.wikimedia.org/wikipedia/commons/1/15/Bicycle-bell.wav"/>
        </div>
        <div className="SetTime">
          <SetTime setTimeInParent={ this.setTimeCallback }/>
        </div>
      </div>
    );
  }
}

export default Countdown;