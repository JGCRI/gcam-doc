---
layout: index
title: Getting Started
gcam-version: v5.1
---
## Getting Started

This guide provides information on how to develop GCAM, including the process for adding to the GCAM repository and requirements (e.g., naming convention for branches).

### Step-by-step guide

1. Clone the GCAM repository (internal developers should clone from stash.pnnl.gov, external developers should clone from github.com/jgcri/gcam-core)
2. Create a new branch (see the guide below for how to name your branch)
3. Make your changes 
4. Commit your changes (see the advice below for commits)
5. Push your changes (see the advice below for how often to push)
6. When your development is complete, open a pull request.

### Branch naming guide

Branches should be named as follows \[your initials\]/\[type of branch\]/\[meaningful name\]

The possible options for \[type of branch\] include:

1. "feature" if you are adding a new major feature to GCAM 
2. "bugfix" if you are making a minor change to GCAM 
3. "paper" if you are documenting a paper – note these changes may or may not go into the core 

### General Advice

* Smaller changes are easier to review. Consider breaking a very large development into several smaller incremental pull requests.
* Pushing your changes is a way of backing up your work. More frequent pushing is recommended.
