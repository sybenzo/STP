import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Users, Brain, Heart, Zap, ChevronRight, Download, Share, RotateCcw } from 'lucide-react';
import './ResultPage.css';

const CareerResults = () => {
  const [animationStage, setAnimationStage] = useState(0);
  const [selectedCareer, setSelectedCareer] = useState(null);

  // Mock results based on behavioral and interest data
  const mockResults = {
    topMatches: [
      {
        id: 1,
        title: 'Software Developer',
        field: 'Information Technology',
        match: 94,
        salary: '$75,000 - $120,000',
        growth: 'High (22% growth)',
        description: 'Design and develop software applications, websites, and systems.',
        skills: ['Problem Solving', 'Logical Thinking', 'Creativity', 'Attention to Detail'],
        pathways: ['Computer Science Degree', 'Coding Bootcamp', 'Self-taught + Portfolio'],
        workEnvironment: 'Office/Remote',
        icon: '💻',
        color: 'tech-gradient'
      },
      {
        id: 2,
        title: 'Marketing Specialist',
        field: 'Marketing & Communications',
        match: 91,
        salary: '$45,000 - $85,000',
        growth: 'Medium (10% growth)',
        description: 'Create and implement marketing strategies to promote products and services.',
        skills: ['Communication', 'Creativity', 'Analytical Thinking', 'Social Media'],
        pathways: ['Marketing Degree', 'Digital Marketing Certification', 'Business Degree'],
        workEnvironment: 'Office/Hybrid',
        icon: '📱',
        color: 'marketing-gradient'
      },
      {
        id: 3,
        title: 'Nurse Practitioner',
        field: 'Health Science',
        match: 88,
        salary: '$95,000 - $130,000',
        growth: 'Very High (52% growth)',
        description: 'Provide advanced nursing care and can prescribe medications.',
        skills: ['Empathy', 'Critical Thinking', 'Communication', 'Problem Solving'],
        pathways: ['Nursing Degree', 'Master\'s in Nursing', 'Clinical Experience'],
        workEnvironment: 'Hospital/Clinic',
        icon: '🏥',
        color: 'health-gradient'
      },
      {
        id: 4,
        title: 'UX/UI Designer',
        field: 'Arts & Technology',
        match: 86,
        salary: '$65,000 - $110,000',
        growth: 'High (13% growth)',
        description: 'Design user interfaces and experiences for digital products.',
        skills: ['Creativity', 'User Research', 'Prototyping', 'Visual Design'],
        pathways: ['Design Degree', 'UX Bootcamp', 'Portfolio Development'],
        workEnvironment: 'Office/Remote',
        icon: '🎨',
        color: 'design-gradient'
      },
      {
        id: 5,
        title: 'Data Analyst',
        field: 'Business & Analytics',
        match: 83,
        salary: '$55,000 - $95,000',
        growth: 'High (25% growth)',
        description: 'Analyze data to help businesses make informed decisions.',
        skills: ['Analytical Thinking', 'Statistics', 'Data Visualization', 'Problem Solving'],
        pathways: ['Statistics Degree', 'Data Science Bootcamp', 'Business Analytics Degree'],
        workEnvironment: 'Office/Remote',
        icon: '📊',
        color: 'data-gradient'
      }
    ],
    personalityInsights: {
      strengths: [
        { name: 'Problem Solving', score: 92, icon: '🧩' },
        { name: 'Creativity', score: 88, icon: '💡' },
        { name: 'Communication', score: 85, icon: '💬' },
        { name: 'Leadership', score: 79, icon: '👑' }
      ],
      workStyle: 'Collaborative Innovator',
      idealEnvironment: 'Dynamic team environment with creative challenges'
    }
  };

  useEffect(() => {
    const stages = [0, 1, 2, 3];
    stages.forEach((stage, index) => {
      setTimeout(() => setAnimationStage(stage), index * 800);
    });
  }, []);

  const handleRetakeQuiz = () => {
    // Navigate back to behavioral questions
    window.location.href = '/questionnaire';
  };

  const handleDownloadResults = () => {
    alert('Results downloaded! (This would generate a PDF report)');
  };

  const handleShareResults = () => {
    alert('Results shared! (This would open sharing options)');
  };

  return (
    <div className="career-results-container">
      {/* Hero Section */}
      <div className={`results-hero ${animationStage >= 0 ? 'animate-in' : ''}`}>
        <div className="hero-content">
          <div className="celebration-icon">🎉</div>
          <h1 className="hero-title">Your Career Journey Awaits!</h1>
          <p className="hero-subtitle">
            Based on your responses, we've identified careers that match your personality, 
            interests, and strengths.
          </p>
          <div className="results-stats">
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Top Matches</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">16</span>
              <span className="stat-label">Career Fields</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">94%</span>
              <span className="stat-label">Best Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personality Insights */}
      <div className={`personality-section ${animationStage >= 1 ? 'animate-in' : ''}`}>
        <h2 className="section-title">
          <Brain className="section-icon" />
          Your Personality Profile
        </h2>
        <div className="personality-card">
          <div className="work-style-badge">
            <Heart className="badge-icon" />
            <span>{mockResults.personalityInsights.workStyle}</span>
          </div>
          <p className="ideal-environment">{mockResults.personalityInsights.idealEnvironment}</p>
          
          <div className="strengths-grid">
            {mockResults.personalityInsights.strengths.map((strength, index) => (
              <div key={strength.name} className="strength-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="strength-icon">{strength.icon}</div>
                <div className="strength-info">
                  <span className="strength-name">{strength.name}</span>
                  <div className="strength-bar">
                    <div 
                      className="strength-fill"
                      style={{ width: `${strength.score}%` }}
                    ></div>
                  </div>
                  <span className="strength-score">{strength.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Matches */}
      <div className={`careers-section ${animationStage >= 2 ? 'animate-in' : ''}`}>
        <h2 className="section-title">
          <TrendingUp className="section-icon" />
          Your Top Career Matches
        </h2>
        
        <div className="careers-grid">
          {mockResults.topMatches.map((career, index) => (
            <div 
              key={career.id} 
              className={`career-card ${selectedCareer === career.id ? 'selected' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedCareer(selectedCareer === career.id ? null : career.id)}
            >
              <div className="career-header">
                <div className={`career-icon ${career.color}`}>
                  <span className="career-emoji">{career.icon}</span>
                </div>
                <div className="career-info">
                  <h3 className="career-title">{career.title}</h3>
                  <p className="career-field">{career.field}</p>
                </div>
                <div className="match-score">
                  <Star className="star-icon" />
                  <span className="match-percentage">{career.match}%</span>
                </div>
              </div>

              <div className="career-quick-info">
                <div className="quick-stat">
                  <span className="stat-label">Salary</span>
                  <span className="stat-value">{career.salary}</span>
                </div>
                <div className="quick-stat">
                  <span className="stat-label">Growth</span>
                  <span className="stat-value">{career.growth}</span>
                </div>
              </div>

              <p className="career-description">{career.description}</p>

              {selectedCareer === career.id && (
                <div className="career-details">
                  <div className="details-section">
                    <h4>Key Skills</h4>
                    <div className="skills-tags">
                      {career.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="details-section">
                    <h4>Career Pathways</h4>
                    <ul className="pathways-list">
                      {career.pathways.map((pathway, pathIndex) => (
                        <li key={pathIndex}>{pathway}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="details-section">
                    <h4>Work Environment</h4>
                    <p>{career.workEnvironment}</p>
                  </div>
                </div>
              )}
              
              <div className="career-action">
                <ChevronRight className="action-icon" />
                <span>Click to explore</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`actions-section ${animationStage >= 3 ? 'animate-in' : ''}`}>
        <div className="actions-grid">
          <button className="action-button primary" onClick={handleDownloadResults}>
            <Download className="button-icon" />
            <span>Download Report</span>
          </button>
          
          <button className="action-button secondary" onClick={handleShareResults}>
            <Share className="button-icon" />
            <span>Share Results</span>
          </button>
          
          <button className="action-button tertiary" onClick={handleRetakeQuiz}>
            <RotateCcw className="button-icon" />
            <span>Retake Quiz</span>
          </button>
        </div>
        
        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>Research your top career matches in detail</li>
            <li>Connect with professionals in your fields of interest</li>
            <li>Explore educational pathways and requirements</li>
            <li>Consider internships or job shadowing opportunities</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CareerResults;