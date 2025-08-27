import React from 'react';
import Icon from '../../../components/AppIcon';

const RetailerFilterChips = ({ selectedRetailer, onRetailerChange }) => {
  const retailers = [
    { id: 'all', name: 'All Stores', color: 'bg-primary', icon: 'Store' },
    { id: 'picknpay', name: 'Pick n Pay', color: 'bg-red-500', icon: 'ShoppingCart' },
    { id: 'woolworths', name: 'Woolworths', color: 'bg-green-600', icon: 'Leaf' },
    { id: 'checkers', name: 'Checkers', color: 'bg-blue-600', icon: 'CheckSquare' },
    { id: 'mrprice', name: 'Mr Price', color: 'bg-orange-500', icon: 'Tag' }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {retailers?.map((retailer) => {
        const isSelected = selectedRetailer === retailer?.id;
        return (
          <button
            key={retailer?.id}
            onClick={() => onRetailerChange(retailer?.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
              transition-all duration-200 ease-out min-w-fit
              ${isSelected 
                ? `${retailer?.color} text-white shadow-md scale-105` 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
              active:scale-95
            `}
            aria-pressed={isSelected}
            role="tab"
          >
            <Icon 
              name={retailer?.icon} 
              size={16} 
              className="flex-shrink-0"
            />
            <span className="text-sm font-medium">{retailer?.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default RetailerFilterChips;