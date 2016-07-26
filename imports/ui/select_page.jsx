import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';



import { AppEnvironments } from '../api/environment_collection.js'
import { ActivePorts } from '../api/port_listing.js'

import EnvironmentSelector from './environment_selector.jsx'
import AccountsWrapper from './accounts_wrapper.jsx';

export default class SelectPage extends Component {



	renderEnvironmentChoices() {

		return this.props.availibleEnvironments.map((env,i) => (
			
			<EnvironmentSelector img={env.src} key={env.env_string} envBindings={env.env_bindings} style={this.env_selector_style(i)}/>

		));

	}

	render(props) {
		return (
			<div className="portal_page" style={this.style()}>
				<div className="portal_items" style={this.portal_grid_style()}>
					{this.renderEnvironmentChoices()}
				</div>
				<div style={this.logout_style()}>
					<AccountsWrapper />
				</div>
			</div>
		)
	}

	style() {

		var style = {
			backgroundColor: "#480CE8",
			boxShadow: "-1px 9px 26px -1px rgba(0,0,0,0.75)",
			textAlign: "center", 
			height: "80%",
			width: "80%",
			position: "relative",
			left: "10%",
			padding: "10% 0 0 0",
			margin: "0",
			top: "5%"
		};

		return style;
	}


	logout_style() {
		var style = {
	
			height: "15%",
			width: "60%",
			position: "absolute",
			left: "20%",
			padding: "10% 0 0 0",
			margin: "0",
			top: "75%"
		};

		return style;
	}

	portal_grid_style() {

		var style = {
			
			height: "60%",
			width: "90%",
			position: "absolute",
			left: "5%",
			display: "flex-box",
			margin: "0",
			top: "5%"
		};

		return style;
	}

	env_selector_style(place) {
		
		var style = {
			backgroundColor: "#1e1e1e",
			height: "64px",
			width: "64px",
			position: "relative",
			order: place.toString(),
			display: "block",
			padding: "0 0 0 0",
			margin: "0",
			cursor: "pointer"
		};

		return style
	}

}



export default createContainer(() => {

	Meteor.subscribe('app_environments')
	Meteor.subscribe('active_ports')
	return {
		availibleEnvironments: AppEnvironments.find().fetch(),
	};

}, SelectPage);