import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import NavigationSpacer from '../../components/ui/NavigationSpacer';
import SyncStatusBadge from '../../components/ui/SyncStatusBadge';
import RetailerFilterChips from './components/RetailerFilterChips';
import SearchAndFilters from './components/SearchAndFilters';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import DealsGrid from './components/DealsGrid';
import PullToRefresh from './components/PullToRefresh';

const SaleAlertsDeals = () => {
  const navigate = useNavigate();
  const [selectedRetailer, setSelectedRetailer] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    discount: 'all',
    category: 'all',
    distance: 'all'
  });
  const [deals, setDeals] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [syncStatus, setSyncStatus] = useState('synced');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock deals data
  const mockDeals = [
    {
      id: 1,
      productName: "Coca-Cola 2L Bottle",
      retailer: "picknpay",
      originalPrice: 25.99,
      salePrice: 19.99,
      category: "groceries",
      image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400",
      validUntil: "2025-08-30",
      location: "Sandton City",
      featured: true
    },
    {
      id: 2,
      productName: "Woolworths Organic Chicken Breast 1kg",
      retailer: "woolworths",
      originalPrice: 89.99,
      salePrice: 69.99,
      category: "groceries",
      image: "https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400",
      validUntil: "2025-08-28",
      location: "Rosebank Mall"
    },
    {
      id: 3,
      productName: "Samsung Galaxy Earbuds",
      retailer: "checkers",
      originalPrice: 1299.99,
      salePrice: 899.99,
      category: "electronics",
      image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400",
      validUntil: "2025-09-05",
      location: "Eastgate Shopping Centre"
    },
    {
      id: 4,
      productName: "Mr Price Denim Jeans",
      retailer: "mrprice",
      originalPrice: 299.99,
      salePrice: 199.99,
      category: "clothes",
      image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400",
      validUntil: "2025-09-01",
      location: "Canal Walk"
    },
    {
      id: 5,
      productName: "Sunlight Dishwashing Liquid 750ml",
      retailer: "picknpay",
      originalPrice: 34.99,
      salePrice: 24.99,
      category: "household",
      image: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400",
      validUntil: "2025-08-31",
      location: "Menlyn Park"
    },
    {
      id: 6,
      productName: "Nivea Face Cream 50ml",
      retailer: "checkers",
      originalPrice: 79.99,
      salePrice: 59.99,
      category: "beauty",
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400",
      validUntil: "2025-09-03",
      location: "V&A Waterfront"
    }
  ];

  // Mock recommendations based on shopping history
  const mockRecommendations = [
    {
      id: 101,
      productName: "Bread - White Loaf",
      retailer: "woolworths",
      originalPrice: 18.99,
      salePrice: 14.99,
      category: "groceries",
      image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400",
      reason: "In your shopping list"
    },
    {
      id: 102,
      productName: "Milk - Full Cream 2L",
      retailer: "picknpay",
      originalPrice: 32.99,
      salePrice: 27.99,
      category: "groceries",
      image: "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400",
      reason: "Frequently bought"
    }
  ];

  // Filter deals based on current filters
  const filteredDeals = deals?.filter(deal => {
    // Retailer filter
    if (selectedRetailer !== 'all' && deal?.retailer !== selectedRetailer) {
      return false;
    }

    // Search filter
    if (searchQuery && !deal?.productName?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters?.category !== 'all' && deal?.category !== filters?.category) {
      return false;
    }

    // Discount filter
    if (filters?.discount !== 'all') {
      const discountPercent = Math.round(((deal?.originalPrice - deal?.salePrice) / deal?.originalPrice) * 100);
      switch (filters?.discount) {
        case '10-25':
          return discountPercent >= 10 && discountPercent <= 25;
        case '25-50':
          return discountPercent >= 25 && discountPercent <= 50;
        case '50+':
          return discountPercent >= 50;
        default:
          return true;
      }
    }

    return true;
  });

  // Load initial data
  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      setSyncStatus('syncing');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDeals(mockDeals);
      setRecommendations(mockRecommendations);
      setLoading(false);
      setSyncStatus('synced');
      setLastRefresh(new Date());
    };

    loadDeals();
  }, []);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setSyncStatus('syncing');
    
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add some new deals or update existing ones
    const updatedDeals = [...mockDeals];
    setDeals(updatedDeals);
    setSyncStatus('synced');
    setLastRefresh(new Date());
  }, []);

  // Handle add to list
  const handleAddToList = useCallback((deal) => {
    // In a real app, this would add to the shopping list
    console.log('Adding to list:', deal?.productName);
    
    // Show success feedback
    const event = new CustomEvent('showToast', {
      detail: {
        message: `${deal.productName} added to your shopping list`,
        type: 'success'
      }
    });
    window.dispatchEvent(event);
  }, []);

  // Handle set alert
  const handleSetAlert = useCallback((deal) => {
    // In a real app, this would set up price alerts
    console.log('Setting alert for:', deal?.productName);
    
    // Show success feedback
    const event = new CustomEvent('showToast', {
      detail: {
        message: `Price alert set for ${deal.productName}`,
        type: 'success'
      }
    });
    window.dispatchEvent(event);
  }, []);

  // Handle load more
  const handleLoadMore = useCallback(async () => {
    setLoading(true);
    
    // Simulate loading more deals
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would load more deals from API
    setHasMore(false); // No more deals to load in this demo
    setLoading(false);
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSelectedRetailer('all');
    setSearchQuery('');
    setFilters({
      discount: 'all',
      category: 'all',
      distance: 'all'
    });
  }, []);

  // Handle share deal
  const handleShareDeal = useCallback(async (deal) => {
    const shareData = {
      title: `Great Deal: ${deal?.productName}`,
      text: `Save R${(deal?.originalPrice - deal?.salePrice)?.toFixed(2)} on ${deal?.productName} at ${deal?.retailer}!`,
      url: window.location?.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback for browsers without Web Share API
      const text = `${shareData?.title}\n${shareData?.text}\n${shareData?.url}`;
      if (navigator.clipboard) {
        await navigator.clipboard?.writeText(text);
        const event = new CustomEvent('showToast', {
          detail: {
            message: 'Deal details copied to clipboard',
            type: 'success'
          }
        });
        window.dispatchEvent(event);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">Sale Alerts & Deals</h1>
            <SyncStatusBadge status={syncStatus} size="sm" />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              onClick={() => navigate('/user-settings-profile')}
              className="h-9 w-9 p-0"
              title="Notification settings"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Share2"
              onClick={() => handleShareDeal(filteredDeals?.[0])}
              className="h-9 w-9 p-0"
              title="Share deals"
            />
          </div>
        </div>

        {/* Retailer filter chips */}
        <div className="px-4 pb-3">
          <RetailerFilterChips
            selectedRetailer={selectedRetailer}
            onRetailerChange={setSelectedRetailer}
          />
        </div>
      </header>
      {/* Main content */}
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="px-4 py-6">
          {/* Search and filters */}
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
          />

          {/* Personalized recommendations */}
          <div className="mt-6">
            <PersonalizedRecommendations
              recommendations={recommendations}
              onAddToList={handleAddToList}
              onSetAlert={handleSetAlert}
            />
          </div>

          {/* Deals grid */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                {filteredDeals?.length > 0 
                  ? `${filteredDeals?.length} Deal${filteredDeals?.length !== 1 ? 's' : ''} Found`
                  : 'Current Deals'
                }
              </h2>
              
              {lastRefresh && (
                <p className="text-xs text-muted-foreground">
                  Updated {lastRefresh?.toLocaleTimeString('en-ZA', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              )}
            </div>

            <DealsGrid
              deals={filteredDeals}
              loading={loading}
              onAddToList={handleAddToList}
              onSetAlert={handleSetAlert}
              onRefresh={handleRefresh}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </div>
        </main>
      </PullToRefresh>
      {/* Navigation spacer and bottom navigation */}
      <NavigationSpacer>
        <BottomTabNavigation />
      </NavigationSpacer>
    </div>
  );
};

export default SaleAlertsDeals;