const express = require('express');
const bodyparser =require('body-parser');
const userRouter = require("./router/userRouter");
const sequelize = require("./utils/database");
const expenseRouter = require("./router/expenseRouter");
const purchaseMembershipRouter = require("./router/purchaseMembershipRouter");
const leaderboardRouter = require("./router/leaderboardRouter");
const resetPasswordRouter = require("./router/resetPasswordRouter");
const reportsRouter = require("./router/reportsRouter");
const path = require("path");
const fs = require('fs');

const dotenv = require("dotenv");
dotenv.config();

const helmet = require("helmet");
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const morgan = require("morgan");
app.use(morgan("combined", { stream: accessLogStream }));

const User = require("./models/userModel");
const Expense = require("./models/expenseModel");
const Order = require("./models/ordersModel");
const ResetPassword = require("./models/resetPasswordModel");


const app = express();

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use("/" , userRouter);
app.use("/user" , userRouter);

app.use("/homepage" , expenseRouter);
app.use("/expense" , expenseRouter);

app.use("/purchase" , purchaseMembershipRouter);

app.use("/premium", leaderboardRouter);

app.use("/password", resetPasswordRouter);

app.use("/reports", reportsRouter);

// app.listen(3000 , () => {console.log("server is running in 3000 port")});

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

ResetPassword.belongsTo(User);
User.hasMany(ResetPassword);

sequelize.sync()
.then(() => {
    app.listen(process.env.PORT || 3000 , () => {console.log("server is running in 3000 port")});
})
.catch((err) => {
    console.error(err);
})