// BCA Semester V Data Structures Syllabus Reference

export const SYLLABUS_MODULES = [
  {
    id: 'intro',
    title: 'Introduction to Data Structures',
    status: 'completed',
    submodules: ['Concept of Data Structure', 'Primitive vs Non-Primitive', 'Linear vs Non-Linear', 'Abstract Data Types (ADT)']
  },
  {
    id: 'arrays',
    title: 'Arrays & Memory Mapping',
    status: 'completed',
    submodules: ['1D & 2D Arrays', 'Row-Major & Column-Major Ordering', 'Memory Address Calculation']
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists (Active Core Lab)',
    status: 'active',
    isCurrent: true,
    submodules: [
      { id: 'singly', title: 'Singly Linked List', count: '10 Operations' },
      { id: 'circular', title: 'Circular Linked List', count: '8 Operations' },
      { id: 'doubly', title: 'Doubly Linked List', count: '10 Operations' }
    ]
  },
  {
    id: 'stack',
    title: 'Stack & Applications',
    status: 'coming-soon',
    submodules: ['Array Implementation', 'Linked List Implementation', 'Infix to Postfix', 'Evaluation of Postfix']
  },
  {
    id: 'queue',
    title: 'Queue & Variations',
    status: 'coming-soon',
    submodules: ['Simple Queue', 'Circular Queue', 'Priority Queue', 'Double Ended Queue (Deque)']
  },
  {
    id: 'trees',
    title: 'Trees & Binary Search Trees',
    status: 'coming-soon',
    submodules: ['Binary Tree Traversals (In/Pre/Post)', 'BST Operations', 'AVL Trees (Rotations)', 'B-Trees']
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    status: 'coming-soon',
    submodules: ['Selection Sort', 'Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort']
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    status: 'coming-soon',
    submodules: ['Sequential (Linear) Search', 'Binary Search (Iterative & Recursive)']
  }
];
