// import { createContext } from "react";

// export const InterviewDataContext = createContext();


// app/context/InterviewDataContext.jsx
'use client';
import { createContext, useState } from 'react';

export const InterviewDataContext = createContext();

export const InterviewDataProvider = ({ children }) => {
  const [interviewInfo, setInterviewInfo] = useState({
    userName: '',
    interviewData: null,
  });

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      {children}
    </InterviewDataContext.Provider>
  );
};
