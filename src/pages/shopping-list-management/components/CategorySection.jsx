import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ItemCard from './ItemCard';

const CategorySection = ({ 
  category, 
  items, 
  onUpdateItem, 
  onDeleteItem, 
  onToggleItem,
  isCollapsed = false,
  onToggleCollapse 
}) => {
  const categoryIcons = {
    'Groceries': 'ShoppingCart',
    'Clothes': 'Shirt',
    'Household': 'Home',
    'Other': 'Package'
  };

  const categoryColors = {
    'Groceries': 'text-emerald-600 bg-emerald-50',
    'Clothes': 'text-purple-600 bg-purple-50',
    'Household': 'text-blue-600 bg-blue-50',
    'Other': 'text-gray-600 bg-gray-50'
  };

  const totalItems = items?.length;
  const completedItems = items?.filter(item => item?.completed)?.length;
  const categoryTotal = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);

  return (
    <div className="mb-6">
      <button
        onClick={() => onToggleCollapse(category)}
        className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${categoryColors?.[category]}`}>
            <Icon name={categoryIcons?.[category]} size={20} />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">{category}</h3>
            <p className="text-sm text-gray-500">
              {completedItems}/{totalItems} items • R{categoryTotal?.toFixed(2)}
            </p>
          </div>
        </div>
        <Icon 
          name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
          size={20} 
          className="text-gray-400"
        />
      </button>
      {!isCollapsed && (
        <div className="mt-3 space-y-2">
          {items?.map((item) => (
            <ItemCard
              key={item?.id}
              item={item}
              onUpdate={onUpdateItem}
              onDelete={onDeleteItem}
              onToggle={onToggleItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;