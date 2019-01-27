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
	    this.calculateTotalSeconds = this.calculateTotalSeconds.bind(this);
	}

	// Calculates the total number of seconds the user has inputed
	calculateTotalSeconds() {
		// define total as the seconds plus the minutes*60 plus the hours*3600
		let total = Number(this.state.second) + Number(this.state.minute * 60) + Number(this.state.hour * 3600);

		this.setState({ totalSeconds: total }, () => {
			console.log(this.state.totalSeconds);
		});

	}

	handleChange(event) {
	    const target = event.target;
    	const value = target.value;
    	const name = target.name;

    	if(value >= 0) {
	    	this.setState({
	      		[name]: value
	    	});
		} else {
			alert("Value cannot be negative");
		}
	}

    handleSubmit(event) {
	    console.log('A time was submitted: ' + this.state.hour + ':'+ this.state.minute + ':' + this.state.second);
	    this.calculateTotalSeconds();

	    this.props.setTimeInParent(this.state.totalSeconds);
	    event.preventDefault();
	}


	render() {
	    return (
	        <form className="setForm" onSubmit={this.handleSubmit}>
	        	<label className="time">
	          		Hours: 
	          		<input name="hour" type="number" value={this.state.hour} onChange={this.handleChange} />
	        	</label>
	        	<label className="time">
	          		Minutes: 
	          		<input name="minute" type="number" value={this.state.minute} onChange={this.handleChange} />
	        	</label>
	        	<label className="time">
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