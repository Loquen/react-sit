import React, { Component } from 'react';
import './Timer.css';

import Countdown from './Countdown';

class Timer extends Component{
	render(){
		return(
			<div className="DisplayBox">
				<div className="Timer">
					<Countdown/>
				</div>
			</div>
		);
	}
}

export default Timer;