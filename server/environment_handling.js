import { Future } from 'fibers';
import { ActivePorts } from '../imports/api/port_listing.js'

export const ngrok_request = {
	name: 'ngrok_request',


	run(bindings,args=null) {		
		/*
		Ngrok Request Structure From DB
		{

		"addr"=>"$1", 
		"proto"=>"http", 
		"subdomain"=>"pibrain-dev-session-PORT", 
		"name"=>"pibrain-dev-session-PORT"

		}*/
		const future = new Future();
		const responses = {};

		bindings.ports.map((port,i) => {

			let mod_ngrok_request = Object.assign({},bindings);
			let open_port = args.open_port[i]
			mod_bindings.subdomain += open_port;
			mod_bindings.name += open_port;

			HTTP.post("http://localhost:4040/",mod_bindings, 
				function(err,response) {
					if(err) {
						future.return(err);
					}
					responses["ngrok_"+open_port.toString()] = response

				}
			);

			if(i == bindings.ports.length-1) future.return(responses)	
		});


		return future.wait();


	},

	call(args, callback) {
		
		const options = {
			returnStubValue: false,
			throwStubExceptions: false
		}
	

		Meteor.apply(this.name, [args], options, callback);

	}
}

export const shipyard_request = {

	name: 'shipyard_request',
		
	run(bindings,args=null) {

		const future = new Future();

		HTTP.post("http://localhost:8080/", shipyard_request, function(err,response) {
			
			if (err) future.return(err);
			
			
			future.return( response);
		});

		return future.wait();
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
	[ngrok_request.name]: function (args) {
		ngrok_request.run.call(this,args)
	},

	[shipyard_request.name]: function(args) {
		shipyard_request.run.call(this,args)
	},
})