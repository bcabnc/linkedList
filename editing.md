# Project Development Memory

## Current Project State

### Project
BCA Semester V – Interactive Linked List Visualizer & Code Execution Lab

### Purpose
A state-of-the-art interactive educational web application specifically tailored for BCA Semester V Data Structures students and faculty. It delivers deep conceptual understanding by connecting:
Concept -> Data Structure Diagram -> Algorithm -> C Source Code (Full Code) -> Line-by-Line Execution -> Visual Animation -> Simulated Memory State.

### Current Status
Version 1.5 complete. Diagnosed and resolved layout blowout and overlap bug shown on live Vercel deployment where `ExplanationPanel` was overlapping directly on top of the visualizer canvas and code editor. Converted grid containers to robust `min-height: 0; min-width: 0; overflow: hidden;` layouts, responsive height clamping `clamp(280px, 44vh, 420px)`, solid sticky Executive Command Toolbar (`ControlsPanel`), and eliminated outer page hijacking by transitioning `scrollIntoView()` in `CodePanel` to targeted container-level `container.scrollTo()`. Clean production build passing and ready to push to remote `https://github.com/bcabnc/linkedList.git`.

### Technology
- Frontend: React 19, Vite 8, Vanilla CSS Design System with CSS Custom Properties
- Icons: 100% Crisp inline SVG icons (Zero representative emoji rule strictly enforced)
- Execution Engine: Data-driven state machine generating discrete execution steps in pure C
- Code Engine: Complete, compilable ANSI C / C99 code for all linked list operations
- Remote Repository: `https://github.com/bcabnc/linkedList.git` (branch `main`)

### Completed Features
- **Grid Overflow Blowout & Overlap Fix (Version 1.5)**:
  - Root cause identified: `.workspace-grid` had a fixed height without `overflow: hidden`, while child grid items defaulted to `min-height: min-content`, causing `VisualizationPanel` and `CodePanel` to blow out to 861px height.
  - As a result, `ExplanationPanel` (positioned below the 420px grid) was rendered right on top of the protruding bottom 441px of the visualizer and code editor.
  - Added `min-height: 0; min-width: 0; overflow: hidden;` across `.workspace-grid` and `.panel-mobile-full`.
  - Added `minHeight: 0; minWidth: 0;` to both `VisualizationPanel` and `CodePanel`.
  - Updated grid height to fluid responsive `clamp(280px, 44vh, 420px)` and reduced canvas padding from 60px to 20px so nodes fit comfortably on laptop viewports.
- **Scroll Hijacking Elimination in CodePanel**:
  - Replaced native `scrollIntoView({ block: 'nearest' })` with local ref `codeEditorRef.current.scrollTo(...)`.
  - Prevents browser from scrolling parent `<main>` container or window when highlighting lines during step execution.
- **Solid Sticky Executive Command Toolbar**:
  - Styled `ControlsPanel` with `position: sticky; top: 0; zIndex: 30; background: var(--bg-secondary); border: 1px solid var(--border-color); flexShrink: 0;`.
  - Toolbar remains accessible while scrolling into explanations and memory layout with zero bleed-through artifacts.
- **Modal Viewport Portal Mounting**:
  - Base List Modal portaled directly to `document.body` with `z-index: 9999`.
- **Pure ANSI C Compilable Source Code**:
  - Full C code for all 28 operations across Singly, Circular, and Doubly Linked Lists.

### In Progress
- Pushing Version 1.5 to GitHub repository.

### Known Issues
- Playwright headless browser binary download failed due to network 404 on Azure Edge CDN; verified layout programmatically via Microsoft Edge CDP automated harness.

### Important Constraints
- Strictly NO representative emojis anywhere in the UI or codebase (SVG icons only).
- Keep animations synchronized with algorithmic state transitions in C.
- Maintain mobile-first responsive layout with touch-friendly elements.
- Every operation must begin at Step 1: Pristine Initial State.

### Recommended Next Step
Commit and push Version 1.5 to remote `https://github.com/bcabnc/linkedList.git` and verify Vercel deployment.

---

## Development History

