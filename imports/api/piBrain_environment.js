import { ActivePorts } from './port_listing.js';



export default class PiBrainEnvrionment {

	constructor(bindings) {
		this._docker_ports = [];
		this._docker_name = null;
		this._docker_id = null;
		this._docker_application = null;
		this._bindings = bindings;
	}

	launch(user_id) {
		const open_ports = []
		this._bindings.ports.map((port,i) => {
			this._docker_ports.push(this.return_and_block_port())
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
		console.log(shipyard_bindings)
		new Promise((resolve,reject) => {
			Meteor.call('ngrok_request', ngrok_bindings, function(err,response) {
				if(err) {
					reject(err)
					return
				}

				resolve(response)
			})
		}).then((val) => {
			console.log(val)
			window.open(val.public_url)
		})

		new Promise((resolve,reject) => {
			Meteor.call('shipyard_request', shipyard_bindings, function(err,response) {
				if(err) {
					reject(err)
					return
				}

				resolve(response)
			})
		}).then((val) => {
			console.log(val)
		})



	}

	kill(user_id) {

		// Meteor.call('ngrok_request', user_id,this._ng_kill_bindings)

		// Meteor.call('shipyard_request', user_id,this._sy_kill_bindings)

	}

	return_and_block_port() {

		var taken_ports = ActivePorts.find().fetch();

		var not_found = true
		while(not_found) {
			let port = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
			if(!taken_ports[port.toString()]) {
				ActivePorts.insert({_id: port.toString()})
				return port
			}
		}  
	}

}



