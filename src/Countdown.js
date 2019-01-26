import React, { Component } from 'react';
import './Countdown.css';

class Countdown extends Component {

  constructor() {
    super();
    // Set intial timer to 1500s or 25min, break of 5min
    // and final break of 15min, with one cycle lasting 4 pomodoros
    this.initialState = { time: {}, 
		    			  seconds: 1500,
		    			  fullpomo: 1500,
		    			  br: 300,
		    			  finalBreak: 900, 
		    			  pomodoro: 1,
		    			  isRunning: false
    			 		};  
    this.state = { ...this.initialState }; // to preserve the initial state
    this.timer = 0;
    this.handleTimer = this.handleTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.countDown = this.countDown.bind(this);
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
  startTimer() {
    if (this.state.seconds > 0) {
      this.setState({ isRunning: true });
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  // Stop the Timer at the current time 
  stopTimer() {
  	this.setState({ isRunning: false });
  	clearInterval(this.timer);
  }

  // Handle action of start/stop button depending on state 'isRunning'
  handleTimer() {
  	if(this.state.isRunning) {
      console.log("Stopping timer");
  		this.stopTimer();
  	} else {
      console.log("Starting timer");
  		this.startTimer();
  	}
  }


  // Reset the whole pomodoro to beginning
  resetTimer() {
  	// Stop the timer before trying to reset
  	if(this.state.isRunning){
  		this.stopTimer();
  	}

  	this.setState( this.initialState, () => {
      console.log("Resetting timer");
      this.componentDidMount();
    });

  	
  }

  // Perform countdown action
  countDown() {
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
      // Increment the pomodoro count to track which phase we are in.
  	  this.setState({ pomodoro: this.state.pomodoro + 1 });
      
      this.pomodoroPhase();
    }
  }

  // Play a sound 
  playSound() {
    console.log("playing sound");
    document.getElementById('bell').play(); // Grab audio element and play it
  }


  // Moving timer through all 8 segments of the Pomodoro cycle
  pomodoroPhase() {
  	// if the pomo is even then we are on break
  	if (this.state.pomodoro % 2 === 0 && this.state.pomodoro <= 8) {
  		if(this.state.pomodoro === 8){
  			// run the final break of 15min
  			console.log("final break");
  			this.setState({
  				time: this.secondsToTime(this.state.finalBreak),
  			  seconds: this.state.finalBreak
  			});
  			this.startTimer();
  		} else {
  			// run the break of 5min
  			console.log("break");
  			console.log(this.state.pomodoro);
  			this.setState({
  				time: this.secondsToTime(this.state.br),
  				seconds: this.state.br
  			});
  			this.startTimer();
  	  }
  	} else if (this.state.pomodoro % 2 !== 0) { // odd pomo and we are on a pomo
  		if(this.state.pomodoro > 8){
  			// final pomo has finished
  			console.log("Full pomo cycle has completed");
  			this.resetTimer();
  		} else {
  			// reset pomo to 25 min
  			console.log("next pomo");
  			console.log(this.state.pomodoro);
  			this.setState({
  				time: this.secondsToTime(this.state.fullpomo),
  				seconds: this.state.fullpomo
  			});
  			this.startTimer();
  		}
  	}
  }

  render() {
    return(
      <div>
        
        <div className="Countdown">M: {this.state.time.m} S: {this.state.time.s} </div>
        <div className="Button">
        	<button onClick={this.handleTimer}>{this.state.isRunning ? 'Stop' : 'Start'}</button>
        	&nbsp;
        	&nbsp;
        	<button onClick={this.resetTimer}>Reset</button>
        </div>
        <div>
          <audio id="bell" ref="audio_tag" src="https://upload.wikimedia.org/wikipedia/commons/1/15/Bicycle-bell.wav"/>
        </div>
      </div>
    );
  }
}

export default Countdown;