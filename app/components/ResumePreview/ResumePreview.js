'use client';
import React, { useRef } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import ResumeSection from './ResumeSection';
import { Printer } from 'lucide-react';

const ResumePreview = () => {
  const { resumeData, styles, customFields } = useResume();
  const previewRef = useRef(null);

  const handlePrint = () => {
    const printContents = previewRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const previewStyle = {
    fontFamily: styles.fontFamily,
    fontSize: `${styles.baseFontSize}px`,
    backgroundColor: styles.backgroundColor,
    color: styles.textColor,
  };

  const headingStyle = {
    color: styles.primaryColor,
    fontSize: `${styles.baseFontSize * 1.5}px`,
    borderBottom: `2px solid ${styles.primaryColor}`,
  };

  const subHeadingStyle = {
    color: styles.primaryColor,
    fontSize: `${styles.baseFontSize * 1.2}px`,
  };
  
  const linkStyle = {
    color: styles.primaryColor,
    textDecoration: 'underline',
  };

  return (
    <div className="flex-1 p-2 md:p-8 bg-gray-200 flex flex-col items-center overflow-y-auto">
      <button 
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 print:hidden"
        aria-label="Print Resume"
      >
        <Printer size={18} /> Print / Save as PDF
      </button>
      <div 
        ref={previewRef}
        id="resume-preview-content"
        className="w-full max-w-4xl bg-white shadow-2xl p-8 md:p-12 lg:p-16"
        style={previewStyle}
      >
        {/* Personal Info */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: styles.primaryColor, fontSize: `${styles.baseFontSize * 2.5}px` }}>
            {resumeData.personalInfo.name}
          </h1>
          <p className="text-xl" style={{ color: styles.secondaryColor, fontSize: `${styles.baseFontSize * 1.25}px` }}>
            {resumeData.personalInfo.title}
          </p>
          <div className="flex justify-center space-x-4 mt-2 text-sm" style={{ color: styles.secondaryColor, fontSize: `${styles.baseFontSize * 0.9}px` }}>
            <span>{resumeData.personalInfo.email}</span>
            <span>|</span>
            <span>{resumeData.personalInfo.phone}</span>
            <span>|</span>
            <span>{resumeData.personalInfo.location}</span>
          </div>
        </header>

        {/* Summary */}
        <ResumeSection title="Summary" titleStyle={headingStyle}>
          <p className="text-justify" style={{ lineHeight: `${styles.baseFontSize * 0.12}rem` }}>{resumeData.personalInfo.summary}</p>
        </ResumeSection>

        {/* Custom Fields */}
        {customFields.length > 0 && (
          <ResumeSection title="Additional Information" titleStyle={headingStyle}>
            <ul className="list-none space-y-1">
              {customFields.map(field => (
                <li key={field.id} className="flex">
                  <strong className="w-1/3 font-semibold" style={{color: styles.primaryColor}}>{field.label}:</strong>
                  <span className="w-2/3">
                    {field.value.startsWith('http') ? 
                      <a href={field.value} target="_blank" rel="noopener noreferrer" style={linkStyle}>{field.value}</a> : 
                      field.value
                    }
                  </span>
                </li>
              ))}
            </ul>
          </ResumeSection>
        )}

        {/* Experience */}
        <ResumeSection title="Experience" titleStyle={headingStyle}>
          {resumeData.experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <h3 className="text-lg font-semibold" style={subHeadingStyle}>{exp.jobTitle}</h3>
              <p className="text-md font-medium" style={{ color: styles.secondaryColor }}>{exp.company} - {exp.location}</p>
              <p className="text-xs italic" style={{ color: styles.secondaryColor }}>{exp.dates}</p>
              <ul className="list-disc list-inside mt-1 space-y-1 text-sm" style={{ lineHeight: `${styles.baseFontSize * 0.11}rem` }}>
                {exp.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </ResumeSection>

        {/* Education */}
        <ResumeSection title="Education" titleStyle={headingStyle}>
          {resumeData.education.map(edu => (
            <div key={edu.id} className="mb-3">
              <h3 className="text-lg font-semibold" style={subHeadingStyle}>{edu.degree}</h3>
              <p className="text-md font-medium" style={{ color: styles.secondaryColor }}>{edu.institution} - {edu.location}</p>
              <p className="text-xs italic" style={{ color: styles.secondaryColor }}>Graduated: {edu.graduationDate}</p>
              {edu.details && <p className="text-sm mt-1">{edu.details}</p>}
            </div>
          ))}
        </ResumeSection>

        {/* Skills */}
        <ResumeSection title="Skills" titleStyle={headingStyle}>
          <ul className="flex flex-wrap gap-2">
            {resumeData.skills.map(skill => (
              <li 
                key={skill} 
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: styles.primaryColor, color: styles.backgroundColor === '#FFFFFF' || styles.backgroundColor === '#FFF' || styles.backgroundColor === '#ffffff' ? styles.textColor : styles.backgroundColor }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </ResumeSection>
      </div>
    </div>
  );
};

export default ResumePreview; 