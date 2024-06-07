const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.use(express.static("public"));

router.get("/", expenseController.getHomePage);
router.get("/getAllExpenses", expenseController.getAllExpenses);
router.delete("/deleteExpense/:id", expenseController.deleteExpense);

router.post("/addExpense", expenseController.addExpense);
router.put("/editExpense/:id", expenseController.editExpense);

module.exports = router;