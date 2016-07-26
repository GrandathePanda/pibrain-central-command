import { ActivePorts } from './port_listing.js';


export default class PiBrainEnvrionment {

	constructor(bindings) {
		this._docker_ports = [];
		this._docker_name = null;
		this._docker_id = null;
		this._docker_application = null;
		this._launch_bindings = bindings.launch;
		this._kill_bindings = bindings.kill;
	}

	launch_env(user_id) {

		ngrok_request.call(user_id,this._launch_bindings.ngrok)
		shipyard_request.call(user_id,this._launch_bindings.shipyard)


	}

	kill(user_id) {

		make_env_request.call(user_id,this._kill_bindings)

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



