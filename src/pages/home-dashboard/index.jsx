import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';

import WelcomeHeader from './components/WelcomeHeader';
import ShoppingListSummaryCard from './components/ShoppingListSummaryCard';
import SaleAlertsSection from './components/SaleAlertsSection';
import QuickActionsGrid from './components/QuickActionsGrid';
import RecentActivityFeed from './components/RecentActivityFeed';
import Icon from '../../components/AppIcon';

const HomeDashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock current shopping list data
  const [currentList, setCurrentList] = useState({
    itemCount: 12,
    estimatedTotal: 456.75,
    listName: "Weekly Groceries",
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  });

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('smartshop_language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate loading current shopping list data
    const loadDashboardData = async () => {
      // In real app, this would fetch from API or local storage
      // For now, using mock data defined above
    };

    loadDashboardData();
  }, []);

  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      // In real app, this would sync with server and update local data
      setCurrentList(prev => ({
        ...prev,
        lastUpdated: new Date()
      }));
      setIsRefreshing(false);
    }, 1500);
  };

  const handleEmergencyContact = () => {
    // Mock emergency contact feature
    window.open('tel:+27123456789', '_self');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* Welcome Header */}
          <WelcomeHeader />

          {/* Current Shopping List Summary */}
          <ShoppingListSummaryCard
            itemCount={currentList?.itemCount}
            estimatedTotal={currentList?.estimatedTotal}
            listName={currentList?.listName}
            lastUpdated={currentList?.lastUpdated}
          />

          {/* Sale Alerts Section */}
          <SaleAlertsSection />

          {/* Quick Actions Grid */}
          <QuickActionsGrid />

          {/* Recent Activity Feed */}
          <RecentActivityFeed />

          {/* Pull to Refresh Indicator */}
          {isRefreshing && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-card border border-border rounded-full px-4 py-2 shadow-lg flex items-center space-x-2">
                <Icon name="RefreshCw" size={16} className="animate-spin text-primary" />
                <span className="text-sm text-card-foreground">
                  {currentLanguage === 'zu' ? 'Kuvuselelwa...' : 'Refreshing...'}
                </span>
              </div>
            </div>
          )}

          {/* Emergency Contact Button - Hidden by default, shown when needed */}
          <div className="fixed bottom-24 right-4 z-40">
            <button
              onClick={handleEmergencyContact}
              className="w-12 h-12 bg-error text-error-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 opacity-0 pointer-events-none"
              aria-label="Emergency Contact"
            >
              <Icon name="Phone" size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <BottomTabNavigation />
      {/* Pull to Refresh Handler */}
      <div
        className="absolute top-0 left-0 right-0 h-20 z-10"
        onTouchStart={(e) => {
          const startY = e?.touches?.[0]?.clientY;
          
          const handleTouchMove = (e) => {
            const currentY = e?.touches?.[0]?.clientY;
            const diff = currentY - startY;
            
            if (diff > 100 && window.scrollY === 0) {
              handlePullToRefresh();
              document.removeEventListener('touchmove', handleTouchMove);
            }
          };
          
          document.addEventListener('touchmove', handleTouchMove);
          
          setTimeout(() => {
            document.removeEventListener('touchmove', handleTouchMove);
          }, 1000);
        }}
      />
    </div>
  );
};

export default HomeDashboard;