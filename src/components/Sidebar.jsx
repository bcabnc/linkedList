import React from 'react';
import { SYLLABUS_MODULES } from '../data/syllabusModules';
import { LayersIcon, CheckIcon, PanelLeftCloseIcon, ExternalLinkIcon, CodeIcon } from './icons/Icons';

export const Sidebar = ({
  selectedListType,
  setSelectedListType,
  selectedOperation,
  setSelectedOperation,
  singlyOperations,
  circularOperations,
  doublyOperations,
  isOpen = true,
  setIsOpen
}) => {
  if (!isOpen) return null;

  const currentOperations =
    selectedListType === 'singly'
      ? singlyOperations
      : selectedListType === 'circular'
      ? circularOperations
      : doublyOperations;

  const handleSelectType = (typeId) => {
    setSelectedListType(typeId);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const handleSelectOperation = (opId) => {
    setSelectedOperation(opId);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Drawer Dark Backdrop */}
      <div
        className="sidebar-backdrop"
        onClick={() => setIsOpen(false)}
        title="Tap to close menu"
      />

      <aside
        className="app-sidebar-container"
        style={{
          width: '260px',
          minWidth: '260px',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          height: 'calc(100vh - 61px)',
          overflowY: 'auto',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          transition: 'all 0.25s ease'
        }}
      >
      {/* Top Header with Hide Sidebar Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '10px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-secondary)',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <LayersIcon size={14} />
          Active Linked List
        </div>

        {/* Hide Sidebar Button */}
        <button
          onClick={() => setIsOpen(false)}
          title="Hide Left Sidebar (Expand Visualizer)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <PanelLeftCloseIcon size={14} />
          <span>Hide</span>
        </button>
      </div>

      {/* Linked List Type Selector Card */}
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { id: 'singly', name: 'Singly Linked List', desc: 'Unidirectional chaining (HEAD → NULL)' },
            { id: 'circular', name: 'Circular Linked List', desc: 'Loop closure (TAIL → HEAD)' },
            { id: 'doubly', name: 'Doubly Linked List', desc: 'Bidirectional (PREV ⇄ NEXT)' }
          ].map(type => (
            <button
              key={type.id}
              onClick={() => handleSelectType(type.id)}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: '8px',
                background: selectedListType === type.id ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-panel)',
                border: `1px solid ${selectedListType === type.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                color: selectedListType === type.id ? '#ffffff' : 'var(--text-primary)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{type.name}</span>
                {selectedListType === type.id && (
                  <span style={{ color: 'var(--accent-primary)' }}>
                    <CheckIcon size={14} />
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{type.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Operations List */}
      <div>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--text-secondary)',
          marginBottom: '8px'
        }}>
          Available Operations
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {currentOperations.map(op => (
            <button
              key={op.id}
              onClick={() => handleSelectOperation(op.id)}
              style={{
                textAlign: 'left',
                padding: '7px 10px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: selectedOperation === op.id ? 600 : 500,
                background: selectedOperation === op.id ? 'var(--bg-card-hover)' : 'transparent',
                color: selectedOperation === op.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: selectedOperation === op.id ? '1px solid var(--border-highlight)' : '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{op.label}</span>
              <span style={{ fontSize: '0.65rem', padding: '1px 5px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>
                {op.timeComplexity || 'O(1)'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* BCA Semester V Syllabus Map */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.725rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--text-secondary)',
          marginBottom: '8px'
        }}>
          <span>BCA Syllabus Path</span>
          <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Sem V</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {SYLLABUS_MODULES.map((mod, index) => (
            <div
              key={mod.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 8px',
                borderRadius: '6px',
                background: mod.isCurrent ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                border: mod.isCurrent ? '1px solid rgba(99, 102, 241, 0.25)' : 'none',
                fontSize: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  background: mod.isCurrent ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)',
                  color: mod.isCurrent ? '#ffffff' : 'var(--text-muted)'
                }}>
                  {index + 1}
                </span>
                <span style={{
                  color: mod.isCurrent ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: mod.isCurrent ? 700 : 400
                }}>
                  {mod.title}
                </span>
              </div>

              {mod.isCurrent ? (
                <span className="badge badge-success" style={{ fontSize: '0.625rem' }}>Active Lab</span>
              ) : (
                <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Developer Credit Footer */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '12px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.72rem',
        color: 'var(--text-muted)'
      }}>
        <span>Developed by</span>
        <a
          href="https://atulsah.in"
          target="_blank"
          rel="noopener noreferrer"
          className="developer-link"
          style={{ fontSize: '0.72rem', padding: '3px 8px' }}
          title="Visit Atul Sah (https://atulsah.in)"
        >
          <CodeIcon size={12} />
          <span>Atul Sah</span>
          <ExternalLinkIcon size={10} />
        </a>
      </div>
    </aside>

  </>
  );
};

