# Operation System

[[toc]]

### What do you mean by an operating system?

<!-- id: JKE3#s;N,~, noteType: Basic-66869 -->

An Operating System (OS) is system software that manages computer hardware and software resources and provides common services for programs.

- Manages CPU, memory, storage, I/O devices, and processes.
- Schedules tasks and allocates resources fairly and efficiently.
- Provides abstractions (files, processes, threads) and security.
- Acts as an intermediary between users/applications and hardware.

### Scheduling Algorithm

<!-- id: uv|en.AHg$, noteType: Basic-66869 -->

Common CPU scheduling algorithms:

- FCFS (First Come First Serve): processes execute in arrival order; easy to implement (FIFO queue) but may have high average waiting time.
- SJF/SJN (Shortest Job First/Next): runs the process with the smallest burst time; minimizes average waiting time; may cause starvation for long jobs.
- Priority Scheduling: runs the highest priority process first; equal priorities use FCFS; risk of starvation for low-priority processes (can use aging).
- SRTF (Shortest Remaining Time First): preemptive version of SJF; always runs the job with the shortest remaining time; good for short jobs; can preempt longer jobs.
- Round Robin (RR): each process gets a fixed time slice (quantum); preempted after quantum expires; improves responsiveness in time-sharing systems.

### Difference between Counting and Binary Semaphores

<!-- id: yrzG*5gt,9, noteType: Basic-66869 -->

- Binary semaphore: takes values 0/1; used for mutual exclusion (mutex-like behavior).
- Counting semaphore: holds a non-negative integer; controls access to a resource pool with multiple instances.
- Binary semaphores are simpler and enforce exclusive access; counting semaphores manage capacity.

### What is Deadlock?

<!-- id: F[`oHyR0#+, noteType: Basic-66869 -->

Deadlock occurs when processes are blocked, each holding a resource and waiting for others to release theirs.

Necessary conditions (Coffman):

- Mutual exclusion
- Hold and wait
- No preemption
- Circular wait

### Ram vs Cache

<!-- id: KlMh0bw.BW, noteType: Basic-66869 -->

- Cache: very fast, small memory close to the CPU; stores frequently used data/instructions; organized in levels (L1/L2/L3).
- RAM: larger main memory; stores programs and data currently in use; slower than cache but faster than disk.

### Thread vs Process

<!-- id: j$;a%oDmvF, noteType: Basic-66869 -->

- Process: an executing program with its own memory space.
- Thread: lightweight execution unit within a process; shares process memory.

### Multi-thread vs multi-process

<!-- id: Q-XGbT=@Ya, noteType: Basic-66869 -->

- Multiprocessing: multiple processes (often across CPUs/cores) with isolated memory; improves parallelism and isolation; IPC required.
- Multithreading: multiple threads within one process sharing memory; lower overhead; easier sharing; needs careful synchronization.

### Virtual Memory (VM), VM paging and Page Fault

<!-- id: z=/6B}uLg9, noteType: Basic-66869 -->

- Virtual Memory: abstraction that gives processes the illusion of a large, contiguous memory space; enables memory protection and isolation.
- Paging: divides virtual memory into fixed-size pages mapped to physical frames; avoids external fragmentation.
- Page Fault: occurs when a process accesses a page not in physical memory; OS loads the page from disk (swap/page file) into RAM.

### Ram vs Rom

<!-- id: El7a?ezq/J, noteType: Basic-66869 -->

- RAM (Random Access Memory): volatile; temporary working memory for active programs/data.
- ROM (Read-Only Memory): non-volatile; permanently stores firmware/instructions.

### Solution to the Critical Section Problem

<!-- id: yHS9$RuksI, noteType: Basic-66869 -->

- A correct solution must satisfy:
  - Mutual Exclusion: only one process in the critical section at a time.
  - Progress: if no process is in the critical section, selection of the next entrant cannot be postponed indefinitely.
  - Bounded Waiting: each process has a bounded waiting time before entering the critical section.
