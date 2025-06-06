---
layout: post
title: "Linux File System"
date: 2025-05-18
excerpt: "This post provides a comprehensive overview of the Linux file system hierarchy, detailing the structure, purpose, and significance of key directories, enabling effective navigation and management of files within a Linux environment."
---

Unlike Windows with its drive letters (C:, D:, etc.), Linux organizes everything under a single root directory (`/`). This might seem a bit strange at first, but trust me, there's a logical and well-thought-out reason for this organization.

<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="https://media.geeksforgeeks.org/wp-content/uploads/20231031164439/Unix-File-System.png" alt="os-1" style="width: 100%;" />
  <span style="margin-top: 8px; font-style: italic; color: #555;">Figure 1: Linux Folder Structure</span>
</div>

In this blog post, we will discuss through the essential directories you'll find in a typical Linux system. We'll explore why each folder exists, what kind of files it usually contains, and why this hierarchical structure is actually quite powerful and efficient. Think of it as learning the layout of a new city – once you understand the main districts, navigating becomes much easier!

**Why everything under `/` ?**

The single root directory (`/`) in Linux is a fundamental design principle that promotes a unified and consistent way of accessing all files and resources on the system. Here's why this approach is beneficial:

* **Everything is a File:** In Linux, the philosophy is that "<mark>everything is a file.</mark>" This includes not just regular documents and applications but also hardware devices, processes, and even network sockets. The file system acts as a central point for accessing all these resources. Directories are simply special files that contain references to other files (including other directories).

* **Logical Organization:** The hierarchical structure under the root directory provides a logical way to organize different types of files and data. This makes it easier for both the system and users to locate specific files and understand their purpose. It's like organizing a house into different rooms based on their function (e.g., kitchen for cooking, bedroom for sleeping).

* **Mount Points: Integrating Storage:** When you add new storage devices to a Linux system (like a USB drive or an external hard drive), you don't get a new drive letter. Instead, you `mount` the file system of that device onto an existing directory within the main Linux file system tree. This makes the contents of the new storage device accessible as if they were part of the main system's file structure. Think of it as adding a new bookshelf to our existing library – the books on the new shelf are still part of the same overall collection.


<div style="display: flex; flex-direction: column; align-items: center;">
  <img src="/assets/blog/2025-05-18-linux-file-system/1.png" alt="os-1" style="width: 70%;" />
  <span style="margin-top: 8px; font-style: italic; color: #555;">Figure 2: Linux vs Windows File System</span>
</div>

<br>
<h3 style="text-decoration: underline;" > Essential Linux Directories Explained</h3>

Let's explore the most important directories we'll encounter under the root (`/`) directory:

```bash
> [ganesh@Ganesh-PC /]$ ls
  afs  boot  etc   init  lib64       media  opt   root  sbin  sys  usr
  bin  dev   home  lib   lost+found  mnt    proc  run   srv   tmp  var
```

**1. `/boot`: The System's Starting Point (Less Relevant in Containers)**

```bash
[ganesh@Ganesh-PC /]$ ls /boot
efi  grub2
```

* **Why it exists:** This directory holds all the essential files needed to boot our Linux system. Think of it as the launchpad for our operating system.
* **What we'll find:**
    * **Kernel Images (`vmlinuz-*`):** These are the actual files containing the Linux kernel, the core of the operating system.
    * **Initial RAM Disk Images (`initrd.img-*` or `initramfs-*`):** These are temporary file systems that contain essential drivers and utilities needed during the early stages of the boot process, before the main file system is mounted.
    * **Bootloader Configuration (`grub/` or `systemd/`):** This directory contains the configuration files for our bootloader (like GRUB), which is the first program that runs after the BIOS/UEFI and allows you to choose which operating system to boot (if you have multiple installed).
* **Why we need to know:** While we won't typically modify files in `/boot` directly, understanding its purpose is crucial for troubleshooting boot-related issues. In containerized environments, the boot process is often handled by the host system, making this directory less significant within the container itself.

**2. `/usr`: Userland's Domain (Where Applications Live)**

```bash
[ganesh@Ganesh-PC /]$ ls /usr
bin  games  include  lib  lib64  libexec  local  sbin  share  src  tmp
```

