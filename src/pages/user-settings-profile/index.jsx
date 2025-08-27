import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import NavigationSpacer from '../../components/ui/NavigationSpacer';
import SyncStatusBadge from '../../components/ui/SyncStatusBadge';
import SettingsHeader from './components/SettingsHeader';
import SettingsSection from './components/SettingsSection';
import ToggleSwitch from './components/ToggleSwitch';
import BudgetManager from './components/BudgetManager';
import RetailerPreferences from './components/RetailerPreferences';
import DataUsageControls from './components/DataUsageControls';
import LanguageSelector from './components/LanguageSelector';
import AccountActions from './components/AccountActions';
import Select from '../../components/ui/Select';




const UserSettingsProfile = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const [user] = useState({
    name: "Thabo Mthembu",
    email: "thabo.mthembu@gmail.com",
    phone: "+27 82 123 4567",
    location: "Johannesburg, Gauteng"
  });

  // Language and localization settings
  const [languageSettings, setLanguageSettings] = useState(() => {
    const saved = localStorage.getItem('smartshop_language');
    return saved ? JSON.parse(saved) : {
      language: 'en',
      currencyFormat: 'standard',
      dateFormat: 'dmy'
    };
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    saleAlerts: true,
    priceDrops: true,
    weeklySummary: false,
    budgetAlerts: true,
    newFeatures: true,
    marketing: false
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    locationAccess: true,
    purchaseHistory: true,
    analytics: false,
    crashReports: true
  });

  // App preferences
  const [appPreferences, setAppPreferences] = useState({
    offlineSync: true,
    cameraPermissions: true,
    defaultCategory: 'groceries',
    autoSave: true,
    darkMode: false
  });

  // Budget settings
  const [budget, setBudget] = useState({
    monthlyLimit: 3500.00,
    currentSpent: 2847.50,
    alertThreshold: 80
  });

  // Retailer preferences
  const [retailerPrefs, setRetailerPrefs] = useState({
    enabledRetailers: ['picknpay', 'woolworths', 'checkers'],
    locationRadius: 10,
    priceComparison: true
  });

  // Data usage settings
  const [dataUsage, setDataUsage] = useState({
    syncFrequency: 'hourly',
    imageQuality: 'medium',
    backgroundSync: true,
    autoBackup: true,
    wifiOnlySync: false,
    compressData: true
  });

  // Sync status
  const [syncStatus, setSyncStatus] = useState('synced');
  const [pendingChanges, setPendingChanges] = useState(0);

  // Save language settings to localStorage
  useEffect(() => {
    localStorage.setItem('smartshop_language', JSON.stringify(languageSettings));
  }, [languageSettings]);

  // Category options
  const categoryOptions = [
    { value: 'groceries', label: 'Groceries' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'household', label: 'Household' },
    { value: 'other', label: 'Other' }
  ];

  const handleEditProfile = () => {
    // Mock edit profile action
    console.log('Edit profile clicked');
  };

  const handleAccountAction = (action) => {
    switch (action) {
      case 'export':
        setSyncStatus('syncing');
        setTimeout(() => {
          setSyncStatus('synced');
          alert('Data export completed! Check your downloads.');
        }, 2000);
        break;
      case 'privacy':
        window.open('/privacy-policy', '_blank');
        break;
      case 'support':
        window.open('mailto:support@smartshop.co.za', '_blank');
        break;
      case 'logout':
        if (confirm('Are you sure you want to sign out?')) {
          localStorage.clear();
          navigate('/');
        }
        break;
      case 'delete':
        alert('Account deletion initiated. You will receive a confirmation email.');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleSettingChange = (category, key, value) => {
    setPendingChanges(prev => prev + 1);
    setSyncStatus('syncing');
    
    // Simulate sync delay
    setTimeout(() => {
      setSyncStatus('synced');
      setPendingChanges(prev => Math.max(0, prev - 1));
    }, 1000);

    switch (category) {
      case 'notifications':
        setNotifications(prev => ({ ...prev, [key]: value }));
        break;
      case 'privacy':
        setPrivacy(prev => ({ ...prev, [key]: value }));
        break;
      case 'appPreferences':
        setAppPreferences(prev => ({ ...prev, [key]: value }));
        break;
      default:
        console.log('Unknown category:', category);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SettingsHeader user={user} onEditProfile={handleEditProfile} />
      {/* Sync Status */}
      <div className="relative">
        <SyncStatusBadge 
          status={syncStatus} 
          count={pendingChanges}
          className="top-4 right-4"
        />
      </div>
      {/* Main Content */}
      <div className="px-4 py-6 space-y-4">
        
        {/* Account Settings */}
        <SettingsSection
          title="Account Settings"
          description="Language, currency, and profile preferences"
          icon="User"
          defaultExpanded={true}
        >
          <LanguageSelector
            currentLanguage={languageSettings}
            onLanguageChange={setLanguageSettings}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          title="Notifications"
          description="Manage your alert preferences"
          icon="Bell"
        >
          <div className="space-y-1">
            <ToggleSwitch
              label="Sale Alerts"
              description="Get notified about sales and discounts"
              enabled={notifications?.saleAlerts}
              onChange={(value) => handleSettingChange('notifications', 'saleAlerts', value)}
            />
            <ToggleSwitch
              label="Price Drop Alerts"
              description="Notify when tracked items go on sale"
              enabled={notifications?.priceDrops}
              onChange={(value) => handleSettingChange('notifications', 'priceDrops', value)}
            />
            <ToggleSwitch
              label="Weekly Summary"
              description="Weekly spending and savings report"
              enabled={notifications?.weeklySummary}
              onChange={(value) => handleSettingChange('notifications', 'weeklySummary', value)}
            />
            <ToggleSwitch
              label="Budget Alerts"
              description="Warn when approaching spending limits"
              enabled={notifications?.budgetAlerts}
              onChange={(value) => handleSettingChange('notifications', 'budgetAlerts', value)}
            />
            <ToggleSwitch
              label="New Features"
              description="Updates about new app features"
              enabled={notifications?.newFeatures}
              onChange={(value) => handleSettingChange('notifications', 'newFeatures', value)}
            />
            <ToggleSwitch
              label="Marketing"
              description="Promotional offers and tips"
              enabled={notifications?.marketing}
              onChange={(value) => handleSettingChange('notifications', 'marketing', value)}
            />
          </div>
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection
          title="Privacy & Security"
          description="Control your data and privacy settings"
          icon="Shield"
        >
          <div className="space-y-1">
            <ToggleSwitch
              label="Data Sharing"
              description="Share anonymous usage data to improve the app"
              enabled={privacy?.dataSharing}
              onChange={(value) => handleSettingChange('privacy', 'dataSharing', value)}
            />
            <ToggleSwitch
              label="Location Access"
              description="Use location for nearby store recommendations"
              enabled={privacy?.locationAccess}
              onChange={(value) => handleSettingChange('privacy', 'locationAccess', value)}
            />
            <ToggleSwitch
              label="Purchase History"
              description="Save shopping history for insights"
              enabled={privacy?.purchaseHistory}
              onChange={(value) => handleSettingChange('privacy', 'purchaseHistory', value)}
            />
            <ToggleSwitch
              label="Analytics"
              description="Help improve the app with usage analytics"
              enabled={privacy?.analytics}
              onChange={(value) => handleSettingChange('privacy', 'analytics', value)}
            />
            <ToggleSwitch
              label="Crash Reports"
              description="Automatically send crash reports"
              enabled={privacy?.crashReports}
              onChange={(value) => handleSettingChange('privacy', 'crashReports', value)}
            />
          </div>
        </SettingsSection>

        {/* App Preferences */}
        <SettingsSection
          title="App Preferences"
          description="Customize your app experience"
          icon="Settings"
        >
          <div className="space-y-4">
            <ToggleSwitch
              label="Offline Sync"
              description="Sync data when connection is restored"
              enabled={appPreferences?.offlineSync}
              onChange={(value) => handleSettingChange('appPreferences', 'offlineSync', value)}
            />
            <ToggleSwitch
              label="Camera Permissions"
              description="Allow camera access for price scanning"
              enabled={appPreferences?.cameraPermissions}
              onChange={(value) => handleSettingChange('appPreferences', 'cameraPermissions', value)}
            />
            <ToggleSwitch
              label="Auto Save"
              description="Automatically save changes to lists"
              enabled={appPreferences?.autoSave}
              onChange={(value) => handleSettingChange('appPreferences', 'autoSave', value)}
            />
            <ToggleSwitch
              label="Dark Mode"
              description="Use dark theme (coming soon)"
              enabled={appPreferences?.darkMode}
              disabled
              onChange={(value) => handleSettingChange('appPreferences', 'darkMode', value)}
            />
            
            <Select
              label="Default Category"
              description="Default category for new items"
              options={categoryOptions}
              value={appPreferences?.defaultCategory}
              onChange={(value) => handleSettingChange('appPreferences', 'defaultCategory', value)}
            />
          </div>
        </SettingsSection>

        {/* Budget Management */}
        <SettingsSection
          title="Budget Management"
          description="Set spending limits and track expenses"
          icon="DollarSign"
        >
          <BudgetManager
            budget={budget}
            onUpdateBudget={setBudget}
          />
        </SettingsSection>

        {/* Retailer Preferences */}
        <SettingsSection
          title="Retailer Preferences"
          description="Choose which stores to track for deals"
          icon="Store"
        >
          <RetailerPreferences
            preferences={retailerPrefs}
            onUpdatePreferences={setRetailerPrefs}
          />
        </SettingsSection>

        {/* Data Usage Controls */}
        <SettingsSection
          title="Data Usage"
          description="Optimize for South African mobile data costs"
          icon="Wifi"
        >
          <DataUsageControls
            settings={dataUsage}
            onUpdateSettings={setDataUsage}
          />
        </SettingsSection>

        {/* Account Actions */}
        <SettingsSection
          title="Account Management"
          description="Export data, support, and account options"
          icon="UserCog"
        >
          <AccountActions onAction={handleAccountAction} />
        </SettingsSection>

      </div>
      {/* Navigation Spacer */}
      <NavigationSpacer height={80} />
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default UserSettingsProfile;