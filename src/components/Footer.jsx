import React from 'react';
import { ExternalLinkIcon, CodeIcon, GraduationCapIcon } from './icons/Icons';

export const Footer = () => {
  return (
    <footer
      id="app-footer"
      className="app-footer"
      role="contentinfo"
    >
      {/* Left: Course & Syllabus Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-primary)',
          fontWeight: 600,
          fontSize: '0.8rem'
        }}>
          <GraduationCapIcon size={16} className="text-indigo-400" />
          <span>BCA Semester V</span>
        </div>
        <span style={{ color: 'var(--text-muted)' }}>•</span>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
          Data Structures & Algorithms Visual Lab
        </span>
      </div>

      {/* Right: Developed by Atul Sah */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          Developed by
        </span>
        <a
          href="https://atulsah.in"
          target="_blank"
          rel="noopener noreferrer"
          className="developer-link"
          title="Visit Atul Sah's Website (https://atulsah.in)"
          id="developer-profile-link"
        >
          <CodeIcon size={14} />
          <span>Atul Sah</span>
          <ExternalLinkIcon size={12} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
