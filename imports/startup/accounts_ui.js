import { Accounts } from 'meteor/accounts-base';


Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL',
	requestPermissions: {
    	github: ['user','read:org']
  	},
});
