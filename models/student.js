'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique   : {msg:"Email already exist"},
            validate:{
                      isEmail:true,
                      }
          }
    // full_name: DataTypes.STRING
  },{

    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Student.associate = models=>{
    Student.belongsToMany(models.Subject,{through:'StudentSubjects'})
  }
  return Student;
};
