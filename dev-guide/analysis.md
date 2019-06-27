---
layout: index
title: GCAM Analysis Tools
gcam-version: v5.1
---
## GCAM Analysis Tools

The GCAM ecosystem of models and tools provides several options for interfacing with GCAM and run outputs.  The following are a list of resources and tools with their descriptions and use cases created for the GCAM user community:

### Extraction tools

#### `rgcam`

`rgcam` is an R package provides functions for extracting data from GCAM output databases.  The central concept in `rgcam` is the "project data file", which contains an R-native representation of selected queries for one or more scenarios. The package provides functions to run the GCAM Model Interface to extract data and add the results to a new or existing project data file, as well as to manage previously created project data.

_Repository_:  https://github.com/JGCRI/rgcam

#### `gcam_reader`

`gcam_reader` is a Python package similar to `rgcam` that provides functions for extracting data from GCAM output databases.

_Repository_:  https://github.com/JGCRI/gcam_reader

#### `modelinterface`

The `modelinterface` is distributed with GCAM as the default tool for generating XML inputs and viewing results from an XML GCAM output database.  

_Repository_:  https://github.com/JGCRI/modelinterface


### Execution and analysis tools

#### `pygcam`

The `pygcam` package comprises a set of Python modules and a main driver script designed to facilitate a more efficient workflow using GCAM.  The tools are intended to meet the needs of different types of users, from basic users who just want to run the model, to “power” users interested in writing custom scripts, to software developers wanting to write new tools like graphical user interfaces for working with GCAM.

_Repository_:  https://github.com/JGCRI/pygcam

_Read the Docs_:  https://pygcam.readthedocs.io/en/latest/intro.html
