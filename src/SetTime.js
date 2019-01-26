import React, { Component } from 'react';
import './SetTime.css';

class SetTime extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	hour: 1,
	    	minute: 0,
	    	second: 0,
	    	totalSeconds: 0
	    };

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange(event) {
	    const target = event.target;
    	const value = target.value;
    	const name = target.name;

    	this.setState({
      		[name]: value
    	});
	}

    handleSubmit(event) {
	    console.log('An time was submitted: ' + this.state.hour + ':'+ this.state.minute + ':' + this.state.second);
	    event.preventDefault();
	}

	// Calculates the total number of seconds the user has inputed
	calculateTotalSeconds(){

	}

	render() {
	    return (
	        <form onSubmit={this.handleSubmit}>
	        	<label>
	          		Hours: 
	          		<input name="hour" type="number" value={this.state.hour} onChange={this.handleChange} />
	        	</label>
	        	<label>
	          		Minutes: 
	          		<input name="minute" type="number" value={this.state.minute} onChange={this.handleChange} />
	        	</label>
	        	<label>
	          		Seconds: 
	          		<input name="second" type="number" value={this.state.second} onChange={this.handleChange} />
	        	</label>
	        	<input type="submit" value="Set Time" />
	        </form>
	    );
	    // TODO: Convert submitted values into totalSeconds 
	    //	   	 pass that totalSeconds up to Countdown.js
  	}
}

export default SetTime;