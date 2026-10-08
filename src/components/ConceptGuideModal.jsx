import React, { useState } from 'react';
import { BookOpenIcon, XIcon, ArrowRightIcon, SparklesIcon, CheckIcon } from './icons/Icons';

export const ConceptGuideModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Step 1: What is a Node?',
      subtitle: 'The Building Block of Linked Data Structures',
      description: 'In C, a Linked List does not store elements in a continuous array block. Instead, it uses discrete objects called struct Node allocated dynamically on the heap using malloc().',
      diagram: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            borderRadius: '12px',
            border: '2px solid var(--accent-primary)',
            background: 'rgba(99, 102, 241, 0.1)',
            overflow: 'hidden',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)'
          }}>
            <div style={{ padding: '16px 24px', borderRight: '2px solid var(--accent-primary)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>DATA FIELD</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>10</div>
            </div>
            <div style={{ padding: '16px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>NEXT POINTER</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>●</div>
            </div>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <code>struct Node = [ Data (int) | Next Pointer (struct Node*) ]</code>
          </span>
        </div>
      ),
      bulletPoints: [
        'Data: Holds the actual value (e.g. integer 10).',
        'Next: Holds the memory address of the next struct Node.',
        'Heap Allocated: Created at runtime using `(struct Node*)malloc(sizeof(struct Node));`.'
      ]
    },
    {
      title: 'Step 2: How Memory Differs from Arrays',
      subtitle: 'Contiguous vs Non-Consecutive Heap Addresses',
      description: 'Arrays require consecutive contiguous memory. If memory is fragmented, allocating a large array fails! Linked lists solve this because nodes can live anywhere in RAM.',
      diagram: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '480px' }}>
          <div style={{ background: 'var(--bg-panel)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', marginBottom: '6px' }}>
              ARRAY (Contiguous Memory):
            </div>
            <div style={{ display: 'flex', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <div style={{ flex: 1, padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div>10</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>@ 0x1000</div>
              </div>
              <div style={{ flex: 1, padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div>20</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>@ 0x1004</div>
              </div>
              <div style={{ flex: 1, padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div>30</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>@ 0x1008</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-panel)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', marginBottom: '6px' }}>
              LINKED LIST (Scattered Heap Addresses Connected by Pointers):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                <span style={{ color: '#fbbf24' }}>0x1000</span>
                <span>[ 10 | 0x2050 ]</span>
                <span style={{ color: 'var(--text-muted)' }}>points to 0x2050</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                <span style={{ color: '#fbbf24' }}>0x2050</span>
                <span>[ 20 | 0x3100 ]</span>
                <span style={{ color: 'var(--text-muted)' }}>points to 0x3100</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                <span style={{ color: '#fbbf24' }}>0x3100</span>
                <span>[ 30 | NULL ]</span>
                <span style={{ color: '#ef4444' }}>terminator</span>
              </div>
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'Notice: 0x1000 → 0x2050 → 0x3100 are completely non-consecutive!',
        'Insertion does NOT require shifting elements like an array does.',
        'Dynamic sizing: No pre-allocation capacity limit.'
      ]
    },
    {
      title: 'Step 3: HEAD, TAIL, and NULL',
      subtitle: 'The Critical Navigation Pointers',
      description: 'Because nodes are scattered, you can only access the linked list if you know where it begins (HEAD). If you lose the HEAD pointer, the entire list is lost forever in memory (Memory Leak)!',
      diagram: (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-panel)',
          padding: '16px',
          borderRadius: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)' }}>HEAD</span>
            <span style={{ color: 'var(--accent-primary)' }}>↓</span>
            <div style={{ padding: '8px 12px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '6px', border: '1px solid var(--accent-primary)' }}>
              10 | ●
            </div>
          </div>
          <span>→</span>
          <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            20 | ●
          </div>
          <span>→</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981' }}>TAIL</span>
            <span style={{ color: '#10b981' }}>↓</span>
            <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '6px', border: '1px solid #10b981' }}>
              30 | NULL
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'HEAD: Pointer variable storing the address of the 1st node.',
        'TAIL: Pointer referencing the last node (optional, speeds up append to O(1)).',
        'NULL: A special zero address indicating the end of the chain.'
      ]
    },
    {
      title: 'Step 4: Singly vs Circular vs Doubly',
      subtitle: 'The Three Main Variations in BCA Semester V',
      description: 'Each variation solves a specific limitation of linear chaining.',
      diagram: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <div style={{ padding: '8px 12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', border: '1px solid #3b82f6', fontSize: '0.75rem' }}>
            <strong>1. Singly Linked List:</strong> Forward-only. Last node points to NULL. Lowest memory overhead.
          </div>
          <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '6px', border: '1px solid #10b981', fontSize: '0.75rem' }}>
            <strong>2. Circular Linked List:</strong> Continuous loop. Last node loops back to HEAD. Great for round-robin tasks.
          </div>
          <div style={{ padding: '8px 12px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '6px', border: '1px solid #8b5cf6', fontSize: '0.75rem' }}>
            <strong>3. Doubly Linked List:</strong> Two-way pointers [PREV | DATA | NEXT]. Seamless forward and backward traversal.
          </div>
        </div>
      ),
      bulletPoints: [
        'Select any type in the visualizer to inspect operations step-by-step.',
        'Watch the C code line-by-line highlight in synchronization with memory updates.'
      ]
    }
  ];

  const currentData = steps[currentStep];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-highlight)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-primary">
              <BookOpenIcon size={13} /> Visual Classroom Guide
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Lesson {currentStep + 1} of {steps.length}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              color: 'var(--text-muted)',
              padding: '4px',
              borderRadius: '6px',
              display: 'flex'
            }}
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Title */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
            {currentData.title}
          </h2>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
            {currentData.subtitle}
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {currentData.description}
        </p>

        {/* Interactive Diagram */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          background: 'var(--bg-primary)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          {currentData.diagram}
        </div>

        {/* Bullet Points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {currentData.bulletPoints.map((pt, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
              <span style={{ color: '#10b981', marginTop: '2px' }}>
                <CheckIcon size={14} />
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>

        {/* Navigation Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '16px'
        }}>
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: 'var(--bg-panel)',
              color: currentStep === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              opacity: currentStep === 0 ? 0.5 : 1
            }}
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                background: 'var(--accent-primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Next Lesson
              <ArrowRightIcon size={14} />
            </button>
          ) : (
            <button
              onClick={onClose}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                background: '#10b981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Start Exploring Lab
              <CheckIcon size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
