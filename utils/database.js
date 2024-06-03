const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense_tracker_website" , "root" , "Sumit@1997" ,  {
    dialect : "mysql",
    host : "localhost"
})

module.exports = sequelize;