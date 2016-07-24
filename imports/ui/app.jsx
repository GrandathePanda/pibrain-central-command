import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsWrapper from './accounts_wrapper.jsx';
import LoginModal from './login_modal.jsx'
import SelectPage from './select_page.jsx'


export default class App extends Component {

	constructor(props) {
		super(props);

	}

	render() {
		if(this.props.currentUser) {
	
			return (
				<div className="wrapper_box" style = {this.wrapper_style()}>	
					<SelectPage />
				</div>
			)
					
		}
		else {
			return (
				<div className="wrapper_box" style = {this.wrapper_style()}>	
					<LoginModal />
				</div>
			)
		}
				

	}


	wrapper_style() {
		
		var style = {
			backgroundColor: "#1e1e1e",
			textAlign: "center", 
			height: "100%",
			width: "100%",
			position: "absolute",
			padding: "0",
			overflowY: "hidden",
			margin: "0",
			left: "0",
			top: "0"
		};

		return style;
	}


}

App.propTypes = {
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, App);