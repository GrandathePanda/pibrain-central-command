import { ActivePorts } from './port_listing.js';



export default class PiBrainEnvrionment {

	constructor(bindings) {
		this._docker_ports = [];
		this._docker_name = null;
		this._docker_id = null;
		this._ngrok_urls = []
		this._docker_application = null;
		this._bindings = bindings;
	}

	launch(user_id) {
		const open_ports = []
		let host_port_bindings = {}
		this._bindings.ports.map((port,i) => {
			let port_val = this.return_and_block_port()
			host_port_bindings[port.toString()] = [{"HostPort":port_val.toString()}] 
			this._docker_ports.push(port_val)
		})
		const ngrok_bindings = 
		{
			route: "api/tunnels",
			type: "post",
			ports: this._bindings.ports,
			open_ports: this._docker_ports,
			request: {
				headers: {
					"content-type": "application/json"
				},
				data: {
					proto: "http"
				}
			}
		}

		const shipyard_bindings = Object.assign({},this._bindings)
		
	

		shipyard_bindings.request.headers['X-Access-Token'] = Session.get('access_token');
		

		shipyard_bindings
			.request.data
			.HostConfig.PortBindings = host_port_bindings
		
		new Promise((resolve,reject) => {
			Meteor.call('shipyard_request', shipyard_bindings, function(err,response) {
				if(err) {
					reject(err)
					return
				}

				resolve(response)
			})
		}).then((val) => {
			 let id = JSON.parse(val.content).Id
			 this._docker_id = JSON.parse(val.content).Id
			 let attach_docker_bindings = {
			 	 type: "post",
			 	 route: `/containers/${id}/attach`,
			 	 request: {
			 	 	headers: {
			 	 		"X-Access-Token": Session.get('access_token'),
			 	 		"Content-Type": "application/json"
			 	 	}
			 	 }
			 }
			 return new Promise((resolve,reject) => {
			 	 Meteor.call('shipyard_request', attach_docker_bindings, function(err,response) {
			 	 	if(err) {
			 	 		console.log(err)
			 	 		reject(err)
			 	 		return
			 	 	}

			 	 	resolve(id)
			 	 })
			 })
		}).then((val) => {
			 let start_docker_bindings = {
			 	type: "post",
			 	route: `/containers/${val}/start`,
			 	request: {
			 		headers: {
			 			"X-Access-Token": Session.get('access_token'),
			 			"Content-Type": "application/json"
			 		}
			 	}
			 }
			 return new Promise((resolve,reject) => {
				 Meteor.call('shipyard_request', start_docker_bindings, function(err,response) {
				 	if(err) {
				 		reject(err)
				 		return
				 	}

				 	resolve(response)
				 })
			 })

		}).then((val) => {
			return new Promise((resolve,reject) => {
				Meteor.call('ngrok_request', ngrok_bindings, function(err,response) {
					if(err) {
						reject(err)
						return
					}
					console.log(response)
					resolve(response)
				})
			})
		}).then((val) => {
			val.map((response) => {
				let url = JSON.parse(response.content).public_url
				window.open(url)
				this._ngrok_urls.push(url)

			})
		})



	}

	kill() {

		var ng_kill = this._ng_kill()
		var sy_kill = this._sy_kill()
		this._docker_ports.map((port) => {
			ActivePorts.remove({ _id: port.toString() })
		})
		return [ng_kill,sy_kill]

	}

	_sy_kill() {

		let sy_stop_bindings = {
			route: `/containers/${this._docker_id}/stop`,
			type: "post",
			request: {
				headers: {
					'X-Access-Token': Session.get('access_token')
				}
			}
		}
		return new Promise((resolve,reject) => {
			Meteor.call('shipyard_request',sy_stop_bindings, function(err,response) {
				if(err) {
					reject(err)
					return
				}
				resolve(response)
			}) 
		}).then((val) => {
			let sy_remove_bindings = {
				route: `/containers/${this._docker_id}`,
				type: "delete",
				request: {
					headers: {
						'X-Access-Token': Session.get('access_token')
					}
				}
			}
			return new Promise((resolve,reject) => {
				Meteor.call('shipyard_request',sy_remove_bindings, function(err,response) {
					if(err) {
						reject(err)
						return
					}
					resolve(response)
				}) 
			})
		})
		
	}

	_ng_kill() {
		return Promise.all(this._ngrok_urls.map((url) => {
			let ng_kill_bindings_https = {
				route: `api/tunnels/${url.substring(8,17)}`,
				type: "delete"
			}
			new Promise((resolve,reject) => {
				Meteor.call('ngrok_request',ng_kill_bindings_https, function(err,response) {
					if(err) {
						reject(err)
						return
					}
					resolve(response)
				}) 
			}).then((val) => {
				let ng_kill_bindings_http = {
					route: `api/tunnels/${url.substring(8,17)} (http)`,
					type: "delete"
				}
				return new Promise((resolve,reject) => {
					Meteor.call('ngrok_request',ng_kill_bindings_http, function(err,response) {
						if(err) {
							reject(err)
							return
						}
						resolve(response)
					}) 
				})

			})
		}))
	}

	return_and_block_port() {

		var taken_ports = ActivePorts.find().fetch();

		var not_found = true
		while(not_found) {
			let port = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
			if(!taken_ports[port.toString()]) {
				ActivePorts.insert({ _id: port.toString() })
				return port
			}
		}  
	}

}



