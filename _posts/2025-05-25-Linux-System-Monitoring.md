---
layout: post
title: "Linux System Monitoring"
date: 2025-05-25
excerpt: "Exploring essential commands for CPU, memory, disk, and network analysis. Master `top`, `htop`, and `vmstat` for CPU and memory; `df`, `du`, and `iostat` for disk usage; `ip`, `netstat`, and `ss` for network insights; and `tail`, `journalctl`, and `dmesg` for log examination, ensuring a healthy and performant Linux environment."
---


 We often describe the feeling of intuitively knowing something is wrong with a server even before an alert fires.System monitoring is the art and science of observing and analyzing the performance and health of a Linux machine's various components: its CPU, memory, disk I/O, network activity, and running processes. It's how we ensure optimal performance, proactively detect issues, and rapidly troubleshoot problems when they inevitably arise. Today, let's explore the indispensable toolkit we use to keep our Linux systems running smoothly, offering our personal insights into each command.


## Table of Contents

- [Table of Contents](#table-of-contents)
- [Why Monitor?](#why-monitor)
- [Monitoring CPU and Memory](#monitoring-cpu-and-memory)
  - [1. `top`: Our Real-time Dashboard](#1-top-our-real-time-dashboard)
  - [2. `htop`: The User-Friendly Evolution](#2-htop-the-user-friendly-evolution)
  - [3. `vmstat`: The System-Wide Reporter](#3-vmstat-the-system-wide-reporter)
  - [4. `free -m`: Dedicated Memory Check](#4-free--m-dedicated-memory-check)
- [The Storage Backbone: Disk Monitoring](#the-storage-backbone-disk-monitoring)
  - [1. `df -h`: Disk Space At a Glance](#1-df--h-disk-space-at-a-glance)
  - [2. `du -sh /path`: Pinpointing Space Hogs](#2-du--sh-path-pinpointing-space-hogs)
  - [3. `iostat`: Disk I/O Performance](#3-iostat-disk-io-performance)
- [Network Monitoring](#network-monitoring)
  - [1. `ip a`: The Modern Interface Check](#1-ip-a-the-modern-interface-check)
  - [2. `netstat` and `ss`: Connections and Ports](#2-netstat-and-ss-connections-and-ports)
  - [3. `ping` and `traceroute`: Connectivity and Path](#3-ping-and-traceroute-connectivity-and-path)
  - [4. `nslookup` / `dig`: DNS Resolution](#4-nslookup--dig-dns-resolution)
- [Log Monitoring](#log-monitoring)
  - [1. `tail -f /path/to/log/file`: Live Log Follow](#1-tail--f-pathtologfile-live-log-follow)
  - [2. `journalctl -f`: Systemd's Log View](#2-journalctl--f-systemds-log-view)
  - [3. `dmesg | tail`: Kernel Messages](#3-dmesg--tail-kernel-messages)
- [Conclusion](#conclusion)


 <br>

## Why Monitor?

Before we jump into the commands, let's briefly reflect on *why* system monitoring is non-negotiable for us.


<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="https://i0.wp.com/www.omgubuntu.co.uk/wp-content/uploads/2022/07/demo-1.gif?fit=849%2C618&ssl=1" alt="os-1" style="width: 90%; border-radius: 10px;" />
  <span style="margin-top: 8px; font-style: italic; color: #555;">Figure 1: System monitoring in Linux</span>
</div>

<br>

* **Performance Optimization**: Without monitoring, we're guessing. Are we bottlenecked by CPU? Running out of memory? Is the disk too slow? Monitoring gives us the data to make informed decisions about scaling or optimizing our applications.
* **Proactive Problem Detection**: Catching slow memory leaks, unexpected CPU spikes, or an overloaded network interface *before* they cause an outage saves us countless headaches and reputation damage.
* **Troubleshooting and Root Cause Analysis**: When an issue does occur, our monitoring data provides the crucial breadcrumbs needed to pinpoint the exact cause, whether it's a runaway process, a misconfigured network service, or a disk filling up.
* **Capacity Planning**: Historical monitoring data helps us understand resource consumption trends, allowing us to predict future needs and plan for upgrades or scaling before resources become exhausted.
* **Security Auditing**: Unexpected network connections or spikes in CPU usage can sometimes indicate a security breach. Monitoring helps us spot these anomalies.

For us, monitoring isn't just about reacting; it's about anticipating and understanding the very pulse of our Linux systems.


<br>

## Monitoring CPU and Memory

The CPU and memory are the brains and short-term memory of our systems. Keeping a close eye on them is paramount.

### 1. `top`: Our Real-time Dashboard

The `top` command is often the first tool we reach for when we want a quick, real-time overview of system performance and running processes. It's like looking at the vital signs on a patient monitor.

```bash
top
```

When we execute `top`, the output is divided into two main sections:
* **Summary Area (Top)**: This gives us system uptime, load average (a crucial metric indicating system responsiveness), total tasks (processes), CPU states (idle, user, system, I/O wait), and memory usage (total, free, used, buffers/cache). We pay close attention to `wa` (I/O wait) in the CPU line, as high values here often point to disk bottlenecks.

<br>


* **Process List (Bottom)**: This lists individual processes, sorted by CPU usage by default. We can see `PID`, `USER`, `%CPU`, `%MEM`, `COMMAND`, and more.

Inside `top`, we frequently use these interactive keys:
* `k`: To kill a process (prompts for PID).
* `r`: To renice a process (change its priority).
* `P`: To sort processes by CPU usage (the default).
* `M`: To sort by memory usage.
* `q`: To quit.

`top` is invaluable for immediately identifying runaway processes consuming excessive CPU or memory.


<br>

### 2. `htop`: The User-Friendly Evolution

While `top` is powerful, `htop` offers a more visually appealing and interactive experience. It's not usually installed by default, but it's one of the first packages we install on any new server.

* **Installation**:
    * Debian/Ubuntu: `sudo apt update && sudo apt install htop`
    * RHEL/CentOS: `sudo yum install htop` or `sudo dnf install htop`

```bash
htop
```

What we love about `htop`:
* **Visual Meters**: Clear, colorful graphs for CPU, memory, and swap usage at the top.
* **Mouse Support**: We can click on columns to sort, select processes, and use function keys easily.
* **Tree View (`F5`)**: Shows processes in a hierarchical tree, making it easy to see parent-child relationships.
* **Filtering (`F4`) and Search (`F3`)**: Quickly narrow down the list of processes.
* **Easier Process Actions**: `F9` for `kill` (with various signal options) and `F7`/`F8` for `nice`/`renice`.

For routine interactive monitoring, `htop` is often our first choice due to its enhanced usability.

<br>


### 3. `vmstat`: The System-Wide Reporter

`vmstat` (virtual memory statistics) provides broader, system-wide statistics rather than focusing just on processes. It's excellent for quickly assessing overall system health, including CPU, memory, I/O, and even context switches.

```bash
vmstat 1 5
```
This command outputs statistics every 1 second, for a total of 5 updates. We often use it with a delay to see trends.
<br>

Key columns we monitor in `vmstat`:
* **`r` (procs)**: Number of runnable processes (waiting for CPU). A high `r` value might indicate a CPU bottleneck.
* **`b` (procs)**: Number of processes in uninterruptible sleep (waiting for I/O). High `b` values often point to disk I/O issues.
* **`free` (memory)**: Amount of free physical memory.
* **`si` (swap)**: Amount of swap-in (pages read from swap disk).
* **`so` (swap)**: Amount of swap-out (pages written to swap disk). High swap activity indicates memory pressure.
* **`us` (cpu)**: Time spent in user space.
* **`sy` (cpu)**: Time spent in kernel space.
* **`id` (cpu)**: Idle time.
* **`wa` (cpu)**: I/O wait time. A persistently high `wa` is a strong indicator of disk I/O as the bottleneck.
* **`bi` (io)**: Blocks received from a block device (reads).
* **`bo` (io)**: Blocks sent to a block device (writes).

`vmstat` helps us quickly understand if our system is CPU-bound, memory-bound, or I/O-bound.

<br>


### 4. `free -m`: Dedicated Memory Check

While `top` and `vmstat` include memory information, `free` provides a concise summary specifically for memory usage. We typically use the `-h` (human-readable) or `-m` (megabytes) option.

```bash
free -m
```
This output shows total, used, free, shared, buff/cache, and available memory in megabytes. We often look at the "available" column, which represents memory that can be used by new applications without swapping.

<br>


## The Storage Backbone: Disk Monitoring

Disk performance and space are critical. A full disk can bring an entire system to a halt, and slow disk I/O can severely degrade application performance.

### 1. `df -h`: Disk Space At a Glance

`df` (disk free) tells us about disk space usage for mounted filesystems. The `-h` (human-readable) option is indispensable.

```bash
df -h
```
This command shows us the total size, used space, available space, and percentage used for each mounted partition. We routinely check this to ensure critical partitions (like `/`, `/var`, `/home`) aren't filling up. If `/var/log` (where logs reside) fills up, it can crash many services.

<br>


### 2. `du -sh /path`: Pinpointing Space Hogs

While `df` tells us about partitions, `du` (disk usage) tells us about the size of specific files or directories. This is crucial for identifying what's consuming space.

```bash
du -sh /var/log
```
The `-s` (summarize) and `-h` (human-readable) options are most commonly used. We often combine this with `sort` to find the biggest culprits:
```bash
du -h --max-depth=1 /var/log | sort -rh
```
This command lists the sizes of subdirectories within `/var/log` and sorts them by size, making it easy to spot large log files.

### 3. `iostat`: Disk I/O Performance

`iostat` (input/output statistics) provides detailed statistics about CPU utilization and I/O activity for devices, partitions, and network filesystems. It's part of the `sysstat` package, so we might need to install it (`sudo apt install sysstat` or `sudo yum install sysstat`).

```bash
iostat -xdm 1 5
```


<br>

* `-x`: Extended statistics.
* `-d`: Device utilization.
* `-m`: Display statistics in megabytes per second.
* `1 5`: Update every 1 second, 5 times.

Key metrics we watch in `iostat`:
* `%util`: Percentage of CPU time during which I/O requests were issued to the device. A value close to 100% indicates an I/O bottleneck.
* `r/s`, `w/s`: Reads/writes per second.
* `rkB/s`, `wkB/s`: Kilobytes read/written per second.
* `await`: The average time (in milliseconds) for I/O requests issued to the device to be served. High `await` indicates slow disk.

`iostat` is indispensable for troubleshooting application slowdowns caused by slow disk performance.

<br>

## Network Monitoring

Network connectivity and throughput are vital for any server. We have a suite of tools to ensure our network interfaces are healthy and traffic is flowing as expected.

### 1. `ip a`: The Modern Interface Check

The `ifconfig` command is largely deprecated in favor of `ip a` (IP address). `ip a` provides comprehensive information about network interfaces, including IP addresses, MAC addresses, and interface status.

```bash
ip a
```
We use this to verify IP addresses, check if interfaces are `UP`, and troubleshoot basic network connectivity issues.

### 2. `netstat` and `ss`: Connections and Ports

These commands show us active network connections and listening ports, crucial for understanding what services are exposed and who is connecting. `ss` is the modern, faster alternative to `netstat`.

* **`netstat -tulnp`**:
    * `-t`: TCP connections.
    * `-u`: UDP connections.
    * `-l`: Listening sockets.
    * `-n`: Numeric addresses (don't resolve hostnames).
    * `-p`: Show process ID/program name.
    ```bash
    netstat -tulnp
    ```
    This shows us which services are listening on which ports (e.g., Apache on port 80, SSH on port 22) and their corresponding PIDs.

* **`ss -tulnp`**: A faster, more efficient alternative with similar output.
    ```bash
    ss -tulnp
    ```
    We generally prefer `ss` for its speed on busy systems.



### 3. `ping` and `traceroute`: Connectivity and Path

* **`ping hostname`**: The simplest tool for testing network connectivity. It sends ICMP echo requests to a host and measures the round-trip time.
    ```bash
    ping google.com
    ```
    We use `ping` to quickly determine if a host is reachable and to assess basic latency.

* **`traceroute hostname`**: If `ping` fails or we experience high latency, `traceroute` helps us identify the path packets take to reach a destination and where potential bottlenecks or failures occur.
    ```bash
    traceroute google.com
    ```
    This shows each hop (router) along the path and the latency to each hop. Invaluable for diagnosing network routing issues.

### 4. `nslookup` / `dig`: DNS Resolution

DNS (Domain Name System) is fundamental to network communication. If DNS isn't working, services can't be found. `nslookup` (or `dig`, a more advanced alternative) helps us diagnose DNS resolution issues.

```bash
nslookup example.com
dig example.com
```
We use these to verify if a hostname resolves to the correct IP address, check DNS server responses, and troubleshoot website accessibility issues.

<br>

## Log Monitoring

Logs are the system's diary, providing crucial information about events, errors, and warnings. Real-time log monitoring is like having a direct feed into the system's consciousness.

### 1. `tail -f /path/to/log/file`: Live Log Follow

The `tail -f` command is our primary tool for real-time log monitoring. The `-f` (follow) option keeps the file open and continuously displays new lines as they are added.

```bash
tail -f /var/log/syslog
tail -f /var/log/apache2/error.log
```
We constantly use this when troubleshooting an application, installing new software, or monitoring security events. It lets us see exactly what's happening as it happens.

### 2. `journalctl -f`: Systemd's Log View

On modern Linux distributions that use systemd (like Ubuntu, CentOS 7+, Fedora), `journalctl` is the command for querying and viewing the systemd journal, which aggregates logs from various sources.

```bash
journalctl -f
```
The `-f` (follow) option here also provides a live stream of journal entries. `journalctl` offers powerful filtering options (e.g., by service, time range) which we explore as we become more adept.

### 3. `dmesg | tail`: Kernel Messages

`dmesg` (display message) shows the kernel ring buffer, which contains messages from the Linux kernel. These messages relate to hardware detection, driver issues, and critical system events during boot and runtime.

```bash
dmesg | tail
```
We often pipe `dmesg` to `tail` to see the most recent kernel messages, especially after a reboot or when troubleshooting hardware problems.

## Conclusion

System monitoring is not just a collection of commands; it's a mindset. It's our proactive approach to keeping Linux systems healthy, performant, and secure. From the high-level summary of `top` to the granular details of `iostat` and the real-time narrative of `tail -f`, each tool plays a vital role in our daily routines.

<br>

> *Stuck ?*  
> [Video Tutorial](https://www.youtube.com/watch?v=GAFcsKzHLIc)


<br>
<br>

[home](https://mc095.github.io/page3/)