import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


Accounts.onLogin(function() {
	
  var confirmed = false;
  	var auth = Meteor.user().services.github.accessToken.toString()

  	HTTP.get("https://api.github.com/orgs/piBrain/members",{
  			params: {'access_token': auth}
  		},
  		function(error,response) {

        var user = Meteor.user();
  			var c_user_name = user
  				.services.github.username
  			if(error === null) {
  				response.data.map((user) => (
  					confirmed = (confirmed || (user.login === c_user_name))
  				))
  			}
  			else {
  				Meteor.logout()
  			}
  
  			if(confirmed == false ) {
          Meteor.logout()
          return;
        }

        const user_login = {
          type: "post",
          route: "/auth/login",
          request: {
            data: {
              username: user.sy_login.sy_un,
              password: user.sy_login.sy_pass
            }
          }
        }
        new Promise((resolve,reject) => {
          Meteor.call('shipyard_request',user_login, (err, response) => {
              if(err) {
                reject(err)
                return
              }
              resolve(response)
          })
        }).then((val) => { 
          Session.set('access_token', user.sy_login.sy_un+":"+JSON.parse(val.content).auth_token)
        })

  		}
    ) 
})









