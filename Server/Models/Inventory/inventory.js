const {DataTypes, Model}=require("sequelize")

const sequelize=require("../../Db/db");

const Input = require("../inputs/input");


const Perfil=sequelize.define('inventoryes',{
  id_inventory:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement: true
    },
  Status:DataTypes.STRING,
  EndDate:DataTypes.STRING,
  EmployeeName:DataTypes.STRING,
  Company:DataTypes.STRING,
  Accounts:DataTypes.STRING,
  Info:DataTypes.STRING,
  PurchasedFor:DataTypes.STRING,
  Role:DataTypes.STRING,
  DateReceived:DataTypes.STRING,
  Brand:DataTypes.STRING,
  Model:DataTypes.STRING,
  SerialNumber:DataTypes.STRING,
  AssetName:DataTypes.STRING,
  Bitlocker:DataTypes.STRING,
  key_Bitlocker:DataTypes.STRING,
  OS:DataTypes.STRING,
  fk_input:DataTypes.INTEGER
},{
  timestamps: false // Desactiva las columnas createdAt y updatedAt
}
)

Perfil.belongsTo(Input, { foreignKey: 'fk_input' });

module.exports=Perfil;
