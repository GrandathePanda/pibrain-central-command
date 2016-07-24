import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const ActivePorts = new Mongo.Collection('active_ports');


if (Meteor.isServer) {
	Meteor.publish('active_ports', function activePortsPublication() {
		return ActivePorts.find()
	})
}

ActivePorts.allow({
  insert: function (userId, doc) {

    return (Meteor.user());
  },
  update: function (userId, doc, fields, modifier) {

    return (Meteor.user() && true)
  },
  remove: function (userId, doc) {

    return (Meteor.user() && true)
  }
});

ActivePorts.deny({
  update: function (userId, doc, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'owner');
  },
  remove: function (userId, doc) {
    // can't remove locked documents
    return doc.locked;
  },
  fetch: ['locked'] // no need to fetch 'owner'
});