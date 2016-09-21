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


	static create_new_environment(modal_bindings) {

		var valid = modal_bindings.env_name &&
					modal_bindings.env_ports &&
					modal_bindings.env_image &&
					modal_bindings.env_command &&
					modal_bindings.env_icon
		if ( valid == false) return

		var container_ports = {} 

		modal_bindings.env_ports.map((port) => {
			container_ports[port] = {}
		})

		var image_reader = new FileReader();
		image_reader.onloadend = (event) => {
			const creation_request = {
				_id: modal_bindings.env_name,
				icon: image_reader.result,
				query_object: {
					type: "post",
					route: "/containers/create",
					ports: modal_bindings.env_ports,
					container_ids: [],
					request: {
					  headers: {
					  	"Content-Type": "application/json",
					  },
					  data: 
					  {
			  		
			  		       // "Hostname": "",
			  		       // "Domainname": "",
			  		       // "User": "",
			  		       // "AttachStdin": false,
			  		       // "AttachStdout": true,
			  		       // "AttachStderr": true,
			  		       "Tty": true,
			  		       "OpenStdin": true,
			  		       // "StdinOnce": false,
			  		       // "Env": [
			  		       // ],
			  		       "Cmd": modal_bindings.env_command.split(','),
			  		       // "Entrypoint": "",
			  		       "Image": modal_bindings.env_image,
			  		       // "Labels": {
			  		       //         "com-example-vendor": "piBrain",
			  		       //         "com-example-version": "0.1"
			  		       // },
			  		       // "Volumes": {
			  		       //   "/volumes/data": {}
			  		       // },
			  		       // "WorkingDir": "/home/desktop",
			  		       // "NetworkDisabled": false,
			  		       // "MacAddress": "12:34:56:78:9a:bc",
			  		       "ExposedPorts": container_ports,
			  		       // "StopSignal": "SIGTERM",
			  		       "HostConfig": {
			  		      //    "Binds": ["/tmp:/tmp"],
			  		      //    "Links": ["redis3:redis"],
			  		      //    "Memory": 0,
			  		      //    "MemorySwap": 0,
			  		      //    "MemoryReservation": 0,
			  		      //    "KernelMemory": 0,
			  		      //    "CpuPercent": 80,
			  		      //    "CpuShares": 512,
			  		      //    "CpuPeriod": 100000,
			  		      //    "CpuQuota": 50000,
			  		      //    "CpusetCpus": "0,1",
			  		      //    "CpusetMems": "0,1",
			  		      //    "MaximumIOps": 0,
			  		      //    "MaximumIOBps": 0,
			  		      //    "BlkioWeight": 300,
			  		      //    "BlkioWeightDevice": [{}],
			  		      //    "BlkioDeviceReadBps": [{}],
			  		      //    "BlkioDeviceReadIOps": [{}],
			  		      //    "BlkioDeviceWriteBps": [{}],
			  		      //    "BlkioDeviceWriteIOps": [{}],
			  		      //    "MemorySwappiness": 60,
			  		      //    "OomKillDisable": false,
			  		      //    "OomScoreAdj": 500,
			  		      //    "PidMode": "",
			  		      //    "PidsLimit": -1,
			  		      //    "PortBindings": { "22/tcp": [{ "HostPort": "11022" }] },
			  		      //    "PublishAllPorts": false,
			  		      //    "Privileged": false,
			  		      //    "ReadonlyRootfs": false,
			  		      //    "Dns": ["8.8.8.8"],
			  		      //    "DnsOptions": [""],
			  		      //    "DnsSearch": [""],
			  		      //    "ExtraHosts": null,
			  		      //    "VolumesFrom": ["parent", "other:ro"],
			  		      //    "CapAdd": ["NET_ADMIN"],
			  		      //    "CapDrop": ["MKNOD"],
			  		      //    "GroupAdd": ["newgroup"],
			  		      //    "RestartPolicy": { "Name": "", "MaximumRetryCount": 0 },
			  		            "NetworkMode": "bridge",
			  		      //    "Devices": [],
			  		      //    "Ulimits": [{}],
			  		      //    "LogConfig": { "Type": "json-file", "Config": {} },
			  		      //    "SecurityOpt": [],
			  		      //    "StorageOpt": {},
			  		      //    "CgroupParent": "",
			  		      //    "VolumeDriver": "",
			  		      //    "ShmSize": 67108864
			  		      // },
			  		      // "NetworkingConfig": {
			  		      // "EndpointsConfig": {
			  		      //     "isolated_nw" : {
			  		      //         "IPAMConfig": {
			  		      //             "IPv4Address":"172.20.30.33",
			  		      //             "IPv6Address":"2001:db8:abcd::3033",
			  		      //             "LinkLocalIPs":["169.254.34.68", "fe80::3468"]
			  		      //         },
			  		      //         "Links":["container_1", "container_2"],
			  		      //         "Aliases":["server_x", "server_y"]
			  		      //     }
			  		    }
			  		  }
					  
					}
				}
			}
		
			AppEnvironments.insert(creation_request);
		}
	
		image_reader.readAsDataURL(modal_bindings.env_icon)

	}


}
