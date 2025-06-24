import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css'; // Optional: Create this for styling

const ResultPage = () => {
  const navigate = useNavigate();
  const recommendation = localStorage.getItem("careerRecommendation");

  const handleRetake = () => {
    //localStorage.removeItem("careerQuestionnaireAnswers");
    //localStorage.removeItem("careerRecommendation");
    navigate('/');
  };

  return (
    <div className="result-page">
      <h2>🎯 Your AI-Powered Career Recommendation</h2>
      {recommendation ? (
        <p className="recommendation-text">{recommendation}</p>
      ) : (
        <p className="fallback-text">Sorry, no recommendation found. Please complete the questionnaire again.</p>
      )}
      <button className="retake-button" onClick={handleRetake}>🔁 Retake Questionnaire</button>
    </div>
  );
};

export default ResultPage;
