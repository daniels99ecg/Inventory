const {DataTypes, Model}=require("sequelize")

const sequelize=require("../../Db/db");

const User=sequelize.define('users',{
    id_user:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true
    },
    firstname:DataTypes.STRING,
    lastname:DataTypes.STRING,
    email:DataTypes.STRING,
    passwords:DataTypes.STRING

},{
  timestamps: false 
}
)
module.exports=User;
