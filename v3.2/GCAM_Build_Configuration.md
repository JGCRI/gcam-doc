---
layout: index
title: GCAM Build Configuration
prev: 
next:
gcam-version: v3.2 
---

The GCAM build configuration file is called `configure.gcam`. It is
located in the `cvs/objects/build/linux` subdirectory of the main user
workspace. This file contains a variety of options that must be
configured at compile time. Because these options affect the way the
GCAM source is compiled, if you change any of them you will generally
need to run `make clean` followed by `make gcam` to do a complete
rebuild. Failing to do so will usually produce a GCAM executable that
doesn't work.

Compiler Options
----------------

These options are used to select the compiler to use to build GCAM and
the options to pass to the compiler. Currently the build process has
been tested only with the GNU compiler suite (gcc/g++). 

GCAM Optional Features
----------------------

The options in this section enable or disable certain advanced
features in the code. The features currently available are parallel
execution and LAPACK linear algebra routines.

Environment Settings
--------------------

The environment settings tell the system where to find the external
libraries needed by GCAM. They are processed in `configure.gcam`,
though they are actually set through environment variables. This
section describes the environment variables that can be set to control
this configuration. 
