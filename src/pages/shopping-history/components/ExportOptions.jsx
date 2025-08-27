import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExportOptions = ({ isOpen, onClose, onExport, className = '' }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportRange, setExportRange] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV (Excel Compatible)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' }
  ];

  const rangeOptions = [
    { value: 'all', label: 'All History' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: 'year', label: 'This Year' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport({ format: exportFormat, range: exportRange });
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1003] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className={`
        relative bg-surface rounded-2xl border border-border shadow-xl
        w-full max-w-md mx-auto
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Export History</h3>
            <p className="text-sm text-text-secondary mt-1">
              Download your shopping data for personal use
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <Select
            label="Export Format"
            description="Choose the file format for your export"
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
          />

          {/* Date Range */}
          <Select
            label="Date Range"
            description="Select which period to include"
            options={rangeOptions}
            value={exportRange}
            onChange={setExportRange}
          />

          {/* Export Preview */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Export Preview</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Format:</span>
                <span className="text-text-primary font-medium">
                  {formatOptions?.find(f => f?.value === exportFormat)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Period:</span>
                <span className="text-text-primary font-medium">
                  {rangeOptions?.find(r => r?.value === exportRange)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Estimated size:</span>
                <span className="text-text-primary font-medium">~2.5 MB</span>
              </div>
            </div>
          </div>

          {/* Data Included */}
          <div className="bg-primary/5 rounded-lg p-4">
            <h4 className="font-medium text-primary mb-3 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              Data Included
            </h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Shopping dates and times</li>
              <li>• Store names and locations</li>
              <li>• Item names, categories, and prices</li>
              <li>• Payment methods and totals</li>
              <li>• Savings and discounts applied</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleExport}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            {isExporting ? 'Exporting...' : 'Export Data'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;