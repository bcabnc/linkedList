import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  PlayIcon,
  PauseIcon,
  StepForwardIcon,
  StepBackIcon,
  ResetIcon,
  ZapIcon,
  SlidersIcon,
  CheckIcon,
  XIcon,
  ShuffleIcon,
  PlusIcon,
  TrashIcon
} from './icons/Icons';

export const ControlsPanel = ({
  selectedListType,
  selectedOperation,
  setSelectedOperation,
  availableOperations,
  inputValue,
  setInputValue,
  inputPosition,
  setInputPosition,
  initialArrayText,
  setInitialArrayText,
  baseListValues = [10, 20, 30, 40],
  handleUpdateBaseList,
  handleRunOperation,
  handleStepForward,
  handleStepBack,
  handleReset,
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
  currentStepIndex,
  totalSteps,
  executionMode,
  setExecutionMode
}) => {
  const [showBaseListModal, setShowBaseListModal] = useState(false);
  const [modalInputText, setModalInputText] = useState(() => baseListValues.join(', '));
  const [appendSingleVal, setAppendSingleVal] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Keep modal input text synchronized with baseListValues
  useEffect(() => {
    setModalInputText(baseListValues.join(', '));
  }, [baseListValues, showBaseListModal]);

  const needsValue = [
    'insertAtBeginning',
    'insertAtEnd',
    'insertAtPosition',
    'search'
  ].includes(selectedOperation);

  const needsPosition = [
    'insertAtPosition',
    'deleteFromPosition'
  ].includes(selectedOperation);

  const currentOpObj = availableOperations.find(o => o.id === selectedOperation) || availableOperations[0];
  const progressPercent = totalSteps > 1 ? Math.round((currentStepIndex / (totalSteps - 1)) * 100) : 0;

  // Parse values from text input
  const parseNumbers = (text) => {
    return text
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && isFinite(n));
  };

  const parsedCurrent = parseNumbers(modalInputText);

  // Apply directly as base list and close modal immediately
  const applyAsBaseList = () => {
    const vals = parsedCurrent.length > 0 ? parsedCurrent : [10, 20, 30];
    handleUpdateBaseList(vals, false);
    setShowBaseListModal(false);
  };


  // Run animate create
  const applyAndAnimateCreate = () => {
    const vals = parsedCurrent.length > 0 ? parsedCurrent : [10, 20, 30];
    handleUpdateBaseList(vals, true);
    setShowBaseListModal(false);
  };

  // Randomize preset
  const handleRandomize = () => {
    const count = 4;
    const randoms = Array.from({ length: count }, () => Math.floor(Math.random() * 80) + 10);
    const text = randoms.join(', ');
    setModalInputText(text);
  };

  // Quick preset click
  const handleSelectPreset = (arr) => {
    setModalInputText(arr.join(', '));
  };

  // Quick append a single value
  const handleAppendValue = () => {
    const num = parseInt(appendSingleVal.trim(), 10);
    if (!isNaN(num)) {
      const updated = parsedCurrent.concat(num);
      setModalInputText(updated.join(', '));
      setAppendSingleVal('');
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        position: 'relative',
        zIndex: 20
      }}
    >
      {/* SECTION 1: Operation Selector & Dynamic Parameters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flex: '1 1 auto' }}>
        {/* Operation Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label
            htmlFor="operation-select"
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)'
            }}
          >
            Op:
          </label>
          <select
            id="operation-select"
            value={selectedOperation}
            onChange={e => setSelectedOperation(e.target.value)}
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              padding: '6px 10px',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-highlight)',
              cursor: 'pointer',
              minWidth: '175px'
            }}
          >
            {availableOperations.map(op => (
              <option key={op.id} value={op.id}>
                {op.label} ({op.timeComplexity})
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Parameter: Value */}
        {needsValue && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'var(--bg-secondary)',
            padding: '3px 8px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#818cf8' }}>
              Val:
            </span>
            <input
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="e.g. 40"
              style={{
                width: '60px',
                padding: '4px 6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                borderRadius: '5px',
                background: 'var(--bg-panel)',
                textAlign: 'center'
              }}
            />
          </div>
        )}

        {/* Dynamic Parameter: Position */}
        {needsPosition && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'var(--bg-secondary)',
            padding: '3px 8px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f59e0b' }}>
              Pos:
            </span>
            <input
              type="number"
              min="1"
              max="15"
              value={inputPosition}
              onChange={e => setInputPosition(e.target.value)}
              placeholder="1"
              style={{
                width: '50px',
                padding: '4px 6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                borderRadius: '5px',
                background: 'var(--bg-panel)',
                textAlign: 'center'
              }}
            />
          </div>
        )}

        {/* Modify Base List Trigger Button */}
        <button
          onClick={() => {
            setModalInputText(baseListValues.join(', '));
            setShowBaseListModal(true);
          }}
          title="Customize initial Linked List nodes and values"
          style={{
            padding: '6px 11px',
            borderRadius: '8px',
            fontSize: '0.76rem',
            fontWeight: 700,
            background: 'rgba(99, 102, 241, 0.14)',
            color: '#818cf8',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <SlidersIcon size={14} />
          <span>Base List ({baseListValues.length})</span>
        </button>
      </div>

      {/* SECTION 2: Playback Controls (Center) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        {/* Reset button */}
        <button
          onClick={handleReset}
          title="Reset to Initial State (Step 1)"
          style={{
            padding: '7px 11px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <ResetIcon size={14} />
          <span>Reset</span>
        </button>

        {/* Previous Step button */}
        <button
          onClick={handleStepBack}
          disabled={currentStepIndex <= 0}
          title="Previous Step"
          style={{
            padding: '7px 11px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: 'var(--bg-secondary)',
            color: currentStepIndex <= 0 ? 'var(--text-muted)' : 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            opacity: currentStepIndex <= 0 ? 0.45 : 1,
            cursor: currentStepIndex <= 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <StepBackIcon size={14} />
          <span>Prev</span>
        </button>

        {/* Auto Play / Pause Toggle Button */}
        <button
          onClick={() => {
            if (isPlaying) {
              setIsPlaying(false);
            } else {
              handleRunOperation();
            }
          }}
          title={isPlaying ? 'Pause Auto Execution' : 'Run Auto Play'}
          style={{
            padding: '7px 15px',
            borderRadius: '8px',
            fontSize: '0.78rem',
            fontWeight: 800,
            background: isPlaying
              ? 'linear-gradient(135deg, #ef4444, #dc2626)'
              : 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: isPlaying
              ? '0 2px 10px rgba(239, 68, 68, 0.4)'
              : '0 2px 10px rgba(99, 102, 241, 0.4)'
          }}
        >
          {isPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>

        {/* Step Forward (Next Step) button */}
        <button
          onClick={handleStepForward}
          disabled={currentStepIndex >= totalSteps - 1}
          title="Execute Next Step (Line by Line in C)"
          style={{
            padding: '7px 13px',
            borderRadius: '8px',
            fontSize: '0.76rem',
            fontWeight: 700,
            background: 'rgba(99, 102, 241, 0.15)',
            color: currentStepIndex >= totalSteps - 1 ? 'var(--text-muted)' : '#818cf8',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            opacity: currentStepIndex >= totalSteps - 1 ? 0.45 : 1,
            cursor: currentStepIndex >= totalSteps - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <span>Next</span>
          <StepForwardIcon size={13} />
        </button>

        {/* Step Counter Pill & Progress Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          padding: '3px 9px',
          background: 'var(--bg-secondary)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          minWidth: '78px'
        }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {currentStepIndex + 1} / {Math.max(1, totalSteps)}
          </span>
          <div style={{
            width: '54px',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'var(--accent-primary)',
              transition: 'width 0.2s ease'
            }} />
          </div>
        </div>
      </div>

      {/* SECTION 3: Speed Pills & Complexity Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Speed Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{
            display: 'flex',
            background: 'var(--bg-secondary)',
            padding: '2px',
            borderRadius: '6px',
            border: '1px solid var(--border-color)'
          }}>
            {[0.5, 1, 1.5, 2].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                style={{
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.675rem',
                  fontWeight: speed === s ? 800 : 500,
                  background: speed === s ? 'var(--accent-primary)' : 'transparent',
                  color: speed === s ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Tag */}
        <span
          className="badge badge-primary"
          style={{ fontSize: '0.675rem', fontWeight: 700 }}
          title={`Time Complexity: ${currentOpObj.timeComplexity}`}
        >
          {currentOpObj.timeComplexity}
        </span>
      </div>

      {/* ========================================================= */}
      {/* DEDICATED BASE LIST MODAL (Rendered to document.body via Portal) */}
      {/* ========================================================= */}
      {showBaseListModal && typeof document !== 'undefined' && createPortal(
        <div
          className="base-list-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowBaseListModal(false);
          }}
        >
          <div className="base-list-modal-card" style={{ padding: '20px' }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              paddingBottom: '10px',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  background: 'rgba(99, 102, 241, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)'
                }}>
                  <SlidersIcon size={16} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    Customize Starting Linked List
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Enter any values to test algorithm operations.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowBaseListModal(false)}
                title="Close modal"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'var(--bg-panel)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <XIcon size={14} />
              </button>
            </div>

            {/* Live Visual Chain Preview */}
            <div style={{
              background: 'var(--bg-panel)',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              marginBottom: '14px'
            }}>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>Live Chain Preview ({parsedCurrent.length} Nodes):</span>
                <span style={{ color: 'var(--accent-primary)' }}>{selectedListType.toUpperCase()} LIST</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                overflowX: 'auto',
                paddingBottom: '4px',
                fontFamily: 'var(--font-mono)'
              }}>
                <span style={{ fontSize: '0.7rem', color: '#818cf8', fontWeight: 700 }}>HEAD →</span>
                {parsedCurrent.length === 0 ? (
                  <span style={{ fontSize: '0.75rem', color: '#ef4444', fontStyle: 'italic' }}>[Empty List (NULL)]</span>
                ) : (
                  parsedCurrent.map((val, idx) => (
                    <React.Fragment key={idx}>
                      <span style={{
                        padding: '3px 8px',
                        background: 'rgba(99, 102, 241, 0.15)',
                        border: '1px solid var(--accent-primary)',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)'
                      }}>
                        {val}
                      </span>
                      {idx < parsedCurrent.length - 1 && (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>→</span>
                      )}
                    </React.Fragment>
                  ))
                )}
                <span style={{
                  fontSize: '0.7rem',
                  color: selectedListType === 'circular' ? '#10b981' : '#ef4444',
                  fontWeight: 700,
                  marginLeft: '4px'
                }}>
                  {selectedListType === 'circular' ? '↺ (HEAD)' : '→ NULL'}
                </span>
              </div>
            </div>

            {/* Comma-Separated Input Field */}
            <div style={{ marginBottom: '14px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  marginBottom: '6px'
                }}
              >
                Comma-Separated Node Values:
              </label>
              <input
                type="text"
                value={modalInputText}
                onChange={e => setModalInputText(e.target.value)}
                placeholder="e.g. 10, 20, 30, 40"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--bg-panel)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-highlight)'
                }}
              />
            </div>

            {/* Quick Presets Selection */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Quick Presets:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {[
                  { label: '[10, 20, 30]', arr: [10, 20, 30] },
                  { label: '[10, 20, 30, 40]', arr: [10, 20, 30, 40] },
                  { label: '[5, 15, 25, 35, 45]', arr: [5, 15, 25, 35, 45] },
                  { label: '[100, 200]', arr: [100, 200] },
                  { label: '[7] (Single)', arr: [7] }
                ].map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleSelectPreset(preset.arr)}
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '5px 9px',
                      borderRadius: '6px',
                      background: 'var(--bg-panel)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                  >
                    {preset.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleRandomize}
                  title="Generate 4 random values"
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '5px 9px',
                    borderRadius: '6px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#f59e0b',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <ShuffleIcon size={12} />
                  <span>Random</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModalInputText('')}
                  title="Clear all nodes"
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '5px 9px',
                    borderRadius: '6px',
                    background: 'rgba(239, 68, 68, 0.12)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <TrashIcon size={12} />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Quick Append Single Node */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              background: 'var(--bg-panel)',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Append node:
              </span>
              <input
                type="number"
                value={appendSingleVal}
                onChange={e => setAppendSingleVal(e.target.value)}
                placeholder="Val"
                style={{
                  width: '60px',
                  padding: '3px 6px',
                  fontSize: '0.78rem',
                  borderRadius: '4px'
                }}
              />
              <button
                type="button"
                onClick={handleAppendValue}
                style={{
                  padding: '4px 9px',
                  borderRadius: '5px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: 'var(--accent-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <PlusIcon size={12} />
                <span>Append</span>
              </button>
            </div>

            {/* Feedback Message */}
            {feedbackMsg && (
              <div style={{
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                fontSize: '0.78rem',
                fontWeight: 700,
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <CheckIcon size={14} />
                <span>{feedbackMsg}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowBaseListModal(false)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  background: 'var(--bg-panel)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={applyAndAnimateCreate}
                title="Run step-by-step C creation algorithm for these nodes"
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: 'rgba(99, 102, 241, 0.18)',
                  color: '#818cf8',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <ZapIcon size={14} />
                <span>Animate "Create List"</span>
              </button>

              <button
                type="button"
                onClick={applyAsBaseList}
                title="Immediately set as the starting list for all operations"
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <CheckIcon size={15} />
                <span>Set Starting List</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

