import React, { useState, useEffect } from 'react';
        import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
        import Button from '../../../components/ui/Button';
        import Icon from '../../../components/AppIcon';
        import Input from '../../../components/ui/Input';

        const VoiceCapture = ({ onAddItem, currentLanguage = 'en' }) => {
          const [isListening, setIsListening] = useState(false);
          const [transcript, setTranscript] = useState('');
          const [processedItems, setProcessedItems] = useState([]);
          const [isProcessing, setIsProcessing] = useState(false);

          const {
            transcript: recognitionTranscript,
            resetTranscript,
            browserSupportsSpeechRecognition,
            isMicrophoneAvailable
          } = useSpeechRecognition();

          useEffect(() => {
            if (recognitionTranscript) {
              setTranscript(recognitionTranscript);
            }
          }, [recognitionTranscript]);

          const startListening = () => {
            if (!browserSupportsSpeechRecognition) {
              alert('Browser does not support speech recognition');
              return;
            }

            setIsListening(true);
            resetTranscript();
            SpeechRecognition?.startListening({ 
              continuous: true,
              language: currentLanguage === 'zu' ? 'zu-ZA' : 'en-ZA'
            });
          };

          const stopListening = () => {
            setIsListening(false);
            SpeechRecognition?.stopListening();
            processVoiceInput();
          };

          const processVoiceInput = async () => {
            if (!transcript?.trim()) return;

            setIsProcessing(true);

            // Simulate processing voice input to extract items
            // In a real implementation, this would use AI/NLP to parse the speech
            const items = parseVoiceToItems(transcript);
            setProcessedItems(items);
            setIsProcessing(false);
          };

          const parseVoiceToItems = (text) => {
            // Simple parsing logic - in real app, this would be more sophisticated
            const words = text?.toLowerCase()?.split(' ');
            const items = [];
            let currentItem = '';
            let quantity = 1;

            // Look for quantity keywords and item names
            words?.forEach((word, index) => {
              if (['one', '1', 'two', '2', 'three', '3', 'four', '4', 'five', '5']?.includes(word)) {
                quantity = convertWordToNumber(word);
              } else if (['milk', 'bread', 'eggs', 'sugar', 'rice', 'chicken', 'beef', 'fish']?.includes(word)) {
                currentItem = word;
              } else if (word?.includes('rand') || word?.includes('r')) {
                // Try to extract price
                const priceMatch = text?.match(/r?(\d+(?:\.\d{2})?)/i);
                if (currentItem && priceMatch) {
                  items?.push({
                    id: Date.now() + items?.length,
                    name: currentItem?.charAt(0)?.toUpperCase() + currentItem?.slice(1),
                    quantity: quantity,
                    price: parseFloat(priceMatch?.[1]),
                    category: 'groceries',
                    confidence: 0.85
                  });
                  currentItem = '';
                  quantity = 1;
                }
              }
            });

            // Add item even if no price mentioned
            if (currentItem) {
              items?.push({
                id: Date.now() + items?.length,
                name: currentItem?.charAt(0)?.toUpperCase() + currentItem?.slice(1),
                quantity: quantity,
                price: 0,
                category: 'groceries',
                confidence: 0.75
              });
            }

            return items?.length > 0 ? items : [{
              id: Date.now(),
              name: transcript?.charAt(0)?.toUpperCase() + transcript?.slice(1)?.substring(0, 20),
              quantity: 1,
              price: 0,
              category: 'groceries',
              confidence: 0.60
            }];
          };

          const convertWordToNumber = (word) => {
            const numbers = {
              'one': 1, '1': 1,
              'two': 2, '2': 2,
              'three': 3, '3': 3,
              'four': 4, '4': 4,
              'five': 5, '5': 5
            };
            return numbers?.[word] || 1;
          };

          const handleItemConfirm = (item) => {
            onAddItem(item);
            setProcessedItems(prev => prev?.filter(i => i?.id !== item?.id));
          };

          const handleClearTranscript = () => {
            setTranscript('');
            setProcessedItems([]);
            resetTranscript();
          };

          if (!browserSupportsSpeechRecognition) {
            return (
              <div className="text-center py-8">
                <Icon name="MicOff" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {currentLanguage === 'zu' ? 'Isiphequluli asisekelwa' : 'Speech Recognition Not Supported'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'zu' ?'Isiphequluli sakho asisekelwa ukuqonda ukukhuluma' :'Your browser does not support speech recognition'}
                </p>
              </div>
            );
          }

          return (
            <div className="space-y-6">
              {/* Voice Control Interface */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6">
                <div className="text-center space-y-4">
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening 
                      ? 'bg-error text-error-foreground animate-pulse shadow-lg scale-110' 
                      : 'bg-primary text-primary-foreground hover:scale-105'
                  }`}>
                    <Icon name={isListening ? "MicOff" : "Mic"} size={32} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {currentLanguage === 'zu' ? 'Ukufaka Ngezwi' : 'Voice Input'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isListening 
                        ? (currentLanguage === 'zu' ? 'Ngizoke...' : 'Listening...') 
                        : (currentLanguage === 'zu' ? 'Thepha ukuqala ukukhuluma' : 'Tap to start speaking')}
                    </p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    {!isListening ? (
                      <Button
                        variant="default"
                        size="lg"
                        onClick={startListening}
                        disabled={!isMicrophoneAvailable}
                        iconName="Mic"
                        iconPosition="left"
                        className="px-8"
                      >
                        {currentLanguage === 'zu' ? 'Qala Ukukhuluma' : 'Start Speaking'}
                      </Button>
                    ) : (
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={stopListening}
                        iconName="Square"
                        iconPosition="left"
                        className="px-8"
                      >
                        {currentLanguage === 'zu' ? 'Yima' : 'Stop'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {/* Live Transcript */}
              {(transcript || isListening) && (
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Icon name={isListening ? "Radio" : "FileText"} size={16} />
                      {currentLanguage === 'zu' ? 'Lokho okukhulunywayo' : 'Speech Transcript'}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearTranscript}
                      iconName="X"
                    >
                      {currentLanguage === 'zu' ? 'Susa' : 'Clear'}
                    </Button>
                  </div>
                  <div className="bg-muted rounded p-3 min-h-[60px] text-sm text-foreground">
                    {transcript || (
                      <span className="text-muted-foreground italic">
                        {currentLanguage === 'zu' ? 'Khuluma izinto ozidingayo...' : 'Say the items you need...'}
                      </span>
                    )}
                    {isListening && <span className="animate-pulse">|</span>}
                  </div>
                </div>
              )}
              {/* Processing Indicator */}
              {isProcessing && (
                <div className="text-center py-4">
                  <Icon name="RefreshCw" size={24} className="text-primary animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {currentLanguage === 'zu' ? 'Kuhlelwa izinto...' : 'Processing items...'}
                  </p>
                </div>
              )}
              {/* Processed Items */}
              {processedItems?.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    {currentLanguage === 'zu' ? 'Izinto Ezitholiwe' : 'Recognized Items'} ({processedItems?.length})
                  </h4>
                  
                  <div className="space-y-3">
                    {processedItems?.map((item) => (
                      <div key={item?.id} className="bg-card border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <Input
                              value={item?.name}
                              onChange={(e) => {
                                setProcessedItems(prev => prev?.map(i => 
                                  i?.id === item?.id ? {...i, name: e?.target?.value} : i
                                ));
                              }}
                              placeholder="Item name"
                              className="font-medium mb-2"
                            />
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Input
                                type="number"
                                value={item?.quantity}
                                onChange={(e) => {
                                  setProcessedItems(prev => prev?.map(i => 
                                    i?.id === item?.id ? {...i, quantity: parseInt(e?.target?.value) || 1} : i
                                  ));
                                }}
                                placeholder="Qty"
                                className="w-16"
                                min="1"
                              />
                              <Input
                                type="number"
                                value={item?.price}
                                onChange={(e) => {
                                  setProcessedItems(prev => prev?.map(i => 
                                    i?.id === item?.id ? {...i, price: parseFloat(e?.target?.value) || 0} : i
                                  ));
                                }}
                                placeholder="Price"
                                className="w-24"
                                min="0"
                                step="0.01"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-4">
                            <Icon name="Zap" size={12} />
                            {Math.round(item?.confidence * 100)}%
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setProcessedItems(prev => prev?.filter(i => i?.id !== item?.id))}
                            iconName="Trash2"
                            iconPosition="left"
                            className="flex-1"
                          >
                            {currentLanguage === 'zu' ? 'Susa' : 'Remove'}
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleItemConfirm(item)}
                            iconName="Plus"
                            iconPosition="left"
                            className="flex-1"
                          >
                            {currentLanguage === 'zu' ? 'Engeza' : 'Add to List'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Instructions */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Icon name="Info" size={16} />
                  {currentLanguage === 'zu' ? 'Amacebiso' : 'Voice Tips'}
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>
                    {currentLanguage === 'zu' ?'• Khuluma ngokucacile futhi kancane' :'• Speak clearly and at a moderate pace'}
                  </li>
                  <li>
                    {currentLanguage === 'zu' ?'• Sho amanani noma amabizo ezinto' :'• Say quantities and item names clearly'}
                  </li>
                  <li>
                    {currentLanguage === 'zu' ?'• Isibonelo: "Ibhakede elilodwa lemilk R30"' : '• Example:"One carton of milk R30"'}
                  </li>
                  <li>
                    {currentLanguage === 'zu' ?'• Yeka ukusebenza kwesilwane sasendlini' :'• Avoid background noise for best results'}
                  </li>
                </ul>
              </div>
            </div>
          );
        };

        export default VoiceCapture;