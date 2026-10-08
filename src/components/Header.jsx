import React from 'react';
import {
  GraduationCapIcon,
  SunIcon,
  MoonIcon,
  EyeIcon,
  EyeOffIcon,
  BookOpenIcon,
  ComparisonIcon,
  ComplexityIcon,
  QuizIcon,
  CodeIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon
} from './icons/Icons';

export const Header = ({
  activeTab,
  setActiveTab,
  selectedListType,
  setSelectedListType,
  theme,
  toggleTheme,
  showMemoryAddresses,
  setShowMemoryAddresses,
  teacherMode,
  setTeacherMode,
  openConceptGuide,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  return (
    <header style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '10px',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Brand & Syllabus Title & Sidebar Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? "Hide Left Sidebar (Maximize Screen Space)" : "Show Left Sidebar (Menu & Operations)"}
          style={{
            padding: '7px 10px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            background: isSidebarOpen ? 'var(--bg-panel)' : 'rgba(99, 102, 241, 0.22)',
            color: isSidebarOpen ? 'var(--text-secondary)' : '#818cf8',
            border: `1px solid ${isSidebarOpen ? 'var(--border-color)' : 'rgba(99, 102, 241, 0.4)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {isSidebarOpen ? <PanelLeftCloseIcon size={16} /> : <PanelLeftOpenIcon size={16} />}
          <span className="hide-on-mobile">{isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}</span>
        </button>

        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '9px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
          flexShrink: 0
        }}>
          <CodeIcon size={20} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h1 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap' }}>
              Data Structures Lab
            </h1>
            <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
              BCA V
            </span>
          </div>
          <p className="hide-on-mobile" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0 }}>
            Interactive Linked List Visualizer & C Execution Engine
          </p>
        </div>
      </div>

      {/* Main Navigation Tabs (Scrollable on mobile) */}
      <nav className="nav-scroll-bar" style={{
        background: 'var(--bg-panel)',
        padding: '3px 4px',
        borderRadius: '10px',
        border: '1px solid var(--border-color)',
        maxWidth: '100%'
      }}>
        <button
          onClick={() => setActiveTab('visualizer')}
          style={{
            padding: '5px 12px',
            borderRadius: '7px',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: activeTab === 'visualizer' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'visualizer' ? '#ffffff' : 'var(--text-secondary)',
            whiteSpace: 'nowrap'
          }}
        >
          <CodeIcon size={13} />
          <span>Visualizer</span>
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          style={{
            padding: '5px 12px',
            borderRadius: '7px',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: activeTab === 'comparison' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'comparison' ? '#ffffff' : 'var(--text-secondary)',
            whiteSpace: 'nowrap'
          }}
        >
          <ComparisonIcon size={13} />
          <span>Compare Types</span>
        </button>

        <button
          onClick={() => setActiveTab('complexity')}
          style={{
            padding: '5px 12px',
            borderRadius: '7px',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: activeTab === 'complexity' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'complexity' ? '#ffffff' : 'var(--text-secondary)',
            whiteSpace: 'nowrap'
          }}
        >
          <ComplexityIcon size={13} />
          <span>Complexity</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          style={{
            padding: '5px 12px',
            borderRadius: '7px',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: activeTab === 'practice' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'practice' ? '#ffffff' : 'var(--text-secondary)',
            whiteSpace: 'nowrap'
          }}
        >
          <QuizIcon size={13} />
          <span>Quiz</span>
        </button>
      </nav>

      {/* Action Toggles: Concept Intro, Memory Addresses, Teacher Mode, Theme */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Concept Guide Button */}
        <button
          onClick={openConceptGuide}
          title="Open Linked List Concept Guide"
          style={{
            padding: '6px 10px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: 'rgba(99, 102, 241, 0.12)',
            color: '#818cf8',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <BookOpenIcon size={14} />
          <span className="hide-on-mobile">Guide</span>
        </button>

        {/* Memory Addresses Toggle */}
        <button
          onClick={() => setShowMemoryAddresses(!showMemoryAddresses)}
          title={`Toggle Memory Addresses (Currently ${showMemoryAddresses ? 'ON' : 'OFF'})`}
          style={{
            padding: '6px 10px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: showMemoryAddresses ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-panel)',
            color: showMemoryAddresses ? '#10b981' : 'var(--text-secondary)',
            border: `1px solid ${showMemoryAddresses ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-color)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          {showMemoryAddresses ? <EyeIcon size={14} /> : <EyeOffIcon size={14} />}
          <span className="hide-on-mobile">Addr: {showMemoryAddresses ? 'ON' : 'OFF'}</span>
        </button>

        {/* Teacher Mode Toggle */}
        <button
          onClick={() => setTeacherMode(!teacherMode)}
          title="Classroom Projection Teacher Mode"
          style={{
            padding: '6px 10px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: teacherMode ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' : 'var(--bg-panel)',
            color: teacherMode ? '#ffffff' : 'var(--text-secondary)',
            border: `1px solid ${teacherMode ? '#7c3aed' : 'var(--border-color)'}`,
            boxShadow: teacherMode ? '0 0 14px rgba(124, 58, 237, 0.4)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <GraduationCapIcon size={14} />
          <span className="hide-on-mobile">Teacher</span>
        </button>

        {/* Theme Toggle (Dark / Light) */}
        <button
          onClick={toggleTheme}
          title="Toggle Light / Dark Theme"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--bg-panel)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </button>
      </div>
    </header>
  );
};

