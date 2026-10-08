import React, { useState } from 'react';
import { InfoIcon, MemoryIcon, SparklesIcon, CheckIcon } from './icons/Icons';

export const ExplanationPanel = ({
  currentStep,
  currentStepIndex,
  totalSteps,
  variables = {},
  nodes = [],
  pointers = {},
  showMemoryAddresses
}) => {
  const [activeTab, setActiveTab] = useState('explanation'); // 'explanation' | 'memory' | 'variables'

  if (!currentStep) return null;

  return (
    <div className="glass-panel" style={{
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      flexShrink: 0
    }}>
      {/* Top Header with Tab Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Execution Step Analysis
          </span>
          <span className="badge badge-primary">
            Step {currentStepIndex + 1} of {Math.max(1, totalSteps)}
          </span>
          {currentStep.isCompleted && (
            <span className="badge badge-success">
              <CheckIcon size={12} /> Operation Finished
            </span>
          )}
        </div>

        {/* Sub-Tabs: Explanation vs What Happens in Memory vs Variables */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-panel)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setActiveTab('explanation')}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '6px',
              background: activeTab === 'explanation' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'explanation' ? '#ffffff' : 'var(--text-secondary)'
            }}
          >
            What / Why / How
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '6px',
              background: activeTab === 'memory' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'memory' ? '#ffffff' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <MemoryIcon size={14} />
            Memory (Stack & Heap)
          </button>
          <button
            onClick={() => setActiveTab('variables')}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '6px',
              background: activeTab === 'variables' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'variables' ? '#ffffff' : 'var(--text-secondary)'
            }}
          >
            Variable Inspector
          </button>
        </div>
      </div>

      {/* Active Line Code Callout */}
      {currentStep.codeSnippet && (
        <div style={{
          padding: '8px 12px',
          background: 'var(--code-bg)',
          borderRadius: '8px',
          borderLeft: '4px solid var(--accent-primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>Line {currentStep.codeLine}:</span>
          <span style={{ color: '#ffffff' }}>{currentStep.codeSnippet}</span>
        </div>
      )}

      {/* TAB 1: What? Why? How? Educational Breakdown */}
      {activeTab === 'explanation' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px'
        }}>
          {/* WHAT */}
          <div style={{
            background: 'var(--bg-panel)',
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              color: '#818cf8',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}>
              WHAT IS HAPPENING?
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {currentStep.what || currentStep.explanation}
            </div>
          </div>

          {/* WHY */}
          <div style={{
            background: 'var(--bg-panel)',
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              color: '#34d399',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}>
              WHY IS THIS DONE?
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {currentStep.why || 'Maintains pointer connectivity and list integrity.'}
            </div>
          </div>

          {/* HOW */}
          <div style={{
            background: 'var(--bg-panel)',
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              color: '#fbbf24',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}>
              HOW DOES THE CODE WORK?
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {currentStep.how || 'Executes atomic pointer assignment in memory.'}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: "What Happens in Memory?" Mode (Simulated Stack & Heap Grid) */}
      {activeTab === 'memory' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              SIMULATED MEMORY LAYOUT (STACK & HEAP POINTER MAP)
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Notice: Nodes do not occupy contiguous addresses!
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px'
          }}>
            {/* Stack Frame (Local Pointer Variables) */}
            <div style={{
              background: 'var(--bg-panel)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'rgba(99, 102, 241, 0.15)',
                padding: '8px 12px',
                fontSize: '0.725rem',
                fontWeight: 700,
                color: '#818cf8',
                borderBottom: '1px solid var(--border-color)'
              }}>
                STACK (Local Pointer Variables)
              </div>
              <div className="touch-scroll" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', minWidth: '240px', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <thead>
                    <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                      <th style={{ padding: '6px 12px' }}>Variable</th>
                      <th style={{ padding: '6px 12px' }}>Type</th>
                      <th style={{ padding: '6px 12px' }}>Holds Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(currentStep.variables || variables).map(([varName, val]) => (
                      <tr key={varName} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                        <td style={{ padding: '6px 12px', color: 'var(--accent-primary)', fontWeight: 600 }}>{varName}</td>
                        <td style={{ padding: '6px 12px', color: 'var(--text-muted)' }}>
                          {varName.includes('data') || varName === 'value' || varName === 'pos' ? 'int' : 'Node*'}
                        </td>
                        <td style={{ padding: '6px 12px', color: '#10b981', fontWeight: 600 }}>{String(val)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Heap Allocated Node Blocks */}
            <div style={{
              background: 'var(--bg-panel)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                padding: '8px 12px',
                fontSize: '0.725rem',
                fontWeight: 700,
                color: '#34d399',
                borderBottom: '1px solid var(--border-color)'
              }}>
                HEAP (Dynamically Allocated Nodes)
              </div>
              <div className="touch-scroll" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', minWidth: '260px', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <thead>
                    <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                      <th style={{ padding: '6px 12px' }}>Node Address</th>
                      <th style={{ padding: '6px 12px' }}>Data</th>
                      <th style={{ padding: '6px 12px' }}>Next Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nodes.map(n => (
                      <tr key={n.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                        <td style={{ padding: '6px 12px', color: '#fbbf24', fontWeight: 600 }}>{n.address}</td>
                        <td style={{ padding: '6px 12px', color: 'var(--text-primary)', fontWeight: 700 }}>{n.value}</td>
                        <td style={{ padding: '6px 12px', color: n.nextAddress === 'NULL' ? '#ef4444' : '#818cf8', fontWeight: 600 }}>
                          {n.nextAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Variable & Pointer Inspector */}
      {activeTab === 'variables' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '8px'
        }}>
          {Object.entries(currentStep.variables || variables).map(([name, val]) => (
            <div
              key={name}
              style={{
                background: 'var(--bg-panel)',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                {name}
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)'
              }}>
                {String(val)}
              </div>
            </div>
          ))}

          {/* Active Pointer States */}
          {Object.entries(pointers).filter(([_, id]) => id !== null).map(([ptrName, targetId]) => {
            const targetNode = nodes.find(n => n.id === targetId);
            return (
              <div
                key={ptrName}
                style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(99, 102, 241, 0.25)'
                }}
              >
                <div style={{ fontSize: '0.675rem', color: '#818cf8', fontWeight: 700 }}>
                  {ptrName} →
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {targetNode ? `Node [${targetNode.value}] (${targetNode.address})` : 'NULL'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