* **Why it exists:** The `/usr` directory is a major branch of the file system tree and contains the majority of user-installed applications, libraries, documentation, and other read-only data. It's designed to be shareable across multiple users on the system. Think of it as the main application and resource center.
* **Key subdirectories:**
    * `/usr/bin`: Contains most of the executable programs that users typically run (e.g., `ls`, `grep`, `nano`).
    * `/usr/sbin`: Contains system administration and other privileged executable programs (e.g., `useradd`, `ifconfig`). These usually require root privileges to run.
    * `/usr/lib` (or `/usr/lib64` on 64-bit systems): Holds shared libraries ( `.so` files) that are used by many different programs. These are like reusable code modules.
    * `/usr/share`: Contains architecture-independent data such as documentation (`/usr/share/doc`), man pages (`/usr/share/man`), and icons (`/usr/share/icons`).
* **Why we need to know:** We'll frequently interact with programs located in `/usr/bin`. Understanding that user-installed applications generally reside under `/usr` helps in locating them.

**3. `/var`: Variable Data's Home (Logs, Caches, and More)**

```bash
[ganesh@Ganesh-PC /]$ ls /var
adm    crash  empty  games     lib    lock  mail  opt       run    tmp
cache  db     ftp    kerberos  local  log   nis   preserve  spool  yp
```

