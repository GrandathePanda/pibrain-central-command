import React, { Component } from 'react';
import AccountsWrapper from './accounts_wrapper.jsx';

export default class LoginModal extends Component {

	render() {
		return (
			<div style={this.inner_div_style()}>
				<img style={this.logo_style()} id={"logo_img"} src={"images/Flat-Panda.png"} alt={"piBrain Logo"} /> 
				<div style={this.login_style()}>
					<AccountsWrapper />
				</div>
			</div>
		)
	}

	inner_div_style() {
		
		var style = {
			backgroundColor: "#480CE8",
			boxShadow: "-1px 9px 26px -1px rgba(0,0,0,0.75)",
			textAlign: "center", 
			height: "35%",
			width: "35%",
			position: "absolute",
			left: "32.3%",
			padding: "10% 0 0 0",
			margin: "0",
			top: "20%"
		};

		return style;
	}

	logo_style() {

		var style = {
			height: "40%",
			width: "60%",
			position: "absolute",
			left: "20%",
			padding: "10% 0 0 0",
			margin: "0",
			top: "5%"
		};

		return style;
	}

	login_style() {

		var style = {
			height: "40%",
			width: "50%",
			position: "absolute",
			left: "25%",
			padding: "10% 0 0 0",
			margin: "0",
			top: "60%"
		};

		return style;
	}
}