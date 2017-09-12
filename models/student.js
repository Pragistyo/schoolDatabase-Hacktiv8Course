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
      },
    }
    // ,
    // InstanceMethods: {
    //   getFullName: function(){
    //       return `${this.first_name} ${this.last_name}`
    //   }
    // }
  });

  Student.prototype.getFullname = function () {
    return `${this.first_name} ${this.last_name}`
    // retrun [this.first_name, this.last_name].join(' ')
 }

  Student.associate = models=>{
    Student.belongsToMany(models.Subject,{through:'StudentSubject'})
  }
  return Student;
};
