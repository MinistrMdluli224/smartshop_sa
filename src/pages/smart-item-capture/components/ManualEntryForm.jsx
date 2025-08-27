import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ManualEntryForm = ({ onAddItem, recentItems = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: 1,
    category: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);

  // Mock item suggestions for autocomplete
  const itemDatabase = [
    "Milk 2L", "Bread White", "Eggs 12 Pack", "Chicken Breast 1kg", "Rice 2kg",
    "Bananas 1kg", "Apples Red 1kg", "Potatoes 2kg", "Onions 1kg", "Tomatoes 1kg",
    "Pasta 500g", "Olive Oil 500ml", "Sugar 2kg", "Salt 1kg", "Black Pepper",
    "Washing Powder 2kg", "Toilet Paper 12 Pack", "Soap Bar", "Shampoo 400ml",
    "Toothpaste 100ml", "T-Shirt Cotton", "Jeans Blue", "Sneakers White"
  ];

  const categoryOptions = [
    { value: 'groceries', label: 'Groceries' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'household', label: 'Household' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    if (formData?.name?.length > 1) {
      const filtered = itemDatabase?.filter(item =>
        item?.toLowerCase()?.includes(formData?.name?.toLowerCase())
      )?.slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered?.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [formData?.name]);

  useEffect(() => {
    // Mock price history for selected item
    if (formData?.name) {
      const mockHistory = [
        { retailer: 'Pick n Pay', price: 'R25.99', date: '2025-08-20' },
        { retailer: 'Checkers', price: 'R24.50', date: '2025-08-18' },
        { retailer: 'Woolworths', price: 'R28.99', date: '2025-08-15' }
      ];
      setPriceHistory(mockHistory);
    }
  }, [formData?.name]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({ ...prev, name: suggestion }));
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (formData?.name && formData?.price) {
      const newItem = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData?.price?.replace('R', '')),
        addedAt: new Date()?.toISOString()
      };
      onAddItem(newItem);
      setFormData({ name: '', price: '', quantity: 1, category: '' });
    }
  };

  const adjustQuantity = (delta) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev?.quantity + delta)
    }));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Name with Autocomplete */}
        <div className="relative">
          <Input
            label="Item Name"
            type="text"
            placeholder="Start typing item name..."
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            required
          />
          
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 z-10 bg-card border border-border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="Package" size={16} className="text-muted-foreground" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Input */}
        <Input
          label="Price (ZAR)"
          type="text"
          placeholder="R0.00"
          value={formData?.price}
          onChange={(e) => {
            let value = e?.target?.value?.replace(/[^\d.]/g, '');
            if (value && !value?.startsWith('R')) {
              value = 'R' + value;
            }
            handleInputChange('price', value);
          }}
          required
        />

        {/* Quantity Selector */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => adjustQuantity(-1)}
              disabled={formData?.quantity <= 1}
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="text-lg font-semibold min-w-[3rem] text-center">
              {formData?.quantity}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => adjustQuantity(1)}
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
        </div>

        {/* Category Selection */}
        <Select
          label="Category"
          placeholder="Select category"
          options={categoryOptions}
          value={formData?.category}
          onChange={(value) => handleInputChange('category', value)}
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          disabled={!formData?.name || !formData?.price}
        >
          Add to List
        </Button>
      </form>
      {/* Price History */}
      {priceHistory?.length > 0 && formData?.name && (
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="TrendingUp" size={16} />
            Recent Prices
          </h3>
          <div className="space-y-2">
            {priceHistory?.slice(0, 3)?.map((history, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{history?.retailer}</span>
                <div className="text-right">
                  <span className="font-medium text-foreground">{history?.price}</span>
                  <span className="text-xs text-muted-foreground ml-2">{history?.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Voice Input Button */}
      <Button
        type="button"
        variant="outline"
        fullWidth
        iconName="Mic"
        iconPosition="left"
        onClick={() => {
          // Mock voice input functionality
          alert('Voice input feature coming soon!');
        }}
      >
        Voice Input
      </Button>
    </div>
  );
};

export default ManualEntryForm;