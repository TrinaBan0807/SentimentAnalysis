import React, { useState, useCallback, useEffect } from 'react';
import { Send, MessageSquare, Loader2, Sparkles, Zap, Brain } from 'lucide-react';
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
    <div className="bg-gradient-to-br from-white/90 to-purple-50/80 backdrop-blur-sm rounded-3xl border border-purple-200/40 p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl shadow-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <span>AI Text Analysis</span>
              <Brain className="h-5 w-5 text-purple-600" />
            </h3>
            <p className="text-sm text-gray-600">Powered by advanced sentiment intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={realtimeMode}
              onChange={(e) => setRealtimeMode(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
            />
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-purple-600 group-hover:text-purple-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Live Analysis</span>
            </div>
          </label>
        </div>
      </div>

      {/* Analysis Type Selector with Enhanced Design */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-4">Choose Analysis Context</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'review', label: 'Product Review', icon: '⭐', desc: 'E-commerce & products' },
            { id: 'feedback', label: 'General Feedback', icon: '💬', desc: 'Services & experiences' },
            { id: 'social', label: 'Social Media', icon: '📱', desc: 'Posts & comments' }
          ].map(({ id, label, icon, desc }) => (
            <button
              key={id}
              onClick={() => setAnalysisType(id as any)}
              className={`group p-4 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                analysisType === id
                  ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-2 border-purple-300 shadow-lg'
                  : 'bg-white/70 text-gray-700 hover:bg-white/90 border-2 border-gray-200 hover:border-purple-200 hover:shadow-md'
              }`}
            >
              <div className="text-center space-y-2">
                <div className="text-2xl group-hover:scale-110 transition-transform duration-200">{icon}</div>
                <div className="font-semibold">{label}</div>
                <div className="text-xs opacity-75">{desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="✨ Enter any text to analyze its sentiment...

🎯 Examples to try:
• 'This product exceeded my expectations, amazing quality!'
• 'The service was disappointing and took way too long'
• 'Mixed feelings about this - good features but poor design'
• 'Absolutely love this! Best purchase I've made this year!'

💡 Tip: Try different types of text to see how our AI adapts!"
            className="w-full h-48 p-6 border-2 border-purple-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 resize-none bg-white/80 backdrop-blur-sm transition-all duration-300 text-gray-800 placeholder-gray-500 text-base leading-relaxed shadow-inner"
            maxLength={5000}
          />
          <div className="absolute bottom-4 right-4 flex items-center space-x-4">
            <span className="text-sm text-gray-500 bg-white/90 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
              {text.length}/5000
            </span>
            {isAnalyzing && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1.5 rounded-full border border-purple-200 shadow-sm">
                <Loader2 className="h-4 w-4 text-purple-600 animate-spin" />
                <span className="text-sm text-purple-700 font-medium">Analyzing...</span>
              </div>
            )}
          </div>
        </div>

        {!realtimeMode && (
          <button
            type="submit"
            disabled={!text.trim() || isAnalyzing}
            className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Analyzing Sentiment...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-6 w-6" />
                <span>Analyze Text Sentiment</span>
                <div className="text-sm opacity-80">✨</div>
              </>
            )}
          </button>
        )}
      </form>

      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50/80 to-blue-50/80 rounded-xl border border-purple-200/30">
        <div className="flex items-start space-x-3">
          <div className="text-lg">💡</div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Pro Tips</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Longer texts (20+ words) provide more accurate analysis</li>
              <li>• Try different analysis contexts for better results</li>
              <li>• Live mode analyzes as you type for instant feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAnalyzer;