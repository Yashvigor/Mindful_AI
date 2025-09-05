import React, { useState } from 'react';
import { Calendar, Heart, Smile, Frown, Meh, Zap, Clock } from 'lucide-react';

interface DailyCheckInProps {
  onCheckInComplete: (data: { mood: string; energy: number; notes: string }) => void;
}

export default function DailyCheckIn({ onCheckInComplete }: DailyCheckInProps) {
  const [selectedMood, setSelectedMood] = useState('');
  const [energyLevel, setEnergyLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const moods = [
    { id: 'excellent', icon: Smile, label: 'Excellent', color: 'text-green-500' },
    { id: 'good', icon: Smile, label: 'Good', color: 'text-blue-500' },
    { id: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
    { id: 'low', icon: Frown, label: 'Low', color: 'text-orange-500' },
    { id: 'struggling', icon: Frown, label: 'Struggling', color: 'text-red-500' },
  ];

  const handleSubmit = () => {
    if (!selectedMood) return;

    const checkInData = {
      mood: selectedMood,
      energy: energyLevel,
      notes,
    };

    onCheckInComplete(checkInData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 text-center shadow-lg">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">Your daily check-in has been recorded. Remember, every day is a new opportunity for wellness.</p>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-gray-600">
            Based on your check-in, I'll provide personalized recommendations throughout the day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Calendar className="w-8 h-8 text-purple-600" />
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Daily Check-In</h3>
          <p className="text-gray-600">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Mood Selection */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">How are you feeling today?</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedMood === mood.id
                  ? 'border-purple-500 bg-purple-100 shadow-lg scale-105'
                  : 'border-gray-200 bg-white/80 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <mood.icon className={`w-8 h-8 mx-auto mb-2 ${mood.color}`} />
              <p className="text-sm font-medium text-gray-700">{mood.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Energy Level */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-yellow-500" />
          <h4 className="text-lg font-semibold text-gray-800">Energy Level</h4>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 w-8">Low</span>
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-gray-600 w-8">High</span>
          </div>
          <div className="text-center mt-3">
            <span className="text-2xl font-bold text-purple-600">{energyLevel}/10</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-6 h-6 text-blue-500" />
          <h4 className="text-lg font-semibold text-gray-800">What's on your mind? (Optional)</h4>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Share any thoughts, goals, or concerns for today..."
          className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm resize-none h-24"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedMood}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Complete Check-In
      </button>
    </div>
  );
}