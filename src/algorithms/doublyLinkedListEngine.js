// Doubly Linked List Algorithm Execution Engine
// Generates data-driven execution steps synchronized with C (Full Code) lines
// Distinct feature: Each node has [PREV | DATA | NEXT], enabling bidirectional traversal in C!

import { getSimulatedAddress } from './singlyLinkedListEngine.js';

export const DOUBLY_CODE_SNIPPETS = {
  create: `// C (Full Code): Create Doubly Linked List
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

struct Node* head = NULL;

void createDoublyList(int arr[], int n) {
    if (n <= 0) return;
    head = (struct Node*)malloc(sizeof(struct Node));
    head->data = arr[0];
    head->prev = NULL;
    head->next = NULL;
    struct Node* current = head;
    for (int i = 1; i < n; i++) {
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->data = arr[i];
        newNode->next = NULL;
        newNode->prev = current;
        current->next = newNode;
        current = newNode;
    }
}`,

  insertAtBeginning: `// C (Full Code): Insert at Beginning (Doubly LL)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

struct Node* head = NULL;

void insertAtBeginning(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = head;
    newNode->prev = NULL;
    if (head != NULL) {
        head->prev = newNode;
    }
    head = newNode;
}`,

  insertAtEnd: `// C (Full Code): Insert at End (Doubly LL)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

struct Node* head = NULL;

void insertAtEnd(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = NULL;
    if (head == NULL) {
        newNode->prev = NULL;
        head = newNode;
        return;
    }
    struct Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = newNode;
    newNode->prev = current;
}`,

  insertAtPosition: `// C (Full Code): Insert at Position (Doubly LL)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
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
    newNode->prev = current;
    if (current->next != NULL) {
        current->next->prev = newNode;
    }
    current->next = newNode;
}`,

  deleteFromBeginning: `// C (Full Code): Delete from Beginning (Doubly LL)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

struct Node* head = NULL;

void deleteFromBeginning() {
    if (head == NULL) return;
    struct Node* temp = head;
    head = head->next;
    if (head != NULL) {
        head->prev = NULL;
    }
    free(temp);
}`,

  deleteFromEnd: `// C (Full Code): Delete from End (Doubly LL)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
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
    while (current->next != NULL) {
        current = current->next;
    }
    current->prev->next = NULL;
    free(current);
}`,

  deleteFromPosition: `// C (Full Code): Delete at Position (Doubly LL)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

struct Node* head = NULL;

void deleteFromPosition(int pos) {
    if (head == NULL) return;
    if (pos == 1) {
        deleteFromBeginning();
        return;
    }
    struct Node* current = head;
    for (int i = 1; i < pos && current != NULL; i++) {
        current = current->next;
    }
    if (current == NULL) return;
    current->prev->next = current->next;
    if (current->next != NULL) {
        current->next->prev = current->prev;
    }
    free(current);
}`,

  forwardTraversal: `// C (Full Code): Forward Traversal (HEAD -> TAIL)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

struct Node* head = NULL;

void forwardTraversal() {
    struct Node* current = head;
    printf("Forward: NULL <-> ");
    while (current != NULL) {
        printf("%d <-> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}`,

  backwardTraversal: `// C (Full Code): Backward Traversal (TAIL -> HEAD)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

struct Node* head = NULL;

void backwardTraversal() {
    if (head == NULL) return;
    struct Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }
    printf("Backward: NULL <-> ");
    while (current != NULL) {
        printf("%d <-> ", current->data);
        current = current->prev;
    }
    printf("NULL\\n");
}`,

  search: `// C (Full Code): Search in Doubly Linked List
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

struct Node* head = NULL;

int search(int target) {
    struct Node* current = head;
    int index = 1;
    while (current != NULL) {
        if (current->data == target) return 1;
        current = current->next;
        index++;
    }
    return 0;
}`
};

export const createInitialDoublyList = (values = [10, 20, 30, 40]) => {
  return values.map((val, idx) => ({
    id: `dnode-${idx}-${Date.now()}`,
    value: Number(val),
    address: getSimulatedAddress(idx),
    prevAddress: idx > 0 ? getSimulatedAddress(idx - 1) : 'NULL',
    nextAddress: idx < values.length - 1 ? getSimulatedAddress(idx + 1) : 'NULL',
    status: 'normal'
  }));
};

