import React, { useRef, useState } from 'react';
import { ArrowRightIcon, ArrowLeftRightIcon, CheckIcon, AlertTriangleIcon } from './icons/Icons';

export const VisualizationPanel = ({
  nodes = [],
  pointers = {},
  selectedListType,
  showMemoryAddresses,
  teacherMode,
  selectedNodeId,
  setSelectedNodeId,
  currentStep
}) => {
  const containerRef = useRef(null);

  // Helper to get pointers pointing to this node
  const getPointersForNode = (nodeId) => {
    const list = [];
    if (!pointers) return list;
    Object.entries(pointers).forEach(([name, targetId]) => {
      if (targetId === nodeId) {
        list.push(name);
      }
    });
    return list;
  };

  // Node status colors
  const getStatusBorder = (status) => {
    switch (status) {
      case 'new': return 'var(--node-new-border)';
      case 'active': return 'var(--node-active-border)';
      case 'deleted': return 'var(--node-deleted-border)';
      case 'found': return '#10b981';
      default: return 'var(--node-normal-border)';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'new': return 'var(--node-new-bg)';
      case 'active': return 'var(--node-active-bg)';
      case 'deleted': return 'var(--node-deleted-bg)';
      case 'found': return 'rgba(16, 185, 129, 0.25)';
      default: return 'var(--node-normal-bg)';
    }
  };

  const getStatusGlow = (status) => {
    switch (status) {
      case 'new': return 'var(--node-new-glow)';
      case 'active': return 'var(--node-active-glow)';
      case 'deleted': return 'var(--node-deleted-glow)';
      case 'found': return 'rgba(16, 185, 129, 0.6)';
      default: return 'var(--node-normal-glow)';
    }
  };

  return (
    <div className="glass-panel" style={{
      padding: '14px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      height: '100%',
      minHeight: 0,
      minWidth: 0,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Bar: Visual Type Info & Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {selectedListType === 'singly' && 'Singly Linked List Animation'}
            {selectedListType === 'circular' && 'Circular Linked List Animation (Tail loops to Head)'}
            {selectedListType === 'doubly' && 'Doubly Linked List Animation (Bidirectional)'}
          </span>
          <span className="badge badge-primary">
            {nodes.length} {nodes.length === 1 ? 'Node' : 'Nodes'}
          </span>
        </div>

        {/* Color Semantics Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          fontSize: '0.75rem',
          background: 'var(--bg-panel)',
          padding: '4px 12px',
          borderRadius: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--node-normal-border)' }} />
            Normal
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--node-new-border)' }} />
            New Node
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--node-active-border)' }} />
            Current / Active
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--node-deleted-border)' }} />
            Deleted
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--pointer-badge-bg)' }} />
            Pointer
          </span>
        </div>
      </div>

      {/* Main Canvas Scroll Area (Touch Scrollable on Mobile) */}
      <div
        ref={containerRef}
        className="touch-scroll"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: nodes.length <= 4 ? 'center' : 'flex-start',
          padding: '16px 14px 20px 14px',
          overflowX: 'auto',
          minHeight: '160px',
          position: 'relative'
        }}
      >
        {nodes.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            color: 'var(--text-muted)',
            padding: '40px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--bg-panel)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
            }}>
              <AlertTriangleIcon size={24} />
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Linked List is Currently Empty</div>
            <div style={{ fontSize: '0.8rem' }}>Use "Create List" or "Insert at Beginning / End" to populate elements.</div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            gap: '0px'
          }}>
            {/* SVG Canvas for Arrows & Circular Loop */}
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'visible',
                zIndex: 1
              }}
            >
              <defs>
                <marker
                  id="arrow-normal"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
                </marker>
                <marker
                  id="arrow-loop"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
              </defs>
            </svg>

            {/* Render Nodes sequentially */}
            {nodes.map((node, index) => {
              const assignedPointers = getPointersForNode(node.id);
              const isSelected = selectedNodeId === node.id;
              const isTail = index === nodes.length - 1;
              const isHead = index === 0;

              return (
                <React.Fragment key={node.id}>
                  {/* Single Node Card Container */}
                  <div
                    onClick={() => setSelectedNodeId(isSelected ? null : node.id)}
                    className="anim-fade-in"
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                  >
                    {/* Top Pointer Badges (HEAD, CURRENT, PREV, etc.) */}
                    <div style={{
                      height: '36px',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '4px',
                      alignItems: 'flex-end',
                      marginBottom: '6px'
                    }}>
                      {assignedPointers.map(ptr => (
                        <div
                          key={ptr}
                          style={{
                            padding: '2px 8px',
                            borderRadius: '5px',
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            background: ptr === 'HEAD'
                              ? 'linear-gradient(135deg, #4f46e5, #6366f1)'
                              : ptr === 'TAIL'
                              ? 'linear-gradient(135deg, #059669, #10b981)'
                              : ptr === 'CURRENT'
                              ? 'linear-gradient(135deg, #d97706, #f59e0b)'
                              : ptr === 'NEW NODE'
                              ? 'linear-gradient(135deg, #10b981, #059669)'
                              : 'var(--pointer-badge-bg)',
                            color: '#ffffff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            transform: 'translateY(-2px)'
                          }}
                        >
                          {ptr}
                        </div>
                      ))}
                    </div>

                    {/* Node Address Badge (Simulated Hex Address) */}
                    {showMemoryAddresses && (
                      <div style={{
                        fontSize: '0.675rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-panel)',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        marginBottom: '4px',
                        border: '1px solid var(--border-color)'
                      }}>
                        Addr: {node.address}
                      </div>
                    )}

                    {/* Node Body Card */}
                    <div style={{
                      display: 'flex',
                      background: getStatusBg(node.status),
                      border: `2px solid ${getStatusBorder(node.status)}`,
                      borderRadius: '12px',
                      boxShadow: isSelected
                        ? `0 0 20px ${getStatusBorder(node.status)}`
                        : `0 4px 12px ${getStatusGlow(node.status)}`,
                      overflow: 'hidden',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      minWidth: selectedListType === 'doubly' ? '180px' : '130px'
                    }}>
                      {/* PREV Pointer Field (Doubly Linked List only) */}
                      {selectedListType === 'doubly' && (
                        <div style={{
                          padding: '12px 10px',
                          borderRight: `1px solid ${getStatusBorder(node.status)}`,
                          background: 'rgba(0, 0, 0, 0.15)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '55px'
                        }}>
                          <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            PREV
                          </span>
                          <span style={{
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            color: node.prevAddress === 'NULL' ? '#ef4444' : '#818cf8',
                            fontWeight: 600
                          }}>
                            {node.prevAddress === 'NULL' ? 'NULL' : (showMemoryAddresses ? node.prevAddress : '•')}
                          </span>
                        </div>
                      )}

                      {/* DATA Field */}
                      <div style={{
                        padding: '12px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                      }}>
                        <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          DATA
                        </span>
                        <span style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          {node.value}
                        </span>
                      </div>

                      {/* NEXT Pointer Field */}
                      <div style={{
                        padding: '12px 10px',
                        borderLeft: `1px solid ${getStatusBorder(node.status)}`,
                        background: 'rgba(0, 0, 0, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '55px'
                      }}>
                        <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          NEXT
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          color: node.nextAddress === 'NULL' ? '#ef4444' : '#10b981',
                          fontWeight: 600
                        }}>
                          {node.nextAddress === 'NULL'
                            ? 'NULL'
                            : (showMemoryAddresses ? node.nextAddress : '●')}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Status / Index Marker */}
                    <div style={{
                      marginTop: '6px',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: 'var(--text-muted)'
                    }}>
                      [Index {index + 1}]
                    </div>
                  </div>

                  {/* Inter-Node Connectors / Arrows */}
                  {!isTail && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 10px',
                      zIndex: 2
                    }}>
                      {selectedListType === 'doubly' ? (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '2px',
                          color: 'var(--accent-primary)'
                        }}>
                          {/* Forward Arrow */}
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '28px', height: '2px', background: '#6366f1' }} />
                            <ArrowRightIcon size={14} className="" />
                          </div>
                          {/* Backward Arrow */}
                          <div style={{ display: 'flex', alignItems: 'center', transform: 'rotate(180deg)' }}>
                            <div style={{ width: '28px', height: '2px', background: '#8b5cf6' }} />
                            <ArrowRightIcon size={14} className="" />
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: node.status === 'active' ? '#f59e0b' : 'var(--accent-primary)'
                        }}>
                          <div style={{
                            width: '34px',
                            height: '2px',
                            background: node.status === 'active' ? '#f59e0b' : '#6366f1'
                          }} />
                          <ArrowRightIcon size={16} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Terminal NULL Indicator for Singly and Doubly at the end */}
                  {isTail && selectedListType !== 'circular' && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '10px',
                      zIndex: 2
                    }}>
                      <div style={{ width: '24px', height: '2px', background: '#6366f1' }} />
                      <div style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)'
                      }}>
                        NULL
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Circular Linked List Loop Back Arrow Display */}
        {selectedListType === 'circular' && nodes.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '20px',
            right: '20px',
            height: '36px',
            borderBottom: '2px dashed #10b981',
            borderLeft: '2px dashed #10b981',
            borderRight: '2px dashed #10b981',
            borderBottomLeftRadius: '14px',
            borderBottomRightRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}>
            <span style={{
              background: 'var(--bg-secondary)',
              padding: '2px 10px',
              borderRadius: '20px',
              border: '1px solid #10b981',
              color: '#10b981',
              fontSize: '0.7rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>Circular Loop: last-&gt;next returns to HEAD ({nodes[0]?.address})</span>
            </span>
          </div>
        )}
      </div>

      {/* Selected Node Inspector Flyout / Teacher Tooltip */}
      {selectedNodeId && (
        <div style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-highlight)',
          borderRadius: '8px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {(() => {
            const inspected = nodes.find(n => n.id === selectedNodeId);
            if (!inspected) return null;
            return (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="badge badge-primary">Inspected Node</span>
                  <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                    Address: <strong>{inspected.address}</strong>
                  </span>
                  <span style={{ fontSize: '0.8125rem' }}>
                    Data: <strong>{inspected.value}</strong>
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                    Next: <strong>{inspected.nextAddress}</strong>
                  </span>
                  {inspected.prevAddress && (
                    <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                      Prev: <strong>{inspected.prevAddress}</strong>
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedNodeId(null)}
                  style={{
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-muted)'
                  }}
                >
                  Close
                </button>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
