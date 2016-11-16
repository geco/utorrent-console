const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const fs = require('fs');
const path = require('path');

var resolvePath = function() {
  return path.join(path.resolve(__dirname),'..','credentials.json')
}

const save = function(credentials) {
  var password = Math.random().toString(36).slice(-8);
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(JSON.stringify(credentials),'utf8','hex') + cipher.final('hex')
  var output = {seed: password, credentials: crypted}
  try {
    fs.writeFile(resolvePath(), JSON.stringify(output));
  } catch (e) {}
}
const load = function(cb) {
  fs.readFile(resolvePath(), function (err,data) {
    if (err) return cb(null)
    try {
      var input = JSON.parse(data)
      var decipher = crypto.createDecipher(algorithm, input.seed)
      var decrypted = decipher.update(input.credentials,'hex','utf8') + decipher.final('utf8');
      return cb(JSON.parse(decrypted))
    }  catch(e) {
      return cb(null)
    }
  });
}
const remove = function() {
  try {
    fs.exists(resolvePath(), (exists) => {
      if(exists) fs.unlink(path.join(path.resolve(__dirname),'..','credentials.json'))
    });
  }  catch(e) {
  }
}

exports.save = save;
exports.load = load;
exports.remove = remove;
