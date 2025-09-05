import React from 'react';
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: string;
  energy: number;
}

interface MoodTrackerProps {
  moodHistory: MoodEntry[];
}

export default function MoodTracker({ moodHistory }: MoodTrackerProps) {
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'neutral': return 'bg-yellow-500';
      case 'low': return 'bg-orange-500';
      case 'struggling': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'excellent': return '😊';
      case 'good': return '🙂';
      case 'neutral': return '😐';
      case 'low': return '😔';
      case 'struggling': return '😟';
      default: return '🤔';
    }
  };

  const getAverageEnergy = () => {
    if (moodHistory.length === 0) return 0;
    const total = moodHistory.reduce((sum, entry) => sum + entry.energy, 0);
    return Math.round(total / moodHistory.length * 10) / 10;
  };

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return 'stable';
    
    const moodValues = {
      'excellent': 5,
      'good': 4,
      'neutral': 3,
      'low': 2,
      'struggling': 1
    };
    
    const recent = moodHistory.slice(-3);
    const older = moodHistory.slice(-6, -3);
    
    if (recent.length === 0 || older.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((sum, entry) => sum + (moodValues[entry.mood as keyof typeof moodValues] || 3), 0) / recent.length;
    const olderAvg = older.reduce((sum, entry) => sum + (moodValues[entry.mood as keyof typeof moodValues] || 3), 0) / older.length;
    
    if (recentAvg > olderAvg + 0.3) return 'improving';
    if (recentAvg < olderAvg - 0.3) return 'declining';
    return 'stable';
  };

  const getTrendIcon = () => {
    const trend = getMoodTrend();
    switch (trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = () => {
    const trend = getMoodTrend();
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-8">
        <BarChart3 className="w-8 h-8 text-amber-600" />
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Mood Insights</h3>
          <p className="text-gray-600">Track your emotional wellness journey</p>
        </div>
      </div>

      {moodHistory.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-gray-600 mb-2">No mood data yet</h4>
          <p className="text-gray-500">Start tracking your daily mood to see insights here</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">{getTrendIcon()}</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">Trend</h4>
              <p className={`text-sm font-medium capitalize ${getTrendColor()}`}>
                {getMoodTrend()}
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">Avg Energy</h4>
              <p className="text-2xl font-bold text-amber-600">{getAverageEnergy()}/10</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">📅</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-1">Days Tracked</h4>
              <p className="text-2xl font-bold text-amber-600">{moodHistory.length}</p>
            </div>
          </div>

          {/* Recent Mood History */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Recent Mood History
            </h4>
            
            <div className="space-y-3">
              {moodHistory.slice(-7).reverse().map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <p className="font-medium text-gray-800 capitalize">{entry.mood}</p>
                      <p className="text-sm text-gray-600">{new Date(entry.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Energy:</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-4 rounded-sm ${
                            i < entry.energy ? 'bg-amber-500' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-amber-600">{entry.energy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}