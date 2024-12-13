import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

const Summary = ({ monthlyBudget, totalExpenses }) => {
  const remainingBudget = monthlyBudget - totalExpenses;

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <CardHeader title="סיכום תקציב" />
      <CardContent>
        <Typography>תקציב חודשי: ₪{monthlyBudget}</Typography>
        <Typography>סה"כ הוצאות: ₪{totalExpenses.toFixed(2)}</Typography>
        <Typography>נותר: ₪{remainingBudget.toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
};

export default Summary;