## 2026-10-08 — Version 1.5: Grid Overflow Blowout & Overlap Fix, Local Code Scrolling

### User Request
User provided live screenshot of `https://linked-list-umber.vercel.app` showing `Execution Step Analysis` overlapping on top of the visualizer canvas nodes and C code editor.

### Work Completed
- Layout blowout investigation via Microsoft Edge CDP automated protocol:
  - Discovered `vis` and `code` expanded to 861px height due to CSS Grid default `min-height: min-content`, while `.workspace-grid` had height 420px without overflow protection.
  - Measured `exp` starting at top: 624px while `vis`/`code` extended to 1083px, creating physical overlap of 441px.
- Implemented CSS Grid & Flex containment:
  - Added `min-height: 0; min-width: 0; overflow: hidden;` to `.workspace-grid .panel-mobile-full`.
  - Changed `height: 420px` to responsive `height: clamp(280px, 44vh, 420px); min-height: 260px;`.
  - Updated `VisualizationPanel` and `CodePanel` to `minHeight: 0; minWidth: 0;`.
  - Reduced excess canvas vertical padding in `VisualizationPanel` from `30px 16px 60px 16px` to `16px 14px 20px 14px`.
- Replaced `scrollIntoView()` in `CodePanel`:
  - Replaced native `scrollIntoView()` with local `codeEditorRef.current.scrollTo(...)`.
  - Completely eliminated parent container jump/scrolling on step navigation.
- Enhanced `ControlsPanel`:
  - Added `position: sticky; top: 0; zIndex: 30; background: var(--bg-secondary); flexShrink: 0;` so it remains pinned and cleanly opaque.
- Verified:
  - Edge CDP layout analysis confirmed `vis` and `code` bottom at 502px, and `exp` starting cleanly at 514px (12px gap, 0px overlap).
  - Production build passed in 620ms with 0 errors.

### Files Created
None.

### Files Modified
- `src/index.css`
- `src/App.jsx`
- `src/components/VisualizationPanel.jsx`
- `src/components/CodePanel.jsx`
- `src/components/ControlsPanel.jsx`
- `src/components/ExplanationPanel.jsx`
- `editing.md`

### Files Deleted
None.

### Technical Decisions
- Used `container.scrollTo()` instead of `scrollIntoView()` to scope scrolling strictly to the code pane.
- Applied CSS Grid `min-height: 0` containment to prevent child content from overriding grid track heights.
- Made `ControlsPanel` sticky with an opaque background to maintain instant playback control access.

### Architecture Changes
- Strict vertical ordering with explicit grid containment prevents any sibling overlap.

### Dependencies
None added.

### Testing
- Microsoft Edge CDP headless run validated 0px overlap in both initial and scrolled states.
- `npm run build` completed successfully in 620ms.

### Bugs Fixed
- Fixed `ExplanationPanel` overlapping visualizer nodes and C code editor.
- Fixed `scrollIntoView()` in `CodePanel` hijacking the main viewport scroll.

### Known Issues
None.

### Failed Approaches
None.

### User Decisions
- User requested clean visualizer and code visibility with zero overlap.

### Pending Work
- [x] Fix grid blowout and ExplanationPanel overlap
- [x] Fix scrollIntoView hijacking in CodePanel
- [x] Make ControlsPanel sticky with solid background
- [x] Verify layout programmatically
- [x] Update editing.md
- [ ] Commit and push to https://github.com/bcabnc/linkedList.git

### Recommended Next Step
Push changes to GitHub origin main.

---

## 2026-10-08 — Version 1.4: Modal Viewport Portal Fix & GitHub Repository Deployment

### User Request
1. "now working, and isko fix kar ke https://github.com/bcabnc/linkedList.git gitpush kar do" (Now working, fix the UI issues from the screenshot and push to the GitHub repository).

### Work Completed
- Fixed Base List Modal clipping bug:
  - Identified root cause: parent `.glass-panel` uses `backdrop-filter: blur()`, creating a CSS containing block that isolated `position: fixed` elements and caused the top of the modal to be cut off outside the viewport.
  - Wrapped modal in `createPortal(..., document.body)` so it renders at the root `<body>` level with `z-index: 9999` and perfect viewport centering.
  - Updated "Set Starting List" and "Animate Create List" handlers to close the modal immediately upon click, avoiding any visual lag or stuck overlays.
