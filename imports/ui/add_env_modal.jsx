import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';


export default class AddEnvModal extends Component {

	render() {
		return (
			<div style={this.inner_div_style()}>
				<img src={'../images/x_button.png'} style={this.x_button_style()} />
				<EnvFields />
				<button style={this.submit_style()} onClick={this.submit_values.bind(this)} />
			</div>
		)
	}


	submit_style() {

		var style = {
			position: "relative",
			display: "block",
			width: "10%",
			height: "40px",
			left: "85%"

		}

		return style

	}

	submit_values() {

	}

	inner_div_style() {
		
		var style = {
			backgroundColor: "#480CE8",
			boxShadow: "-1px 9px 26px -1px rgba(0,0,0,0.75)",
			textAlign: "center", 
			height: "35%",
			width: "80%",
			position: "absolute",
			left: "10%",
			padding: "10% 0 0 0",
			margin: "0",
			top: "20%",
			opacity: "1.0"
		};

		return style;
	}

	x_button_style() {

		var style = {
			height: "15px",
			backgroundColor: "#1e1e1e",
			width: "15px",
			position: "absolute",
			left: "97%",
			margin: "0",
			top: "2%"
		};

		return style;
	}

}



class EnvFields extends Component {

	constructor(props) {

		super(props)

		this.state = {
			name_value: "",
			container_value: "",
			command_value: ""  
		}



	}

	render(props) {

		return (
			<div className="envOptions" style={this.field_container_style()}>
				<div className="envTextOptions" style={this.inner_div_style()}>
					
					<div style={this.input_wrapper_style("1")}>
						<p>{"Environment Name:"}</p>
						<input style={this.input_style()} type="text" value={this.state.name} onChange={this.handle_name_change.bind(this)}  />
					</div>

					
					<div style={this.input_wrapper_style("2")}>
						<p>{"Choose container to run:"}</p>
						<input style={this.input_style()} type="dropdown" value={this.state.containers}  onChange={this.handle_container_change.bind(this)} />
					</div>


					<div style={this.input_wrapper_style("3")}>
						<p>{"Enter for container to run on start:"}</p>
						<input style={this.input_style()} type="text" value={this.state.command} onChange={this.handle_command_change.bind(this)} />
					</div>

				</div>
					
				<div className="envPortOptions" style={this.port_box_wrapper_style("2")}>
					<p>{"Enter ports used in container:"}</p>
					<PortBox style={this.port_box_style()}/>
				</div>

			</div>
		)

	}

	handle_name_change(event) {
		this.setState({
			name_value: event.target.value.substr(0, 140)
		});
  	}

  	handle_container_change(event) {
  		this.setState({
  			container_value: event.target.value
  		});
  	}

  	handle_command_change(event) {
  		this.setState({
  			command_value: event.target.value.substr(0, 140)
  		});
  	}


  	field_container_style() {

  		var style = {
  			position: "relative",
  			width: "90%",
  			height: "90%",
  			marginTop: "-5%",
  			marginLeft: "5%",
  			display: "flex"
  		};

  		return style;

  	}

  	input_wrapper_style(order) {

  		var style = {
  			order: order,
  		}

  		return style

  	}

  	input_style() {
  		
  		var style = {
  			display: "block",
  			width: "50%",
  			marginLeft: "25%",
  			borderRadius: "10px"
  		}

  		return style
  	}

  	port_box_wrapper_style(order) {

  		var style = {
  			order: order,
  			width: "50%",
  			background: "#22A7F0"


  		}

  		return style

  	}

  	inner_div_style() {
  		
  		var style = {
  			
  			position: "relative",
  			width: "50%",
  			paddingBottom: "5%",
  			display: "flex",
  			flexDirection: "column",
  			background: "#1e1e1e",
  			order: "1"

  		}

  		return style

  	}

  	port_box_style() {

  		var style = {

  			position: "relative",
  			width: "100%",
  			height: "80%",


  		}

  		return style

  	}

}

class PortBox extends Component {
	
	constructor(props) {

		super(props)

	    this.state = {
	          current_ports: ["1234","3434","34343","34344","12074","9998"],
	          port_value: "",

	    };


	}

	render(props) {
		
		return (
			<div className={"portBox"} style={this.props.style}>
				<div style={this.port_input_wrapper_style()}>
					<input type="text" value={this.state.port_value} onChange={this.handle_port_change.bind(this)} style={this.input_style()} />
					<button style={this.button_style()} onClick={this.handle_new_port.bind(this)} />
				</div>
				{this.render_ports(this.state.current_ports)}
			</div>
		);

	}

	render_ports(ports) {
		console.log(ports)
		return (
			<div className="portList" style={this.port_list_style()}>
				{ports.map((port,i) => (
					
					<SinglePort key={port} port={port} order={i}/>

				))}
			</div>
		)

	}


	handle_port_change(event) {

		this.setState({
			port_value: event.target.value.substr(0, 5)
		});

	}

	handle_new_port() {
		
		var c_ports = this.state.current_ports
		var port_string = this.state.port_value

		if(port_string.length < 4 || isNaN(parseInt(port_string)) || c_ports.includes(port_string)) return
		
		c_ports.push(this.state.port_value)
		
		this.setState({
			current_ports: c_ports,
			port_value: ""
		});

		
	}

	button_style() {

		var style = {
			position: "relative",
			display: "block",
			height: "20px",
			marginTop: "2%",
			width: "10%",
			marginLeft: "51%"
		};

		return style;

	}
	
	port_input_wrapper_style() {

		var style = {
			position: "relative",
			width: "100%",
	
		

		};

		return style

	}

	input_style() {

		var style = {
			position: "relative",
			width: "20%",
			borderRadius: "10px",
			marginRight: "0%",
			marginLeft: "40%",
			display: "block"
		}

		return style

	}

	port_list_style() {

		var style = {
			boxSizing: "border-box",
			borderTop: "black 1px solid",
			marginTop: "3%",
			position: "relative",
			width: "100%",
			height: "80%",
			display: "flex",
			overflow: "hidden",
			paddingLeft: "2%",
			paddingRight: "2%"


		}

		return style

	}
}

class OptionsBar extends Component {
	
	render(props) {
		<select value="B">
			{this.load_container_list()}
  		</select>
	}

	load_container_list() {

		return (

			<option value="A">Apple</option>
		
		)

	}
}


class SinglePort extends Component {

	render(props) {

		return (
			<div className="singlePort" style={this.port_style(this.props.order)}>
				<p><span>{this.props.port}</span></p>
			</div>
		)

	}

	port_style(order) {

		var style = {
			order: order,
			marginLeft: "1%",
			marginRight: "1%"
		}

		return style

	}

}



export default createContainer(() => {

	bindings = {

	}
	Meteor.call('shipyard_request', bindings, function(err,response) {

		return {
			availibleEnvironments: response
		};

	});


}, OptionsBar);


