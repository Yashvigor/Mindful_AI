import React from 'react';
import { Phone, MessageCircle, Book, ExternalLink, Heart, AlertTriangle } from 'lucide-react';

export default function WellnessResources() {
  const crisisResources = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 free and confidential emotional support',
      urgent: true
    },
    {
      name: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis counseling via text message',
      urgent: true
    },
    {
      name: 'NAMI Helpline',
      number: '1-800-950-NAMI (6264)',
      description: 'Mental health support and resources',
      urgent: false
    }
  ];

  const resources = [
    {
      title: 'Mindfulness Apps',
      items: [
        { name: 'Headspace', description: 'Guided meditation and mindfulness' },
        { name: 'Calm', description: 'Sleep stories, meditation, and relaxation' },
        { name: 'Ten Percent Happier', description: 'Practical meditation courses' }
      ]
    },
    {
      title: 'Books & Articles',
      items: [
        { name: 'The Mindful Way Through Depression', description: 'By Williams, Teasdale, Segal, and Kabat-Zinn' },
        { name: 'Wherever You Go, There You Are', description: 'By Jon Kabat-Zinn' },
        { name: 'The Happiness Trap', description: 'By Russ Harris' }
      ]
    },
    {
      title: 'Professional Help',
      items: [
        { name: 'Psychology Today', description: 'Find therapists and counselors near you' },
        { name: 'BetterHelp', description: 'Online therapy and counseling' },
        { name: 'Your Healthcare Provider', description: 'Speak with your doctor about mental health' }
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-8">
        <Heart className="w-8 h-8 text-red-500" />
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Wellness Resources</h3>
          <p className="text-gray-600">Support and resources for your mental health journey</p>
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <h4 className="text-xl font-bold text-red-600">Crisis Support - Available 24/7</h4>
        </div>
        
        <div className="space-y-4">
          {crisisResources.map((resource, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-xl border-2 ${
                resource.urgent 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-white/80 backdrop-blur-sm border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-800 mb-1">{resource.name}</h5>
                  <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                  <div className="flex items-center space-x-2">
                    {resource.number && (
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4 text-red-500" />
                        <span className="font-bold text-red-600">{resource.number}</span>
                      </div>
                    )}
                    {resource.contact && (
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4 text-red-500" />
                        <span className="font-bold text-red-600">{resource.contact}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Resources */}
      <div className="space-y-6">
        {resources.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Book className="w-5 h-5 mr-2 text-pink-500" />
              {category.title}
            </h4>
            
            <div className="space-y-3">
              {category.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <ExternalLink className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h6 className="font-medium text-gray-800">{item.name}</h6>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-semibold text-yellow-800 mb-1">Important Notice</h5>
            <p className="text-sm text-yellow-700">
              This app provides wellness support but is not a substitute for professional mental health care. 
              If you're experiencing a mental health crisis, please contact emergency services or use the crisis resources above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}