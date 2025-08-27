import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const SpendingChart = ({ className = '' }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const spendingData = [
    { month: 'Feb', amount: 2450, items: 45 },
    { month: 'Mar', amount: 3200, items: 62 },
    { month: 'Apr', amount: 2800, items: 51 },
    { month: 'May', amount: 3650, items: 68 },
    { month: 'Jun', amount: 2950, items: 54 },
    { month: 'Jul', amount: 4100, items: 73 },
    { month: 'Aug', amount: 3850, items: 69 }
  ];

  const periods = [
    { value: '3months', label: '3M' },
    { value: '6months', label: '6M' },
    { value: '1year', label: '1Y' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-text-primary">{label} 2024</p>
          <p className="text-primary font-semibold">R{data?.amount?.toLocaleString()}</p>
          <p className="text-text-secondary text-sm">{data?.items} items purchased</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-surface rounded-xl border border-border p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Spending Trends</h3>
          <p className="text-sm text-text-secondary">Monthly purchase overview</p>
        </div>
        <div className="flex bg-muted rounded-lg p-1">
          {periods?.map((period) => (
            <button
              key={period?.value}
              onClick={() => setSelectedPeriod(period?.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                selectedPeriod === period?.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {period?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 w-full" aria-label="Monthly Spending Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={spendingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={(value) => `R${(value / 1000)?.toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="amount" 
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">R22,000</p>
          <p className="text-xs text-text-secondary">Total Spent</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary">R3,143</p>
          <p className="text-xs text-text-secondary">Monthly Avg</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">R850</p>
          <p className="text-xs text-text-secondary">Saved</p>
        </div>
      </div>
    </div>
  );
};

export default SpendingChart;