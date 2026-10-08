// Time and Space Complexity Reference Data for BCA Semester V Data Structures

export const COMPLEXITY_DATA = [
  {
    operation: 'Insert at Beginning',
    singlyTime: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    circularTime: { best: 'O(1)*', avg: 'O(n)', worst: 'O(n)' },
    doublyTime: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
    explanation: 'Singly and Doubly require updating head pointers directly. Circular requires traversing to tail to update tail->next = newHead unless tail pointer is maintained.'
  },
  {
    operation: 'Insert at End (Without Tail pointer)',
    singlyTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    circularTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    doublyTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
    explanation: 'Must traverse n nodes from HEAD to locate the last node. If a direct TAIL pointer is preserved, this drops to O(1) for Singly & Doubly.'
  },
  {
    operation: 'Insert at End (With Tail pointer)',
    singlyTime: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    circularTime: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    doublyTime: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
    explanation: 'Directly attach new node to tail and adjust tail pointer in constant time.'
  },
  {
    operation: 'Insert at Position (k)',
    singlyTime: { best: 'O(1)', avg: 'O(k)', worst: 'O(n)' },
    circularTime: { best: 'O(1)', avg: 'O(k)', worst: 'O(n)' },
    doublyTime: { best: 'O(1)', avg: 'O(k)', worst: 'O(n)' },
    space: 'O(1)',
    explanation: 'Must traverse k steps to find predecessor node before reassigning pointer references.'
  },
  {
    operation: 'Delete from Beginning',
    singlyTime: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    circularTime: { best: 'O(1)*', avg: 'O(n)', worst: 'O(n)' },
    doublyTime: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
    explanation: 'Directly advance HEAD = HEAD->next and free old head. Circular takes O(n) without tail pointer to update last->next.'
  },
  {
    operation: 'Delete from End',
    singlyTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    circularTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    doublyTime: { best: 'O(1)*', avg: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
    explanation: 'In Singly LL, even with a TAIL pointer, deleting from end requires O(n) because we cannot access the predecessor node. Doubly LL can do O(1) using tail->prev!'
  },
  {
    operation: 'Delete from Position (k)',
    singlyTime: { best: 'O(1)', avg: 'O(k)', worst: 'O(n)' },
    circularTime: { best: 'O(1)', avg: 'O(k)', worst: 'O(n)' },
    doublyTime: { best: 'O(1)', avg: 'O(k)', worst: 'O(n)' },
    space: 'O(1)',
    explanation: 'Traverse k nodes to find target, then bypass pointers in O(1).'
  },
  {
    operation: 'Search for Element',
    singlyTime: { best: 'O(1)', avg: 'O(n)', worst: 'O(n)' },
    circularTime: { best: 'O(1)', avg: 'O(n)', worst: 'O(n)' },
    doublyTime: { best: 'O(1)', avg: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
    explanation: 'Sequential search is mandatory because linked lists do not support constant-time random memory indexing like arrays.'
  },
  {
    operation: 'Traverse All Nodes',
    singlyTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    circularTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    doublyTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
    explanation: 'Must visit every node exactly once from beginning to end.'
  },
  {
    operation: 'Reverse List',
    singlyTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    circularTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    doublyTime: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
    explanation: 'Iteratively flip pointer directions in-place using three pointers (prev, current, next).'
  }
];

export const COMPARISON_MATRIX = [
  {
    feature: 'Next Pointer',
    singly: 'Yes (1 pointer)',
    circular: 'Yes (1 pointer)',
    doubly: 'Yes (2 pointers total: prev, next)',
    importance: 'Fundamental link connecting forward nodes'
  },
  {
    feature: 'Previous Pointer',
    singly: 'No',
    circular: 'No (unless Doubly Circular)',
    doubly: 'Yes',
    importance: 'Allows immediate backward traversal without re-scanning'
  },
  {
    feature: 'Termination (NULL at End)',
    singly: 'Yes (last node points to NULL)',
    circular: 'No (last node loops back to HEAD)',
    doubly: 'Yes (last node points to NULL, first prev is NULL)',
    importance: 'Crucial for loop termination check condition'
  },
  {
    feature: 'Forward Traversal',
    singly: 'Yes (HEAD to NULL)',
    circular: 'Yes (continuous cycle until current == head)',
    doubly: 'Yes (HEAD to NULL)',
    importance: 'Standard linear scan capability'
  },
  {
    feature: 'Backward Traversal',
    singly: 'No (cannot step backward)',
    circular: 'No (must traverse full circle to reach previous node)',
    doubly: 'Yes (trivial via node->prev)',
    importance: 'Essential for applications like Undo/Redo or browser history'
  },
  {
    feature: 'Memory Overhead per Node',
    singly: 'Low (1 data + 1 pointer: 4B + 8B = 12B)',
    circular: 'Low (1 data + 1 pointer: 4B + 8B = 12B)',
    doubly: 'Higher (1 data + 2 pointers: 4B + 8B + 8B = 20B)',
    importance: 'Extra pointer per node increases memory footprint on 64-bit systems'
  },
  {
    feature: 'Delete Last Node with Tail Pointer',
    singly: 'O(n) — cannot access predecessor node',
    circular: 'O(n) — must find node before tail',
    doubly: 'O(1) — tail->prev gives predecessor instantly!',
    importance: 'Major theoretical BCA practical question!'
  },
  {
    feature: 'Ideal Real-World Use Case',
    singly: 'Stacks, Queues, Simple forward chaining',
    circular: 'Round-robin CPU scheduling, multiplayer turn games',
    doubly: 'Browser Back/Forward navigation, Music playlist, LRU Cache'
  }
];
