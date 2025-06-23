import React from 'react';
import { BarChart3, TrendingUp, Target, Users, Zap, Star, Award, MessageCircle } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';

interface AnalyticsProps {
  history: AnalysisResult[];
}

const Analytics: React.FC<AnalyticsProps> = ({ history }) => {
  const totalAnalyses = history.length;
  
  const sentimentCounts = history.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageConfidence = totalAnalyses > 0 
    ? history.reduce((sum, item) => sum + item.confidence, 0) / totalAnalyses 
    : 0;

  const averageWordCount = totalAnalyses > 0
    ? Math.round(history.reduce((sum, item) => sum + item.wordCount, 0) / totalAnalyses)
    : 0;

  const typeCounts = history.reduce((acc, item) => {
    const type = item.analysisType || 'general';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const keywordFrequency = history.reduce((acc, item) => {
    item.keywords.forEach(keyword => {
      acc[keyword] = (acc[keyword] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topKeywords = Object.entries(keywordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const emotionAverages = history.length > 0 ? {
    joy: history.reduce((sum, item) => sum + item.emotions.joy, 0) / history.length,
    anger: history.reduce((sum, item) => sum + item.emotions.anger, 0) / history.length,
    fear: history.reduce((sum, item) => sum + item.emotions.fear, 0) / history.length,
    sadness: history.reduce((sum, item) => sum + item.emotions.sadness, 0) / history.length,
    surprise: history.reduce((sum, item) => sum + item.emotions.surprise, 0) / history.length,
    disgust: history.reduce((sum, item) => sum + item.emotions.disgust, 0) / history.length,
  } : {
    joy: 0, anger: 0, fear: 0, sadness: 0, surprise: 0, disgust: 0
  };

  const positivityScore = totalAnalyses > 0 
    ? Math.round(((sentimentCounts.positive || 0) / totalAnalyses) * 100)
    : 0;

  if (totalAnalyses === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-8 text-center shadow-xl">
        <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Analytics Available</h3>
        <p className="text-gray-600">
          Analyze some text to see your sentiment analytics dashboard
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">VibeCheckr Analytics</h2>
        </div>
        <p className="text-gray-600">Comprehensive insights from your sentiment analysis data</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Analyses</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalAnalyses}</div>
          <p className="text-xs text-gray-600 mt-1">Text samples processed</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Star className="h-5 w-5 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Positivity Score</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900">{positivityScore}%</div>
          <p className="text-xs text-gray-600 mt-1">Positive sentiment rate</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Avg. Confidence</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {Math.round(averageConfidence * 100)}%
          </div>
          <p className="text-xs text-gray-600 mt-1">Analysis accuracy</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-rose-100 rounded-lg">
              <Users className="h-5 w-5 text-rose-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Avg. Length</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900">{averageWordCount}</div>
          <p className="text-xs text-gray-600 mt-1">Words per text</p>
        </div>
      </div>

      {/* Sentiment Distribution */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Award className="h-5 w-5 text-purple-600" />
          <span>Sentiment Distribution</span>
        </h3>
        <div className="space-y-4">
          {['positive', 'negative', 'neutral'].map(sentiment => {
            const count = sentimentCounts[sentiment] || 0;
            const percentage = totalAnalyses > 0 ? (count / totalAnalyses) * 100 : 0;
            
            return (
              <div key={sentiment} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium text-gray-700 capitalize">
                  {sentiment}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-700 ${
                      sentiment === 'positive' ? 'bg-emerald-500' :
                      sentiment === 'negative' ? 'bg-rose-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-20 text-sm font-medium text-gray-900 text-right">
                  {count} ({Math.round(percentage)}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysis Types */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-purple-600" />
          <span>Analysis Categories</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(typeCounts).map(([type, count]) => {
            const percentage = (count / totalAnalyses) * 100;
            return (
              <div key={type} className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                <div className="text-2xl mb-2">
                  {type === 'review' && '⭐'}
                  {type === 'feedback' && '💬'}
                  {type === 'social' && '📱'}
                  {type === 'general' && '📝'}
                </div>
                <div className="text-sm font-medium text-gray-900 capitalize mb-1">
                  {type === 'review' ? 'Product Reviews' : 
                   type === 'feedback' ? 'General Feedback' :
                   type === 'social' ? 'Social Media' : 'General'}
                </div>
                <div className="text-lg font-bold text-gray-800">{count}</div>
                <div className="text-xs text-gray-600">{Math.round(percentage)}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Emotions Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Emotional Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(emotionAverages).map(([emotion, score]) => (
            <div key={emotion} className="text-center p-4 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl border border-purple-100">
              <div className="text-3xl mb-2">
                {emotion === 'joy' && '😊'}
                {emotion === 'anger' && '😠'}
                {emotion === 'fear' && '😨'}
                {emotion === 'sadness' && '😢'}
                {emotion === 'surprise' && '😲'}
                {emotion === 'disgust' && '🤢'}
              </div>
              <div className="text-sm font-medium text-gray-900 capitalize mb-1">{emotion}</div>
              <div className="text-lg font-bold text-gray-800">{Math.round(score * 100)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Keywords */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Most Common Terms</h3>
        <div className="space-y-3">
          {topKeywords.map(([keyword, count], index) => (
            <div key={keyword} className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-bold text-purple-600 border border-purple-200">
                {index + 1}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span className="font-medium text-gray-900">{keyword}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-purple-500 transition-all duration-500"
                      style={{ width: `${(count / topKeywords[0][1]) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-8">
                    {count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;