---
layout: post
title: "What is an Operating System?"
date: 2025-05-12
excerpt: "In this initial post of our Linux OS from Scratch series, we explore the fundamental role of an operating system, detailing its core functions, resource management, and significance in enabling software-hardware interaction."
---

Imagine your computer as a super complex robot with lots of different parts like its brain (CPU), memory (RAM), and Storage (Hard Disk). Now, imagine trying to tell each part exactly what to do, in its own special robot language. Sounds impossible, right? That's where the **Operating System (OS)** comes in rescue!

## Table of Contents
- [Table of Contents](#table-of-contents)
  - [Why Do We Even Need an OS?](#why-do-we-even-need-an-os)
- [The OS's Core Functions](#the-oss-core-functions)
- [Abstraction: Making Things Easier](#abstraction-making-things-easier)
- [Types of Operating Systems](#types-of-operating-systems)
  - [Windows](#windows)
  - [Linux](#linux)
  - [Linux Kernel and Distributions](#linux-kernel-and-distributions)
  - [Why Should You Care About Operating Systems?](#why-should-you-care-about-operating-systems)
  - [Wrapping Up: Key Things to Remember](#wrapping-up-key-things-to-remember)
  - [What's Next?](#whats-next)

An **Operating System (OS)** is a special kind of software that acts like a translator and a manager for your computer. It sits between the physical parts of your computer (the hardware) and the programs you use (like your web browser or games). It makes sure everything works together smoothly and that you can easily tell your computer what to do.

<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="https://www.learncomputerscienceonline.com/wp-content/uploads/2020/12/Operating-System-1.jpg" alt="os-1" style="border-radius: 10px; width: 80%;" />
  <span style="margin-bottom: 8px; font-style: italic; color: #555;">Figure 1: Operating System</span>
</div>

Think of a busy Airport. You have different airplanes flying at different speeds. The **Air traffic controller** (that's the OS!) makes sure everyone flies in assigned ranges, at the right time, and using the right coordinates. Without a ATC, it would just be a mess! Similarly, without an OS, your applications wouldn't know how to use the computer's hardware, and things would get chaotic.

### Why Do We Even Need an OS?
The OS solves two big problems:

1.  **Hardware Complexity (Communication)**: The computer's hardware speaks in a very low-level language of 0s and 1s (binary code). It's super complicated! The OS takes your simple instructions (like clicking an icon) and translates them into this robot language (system calls) so the hardware can understand. It also takes the hardware's responses and makes them understandable for your applications. It's like having a universal translator for your computer!

2.  **Resource Management**: Your computer has limited resources, like its processing power (how fast it can think), its memory (where it keeps things it's currently working on), and its storage (where it keeps everything long-term). When you have multiple programs running at the same time, they all need to share these resources. The OS acts like a fair teacher, making sure each program gets its turn and doesn't hog all the resources, preventing crashes and slowdowns.

<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="/assets/blog/2025-05-12-what-is-an-operating-system/1.png" alt="os-1" style="width: 40%;" />
  <span style="margin-top: 8px; font-style: italic; color: #555;">Figure 2: Overview of Operating System</span>
</div>

<br>

## The OS's Core Functions

<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="/assets/blog/2025-05-12-what-is-an-operating-system/2.png" alt="os-1" style="width: 100%;" />
  <span style="margin-top: 10px; margin-bottom:30px; font-style: italic; color: #555;">Figure 3: What the Operating System Does for You</span>
</div>

<h4 style="text-decoration: underline;">1. Process Management</h4>

Imagine you're trying to do many things at once: listening to music, downloading a file, and writing an email. Each of these activities is a **process** – a program in action. OS keeps all the processes running smoothly without any deadlocks.

<div style="display: flex; justify-content: center;">
  <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
<dotlottie-player src="https://lottie.host/d4917547-f3ca-4e91-a4e5-3d16d58fb220/odZ22Y5qXH.lottie" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>
</div>



<h4 style="text-decoration: underline;">2. Memory Management: Organizing the Computer's Workspace</h4>

Think of your computer's **RAM (Random Access Memory)** as a temporary workspace, like the top of your desk. When you open a program, the OS loads the necessary data and instructions into this workspace so the CPU can access them quickly. But this workspace is limited! (size of a register is very small)

<div style="display: flex; justify-content: center;">
  <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
<dotlottie-player src="https://lottie.host/894338e6-3ae2-40bc-bef1-6bba940ea216/Qo08GCYkXU.lottie" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>
</div>

The OS acts like an organizer, deciding which program gets which part of the RAM and making sure they don't interfere with each other. When the RAM gets full, the OS might use a trick called **virtual memory**. To put into an example, This is like temporarily moving some less-used items from your desk to a nearby filing cabinet (the hard drive or SSD) to free up space. When you need those items again, the OS brings them back to the desk. This allows you to run more programs than can physically fit in the RAM at once, but accessing data from virtual memory is slower than from RAM.

<h4 style="text-decoration: underline;">3. File System: Keeping Things Organized</h4>

Imagine a giant library with millions of books (your files) stored on shelves (storage devices). Without a system, finding a specific book would be a nightmare! The OS creates a **file system**, which is like a way to organize these books into sections (directories or folders) with labels (file names).

<div style="display: flex; justify-content: center;">
  <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
<dotlottie-player src="https://lottie.host/32cff4fa-3af3-4451-a9d7-28856c8809c1/H1fyZ23xPm.lottie" background="transparent" speed="1.5" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>
</div>

Different operating systems use different file systems (like NTFS on Windows or [ext4](https://opensource.com/article/17/5/introduction-ext4-filesystem) on Linux). The OS keeps track of where each file is stored, its name, its size, and who has permission to access it (metadata). When you save a file, the OS records its location in this file system. When you want to open a file, the OS uses this information to find it quickly. Think of the file explorer you use – that's just a visual way to navigate the OS's file system.

<h4 style="text-decoration: underline;">4. Device Management: Talking to Your Gadgets</h4>

Your computer interacts with many different gadgets (devices) like your keyboard, mouse, monitor, printer, and USB drives. Each of these devices speaks a different "language" (uses different communication protocols). The OS acts as a universal interpreter, allowing your applications to communicate with these diverse devices without needing to know their specific languages.

<div style="display: flex; justify-content: center;">
  <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script>
<dotlottie-player src="https://lottie.host/cdb672b3-c39c-46aa-be1b-34068294c4f8/5Ukp4ybEkr.lottie" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>
</div>

This magic happens through special software called **[device drivers](https://www.geeksforgeeks.org/device-driver-and-its-purpose/)**. Think of drivers as translators for each specific device. The OS provides a standard way for applications to send commands (like "print this document") to the OS, and the OS then uses the appropriate device driver to translate that command into the specific language that your printer understands.

<h4 style="text-decoration: underline;">5. Security and Access Control: Keeping Things Safe</h4>

Imagine the OS as a security guard for your computer, protecting your important information (data and system resources) from unauthorized access. It controls who can use the computer and what they are allowed to do.

<div style="display: flex; justify-content: center;">
  <script type="module" src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"></script>
  <dotlottie-player src="https://lottie.host/3df63b38-b40d-4773-99ab-110c40056a46/sDYJVc7e5G.lottie" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>
</div>

The OS manages **user authentication**, like checking your username and password to verify who you are before letting you log in. It also controls **file permissions**, determining who can view, edit, or run specific files. For example, on Linux, the OS carefully restricts who can access critical system files like `/etc/passwd`, which stores user account information, usually allowing only administrators to make changes. The OS also tries to protect your system from malicious software (malware) by monitoring for suspicious activity.


## Abstraction: Making Things Easier

Without an OS, every software developer would have to write their programs to work directly with each specific piece of hardware. This would be incredibly difficult and time-consuming! The OS provides a **layer of abstraction**, which is like a simplified interface that hides the complex details of the hardware.

Think of it like building with LEGO bricks. You don't need to know how the plastic is made or how the molds work. You just use the standard shapes and connectors to build whatever you want. The OS provides similar standard "building blocks" (called **APIs - Application Programming Interfaces**) that developers can use to interact with the hardware without needing to know all the core details.

For example, a game developer can use graphics APIs provided by the OS (like OpenGL or DirectX) to draw images on the screen without needing to understand the intricate workings of the graphics card (GPU). Similarly, a music player uses file system calls provided by the OS to open and play audio files, regardless of whether those files are stored on a traditional hard drive or a faster SSD. This abstraction makes software development much faster and easier, and it allows applications to run on different computers with the same OS, even if they have different hardware.

## Types of Operating Systems

Operating systems vary in design and purpose. Below, we compare two popular OS families: **[Windows](https://www.microsoft.com/en-in/windows)** and **[Linux](https://www.linux.org/)**.

### Windows

<div style="display: flex; flex-direction: column; align-items: center;">
  <iframe 
    src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Windows_Version_History.svg" 
    style="border-radius: 10px; width: 100%; height: 600px; border: none;" 
    title="Windows Distro List">
  </iframe>
  <span style="margin-top: 8px; font-style: italic; color: #555;">
    Figure 4: Windows Distro List
  </span>
</div>

-   **Developer**: Created by Microsoft.
-   **What it's like**:
    -   **Easy to Use**: Known for its graphical user interface (GUI) that's designed to be intuitive for beginners. You mostly interact with it by clicking icons and using menus.
    -   **Closed Source**: The "recipe" (source code) for Windows is kept secret by Microsoft, and you need to pay for a license to use it.
    -   **Lots of Compatibility**: Works with a huge range of software and hardware available on the market.
-   **Where you see it**: Mostly found on personal desktop computers, laptops, and is popular for gaming and in businesses that rely on Microsoft's specific software like Microsoft Office.
-   **Example**: Windows 11 has a sleek and modern look and works well with devices like Xbox gaming consoles.

### Linux

<figure style="width: 100%; max-width: 800px; margin: auto;">
  <iframe
    src="https://wpollock.com/Unix/us__en_us__ibm100__linux__linux_timeline.pdf"
    width="100%"
    height="600px"
    style="border: none;">
  </iframe>
  <figcaption style="text-align: center; font-style: italic; margin-top: 8px;">
    Linux Distributions timeline by William Pollock
  </figcaption>
</figure>

-   **Developer**: Developed collaboratively by a large community of programmers around the world, based on the core of the OS called the **Linux kernel** (created by [Linus Torvalds](https://www.youtube.com/watch?v=o8NPllzkFhE)).
-   **What it's like**:
    -   **Open Source**: The "recipe" (source code) is freely available for anyone to see, use, modify, and share. This fosters a lot of innovation and customization.
    -   **Modular**: The core of Linux is the **kernel**, and then different groups create complete operating systems (called **distributions**) by adding different user interfaces (like different "desktops"), tools, and applications. It's like having different sets of furniture and decorations for the same house foundation.
    -   **Super Flexible**: Can run on a vast range of devices, from powerful servers and supercomputers to your Android phone and even smart home devices.
-   **Where you see it**: Very popular for servers (powering most of the internet!), cloud computing, software development, and embedded systems.
-   **Example**: Ubuntu is a user-friendly Linux distribution that provides a good graphical interface while still giving you access to powerful command-line tools (typing commands instead of clicking).



### Linux Kernel and Distributions

Think of the **Linux kernel** as the very core engine of the operating system – it handles the most fundamental tasks like managing the CPU and memory. **Distributions** are like complete packages built around this kernel. They take the kernel and add a user interface (like the desktop you see), essential tools, and pre-installed applications to make a ready-to-use operating system. Examples of popular Linux distributions include Ubuntu, Fedora, Debian, and many more – each with its own look and feel and set of included software.

<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="/assets/blog/2025-05-12-what-is-an-operating-system/3.png" alt="os-1" style="border-radius: 10px; width: 80%;" />
  <span style="margin-top: 8px; font-style: italic; color: #555;">Figure 5: A General Idea of How Windows and Linux Perform</span>
</div><br>


### Why Should You Care About Operating Systems?

Understanding how operating systems work is important for many reasons:

-   **For Developers**: It helps you write more efficient software that works well with the computer's hardware and other applications. Knowing how the OS manages memory and processes can make your programs faster and more reliable.
-   **For System Administrators**: If you're managing computer systems, especially servers and networks, understanding OS concepts is crucial for keeping things running smoothly, managing users, and ensuring security.
-   **For Everyone Curious About Computers**: It gives you a deeper understanding of how your computer actually works, moving beyond just using applications to knowing what's happening behind the scenes.

In our journey, we'll be focusing on Linux because it's open source, highly flexible, and widely used in the tech world. It's a fantastic platform for learning about operating system concepts in detail. In future lessons, we'll explore the inner workings of the Linux kernel, how its file system is organized, and how to use the powerful command-line interface.

### Wrapping Up: Key Things to Remember

-   An Operating System (OS) is the essential software that manages your computer's hardware and provides a platform for all the applications you use.
-   The core jobs of an OS include managing running programs (processes), organizing the computer's memory, structuring your files, communicating with hardware devices, and keeping your system secure.
-   The OS acts as a translator and a manager, making complex hardware easier to use for both users and software developers. This is called abstraction.
-   Windows is a popular, user-friendly, but closed-source OS, while Linux is an open-source and highly customizable OS used in many different environments.
-   Linux is built around a core called the kernel, and complete operating systems (distributions) are created by adding other software to this kernel.

### What's Next?

In our next step, we'll dive deeper into the world of Linux. We'll explore its history, its fundamental structure, and some of its unique advantages. To get ready, you might want to consider installing a Linux distribution (like Ubuntu) on a virtual machine (software that lets you run another operating system inside your current one) or setting up a dual-boot system (where you can choose between your current OS and Linux when you start your computer). Don't worry if these terms sound new – we'll guide you through it!


[home](https://mc095.github.io/)