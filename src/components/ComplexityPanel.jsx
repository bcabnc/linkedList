import React from 'react';
import { COMPLEXITY_DATA } from '../data/complexityData';
import { ComplexityIcon, InfoIcon } from './icons/Icons';

export const ComplexityPanel = () => {
  const getComplexityBadge = (notation) => {
    if (notation.includes('O(1)')) {
      return (
        <span className="badge badge-success" style={{ fontFamily: 'var(--font-mono)' }}>
          {notation}
        </span>
      );
    }
    if (notation.includes('O(k)') || notation.includes('O(log')) {
      return (
        <span className="badge badge-warning" style={{ fontFamily: 'var(--font-mono)' }}>
          {notation}
        </span>
      );
    }
    return (
      <span className="badge badge-primary" style={{ fontFamily: 'var(--font-mono)' }}>
        {notation}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 12px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Introduction Card */}
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
            <ComplexityIcon size={18} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
            Time & Space Complexity Reference (Asymptotic Analysis)
          </h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
          Master the Big-O performance of linked list operations for written theory papers and practical viva examinations. Compare why certain operations are instantaneous constant time <strong>O(1)</strong> while others require linear traversal <strong>O(n)</strong>.
        </p>
      </div>

      {/* Interactive Complexity Matrix Table */}
      <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-panel)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px', color: 'var(--text-primary)', fontWeight: 700 }}>Operation</th>
              <th style={{ padding: '12px 14px', color: '#60a5fa', fontWeight: 700 }}>Singly Time</th>
              <th style={{ padding: '12px 14px', color: '#34d399', fontWeight: 700 }}>Circular Time</th>
              <th style={{ padding: '12px 14px', color: '#a78bfa', fontWeight: 700 }}>Doubly Time</th>
              <th style={{ padding: '12px 14px', color: '#10b981', fontWeight: 700 }}>Space</th>
              <th style={{ padding: '12px 14px', color: 'var(--text-muted)', fontWeight: 600 }}>Theoretical Reason</th>
            </tr>
          </thead>
          <tbody>
            {COMPLEXITY_DATA.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {row.operation}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  {getComplexityBadge(row.singlyTime.avg)}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  {getComplexityBadge(row.circularTime.avg)}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  {getComplexityBadge(row.doublyTime.avg)}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span className="badge badge-success" style={{ fontFamily: 'var(--font-mono)' }}>
                    {row.space}
                  </span>
                </td>
                <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: 1.5 }}>
                  {row.explanation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Viva / Practical Exam Key Takeaways */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <InfoIcon size={16} />
          Key Viva Questions for BCA Students
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          <div style={{ background: 'var(--bg-panel)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '4px' }}>
              Q1: Can Binary Search be performed on a Linked List in O(log n)?
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>No.</strong> Binary search requires direct middle-element random access in O(1). Since finding the middle element in a linked list requires traversing n/2 nodes (O(n)), binary search cannot run in O(log n) on standard linked lists.
            </div>
          </div>

          <div style={{ background: 'var(--bg-panel)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '4px' }}>
              Q2: Why is deleting the last node in Singly LL O(n) even with a Tail pointer?
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              To delete the tail, you must update the <em>second-to-last</em> node's <code>next</code> pointer to NULL. Because Singly LL has no backward references, finding that second-to-last node requires traversing all n nodes from HEAD.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
