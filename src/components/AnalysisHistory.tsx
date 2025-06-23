import React, { useState } from 'react';
import { Search, Trash2, Calendar, Filter, Download, Zap, TrendingUp } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';

interface AnalysisHistoryProps {
  history: AnalysisResult[];
  onClearHistory: () => void;
  onSelectAnalysis: (result: AnalysisResult) => void;
}

const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({
  history,
  onClearHistory,
  onSelectAnalysis
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = sentimentFilter === 'all' || item.sentiment === sentimentFilter;
    const matchesType = typeFilter === 'all' || item.analysisType === typeFilter;
    return matchesSearch && matchesFilter && matchesType;
  });

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `vibecheckr-analysis-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Analysis History</h2>
              <p className="text-gray-600">{history.length} total analyses • VibeCheckr Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportHistory}
              disabled={history.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-purple-200"
            >
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </button>
            <button
              onClick={onClearHistory}
              disabled={history.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-rose-200"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white/70"
            >
              <option value="all">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white/70"
            >
              <option value="all">All Types</option>
              <option value="review">Product Reviews</option>
              <option value="feedback">General Feedback</option>
              <option value="social">Social Media</option>
            </select>
          </div>
        </div>
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-8 text-center shadow-xl">
          <Calendar className="h-12 w-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No analyses found</h3>
          <p className="text-gray-600">
            {history.length === 0 
              ? "Start analyzing text to build your history"
              : "Try adjusting your search or filter criteria"
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectAnalysis(item)}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200/30 p-4 hover:bg-white/95 cursor-pointer transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      item.sentiment === 'negative' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}>
                      {item.sentiment}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {Math.round(item.confidence * 100)}% confidence
                    </span>
                    {item.analysisType && (
                      <span className="text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded-full border border-purple-200">
                        {item.analysisType}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-900 font-medium mb-2 line-clamp-2">
                    {item.text.substring(0, 150)}
                    {item.text.length > 150 && '...'}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{item.wordCount} words</span>
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="ml-4 flex flex-wrap gap-1">
                  {item.keywords.slice(0, 3).map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs border border-purple-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisHistory;