const {DataTypes, Model}=require("sequelize")

const sequelize=require("../../Db/db");

const Display=sequelize.define('displays',{
  id_display:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true
    },
    SerialNumber:DataTypes.STRING,
    brad:DataTypes.STRING,
    date:DataTypes.STRING,
    type:DataTypes.STRING,
    Statu:DataTypes.STRING

},{
  timestamps: false 
}
)
module.exports=Display;
