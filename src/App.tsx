import React, { useState } from 'react';
import { Heart, MessageSquare, Activity, Brain, BookOpen, Menu, X } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import DailyCheckIn from './components/DailyCheckIn';
import MindfulnessExercises from './components/MindfulnessExercises';
import MoodTracker from './components/MoodTracker';
import WellnessResources from './components/WellnessResources';

interface MoodEntry {
  date: string;
  mood: string;
  energy: number;
}

type TabType = 'chat' | 'checkin' | 'exercises' | 'tracker' | 'resources';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCheckInComplete = (data: { mood: string; energy: number; notes: string }) => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString(),
      mood: data.mood,
      energy: data.energy,
    };
    
    setMoodHistory(prev => [...prev, newEntry]);
    setCurrentMood(data.mood);
  };

  const handleMoodUpdate = (mood: string) => {
    setCurrentMood(mood);
  };

  const tabs = [
    { id: 'chat' as TabType, label: 'Chat', icon: MessageSquare },
    { id: 'checkin' as TabType, label: 'Check-In', icon: Heart },
    { id: 'exercises' as TabType, label: 'Mindfulness', icon: Brain },
    { id: 'tracker' as TabType, label: 'Insights', icon: Activity },
    { id: 'resources' as TabType, label: 'Resources', icon: BookOpen },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface onMoodUpdate={handleMoodUpdate} />;
      case 'checkin':
        return <DailyCheckIn onCheckInComplete={handleCheckInComplete} />;
      case 'exercises':
        return <MindfulnessExercises />;
      case 'tracker':
        return <MoodTracker moodHistory={moodHistory} />;
      case 'resources':
        return <WellnessResources />;
      default:
        return <ChatInterface onMoodUpdate={handleMoodUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MindfulAI</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Your Personal Wellness Companion</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100">
            <nav className="px-4 py-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-[calc(100vh-12rem)] overflow-hidden">
            {renderTabContent()}
          </div>
        </div>
      </main>

      {/* Floating Mood Indicator */}
      {currentMood && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700 capitalize">
                Feeling {currentMood}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;