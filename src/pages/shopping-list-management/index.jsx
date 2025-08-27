import React, { useState, useEffect, useMemo } from 'react';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import NavigationSpacer from '../../components/ui/NavigationSpacer';
import ListHeader from './components/ListHeader';
import SearchAndFilter from './components/SearchAndFilter';
import CategorySection from './components/CategorySection';
import TotalSummary from './components/TotalSummary';
import FloatingAddButton from './components/FloatingAddButton';
import BulkActions from './components/BulkActions';

const ShoppingListManagement = () => {
  // Mock shopping list data
  const [shoppingList] = useState({
    id: 1,
    name: "Weekly Groceries",
    budget: 1500.00,
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date()
  });

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Milk (2L)",
      price: 25.99,
      quantity: 2,
      category: "Groceries",
      completed: false,
      addedAt: new Date('2025-01-20T10:30:00')
    },
    {
      id: 2,
      name: "Bread (White)",
      price: 18.50,
      quantity: 1,
      category: "Groceries",
      completed: true,
      addedAt: new Date('2025-01-20T10:32:00')
    },
    {
      id: 3,
      name: "Chicken Breast (1kg)",
      price: 89.99,
      quantity: 1,
      category: "Groceries",
      completed: false,
      addedAt: new Date('2025-01-20T10:35:00')
    },
    {
      id: 4,
      name: "Jeans",
      price: 299.99,
      quantity: 1,
      category: "Clothes",
      completed: false,
      addedAt: new Date('2025-01-20T11:00:00')
    },
    {
      id: 5,
      name: "Dish Soap",
      price: 32.99,
      quantity: 1,
      category: "Household",
      completed: false,
      addedAt: new Date('2025-01-20T11:15:00')
    },
    {
      id: 6,
      name: "Toilet Paper (8 pack)",
      price: 45.99,
      quantity: 1,
      category: "Household",
      completed: true,
      addedAt: new Date('2025-01-20T11:20:00')
    },
    {
      id: 7,
      name: "Phone Charger",
      price: 129.99,
      quantity: 1,
      category: "Other",
      completed: false,
      addedAt: new Date('2025-01-20T12:00:00')
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [syncStatus] = useState('synced');
  const [isEditingName, setIsEditingName] = useState(false);

  // Filter and search items
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(item =>
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered?.filter(item => item?.category === activeFilter);
    }

    return filtered;
  }, [items, searchQuery, activeFilter]);

  // Group items by category
  const itemsByCategory = useMemo(() => {
    const categories = ['Groceries', 'Clothes', 'Household', 'Other'];
    const grouped = {};

    categories?.forEach(category => {
      grouped[category] = filteredItems?.filter(item => item?.category === category);
    });

    return grouped;
  }, [filteredItems]);

  // Calculate item counts for filters
  const itemCounts = useMemo(() => {
    const counts = {
      all: items?.length,
      Groceries: items?.filter(item => item?.category === 'Groceries')?.length,
      Clothes: items?.filter(item => item?.category === 'Clothes')?.length,
      Household: items?.filter(item => item?.category === 'Household')?.length,
      Other: items?.filter(item => item?.category === 'Other')?.length
    };
    return counts;
  }, [items]);

  // Calculate totals
  const totalAmount = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const totalItems = items?.length;
  const completedItems = items?.filter(item => item?.completed)?.length;

  // Item management functions
  const handleUpdateItem = (itemId, updates) => {
    setItems(prevItems =>
      prevItems?.map(item =>
        item?.id === itemId ? { ...item, ...updates } : item
      )
    );
  };

  const handleDeleteItem = (itemId) => {
    setItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
    setSelectedItems(prev => prev?.filter(id => id !== itemId));
  };

  const handleToggleItem = (itemId) => {
    setItems(prevItems =>
      prevItems?.map(item =>
        item?.id === itemId ? { ...item, completed: !item?.completed } : item
      )
    );
  };

  const handleToggleCategory = (category) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev?.[category]
    }));
  };

  // Bulk actions
  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  const handleDeleteSelected = () => {
    setItems(prevItems => prevItems?.filter(item => !selectedItems?.includes(item?.id)));
    setSelectedItems([]);
  };

  const handleMarkCompleted = () => {
    setItems(prevItems =>
      prevItems?.map(item =>
        selectedItems?.includes(item?.id) ? { ...item, completed: true } : item
      )
    );
    setSelectedItems([]);
  };

  const handleMarkIncomplete = () => {
    setItems(prevItems =>
      prevItems?.map(item =>
        selectedItems?.includes(item?.id) ? { ...item, completed: false } : item
      )
    );
    setSelectedItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ListHeader
        listName={shoppingList?.name}
        totalItems={totalItems}
        totalCost={totalAmount}
        syncStatus={syncStatus}
        onEditName={() => setIsEditingName(true)}
        onBack={() => {}}
      />
      <div className="px-4 py-6">
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          itemCounts={itemCounts}
        />

        <TotalSummary
          totalAmount={totalAmount}
          totalItems={totalItems}
          completedItems={completedItems}
          budget={shoppingList?.budget}
        />

        <div className="space-y-6">
          {Object.entries(itemsByCategory)?.map(([category, categoryItems]) => {
            if (categoryItems?.length === 0) return null;

            return (
              <CategorySection
                key={category}
                category={category}
                items={categoryItems}
                onUpdateItem={handleUpdateItem}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
                isCollapsed={collapsedCategories?.[category]}
                onToggleCollapse={handleToggleCategory}
              />
            );
          })}
        </div>

        {filteredItems?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Start adding items to your shopping list'}
            </p>
          </div>
        )}
      </div>
      <FloatingAddButton onClick={() => {}} />
      <BulkActions
        selectedItems={selectedItems}
        onClearSelection={handleClearSelection}
        onDeleteSelected={handleDeleteSelected}
        onMarkCompleted={handleMarkCompleted}
        onMarkIncomplete={handleMarkIncomplete}
      />
      <NavigationSpacer height={80}>
        <BottomTabNavigation />
      </NavigationSpacer>
    </div>
  );
};

export default ShoppingListManagement;