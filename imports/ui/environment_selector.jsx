import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


export default class EnvironmentSelector extends Component {

	constructor(props) {
		super(props)

		
	}
	

	render(props) {
		return ( 
			<img className="environment_selector" style={this.props.style} src={this.props.img} onClick={this.props.launch} />
		)
	}

}

EnvironmentSelector.propTypes = {
	img: PropTypes.string,
}

