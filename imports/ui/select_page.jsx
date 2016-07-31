import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';



import { AppEnvironments } from '../api/environment_collection.js'
import { ActivePorts } from '../api/port_listing.js'

import EnvironmentSelector from './environment_selector.jsx'
import AccountsWrapper from './accounts_wrapper.jsx';

import AddEnvModal from './add_env_modal.jsx'

import EnvironmentHandler from '../api/environment_handler.js'

export default class SelectPage extends Component {

	constructor(props) {
		super(props)
		this._env_builder = new EnvironmentHandler()
		this.state = {
			add_env_open: false,
		}

	}

	renderEnvironmentChoices() {

		return this.props.availibleEnvironments.map((env,i) => (
			
			<EnvironmentSelector 
				img={env.icon} 
				key={env._id}  
				currentUser={this.props.currentUser} 
				style={this.env_selector_style(i)}
				launch={this.initialize_environment.bind(this,env.query_object)}
			/>

		));

	}

	trigger_add_env_modal() {
		this.setState({add_env_open: !this.state.add_env_open })
	}

	initialize_environment(bindings) {

   		if (! this.props.currentUser() ) {
      		throw new Meteor.Error('not-authorized');
    	}

		var env = this._env_builder.build(bindings);

		env.launch(this.props.currentUser)

	}

	renderAddEnvModal() {
		if(this.state.add_env_open) return <AddEnvModal currentUser={this.props.currentUser} closeMe={this.trigger_add_env_modal.bind(this)}/>
		return
	}

	render(props) {
		return (
			<div className="portal_page" style={this.style()}>
				<div className="portal_items" style={this.portal_grid_style()}>
					<button style={this.open_modal_button_style()} onClick={this.trigger_add_env_modal.bind(this)} >{"Add Env"}</button>
					{ this.renderAddEnvModal() } 
					{ this.renderEnvironmentChoices() }
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

	open_modal_button_style() {
		var style = {
		
			//height: "25px",
			width: "50px",
			position: "absolute",
			left: "90%",
			padding: "0 0 0 0",
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
			display: "flex",
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
		currentUser: Meteor.user
	};

}, SelectPage);