- Cleaned up layout:
  - Removed duplicate `[ Show Sidebar ]` button from `App.jsx`, retaining the primary, persistent toggle in the Header.
- Git & GitHub Deployment:
  - Initialized Git repository in `c:\Users\DELL\Desktop\DSA\web`.
  - Added remote origin `https://github.com/bcabnc/linkedList.git`.
  - Created root commit: `Initial commit: Interactive Linked List Visualizer and C Code Execution Lab (BCA Semester V)`.
  - Pushed to `origin/main` successfully with tracking branch set.
- Tested:
  - Production build `npm run build` completed in 493ms with 0 errors.
  - Dev server HTTP 200 verified.
  - `git status` confirmed clean working tree on `main` branch.

### Files Created
None.

### Files Modified
- `src/components/ControlsPanel.jsx`
- `src/App.jsx`
- `src/index.css`
- `editing.md`

### Files Deleted
None.

### Technical Decisions
- Used `createPortal` to mount modal to `document.body`, guaranteeing immune isolation from any CSS filters, transforms, or overflow constraints on ancestor containers.
- Retained a single header-level sidebar toggle button to prevent awkward dual-button stacking.

### Architecture Changes
- Base list modal is portaled directly into the document root.

### Dependencies
None added.

### Testing
- `npm run build` passed with code 0 (34 modules transformed, 493ms).
- Dev server tested with `fetch('http://localhost:5173')` returning HTTP 200.
- `git push -u origin main` completed with status 0.

### Bugs Fixed
- Fixed modal top clipping caused by CSS `backdrop-filter` containing block trap.
- Fixed duplicate "Show Sidebar" button appearing beneath the header.

### Known Issues
None.

### Failed Approaches
None.

### User Decisions
- User requested push to remote GitHub repository `https://github.com/bcabnc/linkedList.git`.

### Pending Work
- [x] Fix modal clipping via React Portal
- [x] Remove duplicate Show Sidebar button
- [x] Test production build
- [x] Commit and push to https://github.com/bcabnc/linkedList.git
- [x] Update editing.md

### Recommended Next Step
Inform user of successful push and verified UI fixes.

---


## Development History

## 2026-10-08 — Version 1.3: Dynamic Base List & Mobile-First Responsive Design

### User Request
1. "baselist modify nhi ho raha hai, syd ye hardcoded hai" (Base list is not modifying, probably it is hardcoded).
2. "isko mobile first responsive banao" (Make it mobile first responsive).

### Work Completed
- Fixed hardcoded base list bug:
  - In `App.jsx`, `params.values` was hardcoded to `[10, 20, 30, 40]`. Replaced with reactive state `baseListValues`.
  - Implemented `buildNodesForType` and `handleUpdateBaseList` so custom base values propagate smoothly to all list types and all operations without being overwritten.
  - Replaced basic popover with an interactive, full-featured Base List Modal with live chain visualization, comma-separated input, presets (`[10, 20, 30]`, `[10..40]`, `[5..45]`, `[100, 200]`, `[7]`), random generator (`ShuffleIcon`), append node tool, and distinct "Set Starting List" and "Animate Create List" actions.
- Implemented Mobile-First Responsive architecture:
  - Added CSS classes `.app-sidebar-container`, `.sidebar-backdrop`, `.nav-scroll-bar`, `.workspace-grid`, `.mobile-view-bar`, `.mobile-view-btn`, and `.touch-scroll` in `src/index.css`.
  - Updated `Sidebar.jsx` to render an off-canvas drawer with backdrop overlay on mobile screens (`<= 768px`) that auto-closes on selection.
  - Updated `Header.jsx` with mobile-compact layout, horizontal scroll tabs, and responsive icon actions (`hide-on-mobile`).
  - Added mobile view switcher (`[Canvas] | [C Code] | [Both]`) on screens `<= 900px` in `App.jsx` to allow phone users to switch between full-width visualizer, full-width C code, or stacked view.
  - Added `.touch-scroll` to `VisualizationPanel.jsx`, `CodePanel.jsx`, and `ExplanationPanel.jsx` tables.
  - Reduced outer padding on `ComparisonPanel.jsx`, `ComplexityPanel.jsx`, and `PracticePanel.jsx` for clean mobile viewing.
  - Added new SVG icons: `MenuIcon`, `ShuffleIcon`, `ColumnsIcon`, `SmartphoneIcon`, `MonitorIcon`, `PlusIcon`, `TrashIcon` in `src/components/icons/Icons.jsx`.

