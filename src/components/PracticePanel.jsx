import React, { useState } from 'react';
import { PRACTICE_QUESTIONS } from '../data/practiceQuestions';
import { QuizIcon, CheckIcon, XIcon, ResetIcon, ArrowRightIcon } from './icons/Icons';

export const PracticePanel = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQ = PRACTICE_QUESTIONS[currentQuestionIndex];
  const totalQuestions = PRACTICE_QUESTIONS.length;

  const handleSelectOption = (questionId, optionId) => {
    if (selectedAnswers[questionId]) return; // already answered
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = Object.entries(selectedAnswers).reduce((acc, [qId, ans]) => {
    const q = PRACTICE_QUESTIONS.find(item => item.id === Number(qId));
    return acc + (q && q.correctAnswer === ans ? 1 : 0);
  }, 0);

  const userAnswer = selectedAnswers[currentQ.id];
  const isAnswered = userAnswer !== undefined;
  const isCorrect = userAnswer === currentQ.correctAnswer;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 12px', maxWidth: '860px', margin: '0 auto' }}>
      {/* Quiz Header Card */}
      <div className="glass-panel" style={{
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <QuizIcon size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, margin: 0 }}>
              Student Practice Quiz & Concept Mastery
            </h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Test your understanding of pointer operations, memory models, and execution order
            </div>
          </div>
        </div>

        {/* Score & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'var(--bg-panel)',
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            Score: <span style={{ color: 'var(--accent-primary)' }}>{score}</span> / {answeredCount}
          </div>

          <button
            onClick={handleResetQuiz}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'var(--bg-panel)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ResetIcon size={14} />
            Reset Quiz
          </button>
        </div>
      </div>

      {/* Progress Bar & Question Numbers */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '4px 0' }}>
        {PRACTICE_QUESTIONS.map((q, idx) => {
          const ans = selectedAnswers[q.id];
          const correct = ans === q.correctAnswer;
          const isCurrent = idx === currentQuestionIndex;

          let bg = 'var(--bg-panel)';
          let color = 'var(--text-muted)';
          let border = 'var(--border-color)';

          if (ans !== undefined) {
            bg = correct ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
            color = correct ? '#10b981' : '#ef4444';
            border = correct ? '#10b981' : '#ef4444';
          }
          if (isCurrent) {
            border = 'var(--accent-primary)';
          }

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(idx)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                background: bg,
                color: color,
                border: `2px solid ${border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Main Active Question Card */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="badge badge-primary">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Topic: {currentQ.topic}
          </span>
        </div>

        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
          {currentQ.question}
        </h3>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentQ.options.map(option => {
            const isSelected = userAnswer === option.id;
            const isTheCorrectOption = option.id === currentQ.correctAnswer;

            let borderStyle = '1px solid var(--border-color)';
            let bgStyle = 'var(--bg-panel)';
            let textColor = 'var(--text-primary)';

            if (isAnswered) {
              if (isTheCorrectOption) {
                borderStyle = '2px solid #10b981';
                bgStyle = 'rgba(16, 185, 129, 0.15)';
                textColor = '#10b981';
              } else if (isSelected && !isCorrect) {
                borderStyle = '2px solid #ef4444';
                bgStyle = 'rgba(239, 68, 68, 0.15)';
                textColor = '#ef4444';
              }
            } else if (isSelected) {
              borderStyle = '2px solid var(--accent-primary)';
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(currentQ.id, option.id)}
                disabled={isAnswered}
                style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: borderStyle,
                  background: bgStyle,
                  color: textColor,
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    {option.id}
                  </span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, fontFamily: option.text.includes(';') ? 'var(--font-mono)' : 'inherit' }}>
                    {option.text}
                  </span>
                </div>

                {isAnswered && isTheCorrectOption && (
                  <span style={{ color: '#10b981' }}>
                    <CheckIcon size={18} />
                  </span>
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <span style={{ color: '#ef4444' }}>
                    <XIcon size={18} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Post-Answer Explanation Box */}
        {isAnswered && (
          <div style={{
            background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: '10px',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              color: isCorrect ? '#10b981' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {isCorrect ? <CheckIcon size={16} /> : <XIcon size={16} />}
              {isCorrect ? 'Correct Answer!' : `Incorrect. The correct option is ${currentQ.correctAnswer}.`}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {currentQ.explanation}
            </div>
          </div>
        )}

        {/* Navigation buttons: Prev / Next */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: 'var(--bg-panel)',
              color: currentQuestionIndex === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              opacity: currentQuestionIndex === 0 ? 0.5 : 1
            }}
          >
            Previous Question
          </button>

          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
            disabled={currentQuestionIndex === totalQuestions - 1}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: 'var(--accent-primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: currentQuestionIndex === totalQuestions - 1 ? 0.5 : 1
            }}
          >
            Next Question
            <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
