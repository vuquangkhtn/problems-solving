## Operation System

### What do you mean by an operating system?
<!-- id: JKE3#s;N,~, noteType: Basic-66869 -->

Operating System (OS) is basically a software program that manages and handles all resources of a computer such as hardware and software. An OS is responsible for managing, handling, and coordinating overall activities and sharing computer resources. It acts as an intermediary among users of computer and computer hardware.

### Scheduling Algorithm
<!-- id: uv|en.AHg$, noteType: Basic-66869 -->

FCFS (First Come First Serve) the process that arrives first will be executed first Its implementation is based on FIFO queue. Poor performance as the average wait time is high. Problem of starvation Shortest-Job-Next (SJN) Scheduling This is also known as shortest job first, or SJF Priority Scheduling Each process is assigned a priority. The process with the highest priority is to be executed first and so on. Processes with the same priority are executed on a first-come first-served basis. Priority can be decided based on memory requirements, time requirements, or any other resource requirement. Shortest Remaining Time The processor is allocated to the job closest to completion but it can be preempted by a newer ready job with a shorter time to completion. It is often used in batch environments where short jobs need to give preference. Round Robin(RR) Scheduling Each process is provided a fixed time to execute, it is called a quantum. Once a process is executed for a given time period, it is preempted and another process executes for a given time period.

### Difference between Counting and Binary Semaphores
<!-- id: yrzG*5gt,9, noteType: Basic-66869 -->



### What is Deadlock?
<!-- id: F[`oHyR0#+, noteType: Basic-66869 -->

Deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.

### Ram vs Cache
<!-- id: KlMh0bw.BW, noteType: Basic-66869 -->

The cache is a fast memory component that stores frequently used data by the CPU, whereas RAM is a computing device that stores data and programs currently used by the CPU.

### Thread vs Process
<!-- id: j$;a%oDmvF, noteType: Basic-66869 -->

Process means a program is in execution, whereas thread means a segment of a process.

### Multi-thread vs multi-process
<!-- id: Q-XGbT=@Ya, noteType: Basic-66869 -->

Multiprocessing uses two or more CPUs to increase computing power, whereas multithreading uses a single process with multiple code segments to increase computing power. Multiprocessing increases computing power by adding CPUs, whereas multithreading focuses on generating computing threads from a single process

### Virtual Memory (VM), VM paging and Page Fault
<!-- id: z=/6B}uLg9, noteType: Basic-66869 -->



### Ram vs Rom
<!-- id: El7a?ezq/J, noteType: Basic-66869 -->

RAM and ROM are both computer devices. RAM, which stands for random access memory, is volatile memory that temporarily stores the files you are working on. ROM, which stands for read-only memory, is non-volatile memory that permanently stores instructions for your computer.

### Solution to the Critical Section Problem
<!-- id: yHS9$RuksI, noteType: Basic-66869 -->

The critical section problem needs a solution to synchronize the different processes. The solution to the critical section problem must satisfy the following conditions −Mutual Exclusion Mutual exclusion implies that only one process can be inside the critical section at any time. If any other processes require the critical section, they must wait until it is free.Progress Progress means that if a process is not using the critical section, then it should not stop any other process from accessing it. In other words, any process can enter a critical section if it is free.Bounded Waiting Bounded waiting means that each process must have a limited waiting time. Itt should not wait endlessly to access the critical section.
