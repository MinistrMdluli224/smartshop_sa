import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndFilters = ({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFiltersChange,
  onClearFilters 
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const discountRanges = [
    { value: 'all', label: 'All Discounts' },
    { value: '10-25', label: '10-25% Off' },
    { value: '25-50', label: '25-50% Off' },
    { value: '50+', label: '50%+ Off' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'household', label: 'Household' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'beauty', label: 'Beauty & Health' }
  ];

  const distances = [
    { value: 'all', label: 'All Locations' },
    { value: '5', label: 'Within 5km' },
    { value: '10', label: 'Within 10km' },
    { value: '25', label: 'Within 25km' }
  ];

  const hasActiveFilters = filters?.discount !== 'all' || 
                          filters?.category !== 'all' || 
                          filters?.distance !== 'all';

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search deals and products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
      </div>
      {/* Filter toggle and clear */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          iconName="Filter"
          iconPosition="left"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? 'bg-primary/10 text-primary' : ''}
        >
          Filters
          {hasActiveFilters && (
            <span className="ml-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
              •
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
            className="text-muted-foreground"
          >
            Clear
          </Button>
        )}
      </div>
      {/* Filter options */}
      {showFilters && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-4">
          {/* Discount range */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Discount Range
            </label>
            <div className="flex flex-wrap gap-2">
              {discountRanges?.map((range) => (
                <button
                  key={range?.value}
                  onClick={() => onFiltersChange({ ...filters, discount: range?.value })}
                  className={`
                    px-3 py-1.5 rounded-full text-sm transition-all duration-200
                    ${filters?.discount === range?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-muted-foreground hover:bg-muted'
                    }
                  `}
                >
                  {range?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories?.map((category) => (
                <button
                  key={category?.value}
                  onClick={() => onFiltersChange({ ...filters, category: category?.value })}
                  className={`
                    px-3 py-1.5 rounded-full text-sm transition-all duration-200
                    ${filters?.category === category?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-muted-foreground hover:bg-muted'
                    }
                  `}
                >
                  {category?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Distance
            </label>
            <div className="flex flex-wrap gap-2">
              {distances?.map((distance) => (
                <button
                  key={distance?.value}
                  onClick={() => onFiltersChange({ ...filters, distance: distance?.value })}
                  className={`
                    px-3 py-1.5 rounded-full text-sm transition-all duration-200
                    ${filters?.distance === distance?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-muted-foreground hover:bg-muted'
                    }
                  `}
                >
                  {distance?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;