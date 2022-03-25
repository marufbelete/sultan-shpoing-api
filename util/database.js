const Sequlize=require('sequelize')
const sequalize=new Sequlize("shops","root","12345",{
    dialect:"mariadb",
    host:"localhost"
});
module.exports=sequalize;