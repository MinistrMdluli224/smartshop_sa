import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import NavigationSpacer from '../../components/ui/NavigationSpacer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import CaptureToggle from './components/CaptureToggle';
import ManualEntryForm from './components/ManualEntryForm';
import CameraCapture from './components/CameraCapture';
import VoiceCapture from './components/VoiceCapture';
import RecentItemsPreview from './components/RecentItemsPreview';
import ProcessingIndicator from './components/ProcessingIndicator';

const SmartItemCapture = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState('manual');
  const [recentItems, setRecentItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('analyzing');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load language preference and recent items on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('smartshop_language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Load recent items from localStorage
    const savedItems = localStorage.getItem('smartshop_recent_items');
    if (savedItems) {
      try {
        setRecentItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Error loading recent items:', error);
      }
    }
  }, []);

  // Save recent items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('smartshop_recent_items', JSON.stringify(recentItems));
  }, [recentItems]);

  const handleAddItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      addedAt: new Date()?.toISOString()
    };
    
    setRecentItems(prev => [...prev, newItem]);
    
    // Show success feedback
    const successMessage = currentLanguage === 'zu' 
      ? `${item?.name} kwengeziwe ohlwini`
      : `${item?.name} added to list`;
    
    console.log(successMessage);
  };

  const handleImageCapture = (imageData) => {
    setIsProcessing(true);
    setProcessingStage('analyzing');
    setProcessingProgress(0);

    // Simulate processing stages
    const stages = ['analyzing', 'detecting', 'extracting', 'completing'];
    let currentStageIndex = 0;
    let progress = 0;

    const progressInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      
      if (progress >= 100) {
        progress = 100;
        setProcessingProgress(progress);
        clearInterval(progressInterval);
        
        setTimeout(() => {
          setIsProcessing(false);
          setProcessingProgress(0);
        }, 500);
        
        return;
      }

      // Update stage based on progress
      const stageProgress = progress / 100 * stages?.length;
      const newStageIndex = Math.floor(stageProgress);
      
      if (newStageIndex !== currentStageIndex && newStageIndex < stages?.length) {
        currentStageIndex = newStageIndex;
        setProcessingStage(stages?.[currentStageIndex]);
      }
      
      setProcessingProgress(progress);
    }, 300);
  };

  const handleProcessedData = (item) => {
    handleAddItem(item);
  };

  const handleUndoItem = (itemId) => {
    setRecentItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleViewList = () => {
    navigate('/shopping-list-management');
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
  };

  const getPageTitle = () => {
    return currentLanguage === 'zu' ? 'Ukuthwebula Izinto Ngokuhlakanipha' : 'Smart Item Capture';
  };

  const getPageDescription = () => {
    return currentLanguage === 'zu' ?'Engeza izinto ohlwini lwakho ngokuzifaka mathupha, ukukhuluma, noma ngokuskena irisidi' :'Add items to your list through manual entry, voice input, or receipt scanning';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home-dashboard')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-foreground">
                {getPageTitle()}
              </h1>
              <p className="text-sm text-muted-foreground">
                {getPageDescription()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Offline Indicator */}
              {!navigator.onLine && (
                <div className="flex items-center gap-1 text-xs text-warning bg-warning/10 px-2 py-1 rounded-full">
                  <Icon name="WifiOff" size={12} />
                  <span>Offline</span>
                </div>
              )}
              
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newLang = currentLanguage === 'en' ? 'zu' : 'en';
                  setCurrentLanguage(newLang);
                  localStorage.setItem('smartshop_language', newLang);
                }}
                className="text-xs"
              >
                {currentLanguage === 'en' ? 'EN' : 'ZU'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Mode Toggle */}
        <CaptureToggle 
          activeMode={activeMode} 
          onModeChange={handleModeChange} 
        />

        {/* Content Based on Active Mode */}
        {activeMode === 'manual' && (
          <ManualEntryForm 
            onAddItem={handleAddItem}
            recentItems={recentItems}
            currentLanguage={currentLanguage}
          />
        )}
        
        {activeMode === 'voice' && (
          <VoiceCapture 
            onAddItem={handleAddItem}
            currentLanguage={currentLanguage}
          />
        )}
        
        {activeMode === 'scan' && (
          <CameraCapture 
            onImageCapture={handleImageCapture}
            onProcessedData={handleProcessedData}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Recent Items Preview */}
        <RecentItemsPreview 
          items={recentItems}
          onUndo={handleUndoItem}
          onViewList={handleViewList}
        />

        {/* Quick Stats */}
        {recentItems?.length > 0 && (
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-foreground">
                  {recentItems?.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentLanguage === 'zu' ? 'Izinto' : 'Items'}
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">
                  R{recentItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0)?.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentLanguage === 'zu' ? 'Isilinganiso' : 'Total'}
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">
                  {new Set(recentItems.map(item => item.category))?.size}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentLanguage === 'zu' ? 'Izinhlobo' : 'Categories'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Help Section */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="HelpCircle" size={16} />
            {currentLanguage === 'zu' ? 'Usizo' : 'Need Help?'}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              {currentLanguage === 'zu' ?'• Sebenzisa "Ukufaka Mathupha" ukwengeza izinto ngezandla' : '• Use"Manual Entry" to add items by typing'}
            </p>
            <p>
              {currentLanguage === 'zu' ?'• Sebenzisa "Ukufaka Ngezwi" ukwengeza izinto ngokukhuluma' : '• Use"Voice Input" to add items by speaking'}
            </p>
            <p>
              {currentLanguage === 'zu' ?'• Sebenzisa "Skena Irisidi" ukuthatha isithombe serisidi se-OCR' : '• Use"Scan Receipt" to capture receipt images with OCR'}
            </p>
            <p>
              {currentLanguage === 'zu' ?'• Izinto zizogcinwa uma ungaxhunyiwe ku-inthanethi' :'• Items are saved even when offline'}
            </p>
          </div>
        </div>
      </div>
      {/* Processing Indicator */}
      <ProcessingIndicator 
        isVisible={isProcessing}
        stage={processingStage}
        progress={processingProgress}
      />
      {/* Navigation Spacer */}
      <NavigationSpacer />
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default SmartItemCapture;