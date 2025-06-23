import React from 'react';
import { Zap, TrendingDown, TrendingUp, Minus, Star, Clock, Hash, Award } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-6 w-6 text-emerald-600" />;
      case 'negative':
        return <TrendingDown className="h-6 w-6 text-rose-600" />;
      default:
        return <Minus className="h-6 w-6 text-purple-600" />;
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
        return 'bg-emerald-50/80 border-emerald-200/50';
      case 'negative':
        return 'bg-rose-50/80 border-rose-200/50';
      default:
        return 'bg-purple-50/80 border-purple-200/50';
    }
  };

  const getVibeDescription = (sentiment: string, confidence: number) => {
    if (sentiment === 'positive' && confidence > 0.8) return 'Extremely Positive Vibe';
    if (sentiment === 'positive' && confidence > 0.6) return 'Good Vibes';
    if (sentiment === 'negative' && confidence > 0.8) return 'Very Negative Vibe';
    if (sentiment === 'negative' && confidence > 0.6) return 'Bad Vibes';
    return 'Neutral Vibe';
  };

  const topEmotions = Object.entries(result.emotions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <div className={`rounded-2xl border-2 p-6 ${getSentimentBg(result.sentiment)} backdrop-blur-sm shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getSentimentIcon(result.sentiment)}
            <div>
              <h3 className="text-xl font-bold text-gray-900 capitalize">
                {result.sentiment} Sentiment
              </h3>
              <p className="text-sm text-gray-600">Vibe Analysis Results</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(result.confidence * 100)}%
            </div>
            <p className="text-sm text-gray-600">Confidence</p>
          </div>
        </div>
        
        <div className="w-full bg-white/60 rounded-full h-4 mb-4">
          <div
            className={`h-4 rounded-full bg-gradient-to-r ${getSentimentColor(result.sentiment)} transition-all duration-700 ease-out shadow-sm`}
            style={{ width: `${result.confidence * 100}%` }}
          />
        </div>

        {/* Vibe Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50">
            <Award className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-800">
              {getVibeDescription(result.sentiment, result.confidence)}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Star className="h-5 w-5 text-purple-600" />
          <span>Sentiment Breakdown</span>
        </h4>
        
        <div className="space-y-4">
          {Object.entries(result.scores).map(([sentiment, score]) => (
            <div key={sentiment} className="flex items-center justify-between">
              <span className="font-medium text-gray-700 capitalize w-20">{sentiment}</span>
              <div className="flex items-center space-x-3 flex-1 ml-4">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      sentiment === 'positive' ? 'bg-emerald-500' :
                      sentiment === 'negative' ? 'bg-rose-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${score * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 w-12">
                  {Math.round(score * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emotions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Emotional Indicators</h4>
        <div className="grid grid-cols-3 gap-4">
          {topEmotions.map(([emotion, score]) => (
            <div key={emotion} className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
              <div className="text-3xl mb-2">
                {emotion === 'joy' && '😊'}
                {emotion === 'anger' && '😠'}
                {emotion === 'fear' && '😨'}
                {emotion === 'sadness' && '😢'}
                {emotion === 'surprise' && '😲'}
                {emotion === 'disgust' && '🤢'}
              </div>
              <div className="text-sm font-medium text-gray-900 capitalize">{emotion}</div>
              <div className="text-xs text-gray-600">{Math.round(score * 100)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Keywords & Metadata */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Hash className="h-5 w-5 text-purple-600" />
              <span>Key Terms</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.keywords.slice(0, 8).map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span>Analysis Details</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Word Count:</span>
                <span className="font-medium">{result.wordCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Analysis Type:</span>
                <span className="font-medium capitalize">{result.analysisType || 'General'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processed:</span>
                <span className="font-medium">
                  {new Date(result.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Time:</span>
                <span className="font-medium">~400ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;