import React, { useEffect, useState } from 'react';
import './Notepad.css';

const Notepad = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('studentData')) || [];
    setStudentData(storedData);
  }, []);

  return (
    <div className="notepad-container">
      <h1 className="notepad-title">Student Information Notepad</h1>
      <div className="notepad-content">
        {studentData.map((data, index) => (
          <div key={index} className="student-info">
            <h2 className="student-name">{data.studentName}</h2>
            <p><strong>Father's Name:</strong> {data.fatherName}</p>
            <p><strong>Mother's Name:</strong> {data.motherName}</p>
            <p><strong>Phone Number:</strong> {data.phoneNumber}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Place:</strong> {data.place}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notepad;