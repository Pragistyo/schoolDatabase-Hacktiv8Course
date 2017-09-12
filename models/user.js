'use strict';
const crypto     = require('crypto');
const salt       = require('../helper/helperSalt.js');
const helperHash = require('../helper/helperHash.js');

// let bla = salt(8)
// let pass= 'ogikakaka'
// console.log(salt(8));
// console.log(helperHash(bla,pass));

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.TEXT,
    salt: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(models) {
      const salts     = salt(8);
      models.salt     = salts;
      models.password = helperHash(salts,models.password)
      // models.password = hash
      }
    }
  });

//   user.beforeCreate(model => {
//    model.password = crypto.createHmac('sha256', model.salt)
                                          // .update(model.password)
                                          // .digest('hex');
// // })
// crypto.createHmac('sha256', secret)
//                    .update('I love cupcakes')
//                    .digest('hex');
  return User;
};
