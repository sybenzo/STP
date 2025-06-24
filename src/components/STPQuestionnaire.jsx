import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Brain, Heart, Users, Zap } from 'lucide-react';
import './STPQuestionnaire.css'; // Import your CSS styles

const BehavioralQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [behavioralAnswers, setBehavioralAnswers] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const dimensions = [
    {
      id: 'emotional',
      name: 'Emotional Intelligence',
      icon: Heart,
      color: 'emotional-gradient',
      emoji: '❤️',
      description: 'Understanding and managing emotions effectively',
      weight: 0.25
    },
    {
      id: 'social',
      name: 'Social Dynamics',
      icon: Users,
      color: 'social-gradient',
      emoji: '👥',
      description: 'Collaboration and interpersonal skills',
      weight: 0.25
    },
    {
      id: 'motivation',
      name: 'Drive & Ambition',
      icon: Zap,
      color: 'motivation-gradient',
      emoji: '⚡',
      description: 'Internal motivation and goal orientation',
      weight: 0.25
    },
    {
      id: 'resilience',
      name: 'Adaptability',
      icon: Brain,
      color: 'resilience-gradient',
      emoji: '🌱',
      description: 'Handling challenges and adapting to change',
      weight: 0.25
    }
  ];

  const behavioralQuestions = [
    { dimension: 'emotional', text: '1. How do you usually feel when you receive feedback from teachers?', emoji: '👨‍👩‍👧‍👦' },
    { dimension: 'emotional', text: '2. How do you feel before writing a test or exam?', emoji: '😰' },
    { dimension: 'emotional', text: '3. Do you get easily upset if you don"t perform well in school?', emoji: '🤔' },
    { dimension: 'emotional', text: '4. When you have a lot of homework, how do you usually feel?', emoji: '😔' },
    { dimension: 'emotional', text: '5. How often do you feel calm and relaxed during your school day?', emoji: '😌' },
    { dimension: 'emotional', text: '6. What do you usually do when you feel sad or frustrated?', emoji: '🤗' },
    
    { dimension: 'social', text: '7. Do you enjoy participating in school events or group activities?', emoji: '👥' },
    { dimension: 'social', text: '8. Do you enjoy working in teams or group projects?', emoji: '👑' },
    { dimension: 'social', text: '9. How often do you start conversations with classmates or teachers?', emoji: '💬' },
    { dimension: 'social', text: '10. Do you find it easy to make new friends?', emoji: '🤝' },
    { dimension: 'social', text: '11. Do you feel comfortable sharing your ideas in class discussions?', emoji: '🎤' },
    { dimension: 'social', text: '12. How do you usually respond when someone in your class needs help?', emoji: '🌐' },

    { dimension: 'motivation', text: '13. What keeps you going when you\'re finding a subject difficult?', emoji: '🎯' },
    { dimension: 'motivation', text: '14. Do you set goals for yourself at school or in life?', emoji: '🚀' },
    { dimension: 'motivation', text: '15. How do you feel when you complete a difficult assignment?', emoji: '💪' },
    { dimension: 'motivation', text: '16. Do you like challenging yourself to do better than before?', emoji: '🌟' },
    { dimension: 'motivation', text: '17. What motivates you to study even when you\'re tired or distracted?', emoji: '📈' },
    { dimension: 'motivation', text: '18. Do you try to improve your performance after receiving feedback?', emoji: '🏆' },

    { dimension: 'resilience', text: '19. How do you deal with peer pressure or negative comments?', emoji: '🧠' },
    { dimension: 'resilience', text: '20. What do you do when things don\'t go as planned?', emoji: '🔄' },
    { dimension: 'resilience', text: '21. How quickly do you bounce back after a failure or poor result?', emoji: '📚' },
    { dimension: 'resilience', text: '22. Do you ask for help when you don\'t understand something?', emoji: '🎯' },
    { dimension: 'resilience', text: '23. When someone criticizes your work, how do you react?', emoji: '🧩' },
    { dimension: 'resilience', text: '24. Have you ever improved in something you used to struggle with?', emoji: '🌪️' },
  ];

  const responseOptions = [
    { value: 1, label: 'Very True for Me', emoji: '🔴', color: 'option-red' },
    { value: 2, label: 'Mostly True for Me', emoji: '🟡', color: 'option-orange' },
    { value: 3, label: 'Sometimes True for Me', emoji: '🟢', color: 'option-yellow' },
    { value: 4, label: 'Rarely True for Me', emoji: '🔵', color: 'option-blue' },
    { value: 5, label: 'Not at All True for Me', emoji: '🟢', color: 'option-green' }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAnswer = (value) => {
    setBehavioralAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < behavioralQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Complete behavioral section
      alert('Behavioral section completed! Navigate to Interest questions.');
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Calculate progress
  const answeredQuestions = Object.keys(behavioralAnswers).length;
  const totalQuestions = behavioralQuestions.length;
  const currentSectionProgress = ((currentQuestion + 1) / totalQuestions) * 100;
  const overallProgress = (answeredQuestions / totalQuestions) * 100;

  const currentQuestionData = behavioralQuestions[currentQuestion];
  const currentDimension = dimensions.find(d => d.id === currentQuestionData?.dimension);
  const DimensionIcon = currentDimension?.icon;

  return (
    <div className="questionnaire-screen">
      {/* Progress Bar */}
      <div className="progress-header">
        <div className="progress-container">
          <div className="progress-info">
            <span>Behavioral Questions </span>
          </div>
          <div className="main-progress-bar">
            <div 
              className="main-progress-fill"
              style={{ width: `${currentSectionProgress}%` }}
            ></div>
          </div>
          <div className="overall-progress">
            <span>Overall Progress: {answeredQuestions} of {totalQuestions} answered ({Math.round(overallProgress)}%)</span>
          </div>
        </div>
      </div>

      <div className="questionnaire-content">
        {/* Section Header */}
          {/* <div className="section-header">
            <h1 className="section-title">Behavioral Questions</h1>
            <p className="section-subtitle">Tell us about your personality and behavior patterns</p>
          </div> */}

        {/* Dimension Header and Progress */}
        <div className="dimension-header-container">
          <div className="dimension-header">
            <div className={`dimension-icon-container ${currentDimension?.color}`}>
              {DimensionIcon && <DimensionIcon className="dimension-icon" />}
            </div>
            <h2 className="dimension-title">
              {currentDimension?.name} {currentDimension?.emoji}
            </h2>
            <p className="dimension-description">{currentDimension?.description}</p>
          </div>

          {/* Dimension Progress Indicators */}
          <div className="dimension-progress">
            {dimensions.map((dim, index) => {
              const questionsInDim = behavioralQuestions.filter(q => q.dimension === dim.id).length;
              const answeredInDim = behavioralQuestions
                .map((q, qIndex) => ({ ...q, qIndex }))
                .filter(q => q.dimension === dim.id && behavioralAnswers[q.qIndex])
                .length;
              const dimProgress = questionsInDim > 0 ? (answeredInDim / questionsInDim) * 100 : 0;
              
              return (
                <div key={dim.id} className="dim-progress-card">
                  <div className="dim-progress-emoji">{dim.emoji}</div>
                  <div className="dim-progress-name">{dim.name}</div>
                  <div className="dim-progress-bar-bg">
                    <div 
                      className={`dim-progress-bar ${dim.color}`}
                      style={{ width: `${dimProgress}%` }}
                    ></div>
                  </div>
                  <div className="dim-progress-text">
                    {answeredInDim}/{questionsInDim}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="question-content">
            <div className="question-emoji">
              {currentQuestionData?.emoji}
            </div>
            <h3 className="question-text">
              {currentQuestionData?.text}
            </h3>
          </div>

          {/* Response Options */}
          <div className="options-container">
            {responseOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`option-button ${
                  behavioralAnswers[currentQuestion] === option.value
                    ? `${option.color} selected`
                    : 'option-default'
                }`}
              >
                <div className="option-content">
                  <div className="option-left">
                    <span className="option-emoji">{option.emoji}</span>  
                    <span className="option-label">{option.label}</span>
                  </div>
                  {behavioralAnswers[currentQuestion] === option.value && (
                    <CheckCircle className="check-icon" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="navigation">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="nav-button prev-button"
            >
              <ChevronLeft className="nav-icon" />
              <span>Previous</span>
            </button>

            <div className="dimension-counter">
              <div className="counter-text">Question Progress</div>  
              <div className="counter-value">
                {currentQuestion + 1} of {totalQuestions}
              </div>
            </div>

            <button
              onClick={nextQuestion}
              disabled={!behavioralAnswers[currentQuestion]}
              className="nav-button next-button"
            >
              <span>
                {currentQuestion === behavioralQuestions.length - 1 
                  ? 'Complete Behavioral' 
                  : 'Next'
                }
              </span>
              <ChevronRight className="nav-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralQuestionnaire;