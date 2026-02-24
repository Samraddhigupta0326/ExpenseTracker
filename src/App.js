import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseList from "./components/ExpenseList/ExpenseList";

import { db } from "./firebaseInit";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);

  // Real-time fetch of expenses on mount
  useEffect(() => {
    const expensesCollection = collection(db, "expenses");

    const unsubscribe = onSnapshot(expensesCollection, (snapshot) => {
      const expensesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expensesData);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  // Add new expense
  const addExpense = async (expense) => {
    try {
      await addDoc(collection(db, "expenses"), expense);
      // onSnapshot automatically updates state
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Update existing expense
  const updateExpense = async (expense) => {
    try {
      const expenseRef = doc(db, "expenses", expense.id);
      await setDoc(expenseRef, {
        text: expense.text,
        amount: expense.amount,
      });
      setExpenseToUpdate(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      const expenseRef = doc(db, "expenses", id);
      await deleteDoc(expenseRef);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm
        addExpense={addExpense}
        updateExpense={updateExpense}
        expenseToUpdate={expenseToUpdate}
        resetExpenseToUpdate={() => setExpenseToUpdate(null)}
      />
      <ExpenseList
        expenses={expenses}
        changeExpenseToUpdate={setExpenseToUpdate}
        deleteExpense={deleteExpense}
      />
    </div>
  );
}

export default App;
