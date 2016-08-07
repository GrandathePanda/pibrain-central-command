import Future from 'fibers/future';
import { ActivePorts } from '../imports/api/port_listing.js'


export const ngrok_request = {
	name: 'ngrok_request',


	run(bindings) {		
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

			let mod_bindings = Object.assign({},bindings.request);
			let open_port = bindings.open_ports[i]
			mod_bindings.data.subdomain = `dev-${open_port}`;
			mod_bindings.data.name = `dev-${open_port}`;
			mod_bindings.data.addr = open_port.toString();

			HTTP.call(bindings.type,"http://localhost:4040/"+bindings.route,mod_bindings, 
				function(err,response) {

					if(err) {
						console.log(err)
						responses[i.toString()] = err
						return
					}
				
					responses[i.toString()] = response

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

		HTTP.call(bindings.type,"http://localhost:8080"+bindings.route, bindings.request, function(err,response) {

			if (err) {
	
				future.return(err);

			}
			else {

			
				future.return( response );

			}	
			
		});

		return future.wait();
	},

	call(args, callback) {
		
		const options = {
			returnStubValue: false,
			throwStubExceptions: false
		}
	

		return Meteor.apply(this.name, [args], options, callback);

	}
}




Meteor.methods({
	[ngrok_request.name]: function (args) {
		return ngrok_request.run.call(this,args)
	},

	[shipyard_request.name]: function(args) {
		return  shipyard_request.run.call(this,args)
	},
})