'use client';
import React from 'react';

const ResumeSection = ({ title, children, titleStyle }) => {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-bold mb-3 pb-1" style={titleStyle}>
        {title}
      </h2>
      {children}
    </section>
  );
};

export default ResumeSection; 