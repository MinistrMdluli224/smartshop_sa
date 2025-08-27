import React from 'react';
import Icon from '../../../components/AppIcon';

const TotalSummary = ({ 
  totalAmount, 
  totalItems, 
  completedItems, 
  budget = null,
  taxRate = 0.15 
}) => {
  const subtotal = totalAmount / (1 + taxRate);
  const tax = totalAmount - subtotal;
  const budgetRemaining = budget ? budget - totalAmount : null;
  const isOverBudget = budget && totalAmount > budget;
  const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Shopping Summary</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Icon name="ShoppingCart" size={16} />
          <span>{completedItems}/{totalItems} items</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(completionPercentage)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      {/* Cost Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">R{subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">VAT (15%)</span>
          <span className="font-medium">R{tax?.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">R{totalAmount?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Budget Information */}
      {budget && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={isOverBudget ? "AlertTriangle" : "Target"} 
                size={16} 
                className={isOverBudget ? "text-red-500" : "text-emerald-500"}
              />
              <span className="text-sm font-medium text-gray-700">Budget</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">R{budget?.toFixed(2)}</div>
              <div className={`text-sm font-medium ${
                isOverBudget ? 'text-red-600' : 'text-emerald-600'
              }`}>
                {isOverBudget ? 'Over by ' : 'Remaining '}
                R{Math.abs(budgetRemaining)?.toFixed(2)}
              </div>
            </div>
          </div>
          
          {/* Budget Progress Bar */}
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isOverBudget ? 'bg-red-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min((totalAmount / budget) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            <Icon name="Share2" size={16} />
            <span className="text-sm font-medium">Share List</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors duration-200">
            <Icon name="Save" size={16} />
            <span className="text-sm font-medium">Save Template</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalSummary;