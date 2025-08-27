import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchAndFilter = ({ 
  searchQuery, 
  onSearchChange, 
  activeFilter, 
  onFilterChange,
  itemCounts 
}) => {
  const filters = [
    { id: 'all', label: 'All', count: itemCounts?.all },
    { id: 'Groceries', label: 'Groceries', count: itemCounts?.Groceries },
    { id: 'Clothes', label: 'Clothes', count: itemCounts?.Clothes },
    { id: 'Household', label: 'Household', count: itemCounts?.Household },
    { id: 'Other', label: 'Other', count: itemCounts?.Other }
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div className="relative">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search items in your list..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>
      {/* Filter Chips */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filters?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => onFilterChange(filter?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
              activeFilter === filter?.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="font-medium">{filter?.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeFilter === filter?.id
                ? 'bg-white/20 text-white' :'bg-gray-200 text-gray-600'
            }`}>
              {filter?.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;