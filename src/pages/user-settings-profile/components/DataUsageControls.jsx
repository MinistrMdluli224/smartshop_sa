import React from 'react';
import Select from '../../../components/ui/Select';
import ToggleSwitch from './ToggleSwitch';
import Icon from '../../../components/AppIcon';

const DataUsageControls = ({ settings, onUpdateSettings }) => {
  const syncFrequencyOptions = [
    { value: 'realtime', label: 'Real-time', description: 'Instant sync (uses more data)' },
    { value: 'hourly', label: 'Every hour', description: 'Balanced sync frequency' },
    { value: 'daily', label: 'Once daily', description: 'Data-friendly option' },
    { value: 'manual', label: 'Manual only', description: 'Sync when you choose' }
  ];

  const imageQualityOptions = [
    { value: 'high', label: 'High Quality', description: 'Best quality, more data' },
    { value: 'medium', label: 'Medium Quality', description: 'Balanced quality and data' },
    { value: 'low', label: 'Low Quality', description: 'Minimal data usage' },
    { value: 'disabled', label: 'No Images', description: 'Text only, save data' }
  ];

  const handleSettingChange = (key, value) => {
    onUpdateSettings({
      ...settings,
      [key]: value
    });
  };

  const estimatedDataUsage = () => {
    let usage = 0;
    
    // Base usage
    usage += 5; // MB per month base
    
    // Sync frequency impact
    switch (settings?.syncFrequency) {
      case 'realtime': usage += 50; break;
      case 'hourly': usage += 20; break;
      case 'daily': usage += 5; break;
      case 'manual': usage += 2; break;
    }
    
    // Image quality impact
    switch (settings?.imageQuality) {
      case 'high': usage += 30; break;
      case 'medium': usage += 15; break;
      case 'low': usage += 5; break;
      case 'disabled': usage += 0; break;
    }
    
    // Additional features
    if (settings?.backgroundSync) usage += 10;
    if (settings?.autoBackup) usage += 20;
    
    return usage;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-text-primary">Data Usage Controls</h4>
        <div className="text-right">
          <p className="text-xs text-text-secondary">Estimated monthly usage</p>
          <p className="text-sm font-medium text-primary">~{estimatedDataUsage()}MB</p>
        </div>
      </div>
      <div className="space-y-4">
        <Select
          label="Sync Frequency"
          description="How often to sync data with cloud"
          options={syncFrequencyOptions}
          value={settings?.syncFrequency}
          onChange={(value) => handleSettingChange('syncFrequency', value)}
        />

        <Select
          label="Image Quality"
          description="Quality of product and receipt images"
          options={imageQualityOptions}
          value={settings?.imageQuality}
          onChange={(value) => handleSettingChange('imageQuality', value)}
        />

        <ToggleSwitch
          label="Background Sync"
          description="Sync data when app is in background"
          enabled={settings?.backgroundSync}
          onChange={(value) => handleSettingChange('backgroundSync', value)}
        />

        <ToggleSwitch
          label="Auto Backup"
          description="Automatically backup shopping lists and history"
          enabled={settings?.autoBackup}
          onChange={(value) => handleSettingChange('autoBackup', value)}
        />

        <ToggleSwitch
          label="WiFi Only Sync"
          description="Only sync when connected to WiFi"
          enabled={settings?.wifiOnlySync}
          onChange={(value) => handleSettingChange('wifiOnlySync', value)}
        />

        <ToggleSwitch
          label="Compress Data"
          description="Reduce data usage with compression"
          enabled={settings?.compressData}
          onChange={(value) => handleSettingChange('compressData', value)}
        />
      </div>
      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Zap" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-warning mb-1">Data Saving Tips</h5>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Use WiFi for initial setup and large syncs</li>
              <li>• Enable compression to reduce data by up to 60%</li>
              <li>• Manual sync gives you full control over data usage</li>
              <li>• Low image quality can save 20-30MB per month</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUsageControls;