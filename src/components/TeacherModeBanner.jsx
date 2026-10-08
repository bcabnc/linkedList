import React from 'react';
import {
  GraduationCapIcon,
  EyeIcon,
  EyeOffIcon,
  StepForwardIcon,
  StepBackIcon,
  ResetIcon,
  XIcon
} from './icons/Icons';

export const TeacherModeBanner = ({
  teacherMode,
  setTeacherMode,
  hideCode,
  setHideCode,
  hideExplanation,
  setHideExplanation,
  handleStepForward,
  handleStepBack,
  handleReset,
  currentStepIndex,
  totalSteps,
  showMemoryAddresses,
  setShowMemoryAddresses
}) => {
  if (!teacherMode) return null;

  return (
    <div style={{
      background: 'linear-gradient(90deg, #312e81 0%, #1e1b4b 100%)',
      borderBottom: '2px solid #6366f1',
      padding: '8px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      color: '#ffffff',
      boxShadow: '0 4px 20px rgba(79, 70, 229, 0.35)',
      zIndex: 35
    }}>
      {/* Teacher Mode Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '4px 8px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '0.04em'
        }}>
          <GraduationCapIcon size={16} />
          TEACHER PROJECTION MODE ACTIVE
        </div>
        <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>
          Optimized for digital classroom projector displays
        </span>
      </div>

      {/* Classroom Quick Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {/* Toggle Code Visibility */}
        <button
          onClick={() => setHideCode(!hideCode)}
          style={{
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: hideCode ? '#ef4444' : 'rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          {hideCode ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
          {hideCode ? 'Show Code' : 'Hide Code (Focus on Nodes)'}
        </button>

        {/* Toggle Explanation Visibility */}
        <button
          onClick={() => setHideExplanation(!hideExplanation)}
          style={{
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: hideExplanation ? '#ef4444' : 'rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          {hideExplanation ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
          {hideExplanation ? 'Show Explanation' : 'Hide Explanation'}
        </button>

        {/* Memory Addresses */}
        <button
          onClick={() => setShowMemoryAddresses(!showMemoryAddresses)}
          style={{
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: showMemoryAddresses ? '#10b981' : 'rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          {showMemoryAddresses ? 'Addresses: ON' : 'Addresses: OFF'}
        </button>

        {/* Big Classroom Step Controls */}
        <button
          onClick={handleStepBack}
          disabled={currentStepIndex <= 0}
          style={{
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            opacity: currentStepIndex <= 0 ? 0.5 : 1
          }}
        >
          <StepBackIcon size={14} />
          Prev
        </button>

        <button
          onClick={handleStepForward}
          disabled={currentStepIndex >= totalSteps - 1}
          style={{
            padding: '5px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: '#6366f1',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            opacity: currentStepIndex >= totalSteps - 1 ? 0.5 : 1
          }}
        >
          <StepForwardIcon size={14} />
          Next Step ({currentStepIndex + 1}/{totalSteps})
        </button>

        {/* Close Teacher Mode */}
        <button
          onClick={() => setTeacherMode(false)}
          title="Exit Teacher Mode"
          style={{
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <XIcon size={14} />
          Exit
        </button>
      </div>
    </div>
  );
};