export const runDoublyOperation = (operation, currentNodes, params = {}) => {
  const steps = [];
  const nodes = currentNodes.map(n => ({ ...n, status: 'normal' }));

  const addInitialStep = (codeLine, codeSnippet, opName, details = {}) => {
    steps.push({
      stepNumber: 1,
      codeLine: codeLine,
      codeSnippet: codeSnippet,
      what: `Initial State: Doubly linked list contains ${nodes.length} nodes [${nodes.map(n => n.value).join(' <-> ') || 'Empty'}]. Ready to execute ${opName}.`,
      why: `In C, before modifying bidirectional pointers or allocating memory, we inspect the list state and head pointer.`,
      how: `Function called. HEAD points to ${nodes.length > 0 ? `node [${nodes[0].value}] at ${nodes[0].address}` : 'NULL'}. Press "Next Step" or "Auto Play" to proceed.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0]?.id || null, TAIL: nodes[nodes.length - 1]?.id || null },
      variables: { head: nodes[0]?.address || 'NULL', ...details }
    });
  };

  if (operation === 'create') {
    const values = params.values || [10, 20, 30, 40];
    const generated = [];

    // Step 1: Initial state
    steps.push({
      stepNumber: 1,
      codeLine: 20,
      codeSnippet: `void createDoublyList(int arr[], int n = ${values.length})`,
      what: `Initial State: Ready to create doubly linked list with ${values.length} elements: [${values.join(', ')}] in C.`,
      why: `Function createDoublyList() invoked. Global head is NULL.`,
      how: `Validate array size and begin bidirectional node allocations.`,
      nodes: [],
      pointers: { HEAD: null },
      variables: { n: values.length, head: 'NULL' },
      complexity: { time: `O(${values.length})`, space: `O(${values.length})` }
    });

    // Step 2: Validate size
    steps.push({
      stepNumber: 2,
      codeLine: 21,
      codeSnippet: `if (n <= 0) return;`,
      what: `Checked size n = ${values.length} > 0. Allocating first node on heap with [prev | data | next].`,
      why: `Guards against invalid array sizes.`,
      how: `Evaluate (${values.length} <= 0) -> FALSE.`,
      nodes: [],
      pointers: { HEAD: null },
      variables: { n: values.length }
    });

    const firstAddr = getSimulatedAddress(0);
    const firstNode = {
      id: `dnode-0-${Date.now()}`,
      value: Number(values[0]),
      address: firstAddr,
      prevAddress: 'NULL',
      nextAddress: 'NULL',
      status: 'new'
    };
    generated.push(firstNode);

    // Step 3: First node
    steps.push({
      stepNumber: 3,
      codeLine: 22,
      codeSnippet: `head = (struct Node*)malloc(sizeof(struct Node));`,
      what: `Allocated first doubly node [${values[0]}] in C at ${firstAddr} with prev=NULL and next=NULL.`,
      why: `Each doubly node holds two pointer fields (prev and next) alongside data.`,
      how: `malloc(sizeof(struct Node)) sets prev=NULL, data=${values[0]}, next=NULL.`,
      nodes: [firstNode],
      pointers: { HEAD: firstNode.id, CURRENT: firstNode.id },
      variables: { head: firstAddr, 'head->prev': 'NULL', 'head->next': 'NULL' }
    });
    generated[0].status = 'normal';

    for (let i = 1; i < values.length; i++) {
      const addr = getSimulatedAddress(i);
      const prevAddr = generated[i - 1].address;
      const newNode = {
        id: `dnode-${i}-${Date.now()}`,
        value: Number(values[i]),
        address: addr,
        prevAddress: prevAddr,
        nextAddress: 'NULL',
        status: 'new'
      };

      generated[i - 1].nextAddress = addr;
      generated.push(newNode);

      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 28,
        codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
        what: `Allocated node [${values[i]}] at ${addr} via malloc() in C.`,
        why: `Prepare node structure with [prev | data | next] fields.`,
        how: `newNode->data = ${values[i]}, newNode->next = NULL.`,
        nodes: JSON.parse(JSON.stringify(generated)),
        pointers: { HEAD: generated[0].id, CURRENT: generated[i - 1].id, 'NEW NODE': newNode.id },
        variables: { newNode: addr, 'current->data': generated[i - 1].value }
      });

      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 31,
        codeSnippet: `newNode->prev = current; current->next = newNode;`,
        what: `Established bidirectional links: [${generated[i - 1].value}] <-> [${values[i]}].`,
        why: `Doubly linked lists require both forward and backward pointer connections.`,
        how: `newNode->prev = ${prevAddr}, current->next = ${addr}.`,
        nodes: JSON.parse(JSON.stringify(generated)),
        pointers: { HEAD: generated[0].id, CURRENT: newNode.id, 'NEW NODE': newNode.id },
        variables: { 'newNode->prev': prevAddr, 'current->next': addr }
      });
      generated[i].status = 'normal';
    }

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 35,
      codeSnippet: `}`,
      what: `Doubly linked list successfully constructed in C with ${values.length} nodes!`,
      why: `Allows two-way traversal (forward from HEAD and backward from TAIL).`,
      how: `createDoublyList() execution complete.`,
      nodes: generated,
      pointers: { HEAD: generated[0].id, TAIL: generated[generated.length - 1].id },
      variables: { head: generated[0].address, count: values.length },
      isCompleted: true,
      complexity: { time: 'O(n)', space: 'O(n)' }
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
      prevAddress: 'NULL',
      nextAddress: nodes.length > 0 ? nodes[0].address : 'NULL',
      status: 'new'
    };

    // Step 1: Initial state
    addInitialStep(49, `void insertAtBeginning(int value = ${val})`, 'insertAtBeginning', { value: val });

    // Step 2: Malloc
    steps.push({
      stepNumber: 2,
      codeLine: 50,
      codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
      what: `Allocated new node with value ${val} at address ${newAddr} using malloc().`,
      why: `Prepare node structure with [prev | data | next] fields in C.`,
      how: `newNode->data = ${val}.`,
      nodes: [newNode, ...nodes],
      pointers: { 'NEW NODE': newNode.id, HEAD: nodes.length > 0 ? nodes[0].id : null },
      variables: { value: val, newNode: newAddr }
    });

    // Step 3: newNode->next = head; newNode->prev = NULL;
    steps.push({
      stepNumber: 3,
      codeLine: 52,
      codeSnippet: `newNode->next = head; newNode->prev = NULL;`,
      what: `Linked newNode forward to old HEAD (${nodes[0]?.value}) and set newNode->prev = NULL.`,
      why: `As the first node, its predecessor is NULL, and its successor is the old head.`,
      how: `newNode->next = ${nodes[0]?.address}, newNode->prev = NULL.`,
      nodes: [newNode, ...nodes],
      pointers: { 'NEW NODE': newNode.id, HEAD: nodes[0].id },
      variables: { 'newNode->next': nodes[0]?.address, 'newNode->prev': 'NULL' }
    });

    // Step 4: head->prev = newNode
    const updatedNodes = [newNode, ...nodes];
    if (nodes.length > 0) {
      updatedNodes[1].prevAddress = newAddr;
      steps.push({
        stepNumber: 4,
        codeLine: 55,
        codeSnippet: `head->prev = newNode;`,
        what: `Linked old HEAD [${nodes[0].value}] backwards to newNode [${val}].`,
        why: `Doubly linked list invariant requires bidirectional pointer consistency!`,
        how: `head->prev = ${newAddr}.`,
        nodes: updatedNodes,
        pointers: { 'NEW NODE': newNode.id, HEAD: nodes[0].id },
        variables: { 'oldHead->prev': newAddr }
      });
    }

    // Step 5: head = newNode
    updatedNodes[0].status = 'normal';
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 57,
      codeSnippet: `head = newNode;`,
      what: `Updated HEAD pointer to newNode [${val}]. Insertion complete in C!`,
      why: `New node is now the official start of the list.`,
      how: `head = ${newAddr}.`,
      nodes: updatedNodes,
      pointers: { HEAD: newNode.id, TAIL: updatedNodes[updatedNodes.length - 1].id },
      variables: { head: newAddr, 'head->data': val },
      isCompleted: true,
      complexity: { time: 'O(1)', space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'insertAtEnd') {
    const val = Number(params.value ?? 50);
    const newAddr = getSimulatedAddress(nodes.length);
    const lastIdx = nodes.length - 1;
    const newNode = {
      id: `new-${Date.now()}`,
      value: val,
      address: newAddr,
      prevAddress: nodes[lastIdx].address,
      nextAddress: 'NULL',
      status: 'new'
    };

    // Step 1: Initial state
    addInitialStep(72, `void insertAtEnd(int value = ${val})`, 'insertAtEnd', { value: val });

    // Step 2: Malloc
    steps.push({
      stepNumber: 2,
      codeLine: 73,
      codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
      what: `Allocated new node with value ${val} at address ${newAddr} using malloc().`,
      why: `Prepare node to append at the end of the doubly list.`,
      how: `newNode->data = ${val}.`,
      nodes: [...nodes, newNode],
      pointers: { HEAD: nodes[0].id, 'NEW NODE': newNode.id },
      variables: { value: val, newNode: newAddr }
    });

    // Traversal to tail
    for (let i = 0; i < nodes.length; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 82,
        codeSnippet: `while (current->next != NULL) current = current->next;`,
        what: `CURRENT at node [${nodes[i].value}]. ${i === lastIdx ? 'Reached the tail!' : 'Advancing forward.'}`,
        why: `Find the last node whose next == NULL.`,
        how: `current = ${nodes[i].address}.`,
        nodes: [...nodes.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' })), newNode],
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id, 'NEW NODE': newNode.id },
        variables: { current: nodes[i].address }
      });
    }

    const updated = JSON.parse(JSON.stringify(nodes));
    updated[lastIdx].nextAddress = newAddr;
    newNode.status = 'normal';
    updated.push(newNode);

    // current->next = newNode
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 85,
      codeSnippet: `current->next = newNode;`,
      what: `Forward link: Set node [${nodes[lastIdx].value}]->next = newNode (${newAddr}).`,
      why: `Connect tail node forward to the new node.`,
      how: `current->next = ${newAddr}.`,
      nodes: updated,
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[lastIdx].id, 'NEW NODE': newNode.id },
      variables: { 'last->next': newAddr }
    });

    // newNode->prev = current
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 86,
      codeSnippet: `newNode->prev = current;`,
      what: `Backward link: Set newNode [${val}]->prev = [${nodes[lastIdx].value}] (${nodes[lastIdx].address}).`,
      why: `Complete bidirectional link in C and terminate list with next = NULL.`,
      how: `newNode->prev = ${nodes[lastIdx].address}, newNode->next = NULL.`,
      nodes: updated,
      pointers: { HEAD: updated[0].id, TAIL: newNode.id },
      variables: { 'newNode->prev': nodes[lastIdx].address, 'newNode->next': 'NULL' },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'insertAtPosition') {
    const pos = Math.max(1, Math.min(Number(params.position ?? 3), nodes.length + 1));
    const val = Number(params.value ?? 25);

    // Step 1: Initial state
    addInitialStep(101, `void insertAtPosition(int value = ${val}, int pos = ${pos})`, 'insertAtPosition', { value: val, pos: pos });

    if (pos === 1) return runDoublyOperation('insertAtBeginning', nodes, { value: val });
    if (pos === nodes.length + 1) return runDoublyOperation('insertAtEnd', nodes, { value: val });

    const newAddr = '0x1AA0';
    const prevIdx = pos - 2;
    const nextIdx = pos - 1;

    const newNode = {
      id: `new-${Date.now()}`,
      value: val,
      address: newAddr,
      prevAddress: nodes[prevIdx].address,
      nextAddress: nodes[nextIdx].address,
      status: 'new'
    };

    // Step 2: Create node
    steps.push({
      stepNumber: 2,
      codeLine: 106,
      codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
      what: `Allocated new node with value ${val} at address ${newAddr} using malloc(). Target position: ${pos}.`,
      why: `Initialize node container in heap memory.`,
      how: `newNode->data = ${val}.`,
      nodes: [...nodes, newNode],
      pointers: { HEAD: nodes[0].id, 'NEW NODE': newNode.id },
      variables: { value: val, pos: pos, newNode: newAddr }
    });

    // Traverse
    for (let i = 0; i <= prevIdx; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 109,
        codeSnippet: `current = current->next;`,
        what: `Traversing: CURRENT at node [${nodes[i].value}].`,
        why: `Locate predecessor node at position ${pos - 1}.`,
        how: `current = ${nodes[i].address}.`,
        nodes: [...nodes.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' })), newNode],
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id, 'NEW NODE': newNode.id },
        variables: { current: nodes[i].address }
      });
    }

    // newNode->next = current->next; newNode->prev = current;
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 113,
      codeSnippet: `newNode->next = current->next; newNode->prev = current;`,
      what: `Connected newNode: next -> [${nodes[nextIdx].value}] (${nodes[nextIdx].address}), prev -> [${nodes[prevIdx].value}] (${nodes[prevIdx].address}).`,
      why: `Hook up newNode's pointers first before breaking existing connections.`,
      how: `newNode->next = ${nodes[nextIdx].address}, newNode->prev = ${nodes[prevIdx].address}.`,
      nodes: [...nodes, newNode],
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[prevIdx].id, 'NEW NODE': newNode.id },
      variables: { 'newNode->next': nodes[nextIdx].address, 'newNode->prev': nodes[prevIdx].address }
    });

    // current->next->prev = newNode; current->next = newNode;
    const spliced = [...nodes];
    spliced[nextIdx].prevAddress = newAddr;
    spliced[prevIdx].nextAddress = newAddr;
    newNode.status = 'normal';
    spliced.splice(pos - 1, 0, newNode);

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 118,
      codeSnippet: `current->next->prev = newNode; current->next = newNode;`,
      what: `Updated neighbors: [${nodes[nextIdx].value}]->prev = newNode and [${nodes[prevIdx].value}]->next = newNode.`,
      why: `Splicing into a doubly linked list requires updating 4 pointers in total!`,
      how: `Predecessor and successor now both point to newNode bidirectionally.`,
      nodes: spliced,
      pointers: { HEAD: spliced[0].id, TAIL: spliced[spliced.length - 1].id },
      variables: { 'prevNode->next': newAddr, 'nextNode->prev': newAddr },
      isCompleted: true,
      complexity: { time: `O(pos) = O(${pos})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'deleteFromBeginning') {
    // Step 1: Initial state
    addInitialStep(133, `void deleteFromBeginning()`, 'deleteFromBeginning');

    if (nodes.length <= 1) {
      steps.push({
        stepNumber: 2,
        codeLine: 134,
        codeSnippet: `if (head == NULL) return;`,
        what: `List has ${nodes.length} nodes. Deleting head resets list to empty in C.`,
        why: `Underflow or single-node list handling.`,
        how: `free(head), head = NULL.`,
        nodes: [],
        pointers: { HEAD: null },
        variables: { head: 'NULL' },
        isCompleted: true,
        complexity: { time: 'O(1)', space: 'O(1)' }
      });
      return steps;
    }

    const oldHead = { ...nodes[0], status: 'deleted' };
    const newHead = { ...nodes[1], prevAddress: 'NULL' };
    const remaining = [newHead, ...nodes.slice(2)];

    // temp = head; head = head->next;
    steps.push({
      stepNumber: 2,
      codeLine: 135,
      codeSnippet: `struct Node* temp = head; head = head->next;`,
      what: `Saved old head [${oldHead.value}] in temp. Advanced HEAD pointer to node [${newHead.value}].`,
      why: `Shift entry pointer to second node.`,
      how: `temp = ${oldHead.address}, head = ${newHead.address}.`,
      nodes: [oldHead, newHead, ...nodes.slice(2)],
      pointers: { TEMP: oldHead.id, HEAD: newHead.id },
      variables: { temp: oldHead.address, head: newHead.address }
    });

    // head->prev = NULL
    steps.push({
      stepNumber: 3,
      codeLine: 138,
      codeSnippet: `head->prev = NULL;`,
      what: `Set new HEAD [${newHead.value}]->prev = NULL. Disconnected backward reference to old head.`,
      why: `The first node of a doubly linked list must have prev == NULL.`,
      how: `head->prev = NULL.`,
      nodes: [oldHead, ...remaining],
      pointers: { TEMP: oldHead.id, HEAD: newHead.id },
      variables: { 'head->prev': 'NULL' }
    });

    // free(temp)
    steps.push({
      stepNumber: 4,
      codeLine: 140,
      codeSnippet: `free(temp);`,
      what: `Called free(temp) to deallocate memory of node [${oldHead.value}] at ${oldHead.address}.`,
      why: `Release dynamic heap memory in C.`,
      how: `free(temp).`,
      nodes: remaining,
      pointers: { HEAD: remaining[0].id, TAIL: remaining[remaining.length - 1].id },
      variables: { head: remaining[0].address, status: 'FREED' },
      isCompleted: true,
      complexity: { time: 'O(1)', space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'deleteFromEnd') {
    // Step 1: Initial state
    addInitialStep(155, `void deleteFromEnd()`, 'deleteFromEnd');

    if (nodes.length <= 1) {
      return runDoublyOperation('deleteFromBeginning', nodes);
    }

    const lastIdx = nodes.length - 1;
    const secondLastIdx = nodes.length - 2;

    // Traverse
    for (let i = 0; i < nodes.length; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 163,
        codeSnippet: `while (current->next != NULL) current = current->next;`,
        what: `CURRENT at node [${nodes[i].value}]. Traversing to find the last node.`,
        why: `Locate tail node to disconnect.`,
        how: `current = ${nodes[i].address}.`,
        nodes: nodes.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' })),
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
        variables: { current: nodes[i].address }
      });
    }

    const updated = JSON.parse(JSON.stringify(nodes));
    updated[secondLastIdx].nextAddress = 'NULL';
    updated[lastIdx].status = 'deleted';

    // current->prev->next = NULL
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 166,
      codeSnippet: `current->prev->next = NULL;`,
      what: `Set node [${updated[secondLastIdx].value}]->next = NULL. Last node unlinked!`,
      why: `Second-to-last node becomes the new TAIL in C.`,
      how: `current->prev->next = NULL.`,
      nodes: updated,
      pointers: { HEAD: updated[0].id, CURRENT: updated[lastIdx].id },
      variables: { 'secondLast->next': 'NULL' }
    });

    const finalNodes = updated.slice(0, lastIdx).map(n => ({ ...n, status: 'normal' }));
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 167,
      codeSnippet: `free(current);`,
      what: `Called free(current) to deallocate memory of node [${nodes[lastIdx].value}] at ${nodes[lastIdx].address}.`,
      why: `Free heap memory in C.`,
      how: `free(current).`,
      nodes: finalNodes,
      pointers: { HEAD: finalNodes[0].id, TAIL: finalNodes[finalNodes.length - 1].id },
      variables: { tail: finalNodes[finalNodes.length - 1].address },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'deleteFromPosition') {
    const pos = Math.max(1, Math.min(Number(params.position ?? 2), nodes.length));

    // Step 1: Initial state
    addInitialStep(182, `void deleteFromPosition(int pos = ${pos})`, 'deleteFromPosition', { pos: pos });

    if (pos === 1) return runDoublyOperation('deleteFromBeginning', nodes);
    if (pos === nodes.length) return runDoublyOperation('deleteFromEnd', nodes);

    const delIdx = pos - 1;
    const prevIdx = pos - 2;
    const nextIdx = pos;

    // Traverse
    for (let i = 0; i <= delIdx; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 189,
        codeSnippet: `current = current->next;`,
        what: `Traversing: CURRENT at node [${nodes[i].value}]. Target to delete at position ${pos}.`,
        why: `Locate node at position ${pos}.`,
        how: `current = ${nodes[i].address}.`,
        nodes: nodes.map((n, idx) => ({ ...n, status: idx === i ? (idx === delIdx ? 'deleted' : 'active') : 'normal' })),
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
        variables: { current: nodes[i].address, pos: pos }
      });
    }

    const updated = JSON.parse(JSON.stringify(nodes));
    updated[prevIdx].nextAddress = nodes[nextIdx].address;
    updated[nextIdx].prevAddress = nodes[prevIdx].address;
    updated[delIdx].status = 'deleted';

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 193,
      codeSnippet: `current->prev->next = current->next; current->next->prev = current->prev;`,
      what: `Bypassed node [${nodes[delIdx].value}]: Linked [${nodes[prevIdx].value}] <-> [${nodes[nextIdx].value}] directly in both directions!`,
      why: `In a doubly list, both predecessor's next and successor's prev must be cross-linked.`,
      how: `prev->next = next, next->prev = prev.`,
      nodes: updated,
      pointers: { HEAD: updated[0].id, CURRENT: updated[delIdx].id },
      variables: { 'prev->next': nodes[nextIdx].address, 'next->prev': nodes[prevIdx].address }
    });

    const finalNodes = updated.filter((_, idx) => idx !== delIdx).map(n => ({ ...n, status: 'normal' }));
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 197,
      codeSnippet: `free(current);`,
      what: `Called free(current) to deallocate memory of node [${nodes[delIdx].value}] at ${nodes[delIdx].address}.`,
      why: `Free memory in C.`,
      how: `free(current).`,
      nodes: finalNodes,
      pointers: { HEAD: finalNodes[0].id, TAIL: finalNodes[finalNodes.length - 1].id },
      variables: { deleted: nodes[delIdx].value },
      isCompleted: true,
      complexity: { time: `O(pos) = O(${pos})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'forwardTraversal') {
    // Step 1: Initial state
    addInitialStep(212, `void forwardTraversal()`, 'forwardTraversal');

    steps.push({
      stepNumber: 2,
      codeLine: 213,
      codeSnippet: `struct Node* current = head;`,
      what: `Starting Forward Traversal (HEAD -> TAIL). CURRENT set to ${nodes[0]?.address}.`,
      why: `Visit nodes in forward sequence using ->next pointers in C.`,
      how: `current = head.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0]?.id, CURRENT: nodes[0]?.id },
      variables: { current: nodes[0]?.address, direction: 'FORWARD' }
    });

    const printed = [];
    for (let i = 0; i < nodes.length; i++) {
      printed.push(nodes[i].value);
      const stepNodes = nodes.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' }));

      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 216,
        codeSnippet: `printf("%d <-> ", current->data); current = current->next;`,
        what: `Forward visit: Node [${nodes[i].value}]. Traversal order: ${printed.join(' <-> ')}`,
        why: `Read data and move to successor via ->next.`,
        how: `current = ${nodes[i].nextAddress}.`,
        nodes: stepNodes,
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
        variables: { 'current->data': nodes[i].value, current: nodes[i].address, printed: printed.join(' <-> ') }
      });
    }

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 219,
      codeSnippet: `printf("NULL\\n");`,
      what: `Reached NULL! Forward traversal complete. Sequence: NULL <-> ${printed.join(' <-> ')} <-> NULL.`,
      why: `End of forward list reached.`,
      how: `current == NULL.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0].id, TAIL: nodes[nodes.length - 1].id },
      variables: { output: `NULL <-> ${printed.join(' <-> ')} <-> NULL` },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'backwardTraversal') {
    // Step 1: Initial state
    addInitialStep(234, `void backwardTraversal()`, 'backwardTraversal');

    // Step 2: Traverse to tail
    steps.push({
      stepNumber: 2,
      codeLine: 236,
      codeSnippet: `struct Node* current = head; while (current->next != NULL) current = current->next;`,
      what: `First locating TAIL node by traversing forward to the last element [${nodes[nodes.length - 1].value}].`,
      why: `Backward traversal starts from the end of the list!`,
      how: `current advances until current->next == NULL.`,
      nodes: nodes.map((n, idx) => ({ ...n, status: idx === nodes.length - 1 ? 'active' : 'normal' })),
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[nodes.length - 1].id, TAIL: nodes[nodes.length - 1].id },
      variables: { tail: nodes[nodes.length - 1].address }
    });

    const printed = [];
    for (let i = nodes.length - 1; i >= 0; i--) {
      printed.push(nodes[i].value);
      const stepNodes = nodes.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' }));

      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 242,
        codeSnippet: `printf("%d <-> ", current->data); current = current->prev;`,
        what: `Backward visit using ->prev: Node [${nodes[i].value}]. Traversal order: ${printed.join(' <-> ')}`,
        why: `MAJOR TEACHING FEATURE: Doubly LL can step backward easily using ->prev in C!`,
        how: `current = ${nodes[i].prevAddress}.`,
        nodes: stepNodes,
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id, TAIL: nodes[nodes.length - 1].id },
        variables: { 'current->data': nodes[i].value, current: nodes[i].address, printed: printed.join(' <-> ') }
      });
    }

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 245,
      codeSnippet: `printf("NULL\\n");`,
      what: `Reached NULL! Backward traversal complete. Sequence: NULL <-> ${printed.join(' <-> ')} <-> NULL.`,
      why: `Head's prev pointer is NULL, safely ending backward iteration.`,
      how: `current == NULL.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0].id, TAIL: nodes[nodes.length - 1].id },
      variables: { output: `NULL <-> ${printed.join(' <-> ')} <-> NULL` },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'search') {
    const target = Number(params.value ?? 30);
    let found = false;

    // Step 1: Initial state
    addInitialStep(260, `int search(int target = ${target})`, 'search', { target: target });

    steps.push({
      stepNumber: 2,
      codeLine: 261,
      codeSnippet: `struct Node* current = head;`,
      what: `Searching for value ${target} in C starting at HEAD [${nodes[0].value}].`,
      why: `Examine nodes sequentially.`,
      how: `current = ${nodes[0].address}.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[0].id },
      variables: { target: target, current: nodes[0].address }
    });

    for (let i = 0; i < nodes.length; i++) {
      const isTarget = nodes[i].value === target;
      const stepNodes = nodes.map((n, idx) => ({ ...n, status: idx === i ? (isTarget ? 'found' : 'active') : 'normal' }));

      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 264,
        codeSnippet: `if (current->data == target) return 1;`,
        what: `Checking node [${nodes[i].value}]: Is data == target (${target})? ${isTarget ? 'MATCH FOUND!' : 'No match.'}`,
        why: `Compare data.`,
        how: `Evaluation: ${isTarget ? 'TRUE' : 'FALSE'}.`,
        nodes: stepNodes,
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
        variables: { current: nodes[i].address, 'current->data': nodes[i].value }
      });

      if (isTarget) {
        found = true;
        steps.push({
          stepNumber: steps.length + 1,
          codeLine: 264,
          codeSnippet: `return 1;`,
          what: `SUCCESS! Value ${target} found in doubly linked list at position ${i + 1} (Address: ${nodes[i].address}).`,
          why: `Target found.`,
          how: `Return 1 in C.`,
          nodes: stepNodes,
          pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
          variables: { status: 'FOUND', position: i + 1, address: nodes[i].address },
          isCompleted: true,
          complexity: { time: `O(${i + 1})`, space: 'O(1)' }
        });
        break;
      }

      if (i < nodes.length - 1) {
        steps.push({
          stepNumber: steps.length + 1,
          codeLine: 265,
          codeSnippet: `current = current->next; index++;`,
          what: `Advancing CURRENT to node [${nodes[i + 1].value}] via ->next.`,
          why: `Continue search.`,
          how: `current = ${nodes[i].nextAddress}.`,
          nodes: stepNodes,
          pointers: { HEAD: nodes[0].id, CURRENT: nodes[i + 1].id },
          variables: { current: nodes[i + 1].address }
        });
      }
    }

    if (!found) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 268,
        codeSnippet: `return 0;`,
        what: `Reached NULL. Target value ${target} was NOT found in the doubly linked list.`,
        why: `Checked all nodes without finding match.`,
        how: `Return 0 in C.`,
        nodes: nodes.map(n => ({ ...n, status: 'normal' })),
        pointers: { HEAD: nodes[0].id },
        variables: { status: 'NOT_FOUND', target: target },
        isCompleted: true,
        complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
      });
    }

    return steps;
  }

  // Fallback
  return [{
    stepNumber: 1,
    codeLine: 1,
    codeSnippet: '// C: Doubly ready',
    what: 'Doubly list ready',
    why: 'Select operation',
    how: 'Click Run or Step',
    nodes: nodes,
    pointers: { HEAD: nodes[0]?.id, TAIL: nodes[nodes.length - 1]?.id },
    variables: {}
  }];
};
