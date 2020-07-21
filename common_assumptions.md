---
layout: index
title: Common Assumptions
prev: diagram.html
next: inputs_demand.html
gcam-version: v5.3 
---

These assumptions are shared throughout the GCAM model.

## Regional Resolution

### Geopolitical Regions

### Water Basins

### Global Land Units

For GCAM3.0 through GCAM4.4, the Agriculture and Land Use model subdivided the GCAM geopolitical regions into as many as 18 climatically defined agro-ecological zones (AEZs) developed by the GTAP group. GCAM5+ switches subregions to water basin-defined geographic land units (GLUs). The land data system files are produced by the [Moirai](https://github.com/JGCRI/moirai), described in Di Vittorio et al. (2016). 


## Temporal Resolution

### Historical Years

The GCAM data system can produce such data sets annually beginning in 1971. Currently, GCAM uses data from 1990, 2005, 2010, and 2015 to initialize the model, but could be initialized to any year beginning in 1971.

### Future Years

Currently, GCAM models the future from 2020 to 2100 in 5 year time steps. The time step is variable and can be changed in [the data system](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/constants.R). 