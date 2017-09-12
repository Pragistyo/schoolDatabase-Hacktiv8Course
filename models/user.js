'use strict';
// const module = require('module');


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.TEXT
    // salt:
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

//   user.beforeCreate(model => {
//    model.password = crypto.createHmac('sha256', model.salt)
                                          // .update(model.password)
                                          // .digest('hex');
// })
crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
  return User;
};
