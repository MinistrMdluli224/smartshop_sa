import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { 
      value: 'en', 
      label: 'English', 
      description: 'Default language',
      flag: '🇬🇧'
    },
    { 
      value: 'zu', 
      label: 'isiZulu', 
      description: 'Ulimi lwasekhaya',
      flag: '🇿🇦'
    }
  ];

  const currencyFormats = [
    { value: 'standard', label: 'R 1,234.56', description: 'Standard format' },
    { value: 'spaces', label: 'R 1 234,56', description: 'European style' },
    { value: 'minimal', label: 'R1234.56', description: 'Compact format' }
  ];

  const dateFormats = [
    { value: 'dmy', label: 'DD/MM/YYYY', description: 'South African standard' },
    { value: 'mdy', label: 'MM/DD/YYYY', description: 'US format' },
    { value: 'ymd', label: 'YYYY-MM-DD', description: 'ISO format' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Select
          label="App Language"
          description="Choose your preferred language"
          options={languages?.map(lang => ({
            ...lang,
            label: `${lang?.flag} ${lang?.label}`
          }))}
          value={currentLanguage?.language}
          onChange={(value) => onLanguageChange({ ...currentLanguage, language: value })}
        />

        <Select
          label="Currency Format"
          description="How prices are displayed"
          options={currencyFormats}
          value={currentLanguage?.currencyFormat}
          onChange={(value) => onLanguageChange({ ...currentLanguage, currencyFormat: value })}
        />

        <Select
          label="Date Format"
          description="How dates are displayed"
          options={dateFormats}
          value={currentLanguage?.dateFormat}
          onChange={(value) => onLanguageChange({ ...currentLanguage, dateFormat: value })}
        />
      </div>
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Globe" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-primary mb-2">Language Preview</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Shopping List:</span>
                <span className="text-text-primary">
                  {currentLanguage?.language === 'zu' ? 'Uhlu Lokuthenga' : 'Shopping List'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Total:</span>
                <span className="text-text-primary">
                  {currentLanguage?.currencyFormat === 'spaces' ? 'R 1 234,56' : 
                   currentLanguage?.currencyFormat === 'minimal' ? 'R1234.56' : 'R 1,234.56'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Date:</span>
                <span className="text-text-primary">
                  {currentLanguage?.dateFormat === 'mdy' ? '08/26/2025' :
                   currentLanguage?.dateFormat === 'ymd' ? '2025-08-26' : '26/08/2025'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-xs text-text-secondary">
        <p className="flex items-center space-x-2">
          <Icon name="Info" size={12} />
          <span>Language changes apply immediately across the entire app</span>
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;