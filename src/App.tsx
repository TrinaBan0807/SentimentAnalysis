import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, History, BarChart3, Users, Star, MessageCircle, Sparkles, Heart } from 'lucide-react';
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
      <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-sm border-b border-purple-200/20 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>VibeCheckr</span>
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                </h1>
                <p className="text-sm text-purple-200">AI-Powered Sentiment Intelligence</p>
              </div>
            </div>
            
            <nav className="flex space-x-2">
              {[
                { id: 'analyze', label: 'Analyze', icon: Star },
                { id: 'history', label: 'History', icon: History },
                { id: 'analytics', label: 'Insights', icon: BarChart3 }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-purple-400 to-blue-400 text-white shadow-lg shadow-purple-500/25'
                      : 'text-purple-200 hover:text-white hover:bg-white/10 hover:shadow-lg'
                  }`}
                >
                  <Icon className="h-5 w-5" />
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
          <div className="space-y-12">
            {/* Hero Section with Background Image */}
            <div className="relative text-center space-y-8 py-16">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100/90 to-blue-100/90 backdrop-blur-sm px-8 py-4 rounded-full border border-purple-200/50 shadow-lg mb-8">
                  <div className="relative">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-base font-semibold text-gray-800">Advanced AI Text Analysis</span>
                  <Heart className="h-5 w-5 text-red-500 animate-pulse" />
                </div>
                
                <h2 className="text-6xl sm:text-7xl font-bold text-gray-900 leading-tight mb-6">
                  Check the
                  <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 bg-clip-text text-transparent"> Vibe </span>
                  <span className="text-5xl">✨</span>
                </h2>
                
                <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
                  Discover the emotional pulse of any text with our cutting-edge AI sentiment analysis. 
                  Perfect for reviews, feedback, social media, and more!
                </p>

                {/* Feature Highlights */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {[
                    { icon: '🚀', text: 'Instant Analysis' },
                    { icon: '🎯', text: '95% Accuracy' },
                    { icon: '📊', text: 'Deep Insights' },
                    { icon: '💡', text: 'Smart AI' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200/30 shadow-sm">
                      <span className="text-lg">{feature.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analysis Interface with Visual Enhancement */}
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                {/* Input Section with Image */}
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 opacity-20">
                    <img 
                      src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
                      alt="AI Analysis" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <TextAnalyzer onAnalysis={handleNewAnalysis} />
                </div>
                
                {/* Sample Texts with Visual Enhancement */}
                <div className="relative">
                  <div className="absolute -top-2 -right-2 w-16 h-16 opacity-30">
                    <img 
                      src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
                      alt="Examples" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <SampleTexts onSelectSample={(text) => {
                    // This will be handled by TextAnalyzer component
                  }} />
                </div>
              </div>
              
              <div className="space-y-8">
                {/* Results Section with Image */}
                {currentAnalysis ? (
                  <div className="relative">
                    <div className="absolute -top-6 -right-6 w-20 h-20 opacity-25">
                      <img 
                        src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" 
                        alt="Results" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <ResultsDisplay result={currentAnalysis} />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-purple-50/80 to-blue-50/80 backdrop-blur-sm rounded-3xl border border-purple-200/30 p-12 text-center shadow-xl">
                    <div className="relative mb-8">
                      <img 
                        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" 
                        alt="Waiting for analysis" 
                        className="w-48 h-32 object-cover rounded-2xl mx-auto shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Analyze! 🎯</h3>
                    <p className="text-gray-600 text-lg">
                      Enter some text on the left to see the magic happen. Our AI will analyze the sentiment and emotions instantly!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-r from-purple-100/50 to-blue-100/50 backdrop-blur-sm rounded-3xl border border-purple-200/30 p-8 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Thousands</h3>
                <p className="text-gray-600">Join the community using VibeCheckr for sentiment analysis</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { 
                    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                    title: "Business Reviews",
                    desc: "Analyze customer feedback"
                  },
                  { 
                    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                    title: "Social Media",
                    desc: "Monitor brand sentiment"
                  },
                  { 
                    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                    title: "Product Feedback",
                    desc: "Understand user opinions"
                  },
                  { 
                    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
                    title: "Content Analysis",
                    desc: "Evaluate text sentiment"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4 mx-auto w-20 h-20 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="relative">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img 
                src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
                alt="History" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <AnalysisHistory 
              history={analysisHistory} 
              onClearHistory={clearHistory}
              onSelectAnalysis={setCurrentAnalysis}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="relative">
            <div className="absolute top-0 left-0 w-28 h-28 opacity-10">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
                alt="Analytics" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <Analytics history={analysisHistory} />
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 backdrop-blur-sm border-t border-purple-200/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-bold text-xl flex items-center space-x-2">
                    <span>VibeCheckr</span>
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                  </div>
                  <div className="text-purple-200 text-sm">AI Sentiment Intelligence</div>
                </div>
              </div>
              <p className="text-purple-200 text-sm leading-relaxed">
                Empowering businesses and individuals with advanced sentiment analysis powered by cutting-edge AI technology.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Features</h4>
              <div className="space-y-2 text-purple-200 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4" />
                  <span>Real-time Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Advanced Analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <History className="h-4 w-4" />
                  <span>Analysis History</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Multi-format Support</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Platform Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-xs text-purple-200">Analyses</div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-xs text-purple-200">Accuracy</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-800/50 mt-8 pt-8 text-center">
            <p className="text-purple-200 text-sm">
              © 2025 VibeCheckr. Powered by advanced AI sentiment analysis technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;