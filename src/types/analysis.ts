export interface AnalysisResult {
  id: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  scores: {
    positive: number;
    negative: number;
    neutral: number;
  };
  emotions: {
    joy: number;
    anger: number;
    fear: number;
    sadness: number;
    surprise: number;
    disgust: number;
  };
  keywords: string[];
  wordCount: number;
  timestamp: Date;
  analysisType?: 'review' | 'feedback' | 'social';
}

export interface SentimentStats {
  totalAnalyses: number;
  averageConfidence: number;
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  mostCommonKeywords: Array<{ word: string; count: number; }>;
  customerSatisfactionScore: number;
}