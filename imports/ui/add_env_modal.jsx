import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { AppEnvironments } from '../api/environment_collection.js'

import EnvironmentHandler from '../api/environment_handler.js'

import Dropzone from 'react-dropzone'



export default class AddEnvModal extends Component {

	constructor(props) {
		super(props) 
		this.state = {
			env_command : "",
			env_ports : [],
			env_name : "",
			env_image : "",
			env_icon: null
		}

	}

	render() {
		return (
			<div style={this.inner_div_style()}>
				<EnvFields resolveState={this.resolve_state.bind(this)}/>
				<button style={this.submit_style()} onClick={this.sub_vals.bind(this)}> {"Add"} </button>
			</div>
		)
	}


	resolve_state(env_hash) {

		this.setState( {
			env_command: env_hash.command || this.state.env_command,
			env_ports: env_hash.ports || this.state.env_ports,
			env_name: env_hash.name || this.state.env_name,
			env_image: env_hash.image || this.state.env_image,
			env_icon: env_hash.icon || this.state.env_icon
		} )

	}

	sub_vals() {

		if (! this.props.currentUser() ) {
  	 		throw new Meteor.Error('not-authorized');
	 	}
		EnvironmentHandler.create_new_environment(this.state)
		//this.props.closeMe();
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

	inner_div_style() {
		
		var style = {
			backgroundColor: "#480CE8",
			boxShadow: "-1px 9px 26px -1px rgba(0,0,0,0.75)",
			textAlign: "center", 
			height: "80%",
			width: "90%",
			position: "absolute",
			left: "5%",
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

export default createContainer(() => {

	Meteor.subscribe('app_environments')
	return {

		appEnvironments: AppEnvironments,
	};
}, AddEnvModal);



class EnvFields extends Component {

	constructor(props) {

		super(props)

		this.state = {
			name_value: "",
			command_value: "",
			image_preview: null
		}



	}

	render(props) {

		return (
			<div className="envOptions" style={this.field_container_style()}>
				<div className="envTextOptions" style={this.inner_div_style()}>
					
					<div style={this.input_wrapper_style("1")}>
						<p>{"Environment Name:"}</p>
						<input style={this.input_style()} type="text" value={this.state.name} onChange={this.handle_name_resolution.bind(this)}  />
					</div>

					
					<div style={this.input_wrapper_style("2")}>
						<p>{"Choose image to run:"}</p>
						<OptionsBar resolveState = {this.props.resolveState}/>
					</div>


					<div style={this.input_wrapper_style("3")}>
						<p>{"Enter command for container to run on start:"}</p>
						<input style={this.input_style()} type="text" value={this.state.command} onChange={this.handle_command_resolution.bind(this)} />
					</div>

				</div>
					
				<div className="envPortOptions" style={this.port_box_wrapper_style("2")}>
					<p>{"Enter ports used in container:"}</p>
					<PortBox style={this.port_box_style()}  resolveState = {this.props.resolveState}/>
				</div>

				<div className="envImage" style={this.input_wrapper_style(3)}>
					<div style={this.dropzone_wrapper_style()}>
						<Dropzone onDrop={this.onDrop.bind(this)} multiple={false} accept={"image/png"}>
							<p>{"Envrionment Icon, drop here."}</p>
							{this.state.image_preview != null ? <img src={this.state.image_preview} style={this.image_preview_style()} /> : null }
						</Dropzone>
					</div>
				</div>

			</div>
		)

	}

	handle_name_resolution(event) {
		this.props.resolveState({name:event.target.value});
	} 

	handle_command_resolution(event) {
		this.props.resolveState({command:event.target.value});
	}

	dropzone_wrapper_style() {

		var style = {
			position: "relative",
			background: "#eeeeee",

		};

		return style;

	}


	image_preview_style() {

		var style = {
			position: "relative",
			height: "64px",
			width: "64px"
		};

		return style;

	}

	onDrop(file) {
		this.setState({image_preview: file[0].preview});
		this.props.resolveState({icon:file[0]});
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
  			height: "30px",
  			width: "50%",
  			marginLeft: "25%",
  			border: "0",
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
  			flexWrap: "wrap",
  			background: "#1e1e1e",
  			color: "white",
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
	          current_ports: [],
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

		this.props.resolveState({ports:c_ports})

		
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



class OptionsBar extends Component {

	constructor(props) {

		super(props)
		let bindings = {
			type: "get",
			route: "/images/json",
			request: {
				headers: {
					"X-Access-Token": Session.get('access_token')
					//`//username:+":"+auth_token
				},
				body: {
					all: true
				}
			}
		}

		this.state = {
			docker_images: [],
			selected_image: ""
		}

		var result = new Promise((resolve,reject) => {
			
			Meteor.call('shipyard_request', bindings, function(err, response) {

					if(err) reject(err);

					resolve(response);

			})
		


		}).then((val) => {

				this.setState({docker_images:val.data});
				console.log(val.data)
				this.props.resolveState({image:val.data[0].RepoTags[0].toString()})
		
		})

	}
	
	render(props) {
		return (
			<div>
				<select onChange={this.handle_change.bind(this)} value={this.state.selected_image} >
					{
						this.state.docker_images.map((val,i) => (
							<option value={val.RepoTags[0].toString()} key={i}>
								{val.RepoTags[0].toString()}
							</option>
						))

					}
		  		</select>
		  	</div>
  		)
	}

	handle_change(event) {

		this.setState({
			selected_image: event.target.value
		});

		this.props.resolveState({image:event.target.value})

	}

}