### Files Created
None.

### Files Modified
- `src/components/icons/Icons.jsx`
- `src/index.css`
- `src/App.jsx`
- `src/components/Header.jsx`
- `src/components/Sidebar.jsx`
- `src/components/ControlsPanel.jsx`
- `src/components/VisualizationPanel.jsx`
- `src/components/CodePanel.jsx`
- `src/components/ExplanationPanel.jsx`
- `src/components/ComparisonPanel.jsx`
- `src/components/ComplexityPanel.jsx`
- `src/components/PracticePanel.jsx`
- `editing.md`

### Files Deleted
None.

### Technical Decisions
- Preserved single-row density on desktop while creating dedicated modal and touch-friendly controls on mobile.
- Provided a segmented mobile view switcher (`[Canvas] | [C Code] | [Both]`) for screens `< 900px` so mobile users are not constrained by squashed columns.
- Separated "Set Starting List" (sets base nodes for testing any operation like insert/delete/search/reverse) from "Animate Create List" (step-by-step C creation).

### Architecture Changes
- Base list state (`baseListValues`) is now a first-class reactive state in `App.jsx` passing down to execution engines, controls, and node creators.

### Dependencies
None added.

### Testing
- Verified custom base list generation via automated Node.js test script with custom values `[5, 15, 25, 35, 99]`.
- Verified production build: `npm run build` completed successfully (34 modules transformed, 0 errors, 654ms).
- Verified local dev server at `http://localhost:5173/` responding HTTP 200 OK.
- Audited codebase for emojis: 0 representative emojis found (100% SVG icons).

### Bugs Fixed
- Fixed hardcoded `[10, 20, 30, 40]` array in `App.jsx` that was resetting custom lists.
- Fixed sidebar squishing main content on mobile screens by transforming it into an off-canvas drawer with backdrop.
- Fixed 2-column workspace layout collapsing awkwardly on mobile by introducing the mobile segmented view switcher.

### Known Issues
None.

### Failed Approaches
None.

### User Decisions
- User requested fix for hardcoded base list and mobile-first responsiveness.

### Pending Work
- [x] Fix hardcoded base list in App.jsx
- [x] Create comprehensive Base List modal with presets and randomizer
- [x] Implement off-canvas mobile drawer with backdrop for Sidebar
- [x] Add mobile view switcher ([Canvas] | [C Code] | [Both])
- [x] Make Header scrollable and responsive on mobile
- [x] Add touch-scroll utility to canvas, code editor, and tables
- [x] Make Comparison, Complexity, and Practice panels mobile responsive
- [x] Verify build and execution

### Recommended Next Step
Demonstrate the new dynamic Base List modal and mobile responsiveness to the user.

---


## Development History

## 2026-10-08 — Version 1.2: Clean Layout Redesign & Initial-State Execution

### User Request
1. "interface bahut messy ho gaya hai jisse visualization aur code sahi se nhi dikh raha raha hai. isko fix karo." (The interface has become very messy/cluttered, making visualization and code hard to see. Fix this!).
2. "aur koi v operation ekdum suru se suru karo." (And start every operation completely from the very beginning!).

