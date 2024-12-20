import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Summary from './Summary';
import CategoryChart from './CategoryChart';
import BudgetForm from './BudgetForm';

const STORAGE_KEY = 'expense-tracker-data';

const ExpenseTracker = () => {
  const loadSavedData = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return {
          expenses: parsedData.expenses || [],
          monthlyBudget: parsedData.monthlyBudget || 5000,
        };
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
    return { expenses: [], monthlyBudget: 5000 };
  };

  const initialData = loadSavedData();
  const [expenses, setExpenses] = useState(initialData.expenses);
  const [monthlyBudget, setMonthlyBudget] = useState(initialData.monthlyBudget);

  const saveData = () => {
    try {
      const dataToSave = { expenses, monthlyBudget };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(saveData, 2000);
    return () => clearTimeout(timeoutId);
  }, [expenses, monthlyBudget]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const addBudget = (addMoney) => {
    const newAmount = parseFloat(addMoney.amount);
    setMonthlyBudget((prev) => prev + newAmount);
    setExpenses([...expenses, {
      amount: newAmount,
      category: 'תוספת תקציב',
      date: new Date().toISOString(),
      description: addMoney.description || 'תוספת תקציב',
      id: Date.now(),
    }]);
  };

  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find((expense) => expense.id === id);

    // Check if the deleted expense is a budget addition
    if (expenseToDelete?.category === 'תוספת תקציב') {
      setMonthlyBudget((prevBudget) => prevBudget - expenseToDelete.amount);
    }

    // Remove the expense from the list
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    console.log('ההוצאה נמחקה בהצלחה');
  };

  const editExpense = (id, updatedData) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, ...updatedData } : expense
      )
    );
  };

  const getTotalExpenses = () =>
    expenses.reduce(
      (sum, expense) =>
        expense.category !== 'תוספת תקציב' ? sum + expense.amount : sum,
      0
    );

  const getRemainingBudget = () => monthlyBudget - getTotalExpenses();

  const categories = ['מזון', 'דיור', 'תחבורה', 'בילויים', 'קניות', 'בריאות', 'אחר'];

  return (
    <div>
      <ExpenseForm onAddExpense={addExpense} categories={categories} />
      <BudgetForm onAddBudget={addBudget} />
      <Summary
        monthlyBudget={monthlyBudget}
        totalExpenses={getTotalExpenses()} // Excludes budget additions
        remainingBudget={getRemainingBudget()}
      />
      <CategoryChart
        expenses={expenses.filter(
          (expense) => expense.category !== 'תוספת תקציב'
        )} // Excludes budget additions from chart
        categories={categories}
      />
      <ExpenseList
        expenses={expenses}
        onDeleteExpense={deleteExpense}
        onEditExpense={editExpense}
      />
    </div>
  );
};

export default ExpenseTracker;
