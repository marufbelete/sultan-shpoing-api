
const Sequalize=require('sequelize');
const sequalize = require("../util/database");
 const Location=sequalize.define('location',{
   _id:{
   type:Sequalize.INTEGER,
   allowNull:false,
   primaryKey: true,
   autoIncrement: true,
   },
   city:{
  type:Sequalize.STRING,
  allowNull:false,
  unique: true
   }
 })
 module.exports = Location;
