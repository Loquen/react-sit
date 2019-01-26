import React, { Component } from 'react';
import './SetTime.css';

class SetTime extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	hour: 1,
	    	minute: 0,
	    	second: 0
	    };

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
	    this.setState({hour: event.target.hour});
	}

    handleSubmit(event) {
	    console.log('An hour was submitted: ' + this.state.hour);
	    event.preventDefault();
	}

	render() {
	    return (
	        <form onSubmit={this.handleSubmit}>
	        	<label>
	          		Hour: 
	          		<input type="number" value={this.state.hour} onChange={this.handleChange} />
	        	</label>
	        	<input type="submit" value="Set Time" />
	        </form>
	    );
  	}
}
/*
  render() {
    return(
      <div>
        <form>
  			Enter the number of hours, minutes and seconds:
  			<input type="number" name="hour" min="0" max="10" value="1"/>
  			
  			<input type="submit"/>
		</form>

		 <form>
  			Enter the number of hours, minutes and seconds:
			<input type="number" name="minute" min="0" max ="60" value="0"/>
  			<input type="submit"/>
		</form>

  			<input type="number" name="second" min="0" max ="60" value="0"/>
      </div>
    );
  }
}*/

export default SetTime;