import React, { Component } from 'react';
import './Navbar.css';


class Navbar extends Component {

	render(){
		return(
			<div className="Navbar">
				<ul className="nav">
					<li className="title">Sit!</li>
					<li className="item">Time</li>
					<li className="item">Set</li>
					<li className="item">Track</li>
				</ul>
				
			</div>
		);	
	}
}

export default Navbar;