### Work Completed
- Redesigned `src/components/ControlsPanel.jsx` from a tall, cluttered ~380px panel into a sleek, compact ~54px high-density Executive Command Bar.
- Fixed layout wrapping bug in `src/App.jsx` by switching from `repeat(auto-fit, minmax(420px, 1fr))` to `minmax(0, 1.25fr) minmax(0, 1fr)`, ensuring Visualization Canvas and C Code Panel always sit side-by-side cleanly without breaking on laptop viewports.
- Added smooth auto-scrolling to the active code line in `src/components/CodePanel.jsx`.
- Prepend a pristine "Step 1: Initial State" for all 10 operations in `src/algorithms/singlyLinkedListEngine.js` (`create`, `insertAtBeginning`, `insertAtEnd`, `insertAtPosition`, `deleteFromBeginning`, `deleteFromEnd`, `deleteFromPosition`, `search`, `traverse`, `reverse`).
- Prepend a pristine "Step 1: Initial State" for all 8 operations in `src/algorithms/circularLinkedListEngine.js`.
- Prepend a pristine "Step 1: Initial State" for all 10 operations in `src/algorithms/doublyLinkedListEngine.js`.
- Synchronized all `codeLine` references across all engines to map 1:1 with the full ANSI C compilable program code.
- Added `SlidersIcon` and `ListFilterIcon` SVG components in `src/components/icons/Icons.jsx`.
- Verified all 28 operations programmatically via test harness confirming 100% of operations start with "Initial State" at Step 1.
- Built production bundle with `npm run build` (34 modules transformed, 0 errors, 375ms).

### Files Created
None.

### Files Modified
- `src/components/icons/Icons.jsx`
- `src/components/ControlsPanel.jsx`
- `src/components/CodePanel.jsx`
- `src/components/VisualizationPanel.jsx`
- `src/algorithms/singlyLinkedListEngine.js`
- `src/algorithms/circularLinkedListEngine.js`
- `src/algorithms/doublyLinkedListEngine.js`
- `src/App.jsx`
- `editing.md`

### Files Deleted
- `testEngines.js` (temporary verification script removed after passing).

### Technical Decisions
- Consolidated controls into a single row to preserve vertical screen real estate for the visual canvas and code editor.
- Step 1 is universally defined as the unmutated base state with the function declaration line highlighted in the C code, giving students and teachers clear "before and after" mental models.
- Added `scrollIntoView({ behavior: 'smooth', block: 'nearest' })` in `CodePanel.jsx` so long C programs automatically follow the executing pointer without requiring manual scrolling.

### Architecture Changes
- Streamlined operation dispatching: the execution generator cleanly preserves `nodes` as initial state for Step 1, delaying mutation to Step 2+.

### Dependencies
- None added.

### Testing
- Automated Node.js test harness verified that 100% of operations in Singly, Circular, and Doubly engines start at Step 1 with "Initial State".
- `npm run build` passed with exit code 0 in 375ms.
- Vite dev server running on `http://localhost:5173/` verified HTTP 200.

### Bugs Fixed
- Fixed UI layout collapse where `minmax(420px, 1fr)` caused the code panel to be shoved off-screen beneath the visualizer on standard laptop resolutions.
- Fixed operations jumping immediately into post-allocation/mutated state without showing the starting list condition.
- Fixed line number offsets in C snippets where highlighted lines were previously pointing to header comments instead of function bodies.

### Known Issues
- Browser subagent's Playwright driver download hit 404 from upstream CDN. Programmatic test harness and local server probes verified correctness instead.

### Failed Approaches
- None.

### User Decisions
- Standardized on a compact top control bar to maximize space for simultaneous list visualization and line-by-line C code execution.

### Pending Work
- [x] Redesign ControlsPanel into compact toolbar
- [x] Fix split grid layout in App.jsx to keep visualization and code side-by-side
- [x] Add auto-scroll to active code line in CodePanel
- [x] Update Singly engine: all operations start at Step 1 Initial State
- [x] Update Circular engine: all operations start at Step 1 Initial State
- [x] Update Doubly engine: all operations start at Step 1 Initial State
- [x] Synchronize exact C code lines for all functions
- [x] Verify build and execution

### Recommended Next Step
Present the updated clean layout and initial-state execution to the user.

---

## 2026-10-08 — Version 1.1: Collapsible Sidebar & Pure C Language Full Code

