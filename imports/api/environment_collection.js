import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const AppEnvironments = new Mongo.Collection('app_environments');


if (Meteor.isServer) {
	Meteor.publish('app_environments', function appEnvironmentsPublication() {
		return AppEnvironments.find()
	})
}


AppEnvironments.allow({
  update: function (userId, doc, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'owner');
  },
  remove: function (userId, doc) {
    // can't remove locked documents
    return doc.locked;
  },
  insert: function (userId, fields, doc) {
    return true
  },
  fetch: ['locked'] // no need to fetch 'owner'
});


AppEnvironments.deny({
  update: function (userId, doc, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'owner');
  },
  remove: function (userId, doc) {
    // can't remove locked documents
    return doc.locked;
  },
  insert: function (userId, doc) {
    return false //////BADDDDDDDDDDDDD
  },
  fetch: ['locked'] // no need to fetch 'owner'
});