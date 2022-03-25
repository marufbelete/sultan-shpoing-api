
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const User=sequalize.define('user',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   username:{
  type:Sequalize.STRING,
  allowNull:false,
  unique:true
   },
   password:{
    type:Sequalize.STRING,
    allowNull:false,
       }
 })

 module.exports = User;

 