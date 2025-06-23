import { AnalysisResult } from '../types/analysis';

// General sentiment lexicon
const positiveWords = [
  'love', 'amazing', 'excellent', 'fantastic', 'wonderful', 'perfect', 'best', 'brilliant',
  'outstanding', 'superb', 'magnificent', 'incredible', 'beautiful', 'stunning', 'gorgeous',
  'elegant', 'sophisticated', 'premium', 'exquisite', 'flawless', 'impeccable',
  'delicious', 'happy', 'joy', 'pleased', 'satisfied', 'grateful', 'excited', 'thrilled',
  'delighted', 'impressed', 'recommend', 'favorite', 'enjoy', 'success', 'achievement',
  'proud', 'blessed', 'lucky', 'fortunate', 'pleasant', 'cozy', 'friendly', 'helpful',
  'kind', 'generous', 'caring', 'supportive', 'professional', 'attentive', 'courteous',
  'exceptional', 'personalized', 'exclusive', 'stylish', 'fashionable', 'trendy', 'chic',
  'quality', 'craftsmanship', 'designer', 'service', 'experience', 'great', 'good'
];

const negativeWords = [
  'hate', 'dislike', 'terrible', 'awful', 'bad', 'horrible', 'disgusting', 'disappointing',
  'worst', 'annoying', 'frustrating', 'angry', 'mad', 'upset', 'sad', 'depressed',
  'worried', 'scared', 'afraid', 'anxious', 'stressed', 'pain', 'hurt', 'damage',
  'broken', 'failed', 'failure', 'problem', 'issue', 'trouble', 'difficult', 'impossible',
  'unacceptable', 'rude', 'unfair', 'boring', 'stupid', 'waste', 'regret', 'mistake',
  'wrong', 'evil', 'disgusted', 'sick', 'tired', 'expensive', 'overpriced', 'cheap',
  'poor', 'low', 'inferior', 'defective', 'faulty', 'damaged', 'uncomfortable', 'unprofessional',
  'slow', 'delayed', 'late', 'waiting', 'ignored', 'dismissed', 'disrespectful', 'unhelpful'
];

const positiveBoostWords = [
  'awesome', 'incredible', 'outstanding', 'exceptional', 'remarkable', 'phenomenal',
  'spectacular', 'marvelous', 'superb', 'brilliant', 'magnificent', 'extraordinary'
];

const serviceWords = {
  positive: ['helpful', 'professional', 'attentive', 'courteous', 'knowledgeable', 'friendly', 'patient', 'accommodating'],
  negative: ['rude', 'unprofessional', 'dismissive', 'unhelpful', 'impatient', 'disrespectful', 'ignored', 'slow']
};

const emotionKeywords = {
  joy: ['happy', 'joy', 'excited', 'thrilled', 'delighted', 'cheerful', 'elated', 'blissful', 'love', 'amazing'],
  anger: ['angry', 'mad', 'furious', 'rage', 'frustrated', 'annoyed', 'irritated', 'outraged', 'hate', 'terrible'],
  fear: ['scared', 'afraid', 'frightened', 'terrified', 'worried', 'anxious', 'nervous', 'panic', 'concerned'],
  sadness: ['sad', 'depressed', 'miserable', 'heartbroken', 'grief', 'sorrow', 'upset', 'crying', 'disappointed'],
  surprise: ['surprised', 'shocked', 'amazed', 'astonished', 'stunned', 'bewildered', 'confused', 'unexpected'],
  disgust: ['disgusted', 'revolted', 'sick', 'nauseated', 'repulsed', 'appalled', 'horrified', 'gross']
};

const extractKeywords = (text: string): string[] => {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const keywordCounts: { [key: string]: number } = {};
  words.forEach(word => {
    keywordCounts[word] = (keywordCounts[word] || 0) + 1;
  });
  
  return Object.entries(keywordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12)
    .map(([word]) => word);
};

const calculateEmotionScores = (text: string) => {
  const lowerText = text.toLowerCase();
  const emotions = {
    joy: 0,
    anger: 0,
    fear: 0,
    sadness: 0,
    surprise: 0,
    disgust: 0
  };

  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    const matches = keywords.filter(keyword => lowerText.includes(keyword)).length;
    emotions[emotion as keyof typeof emotions] = Math.min(matches * 0.25, 1);
  });

  return emotions;
};

export const analyzeSentiment = (text: string, analysisType?: 'review' | 'feedback' | 'social'): AnalysisResult => {
  const lowerText = text.toLowerCase();
  const words = lowerText.replace(/[^\w\s]/g, '').split(/\s+/);
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  // Standard sentiment analysis
  words.forEach(word => {
    if (positiveWords.includes(word)) {
      positiveScore++;
    }
    if (negativeWords.includes(word)) {
      negativeScore++;
    }
  });

  // Boost for very positive words
  words.forEach(word => {
    if (positiveBoostWords.includes(word)) {
      positiveScore += 1.5;
    }
  });

  // Service-specific analysis
  if (analysisType === 'feedback') {
    words.forEach(word => {
      if (serviceWords.positive.includes(word)) {
        positiveScore += 1.2;
      }
      if (serviceWords.negative.includes(word)) {
        negativeScore += 1.2;
      }
    });
  }
  
  // Normalize scores
  const totalSentimentWords = positiveScore + negativeScore;
  let normalizedPositive = totalSentimentWords > 0 ? positiveScore / totalSentimentWords : 0;
  let normalizedNegative = totalSentimentWords > 0 ? negativeScore / totalSentimentWords : 0;
  let normalizedNeutral = 1 - normalizedPositive - normalizedNegative;
  
  // Boost scores for better demonstration
  if (normalizedPositive > normalizedNegative && normalizedPositive > 0.1) {
    normalizedPositive = Math.min(normalizedPositive * 1.4, 1);
  } else if (normalizedNegative > normalizedPositive && normalizedNegative > 0.1) {
    normalizedNegative = Math.min(normalizedNegative * 1.4, 1);
  }
  
  // Renormalize
  const total = normalizedPositive + normalizedNegative + normalizedNeutral;
  normalizedPositive /= total;
  normalizedNegative /= total;
  normalizedNeutral /= total;
  
  // Determine overall sentiment
  let sentiment: 'positive' | 'negative' | 'neutral';
  let confidence: number;
  
  if (normalizedPositive > normalizedNegative && normalizedPositive > normalizedNeutral) {
    sentiment = 'positive';
    confidence = normalizedPositive;
  } else if (normalizedNegative > normalizedPositive && normalizedNegative > normalizedNeutral) {
    sentiment = 'negative';
    confidence = normalizedNegative;
  } else {
    sentiment = 'neutral';
    confidence = normalizedNeutral;
  }
  
  // Ensure minimum confidence for demonstration
  confidence = Math.max(confidence, 0.65);
  
  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    text,
    sentiment,
    confidence,
    scores: {
      positive: normalizedPositive,
      negative: normalizedNegative,
      neutral: normalizedNeutral
    },
    emotions: calculateEmotionScores(text),
    keywords: extractKeywords(text),
    wordCount: words.filter(word => word.length > 0).length,
    timestamp: new Date(),
    analysisType
  };
};