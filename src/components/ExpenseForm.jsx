import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  Collapse,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpenseForm = ({ onAddExpense, categories }) => {
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: 'מזון',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAddExpense = () => {
    if (newExpense.amount && newExpense.category) {
      onAddExpense({
        ...newExpense,
        amount: parseFloat(newExpense.amount),
        id: Date.now(),
      });
      setNewExpense({
        amount: '',
        category: 'מזון',
        date: new Date().toISOString().split('T')[0],
        description: '',
      });
    }
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <CardHeader
        title="הוסף הוצאה"
        action={
          <IconButton onClick={toggleExpand}>
            <ExpandMoreIcon style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }} />
          </IconButton>
        }
      />
      <Collapse in={expanded}>
        <CardContent>
          <TextField
            label="סכום"
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Select
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            fullWidth
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="תאריך"
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="תיאור"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddExpense}
          >
            הוסף הוצאה
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ExpenseForm;
