const {DataTypes, Model}=require("sequelize")

const sequelize=require("../../Db/db");

const Input=sequelize.define('inputs',{
  id_input:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true
    },
  Model:DataTypes.STRING,
  SerialNumber:DataTypes.STRING,
  AssetName:DataTypes.STRING,
  Statu:DataTypes.STRING

},{
  timestamps: false 
}
)
module.exports=Input;
