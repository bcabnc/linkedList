import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ControlsPanel } from './components/ControlsPanel';
import { VisualizationPanel } from './components/VisualizationPanel';
import { CodePanel } from './components/CodePanel';
import { ExplanationPanel } from './components/ExplanationPanel';
import { ComparisonPanel } from './components/ComparisonPanel';
import { ComplexityPanel } from './components/ComplexityPanel';
import { PracticePanel } from './components/PracticePanel';
import { ConceptGuideModal } from './components/ConceptGuideModal';
import { TeacherModeBanner } from './components/TeacherModeBanner';
import { Footer } from './components/Footer';
import { PanelLeftOpenIcon, SmartphoneIcon, ColumnsIcon, CodeIcon } from './components/icons/Icons';

import {
  SINGLY_CODE_SNIPPETS,
  createInitialSinglyList,
  runSinglyOperation
} from './algorithms/singlyLinkedListEngine';

import {
  CIRCULAR_CODE_SNIPPETS,
  createInitialCircularList,
  runCircularOperation
} from './algorithms/circularLinkedListEngine';

import {
  DOUBLY_CODE_SNIPPETS,
  createInitialDoublyList,
  runDoublyOperation
} from './algorithms/doublyLinkedListEngine';

export function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('visualizer'); // 'visualizer' | 'comparison' | 'complexity' | 'practice'
  const [selectedListType, setSelectedListType] = useState('singly'); // 'singly' | 'circular' | 'doubly'
  const [theme, setTheme] = useState('dark');
  const [showMemoryAddresses, setShowMemoryAddresses] = useState(true);
  const [isConceptGuideOpen, setIsConceptGuideOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Teacher Mode State
  const [teacherMode, setTeacherMode] = useState(false);
  const [hideCode, setHideCode] = useState(false);
  const [hideExplanation, setHideExplanation] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // Controls & Operation Selection
  const [selectedOperation, setSelectedOperation] = useState('insertAtBeginning');
  const [inputValue, setInputValue] = useState(40);
  const [inputPosition, setInputPosition] = useState(2);
  const [initialArrayText, setInitialArrayText] = useState('10, 20, 30, 40');

  // Dynamic Base List Values (Fixed hardcoded issue!)
  const [baseListValues, setBaseListValues] = useState([10, 20, 30, 40]);

  // Mobile View Switcher Mode ('visualizer' | 'code' | 'both')
  const [mobileViewMode, setMobileViewMode] = useState('both');

  // Execution & Animation Playback
  const [executionMode, setExecutionMode] = useState('code-sync');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Helper to construct node list dynamically based on list type and custom numbers
  const buildNodesForType = (type, values) => {
    const cleanVals = Array.isArray(values) && values.length > 0 ? values : [10, 20, 30, 40];
    if (type === 'singly') return createInitialSinglyList(cleanVals);
    if (type === 'circular') return createInitialCircularList(cleanVals);
    return createInitialDoublyList(cleanVals);
  };

  // Working Nodes Base State
  const [baseNodes, setBaseNodes] = useState(() => createInitialSinglyList([10, 20, 30, 40]));
  const [steps, setSteps] = useState([]);

  // Theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Operation Definitions
  const singlyOperations = [
    { id: 'create', label: 'Create List', timeComplexity: 'O(n)' },
    { id: 'insertAtBeginning', label: 'Insert at Beginning', timeComplexity: 'O(1)' },
    { id: 'insertAtEnd', label: 'Insert at End', timeComplexity: 'O(n)' },
    { id: 'insertAtPosition', label: 'Insert at Position', timeComplexity: 'O(pos)' },
    { id: 'deleteFromBeginning', label: 'Delete from Beginning', timeComplexity: 'O(1)' },
    { id: 'deleteFromEnd', label: 'Delete from End', timeComplexity: 'O(n)' },
    { id: 'deleteFromPosition', label: 'Delete from Position', timeComplexity: 'O(pos)' },
    { id: 'search', label: 'Search Value', timeComplexity: 'O(n)' },
    { id: 'traverse', label: 'Traverse List', timeComplexity: 'O(n)' },
    { id: 'reverse', label: 'Reverse List', timeComplexity: 'O(n)' }
  ];

  const circularOperations = [
    { id: 'create', label: 'Create Circular', timeComplexity: 'O(n)' },
    { id: 'insertAtBeginning', label: 'Insert at Beginning', timeComplexity: 'O(n)' },
    { id: 'insertAtEnd', label: 'Insert at End', timeComplexity: 'O(n)' },
    { id: 'insertAtPosition', label: 'Insert at Position', timeComplexity: 'O(pos)' },
    { id: 'deleteFromBeginning', label: 'Delete from Beginning', timeComplexity: 'O(n)' },
    { id: 'deleteFromEnd', label: 'Delete from End', timeComplexity: 'O(n)' },
    { id: 'search', label: 'Search Value', timeComplexity: 'O(n)' },
    { id: 'traverse', label: 'Circular Traversal', timeComplexity: 'O(n)' }
  ];

  const doublyOperations = [
    { id: 'create', label: 'Create Doubly', timeComplexity: 'O(n)' },
    { id: 'insertAtBeginning', label: 'Insert at Beginning', timeComplexity: 'O(1)' },
    { id: 'insertAtEnd', label: 'Insert at End', timeComplexity: 'O(n)' },
    { id: 'insertAtPosition', label: 'Insert at Position', timeComplexity: 'O(pos)' },
    { id: 'deleteFromBeginning', label: 'Delete from Beginning', timeComplexity: 'O(1)' },
    { id: 'deleteFromEnd', label: 'Delete from End', timeComplexity: 'O(n)' },
    { id: 'deleteFromPosition', label: 'Delete from Position', timeComplexity: 'O(pos)' },
    { id: 'forwardTraversal', label: 'Forward Traversal', timeComplexity: 'O(n)' },
    { id: 'backwardTraversal', label: 'Backward Traversal', timeComplexity: 'O(n)' },
    { id: 'search', label: 'Search Value', timeComplexity: 'O(n)' }
  ];

  const availableOperations =
    selectedListType === 'singly'
      ? singlyOperations
      : selectedListType === 'circular'
      ? circularOperations
      : doublyOperations;

  // On type switch, preserve current custom baseListValues
  useEffect(() => {
    setIsPlaying(false);
    const initial = buildNodesForType(selectedListType, baseListValues);
    if (selectedListType === 'singly') {
      if (!singlyOperations.find(o => o.id === selectedOperation)) {
        setSelectedOperation('insertAtBeginning');
      }
    } else if (selectedListType === 'circular') {
      if (!circularOperations.find(o => o.id === selectedOperation)) {
        setSelectedOperation('insertAtBeginning');
      }
    } else {
      if (!doublyOperations.find(o => o.id === selectedOperation)) {
        setSelectedOperation('insertAtBeginning');
      }
    }
    setBaseNodes(initial);
  }, [selectedListType]);

  // Generate Steps whenever operation or parameters or base nodes change
  useEffect(() => {
    setIsPlaying(false);
    let generatedSteps = [];
    const params = {
      value: inputValue,
      position: inputPosition,
      values: baseListValues // Dynamic user custom values!
    };

    if (selectedListType === 'singly') {
      generatedSteps = runSinglyOperation(selectedOperation, baseNodes, params);
    } else if (selectedListType === 'circular') {
      generatedSteps = runCircularOperation(selectedOperation, baseNodes, params);
    } else {
      generatedSteps = runDoublyOperation(selectedOperation, baseNodes, params);
    }

    setSteps(generatedSteps);
    setCurrentStepIndex(0);
  }, [selectedListType, selectedOperation, inputValue, inputPosition, baseNodes, baseListValues]);

  // Auto-play timer mechanism
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      const delay = Math.round(1100 / speed);
      interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, delay);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, steps.length]);

  // Playback handlers
  const handleRunOperation = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  // Modify Base List Handler: Supports both direct starting list update AND animated create!
  const handleUpdateBaseList = (newValues, runCreate = false) => {
    setIsPlaying(false);
    const cleanVals = (Array.isArray(newValues) ? newValues : [])
      .map(v => Number(v))
      .filter(v => !isNaN(v) && isFinite(v));

    const finalVals = cleanVals.length > 0 ? cleanVals : [10, 20, 30];
    setBaseListValues(finalVals);
    setInitialArrayText(finalVals.join(', '));

    const newNodes = buildNodesForType(selectedListType, finalVals);
    setBaseNodes(newNodes);

    if (runCreate) {
      setSelectedOperation('create');
    }
    setCurrentStepIndex(0);
  };


  // Current active step
  const currentStep = steps[currentStepIndex] || {
    stepNumber: 1,
    codeLine: 1,
    codeSnippet: '',
    what: 'Ready',
    why: '',
    how: '',
    nodes: baseNodes,
    pointers: {},
    variables: {}
  };

  // Get current code snippet (Full C code)
  const getCodeSnippet = () => {
    if (selectedListType === 'singly') {
      return SINGLY_CODE_SNIPPETS[selectedOperation] || SINGLY_CODE_SNIPPETS.insertAtBeginning;
    } else if (selectedListType === 'circular') {
      return CIRCULAR_CODE_SNIPPETS[selectedOperation] || CIRCULAR_CODE_SNIPPETS.insertAtBeginning;
    } else {
      return DOUBLY_CODE_SNIPPETS[selectedOperation] || DOUBLY_CODE_SNIPPETS.insertAtBeginning;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedListType={selectedListType}
        setSelectedListType={setSelectedListType}
        theme={theme}
        toggleTheme={toggleTheme}
        showMemoryAddresses={showMemoryAddresses}
        setShowMemoryAddresses={setShowMemoryAddresses}
        teacherMode={teacherMode}
        setTeacherMode={setTeacherMode}
        openConceptGuide={() => setIsConceptGuideOpen(true)}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Teacher Mode Classroom Banner */}
      <TeacherModeBanner
        teacherMode={teacherMode}
        setTeacherMode={setTeacherMode}
        hideCode={hideCode}
        setHideCode={setHideCode}
        hideExplanation={hideExplanation}
        setHideExplanation={setHideExplanation}
        handleStepForward={handleStepForward}
        handleStepBack={handleStepBack}
        handleReset={handleReset}
        currentStepIndex={currentStepIndex}
        totalSteps={steps.length}
        showMemoryAddresses={showMemoryAddresses}
        setShowMemoryAddresses={setShowMemoryAddresses}
      />

      {/* Main Content Area */}
      {activeTab === 'visualizer' && (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Sidebar */}
          <Sidebar
            selectedListType={selectedListType}
            setSelectedListType={setSelectedListType}
            selectedOperation={selectedOperation}
            setSelectedOperation={setSelectedOperation}
            singlyOperations={singlyOperations}
            circularOperations={circularOperations}
            doublyOperations={doublyOperations}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />

          {/* Core Lab Panels */}
          <main style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            height: 'calc(100vh - 61px)',
            transition: 'all 0.25s ease'
          }}>
            {/* Top: Compact Executive Controls Bar */}
            <ControlsPanel
              selectedListType={selectedListType}
              selectedOperation={selectedOperation}
              setSelectedOperation={setSelectedOperation}
              availableOperations={availableOperations}
              inputValue={inputValue}
              setInputValue={setInputValue}
              inputPosition={inputPosition}
              setInputPosition={setInputPosition}
              initialArrayText={initialArrayText}
              setInitialArrayText={setInitialArrayText}
              baseListValues={baseListValues}
              handleUpdateBaseList={handleUpdateBaseList}
              handleRunOperation={handleRunOperation}
              handleStepForward={handleStepForward}
              handleStepBack={handleStepBack}
              handleReset={handleReset}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              speed={speed}
              setSpeed={setSpeed}
              currentStepIndex={currentStepIndex}
              totalSteps={steps.length}
              executionMode={executionMode}
              setExecutionMode={setExecutionMode}
            />

            {/* Mobile-Only View Mode Selector (Segmented pills on small screens) */}
            <div className="mobile-view-bar">
              <button
                type="button"
                onClick={() => setMobileViewMode('visualizer')}
                className={`mobile-view-btn ${mobileViewMode === 'visualizer' ? 'active' : ''}`}
                title="Show full screen visual linked list canvas"
              >
                <SmartphoneIcon size={13} />
                <span>Canvas</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileViewMode('code')}
                className={`mobile-view-btn ${mobileViewMode === 'code' ? 'active' : ''}`}
                title="Show full screen C source code editor"
              >
                <CodeIcon size={13} />
                <span>C Code</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileViewMode('both')}
                className={`mobile-view-btn ${mobileViewMode === 'both' ? 'active' : ''}`}
                title="Show both stacked vertically on mobile"
              >
                <ColumnsIcon size={13} />
                <span>Both</span>
              </button>
            </div>

            {/* Middle: Split Layout (Visualization Center + Code Panel Right side-by-side or mobile toggle) */}
            <div className={`workspace-grid ${teacherMode && hideCode ? 'single-column' : 'desktop-side-by-side'}`} style={{ flexShrink: 0 }}>
              {/* Center Panel: Linked List Animation */}
              {(mobileViewMode === 'visualizer' || mobileViewMode === 'both') && (
                <div className="panel-mobile-full" style={{ height: '100%' }}>
                  <VisualizationPanel
                    nodes={currentStep.nodes || baseNodes}
                    pointers={currentStep.pointers || {}}
                    selectedListType={selectedListType}
                    showMemoryAddresses={showMemoryAddresses}
                    teacherMode={teacherMode}
                    selectedNodeId={selectedNodeId}
                    setSelectedNodeId={setSelectedNodeId}
                    currentStep={currentStep}
                  />
                </div>
              )}

              {/* Right Panel: Source Code in C (Full Code) */}
              {!(teacherMode && hideCode) && (mobileViewMode === 'code' || mobileViewMode === 'both') && (
                <div className="panel-mobile-full" style={{ height: '100%' }}>
                  <CodePanel
                    codeSnippet={getCodeSnippet()}
                    activeLine={currentStep.codeLine || 1}
                    selectedOperationTitle={selectedOperation}
                    selectedListType={selectedListType}
                  />
                </div>
              )}
            </div>

            {/* Bottom: Execution Explanation & What Happens in Memory */}
            {!(teacherMode && hideExplanation) && (
              <ExplanationPanel
                currentStep={currentStep}
                currentStepIndex={currentStepIndex}
                totalSteps={steps.length}
                variables={currentStep.variables || {}}
                nodes={currentStep.nodes || baseNodes}
                pointers={currentStep.pointers || {}}
                showMemoryAddresses={showMemoryAddresses}
              />
            )}

            {/* Application Footer with Developer Credit */}
            <Footer />
          </main>
        </div>
      )}

      {/* Comparison Matrix Tab */}
      {activeTab === 'comparison' && (
        <main style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <ComparisonPanel onSelectType={(type) => { setSelectedListType(type); setActiveTab('visualizer'); }} />
          </div>
          <Footer />
        </main>
      )}

      {/* Complexity Matrix Tab */}
      {activeTab === 'complexity' && (
        <main style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <ComplexityPanel />
          </div>
          <Footer />
        </main>
      )}

      {/* Practice Quiz Tab */}
      {activeTab === 'practice' && (
        <main style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <PracticePanel />
          </div>
          <Footer />
        </main>
      )}


      {/* Interactive Concept Guide Modal */}
      <ConceptGuideModal
        isOpen={isConceptGuideOpen}
        onClose={() => setIsConceptGuideOpen(false)}
      />
    </div>
  );
}

export default App;
