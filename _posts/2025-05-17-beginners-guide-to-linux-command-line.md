---
layout: post 
title: Linux Command Line 
date: 2025-05-17
excerpt: Exploring the Linux terminal might seems exhausting, but it's a powerful tool. This guide covers essential commands for navigating the file system, creating and deleting files, and viewing content, unlocking greater control and efficiency.
---

Let's talk about something that might seem a bit intimidating at first glance but is incredibly powerful once you get the hang of it: the **Linux terminal**. While it's where a lot of the magic happens for developers and system administrators, it's also a fantastic tool for everyday users.

As we recently started exploring Linux more deeply, one of the first things I had to confront was the terminal.

## What is the Terminal?

Think of the terminal (also known as the **command line interface**, CLI, or shell) as a text-based way to interact with your computer. Instead of clicking icons and opening menus, you type commands. This allows for direct communication with your operating system. While it lacks the visual flair of a graphical user interface (GUI), it makes up for it in speed, automation, and the ability to perform complex tasks with just a few keystrokes.

The terminal is a fundamental part of how Linux works, and understanding even a few basic commands can significantly boost your productivity and understanding of your system.

<br>

<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="/assets/blog/2025-05-17-beginners-guide-to-linux-command-line/1.png" alt="os-1" style="width: 60%;" />
  <span style="margin-top: 8px; font-style: italic; color: #555;">Figure 1 : Notations</span>
</div>

<br>


## Important basic commands 
1. `pwd`
2. `ls`
3. `cd`
4. `mkdir`
5. `touch`
6. `rm`
7. `cat`
8. **`less`** and **`more`**


<br>

## Navigating the File System

The first thing I learned was how to move around my computer's file system using commands.

### 1) `pwd`: Print Working Directory

To determine your current location within the file system, use `pwd`, which stands for "**print working directory**."

```bash
[ganesh@Ganesh-PC ~]$ pwd
/home/ganesh
```

This command outputs your current directory, for example, `/home/myusername`.

### 2) `ls`: List Directory Contents

Once you know your current directory, you can view its contents using `ls`, short for "**list**."

```bash
[ganesh@Ganesh-PC /]$ ls
afs  boot  etc	 init  lib64	   media  opt	root  sbin  sys  usr
bin  dev   home  lib   lost+found  mnt	  proc	run   srv   tmp  var

[ganesh@Ganesh-PC /]$ ls -l
total 2436
dr-xr-xr-x.   2 root root    4096 Jun 25  2024 afs
lrwxrwxrwx.   1 root root       7 Jun 25  2024 bin -> usr/bin
dr-xr-xr-x.   4 root root    4096 May  3 10:21 boot
drwxr-xr-x   11 root root    3080 May 21 19:50 dev
drwxr-xr-x.  97 root root    4096 May 21 19:50 etc
drwxr-xr-x.   4 root root    4096 May 21 11:12 home
-rwxrwxrwx    1 root root 2424984 Mar 20 02:41 init
lrwxrwxrwx.   1 root root       7 Jun 25  2024 lib -> usr/lib
lrwxrwxrwx.   1 root root       9 Jun 25  2024 lib64 -> usr/lib64
drwx------    2 root root   16384 May  3 10:18 lost+found
drwxr-xr-x.   2 root root    4096 Jun 25  2024 media
drwxr-xr-x.   7 root root    4096 May  3 10:19 mnt
drwxr-xr-x.   2 root root    4096 Jun 25  2024 opt
dr-xr-xr-x  214 root root       0 May 21 19:50 proc
dr-xr-x---.   6 root root    4096 May 21 10:13 root
drwxr-xr-x    8 root root     160 May 21 19:51 run
lrwxrwxrwx.   1 root root       8 Jun 25  2024 sbin -> usr/sbin
drwxr-xr-x.   2 root root    4096 Jun 25  2024 srv
dr-xr-xr-x   11 root root       0 May 21 19:50 sys
drwxrwxrwt.   9 root root    4096 May 21 10:10 tmp
drwxr-xr-x.  12 root root    4096 May  3 10:04 usr
drwxr-xr-x.  19 root root    4096 May  3 10:21 var

[ganesh@Ganesh-PC /]$ ls -a
.   afs		  bin	dev  home  lib	  lost+found  mnt  proc  run   srv  tmp  var
..  .autorelabel  boot	etc  init  lib64  media       opt  root  sbin  sys  usr
```

This command displays all files and directories in your current location. Useful options include:

  * `ls -l`: Provides a "**long listing**," showing detailed information such as file permissions, ownership, size, and last modified date.
  * `ls -a`: Displays "**all**" files, including hidden ones (those starting with a `.`).

### 3) `cd`: Change Directory

To move between directories, use `cd`, or "**change directory**."

