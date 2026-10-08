import React from 'react';
import { COMPARISON_MATRIX } from '../data/complexityData';
import { ComparisonIcon, CheckIcon, XIcon, ArrowRightIcon } from './icons/Icons';

export const ComparisonPanel = ({ onSelectType }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 12px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Title & Introduction */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <ComparisonIcon size={18} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
            Compare All Linked List Types (Singly vs Circular vs Doubly)
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
          Essential reference for <strong>BCA Semester V Data Structures theory and viva examinations</strong>. Understand how memory layout, pointer counts, and traversal directions differ between linear, circular, and two-way linked lists.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {/* Singly Card */}
        <div className="glass-panel" style={{ padding: '18px', borderTop: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#60a5fa' }}>
              Singly Linked List
            </h3>
            <span className="badge badge-primary">Linear (1 Link)</span>
          </div>
          <div style={{
            background: 'var(--bg-panel)',
            padding: '10px',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            [10 | •] → [20 | •] → [30 | NULL]
          </div>
          <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '18px', lineHeight: 1.6, margin: 0 }}>
            <li>Single forward pointer per node (<code>next</code>).</li>
            <li>Lowest memory overhead (only 1 pointer field).</li>
            <li>Last node points to <code>NULL</code>.</li>
            <li>Backward traversal is impossible without reversing.</li>
          </ul>
        </div>

        {/* Circular Card */}
        <div className="glass-panel" style={{ padding: '18px', borderTop: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#34d399' }}>
              Circular Linked List
            </h3>
            <span className="badge badge-success">Closed Loop</span>
          </div>
          <div style={{
            background: 'var(--bg-panel)',
            padding: '10px',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            [10 | •] → [20 | •] → [30 | 0x1000] ↺
          </div>
          <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '18px', lineHeight: 1.6, margin: 0 }}>
            <li>Last node points back to HEAD (<code>last-&gt;next = head</code>).</li>
            <li>Never terminates with <code>NULL</code>.</li>
            <li>Can traverse whole list starting from any arbitrary node.</li>
            <li>Requires termination check <code>current != head</code>.</li>
          </ul>
        </div>

        {/* Doubly Card */}
        <div className="glass-panel" style={{ padding: '18px', borderTop: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#a78bfa' }}>
              Doubly Linked List
            </h3>
            <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd' }}>Two-Way</span>
          </div>
          <div style={{
            background: 'var(--bg-panel)',
            padding: '10px',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            NULL ← [• | 10 | •] ⇄ [• | 20 | •] → NULL
          </div>
          <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '18px', lineHeight: 1.6, margin: 0 }}>
            <li>Two pointers per node (<code>prev</code> and <code>next</code>).</li>
            <li>Enables instantaneous bidirectional traversal.</li>
            <li>Deletes last node in O(1) if TAIL is known.</li>
            <li>Higher memory overhead per node (2 pointers).</li>
          </ul>
        </div>
      </div>

      {/* Comprehensive Detailed Matrix Table */}
      <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>
          Side-by-Side Architectural Feature Matrix
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-panel)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px', color: 'var(--text-primary)', fontWeight: 700 }}>Feature / Property</th>
              <th style={{ padding: '10px 14px', color: '#60a5fa', fontWeight: 700 }}>Singly Linked List</th>
              <th style={{ padding: '10px 14px', color: '#34d399', fontWeight: 700 }}>Circular Linked List</th>
              <th style={{ padding: '10px 14px', color: '#a78bfa', fontWeight: 700 }}>Doubly Linked List</th>
              <th style={{ padding: '10px 14px', color: 'var(--text-muted)', fontWeight: 600 }}>Syllabus Significance</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_MATRIX.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {row.feature}
                </td>
                <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>
                  {row.singly}
                </td>
                <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>
                  {row.circular}
                </td>
                <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>
                  {row.doubly}
                </td>
                <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  {row.importance || row.singly}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
