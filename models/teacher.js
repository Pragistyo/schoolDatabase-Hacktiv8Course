'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique   : {args:true,msg:"Email already exist"},
            validate:{
                      isEmail:{args:true,msg:"Email is invalid !"}
                      }
          },
    SubjectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Teacher.associate = models=>{
    Teacher.belongsTo(models.Subject)
  }
  return Teacher;
};
