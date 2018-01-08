import React from 'react';
import logo from './logo.svg';
import './header.less';

export default class App extends React.Component {

	render() {
		
	 
		return (
			<header>
				<div className="logo">
					<div className="container">
						<img src={logo} />
					</div>					
				</div>
			</header>

		);
	}
}