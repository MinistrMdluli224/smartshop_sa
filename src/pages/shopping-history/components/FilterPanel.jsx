import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, className = '' }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const retailerOptions = [
    { value: 'all', label: 'All Retailers' },
    { value: 'pick-n-pay', label: 'Pick n Pay' },
    { value: 'woolworths', label: 'Woolworths' },
    { value: 'checkers', label: 'Checkers' },
    { value: 'mr-price', label: 'Mr Price' },
    { value: 'spaza-shop', label: 'Spaza Shop' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'household', label: 'Household' },
    { value: 'other', label: 'Other' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'amount-desc', label: 'Highest Amount' },
    { value: 'amount-asc', label: 'Lowest Amount' },
    { value: 'items-desc', label: 'Most Items' },
    { value: 'items-asc', label: 'Least Items' }
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      dateRange: 'all',
      retailer: 'all',
      category: 'all',
      minAmount: '',
      maxAmount: '',
      sortBy: 'date-desc',
      startDate: '',
      endDate: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1002] lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-surface rounded-t-2xl border-t border-border
        lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:rounded-xl lg:border
        max-h-[80vh] overflow-y-auto
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:border-none">
          <h3 className="text-lg font-semibold text-text-primary">Filter History</h3>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            className="lg:hidden"
          />
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Date Range */}
          <div>
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={localFilters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />
            
            {localFilters?.dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <Input
                  label="Start Date"
                  type="date"
                  value={localFilters?.startDate}
                  onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={localFilters?.endDate}
                  onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
                />
              </div>
            )}
          </div>

          {/* Retailer */}
          <Select
            label="Retailer"
            options={retailerOptions}
            value={localFilters?.retailer}
            onChange={(value) => handleFilterChange('retailer', value)}
          />

          {/* Category */}
          <Select
            label="Category"
            options={categoryOptions}
            value={localFilters?.category}
            onChange={(value) => handleFilterChange('category', value)}
          />

          {/* Amount Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Amount Range (ZAR)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min amount"
                value={localFilters?.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max amount"
                value={localFilters?.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
              />
            </div>
          </div>

          {/* Sort By */}
          <Select
            label="Sort By"
            options={sortOptions}
            value={localFilters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              variant="default"
              onClick={handleApplyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;