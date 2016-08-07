import { Meteor } from 'meteor/meteor';

if(Meteor.isServer) {
Accounts.onCreateUser(function(options, user) {

  //X-Service-Key

  const password = passwordCreation();
  const username = user.services.github.username


  const save_login = {
    sy_un: username,
    sy_pass: password
  }

  user.sy_login = save_login;

  user.profile = options.profile

  let result = new Promise((resolve,reject) => {
   
      const admin_login = {
        type: "post",
        route: "/auth/login",
        request: {
          data: {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
          }
        }
      }

      Meteor.call('shipyard_request', admin_login, function(err, response) {

          if(err) {
            reject(err);
            return
          }

          resolve(response);

      })       
  
  }).then((val) => {
      
      let auth_token = `${process.env.ADMIN_USERNAME}:${JSON.parse(val.content).auth_token}`
      const creation_request = {
        type: "post",
        route: "/api/accounts",
        request: {
          headers: {
            'X-Access-Token': auth_token
          },
          data: {
            username: username,
            password: password,
            roles: ["containers","images:ro"]  
          }
        }
      }   
      Meteor.call('shipyard_request', creation_request, function(err, response) {

            if(err) {
              throw new Meteor.erro(err)
              return
            }
      
            console.log("User Creation Process Finished With: "+response.statusCode)
            
      })


  })

  return user

})

}

var passwordCreation = function() {

  const generatePassword = require('password-generator')
  var maxLength = 18;
  var minLength = 12;
  var uppercaseMinCount = 3;
  var lowercaseMinCount = 3;
  var numberMinCount = 2;
  var specialMinCount = 2;
  var UPPERCASE_RE = /([A-Z])/g;
  var LOWERCASE_RE = /([a-z])/g;
  var NUMBER_RE = /([\d])/g;
  var SPECIAL_CHAR_RE = /([\?\-])/g;
  var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

  var isStrongEnough = function(password) {
    var uc = password.match(UPPERCASE_RE);
    var lc = password.match(LOWERCASE_RE);
    var n = password.match(NUMBER_RE);
    var sc = password.match(SPECIAL_CHAR_RE);
    var nr = password.match(NON_REPEATING_CHAR_RE);
    return password.length >= minLength &&
      !nr &&
      uc && uc.length >= uppercaseMinCount &&
      lc && lc.length >= lowercaseMinCount &&
      n && n.length >= numberMinCount &&
      sc && sc.length >= specialMinCount;
  }

  var customPassword = function() {
    var password = "";
    var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
    while (!isStrongEnough(password)) {
      password = generatePassword(randomLength, false, /[\w\d\?\-]/);
    }
    return password;
  }

  return customPassword()

}
