import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import EnvironmentHandler from '../api/environment_handler.js'

export default class EnvironmentSelector extends Component {

	constructor(props) {
		super(props)

		this._env_builder = new EnvironmentHandler(this.props.currentUserInfo)
	}
	

	render(props) {
		return ( 
			<img className="environment_selector" style={this.props.style} src={"images/"+this.props.img} onClick={this.initialize_environment.bind(this)} />
		)
	}

	initialize_environment() {
   		if (! this.props.currentUserInfo()) {
      		throw new Meteor.Error('not-authorized');
    	}
		var env_bindings = this.props.envBindings;
		var env = this._env_builder.build(env_bindings);

		console.log(env)

	}

}

EnvironmentSelector.propTypes = {
	img: PropTypes.string,
	envBindings: PropTypes.object
}

export default createContainer(() => {
  return {
    currentUserInfo: Meteor.user,
  };
}, EnvironmentSelector);