// Circular Linked List Algorithm Execution Engine
// Generates data-driven execution steps synchronized with C (Full Code) lines
// Distinct feature: last node points back to head (last->next = head), no NULL at end!

import { getSimulatedAddress } from './singlyLinkedListEngine.js';

export const CIRCULAR_CODE_SNIPPETS = {
  create: `// C (Full Code): Create Circular Linked List
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void createCircularList(int arr[], int n) {
    if (n <= 0) return;
    head = (struct Node*)malloc(sizeof(struct Node));
    head->data = arr[0];
    head->next = head; // Self-loop for first node
    struct Node* current = head;
    for (int i = 1; i < n; i++) {
        struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
        newNode->data = arr[i];
        newNode->next = head;
        current->next = newNode;
        current = newNode;
    }
}`,

  insertAtBeginning: `// C (Full Code): Insert at Beginning (Circular LL)
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
    if (head == NULL) {
        head = newNode;
        newNode->next = head;
        return;
    }
    struct Node* current = head;
    while (current->next != head) {
        current = current->next;
    }
    newNode->next = head;
    current->next = newNode;
    head = newNode;
}`,

  insertAtEnd: `// C (Full Code): Insert at End (Circular LL)
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
    if (head == NULL) {
        head = newNode;
        newNode->next = head;
        return;
    }
    struct Node* current = head;
    while (current->next != head) {
        current = current->next;
    }
    current->next = newNode;
    newNode->next = head;
}`,

  insertAtPosition: `// C (Full Code): Insert at Position (Circular LL)
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
    for (int i = 1; i < pos - 1 && current->next != head; i++) {
        current = current->next;
    }
    newNode->next = current->next;
    current->next = newNode;
}`,

  deleteFromBeginning: `// C (Full Code): Delete from Beginning (Circular LL)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void deleteFromBeginning() {
    if (head == NULL) return;
    if (head->next == head) {
        free(head);
        head = NULL;
        return;
    }
    struct Node* current = head;
    while (current->next != head) {
        current = current->next;
    }
    struct Node* temp = head;
    head = head->next;
    current->next = head;
    free(temp);
}`,

  deleteFromEnd: `// C (Full Code): Delete from End (Circular LL)
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void deleteFromEnd() {
    if (head == NULL) return;
    if (head->next == head) {
        free(head);
        head = NULL;
        return;
    }
    struct Node* current = head;
    struct Node* prev = NULL;
    while (current->next != head) {
        prev = current;
        current = current->next;
    }
    prev->next = head;
    free(current);
}`,

  search: `// C (Full Code): Search in Circular Linked List
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

int search(int target) {
    if (head == NULL) return 0;
    struct Node* current = head;
    int index = 1;
    do {
        if (current->data == target) return 1;
        current = current->next;
        index++;
    } while (current != head);
    return 0;
}`,

  traverse: `// C (Full Code): Traversal in Circular Linked List
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

struct Node* head = NULL;

void traverse() {
    if (head == NULL) return;
    struct Node* current = head;
    do {
        printf("%d -> ", current->data);
        current = current->next;
    } while (current != head);
    printf("(Back to HEAD %d)\\n", head->data);
}`
};

export const createInitialCircularList = (values = [10, 20, 30, 40]) => {
  const headAddr = getSimulatedAddress(0);
  return values.map((val, idx) => ({
    id: `cnode-${idx}-${Date.now()}`,
    value: Number(val),
    address: getSimulatedAddress(idx),
    nextAddress: idx < values.length - 1 ? getSimulatedAddress(idx + 1) : headAddr,
    status: 'normal'
  }));
};

export const runCircularOperation = (operation, currentNodes, params = {}) => {
  const steps = [];
  const nodes = currentNodes.map(n => ({ ...n, status: 'normal' }));
  const headAddr = nodes.length > 0 ? nodes[0].address : '0x1000';

  const addInitialStep = (codeLine, codeSnippet, opName, details = {}) => {
    steps.push({
      stepNumber: 1,
      codeLine: codeLine,
      codeSnippet: codeSnippet,
      what: `Initial State: Circular list contains ${nodes.length} nodes [${nodes.map(n => n.value).join(' -> ') || 'Empty'} -> (loops to HEAD)]. Ready to execute ${opName}.`,
      why: `In C, before modifying pointers or allocating memory, we inspect the circular list state and head pointer.`,
      how: `Function called. HEAD points to ${nodes.length > 0 ? `node [${nodes[0].value}] at ${nodes[0].address}` : 'NULL'}. Press "Next Step" or "Auto Play" to proceed.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0]?.id || null, TAIL: nodes[nodes.length - 1]?.id || null },
      variables: { head: nodes[0]?.address || 'NULL', ...details }
    });
  };

  if (operation === 'create') {
    const values = params.values || [10, 20, 30, 40];
    const generatedNodes = [];
    const firstAddr = getSimulatedAddress(0);

    // Step 1: Initial state
    steps.push({
      stepNumber: 1,
      codeLine: 19,
      codeSnippet: `void createCircularList(int arr[], int n = ${values.length})`,
      what: `Initial State: Ready to create circular linked list with ${values.length} elements: [${values.join(', ')}] in C.`,
      why: `Function createCircularList() invoked. Global head is NULL.`,
      how: `Validate size and begin memory allocation.`,
      nodes: [],
      pointers: { HEAD: null },
      variables: { n: values.length, head: 'NULL' },
      complexity: { time: `O(${values.length})`, space: `O(${values.length})` }
    });

    // Step 2: Validate size
    steps.push({
      stepNumber: 2,
      codeLine: 20,
      codeSnippet: `if (n <= 0) return;`,
      what: `Checked size n = ${values.length} > 0. Allocating first node on heap.`,
      why: `Guards against non-positive array sizes.`,
      how: `Evaluate (${values.length} <= 0) -> FALSE.`,
      nodes: [],
      pointers: { HEAD: null },
      variables: { n: values.length }
    });

    // Step 3: First node self-loop
    steps.push({
      stepNumber: 3,
      codeLine: 21,
      codeSnippet: `head = (struct Node*)malloc(sizeof(struct Node)); head->next = head;`,
      what: `Allocated memory for first node [${values[0]}] in C at ${firstAddr}. Initialized self-loop (head->next = head).`,
      why: `In a circular linked list, even a single node must loop back to itself. No node ever points to NULL.`,
      how: `Allocate heap memory with malloc(), assign head->next = head.`,
      nodes: [{
        id: `cnode-0-${Date.now()}`,
        value: Number(values[0]),
        address: firstAddr,
        nextAddress: firstAddr,
        status: 'new'
      }],
      pointers: { HEAD: `cnode-0-${Date.now()}`, CURRENT: `cnode-0-${Date.now()}` },
      variables: { head: firstAddr, 'head->next': firstAddr }
    });
    generatedNodes.push({
      id: `cnode-0-${Date.now()}`,
      value: Number(values[0]),
      address: firstAddr,
      nextAddress: firstAddr,
      status: 'normal'
    });

    for (let i = 1; i < values.length; i++) {
      const addr = getSimulatedAddress(i);
      const newNode = {
        id: `cnode-${i}-${Date.now()}`,
        value: Number(values[i]),
        address: addr,
        nextAddress: firstAddr,
        status: 'new'
      };

      generatedNodes[i - 1].nextAddress = addr;
      generatedNodes.push(newNode);

      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 26,
        codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node)); newNode->next = head;`,
        what: `Allocated node [${values[i]}] at ${addr} using malloc(). Linked to predecessor and looped back to HEAD (${firstAddr}).`,
        why: `Maintains circular chain: last->next = head.`,
        how: `newNode->next = head, current->next = newNode.`,
        nodes: JSON.parse(JSON.stringify(generatedNodes)),
        pointers: { HEAD: generatedNodes[0].id, CURRENT: newNode.id, 'NEW NODE': newNode.id },
        variables: { newNode: addr, 'newNode->next': firstAddr }
      });
      generatedNodes[i].status = 'normal';
    }

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 32,
      codeSnippet: `}`,
      what: `Circular linked list created successfully with ${values.length} nodes!`,
      why: `Notice the loop: Node [${values[values.length - 1]}] at the end points back to HEAD [${values[0]}].`,
      how: `createCircularList() completed.`,
      nodes: generatedNodes,
      pointers: { HEAD: generatedNodes[0].id, TAIL: generatedNodes[generatedNodes.length - 1].id },
      variables: { head: firstAddr, 'tail->next': firstAddr },
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
      nextAddress: headAddr,
      status: 'new'
    };

    // Step 1: Initial state
    addInitialStep(45, `void insertAtBeginning(int value = ${val})`, 'insertAtBeginning', { value: val });

    // Step 2: Malloc node
    steps.push({
      stepNumber: 2,
      codeLine: 46,
      codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
      what: `Allocated new node with value ${val} at address ${newAddr} using malloc().`,
      why: `Prepare node to become the new first element in C.`,
      how: `newNode->data = ${val}.`,
      nodes: [newNode, ...nodes],
      pointers: { 'NEW NODE': newNode.id, HEAD: nodes[0].id },
      variables: { value: val, newNode: newAddr, head: headAddr }
    });

    // Traverse to last node
    for (let i = 0; i < nodes.length; i++) {
      const isLast = i === nodes.length - 1;
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 54,
        codeSnippet: `while (current->next != head) current = current->next;`,
        what: `Traversing: CURRENT is at node [${nodes[i].value}]. ${isLast ? 'Last node reached!' : 'Not last yet, moving ahead.'}`,
        why: `In a circular list, the last node's pointer must also be redirected to the new head!`,
        how: `current = ${nodes[i].address}.`,
        nodes: [newNode, ...nodes.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' }))],
        pointers: { 'NEW NODE': newNode.id, HEAD: nodes[0].id, CURRENT: nodes[i].id },
        variables: { current: nodes[i].address, 'current->next': nodes[i].nextAddress }
      });
    }

    const lastIdx = nodes.length - 1;

    // Step: newNode->next = head
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 57,
      codeSnippet: `newNode->next = head;`,
      what: `Connected newNode->next to current HEAD ([${nodes[0].value}] at ${headAddr}).`,
      why: `The new node now points to the previous first node.`,
      how: `newNode->next = ${headAddr}.`,
      nodes: [newNode, ...nodes],
      pointers: { 'NEW NODE': newNode.id, HEAD: nodes[0].id, CURRENT: nodes[lastIdx].id },
      variables: { 'newNode->next': headAddr }
    });

    // Step: current->next = newNode
    const updatedList = [newNode, ...nodes];
    updatedList[updatedList.length - 1].nextAddress = newAddr;

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 58,
      codeSnippet: `current->next = newNode;`,
      what: `Updated last node [${nodes[lastIdx].value}]->next to point to newNode (${newAddr}).`,
      why: `Closes the circular chain to include the new node!`,
      how: `current->next = ${newAddr}.`,
      nodes: updatedList,
      pointers: { 'NEW NODE': newNode.id, HEAD: nodes[0].id, CURRENT: nodes[lastIdx].id },
      variables: { 'last->next': newAddr }
    });

    // Step: head = newNode
    updatedList[0].status = 'normal';
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 59,
      codeSnippet: `head = newNode;`,
      what: `Updated HEAD to newNode [${val}]. Operation complete in C!`,
      why: `The list's entry point now points to our new first node.`,
      how: `Assign head = ${newAddr}.`,
      nodes: updatedList,
      pointers: { HEAD: newNode.id, TAIL: updatedList[updatedList.length - 1].id },
      variables: { head: newAddr, 'tail->next': newAddr },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
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
      nextAddress: headAddr,
      status: 'new'
    };

    // Step 1: Initial state
    addInitialStep(73, `void insertAtEnd(int value = ${val})`, 'insertAtEnd', { value: val });

    // Step 2: Create node
    steps.push({
      stepNumber: 2,
      codeLine: 74,
      codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
      what: `Allocated new node with value ${val} at address ${newAddr} using malloc().`,
      why: `Prepare node to append at the end of the circular loop.`,
      how: `newNode->data = ${val}.`,
      nodes: [...nodes, newNode],
      pointers: { HEAD: nodes[0].id, 'NEW NODE': newNode.id },
      variables: { value: val, newNode: newAddr }
    });

    // Traversal
    for (let i = 0; i < nodes.length; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 82,
        codeSnippet: `while (current->next != head) current = current->next;`,
        what: `CURRENT at node [${nodes[i].value}]. Traversing to find last node where current->next == head.`,
        why: `Must locate the tail node to attach the new element.`,
        how: `current = ${nodes[i].address}.`,
        nodes: [...nodes.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' })), newNode],
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id, 'NEW NODE': newNode.id },
        variables: { current: nodes[i].address }
      });
    }

    const lastIdx = nodes.length - 1;
    const updatedNodes = JSON.parse(JSON.stringify(nodes));
    updatedNodes[lastIdx].nextAddress = newAddr;
    newNode.status = 'normal';
    updatedNodes.push(newNode);

    // current->next = newNode
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 85,
      codeSnippet: `current->next = newNode;`,
      what: `Linked previous last node [${nodes[lastIdx].value}] to newNode [${val}].`,
      why: `Inserts newNode into the sequence after the old tail.`,
      how: `current->next = ${newAddr}.`,
      nodes: updatedNodes,
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[lastIdx].id, 'NEW NODE': newNode.id },
      variables: { 'oldTail->next': newAddr }
    });

    // newNode->next = head
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 86,
      codeSnippet: `newNode->next = head;`,
      what: `Linked newNode->next back to HEAD [${nodes[0].value}] at ${headAddr}. Circular loop completed!`,
      why: `Maintains the circular invariant: the new tail loops back to HEAD.`,
      how: `newNode->next = ${headAddr}.`,
      nodes: updatedNodes,
      pointers: { HEAD: updatedNodes[0].id, TAIL: newNode.id },
      variables: { 'tail->next': headAddr },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'insertAtPosition') {
    const pos = Math.max(1, Math.min(Number(params.position ?? 2), nodes.length + 1));
    const val = Number(params.value ?? 25);

    // Step 1: Initial state
    addInitialStep(100, `void insertAtPosition(int value = ${val}, int pos = ${pos})`, 'insertAtPosition', { value: val, pos: pos });

    if (pos === 1) return runCircularOperation('insertAtBeginning', nodes, { value: val });
    if (pos === nodes.length + 1) return runCircularOperation('insertAtEnd', nodes, { value: val });

    const newAddr = '0x1AA0';
    const newNode = {
      id: `new-${Date.now()}`,
      value: val,
      address: newAddr,
      nextAddress: headAddr,
      status: 'new'
    };

    // Step 2: Malloc
    steps.push({
      stepNumber: 2,
      codeLine: 105,
      codeSnippet: `struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));`,
      what: `Allocated new node with value ${val} at address ${newAddr} using malloc().`,
      why: `Prepare memory for node insertion at position ${pos}.`,
      how: `newNode->data = ${val}.`,
      nodes: [...nodes, newNode],
      pointers: { HEAD: nodes[0].id, 'NEW NODE': newNode.id },
      variables: { value: val, pos: pos }
    });

    // Traverse
    for (let i = 0; i < pos - 2; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 108,
        codeSnippet: `current = current->next;`,
        what: `Traversing: CURRENT moved to node [${nodes[i + 1].value}].`,
        why: `Reach predecessor node before position ${pos}.`,
        how: `Advance current.`,
        nodes: [...nodes, newNode],
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i + 1].id, 'NEW NODE': newNode.id },
        variables: { current: nodes[i + 1].address }
      });
    }

    const prevIdx = pos - 2;
    const nextIdx = pos - 1;
    const spliced = [...nodes];
    newNode.nextAddress = spliced[nextIdx].address;

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 111,
      codeSnippet: `newNode->next = current->next;`,
      what: `Linked newNode->next to node [${spliced[nextIdx].value}] (${spliced[nextIdx].address}).`,
      why: `Preserves downstream link before changing current->next.`,
      how: `newNode->next = ${spliced[nextIdx].address}.`,
      nodes: [...spliced, newNode],
      pointers: { HEAD: spliced[0].id, CURRENT: spliced[prevIdx].id, 'NEW NODE': newNode.id },
      variables: { 'newNode->next': spliced[nextIdx].address }
    });

    spliced[prevIdx].nextAddress = newAddr;
    spliced.splice(pos - 1, 0, { ...newNode, status: 'normal' });

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 112,
      codeSnippet: `current->next = newNode;`,
      what: `Linked node [${spliced[prevIdx].value}]->next to newNode [${val}]. Insertion complete!`,
      why: `Completes splicing of newNode into circular sequence.`,
      how: `current->next = ${newAddr}.`,
      nodes: spliced,
      pointers: { HEAD: spliced[0].id, TAIL: spliced[spliced.length - 1].id },
      variables: { 'current->next': newAddr },
      isCompleted: true,
      complexity: { time: `O(pos) = O(${pos})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'deleteFromBeginning') {
    // Step 1: Initial state
    addInitialStep(126, `void deleteFromBeginning()`, 'deleteFromBeginning');

    if (nodes.length <= 1) {
      steps.push({
        stepNumber: 2,
        codeLine: 128,
        codeSnippet: `if (head->next == head) { free(head); head = NULL; return; }`,
        what: `List has only 1 node. Freed node [${nodes[0]?.value}] with free(head). List is now empty.`,
        why: `Deleting the lone node in a circular list resets HEAD to NULL.`,
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

    // Traverse to last node
    for (let i = 0; i < nodes.length; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 134,
        codeSnippet: `while (current->next != head) current = current->next;`,
        what: `Traversing to find last node: CURRENT is at [${nodes[i].value}].`,
        why: `Because the last node loops to HEAD, it must be redirected to the new HEAD in C.`,
        how: `current = ${nodes[i].address}.`,
        nodes: nodes.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' })),
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
        variables: { current: nodes[i].address }
      });
    }

    const newHead = nodes[1];
    const remainingNodes = nodes.slice(1).map(n => ({ ...n, status: 'normal' }));
    remainingNodes[remainingNodes.length - 1].nextAddress = newHead.address;

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 138,
      codeSnippet: `head = head->next; current->next = head;`,
      what: `HEAD shifted to node [${newHead.value}] (${newHead.address}). Last node redirected to new HEAD.`,
      why: `Reconnect the circular loop to bypass the first node.`,
      how: `head = ${newHead.address}, current->next = ${newHead.address}.`,
      nodes: [oldHead, ...remainingNodes],
      pointers: { TEMP: oldHead.id, HEAD: newHead.id, CURRENT: remainingNodes[remainingNodes.length - 1].id },
      variables: { head: newHead.address, 'last->next': newHead.address }
    });

    // free(temp)
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 140,
      codeSnippet: `free(temp);`,
      what: `Called free(temp) to deallocate old head [${oldHead.value}] at ${oldHead.address}.`,
      why: `Free heap memory in C.`,
      how: `free(temp).`,
      nodes: remainingNodes,
      pointers: { HEAD: remainingNodes[0].id, TAIL: remainingNodes[remainingNodes.length - 1].id },
      variables: { head: remainingNodes[0].address, 'tail->next': remainingNodes[0].address },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'deleteFromEnd') {
    // Step 1: Initial state
    addInitialStep(154, `void deleteFromEnd()`, 'deleteFromEnd');

    if (nodes.length <= 1) {
      return runCircularOperation('deleteFromBeginning', nodes);
    }

    const lastIdx = nodes.length - 1;
    const secondLastIdx = nodes.length - 2;

    // Traverse
    for (let i = 0; i < nodes.length - 1; i++) {
      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 163,
        codeSnippet: `while (current->next != head) { prev = current; current = current->next; }`,
        what: `Traversing: PREV at [${nodes[i].value}], CURRENT at [${nodes[i + 1].value}].`,
        why: `We need both the last node and its predecessor to rewire the circular loop.`,
        how: `Advance pointers.`,
        nodes: nodes.map((n, idx) => ({ ...n, status: idx === i + 1 ? 'active' : 'normal' })),
        pointers: { HEAD: nodes[0].id, PREV: nodes[i].id, CURRENT: nodes[i + 1].id },
        variables: { prev: nodes[i].address, current: nodes[i + 1].address }
      });
    }

    const updatedNodes = JSON.parse(JSON.stringify(nodes));
    updatedNodes[secondLastIdx].nextAddress = headAddr;
    updatedNodes[lastIdx].status = 'deleted';

    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 167,
      codeSnippet: `prev->next = head;`,
      what: `Rewired node [${updatedNodes[secondLastIdx].value}]->next directly back to HEAD (${headAddr}).`,
      why: `The second-to-last node is now the new TAIL and closes the circle.`,
      how: `prev->next = ${headAddr}.`,
      nodes: updatedNodes,
      pointers: { HEAD: updatedNodes[0].id, PREV: updatedNodes[secondLastIdx].id, CURRENT: updatedNodes[lastIdx].id },
      variables: { 'newTail->next': headAddr }
    });

    const finalNodes = updatedNodes.slice(0, lastIdx).map(n => ({ ...n, status: 'normal' }));
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 168,
      codeSnippet: `free(current);`,
      what: `Called free(current) to deallocate memory of node [${updatedNodes[lastIdx].value}] at ${updatedNodes[lastIdx].address}.`,
      why: `Reclaim heap memory in C.`,
      how: `free(current).`,
      nodes: finalNodes,
      pointers: { HEAD: finalNodes[0].id, TAIL: finalNodes[finalNodes.length - 1].id },
      variables: { tail: finalNodes[finalNodes.length - 1].address, 'tail->next': headAddr },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  if (operation === 'search') {
    const target = Number(params.value ?? 30);
    let found = false;

    // Step 1: Initial state
    addInitialStep(182, `int search(int target = ${target})`, 'search', { target: target });

    steps.push({
      stepNumber: 2,
      codeLine: 184,
      codeSnippet: `struct Node* current = head;`,
      what: `Searching for ${target} in C. CURRENT pointing to HEAD [${nodes[0].value}] (${headAddr}).`,
      why: `Begin search from HEAD using a do-while loop in C.`,
      how: `current = ${headAddr}.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[0].id },
      variables: { target: target, current: headAddr }
    });

    for (let i = 0; i < nodes.length; i++) {
      const isTarget = nodes[i].value === target;
      const stepNodes = nodes.map((n, idx) => ({ ...n, status: idx === i ? (isTarget ? 'found' : 'active') : 'normal' }));

      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 187,
        codeSnippet: `if (current->data == target) return 1;`,
        what: `Checking node [${nodes[i].value}]: Does data match ${target}? ${isTarget ? 'MATCH FOUND!' : 'No match.'}`,
        why: `Compare data key.`,
        how: `Evaluation: ${isTarget ? 'TRUE' : 'FALSE'}.`,
        nodes: stepNodes,
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
        variables: { current: nodes[i].address, 'current->data': nodes[i].value }
      });

      if (isTarget) {
        found = true;
        steps.push({
          stepNumber: steps.length + 1,
          codeLine: 187,
          codeSnippet: `return 1;`,
          what: `SUCCESS! Value ${target} found in circular list at position ${i + 1} (address ${nodes[i].address}).`,
          why: `Search target located.`,
          how: `Return 1 in C.`,
          nodes: stepNodes,
          pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
          variables: { status: 'FOUND', position: i + 1 },
          isCompleted: true,
          complexity: { time: `O(${i + 1})`, space: 'O(1)' }
        });
        break;
      }

      if (i < nodes.length - 1) {
        steps.push({
          stepNumber: steps.length + 1,
          codeLine: 188,
          codeSnippet: `current = current->next; index++;`,
          what: `Advancing CURRENT pointer to [${nodes[i + 1].value}] (${nodes[i].nextAddress}).`,
          why: `Continue traversal.`,
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
        codeLine: 190,
        codeSnippet: `} while (current != head); return 0;`,
        what: `Loop condition (current != head) triggered: We traversed back to HEAD! Value ${target} NOT found.`,
        why: `In Circular LL in C, we detect list end when current == head, NOT when current == NULL!`,
        how: `Break do-while loop safely to prevent infinite looping. Return 0.`,
        nodes: nodes.map(n => ({ ...n, status: 'normal' })),
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[0].id },
        variables: { status: 'NOT_FOUND', target: target },
        isCompleted: true,
        complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
      });
    }

    return steps;
  }

  if (operation === 'traverse') {
    // Step 1: Initial state
    addInitialStep(205, `void traverse()`, 'traverse');

    steps.push({
      stepNumber: 2,
      codeLine: 207,
      codeSnippet: `struct Node* current = head;`,
      what: `Initiating circular traversal at HEAD [${nodes[0].value}] (${headAddr}).`,
      why: `Demonstrate that circular traversal in C visits every node and naturally loops back to start.`,
      how: `Assign current = ${headAddr}.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[0].id },
      variables: { current: headAddr }
    });

    const printed = [];
    for (let i = 0; i < nodes.length; i++) {
      printed.push(nodes[i].value);
      const stepNodes = nodes.map((n, idx) => ({ ...n, status: idx === i ? 'active' : 'normal' }));

      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 209,
        codeSnippet: `printf("%d -> ", current->data);`,
        what: `Visiting Node [${nodes[i].value}] via printf(). Output sequence: ${printed.join(' -> ')}`,
        why: `Process node data.`,
        how: `printf("%d -> ", current->data).`,
        nodes: stepNodes,
        pointers: { HEAD: nodes[0].id, CURRENT: nodes[i].id },
        variables: { current: nodes[i].address, printed: printed.join(' -> ') }
      });

      steps.push({
        stepNumber: steps.length + 1,
        codeLine: 210,
        codeSnippet: `current = current->next;`,
        what: `Advancing CURRENT to ${i < nodes.length - 1 ? `Node [${nodes[i + 1].value}]` : `HEAD [${nodes[0].value}] (Circular loop!)`}.`,
        why: `Follow the next pointer link.`,
        how: `current = ${nodes[i].nextAddress}.`,
        nodes: stepNodes,
        pointers: { HEAD: nodes[0].id, CURRENT: i < nodes.length - 1 ? nodes[i + 1].id : nodes[0].id },
        variables: { current: nodes[i].nextAddress }
      });
    }

    // Loop closure step
    steps.push({
      stepNumber: steps.length + 1,
      codeLine: 212,
      codeSnippet: `printf("(Back to HEAD %d)\\n", head->data);`,
      what: `CYCLE COMPLETE: Returned to HEAD [${nodes[0].value}]. Traversal stopped safely without infinite loop!`,
      why: `The condition 'current != head' prevented an endless loop.`,
      how: `do-while loop termination verified in C.`,
      nodes: nodes.map(n => ({ ...n, status: 'normal' })),
      pointers: { HEAD: nodes[0].id, CURRENT: nodes[0].id, TAIL: nodes[nodes.length - 1].id },
      variables: { output: `${printed.join(' -> ')} -> (Back to HEAD ${nodes[0].value})` },
      isCompleted: true,
      complexity: { time: `O(n) = O(${nodes.length})`, space: 'O(1)' }
    });

    return steps;
  }

  // Fallback
  return [{
    stepNumber: 1,
    codeLine: 1,
    codeSnippet: '// C: Circular ready',
    what: 'Circular list ready',
    why: 'Select operation',
    how: 'Click Run or Step',
    nodes: nodes,
    pointers: { HEAD: nodes[0]?.id, TAIL: nodes[nodes.length - 1]?.id },
    variables: {}
  }];
};
