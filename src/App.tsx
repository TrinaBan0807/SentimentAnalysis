import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, History, BarChart3, Users, Star, MessageCircle } from 'lucide-react';
import TextAnalyzer from './components/TextAnalyzer';
import ResultsDisplay from './components/ResultsDisplay';
import AnalysisHistory from './components/AnalysisHistory';
import Analytics from './components/Analytics';
import SampleTexts from './components/SampleTexts';
import { AnalysisResult } from './types/analysis';

function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
  const [activeTab, setActiveTab] = useState<'analyze' | 'history' | 'analytics'>('analyze');

  useEffect(() => {
    // Load history from localStorage on mount
    const savedHistory = localStorage.getItem('vibeCheckrAnalysisHistory');
    if (savedHistory) {
      setAnalysisHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleNewAnalysis = (result: AnalysisResult) => {
    setCurrentAnalysis(result);
    const newHistory = [result, ...analysisHistory.slice(0, 99)]; // Keep last 100
    setAnalysisHistory(newHistory);
    localStorage.setItem('vibeCheckrAnalysisHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setAnalysisHistory([]);
    localStorage.removeItem('vibeCheckrAnalysisHistory');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-sm border-b border-purple-200/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  VibeCheckr
                </h1>
                <p className="text-xs text-purple-200">Sentiment Intelligence</p>
              </div>
            </div>
            
            <nav className="flex space-x-1">
              {[
                { id: 'analyze', label: 'Analyze', icon: Star },
                { id: 'history', label: 'History', icon: History },
                { id: 'analytics', label: 'Insights', icon: BarChart3 }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-purple-400 text-white shadow-lg'
                      : 'text-purple-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analyze' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-3 bg-purple-100/80 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200/30">
                <MessageCircle className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-800">Advanced Text Sentiment Analysis</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                Check the
                <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 bg-clip-text text-transparent"> Vibe </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Powerful sentiment analysis for any text. Understand emotions, opinions, and feedback 
                with advanced AI-powered insights and real-time analysis.
              </p>
            </div>

            {/* Analysis Interface */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <TextAnalyzer onAnalysis={handleNewAnalysis} />
                <SampleTexts onSelectSample={(text) => {
                  // This will be handled by TextAnalyzer component
                }} />
              </div>
              <div className="space-y-6">
                {currentAnalysis && <ResultsDisplay result={currentAnalysis} />}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <AnalysisHistory 
            history={analysisHistory} 
            onClearHistory={clearHistory}
            onSelectAnalysis={setCurrentAnalysis}
          />
        )}

        {activeTab === 'analytics' && (
          <Analytics history={analysisHistory} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-sm border-t border-purple-200/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="text-white">
                <div className="font-bold text-lg">VibeCheckr</div>
                <div className="text-purple-200 text-sm">Sentiment Intelligence Platform</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-purple-200">
              <Users className="h-4 w-4" />
              <span>Text Analytics</span>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;