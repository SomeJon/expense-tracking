import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  return (
    <Card>
      <CardContent>
        <List>
          {expenses.map((expense) => (
            <ListItem
              key={expense.id}
              style={{
                backgroundColor: expense.category === 'תוספת תקציב' ? '#d4edda' : '#f8d7da',
                marginBottom: '8px',
                borderRadius: '4px',
              }}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => onEditExpense(expense.id, { /* Provide edit data logic here */ })}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDeleteExpense(expense.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
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
