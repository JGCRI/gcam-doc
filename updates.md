---
layout: index
title: Recent updates
prev: fusion.html
next: 
gcam-version: v5.1 
---

Several changes have been made to GCAM since the last release version (v4.4). The key updates are:
1. Water demands are now included (see [Water Demand](#water-demand))
2. Land use regions are now based on water basins (see [Land Regions](#land-regions))
3. Multiple agricultural management practices are included (see [Agricultural Management](#agricultural-management))
4. The GCAM Shared Socioeconomic Pathways are included (see [SSPs](#ssps))
5. A newer version of Hector is included (see [Hector](#hector))
6. Update to a new data system (see [Data System](#data-system))
7. Updated land use-land cover history (see [Land History](#land-history))
8. Model Interface bug fixes and support for Java 9/10.

The sections below provide short summaries of all changes.

## Water Demand
GCAM5.1 represents demand for water by sector and technology, including both water withdrawals and water consumption.

## Land Regions
GCAM5.1 switches land use regions from climatically defined agro-ecological zones (AEZs) developed by the GTAP group to water basin-defined geographic land units (GLUs), developed in house. 

## Agricultural Management
GCAM5.1 endogenizes yields and fertilizer application rates, making these levels each a function of crop prices, production costs, and other contributors to modeled land profit rates. This is achieved by nesting four different crop technologies within the logit structure (irrigated/hi fertilizer, irrigated/lo fertilizer, rainfed/hi fertilizer, rainfed/lo fertilizer).

## SSPs
GCAM5.1 includes the ability to model five alternative Shared Socioeconomic Pathways, as described in [Calvin et al. (2017)](https://www.sciencedirect.com/science/article/pii/S095937801630084X).

## Hector
GCAM5.1 includes [Hector v2.0](https://github.com/JGCRI/hector), which (1) adds a better representation of oceanic heat uptake, (2) simulates the temperature response from volcanic forcings in the historical period, and (3) addresses odd results found in the impulse response experiments.

## Data System
GCAM converts the system for processing GCAM inputs into an R package using clean, consistent, well-documented code. The data system is available on [github](https://github.com/JGCRI/gcamdata).

## Land History
GCAM5.1 updates the land use and land cover history to use outputs from [Moirai](https://github.com/JGCRI/moirai).
