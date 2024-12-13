import React, { useState } from 'react';
import { Card, CardHeader, CardContent, TextField, Button, Collapse, IconButton } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const BudgetForm = ({ onAddBudget }) => {
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [addMoney, setAddMoney] = useState({ amount: '', description: '' });

  const handleAddBudget = () => {
    if (addMoney.amount) {
      onAddBudget(addMoney);
      setAddMoney({ amount: '', description: '' });
    }
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <CardHeader
        title="הוסף לתקציב"
        action={
          <IconButton onClick={() => setIsAddBudgetOpen(!isAddBudgetOpen)}>
            {isAddBudgetOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      <Collapse in={isAddBudgetOpen}>
        <CardContent>
          <TextField
            label="סכום"
            type="number"
            value={addMoney.amount}
            onChange={(e) => setAddMoney({ ...addMoney, amount: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="תיאור"
            value={addMoney.description}
            onChange={(e) => setAddMoney({ ...addMoney, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="success"
            startIcon={<AttachMoneyIcon />}
            onClick={handleAddBudget}
          >
            הוסף לתקציב
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BudgetForm;
