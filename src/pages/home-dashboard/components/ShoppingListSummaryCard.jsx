import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShoppingListSummaryCard = ({ 
  itemCount = 0, 
  estimatedTotal = 0, 
  listName = "Current Shopping List",
  lastUpdated = null,
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/shopping-list-management');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatLastUpdated = (date) => {
    if (!date) return 'Never updated';
    
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date?.toLocaleDateString('en-ZA');
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 shadow-sm ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            {listName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatLastUpdated(lastUpdated)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon 
            name="ShoppingCart" 
            size={20} 
            className="text-primary" 
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-card-foreground mb-1">
            {itemCount}
          </div>
          <div className="text-sm text-muted-foreground">
            {itemCount === 1 ? 'Item' : 'Items'}
          </div>
        </div>
        
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">
            {formatCurrency(estimatedTotal)}
          </div>
          <div className="text-sm text-muted-foreground">
            Estimated Total
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          variant="default"
          fullWidth
          iconName="ShoppingCart"
          iconPosition="left"
          onClick={handleContinueShopping}
          disabled={itemCount === 0}
        >
          {itemCount === 0 ? 'Start Shopping' : 'Continue Shopping'}
        </Button>
        
        <Button
          variant="outline"
          iconName="Plus"
          onClick={() => navigate('/smart-item-capture')}
          className="px-4"
        >
        </Button>
      </div>
    </div>
  );
};

export default ShoppingListSummaryCard;