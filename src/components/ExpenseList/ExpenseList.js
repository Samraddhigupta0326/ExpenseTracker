import React from "react";
import styles from "./ExpenseList.module.css";
import Transaction from "../Transaction/Transaction";

const ExpenseList = ({ expenses, deleteExpense, changeExpenseToUpdate }) => {
  return (
    <div className={styles.expenseListContainer}>
      <h3>Transactions</h3>
      <ul role="list" className={styles.transactionList}>
        {expenses.map((expense, i) => (
          <Transaction
            key={expense.id}
            index={i}
            expense={expense}
            deleteExpense={deleteExpense}
            changeExpenseToUpdate={changeExpenseToUpdate}
          />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
