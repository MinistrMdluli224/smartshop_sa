import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const searchSuggestions = [
    'Pick n Pay',
    'Woolworths',
    'Bread',
    'Milk',
    'Groceries',
    'This week',
    'Last month'
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              placeholder="Search history, items, or stores..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full pl-10 pr-10 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          {isSearchFocused && searchQuery?.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-lg z-50">
              <div className="p-3">
                <p className="text-sm font-medium text-text-primary mb-2">Recent Searches</p>
                <div className="flex flex-wrap gap-2">
                  {searchSuggestions?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        onSearch(suggestion);
                      }}
                      className="px-3 py-1.5 text-sm bg-muted text-text-secondary rounded-lg hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Button */}
        <Button
          variant="outline"
          size="default"
          iconName="Filter"
          onClick={onFilterToggle}
          className="px-4 py-3"
        />
      </div>
      {/* Active Search Indicator */}
      {searchQuery && (
        <div className="flex items-center justify-between mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Search" size={16} className="text-primary" />
            <span className="text-sm text-primary">
              Searching for: <strong>"{searchQuery}"</strong>
            </span>
          </div>
          <button
            onClick={handleClearSearch}
            className="text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;