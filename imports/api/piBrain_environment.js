import { ActivePorts } from './port_listing.js'


export default class PiBrainEnvrionment {

	constructor(bindings) {
		this._docker_ports = [];
		this._docker_name = null;
		this._docker_id = null;
		this._docker_application = null;
		this._bindings = bindings;
	}

	launch_env(user_id) {
		launch.call(user_id,this.bindings)
	}

	kill_env(user_id) {
		kill.call(user_id,)
	}


	static _open_port() {


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

export const launch = {
	name: 'launch_environment',


	run({user_id,bindings}) {


		/*
		Ngrok Request Structure From DB
		{

		"addr"=>"$1", 
		"proto"=>"http", 
		"subdomain"=>"pibrain-dev-session-PORT", 
		"name"=>"pibrain-dev-session-PORT"

		}*/

		var ngrok_request = bindings['ngrok_request'];

		var shipyard_request = bindings['shipyard_request'];


		bindings.ports.map((port,i) =>(
			function() {
				
				HTTP.post("http://localhost:4040/",ngrok_request, 
					function(err,response) {

					}
				);
			}
		))


		HTTP.post("http://localhost:8080/", shipyard_request, function(err,response) {

		});

	},

	call(args, callback) {
		
		const options = {
			returnStubValue: false,
			throwStubExceptions: false
		}
	

		Meteor.apply(this.name, [args], options, callback);

	}
}


export const kill = {
	name: 'kill_environment',


	run({user_id,bindings}) {



		HTTP.post("http://localhost:4040/",ngrok_request, function(err,response) {

		});

		HTTP.post("http://localhost:8080/", shipyard_request, function(err,response) {

		});

	},

	call(args, callback) {
		
		const options = {
			returnStubValue: false,
			throwStubExceptions: false
		}
	

		Meteor.apply(this.name, [args], options, callback);

	}
}

Meteor.methods({
	[launch.name]: function (args) {
		launch.run.call(this,args)
	},

	[kill.name]: function (args) {
		kill.run.call(this,args)
	}
})