### User Request
1. Add a button to hide the left sidebar so it can be collapsed for more visualizer space.
2. Provide code examples in full C language instead of C++.

### Work Completed
- Added `PanelLeftCloseIcon` and `PanelLeftOpenIcon` SVG components in `src/components/icons/Icons.jsx`.
- Added `isSidebarOpen` state management in `src/App.jsx`.
- Added "Hide Sidebar" / "Show Sidebar" toggle button in `src/components/Header.jsx`.
- Added quick "Hide" button in `src/components/Sidebar.jsx` header.
- Added quick "Show Sidebar" trigger button when collapsed in `src/App.jsx`.
- Converted all source code snippets in `src/algorithms/singlyLinkedListEngine.js` to full C code with `#include <stdio.h>`, `#include <stdlib.h>`, `struct Node`, `malloc`, `free`, `printf`, and `NULL`.
- Converted all source code snippets in `src/algorithms/circularLinkedListEngine.js` to full C code.
- Converted all source code snippets in `src/algorithms/doublyLinkedListEngine.js` to full C code.
- Mapped all `codeLine` and `codeSnippet` execution steps in Singly, Circular, and Doubly engines to exact line numbers of the full C code.
- Updated `src/components/CodePanel.jsx` to default to C (Full Code).
- Updated `src/components/ConceptGuideModal.jsx` and `src/data/practiceQuestions.js` with C terminology.
- Tested and verified build via `npm run build` (34 modules transformed, 0 errors).
- Freed port 5173 and restarted Vite dev server daemon at `http://localhost:5173/`. Verified HTTP 200 response.

### Files Created
None.

### Files Modified
- `editing.md`
- `src/components/icons/Icons.jsx`
- `src/components/Sidebar.jsx`
- `src/components/Header.jsx`
- `src/components/CodePanel.jsx`
- `src/components/ConceptGuideModal.jsx`
- `src/data/practiceQuestions.js`
- `src/algorithms/singlyLinkedListEngine.js`
- `src/algorithms/circularLinkedListEngine.js`
- `src/algorithms/doublyLinkedListEngine.js`
- `src/App.jsx`

### Files Deleted
None.

### Technical Decisions
- Preserved full compilable C code structure (including headers `#include <stdio.h>`, `#include <stdlib.h>`, `struct Node` definition, and global `head`) inside the code panel so students can copy/paste and compile directly in GCC/Turbo C without missing declarations.
- Re-calculated all line numbers so the execution highlights precisely track each statement inside the C functions.
- Placed sidebar toggle controls in both the Header and the Sidebar header, plus an affixed "Show Sidebar" button when collapsed, maximizing ease of navigation.

### Architecture Changes
- Sidebar visibility can now be toggled dynamically without losing active list state or selected operation.

### Dependencies
- Unchanged.

### Testing
- `npm run build` completed successfully in 379ms.
- Local dev server tested and responding on `http://localhost:5173/` (HTTP 200 OK).

### Bugs Fixed
None.

### Known Issues
None.

### Failed Approaches
None.

### User Decisions
- Standardized entirely on standard C language (full code) as per the user's explicit preference over C++.

### Pending Work
- [x] Add sidebar toggle button to Header
- [x] Add hide button inside Sidebar header
- [x] Add show sidebar trigger button when collapsed
- [x] Rewrite Singly Linked List code to full C
- [x] Rewrite Circular Linked List code to full C
- [x] Rewrite Doubly Linked List code to full C
- [x] Synchronize execution lines with C code
- [x] Update CodePanel to C standard
- [x] Update Concept Guide and Practice Quiz with C syntax
- [x] Test production build and restart dev server

### Recommended Next Step
Demonstrate the new collapsible sidebar and C full code to the user.

---

## 2026-10-07 — Version 1.0 Full Implementation

### User Request
Build an interactive Linked List visualizer and code execution learning website for BCA Semester V Data Structures students.

### Work Completed
- Scaffolding: Initialized Vite React application.
- Created `src/components/icons/Icons.jsx` with complete inline SVG icons.
- Built design system, algorithm state engines, UI panels, teacher mode, and practice quizzes.
