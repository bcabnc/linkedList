import React, { useState, useRef, useEffect } from 'react';
import { TerminalIcon, CodeIcon, ChevronRightIcon } from './icons/Icons';

export const CodePanel = ({
  codeSnippet = '',
  activeLine = 1,
  selectedOperationTitle = '',
  selectedListType = 'singly'
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('c');
  const activeLineRef = useRef(null);
  const codeEditorRef = useRef(null);

  useEffect(() => {
    if (activeLineRef.current && codeEditorRef.current) {
      const container = codeEditorRef.current;
      const target = activeLineRef.current;
      const targetTop = target.offsetTop;
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      // Scroll only inside the code editor container, avoiding outer page jump
      if (targetTop < containerTop + 20 || targetTop > containerTop + containerHeight - 40) {
        container.scrollTo({
          top: Math.max(0, targetTop - Math.floor(containerHeight / 3)),
          behavior: 'smooth'
        });
      }
    }
  }, [activeLine]);

  const lines = codeSnippet.split('\n');

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      minWidth: 0,
      overflow: 'hidden'
    }}>
      {/* Top Header of Code Editor */}
      <div style={{
        padding: '12px 16px',
        background: 'var(--bg-panel)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CodeIcon size={16} className="" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            C Implementation (Full Code)
          </span>
          <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
            BCA Syllabus Standard
          </span>
        </div>

        {/* Language Selector */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-secondary)', padding: '2px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
          {[
            { id: 'c', label: 'C (Standard)' },
            { id: 'cpp', label: 'C++', preview: true },
            { id: 'java', label: 'Java', preview: true },
            { id: 'py', label: 'Python', preview: true }
          ].map(lang => (
            <button
              key={lang.id}
              onClick={() => {
                if (!lang.preview) setSelectedLanguage(lang.id);
              }}
              title={lang.preview ? `${lang.label} version preview` : `${lang.label} active`}
              style={{
                fontSize: '0.6875rem',
                padding: '3px 8px',
                borderRadius: '4px',
                fontWeight: selectedLanguage === lang.id ? 700 : 500,
                background: selectedLanguage === lang.id ? 'var(--accent-primary)' : 'transparent',
                color: selectedLanguage === lang.id ? '#ffffff' : (lang.preview ? 'var(--text-muted)' : 'var(--text-secondary)'),
                cursor: lang.preview ? 'not-allowed' : 'pointer'
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Window (Touch scrollable) */}
      <div
        ref={codeEditorRef}
        className="touch-scroll"
        style={{
          background: 'var(--code-bg)',
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'auto',
          padding: '12px 0',
          fontFamily: 'var(--font-mono)'
        }}
      >
        {lines.map((lineText, idx) => {
          const lineNumber = idx + 1;
          const isActive = lineNumber === activeLine;

          return (
            <div
              key={idx}
              ref={isActive ? activeLineRef : null}
              className={`code-line ${isActive ? 'active' : ''}`}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: isActive ? 'var(--code-active-line-bg)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                boxShadow: isActive ? 'inset 0 0 12px rgba(99, 102, 241, 0.25)' : 'none'
              }}
            >
              {/* Active arrow pointer indicator */}
              <div style={{
                width: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
                visibility: isActive ? 'visible' : 'hidden'
              }}>
                <ChevronRightIcon size={13} />
              </div>

              {/* Line Number */}
              <span className="line-num" style={{ color: isActive ? '#818cf8' : '#64748b' }}>
                {lineNumber}
              </span>

              {/* Syntax Code Content */}
              <span style={{
                color: isActive ? '#ffffff' : (lineText.trim().startsWith('//') ? '#64748b' : '#e2e8f0'),
                fontStyle: lineText.trim().startsWith('//') ? 'italic' : 'normal',
                whiteSpace: 'pre',
                flex: 1
              }}>
                {lineText}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Status bar for code panel */}
      <div style={{
        padding: '8px 16px',
        background: 'var(--bg-panel)',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.725rem',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>Executing Line: <strong style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{activeLine}</strong></span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>UTF-8 • C (gcc / C99)</span>
      </div>
    </div>
  );
};
