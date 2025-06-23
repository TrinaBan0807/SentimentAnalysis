import React from 'react';
import { Lightbulb, Copy, Star, MessageCircle, Heart } from 'lucide-react';

interface SampleTextsProps {
  onSelectSample: (text: string) => void;
}

const sampleTexts = [
  {
    category: "Product Review",
    text: "This product is absolutely amazing! The quality exceeded my expectations and the design is beautiful. I would definitely recommend it to anyone looking for something reliable and stylish.",
    emotion: "⭐",
    type: "Positive Review"
  },
  {
    category: "Service Feedback", 
    text: "I'm really disappointed with the service I received. The staff seemed uninterested and I had to wait way too long for assistance. This was not the experience I was hoping for.",
    emotion: "😞",
    type: "Service Issue"
  },
  {
    category: "Product Review",
    text: "The item I ordered was decent quality but not quite what I expected. The delivery was fast which was great, but the product itself was just okay. Mixed feelings overall.",
    emotion: "🤷",
    type: "Mixed Review"
  },
  {
    category: "Social Media",
    text: "Just tried this new restaurant and WOW! The food was incredible and the atmosphere was perfect. Already planning my next visit! #foodie #amazing",
    emotion: "🍽️",
    type: "Social Praise"
  },
  {
    category: "General Feedback",
    text: "The team did an outstanding job on this project. Their attention to detail and professionalism really impressed me. This is exactly the kind of work I was looking for!",
    emotion: "💼",
    type: "Professional Praise"
  },
  {
    category: "Product Review",
    text: "Unfortunately, this purchase was a complete waste of money. The item broke after just one use and the quality is terrible. I'm requesting a full refund.",
    emotion: "💸",
    type: "Product Issue"
  },
  {
    category: "Experience Review",
    text: "Had such a wonderful time at the event! Everything was well organized and the staff was incredibly friendly and helpful. Will definitely attend again next year.",
    emotion: "🎉",
    type: "Event Feedback"
  },
  {
    category: "App Review",
    text: "The app works well most of the time but has some bugs that need fixing. The interface is clean and intuitive, but the occasional crashes are frustrating. Good potential though.",
    emotion: "📱",
    type: "Tech Review"
  }
];

const SampleTexts: React.FC<SampleTextsProps> = ({ onSelectSample }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
          <Lightbulb className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sample Text Examples</h3>
          <p className="text-sm text-gray-600">Try these examples to see sentiment analysis in action</p>
        </div>
      </div>

      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {sampleTexts.map((sample, index) => (
          <div
            key={index}
            className="group p-4 bg-gradient-to-r from-gray-50/80 to-purple-50/50 rounded-xl border border-purple-100/50 hover:from-white/90 hover:to-purple-50/80 transition-all duration-200 cursor-pointer hover:shadow-md"
            onClick={() => onSelectSample(sample.text)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{sample.emotion}</span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                    {sample.category}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">{sample.type}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(sample.text);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-purple-100 rounded-lg transition-all duration-200"
                title="Copy text"
              >
                <Copy className="h-4 w-4 text-purple-600" />
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
              {sample.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleTexts;