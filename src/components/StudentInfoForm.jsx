import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentForm.css';

const StudentInfoForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    phoneNumber: '',
    email: '',
    place: ''
  });

  const [focusedField, setFocusedField] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
    if (!formData.motherName.trim()) newErrors.motherName = "Mother's name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.place.trim()) newErrors.place = 'Place is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Phone validation
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Save data to localStorage
      const storedData = JSON.parse(localStorage.getItem('studentData')) || [];
      storedData.push(formData);
      localStorage.setItem('studentData', JSON.stringify(storedData));
      
      // Success - navigate to questionnaire page
      navigate('/questionnaire', { 
        state: { studentInfo: formData } 
      });
      
    } catch (error) {
      alert('Submission failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    {
      name: 'studentName',
      label: 'Student Name',
      type: 'text',
      placeholder: 'Enter student full name',
      icon: 'user'
    },
    {
      name: 'fatherName',
      label: "Father's Name",
      type: 'text',
      placeholder: "Enter father's name",
      icon: 'father'
    },
    {
      name: 'motherName',
      label: "Mother's Name",
      type: 'text',
      placeholder: "Enter mother's name",
      icon: 'mother'
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter phone number',
      icon: 'phone'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter email address',
      icon: 'email'
    },
    {
      name: 'place',
      label: 'Place',
      type: 'text',
      placeholder: 'Enter your location',
      icon: 'location'
    }
  ];

  const renderIcon = (iconType, isActive) => {
    const iconClass = `input-icon ${isActive ? 'active' : ''}`;
    
    switch (iconType) {
      case 'user':
        return (
          <div className={iconClass}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="8" r="4"/>
              <path d="M16 20c0-4-4-4-4s-4 0-4 4"/>
            </svg>
          </div>
        );
      case 'father':
        return (
          <div className={iconClass}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="9" cy="7" r="3"/>
              <path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        );
      case 'mother':
        return (
          <div className={iconClass}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="8" r="4"/>
              <path d="M16 20c0-4-4-4-4s-4 0-4 4"/>
              <path d="M8 12h8l-1 8H9l-1-8z"/>
            </svg>
          </div>
        );
      case 'phone':
        return (
          <div className={iconClass}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
          </div>
        );
      case 'email':
        return (
          <div className={iconClass}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m2 7 10 6 10-6"/>
            </svg>
          </div>
        );
      case 'location':
        return (
          <div className={iconClass}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <div className={`form-wrapper ${isVisible ? 'visible' : ''}`}>
        <div className="form-card">
          {/* Header Section */}
          <div className="form-header">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h1 className="form-title">Student Information</h1>
            <p className="form-subtitle">Please provide your details below</p>
          </div>

          {/* Form Fields */}
          <div className="form-content">
            <div className="form-grid">
              {inputFields.map((field, index) => (
                <div 
                  key={field.name}
                  className={`input-group ${field.name === 'email' || field.name === 'place' ? 'full-width' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <label className="input-label">{field.label}</label>
                  <div className="input-wrapper">
                    {renderIcon(field.icon, focusedField === field.name)}
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField('')}
                      placeholder={field.placeholder}
                      className={`form-input ${focusedField === field.name ? 'focused' : ''} ${errors[field.name] ? 'error' : ''}`}
                    />
                  </div>
                  {errors[field.name] && (
                    <span className="error-message">{errors[field.name]}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="submit-section">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              >
                <div className="btn-content">
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Information</span>
                      <div className="submit-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="form-footer">
              <div className="security-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <span>Your information is secure and confidential</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoForm; 