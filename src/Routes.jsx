import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import UserSettingsProfile from './pages/user-settings-profile';
import SmartItemCapture from './pages/smart-item-capture';
import ShoppingListManagement from './pages/shopping-list-management';
import SaleAlertsDeals from './pages/sale-alerts-deals';
import ShoppingHistory from './pages/shopping-history';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/user-settings-profile" element={<UserSettingsProfile />} />
        <Route path="/smart-item-capture" element={<SmartItemCapture />} />
        <Route path="/shopping-list-management" element={<ShoppingListManagement />} />
        <Route path="/sale-alerts-deals" element={<SaleAlertsDeals />} />
        <Route path="/shopping-history" element={<ShoppingHistory />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
