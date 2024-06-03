const express = require('express');
const bodyparser =require('body-parser');
const userRouter = require("./router/userRouter");
const sequelize = require("./utils/database");


const app = express();

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use("/" , userRouter);
app.use("/user" , userRouter);

// app.listen(3000 , () => {console.log("server is running in 3000 port")});

sequelize.sync()
.then(() => {
    app.listen(3000 , () => {console.log("server is running in 3000 port")});
})
.catch((err) => {
    console.error(err);
})