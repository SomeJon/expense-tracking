import React from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <CardHeader title="רשימת הוצאות" />
      <CardContent>
        <List>
          {expenses.map((expense) => (
            <ListItem
              key={expense.id}
              style={{
                backgroundColor: expense.amount > 0 ? '#d4edda' : '#f8d7da', // Green for positive, red for negative
                marginBottom: '0.5rem',
                borderRadius: '4px',
              }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteExpense(expense.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${expense.description || expense.category}: ₪${expense.amount.toFixed(2)}`}
                secondary={`תאריך: ${expense.date}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
