import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Wind, Brain, Heart, Clock } from 'lucide-react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  icon: React.ComponentType<any>;
  instructions: string[];
  type: 'breathing' | 'meditation' | 'body';
}

export default function MindfulnessExercises() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const exercises: Exercise[] = [
    {
      id: '4-7-8-breathing',
      title: '4-7-8 Breathing',
      description: 'A calming breath pattern to reduce anxiety and promote relaxation',
      duration: 240, // 4 minutes
      icon: Wind,
      type: 'breathing',
      instructions: [
        'Sit comfortably with your back straight',
        'Place your tongue against the ridge behind your upper teeth',
        'Exhale completely through your mouth',
        'Inhale through your nose for 4 counts',
        'Hold your breath for 7 counts',
        'Exhale through your mouth for 8 counts',
        'Repeat this cycle 3-4 times'
      ]
    },
    {
      id: 'body-scan',
      title: 'Body Scan Meditation',
      description: 'Progressive relaxation technique to release tension',
      duration: 600, // 10 minutes
      icon: Brain,
      type: 'body',
      instructions: [
        'Lie down comfortably or sit in a chair',
        'Close your eyes and take three deep breaths',
        'Start by noticing your toes and feet',
        'Slowly move your attention up through your body',
        'Notice each part without trying to change anything',
        'If you find tension, breathe into that area',
        'Continue until you reach the top of your head'
      ]
    },
    {
      id: 'loving-kindness',
      title: 'Loving Kindness Meditation',
      description: 'Cultivate compassion for yourself and others',
      duration: 480, // 8 minutes
      icon: Heart,
      type: 'meditation',
      instructions: [
        'Sit comfortably and close your eyes',
        'Begin by directing loving thoughts to yourself',
        'Repeat: "May I be happy, may I be healthy, may I be at peace"',
        'Visualize someone you care about',
        'Send them the same loving wishes',
        'Extend this to neutral people, then difficult people',
        'Finally, send loving kindness to all beings everywhere'
      ]
    },
    {
      id: 'box-breathing',
      title: 'Box Breathing',
      description: 'Equal count breathing for focus and calm',
      duration: 300, // 5 minutes
      icon: Wind,
      type: 'breathing',
      instructions: [
        'Sit with your back straight and feet flat on floor',
        'Inhale through your nose for 4 counts',
        'Hold your breath for 4 counts',
        'Exhale through your mouth for 4 counts',
        'Hold empty for 4 counts',
        'Repeat this square pattern',
        'Visualize drawing a box with your breath'
      ]
    }
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setTimeLeft(exercise.duration);
    setCurrentStep(0);
    setIsActive(true);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (selectedExercise) {
      setTimeLeft(selectedExercise.duration);
      setIsActive(false);
      setCurrentStep(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'breathing': return 'from-blue-500 to-cyan-600';
      case 'meditation': return 'from-purple-500 to-indigo-600';
      case 'body': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (selectedExercise) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 bg-gradient-to-r ${getTypeColor(selectedExercise.type)} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <selectedExercise.icon className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedExercise.title}</h3>
          <p className="text-gray-600">{selectedExercise.description}</p>
        </div>

        {/* Timer */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-6 text-center">
          <div className="text-6xl font-bold text-indigo-600 mb-4">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={toggleTimer}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
              }`}
            >
              {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>
            
            <button
              onClick={resetTimer}
              className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
            >
              <RotateCcw className="w-8 h-8" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className={`bg-gradient-to-r ${getTypeColor(selectedExercise.type)} h-3 rounded-full transition-all duration-1000`}
              style={{ width: `${((selectedExercise.duration - timeLeft) / selectedExercise.duration) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Instructions</h4>
          <div className="space-y-3">
            {selectedExercise.instructions.map((instruction, index) => (
              <div 
                key={index}
                className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  index === currentStep ? 'bg-indigo-100 border-l-4 border-indigo-500' : 'bg-gray-50'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === currentStep ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setSelectedExercise(null)}
          className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
        >
          Back to Exercises
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center space-x-3 mb-8">
        <Brain className="w-8 h-8 text-teal-600" />
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Mindfulness Exercises</h3>
          <p className="text-gray-600">Choose an exercise to begin your practice</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start space-x-4 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(exercise.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <exercise.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{exercise.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{Math.ceil(exercise.duration / 60)} minutes</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => startExercise(exercise)}
              className={`w-full py-3 bg-gradient-to-r ${getTypeColor(exercise.type)} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200`}
            >
              Start Exercise
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}