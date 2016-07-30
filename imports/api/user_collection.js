import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


if (Meteor.isServer) {
  Meteor.publish(null, function() {
       var currentUser = this.userId;
       if (currentUser) {
           return Meteor.users.find({
               _id: currentUser
           }, {
           fields: {
               // Default
               "services": 1,
               // Created profile property
               "profile": 1,
               // Created roles property
               "sy_login": 1
           }
        });
      } else {
        return this.ready();
    }
  });
}


