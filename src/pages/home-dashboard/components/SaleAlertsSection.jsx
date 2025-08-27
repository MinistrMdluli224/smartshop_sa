import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SaleAlertsSection = ({ className = '' }) => {
  const navigate = useNavigate();

  const saleAlerts = [
    {
      id: 1,
      retailer: 'Pick n Pay',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
      discount: '25%',
      productName: 'Fresh Vegetables Bundle',
      originalPrice: 89.99,
      salePrice: 67.49,
      validUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=150&fit=crop&crop=center',
      category: 'Groceries'
    },
    {
      id: 2,
      retailer: 'Woolworths',
      logo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop&crop=center',
      discount: '30%',
      productName: 'Premium Meat Selection',
      originalPrice: 199.99,
      salePrice: 139.99,
      validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200&h=150&fit=crop&crop=center',
      category: 'Groceries'
    },
    {
      id: 3,
      retailer: 'Checkers',
      logo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop&crop=center',
      discount: '40%',
      productName: 'Household Cleaning Bundle',
      originalPrice: 149.99,
      salePrice: 89.99,
      validUntil: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=150&fit=crop&crop=center',
      category: 'Household'
    },
    {
      id: 4,
      retailer: 'Mr Price',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center',
      discount: '50%',
      productName: 'Summer Clothing Collection',
      originalPrice: 299.99,
      salePrice: 149.99,
      validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=150&fit=crop&crop=center',
      category: 'Clothes'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatValidUntil = (date) => {
    const now = new Date();
    const diffInDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Ends today';
    if (diffInDays === 1) return 'Ends tomorrow';
    return `${diffInDays} days left`;
  };

  const handleViewAllDeals = () => {
    navigate('/sale-alerts-deals');
  };

  const handleSaleClick = (saleId) => {
    navigate(`/sale-alerts-deals?highlight=${saleId}`);
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Tag" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">
            Hot Deals
          </h2>
        </div>
        <Button
          variant="ghost"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={handleViewAllDeals}
          className="text-primary hover:text-primary/80"
        >
          View All
        </Button>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {saleAlerts?.map((sale) => (
          <div
            key={sale?.id}
            onClick={() => handleSaleClick(sale?.id)}
            className="flex-shrink-0 w-64 bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="relative">
              <Image
                src={sale?.image}
                alt={sale?.productName}
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-2 left-2 bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-bold">
                -{sale?.discount} OFF
              </div>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
                <Image
                  src={sale?.logo}
                  alt={sale?.retailer}
                  className="w-6 h-6 rounded-full object-cover"
                />
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {sale?.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {sale?.retailer}
                </span>
              </div>
              
              <h3 className="font-medium text-card-foreground mb-2 line-clamp-2">
                {sale?.productName}
              </h3>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-success">
                    {formatCurrency(sale?.salePrice)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatCurrency(sale?.originalPrice)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {formatValidUntil(sale?.validUntil)}
                </span>
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="TrendingDown" size={12} />
                  <span>Save {formatCurrency(sale?.originalPrice - sale?.salePrice)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleAlertsSection;