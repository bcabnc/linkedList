// Singly Linked List Algorithm Execution Engine
// Generates data-driven execution steps synchronized with C (Full Code) lines

export const SINGLY_CODE_SNIPPETS = {
  create: `// C (Full Code): Create Singly Linked List
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void createList(int arr[], int n) {
    if (n <= 0) return;
    head = (struct Node*)malloc(sizeof(struct Node));
    head->data = arr[0];
    head->next = NULL;
    struct Node* current = head;
    for (int i = 1; i < n; i++) {
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->data = arr[i];
        newNode->next = NULL;
        current->next = newNode;
        current = newNode;
    }
}`,

  insertAtBeginning: `// C (Full Code): Insert at Beginning
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void insertAtBeginning(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = head;
    head = newNode;
}`,

  insertAtEnd: `// C (Full Code): Insert at End
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void insertAtEnd(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = NULL;
    if (head == NULL) {
        head = newNode;
        return;
    }
    struct Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = newNode;
}`,

  insertAtPosition: `// C (Full Code): Insert at Position (1-indexed)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void insertAtPosition(int value, int pos) {
    if (pos == 1) {
        insertAtBeginning(value);
        return;
    }
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    struct Node* current = head;
    for (int i = 1; i < pos - 1 && current != NULL; i++) {
        current = current->next;
    }
    if (current == NULL) return;
    newNode->next = current->next;
    current->next = newNode;
}`,

  deleteFromBeginning: `// C (Full Code): Delete from Beginning
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void deleteFromBeginning() {
    if (head == NULL) return;
    struct Node* temp = head;
    head = head->next;
    free(temp);
}`,

  deleteFromEnd: `// C (Full Code): Delete from End
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void deleteFromEnd() {
    if (head == NULL) return;
    if (head->next == NULL) {
        free(head);
        head = NULL;
        return;
    }
    struct Node* current = head;
    struct Node* prev = NULL;
    while (current->next != NULL) {
        prev = current;
        current = current->next;
    }
    prev->next = NULL;
    free(current);
}`,

  deleteFromPosition: `// C (Full Code): Delete at Position (1-indexed)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void deleteFromPosition(int pos) {
    if (head == NULL) return;
    if (pos == 1) {
        struct Node* temp = head;
        head = head->next;
        free(temp);
        return;
    }
    struct Node* current = head;
    struct Node* prev = NULL;
    for (int i = 1; i < pos && current != NULL; i++) {
        prev = current;
        current = current->next;
    }
    if (current == NULL) return;
    prev->next = current->next;
    free(current);
}`,

  search: `// C (Full Code): Search for Value
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

int search(int target) {
    struct Node* current = head;
    int index = 1;
    while (current != NULL) {
        if (current->data == target) {
            return 1;
        }
        current = current->next;
        index++;
    }
    return 0;
}`,

  traverse: `// C (Full Code): Traverse and Print
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void traverse() {
    struct Node* current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}`,

  reverse: `// C (Full Code): Reverse Singly Linked List
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void reverse() {
    struct Node* prev = NULL;
    struct Node* current = head;
    struct Node* next = NULL;
    while (current != NULL) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    head = prev;
}`
};

// Helper to generate simulated hex memory addresses
export const getSimulatedAddress = (index) => {
  const base = 0x1000 + (index * 0x0040);
  return '0x' + base.toString(16).toUpperCase();
};

export const createInitialSinglyList = (values = [10, 20, 30, 40]) => {
  return values.map((val, idx) => ({
    id: `node-${idx}-${Date.now()}`,
    value: Number(val),
    address: getSimulatedAddress(idx),
    nextAddress: idx < values.length - 1 ? getSimulatedAddress(idx + 1) : 'NULL',
    status: 'normal'
  }));
};

export const runSinglyOperation = (operation, currentNodes, params = {}) => {
  const steps = [];
  const nodes = currentNodes.map(n => ({ ...n, status: 'normal' }));

  // Helper for initial state step
  const addInitialStep = (codeLine, codeSnippet, opName, details = {}) => {
    steps.push({
      stepNumber: 1,
      codeLine: codeLine,
      codeSnippet: codeSnippet,
      what: `Initial State: Current linked list contains ${nodes.length} nodes [${nodes.map(n => n.value).join(' -> ') || 'Empty'}]. Ready to execute ${opName}.`,
      why: `In C, before performing dynamic memory allocation or pointer updates, we observe the list state and head pointer.`,
      how: `Function called. Current HEAD points to ${nodes.length > 0 ? `node [${nodes[0].value}] at ${nodes[0].address}` : 'NULL'}. Press "Next Step" or "Auto Play" to proceed.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0]?.id || null, TAIL: nodes[nodes.length - 1]?.id || null },
      variables: { head: nodes[0]?.address || 'NULL', ...details }
    });
  };

  if (operation === 'create') {
    const values = params.values || [10, 20, 30, 40];
    const generatedNodes = [];

    // Step 1: Initial state
    steps.push({
      stepNumber: 1,
      codeLine: 16,
      codeSnippet: `void createList(int arr[], int n = ${values.length})`,
      what: `Initial State: Ready to create linked list with ${values.length} elements: [${values.join(', ')}] in C.`,
      why: `Function createList() is called. Global head is currently NULL.`,
      how: `Validate input array size and begin heap allocations with malloc().`,
      nodes: [],
      pointers: { HEAD: null, CURRENT: null },
      variables: { n: values.length, head: 'NULL' },
      complexity: { time: `O(${values.length})`, space: `O(${values.length})` }
    });

    // Step 2: Validate size
    steps.push({
      stepNumber: 2,
      codeLine: 17,
      codeSnippet: `if (n <= 0) return;`,
      what: `Checked array size (n = ${values.length}). Condition n <= 0 is FALSE, proceeding to allocate nodes.`,
      why: `Defensive programming in C: Avoid allocating memory if input size is non-positive.`,
      how: `Evaluate (${values.length} <= 0) -> FALSE.`,
      nodes: [],
      pointers: { HEAD: null },
      variables: { n: values.length }
    });

    for (let i = 0; i < values.length; i++) {
      const addr = getSimulatedAddress(i);
      const newNode = {
        id: `node-${i}-${Date.now()}`,
        value: Number(values[i]),
        address: addr,
        nextAddress: 'NULL',
        status: 'new'
      };

      if (i === 0) {
        generatedNodes.push(newNode);
        steps.push({
          stepNumber: steps.length + 1,
          codeLine: 18,
          codeSnippet: `head = (struct Node*)malloc(sizeof(struct Node));`,
          what: `Allocated memory for first node [${values[i]}] at address ${addr} using malloc().`,
          why: `In C, dynamic memory for struct Node is reserved on the heap.`,
          how: `Set head->data = ${values[0]} and head->next = NULL.`,
          nodes: JSON.parse(JSON.stringify(generatedNodes)),
          pointers: { HEAD: newNode.id, CURRENT: newNode.id },
          variables: { head: addr, 'head->data': values[0], 'head->next': 'NULL' }
        });
      } else {
        generatedNodes[i - 1].nextAddress = addr;
        generatedNodes[i - 1].status = 'normal';
        generatedNodes.push(newNode);

        steps.push({
          stepNumber: steps.length + 1,
          codeLine: 23,
          codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
          what: `Allocated newNode [${values[i]}] via malloc() at ${addr} and linked current->next to it.`,
          why: `Connect predecessor node to new node via next pointer in C.`,
          how: `Set previous node's next pointer to ${addr}.`,
          nodes: JSON.parse(JSON.stringify(generatedNodes)),
          pointers: { HEAD: generatedNodes[0].id, CURRENT: generatedNodes[i - 1].id, 'NEW NODE': newNode.id },
          variables: { 'current->data': generatedNodes[i - 1].value, 'newNode->address': addr }
        });

        steps.push({
          stepNumber: steps.length + 1,
          codeLine: 27,
          codeSnippet: `current = newNode;`,
          what: `Advanced CURRENT pointer forward to newly allocated node [${values[i]}].`,
          why: `Prepares CURRENT to attach subsequent node in the next iteration.`,
          how: `Update current = ${addr}.`,
          nodes: JSON.parse(JSON.stringify(generatedNodes)),
          pointers: { HEAD: generatedNodes[0].id, CURRENT: newNode.id, TAIL: newNode.id },
          variables: { current: addr, 'current->data': values[i] }
        });
      }
    }

    const finalNodes = generatedNodes.map(n => ({ ...n, status: 'normal' }));
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 29,
      codeSnippet: `}`,
      what: `Linked list creation complete with ${values.length} nodes!`,
      why: `All nodes are connected in heap memory starting from global head pointer (${generatedNodes[0].address}).`,
      how: `createList() execution completed successfully.`,
      nodes: finalNodes,
      pointers: { HEAD: finalNodes[0].id, TAIL: finalNodes[finalNodes.length - 1].id },
      variables: { head: finalNodes[0].address, count: values.length },
      isCompleted: true,
      complexity: { time: `O(n)`, space: `O(n)` }
    });

    return steps;
  }

  if (operation === 'insertAtBeginning') {
    const val = Number(params.value ?? 5);
    const newAddr = '0x0FC0';
    const newNode = {
      id: `new-${Date.now()}`,
      value: val,
      address: newAddr,
      nextAddress: 'NULL',
      status: 'new'
    };

    // Step 1: Initial state before any change
    addInitialStep(42, `void insertAtBeginning(int value = ${val})`, 'insertAtBeginning', { value: val });

    // Step 2: Malloc new node
    steps.push({
      stepNumber: 2,
      codeLine: 43,
      codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
      what: `Allocated memory block on heap for newNode [${val}] at address ${newAddr} using malloc().`,
      why: `In C, dynamic node creation reserves heap memory matching sizeof(struct Node).`,
      how: `Allocate heap memory, set newNode->data = ${val}, newNode->next = NULL.`,
      nodes: [newNode, ...nodes],
      pointers: { 'NEW NODE': newNode.id, HEAD: nodes.length > 0 ? nodes[0].id : null },
      variables: { value: val, newNode: newAddr, head: nodes.length > 0 ? nodes[0].address : 'NULL' },
      complexity: { time: 'O(1)', space: 'O(1)' }
    });

    // Step 3: Link newNode->next = head
    const step3Nodes = JSON.parse(JSON.stringify([newNode, ...nodes]));
    step3Nodes[0].nextAddress = nodes.length > 0 ? nodes[0].address : 'NULL';
    steps.push({
      stepNumber: 3,
      codeLine: 45,
      codeSnippet: `newNode->next = head;`,
      what: `Connected newNode->next to current head (${nodes.length > 0 ? nodes[0].value : 'NULL'}).`,
      why: `Must link to existing first node before updating head pointer to prevent losing list memory!`,
      how: `Assign newNode->next = ${nodes.length > 0 ? nodes[0].address : 'NULL'}.`,
      nodes: step3Nodes,
      pointers: { 'NEW NODE': newNode.id, HEAD: nodes.length > 0 ? nodes[0].id : null },
      variables: { 'newNode->next': step3Nodes[0].nextAddress, head: nodes.length > 0 ? nodes[0].address : 'NULL' }
    });

    // Step 4: Shift HEAD = newNode
    const step4Nodes = JSON.parse(JSON.stringify(step3Nodes));
    step4Nodes[0].status = 'normal';
    steps.push({
      stepNumber: 4,
      codeLine: 46,
      codeSnippet: `head = newNode;`,
      what: `Updated HEAD pointer to point to newNode. It is now the official first node!`,
      why: `Head pointer marks the starting entry point of the linked list.`,
      how: `Assign head = ${newAddr}. Insertion at beginning complete!`,
      nodes: step4Nodes,
      pointers: { HEAD: newNode.id, TAIL: step4Nodes[step4Nodes.length - 1].id },
      variables: { head: newAddr, 'head->data': val },
      isCompleted: true,
      complexity: { time: 'O(1)', space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'insertAtEnd') {
    const val = Number(params.value ?? 50);
    const newAddr = getSimulatedAddress(nodes.length);
    const newNode = {
      id: `new-${Date.now()}`,
      value: val,
      address: newAddr,
      nextAddress: 'NULL',
      status: 'new'
    };

    // Step 1: Initial state
    addInitialStep(60, `void insertAtEnd(int value = ${val})`, 'insertAtEnd', { value: val });

    if (nodes.length === 0) {
      steps.push({
        stepNumber: 2,
        codeLine: 61,
        codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
        what: `Allocated new node with value ${val} at address ${newAddr}. List was empty.`,
        why: `First node becomes both HEAD and TAIL.`,
        how: `Assign head = newNode.`,
        nodes: [newNode],
        pointers: { HEAD: newNode.id, TAIL: newNode.id },
        variables: { head: newAddr, value: val },
        isCompleted: true,
        complexity: { time: 'O(1)', space: 'O(1)' }
      });
      return steps;
    }

    // Step 2: Create node
    steps.push({
      stepNumber: 2,
      codeLine: 61,
      codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
      what: `Allocated new node with value ${val} at address ${newAddr} using malloc().`,
      why: `Prepare node memory before appending to end of list.`,
      how: `newNode->data = ${val}, newNode->next = NULL.`,
      nodes: [...nodes, newNode],
      pointers: { HEAD: nodes[0].id, 'NEW NODE': newNode.id },
      variables: { value: val, newNode: newAddr, head: nodes[0].address }
    });

    // Step 3: Initialize current = head
    steps.push({
      stepNumber: 3,
      codeLine: 68,
      codeSnippet: `struct Node* current = head;`,
      what: `Set CURRENT pointer to HEAD (${nodes[0].value}). Ready to traverse to find last node.`,
      why: `In C singly linked list, we must traverse from HEAD until current->next == NULL.`,
      how: `Assign current = ${nodes[0].address}.`,
      nodes: [...nodes, newNode],
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[0].id, 'NEW NODE': newNode.id },
      variables: { current: nodes[0].address, 'current->data': nodes[0].value }
    });

    // Traversing through nodes
    for (let i = 0; i < nodes.length - 1; i++) {
      const stepNodes = nodes.map((n, idx) => ({
        ...n,
        status: idx === i + 1 ? 'active' : 'normal'
      }));
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 70,
        codeSnippet: `current = current->next;`,
        what: `CURRENT traversed forward to node with data ${nodes[i + 1].value}.`,
        why: `Keep moving while current->next != NULL.`,
        how: `current = ${nodes[i + 1].address}.`,
        nodes: [...stepNodes, newNode],
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i + 1].id, 'NEW NODE': newNode.id },
        variables: { current: nodes[i + 1].address, 'current->data': nodes[i + 1].value }
      });
    }

    // Found last node
    const lastNodeIdx = nodes.length - 1;
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 69,
      codeSnippet: `while (current->next != NULL)`,
      what: `CURRENT is at node [${nodes[lastNodeIdx].value}] where next == NULL. Last node located!`,
      why: `Loop condition evaluates false when current->next is NULL.`,
      how: `Condition evaluated: false. Ready to link new node.`,
      nodes: [...nodes, newNode],
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[lastNodeIdx].id, 'NEW NODE': newNode.id },
      variables: { current: nodes[lastNodeIdx].address, 'current->next': 'NULL' }
    });

    // Link last node to newNode
    const finalNodes = JSON.parse(JSON.stringify(nodes));
    finalNodes[lastNodeIdx].nextAddress = newAddr;
    newNode.status = 'normal';
    finalNodes.push(newNode);

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 72,
      codeSnippet: `current->next = newNode;`,
      what: `Linked last node [${finalNodes[lastNodeIdx].value}] to newNode [${val}].`,
      why: `Attaches new node at the very end of the singly linked list.`,
      how: `Assign current->next = ${newAddr}. Insertion at end complete!`,
      nodes: finalNodes,
      pointers: { HEAD: finalNodes[0].id, TAIL: newNode.id },
      variables: { 'lastNode->next': newAddr, newNode: newAddr },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'insertAtPosition') {
    const pos = Math.max(1, Math.min(Number(params.position ?? 3), nodes.length + 1));
    const val = Number(params.value ?? 25);

    // Step 1: Initial state
    addInitialStep(86, `void insertAtPosition(int value = ${val}, int pos = ${pos})`, 'insertAtPosition', { value: val, pos: pos });

    if (pos === 1) {
      return runSinglyOperation('insertAtBeginning', nodes, { value: val });
    }

    const newAddr = '0x1AA0';
    const newNode = {
      id: `new-${Date.now()}`,
      value: val,
      address: newAddr,
      nextAddress: 'NULL',
      status: 'new'
    };

    // Step 2: Malloc new node
    steps.push({
      stepNumber: 2,
      codeLine: 91,
      codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
      what: `Allocated new node with value ${val} at memory address ${newAddr} using malloc().`,
      why: `Reserve heap memory for node to insert at position ${pos}.`,
      how: `newNode->data = ${val}, newNode->next = NULL.`,
      nodes: [...nodes, newNode],
      pointers: { HEAD: nodes[0].id, 'NEW NODE': newNode.id },
      variables: { value: val, pos: pos, newNode: newAddr }
    });

    // Step 3: Initialize current = head
    steps.push({
      stepNumber: 3,
      codeLine: 93,
      codeSnippet: `struct Node* current = head;`,
      what: `CURRENT initialized at HEAD (${nodes[0].value}). Traversing to predecessor at position ${pos - 1}.`,
      why: `To insert after a node, we must reach index (pos - 1).`,
      how: `Assign current = ${nodes[0].address}.`,
      nodes: [...nodes, newNode],
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[0].id, 'NEW NODE': newNode.id },
      variables: { current: nodes[0].address, targetIndex: pos - 1 }
    });

    // Traverse to pos - 1
    for (let i = 0; i < pos - 2; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 95,
        codeSnippet: `current = current->next;`,
        what: `Traversing: CURRENT moved to node [${nodes[i + 1].value}] (index ${i + 2}).`,
        why: `Moving toward node immediately before insertion position ${pos}.`,
        how: `Advance: current = ${nodes[i + 1].address}.`,
        nodes: [...nodes, newNode],
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i + 1].id, 'NEW NODE': newNode.id },
        variables: { current: nodes[i + 1].address, index: i + 2 }
      });
    }

    const prevNodeIndex = pos - 2;
    const nextNodeIndex = pos - 1;

    // Connect newNode->next to current->next
    const splicedNodes = [...nodes];
    newNode.nextAddress = splicedNodes[nextNodeIndex].address;
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 98,
      codeSnippet: `newNode->next = current->next;`,
      what: `CRITICAL STEP: Linked newNode->next to node [${splicedNodes[nextNodeIndex].value}] (${splicedNodes[nextNodeIndex].address}).`,
      why: `Always link newNode to successor FIRST. If we changed current->next first, we'd lose the rest of the list!`,
      how: `Assign newNode->next = ${splicedNodes[nextNodeIndex].address}.`,
      nodes: [...splicedNodes, newNode],
      pointers: { HEAD: splicedNodes[0].id, CURRENT: splicedNodes[prevNodeIndex].id, 'NEW NODE': newNode.id, NEXT: splicedNodes[nextNodeIndex].id },
      variables: { 'newNode->next': newNode.nextAddress, 'current->value': splicedNodes[prevNodeIndex].value }
    });

    // Link current->next to newNode
    splicedNodes[prevNodeIndex].nextAddress = newAddr;
    splicedNodes.splice(pos - 1, 0, { ...newNode, status: 'normal' });

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 99,
      codeSnippet: `current->next = newNode;`,
      what: `Linked node [${splicedNodes[prevNodeIndex].value}]->next to newNode [${val}]. Insertion complete!`,
      why: `Directs predecessor's next pointer to our newly inserted node.`,
      how: `Assign current->next = ${newAddr}.`,
      nodes: splicedNodes,
      pointers: { HEAD: splicedNodes[0].id, TAIL: splicedNodes[splicedNodes.length - 1].id },
      variables: { 'current->next': newAddr, 'newNode->data': val },
      isCompleted: true,
      complexity: { time: `O(pos) = O(${pos})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'deleteFromBeginning') {
    // Step 1: Initial state
    addInitialStep(113, `void deleteFromBeginning()`, 'deleteFromBeginning');

    if (nodes.length === 0) {
      steps.push({
        stepNumber: 2,
        codeLine: 114,
        codeSnippet: `if (head == NULL) return;`,
        what: `Cannot delete: The linked list is empty (Underflow condition in C).`,
        why: `Attempting to delete from an empty list would cause null pointer dereference.`,
        how: `Check head == NULL: TRUE, return safely.`,
        nodes: [],
        pointers: { HEAD: null },
        variables: { head: 'NULL' },
        isCompleted: true,
        complexity: { time: 'O(1)', space: 'O(1)' }
      });
      return steps;
    }

    const tempNode = { ...nodes[0], status: 'deleted' };

    // Step 2: Check head == NULL
    steps.push({
      stepNumber: 2,
      codeLine: 114,
      codeSnippet: `if (head == NULL) return;`,
      what: `Checked if head == NULL. List is not empty (${nodes.length} nodes present). Proceeding.`,
      why: `Verifies list underflow condition before dereferencing head.`,
      how: `head != NULL, proceed to next line.`,
      nodes: nodes,
      pointers: { HEAD: nodes[0].id },
      variables: { head: nodes[0].address }
    });

    // Step 3: Save temp = head
    steps.push({
      stepNumber: 3,
      codeLine: 115,
      codeSnippet: `struct Node* temp = head;`,
      what: `Saved pointer to first node [${tempNode.value}] in temporary pointer 'temp'.`,
      why: `In C, we need this address to call free(temp) later and prevent memory leaks!`,
      how: `Assign temp = ${tempNode.address}.`,
      nodes: [tempNode, ...nodes.slice(1)],
      pointers: { HEAD: tempNode.id, TEMP: tempNode.id },
      variables: { head: tempNode.address, temp: tempNode.address, 'temp->data': tempNode.value }
    });

    // Step 4: Move head = head->next
    const remainingNodes = nodes.slice(1).map(n => ({ ...n, status: 'normal' }));
    steps.push({
      stepNumber: 4,
      codeLine: 116,
      codeSnippet: `head = head->next;`,
      what: `Shifted HEAD pointer forward to next node (${remainingNodes.length > 0 ? remainingNodes[0].value : 'NULL'}).`,
      why: `The second node becomes the new first node of the list.`,
      how: `Assign head = ${tempNode.nextAddress}.`,
      nodes: [tempNode, ...remainingNodes],
      pointers: { TEMP: tempNode.id, HEAD: remainingNodes.length > 0 ? remainingNodes[0].id : null },
      variables: { head: tempNode.nextAddress, temp: tempNode.address }
    });

    // Step 5: free(temp)
    steps.push({
      stepNumber: 5,
      codeLine: 117,
      codeSnippet: `free(temp);`,
      what: `Called free(temp) to deallocate memory of node [${tempNode.value}] at address ${tempNode.address}.`,
      why: `In standard C, every malloc() must have a matching free() to prevent memory leaks!`,
      how: `C runtime frees the memory block. First node is removed from list.`,
      nodes: remainingNodes,
      pointers: { HEAD: remainingNodes.length > 0 ? remainingNodes[0].id : null, TAIL: remainingNodes.length > 0 ? remainingNodes[remainingNodes.length - 1].id : null },
      variables: { head: remainingNodes.length > 0 ? remainingNodes[0].address : 'NULL', temp: '0x0 (freed)' },
      isCompleted: true,
      complexity: { time: 'O(1)', space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'deleteFromEnd') {
    // Step 1: Initial state
    addInitialStep(131, `void deleteFromEnd()`, 'deleteFromEnd');

    if (nodes.length <= 1) {
      return runSinglyOperation('deleteFromBeginning', nodes);
    }

    // Step 2: Initialize current = head, prev = NULL
    steps.push({
      stepNumber: 2,
      codeLine: 138,
      codeSnippet: `struct Node* current = head; struct Node* prev = NULL;`,
      what: `Initialized CURRENT at HEAD (${nodes[0].value}) and PREV at NULL.`,
      why: `In C, PREV tracks second-to-last node so we can set its next pointer to NULL.`,
      how: `current = ${nodes[0].address}, prev = NULL.`,
      nodes: nodes,
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[0].id, PREV: null },
      variables: { current: nodes[0].address, prev: 'NULL' }
    });

    // Traversal steps
    for (let i = 0; i < nodes.length - 1; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 141,
        codeSnippet: `prev = current; current = current->next;`,
        what: `Advanced pointers: PREV moves to node [${nodes[i].value}], CURRENT moves to node [${nodes[i + 1].value}].`,
        why: `Traverse toward last node of list.`,
        how: `prev = ${nodes[i].address}, current = ${nodes[i + 1].address}.`,
        nodes: nodes.map((n, idx) => ({ ...n, status: idx === i + 1 ? 'active' : 'normal' })),
        pointers: { HEAD: nodes[0].id, PREV: nodes[i].id, CURRENT: nodes[i + 1].id },
        variables: { prev: nodes[i].address, current: nodes[i + 1].address }
      });
    }

    const lastIdx = nodes.length - 1;
    const secondLastIdx = nodes.length - 2;

    // Step: Disconnect last node (prev->next = NULL)
    const updatedNodes = JSON.parse(JSON.stringify(nodes));
    updatedNodes[secondLastIdx].nextAddress = 'NULL';
    updatedNodes[lastIdx].status = 'deleted';

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 144,
      codeSnippet: `prev->next = NULL;`,
      what: `Set node [${updatedNodes[secondLastIdx].value}]->next = NULL. Disconnected last node!`,
      why: `The second-to-last node now becomes the new TAIL of the list.`,
      how: `prev->next = NULL.`,
      nodes: updatedNodes,
      pointers: { HEAD: updatedNodes[0].id, PREV: updatedNodes[secondLastIdx].id, CURRENT: updatedNodes[lastIdx].id },
      variables: { 'prev->next': 'NULL', current: updatedNodes[lastIdx].address }
    });

    // Step: free(current)
    const finalNodes = updatedNodes.slice(0, lastIdx).map(n => ({ ...n, status: 'normal' }));
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 145,
      codeSnippet: `free(current);`,
      what: `Called free(current) to deallocate memory of node [${updatedNodes[lastIdx].value}] at ${updatedNodes[lastIdx].address}.`,
      why: `Free heap memory in C and prevent memory leak.`,
      how: `free(current). End deletion complete!`,
      nodes: finalNodes,
      pointers: { HEAD: finalNodes[0].id, TAIL: finalNodes[finalNodes.length - 1].id },
      variables: { current: 'freed', tail: finalNodes[finalNodes.length - 1].address },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'deleteFromPosition') {
    const pos = Math.max(1, Math.min(Number(params.position ?? 2), nodes.length));

    // Step 1: Initial state
    addInitialStep(159, `void deleteFromPosition(int pos = ${pos})`, 'deleteFromPosition', { pos: pos });

    if (pos === 1) return runSinglyOperation('deleteFromBeginning', nodes);
    if (pos === nodes.length) return runSinglyOperation('deleteFromEnd', nodes);

    const delIdx = pos - 1;
    const prevIdx = pos - 2;

    // Step 2: Setup
    steps.push({
      stepNumber: 2,
      codeLine: 167,
      codeSnippet: `struct Node* current = head; struct Node* prev = NULL;`,
      what: `Initialized traversal at HEAD to delete node at position ${pos} (value: ${nodes[delIdx].value}).`,
      why: `Locate node at position ${pos} and predecessor at position ${pos - 1}.`,
      how: `current = ${nodes[0].address}, prev = NULL.`,
      nodes: nodes,
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[0].id, PREV: null },
      variables: { pos: pos, current: nodes[0].address }
    });

    // Traverse
    for (let i = 0; i < delIdx; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 170,
        codeSnippet: `prev = current; current = current->next;`,
        what: `Traversing: PREV moves to [${nodes[i].value}], CURRENT moves to [${nodes[i + 1].value}].`,
        why: `Reach target node at position ${pos}.`,
        how: `Advance pointers.`,
        nodes: nodes.map((n, idx) => ({ ...n, status: idx === i + 1 ? (idx === delIdx ? 'deleted' : 'active') : 'normal' })),
        pointers: { HEAD: nodes[0].id, PREV: nodes[i].id, CURRENT: nodes[i + 1].id },
        variables: { prev: nodes[i].address, current: nodes[i + 1].address }
      });
    }

    // Bypass node
    const bypassedNodes = JSON.parse(JSON.stringify(nodes));
    bypassedNodes[prevIdx].nextAddress = nodes[delIdx].nextAddress;
    bypassedNodes[delIdx].status = 'deleted';

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 174,
      codeSnippet: `prev->next = current->next;`,
      what: `Bypassed node [${nodes[delIdx].value}]: Linked node [${nodes[prevIdx].value}] directly to node [${nodes[delIdx + 1].value}].`,
      why: `Unlinks target node while preserving remaining list chain.`,
      how: `prev->next = current->next.`,
      nodes: bypassedNodes,
      pointers: { HEAD: bypassedNodes[0].id, PREV: bypassedNodes[prevIdx].id, CURRENT: bypassedNodes[delIdx].id },
      variables: { 'prev->next': nodes[delIdx].nextAddress, 'deletedNode': nodes[delIdx].address }
    });

    // free(current)
    const finalNodes = bypassedNodes.filter((_, idx) => idx !== delIdx).map(n => ({ ...n, status: 'normal' }));
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 175,
      codeSnippet: `free(current);`,
      what: `Called free(current) to deallocate memory of node [${nodes[delIdx].value}] at ${nodes[delIdx].address}.`,
      why: `Free dynamically allocated memory in C.`,
      how: `free(current). Node deleted successfully.`,
      nodes: finalNodes,
      pointers: { HEAD: finalNodes[0].id, TAIL: finalNodes[finalNodes.length - 1].id },
      variables: { status: 'DELETED', head: finalNodes[0].address },
      isCompleted: true,
      complexity: { time: `O(pos) = O(${pos})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'search') {
    const target = Number(params.value ?? 30);
    let foundIndex = -1;

    // Step 1: Initial state
    addInitialStep(189, `int search(int target = ${target})`, 'search', { target: target });

    // Step 2: Start at head
    steps.push({
      stepNumber: 2,
      codeLine: 190,
      codeSnippet: `struct Node* current = head; int index = 1;`,
      what: `Initiating linear search for value ${target} in C. CURRENT pointing to HEAD (${nodes[0]?.value ?? 'NULL'}).`,
      why: `In C linked list, sequential scan from HEAD is required since array index access is not possible.`,
      how: `current = ${nodes[0]?.address ?? 'NULL'}, index = 1.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0]?.id, CURRENT: nodes[0]?.id },
      variables: { target: target, current: nodes[0]?.address, index: 1 }
    });

    for (let i = 0; i < nodes.length; i++) {
      const isTarget = nodes[i].value === target;
      const stepNodes = nodes.map((n, idx) => ({
        ...n,
        status: idx === i ? (isTarget ? 'found' : 'active') : 'normal'
      }));

      // Compare
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 193,
        codeSnippet: `if (current->data == target)`,
        what: `Checking node at position ${i + 1}: Is data (${nodes[i].value}) == target (${target})? ${isTarget ? 'YES!' : 'NO.'}`,
        why: `Compare current node data against search key.`,
        how: `Evaluate (${nodes[i].value} == ${target}) -> ${isTarget ? 'TRUE' : 'FALSE'}.`,
        nodes: stepNodes,
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
        variables: { 'current->data': nodes[i].value, target: target, index: i + 1 }
      });

      if (isTarget) {
        foundIndex = i + 1;
        steps.push({
          stepNumber: steps.length + 1,
          codeLine: 194,
          codeSnippet: `return 1;`,
          what: `SUCCESS! Value ${target} found at position ${foundIndex} in C program (Address: ${nodes[i].address}).`,
          why: `Target found, return 1 (success in C).`,
          how: `Return 1 to caller. Search complete!`,
          nodes: stepNodes,
          pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
          variables: { result: 'FOUND', position: foundIndex, address: nodes[i].address },
          isCompleted: true,
          complexity: { time: `O(${foundIndex})`, space: 'O(1)' }
        });
        break;
      }

      if (i < nodes.length - 1) {
        steps.push({
          stepNumber: steps.length + 1,
          codeLine: 196,
          codeSnippet: `current = current->next; index++;`,
          what: `Value ${nodes[i].value} did not match. Moving CURRENT to next node [${nodes[i + 1].value}].`,
          why: `Continue sequential scan down the linked list.`,
          how: `current = ${nodes[i].nextAddress}.`,
          nodes: stepNodes,
          pointers: { HEAD: nodes[0].id, CURRENT: nodes[i + 1].id },
          variables: { current: nodes[i + 1].address, index: i + 2 }
        });
      }
    }

    if (foundIndex === -1) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 199,
        codeSnippet: `return 0;`,
        what: `Reached NULL. Target value ${target} was NOT found in the linked list.`,
        why: `Traversed all ${nodes.length} nodes without finding a match.`,
        how: `current == NULL, return 0 (not found in C).`,
        nodes: nodes.map(n => ({ ...n, status: 'normal' })),
        pointers: { HEAD: nodes[0].id, CURRENT: null },
        variables: { result: 'NOT_FOUND', target: target },
        isCompleted: true,
        complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
      });
    }

    return steps;
  }

  if (operation === 'traverse') {
    // Step 1: Initial state
    addInitialStep(213, `void traverse()`, 'traverse');

    steps.push({
      stepNumber: 2,
      codeLine: 214,
      codeSnippet: `struct Node* current = head;`,
      what: `Starting forward traversal at HEAD. CURRENT initialized to ${nodes[0]?.address}.`,
      why: `To access or print elements in a C linked list, visit each node sequentially.`,
      how: `Assign current = head.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0]?.id, CURRENT: nodes[0]?.id },
      variables: { current: nodes[0]?.address, printed: '' }
    });

    const printedArr = [];
    for (let i = 0; i < nodes.length; i++) {
      printedArr.push(nodes[i].value);
      const stepNodes = nodes.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' }));

      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 216,
        codeSnippet: `printf("%d -> ", current->data);`,
        what: `Printing Node [${nodes[i].value}] using printf(). Output: ${printedArr.join(' -> ')}`,
        why: `Process node data at index ${i + 1}.`,
        how: `Read current->data (${nodes[i].value}) and output via printf().`,
        nodes: stepNodes,
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
        variables: { 'current->data': nodes[i].value, current: nodes[i].address, printed: printedArr.join(' -> ') }
      });

      if (i < nodes.length - 1) {
        steps.push({
          stepNumber: steps.length + 1,
          codeLine: 217,
          codeSnippet: `current = current->next;`,
          what: `Advancing CURRENT pointer to next node (${nodes[i + 1].value}) at ${nodes[i].nextAddress}.`,
          why: `Follow the next pointer link.`,
          how: `current = ${nodes[i].nextAddress}.`,
          nodes: stepNodes,
          pointers: { HEAD: nodes[0].id, CURRENT: nodes[i + 1].id },
          variables: { current: nodes[i + 1].address }
        });
      }
    }

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 219,
      codeSnippet: `printf("NULL\\n");`,
      what: `Reached NULL! Traversal complete. Full printed sequence: ${printedArr.join(' -> ')} -> NULL.`,
      why: `Singly linked list is terminated by NULL at the end.`,
      how: `current == NULL, loop finishes.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0].id, CURRENT: null, TAIL: nodes[nodes.length - 1].id },
      variables: { output: `${printedArr.join(' -> ')} -> NULL` },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'reverse') {
    // Step 1: Initial state
    addInitialStep(233, `void reverse()`, 'reverse');

    // Step 2: Initialize 3 pointers
    steps.push({
      stepNumber: 2,
      codeLine: 234,
      codeSnippet: `struct Node* prev = NULL; struct Node* current = head; struct Node* next = NULL;`,
      what: `Initialized 3 pointer tracking variables in C: prev = NULL, current = head (${nodes[0].value}), next = NULL.`,
      why: `Reversing a singly linked list in-place requires 3 pointers to flip links without losing downstream nodes.`,
      how: `Declare pointer variables on the stack.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[0].id, PREV: null, NEXT: null },
      variables: { prev: 'NULL', current: nodes[0].address, next: 'NULL' }
    });

    let currentNodesState = JSON.parse(JSON.stringify(nodes));

    for (let i = 0; i < nodes.length; i++) {
      const currId = nodes[i].id;
      const nextId = i < nodes.length - 1 ? nodes[i + 1].id : null;
      const prevId = i > 0 ? nodes[i - 1].id : null;

      // next = current->next
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 238,
        codeSnippet: `next = current->next;`,
        what: `Stored next node pointer in 'next' (${nextId ? nodes[i + 1].value : 'NULL'}).`,
        why: `CRUCIAL: If we flip current->next first, we lose our pointer to the rest of the list!`,
        how: `Assign next = ${currentNodesState[i].nextAddress}.`,
        nodes: currentNodesState.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' })),
        pointers: { HEAD: nodes[0].id, CURRENT: currId, PREV: prevId, NEXT: nextId },
        variables: { next: nextId ? nodes[i + 1].address : 'NULL', current: nodes[i].address, prev: prevId ? nodes[i - 1].address : 'NULL' }
      });

      // current->next = prev (the link reversal!)
      currentNodesState[i].nextAddress = prevId ? nodes[i - 1].address : 'NULL';
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 239,
        codeSnippet: `current->next = prev;`,
        what: `POINTER REVERSED! Node [${nodes[i].value}]'s next pointer now points backward to ${prevId ? `Node [${nodes[i - 1].value}]` : 'NULL'}.`,
        why: `Flips the arrow direction for this node.`,
        how: `current->next = ${prevId ? nodes[i - 1].address : 'NULL'}.`,
        nodes: JSON.parse(JSON.stringify(currentNodesState)),
        pointers: { HEAD: nodes[0].id, CURRENT: currId, PREV: prevId, NEXT: nextId },
        variables: { 'current->next': currentNodesState[i].nextAddress, current: nodes[i].address }
      });

      // prev = current
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 240,
        codeSnippet: `prev = current;`,
        what: `Shifted 'prev' forward to CURRENT ([${nodes[i].value}]).`,
        why: `'prev' must stay one step behind 'current' for next iteration.`,
        how: `prev = ${nodes[i].address}.`,
        nodes: JSON.parse(JSON.stringify(currentNodesState)),
        pointers: { HEAD: nodes[0].id, CURRENT: currId, PREV: currId, NEXT: nextId },
        variables: { prev: nodes[i].address, current: nodes[i].address }
      });

      // current = next
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 241,
        codeSnippet: `current = next;`,
        what: `Shifted 'current' forward to 'next' (${nextId ? `[${nodes[i + 1].value}]` : 'NULL'}).`,
        why: `Ready to reverse the next node in the list.`,
        how: `current = ${nextId ? nodes[i + 1].address : 'NULL'}.`,
        nodes: JSON.parse(JSON.stringify(currentNodesState)),
        pointers: { HEAD: nodes[0].id, CURRENT: nextId, PREV: currId, NEXT: nextId },
        variables: { current: nextId ? nodes[i + 1].address : 'NULL', prev: nodes[i].address }
      });
    }

    // Final Step: head = prev
    const reversedNodes = [...currentNodesState].reverse().map(n => ({ ...n, status: 'normal' }));
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 243,
      codeSnippet: `head = prev;`,
      what: `Reversal complete! Updated HEAD to 'prev' (Node [${reversedNodes[0].value}] at ${reversedNodes[0].address}).`,
      why: `The former last node is now the new first node of the reversed linked list in C.`,
      how: `head = ${reversedNodes[0].address}. The entire list is inverted!`,
      nodes: reversedNodes,
      pointers: { HEAD: reversedNodes[0].id, TAIL: reversedNodes[reversedNodes.length - 1].id },
      variables: { head: reversedNodes[0].address, newFirst: reversedNodes[0].value },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1) in-place' }
    });

    return steps;
  }

  // Fallback
  return [{
    stepNumber: 1,
    codeLine: 1,
    codeSnippet: '// C: Ready',
    what: 'List ready for operations',
    why: 'Select an operation to execute',
    how: 'Click Run or Step',
    nodes: nodes,
    pointers: { HEAD: nodes[0]?.id, TAIL: nodes[nodes.length - 1]?.id },
    variables: {}
  }];
};
