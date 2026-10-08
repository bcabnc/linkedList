// Interactive Practice Questions for BCA Semester V Students
// Covers pointer operations, order of execution, memory model in C, and complexities

export const PRACTICE_QUESTIONS = [
  {
    id: 1,
    topic: 'Singly Linked List Insertion',
    question: 'When inserting a new node at the beginning of a Singly Linked List, which pointer operation must be executed FIRST in C?',
    options: [
      { id: 'A', text: 'head = newNode;' },
      { id: 'B', text: 'newNode->next = head;' },
      { id: 'C', text: 'head->next = newNode;' },
      { id: 'D', text: 'tail = newNode;' }
    ],
    correctAnswer: 'B',
    explanation: 'newNode->next must point to head BEFORE head is updated. If you update head = newNode first, you lose the reference to the entire remaining list in memory!'
  },
  {
    id: 2,
    topic: 'Memory Concept',
    question: 'Why does a Linked List not require contiguous memory allocation like an Array?',
    options: [
      { id: 'A', text: 'Because each node stores the physical memory address (pointer) of the next node' },
      { id: 'B', text: 'Because linked list nodes are stored inside CPU cache registers' },
      { id: 'C', text: 'Because linked lists use index mathematics like array[i]' },
      { id: 'D', text: 'Because the compiler forces contiguous blocks on the heap' }
    ],
    correctAnswer: 'A',
    explanation: 'Unlike arrays where element i+1 is immediately next to element i in memory, linked list nodes can reside anywhere in the heap because the "next" pointer explicitly stores the successor address.'
  },
  {
    id: 3,
    topic: 'Singly Linked List Deletion',
    question: 'In C, why do we use a temporary pointer "temp" before advancing head during deleteFromBeginning()?',
    options: [
      { id: 'A', text: 'To count the total number of nodes' },
      { id: 'B', text: 'To hold the address of the old node so we can call free(temp) to prevent memory leaks' },
      { id: 'C', text: 'Because C syntax forbids assigning head = head->next directly' },
      { id: 'D', text: 'To reverse the direction of the list' }
    ],
    correctAnswer: 'B',
    explanation: 'If you advance head = head->next without saving the old address, that heap block becomes inaccessible ("orphaned memory"), causing a memory leak. free(temp) safely frees the memory.'
  },
  {
    id: 4,
    topic: 'Circular Linked List Traversal',
    question: 'In a Circular Linked List, what condition indicates that full traversal is complete?',
    options: [
      { id: 'A', text: 'current == NULL' },
      { id: 'B', text: 'current->next == NULL' },
      { id: 'C', text: 'current->next == head (or current reaches head again after visiting)' },
      { id: 'D', text: 'head == NULL' }
    ],
    correctAnswer: 'C',
    explanation: 'In a circular linked list, no node ever has next == NULL. The last node points back to HEAD, so traversal terminates when our pointer loops back to the HEAD node.'
  },
  {
    id: 5,
    topic: 'Doubly Linked List Mechanics',
    question: 'What is the value of head->prev in a standard Doubly Linked List in C?',
    options: [
      { id: 'A', text: 'Address of the tail node' },
      { id: 'B', text: 'NULL' },
      { id: 'C', text: 'Address of the second node' },
      { id: 'D', text: 'Address of head itself' }
    ],
    correctAnswer: 'B',
    explanation: 'The first node (HEAD) in a linear Doubly Linked List has no predecessor, so its prev pointer must be initialized to NULL.'
  },
  {
    id: 6,
    topic: 'Pointer Splicing Order',
    question: 'When inserting newNode between node A and node B in a Singly Linked List, why is "newNode->next = A->next; A->next = newNode;" the correct order?',
    options: [
      { id: 'A', text: 'Setting A->next = newNode first would destroy the only link to node B' },
      { id: 'B', text: 'Because C processes right-to-left only' },
      { id: 'C', text: 'To ensure newNode has smaller memory address than node B' },
      { id: 'D', text: 'It does not matter; both orders work identically' }
    ],
    correctAnswer: 'A',
    explanation: 'A->next holds the memory address of node B. If you overwrite A->next = newNode first, you lose the address of node B forever, orphan-coupling the remainder of your list.'
  },
  {
    id: 7,
    topic: 'Time Complexity',
    question: 'What is the time complexity of deleting the last node in a Singly Linked List with a maintained TAIL pointer?',
    options: [
      { id: 'A', text: 'O(1)' },
      { id: 'B', text: 'O(log n)' },
      { id: 'C', text: 'O(n)' },
      { id: 'D', text: 'O(n^2)' }
    ],
    correctAnswer: 'C',
    explanation: 'Even with a direct TAIL pointer, Singly Linked List pointers are unidirectional. To delete the tail, you must update the second-to-last node->next = NULL, which requires traversing O(n) from HEAD to find!'
  },
  {
    id: 8,
    topic: 'Doubly Linked List Advantage',
    question: 'Why can a Doubly Linked List delete from the end in O(1) time when a tail pointer is kept, whereas a Singly Linked List cannot?',
    options: [
      { id: 'A', text: 'Because tail->prev immediately gives direct access to the second-to-last node' },
      { id: 'B', text: 'Because Doubly Linked Lists use less memory' },
      { id: 'C', text: 'Because Doubly Linked Lists are automatically sorted' },
      { id: 'D', text: 'Because tail->next points to head' }
    ],
    correctAnswer: 'A',
    explanation: 'In a Doubly Linked List, tail->prev provides instant O(1) access to the predecessor node, allowing it to become the new tail immediately without any traversal.'
  },
  {
    id: 9,
    topic: 'Reversal Algorithm',
    question: 'During the iterative reversal of a Singly Linked List in C, how many pointer variables are required to avoid losing list connectivity?',
    options: [
      { id: 'A', text: '1 pointer (current)' },
      { id: 'B', text: '2 pointers (prev, current)' },
      { id: 'C', text: '3 pointers (prev, current, next)' },
      { id: 'D', text: '4 pointers (head, tail, prev, next)' }
    ],
    correctAnswer: 'C',
    explanation: 'The classic C algorithm uses three pointers: "current" to identify the node being flipped, "prev" to assign the reversed link (current->next = prev), and "next" to temporarily preserve the remaining forward chain before the link is overwritten.'
  },
  {
    id: 10,
    topic: 'Practical Examination Gotcha',
    question: 'What runtime error occurs if you try to execute "current = current->next;" in C when current is already NULL?',
    options: [
      { id: 'A', text: 'Compilation Warning' },
      { id: 'B', text: 'Segmentation Fault / Null Pointer Dereference' },
      { id: 'C', text: 'Stack Overflow' },
      { id: 'D', text: 'Infinite Loop' }
    ],
    correctAnswer: 'B',
    explanation: 'Dereferencing a null pointer (accessing member "next" on address NULL / 0x0) triggers an invalid memory access violation, crashing the application with a Segmentation Fault.'
  }
];
