import React, { useState, useEffect } from 'react';
import './Loading.css';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    "Initializing AI Engine...",
    "Loading Neural Networks...",
    "Preparing Data Analysis...",
    "Calibrating Algorithms...",
    "Optimizing Performance...",
    "Ready to Analyze!"
  ];

  const dimensions = [
    { id: 'emotional', name: 'Emotional Intelligence', description: 'Understanding and managing emotions effectively' },
    { id: 'social', name: 'Social Dynamics', description: 'Collaboration and interpersonal skills' },
    { id: 'motivation', name: 'Drive & Ambition', description: 'Internal motivation and goal orientation' },
    { id: 'resilience', name: 'Adaptability', description: 'Handling challenges and adapting to change' }
  ];

 const questions = [
    { dimension: 'emotional', text: 'How do you usually feel when you receive feedback from teachers?' },
    { dimension: 'emotional', text: 'How do you feel before writing a test or exam?' },
    { dimension: 'emotional', text: 'Do you get easily upset if you don’t perform well in school?' },
    { dimension: 'emotional', text: 'When you have a lot of homework, how do you usually feel?' },
    { dimension: 'emotional', text: 'How often do you feel calm and relaxed during your school day?' },
    { dimension: 'emotional', text: 'What do you usually do when you feel sad or frustrated?' },
    { dimension: 'social', text: 'Do you enjoy participating in school events or group activities?' },
    { dimension: 'social', text: 'Do you enjoy working in teams or group projects?' },
    { dimension: 'social', text: 'How often do you start conversations with classmates or teachers?' },
    { dimension: 'social', text: 'Do you find it easy to make new friends?' },
    { dimension: 'social', text: 'Do you feel comfortable sharing your ideas in class discussions?' },
    { dimension: 'social', text: 'How do you usually respond when someone in your class needs help?' },
    { dimension: 'motivation', text: 'What keeps you going when you’re finding a subject difficult?' },
    { dimension: 'motivation', text: 'Do you set goals for yourself at school or in life?' },
    { dimension: 'motivation', text: 'How do you feel when you complete a difficult assignment?' },
    { dimension: 'motivation', text: 'Do you like challenging yourself to do better than before?' },
    { dimension: 'motivation', text: 'What motivates you to study even when you’re tired or distracted?' },
    { dimension: 'motivation', text: 'Do you try to improve your performance after receiving feedback?' },
    { dimension: 'resilience', text: 'How do you deal with peer pressure or negative comments?' },
    { dimension: 'resilience', text: 'What do you do when things don’t go as planned?' },
    { dimension: 'resilience', text: 'How quickly do you bounce back after a failure or poor result?' },
    { dimension: 'resilience', text: 'Do you ask for help when you don’t understand something?' },
    { dimension: 'resilience', text: 'When someone criticizes your work, how do you react?' },
    { dimension: 'resilience', text: 'Have you ever improved in something you used to struggle with?' }
  ];


  const options = [
    { value: 5, label: 'Strongly Agree' },
    { value: 4, label: 'Agree' },
    { value: 3, label: 'Neutral' },
    { value: 2, label: 'Disagree' },
    { value: 1, label: 'Strongly Disagree' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {x
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const storedAnswers = localStorage.getItem('careerQuestionnaireAnswers');
      if (!storedAnswers) return;

      const answers = JSON.parse(storedAnswers);

      const fetchAIAnalysis = async () => {
        try {
            console.log(`Bearer token ${import.meta.env.VITE_OPENAI_KEY}`); // DEBUG LINE
          const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                {
                  role: "system",
                  content: "You are an expert AI career advisor. Based on emotional, rational, and practical reasoning, analyze the user's profile and suggest the best career paths."
                },
                {
                  role: "user",
                  content: `Here are the questionnaire details:\n\nQuestions:\n${JSON.stringify(questions, null, 2)}\n\nOptions:\n${JSON.stringify(options, null, 2)}\n\nDimensions:\n${JSON.stringify(dimensions, null, 2)}\n\nUser Answers:\n${JSON.stringify(answers, null, 2)}\n\nPlease analyze and recommend a suitable career stream with a clear explanation.`
                }
              ],
              temperature: 0.7
            })
          });

          const data = await response.json();
          console.log("OpenAI API Response:", data); // DEBUG LINE

          const recommendation = data?.choices?.[0]?.message?.content;

          if (!recommendation) {
            localStorage.setItem("careerRecommendation", "Sorry, we could not analyze your responses due to a technical issue.");
          } else {
            localStorage.setItem("careerRecommendation", recommendation);
          }

          navigate('/result');

        } catch (error) {
          console.error("Error fetching AI recommendation:", error);
          localStorage.setItem("careerRecommendation", "Sorry, we could not analyze your responses due to a technical issue.");
          navigate('/result');
        }
      };

      fetchAIAnalysis();
    }
  }, [progress, navigate]);

  return (
    <div className="loading-container">
      <div className="main-content">
        <h1 className="main-title">AI Analysis Engine</h1>
        <div className="step-container">
          <span className="current-step">
            {steps[currentStep]}
            <span className="cursor">|</span>
          </span>
        </div>
        <div className="progress-section">
          <div className="progress-header">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
