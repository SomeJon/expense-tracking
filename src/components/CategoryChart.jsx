import React from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const colors = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#6B7280'];

const CategoryChart = ({ expenses, categories }) => {
    const getExpensesByCategory = () => {
      const categoryTotals = {};
      expenses.forEach((expense) => {
        if (expense.category !== 'תוספת תקציב') {
          // Exclude budget additions
          categoryTotals[expense.category] =
            (categoryTotals[expense.category] || 0) + expense.amount;
        }
      });
      return Object.entries(categoryTotals).map(([name, value]) => ({
        name,
        value,
      }));
    };
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={getExpensesByCategory()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, value }) => `${name}: ₪${value.toFixed(0)}`}
          >
            {getExpensesByCategory().map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]} // Adjust coloring
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
};

export default CategoryChart;
