import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BudgetManager = ({ budget, onUpdateBudget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState(budget?.monthlyLimit?.toString());
  const [alertThreshold, setAlertThreshold] = useState(budget?.alertThreshold?.toString());

  const handleSave = () => {
    onUpdateBudget({
      monthlyLimit: parseFloat(budgetAmount) || 0,
      alertThreshold: parseFloat(alertThreshold) || 80,
      currentSpent: budget?.currentSpent
    });
    setIsEditing(false);
  };

  const spentPercentage = (budget?.currentSpent / budget?.monthlyLimit) * 100;
  const isOverBudget = spentPercentage > 100;
  const isNearLimit = spentPercentage > budget?.alertThreshold;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-text-primary">Monthly Budget</h4>
        <Button
          variant="ghost"
          size="sm"
          iconName={isEditing ? "X" : "Edit2"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <Input
            label="Monthly Limit (ZAR)"
            type="number"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e?.target?.value)}
            placeholder="Enter budget amount"
          />
          
          <Input
            label="Alert Threshold (%)"
            type="number"
            value={alertThreshold}
            onChange={(e) => setAlertThreshold(e?.target?.value)}
            placeholder="Alert when reaching % of budget"
            min="1"
            max="100"
          />
          
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            onClick={handleSave}
            fullWidth
          >
            Save Budget
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Spent this month</span>
            <span className={`font-medium ${isOverBudget ? 'text-error' : 'text-text-primary'}`}>
              R{budget?.currentSpent?.toFixed(2)} / R{budget?.monthlyLimit?.toFixed(2)}
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isOverBudget ? 'bg-error' : isNearLimit ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min(spentPercentage, 100)}%` }}
            />
          </div>
          
          <div className="flex items-center space-x-2 text-xs">
            <Icon 
              name={isOverBudget ? "AlertTriangle" : isNearLimit ? "AlertCircle" : "CheckCircle"} 
              size={14} 
              className={isOverBudget ? 'text-error' : isNearLimit ? 'text-warning' : 'text-success'} 
            />
            <span className={isOverBudget ? 'text-error' : isNearLimit ? 'text-warning' : 'text-success'}>
              {isOverBudget 
                ? `Over budget by R${(budget?.currentSpent - budget?.monthlyLimit)?.toFixed(2)}`
                : isNearLimit 
                ? `${spentPercentage?.toFixed(1)}% of budget used`
                : `${(100 - spentPercentage)?.toFixed(1)}% budget remaining`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetManager;