import React, { useState, useCallback, useEffect } from 'react';
import { Send, MessageSquare, Loader2, Sparkles } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';
import { analyzeSentiment } from '../utils/sentimentAnalyzer';

interface TextAnalyzerProps {
  onAnalysis: (result: AnalysisResult) => void;
}

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ onAnalysis }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [realtimeMode, setRealtimeMode] = useState(true);
  const [analysisType, setAnalysisType] = useState<'review' | 'feedback' | 'social'>('review');

  const performAnalysis = useCallback(async (inputText: string) => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const result = analyzeSentiment(inputText, analysisType);
    onAnalysis(result);
    
    setIsAnalyzing(false);
  }, [onAnalysis, analysisType]);

  useEffect(() => {
    if (realtimeMode && text.trim() && text.length > 15) {
      const debounceTimeout = setTimeout(() => {
        performAnalysis(text);
      }, 600);
      
      return () => clearTimeout(debounceTimeout);
    }
  }, [text, realtimeMode, performAnalysis]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!realtimeMode) {
      performAnalysis(text);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Text Sentiment Analysis</h3>
            <p className="text-sm text-gray-600">Analyze any text for emotional sentiment</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={realtimeMode}
              onChange={(e) => setRealtimeMode(e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-700">Live Analysis</span>
          </label>
        </div>
      </div>

      {/* Analysis Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Context</label>
        <div className="flex space-x-2">
          {[
            { id: 'review', label: 'Product Review', icon: '⭐' },
            { id: 'feedback', label: 'General Feedback', icon: '💬' },
            { id: 'social', label: 'Social Media', icon: '📱' }
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setAnalysisType(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                analysisType === id
                  ? 'bg-purple-100 text-purple-800 border border-purple-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter any text to analyze its sentiment... 

Examples:
• 'This product exceeded my expectations, amazing quality!'
• 'The service was disappointing and took way too long'
• 'Mixed feelings about this - good features but poor design'"
            className="w-full h-40 p-4 border border-purple-200/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white/70 backdrop-blur-sm transition-all duration-200 text-gray-800 placeholder-gray-500"
            maxLength={5000}
          />
          <div className="absolute bottom-3 right-3 flex items-center space-x-3">
            <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-full">
              {text.length}/5000
            </span>
            {isAnalyzing && (
              <div className="flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded-full">
                <Loader2 className="h-3 w-3 text-purple-600 animate-spin" />
                <span className="text-xs text-purple-700">Analyzing...</span>
              </div>
            )}
          </div>
        </div>

        {!realtimeMode && (
          <button
            type="submit"
            disabled={!text.trim() || isAnalyzing}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing Sentiment...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Analyze Text Sentiment</span>
              </>
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default TextAnalyzer;