To enter a directory named "Documents":

```bash
[ganesh@Ganesh-PC ~]$ cd python/
[ganesh@Ganesh-PC python]$ 
```

To move up one level to the parent directory:

```bash
cd ..
```

To return directly to your home directory from anywhere:

```bash
cd ~
```

This command allows for efficient navigation of your entire file system without a mouse.

<br>

## Creating and Deleting Files and Directories

Once comfortable with navigation, you can create and remove files and directories.

### 4)  `mkdir`: Make Directory

To create a new directory (folder), use `mkdir` (**make directory**).

```bash
[ganesh@Ganesh-PC ~]$ mkdir python_tutorial
[ganesh@Ganesh-PC ~]$ ls
python_tutorial
```

### 5)  `touch`: Create Empty Files

To create an empty file, use `touch`.

```bash
[ganesh@Ganesh-PC python_tutorial]$ touch helloworld.py
[ganesh@Ganesh-PC python_tutorial]$ ls
helloworld.py
```

### 6) `rm`: Remove (Use with Caution\!)

The `rm` command, which stands for "**remove**," deletes files.

To delete a file:

```bash
[ganesh@Ganesh-PC python_tutorial]$ rm helloworld.py
[ganesh@Ganesh-PC python_tutorial]$ ls
[ganesh@Ganesh-PC python_tutorial]$ 
```

**Unlike moving to a trash bin in a GUI, `rm` deletes files permanently.** There is no undo function. Always double-check before executing this command.

To delete an empty directory:

```bash
rmdir my_file
```

To delete a directory and its contents, use `rm` with the `-r` (recursive) option:

```bash
rm -r my_file
```

Proceed with extreme caution when using `rm -r` to ensure you are deleting the correct files and directories.

<br>

## Viewing File Content

You can quickly view the contents of files without opening a full editor.

### 7)  `cat`: Display Contents

`cat` (concatenate) is used to display the entire content of a file directly in the terminal.

```bash
[ganesh@Ganesh-PC python_tutorial]$ cat helloworld.py
print("hello world")
```

### 8) `less` and `more`: For Longer Files

For longer files, `cat` will scroll past content too quickly. `less` and `more` allow you to view file content page by page.

```bash
[ganesh@Ganesh-PC python_tutorial]$ less moores_law.py


import matplotlib.pyplot as plt
import numpy as np

# Define the initial year and transistor count
initial_year = 1971
initial_transistors = 2250  # Intel 4004

# Define Moore's Law function
def moores_law(year):
    return initial_transistors * 2**((year - initial_year) / 2)

# Generate years for prediction
years = np.arange(initial_year, 2030, 1)

# Calculate transistor counts based on Moore's Law
transistor_counts = moores_law(years)

# Plot the results
plt.figure(figsize=(10, 6))
plt.semilogy(years, transistor_counts, label="Moore's Law Prediction", linewidth=2)
plt.xlabel("Year")
plt.ylabel("Number of Transistors")
plt.title("Moore's Law: Transistor Count Over Time")
plt.grid(True)
plt.legend()
plt.show()

:
```

You can scroll using arrow keys or `Page Up`/`Page Down`, and press `q` to quit. `less` generally offers more flexibility than `more`.


```bash
[ganesh@Ganesh-PC python_tutorial]$ more moores_law.py 


import matplotlib.pyplot as plt
import numpy as np

# Define the initial year and transistor count
initial_year = 1971
initial_transistors = 2250  # Intel 4004

# Define Moore's Law function
def moores_law(year):
    return initial_transistors * 2**((year - initial_year) / 2)

# Generate years for prediction
years = np.arange(initial_year, 2030, 1)

# Calculate transistor counts based on Moore's Law
transistor_counts = moores_law(years)

# Plot the results
plt.figure(figsize=(10, 6))
plt.semilogy(years, transistor_counts, label="Moore's Law Prediction", linewidth=2)
plt.xlabel("Year")
plt.ylabel("Number of Transistors")
plt.title("Moore's Law: Transistor Count Over Time")
plt.grid(True)
plt.legend()
plt.show()

--More--(79%)
```


<br>

## Why Use the Terminal?

While graphical interfaces might seem simpler for basic tasks, the terminal offers significant advantages:

  * **Speed:** Commands allow for rapid task execution, eliminating the need to navigate through multiple menus.
  * **Automation:** Commands can be chained together and incorporated into scripts to automate repetitive tasks, significantly enhancing efficiency for programming and system administration.
  * **Remote Access:** The terminal is often the primary interface for managing remote servers and machines. Familiarity with the terminal prepares you for such scenarios.
  * **Deeper Understanding:** Using the terminal provides a more profound understanding of your operating system's underlying structure and how it functions.


<br>

[home](https://mc095.github.io/)