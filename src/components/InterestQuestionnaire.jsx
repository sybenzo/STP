import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Sprout, Building, Palette, Briefcase, GraduationCap, DollarSign, Scale, Stethoscope, Plane, Home, Monitor, Shield, Cog, Megaphone, Microscope, Truck } from 'lucide-react';
import './InterestQuestionnaire.css';
import { useNavigate } from 'react-router-dom';
const InterestQuestionnaire = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const interestClusters = [
    {
      id: 'agriculture',
      name: 'Agriculture, Food & Natural Resources',
      icon: Sprout,
      color: 'agriculture-gradient',
      emoji: '🌱',
      description: 'Working with nature and natural resources',
      statements: [
        'Learn how things grow and stay alive.',
        'Make the best use of earth\'s natural resources.',
        'Hunt and/or fish.',
        'Protect the environment.'
      ]
    },
    {
      id: 'architecture',
      name: 'Architecture & Construction',
      icon: Building,
      color: 'architecture-gradient',
      emoji: '🏗️',
      description: 'Building and designing structures',
      statements: [
        'Read and follow blueprints or technical instructions.',
        'Picture what a finished product looks like.',
        'Work with your hands to solve practical problems.',
        'Visit and learn from interesting structures or places.'
      ]
    },
    {
      id: 'arts',
      name: 'Arts, A/V Technology & Communications',
      icon: Palette,
      color: 'arts-gradient',
      emoji: '🎭',
      description: 'Creative expression and communication',
      statements: [
        'Use imagination to communicate ideas.',
        'Perform or speak in front of others.',
        'Create artistic content like videos, music, or design.',
        'Read, write, and express creatively.'
      ]
    },
    {
      id: 'business',
      name: 'Business Management & Administration',
      icon: Briefcase,
      color: 'business-gradient',
      emoji: '🏢',
      description: 'Managing and organizing business operations',
      statements: [
        'Organize and lead tasks in a group.',
        'Work with data, numbers, or reports.',
        'Use computer programs to manage tasks.',
        'Plan and follow instructions carefully.'
      ]
    },
    {
      id: 'education',
      name: 'Education & Training',
      icon: GraduationCap,
      color: 'education-gradient',
      emoji: '🎓',
      description: 'Teaching and developing others',
      statements: [
        'Help others learn new things.',
        'Explain ideas clearly to different people.',
        'Direct and plan group activities.',
        'Handle multiple responsibilities at once.'
      ]
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: DollarSign,
      color: 'finance-gradient',
      emoji: '💰',
      description: 'Working with money and financial data',
      statements: [
        'Work with numbers and money.',
        'Meet deadlines and follow rules.',
        'Interpret financial data.',
        'Dress and act professionally.'
      ]
    },
    {
      id: 'government',
      name: 'Government & Public Administration',
      icon: Scale,
      color: 'government-gradient',
      emoji: '🏛️',
      description: 'Public service and governance',
      statements: [
        'Be involved in leadership or politics.',
        'Debate and analyze ideas.',
        'Plan community or group projects.',
        'Travel and experience new environments.'
      ]
    },
    {
      id: 'health',
      name: 'Health Science',
      icon: Stethoscope,
      color: 'health-gradient',
      emoji: '🏥',
      description: 'Healthcare and medical services',
      statements: [
        'Help sick people or animals.',
        'Make quick decisions under pressure.',
        'Work in teams to solve problems.',
        'Follow guidelines precisely.'
      ]
    },
    {
      id: 'hospitality',
      name: 'Hospitality & Tourism',
      icon: Plane,
      color: 'hospitality-gradient',
      emoji: '🌎',
      description: 'Travel and hospitality services',
      statements: [
        'Explore new places or cultures.',
        'Plan fun events or trips for others.',
        'Communicate politely with people.',
        'Work with people of all ages.'
      ]
    },
    {
      id: 'human',
      name: 'Human Services',
      icon: Home,
      color: 'human-gradient',
      emoji: '❤️',
      description: 'Helping people and communities',
      statements: [
        'Care about helping people with problems.',
        'Volunteer or help in your community.',
        'Support people emotionally or socially.',
        'Make friends with many kinds of people.'
      ]
    },
    {
      id: 'it',
      name: 'Information Technology',
      icon: Monitor,
      color: 'it-gradient',
      emoji: '💻',
      description: 'Technology and computer systems',
      statements: [
        'Solve technical problems using computers.',
        'Adapt quickly to new technologies.',
        'Focus deeply on complex tasks.',
        'Understand diagrams or instructions easily.'
      ]
    },
    {
      id: 'law',
      name: 'Law, Public Safety, Corrections & Security',
      icon: Shield,
      color: 'law-gradient',
      emoji: '⚖️',
      description: 'Legal and security services',
      statements: [
        'Make decisions during emergencies.',
        'Respect laws and authority.',
        'Analyze behavior and situations.',
        'Take leadership in enforcing rules.'
      ]
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: Cog,
      color: 'manufacturing-gradient',
      emoji: '🛠️',
      description: 'Production and manufacturing',
      statements: [
        'Work with tools or machines.',
        'Assemble or build physical objects.',
        'Follow organized procedures accurately.',
        'Visualize objects from technical drawings.'
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: Megaphone,
      color: 'marketing-gradient',
      emoji: '🛍️',
      description: 'Promotion and sales',
      statements: [
        'Promote products or ideas to others.',
        'Speak confidently in public.',
        'Design ads or visual presentations.',
        'Persuade people to take action.'
      ]
    },
    {
      id: 'stem',
      name: 'Science, Technology, Engineering & Mathematics',
      icon: Microscope,
      color: 'stem-gradient',
      emoji: '🔬',
      description: 'Scientific and technical fields',
      statements: [
        'Explore how things work through experiments.',
        'Use formulas and measurements.',
        'Work in a lab or with technology.',
        'Pay close attention to details.'
      ]
    },
    {
      id: 'transportation',
      name: 'Transportation, Distribution & Logistics',
      icon: Truck,
      color: 'transportation-gradient',
      emoji: '🚚',
      description: 'Moving people and goods',
      statements: [
        'Drive, ride, or move things efficiently.',
        'Solve mechanical problems.',
        'Design routes or delivery systems.',
        'React quickly and anticipate needs.'
      ]
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInterestSelect = (clusterId, statementIndex) => {
    const interestKey = `${clusterId}-${statementIndex}`;
    const newSelectedInterests = new Set(selectedInterests);
    
    if (newSelectedInterests.has(interestKey)) {
      newSelectedInterests.delete(interestKey);
    } else {
      newSelectedInterests.add(interestKey);
    }
    
    setSelectedInterests(newSelectedInterests);
    saveToLocalStorage(newSelectedInterests);
  };

  const saveToLocalStorage = (selectedInterests) => {
    const selectedStatements = Array.from(selectedInterests).reduce((acc, key) => {
      const [clusterId, statementIndex] = key.split('-');
      const cluster = interestClusters.find(cluster => cluster.id === clusterId);
      const statement = cluster.statements[parseInt(statementIndex)];

      if (!acc.some(item => item.name === cluster.name && item.description === cluster.description)) {
        acc.push({
          name: cluster.name,
          description: cluster.description,
          statements: []
        });
      }

      const clusterIndex = acc.findIndex(item => item.name === cluster.name && item.description === cluster.description);
      acc[clusterIndex].statements.push(statement);

      return acc;
    }, []);

    localStorage.setItem('selectedInterests', JSON.stringify(selectedStatements));
  };

  const goToCard = (cardIndex) => {
    if (cardIndex >= 0 && cardIndex < interestClusters.length) {
      setCurrentCardIndex(cardIndex);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < interestClusters.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      navigate('/result');
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const goBackToBehavioral = () => {
    alert('Navigate back to Behavioral Questions.');
  };

  const totalCards = interestClusters.length;
  const currentCardProgress = ((currentCardIndex + 1) / totalCards) * 100;
  const totalPossibleSelections = interestClusters.reduce((sum, cluster) => sum + cluster.statements.length, 0);
  const currentSelections = selectedInterests.size;
  const overallSelectionProgress = totalPossibleSelections > 0 ? (currentSelections / totalPossibleSelections) * 100 : 0;

  const currentCluster = interestClusters[currentCardIndex];
  const ClusterIcon = currentCluster?.icon;
  const selectedCount = currentCluster?.statements.filter((_, index) => 
    selectedInterests.has(`${currentCluster.id}-${index}`)
  ).length || 0;
  const clusterProgress = currentCluster ? (selectedCount / currentCluster.statements.length) * 100 : 0;

  return (
    <div className="interest-questionnaire-screen">
      {/* Progress Bar */}
      <div className="progress-header">
        <div className="progress-container">
          <div className="progress-info">
            <span>Interest Cards: {currentCardIndex + 1} of {totalCards}</span>
            <span>{Math.round(currentCardProgress)}% Complete</span>
          </div>
          <div className="main-progress-bar">
            <div 
              className="main-progress-fill"
              style={{ width: `${currentCardProgress}%` }}
            ></div>
          </div>
          <div className="overall-progress">
            <span>Overall Selections: {currentSelections} statements selected ({Math.round(overallSelectionProgress)}%)</span>
          </div>
        </div>
      </div>

      <div className="interest-questionnaire-content">
        {/* Section Header */}
        <div className="section-header">
          <h1 className="section-title">Interest Based Questions</h1>
          <p className="section-subtitle">
            Select statements that interest you for each career field. Click on any card indicator below to jump to that card.
          </p>
        </div>

        {/* Card Navigation Indicators - Now Clickable */}
        <div className="card-indicators">
          {interestClusters.map((cluster, index) => (
            <button
              key={cluster.id}
              onClick={() => goToCard(index)}
              className={`card-indicator clickable ${index === currentCardIndex ? 'active' : ''} ${
                cluster.statements.some((_, stIndex) => selectedInterests.has(`${cluster.id}-${stIndex}`)) ? 'has-selections' : ''
              }`}
              title={`Go to ${cluster.name}`}
            >
              <span className="indicator-emoji">{cluster.emoji}</span>
              <span className="indicator-index">{index + 1}</span>
            </button>
          ))}
        </div>

        {/* Single Interest Card */}
        <div className="single-interest-card-container">
          <div className="single-interest-card">
            {/* Card Header */}
            <div className="single-card-header">
              <div className={`single-card-icon-container ${currentCluster.color}`}>
                <ClusterIcon size={32} className="single-card-icon" />
              </div>
              <div className="single-card-title-section">
                <h2 className="single-card-title">
                  {currentCluster.emoji} {currentCluster.name}
                </h2>
                <p className="single-card-description">{currentCluster.description}</p>
                <div className="single-card-progress-info">
                  <span>{selectedCount}/{currentCluster.statements.length} selected</span>
                  <span className="progress-percentage">({Math.round(clusterProgress)}%)</span>
                </div>
              </div>
            </div>

            {/* Card Progress Bar */}
            <div className="single-card-progress-bar">
              <div 
                className={`single-card-progress-fill ${currentCluster.color}`}
                style={{ width: `${clusterProgress}%` }}
              ></div>
            </div>

            {/* Statements */}
            <div className="single-card-statements">
              <h3 className="statements-title">Select statements that interest you:</h3>
              <div className="statements-list">
                {currentCluster.statements.map((statement, index) => {
                  const isSelected = selectedInterests.has(`${currentCluster.id}-${index}`);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleInterestSelect(currentCluster.id, index)}
                      className={`single-statement-button ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="statement-content">
                        <span className="statement-text">{statement}</span>
                        {isSelected && (
                          <CheckCircle className="statement-check-icon" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="single-card-navigation">
          <button
            onClick={currentCardIndex === 0 ? goBackToBehavioral : previousCard}
            className="nav-button prev-button"
          >
            <ChevronLeft className="nav-icon" />
            <span>{currentCardIndex === 0 ? 'Back to Behavioral' : 'Previous'}</span>
          </button>

          <div className="card-counter">
            <div className="counter-text">Card Progress</div>
            <div className="counter-value">
              {currentCardIndex + 1} of {totalCards}
            </div>
          </div>

          <button
            onClick={nextCard}
            className="nav-button next-button"
          >
            <span>
              {currentCardIndex === interestClusters.length - 1 ? 'Complete' : 'Next'}
            </span>
            <ChevronRight className="nav-icon" />
          </button> 
        </div>
      </div>
    </div>
  );
};

export default InterestQuestionnaire;