import { genSaltSync as genSalt, hashSync as hash } from "bcrypt";

Accounts.onCreateUser(function(options, user) {



  const admin_auth = {

    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD

  }
  //X-Service-Key
  HTTP.post("http://localhost:8080/auth/login", admin_auth, 
    function(err,response) {
      
      if (err) {
        throw new Meteor.error(err.code, err.response);
        return
      }
          
      const creation_request = {
        headers: {
          'X-Auth-Token': response.auth_token
        },
        username: user.services.github.username,
        password: passwordCreation(),
        role: "containers:read"
      }
      
      const save_login = {
        username: request.username,
        password: hash(request.password,salt)
      }
      
      options.shipyard_creds = save_login;

      access = response.auth_token
      HTTP.post("http://localhost:8080/api/accounts", creation_request, 
        function(err,response) {
          console.log(err,response)
        }
      );
    
      console.log(err)
    }
  );

});


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