* **Why it exists:** The `/var` directory is where files that are expected to change frequently are stored. This includes logs, caches, [spool directories](https://www.lenovo.com/in/en/glossary/what-is-spool-folder/?orgRef=https%253A%252F%252Fwww.google.com%252F) (for printing or email), and temporary files that persist across reboots. Think of it as the system's constantly changing storage area.
* **Key subdirectories:**
    * `/var/log`: Contains system log files that record various events, errors, and activities. This is our go-to place for troubleshooting system issues.
    * `/var/cache`: Stores cached data for applications. Caching helps speed up application loading times.
    * `/var/spool`: Holds data that is waiting to be processed, such as print jobs (`/var/spool/cups`) or email queues (`/var/spool/mail`).
    * `/var/tmp`: Similar to `/tmp` but files here might persist across reboots (though they can still be deleted by system maintenance tasks).
* **Why we need to know:** we'll often need to check log files in `/var/log` for troubleshooting. Understanding that frequently changing data resides in `/var` is important for system administration.

**4. `/etc`: The Configuration Central**

```bash
[ganesh@Ganesh-PC /]$ ls /etc
adjtime            glvnd            libssh                             polkit-1          subgid
aliases            gnupg            libuser.conf                       popt.d            subgid-
alsa               GREP_COLORS      locale.conf                        printcap          subuid
alternatives       groff            localtime                          profile           subuid-
ansible            group            login.defs                         profile.d         sudo.conf
asound.conf        group-           logrotate.d                        protocols         sudoers
audit              grub.d           machine-id                         pulse             sudoers.d
bash_completion.d  gshadow          machine-info                       rc.d              sudo-ldap.conf
bashrc             gshadow-         magic                              rc.local          swid
binfmt.d           gss              makedumpfile.conf.sample           redhat-release    sysconfig
cloud              host.conf        mke2fs.conf                        request-key.conf  sysctl.conf
cockpit            hostname         modprobe.d                         request-key.d     sysctl.d
crypto-policies    hosts            modules-load.d                     resolv.conf       systemd
csh.cshrc          ImageMagick-6    motd                               rhc               system-release
csh.login          inittab          motd.d                             rhsm              system-release-cpe
dbus-1             inputrc          mtab                               rpc               terminfo
dconf              insights-client  nanorc                             rpm               timezone
default            iproute2         NetworkManager                     rsyslog.d         tmpfiles.d
depmod.d           issue            networks                           rwtab.d           tpm2-tss
dhcp               issue.d          nsswitch.conf                      sasl2             trusted-key.key
dnf                issue.net        nsswitch.conf.bak                  security          udev
dracut.conf        kdump            openldap                           selinux           UPower
dracut.conf.d      kdump.conf       opt                                services          virc
egl                kernel           osbuild-subscription-register.env  sestatus.conf     w3m
environment        keys             os-release                         setroubleshoot    wgetrc
ethertypes         keyutils         ostree                             sgml              wireplumber
exports            krb5.conf        PackageKit                         shadow            wsl.conf
favicon.png        krb5.conf.d      pam.d                              shadow-           X11
filesystems        ld.so.cache      papersize                          shells            xattr.conf
flatpak            ld.so.conf       passwd                             skel              xdg
fonts              ld.so.conf.d     passwd-                            sos               xml
fuse.conf          libaudit.conf    pkcs11                             ssh               yum
gcrypt             libpaper.d       pki                                ssl               yum.conf
geoclue            libreport        pm                                 statetab.d        yum.repos.d
[ganesh@Ganesh-PC /]$
```

* **Why it exists:** The `/etc` directory is the central location for most system-wide configuration files. These files control the behavior of the operating system and various applications. Think of it as the system's control panel.
* **What we'll find:** Numerous configuration files in plain text format (making them relatively easy to read and edit, though be careful!). Examples include network configuration (`/etc/network/interfaces`), user account information (`/etc/passwd`, `/etc/shadow`), system startup scripts (`/etc/init.d/` or `/etc/systemd/system/`), and configuration files for various installed applications (often in subdirectories within `/etc`).
* **Why we need to know:** we'll frequently need to edit configuration files in `/etc` to customize our system and applications. Always make backups before modifying these files!

**5. `/home`: Our Personal Space**

```bash
[ganesh@Ganesh-PC /]$ ls /home
cloud-user  ganesh
```

* **Why it exists:** The `/home` directory is the default location for user home directories. Each regular user on the system typically has their own subdirectory within `/home` (e.g., `/home/ourusername`). This is where users store their personal files, documents, downloads, and user-specific application settings. Think of it as each user's private room.
* **What we'll find:** A subdirectory for each user account. Inside a user's home directory, you'll typically find standard user directories like `Documents`, `Downloads`, `Pictures`, `Music`, and often hidden configuration directories for individual applications (usually starting with a dot, like `.config` or `.mozilla`).
* **Why we need to know:** This is where we'll spend most of our time as a regular user, managing our personal files.

**6. `/opt`: Optional Add-ons**


* **Why it exists:** The `/opt` directory is traditionally used for installing optional or third-party software packages that are not part of the standard distribution repositories. Think of it as a place for installing extra tools that aren't part of the main set.
* **What we'll find:** Often, applications installed in `/opt` will reside in their own subdirectory (e.g., `/opt/google/chrome`).
* **Why we need to know:** If we install software manually from a vendor's website (not through the package manager), it might end up in `/opt`.

**7. `/srv`: Service Data (Less Common in Containers)**



* **Why it exists:** The `/srv` directory is intended to hold data served by the system, such as website files for a web server (`/srv/www`) or FTP server data (`/srv/ftp`). Think of it as the storage for services provided by the system.
* **Why we need to know:** If we're running a server on our Linux machine, we might interact with `/srv`. In containerized environments, services often manage their data within the container's own file system, making `/srv` less commonly used.

**8. `/root`: The Administrator's Home**

* **Why it exists:** `/root` is the home directory for the root user, the superuser with administrative privileges. It's kept separate from other user home directories for security reasons. Think of it as the administrator's secure control center.
* **Why we need to know:** we'll only access `/root` when we are logged in as or using `sudo` to execute commands as the root user.

**9. `/tmp`: Temporary Playground**

```bash
[root@Ganesh-PC /]# ls /tmp
systemd-private-eaad43aaa5a640f087ddc948984d6ff0-dbus-broker.service-VR3NvN     tmpf6nkeef5
systemd-private-eaad43aaa5a640f087ddc948984d6ff0-systemd-logind.service-1RC0c0
```

* **Why it exists:** The `/tmp` directory is used for storing temporary files that are typically deleted when the system is rebooted. Applications often use `/tmp` to store temporary data during their operation. Think of it as a temporary scratchpad.
* **Why we need to know:** we might occasionally need to clear out `/tmp` if we're running low on disk space, though modern systems usually handle this automatically.

**10. `/run`: Runtime Data**

```bash
[root@Ganesh-PC /]# ls /run
lock  mount  shm  sudo  user  WSL
```

* **Why it exists:** The `/run` directory (which replaced `/var/run` on many modern systems) stores volatile runtime data for running processes. This includes things like process IDs (PIDs), sockets, and other transient information. Think of it as the system's in-memory workspace for active processes.
* **Why we need to know:** we won't typically interact with `/run` directly as a regular user.

**11. `/proc` and `/sys`: Virtual Worlds**


```bash
[root@Ganesh-PC /]# ls /proc
1    75         config.gz  driver       irq          kpagecount  modules       self         timer_list
10   76         consoles   execdomains  kallsyms     kpageflags  mounts        softirqs     tty
101  acpi       cpuinfo    filesystems  kcore        loadavg     mtrr          stat         uptime
11   buddyinfo  crypto     fs           keys         locks       net           swaps        version
12   bus        devices    interrupts   key-users    mdstat      pagetypeinfo  sys          vmallocinfo
69   cgroups    diskstats  iomem        kmsg         meminfo     partitions    sysvipc      vmstat
7    cmdline    dma        ioports      kpagecgroup  misc        schedstat     thread-self  zoneinfo
[root@Ganesh-PC /]# ls /sys
block  bus  class  dev  devices  firmware  fs  kernel  module
```

* **Why they exist:** `/proc` and `/sys` are special virtual file systems. They don't actually store files on our hard drive. Instead, they provide a way to access information about running processes (`/proc`) and the kernel and hardware (`/sys`). Think of them as live information dashboards.
* **Why we need to know:** These directories are invaluable for system monitoring and debugging. For example, we can find information about a specific process by looking at its directory under `/proc`.

**12. `/dev`: The Device Manager**

```bash
[root@Ganesh-PC /]# ls /dev
autofs           fuse   loop1         nvram  ram15   sdb     tty10  tty21  tty32  tty43  tty54  tty8     vcsu1
block            hvc0   loop2         ppp    ram2    sdc     tty11  tty22  tty33  tty44  tty55  tty9     vfio
bsg              hvc1   loop3         ptmx   ram3    sg0     tty12  tty23  tty34  tty45  tty56  ttyS0    vhost-net
btrfs-control    hvc2   loop4         ptp0   ram4    sg1     tty13  tty24  tty35  tty46  tty57  ttyS1    vport0p0
bus              hvc3   loop5         pts    ram5    sg2     tty14  tty25  tty36  tty47  tty58  ttyS2    vport0p1
console          hvc4   loop6         ram0   ram6    shm     tty15  tty26  tty37  tty48  tty59  ttyS3    vsock
cpu_dma_latency  hvc5   loop7         ram1   ram7    stderr  tty16  tty27  tty38  tty49  tty6   urandom  zero
cuse             hvc6   loop-control  ram10  ram8    stdin   tty17  tty28  tty39  tty5   tty60  vcs
dri              hvc7   mapper        ram11  ram9    stdout  tty18  tty29  tty4   tty50  tty61  vcs1
dxg              kmsg   mem           ram12  random  tty     tty19  tty3   tty40  tty51  tty62  vcsa
fd               kvm    net           ram13  rtc0    tty0    tty2   tty30  tty41  tty52  tty63  vcsa1
full             loop0  null          ram14  sda     tty1    tty20  tty31  tty42  tty53  tty7   vcsu
```

* **Why it exists:** The `/dev` directory contains special files called device files. These files represent hardware devices connected to our system, such as hard drives (`/dev/sda`, `/dev/sdb`), USB drives (`/dev/sdb1`), and even virtual devices like `/dev/null` (a black hole for data) and `/dev/random` (a source of random numbers). Remember our earlier point about "everything is a file"? This is a prime example!
* **Why we need to know:** we'll interact with `/dev` indirectly when we mount or unmount storage devices.

**13. `/mnt` and `/media`: Mounting Points**

```bash
[root@Ganesh-PC /]# ls /mnt
c  e  f  wsl  wslg
```
(Since this is WSL, it will display windows drives)

* **Why they exist:** These directories are used as mount points for external file systems. `/mnt` is traditionally used for manually mounted file systems, while `/media` is often used as the automatic mount point for removable media like USB drives and CDs/DVDs. Think of them as temporary docking stations for external storage.
* **`/data` (in our container example):** In our specific container setup, `/data` is likely a **mount point** that we explicitly created to link a folder on our Windows host system (`C:/ubuntu-data`) into the container's file system. This allows we to share files between our Windows environment and our Linux container.

**Navigating the Linux Landscape:**

Understanding this fundamental folder structure is a key step in becoming comfortable with Linux. While it might seem like a lot at first, with a little exploration, we'll start to recognize the purpose of each directory and how they all fit together under the single root (`/`). It's a logical and efficient system that, once we grasp it, makes managing our Linux environment much easier. So, go ahead, open up our terminal and start exploring the branches of our Linux file system tree!

**Things to Remember :**
- `/ (root)`: The primary hierarchy for the entire file system.
- `/boot`: Contains files needed to boot the system.
- `/dev`: Contains device files that represent hardware components.
- `/usr`: Contains user-related programs and data.
- `/bin`: Contains essential user binaries (commands).
- `/sbin`: Contains essential system binaries (commands).
- `/home`: Contains home directories for users.
- `/lib`: Contains essential shared libraries for system binaries.
- `/tmp`: Contains temporary files.
- `/var`: Contains variable data like logs and caches.
- `/etc`: Contains system-wide configuration files.
- `/proc`: Contains virtual files that represent system and process information.
- `/usr/local`: Contains user-installed software.
- `/home/bob` and `/home/alice`: Home directories for users Bob and Alice.

<br>

[home](https://mc095.github.io/)