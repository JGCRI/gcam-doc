---
layout: index
title: GCAM Ecosystem of Models and Tools
gcam-version: v5.4
devguide: dev-guide.html
---
## GCAM Ecosystem of Models and Tools

The GCAM ecosystem of models and tools provides a suite of options for interfacing with GCAM inputs and outputs.  The following are a list of models and tools created for the GCAM user community with their descriptions and location:


### Extraction and formatting

#### `rgcam`

`rgcam` is an R package provides functions for extracting data from GCAM output databases.  The central concept in `rgcam` is the "project data file", which contains an R-native representation of selected queries for one or more scenarios. The package provides functions to run the GCAM Model Interface to extract data and add the results to a new or existing project data file, as well as to manage previously created project data.

_Repository_:  https://github.com/JGCRI/rgcam

#### `gcam_reader`

`gcam_reader` is a Python package similar to `rgcam` that provides functions for extracting data from GCAM output databases.

_Repository_:  https://github.com/JGCRI/gcam_reader

#### `modelinterface`

The `modelinterface` is distributed with GCAM as the default tool for generating XML inputs and viewing results from an XML GCAM output database.  

_Repository_:  https://github.com/JGCRI/modelinterface

#### `gcamrpt`

The `gcamrpt` R package provides functions for converting GCAM output into the format used by most IAM experiments to enter results into their databases. Users provide a table of desired outputs, along with options (such as filtering and aggregation), and the package runs the necessary GCAM queries (no more than once per query) and passes the results to the functions that produce the output.

_Repository_:  https://github.com/JGCRI/gcamrpt


### Execution and workflow

#### `pygcam`

The `pygcam` package comprises a set of Python modules and a main driver script designed to facilitate a more efficient workflow using GCAM.  The tools are intended to meet the needs of different types of users, from basic users who just want to run the model, to “power” users interested in writing custom scripts, to software developers wanting to write new tools like graphical user interfaces for working with GCAM.

_Repository_:  https://github.com/JGCRI/pygcam
_Read the Docs_:  https://pygcam.readthedocs.io/en/latest/intro.html


### Data development

#### `gcamdata`

The increasing data requirements of complex models demand robust, reproducible, and transparent systems to track and prepare models’ inputs. The `gcamdata` R package processes raw inputs to produce the hundreds of XML files needed by GCAM.

_Repository_:  https://github.com/JGCRI/gcamdata

#### `moirai`

The `moirai` Land Data System (Moirai LDS) is designed to produce recent historical land data inputs for the AgLU module of GCAM data system1, but the Moirai LDS outputs could also be used by other models/applications. The `moirai` are the Greek Fates, and this software is named Moirai to represent the fundamental influence of land data inputs on model outcomes. The primary function of the Moirai LDS is to combine spatially explicit input data (e.g., raster images) with tabular input data (e.g., crop price table) to generate tabular output data for a suite of variables. Some of these outputs replace the data provide by the Global Trade Analysis Project (GTAP), and other data replace and augment the original GCAM GIS processing. The Moirai LDS output data are aggregated by Geographic Land Unit (GLU)2 within each country. The GLU coverage is an input to the Moirai LDS (as a thematic raster image and an associated CSV file that maps the thematic integers to names), and the GLU boundaries can be determined arbitrarily. Previous versions of GCAM (and Moirai LDS) used only bioclimatic Agro-Ecological Zones (AEZs) and corresponding data that were provided by GTAP, as the GLUs. As a result, some AEZ terminology still exists in the code, but this terminology now refers more generally to GLUs. The Moirai LDS now enables any set of boundaries to be used as GLUs (including AEZs), allowing for more flexible generation of land use region boundaries (defined as the intersection of GLUs with geopolitical regions). The current default set of GLUs is the same set of 235 global watersheds as used by the GCAM water module. The GCAM 5.1 geopolitical regions (32 or 14) are included and used as inputs to Moirai to generate a mapping file between the Moirai outputs, which are at the level of the intersection between the GLUs and the country boundaries, and the geopolitical regions. The diagnostics scripts use this geopolitical region mapping in some cases. Moirai can also recalibrate three of the outputs (crop production, harvested area, and land rent) to a specified year that is the center of a five-year averaging window. No recalibration retains the circa 2000, 7-year average of the source data. The cucrrency-year for land rent can also be specified, and the default is 2001 to match the GTAP data.

_Repository_:  https://github.com/JGCRI/moirai


### Single system

#### `hector`

`hector` is an open source, object-oriented, simple global climate carbon-cycle model. It runs essentially instantaneously while still representing the most critical global scale earth system processes, and is one of a class of models heavily used for for emulating complex climate models and uncertainty analyses.

_Repository_:  https://github.com/JGCRI/hector

#### `xanthos`

`xanthos` is an open-source hydrologic model, written in Python, designed to quantify and analyze global water availability. `xanthos` simulates historical and future global water availability on a monthly time step at a spatial resolution of 0.5 geographic degrees. `xanthos` was designed to be extensible and used by scientists that study global water supply and work with GCAM. Xanthos uses a user-defined configuration file to specify model inputs, outputs and parameters. `xanthos` has been tested using actual global data sets and the model is able to provide historical observations and future estimates of renewable freshwater resources in the form of total runoff, average streamflow, potential evapotranspiration, actual evapotranspiration, accessible water, hydropower potential, and more.

