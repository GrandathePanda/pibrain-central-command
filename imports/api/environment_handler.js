import PiBrainEnvrionment from './piBrain_environment.js'
import { AppEnvironments } from './environment_collection.js'

export default class EnvironmentHandler {

	constructor(user_info) {
	
		this.open_environments = [];

	}


	build(bindings) {

		var env = new PiBrainEnvrionment(bindings);
		this.open_environments.push(env);
		return env;
	}


	kill_all_envs() {
		this.open_environments.map((env) => (
			env.kill()
		));
		this.open_environments = [];

	}

	open_environments() {
		return this.open_environments;
	}


}