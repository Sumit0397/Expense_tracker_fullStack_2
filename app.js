const express = require('express');
const bodyparser =require('body-parser');
const userRouter = require("./router/userRouter");
const sequelize = require("./utils/database");
const expenseRouter = require("./router/expenseRouter");
const purchaseMembershipRouter = require("./router/purchaseMembershipRouter");
const leaderboardRouter = require("./router/leaderboardRouter");

const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/userModel");
const Expense = require("./models/expenseModel");
const Order = require("./models/ordersModel");


const app = express();

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use("/" , userRouter);
app.use("/user" , userRouter);

app.use("/homepage" , expenseRouter);
app.use("/expense" , expenseRouter);

app.use("/purchase" , purchaseMembershipRouter);

app.use("/premium", leaderboardRouter);

// app.listen(3000 , () => {console.log("server is running in 3000 port")});

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then(() => {
    app.listen(3000 , () => {console.log("server is running in 3000 port")});
})
.catch((err) => {
    console.error(err);
})