_Repository_:  https://github.com/JGCRI/xanthos

#### `persephone`

Future changes in Earth system state will impact agricultural yields and, through these changed yields, can have profound impacts on the global economy. Global gridded crop models estimate the influence of these Earth system changes on future crop yields but are often too computationally intensive to dynamically couple into global multi-sector economic models, such as GCAM and other similar-in-scale models. Yet, generalizing a faster site-specific crop model's results to be used globally will introduce inaccuracies, and the question of which model to use is unclear given the wide variation in yield response across crop models. To examine the feedback loop among socioeconomics, Earth system changes, and crop yield changes, rapidly generated yield responses with some quantification of crop response uncertainty are desirable. The Persephone v1.0 response functions presented in this work are based on the Agricultural Model Intercomparison and Improvement Project (AgMIP) Coordinated Climate-Crop Modeling Project (C3MP) sensitivity test data set and are focused on providing GCAM and similar models with a tractable number of rapid to evaluate dynamic yield response functions corresponding to a range of the yield response sensitivities seen in the C3MP data set. With the Persephone response functions, a new variety of agricultural impact experiments will be open to GCAM and other economic models: for example, examining the economic impacts of a multi-year drought in a key agricultural region and how economic changes in response to the drought can, in turn, impact the drought.

_Repository_:  https://github.com/JGCRI/persephone

#### `gcamfd`

`gcamfd` calculates food demand using the Edmonds et. al model.  The Edmonds model divides food consumption into two categories, staples, which represent basic foodstuffs, and nonstaples, which represent higher-quality foods. Demand for staples increases at low income, but eventually peaks and begins to decline with higher income. Demand for nonstaples increases with income over all income ranges; however, total (staple + nonstaple) demand saturates asymptotically at high income.

_Repository_:  https://github.com/JGCRI/food-demand

#### `gcamland`

`gcamland` replicates the land allocation decisions made in GCAM (https:://github.com/jgcri/gcam-core). The equations are documented in Wise et al. (2014). `gcamland` takes in prices and agricultural productivity growth and calculates land allocation. The model can operate in either hindcast (1975-2010) or future mode (2010-2100), running either single simulations or large ensembles.

_Repository_:  https://github.com/JGCRI/gcamland


### Disaggregation

#### `tethys`

`tethys` is a spatiotemporal downscaling model for global water withdrawal from GCAM water demand outputs.  This model was created to link `xanthos` (a global hydrologic modeling framework) and GCAM.  The main objective of `tethys` is to downscale GCAM water demand outputs into monthly gridded (0.5-degree) data by domestic, electricity,  irrigation, livestock, manufacturing, and mining sectors.

_Repository_:  https://github.com/JGCRI/tethys

#### `demeter`

`demeter` is a land-use and land-cover disaggregation and change detection model built to downscale GCAM land allocation outputs to a user-desired gridded resolution.  Projected land allocation from GCAM is traditionally transferred to Earth System Models (ESMs) in a variety of gridded formats and spatial resolutions as inputs for simulating biophysical and biogeochemical fluxes. Existing tools for performing this translation generally require a number of manual steps which introduces error and is inefficient. Demeter makes this process seamless and repeatable by providing gridded land-use and land-cover change (LULCC) products derived directly from GCAM in a variety of formats and resolutions commonly used by ESMs. Demeter is publicly available via GitHub and has an extensible output module allowing for future ESM needs to be easily accommodated.

_Repository_:  https://github.com/IMMM-SFA/demeter


### Statistical Emulators

#### `fldgen`

The `fldgen` R package provides functions to learn the spatial, temporal, and inter-variable correlation of the variability in an earth system model (ESM) and generate random two-variable fields (e.g., temperature and precipitation) with equivalent properties.

_Repository_:  https://github.com/JGCRI/fldgen


### Visualization

#### `gcammaptools`

The `gcammaptools` package provides functions for plotting GCAM data on world or regional maps. This includes functions for making plots for regional or gridded data, as well as default projection and theme settings that provide a house style for GCAM plots.

_Repository_:  https://github.com/JGCRI/gcammaptools

#### `GCAM-LAC-dashboard`

The GCAM Dashboard is a scenario explorer for GCAM. Its purpose is to provide a way to give users a quick view of the data in a collection of scenarios. You can get a listing of the scenarios in a data set and the queries available for each scenario, or available jointly for a collection of scenarios. You can plot the queries for a single scenario in a map view or over time, or you can plot the difference in output values between two scenarios in either of the same two views.

_Repository_:  https://github.com/JGCRI/GCAM-LAC-dashboard


### Integration

#### `cassandra`

Cassandra is a coupling framework for scientific models that tracks model dependencies and automates the running of multiple interconnected models.

_Repository_:  https://github.com/JGCRI/cassandra


### General

#### `rgis`

The `rgis` R package facilitates GIS functionality and workflows commonly represented in proprietary and open source GISs. This package does not contain functionality for visualization, but is focused on geospatial algorithms for analysis, conversion, IO, modification, and workflows of spatial files and data structures.

_Repository_:  https://github.com/JGCRI/rgis

#### `pygis`

The `pygis` Python package facilitates GIS functionality and workflows commonly represented in proprietary and open source GISs. This package does not contain functionality for visualization, but is focused on geospatial algorithms for analysis, conversion, IO, modification, and workflows of spatial files and data structures.

_Repository_:  https://github.com/JGCRI/pygis
