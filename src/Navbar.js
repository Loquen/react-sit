import React, { Component } from 'react';
import './Navbar.css';


class Navbar extends Component {

	render(){
		return(
			<div className="Navbar">
				<ul className="nav">
					<li className="title"><a href="#">Sit!</a></li>
					<li className="item"><a href="#">Time</a></li>
					<li className="item"><a href="#">Track</a></li>
				</ul>
				
			</div>
		);	
	}
}

export default Navbar;