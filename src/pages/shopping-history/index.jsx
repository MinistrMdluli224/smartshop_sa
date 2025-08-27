import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import NavigationSpacer from '../../components/ui/NavigationSpacer';
import SpendingChart from './components/SpendingChart';
import HistoryCard from './components/HistoryCard';
import FilterPanel from './components/FilterPanel';
import SpendingInsights from './components/SpendingInsights';
import SearchBar from './components/SearchBar';
import ExportOptions from './components/ExportOptions';

const ShoppingHistory = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedDateRange, setSelectedDateRange] = useState('month');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    retailer: 'all',
    category: 'all',
    minAmount: '',
    maxAmount: '',
    sortBy: 'date-desc',
    startDate: '',
    endDate: ''
  });

  // Mock shopping history data
  const shoppingHistory = [
    {
      id: 1,
      date: new Date('2024-08-25T14:30:00'),
      store: 'Pick n Pay',
      total: 485.50,
      itemCount: 12,
      hasSavings: true,
      savings: 45.20,
      paymentMethod: 'Card',
      items: [
        { name: 'White Bread', category: 'Groceries', price: 18.99, originalPrice: 22.99, quantity: 2 },
        { name: 'Full Cream Milk 2L', category: 'Groceries', price: 24.99, quantity: 1 },
        { name: 'Chicken Breasts 1kg', category: 'Groceries', price: 89.99, originalPrice: 99.99, quantity: 1 },
        { name: 'Bananas 1kg', category: 'Groceries', price: 19.99, quantity: 1 },
        { name: 'Tomatoes 1kg', category: 'Groceries', price: 25.99, quantity: 1 },
        { name: 'Dishwashing Liquid', category: 'Household', price: 32.99, quantity: 1 }
      ]
    },
    {
      id: 2,
      date: new Date('2024-08-23T10:15:00'),
      store: 'Woolworths',
      total: 320.75,
      itemCount: 8,
      hasSavings: false,
      savings: 0,
      paymentMethod: 'Cash',
      items: [
        { name: 'Organic Apples 1kg', category: 'Groceries', price: 45.99, quantity: 1 },
        { name: 'Free Range Eggs', category: 'Groceries', price: 38.99, quantity: 1 },
        { name: 'Whole Wheat Bread', category: 'Groceries', price: 28.99, quantity: 1 },
        { name: 'Greek Yogurt', category: 'Groceries', price: 42.99, quantity: 2 },
        { name: 'Olive Oil 500ml', category: 'Groceries', price: 89.99, quantity: 1 }
      ]
    },
    {
      id: 3,
      date: new Date('2024-08-20T16:45:00'),
      store: 'Checkers',
      total: 156.25,
      itemCount: 6,
      hasSavings: true,
      savings: 23.50,
      paymentMethod: 'Card',
      items: [
        { name: 'Pasta 500g', category: 'Groceries', price: 18.99, originalPrice: 22.99, quantity: 2 },
        { name: 'Pasta Sauce', category: 'Groceries', price: 24.99, quantity: 1 },
        { name: 'Cheese Block', category: 'Groceries', price: 65.99, originalPrice: 75.99, quantity: 1 },
        { name: 'Toilet Paper 9 Pack', category: 'Household', price: 45.99, quantity: 1 }
      ]
    },
    {
      id: 4,
      date: new Date('2024-08-18T12:20:00'),
      store: 'Mr Price',
      total: 299.00,
      itemCount: 3,
      hasSavings: true,
      savings: 150.00,
      paymentMethod: 'Card',
      items: [
        { name: 'Cotton T-Shirt', category: 'Clothes', price: 99.00, originalPrice: 149.00, quantity: 2 },
        { name: 'Denim Jeans', category: 'Clothes', price: 199.00, originalPrice: 299.00, quantity: 1 }
      ]
    },
    {
      id: 5,
      date: new Date('2024-08-15T09:30:00'),
      store: 'Spaza Shop',
      total: 85.50,
      itemCount: 8,
      hasSavings: false,
      savings: 0,
      paymentMethod: 'Cash',
      items: [
        { name: 'Maize Meal 2.5kg', category: 'Groceries', price: 35.00, quantity: 1 },
        { name: 'Sugar 2kg', category: 'Groceries', price: 28.50, quantity: 1 },
        { name: 'Cooking Oil 750ml', category: 'Groceries', price: 22.00, quantity: 1 }
      ]
    }
  ];

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartshop_language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const dateRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' }
  ];

  const totalSpent = shoppingHistory?.reduce((sum, session) => sum + session?.total, 0);
  const totalSavings = shoppingHistory?.reduce((sum, session) => sum + session?.savings, 0);

  const handleShopAgain = (session) => {
    // Navigate to shopping list with pre-filled items
    navigate('/shopping-list-management', { 
      state: { 
        prefilledItems: session?.items?.map(item => ({
          name: item?.name,
          category: item?.category,
          price: item?.price
        }))
      }
    });
  };

  const handleShare = (session) => {
    if (navigator.share) {
      navigator.share({
        title: `Shopping Receipt - ${session?.store}`,
        text: `Shopped at ${session?.store} on ${new Date(session.date)?.toLocaleDateString('en-ZA')}. Total: R${session?.total?.toFixed(2)}`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers without Web Share API
      const shareText = `Shopped at ${session?.store} on ${new Date(session.date)?.toLocaleDateString('en-ZA')}. Total: R${session?.total?.toFixed(2)}`;
      navigator.clipboard?.writeText(shareText);
      alert('Receipt details copied to clipboard!');
    }
  };

  const handleAddToTemplate = (session) => {
    // Save as template logic
    const template = {
      name: `${session?.store} Template`,
      items: session?.items,
      createdAt: new Date()
    };
    
    const existingTemplates = JSON.parse(localStorage.getItem('shopping_templates') || '[]');
    existingTemplates?.push(template);
    localStorage.setItem('shopping_templates', JSON.stringify(existingTemplates));
    
    alert('Shopping list saved as template!');
  };

  const handleExport = async ({ format, range }) => {
    // Mock export functionality
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Exporting ${format} for ${range}`);
        alert(`Export completed! ${format.toUpperCase()} file downloaded.`);
        resolve();
      }, 2000);
    });
  };

  const filteredHistory = shoppingHistory?.filter(session => {
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      return (session?.store?.toLowerCase()?.includes(query) || session?.items?.some(item => item?.name?.toLowerCase()?.includes(query)));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Shopping History</h1>
              <p className="text-sm text-text-secondary">
                Track your spending and purchase patterns
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="BarChart3"
                onClick={() => setShowInsights(!showInsights)}
              />
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={() => setShowExportModal(true)}
              />
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-primary/5 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-primary">R{totalSpent?.toLocaleString()}</p>
              <p className="text-xs text-text-secondary">Total Spent</p>
            </div>
            <div className="bg-success/5 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-success">R{totalSavings?.toLocaleString()}</p>
              <p className="text-xs text-text-secondary">Total Saved</p>
            </div>
            <div className="bg-secondary/5 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-secondary">{shoppingHistory?.length}</p>
              <p className="text-xs text-text-secondary">Shopping Trips</p>
            </div>
            <div className="bg-accent/5 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-accent">
                {Math.round(totalSpent / shoppingHistory?.length)}
              </p>
              <p className="text-xs text-text-secondary">Avg per Trip</p>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Charts and Insights */}
          <div className="lg:col-span-3 space-y-6">
            {/* Spending Chart */}
            <SpendingChart />

            {/* Search and Filter */}
            <SearchBar
              onSearch={setSearchQuery}
              onFilterToggle={() => setShowFilterPanel(true)}
            />

            {/* Insights Panel */}
            {showInsights && (
              <SpendingInsights />
            )}

            {/* History List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-text-primary">Recent Purchases</h2>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {filteredHistory?.length} {filteredHistory?.length === 1 ? 'trip' : 'trips'}
                  </span>
                </div>
              </div>

              {filteredHistory?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={24} className="text-text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">No results found</h3>
                  <p className="text-text-secondary">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredHistory?.map((session) => (
                    <HistoryCard
                      key={session?.id}
                      session={session}
                      onShopAgain={handleShopAgain}
                      onShare={handleShare}
                      onAddToTemplate={handleAddToTemplate}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Filter Panel (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFiltersChange={setFilters}
                className="relative"
              />
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={filters}
        onFiltersChange={setFilters}
        className="lg:hidden"
      />
      {/* Export Modal */}
      <ExportOptions
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />
      {/* Navigation Spacer */}
      <NavigationSpacer />
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default ShoppingHistory;