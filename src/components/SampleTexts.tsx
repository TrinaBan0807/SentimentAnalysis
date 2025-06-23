import React from 'react';
import { Lightbulb, Copy, Star, MessageCircle, Heart, Sparkles } from 'lucide-react';

interface SampleTextsProps {
  onSelectSample: (text: string) => void;
}

const sampleTexts = [
  {
    category: "Product Review",
    text: "This product is absolutely amazing! The quality exceeded my expectations and the design is beautiful. I would definitely recommend it to anyone looking for something reliable and stylish.",
    emotion: "⭐",
    type: "Positive Review",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    category: "Service Feedback", 
    text: "I'm really disappointed with the service I received. The staff seemed uninterested and I had to wait way too long for assistance. This was not the experience I was hoping for.",
    emotion: "😞",
    type: "Service Issue",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    category: "Product Review",
    text: "The item I ordered was decent quality but not quite what I expected. The delivery was fast which was great, but the product itself was just okay. Mixed feelings overall.",
    emotion: "🤷",
    type: "Mixed Review",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    category: "Social Media",
    text: "Just tried this new restaurant and WOW! The food was incredible and the atmosphere was perfect. Already planning my next visit! #foodie #amazing",
    emotion: "🍽️",
    type: "Social Praise",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    category: "General Feedback",
    text: "The team did an outstanding job on this project. Their attention to detail and professionalism really impressed me. This is exactly the kind of work I was looking for!",
    emotion: "💼",
    type: "Professional Praise",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    category: "Product Review",
    text: "Unfortunately, this purchase was a complete waste of money. The item broke after just one use and the quality is terrible. I'm requesting a full refund.",
    emotion: "💸",
    type: "Product Issue",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    category: "Experience Review",
    text: "Had such a wonderful time at the event! Everything was well organized and the staff was incredibly friendly and helpful. Will definitely attend again next year.",
    emotion: "🎉",
    type: "Event Feedback",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    category: "App Review",
    text: "The app works well most of the time but has some bugs that need fixing. The interface is clean and intuitive, but the occasional crashes are frustrating. Good potential though.",
    emotion: "📱",
    type: "Tech Review",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  }
];

const SampleTexts: React.FC<SampleTextsProps> = ({ onSelectSample }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-sm rounded-3xl border border-purple-200/40 p-8 shadow-2xl">
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl shadow-lg">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <span>Sample Text Examples</span>
            <Star className="h-5 w-5 text-yellow-500" />
          </h3>
          <p className="text-sm text-gray-600">Click any example to analyze its sentiment instantly</p>
        </div>
      </div>

      <div className="grid gap-4 max-h-96 overflow-y-auto custom-scrollbar">
        {sampleTexts.map((sample, index) => (
          <div
            key={index}
            className="group p-5 bg-gradient-to-r from-white/80 to-purple-50/60 rounded-2xl border border-purple-100/60 hover:from-white/95 hover:to-purple-50/80 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:scale-[1.02] hover:border-purple-200"
            onClick={() => onSelectSample(sample.text)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={sample.image} 
                    alt={sample.category}
                    className="w-12 h-12 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 text-lg">{sample.emotion}</div>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-semibold text-purple-700 bg-purple-100/80 px-3 py-1 rounded-full border border-purple-200">
                    {sample.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{sample.type}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(sample.text);
                }}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-purple-100 rounded-xl transition-all duration-300 transform hover:scale-110"
                title="Copy text"
              >
                <Copy className="h-4 w-4 text-purple-600" />
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 group-hover:text-gray-900 transition-colors duration-200">
              {sample.text}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <MessageCircle className="h-3 w-3" />
                <span>{sample.text.split(' ').length} words</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-1 text-xs text-purple-600 font-medium">
                  <span>Click to analyze</span>
                  <Heart className="h-3 w-3 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Footer */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50/80 to-blue-50/80 rounded-xl border border-purple-200/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>Try different examples to see how sentiment varies</span>
          </div>
          <div className="text-xs text-gray-500 bg-white/70 px-2 py-1 rounded-full">
            {sampleTexts.length} examples
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleTexts;