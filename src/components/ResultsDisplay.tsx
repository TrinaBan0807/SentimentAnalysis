import React from 'react';
import { Zap, TrendingDown, TrendingUp, Minus, Star, Clock, Hash, Award, Sparkles, Heart, Brain } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-7 w-7 text-emerald-600" />;
      case 'negative':
        return <TrendingDown className="h-7 w-7 text-rose-600" />;
      default:
        return <Minus className="h-7 w-7 text-purple-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'from-emerald-500 to-green-600';
      case 'negative':
        return 'from-rose-500 to-red-600';
      default:
        return 'from-purple-500 to-blue-600';
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-gradient-to-br from-emerald-50/90 to-green-50/80 border-emerald-200/60';
      case 'negative':
        return 'bg-gradient-to-br from-rose-50/90 to-red-50/80 border-rose-200/60';
      default:
        return 'bg-gradient-to-br from-purple-50/90 to-blue-50/80 border-purple-200/60';
    }
  };

  const getVibeDescription = (sentiment: string, confidence: number) => {
    if (sentiment === 'positive' && confidence > 0.8) return 'Extremely Positive Vibe ✨';
    if (sentiment === 'positive' && confidence > 0.6) return 'Good Vibes 😊';
    if (sentiment === 'negative' && confidence > 0.8) return 'Very Negative Vibe 😔';
    if (sentiment === 'negative' && confidence > 0.6) return 'Bad Vibes 😕';
    return 'Neutral Vibe 😐';
  };

  const getSentimentImage = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop";
      case 'negative':
        return "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop";
      default:
        return "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop";
    }
  };

  const topEmotions = Object.entries(result.emotions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Main Result with Enhanced Visual */}
      <div className={`rounded-3xl border-2 p-8 ${getSentimentBg(result.sentiment)} backdrop-blur-sm shadow-2xl relative overflow-hidden`}>
        {/* Background Image */}
        <div className="absolute top-4 right-4 w-20 h-20 opacity-20 rounded-2xl overflow-hidden">
          <img 
            src={getSentimentImage(result.sentiment)} 
            alt="Sentiment visualization"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/80 rounded-2xl shadow-lg">
                {getSentimentIcon(result.sentiment)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 capitalize flex items-center space-x-2">
                  <span>{result.sentiment} Sentiment</span>
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </h3>
                <p className="text-sm text-gray-600 flex items-center space-x-1">
                  <Brain className="h-4 w-4" />
                  <span>AI Analysis Results</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900 flex items-center space-x-1">
                <span>{Math.round(result.confidence * 100)}%</span>
                <Heart className="h-6 w-6 text-red-500 animate-pulse" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Confidence Score</p>
            </div>
          </div>
          
          <div className="w-full bg-white/70 rounded-full h-6 mb-6 shadow-inner">
            <div
              className={`h-6 rounded-full bg-gradient-to-r ${getSentimentColor(result.sentiment)} transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
              style={{ width: `${result.confidence * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Enhanced Vibe Badge */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 shadow-lg">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-base font-bold text-gray-800">
                {getVibeDescription(result.sentiment, result.confidence)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Scores with Visual Enhancement */}
      <div className="bg-gradient-to-br from-white/90 to-purple-50/80 backdrop-blur-sm rounded-3xl border border-purple-200/40 p-8 shadow-2xl">
        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl">
            <Star className="h-5 w-5 text-white" />
          </div>
          <span>Sentiment Breakdown</span>
          <Sparkles className="h-5 w-5 text-yellow-500" />
        </h4>
        
        <div className="space-y-6">
          {Object.entries(result.scores).map(([sentiment, score]) => (
            <div key={sentiment} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700 capitalize text-lg flex items-center space-x-2">
                  <span>{sentiment}</span>
                  {sentiment === 'positive' && '😊'}
                  {sentiment === 'negative' && '😔'}
                  {sentiment === 'neutral' && '😐'}
                </span>
                <span className="text-lg font-bold text-gray-600">
                  {Math.round(score * 100)}%
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-200 rounded-full h-4 shadow-inner">
                  <div
                    className={`h-4 rounded-full transition-all duration-700 shadow-sm ${
                      sentiment === 'positive' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                      sentiment === 'negative' ? 'bg-gradient-to-r from-rose-400 to-rose-600' : 
                      'bg-gradient-to-r from-purple-400 to-purple-600'
                    }`}
                    style={{ width: `${score * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Emotions Section */}
      <div className="bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-sm rounded-3xl border border-purple-200/40 p-8 shadow-2xl">
        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <span>Emotional Indicators</span>
          <Heart className="h-5 w-5 text-red-500 animate-pulse" />
        </h4>
        <div className="grid grid-cols-3 gap-6">
          {topEmotions.map(([emotion, score]) => (
            <div key={emotion} className="group text-center p-6 bg-gradient-to-br from-purple-50/80 to-blue-50/60 rounded-2xl border border-purple-100/60 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {emotion === 'joy' && '😊'}
                {emotion === 'anger' && '😠'}
                {emotion === 'fear' && '😨'}
                {emotion === 'sadness' && '😢'}
                {emotion === 'surprise' && '😲'}
                {emotion === 'disgust' && '🤢'}
              </div>
              <div className="text-base font-bold text-gray-900 capitalize mb-1">{emotion}</div>
              <div className="text-sm text-gray-600 font-medium">{Math.round(score * 100)}%</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 transition-all duration-500"
                  style={{ width: `${score * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Keywords & Metadata */}
      <div className="bg-gradient-to-br from-white/90 to-purple-50/80 backdrop-blur-sm rounded-3xl border border-purple-200/40 p-8 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl">
                <Hash className="h-5 w-5 text-white" />
              </div>
              <span>Key Terms</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {result.keywords.slice(0, 8).map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 rounded-full text-sm font-semibold border border-purple-200 hover:shadow-md transition-all duration-200 transform hover:scale-105"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <span>Analysis Details</span>
            </h4>
            <div className="space-y-4">
              {[
                { label: 'Word Count', value: result.wordCount, icon: '📝' },
                { label: 'Analysis Type', value: (result.analysisType || 'General').charAt(0).toUpperCase() + (result.analysisType || 'General').slice(1), icon: '🎯' },
                { label: 'Processed', value: new Date(result.timestamp).toLocaleTimeString(), icon: '⏰' },
                { label: 'Processing Time', value: '~400ms', icon: '⚡' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white/60 rounded-xl border border-purple-100">
                  <span className="text-gray-600 flex items-center space-x-2">
                    <span>{item.icon}</span>
                    <span>{item.label}:</span>
                  </span>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;