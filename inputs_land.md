---
layout: index
title: Inputs for the Land Model
prev: diagram.html
next: land.html
gcam-version: v5.3 
---

GCAM's land inputs include information on land, carbon, other emissions, and the value of unmanaged land in the historical period. The GCAM data system can produce such data sets annually beginning in 1971. Currently, GCAM uses data from 1990, 2005, 2010, and 2015 to initialize the model, but could be initialized to any year beginning in 1971.

## Raw Inputs

### Description

<dl>
<dt>Historical Land Cover and Use</dt> <dd>Inputs include land cover and land use for each of the GCAM land types and AgLU regions. We use information beginning in 1700 in order to spin-up the carbon cycle within GCAM. Currently, we use information from <a href="https://github.com/JGCRI/moirai">Moirai</a> aggregated to the GCAM regions.</dd>

<dt>Terrestrial Carbon Information</dt> <dd>Inputs include potential vegetation and soil carbon density (i.e., carbon density if the land grew to equilibrium) and a mature age. Currently, we derive vegetation carbon densities for crops from the FAO computed crop yield. All other carbon densities and mature ages come from Houghton (1999) and King (1997).</dd>

<dt>Other Historical Emissions</dt> <dd>Inputs include emissions of all non-CO<sub>2</sub> gases and species for each year and region. Data for BC and OC is from the RCP inventory (Lamarque et al., 2011). Data for all other gases and species is from EDGAR (European Commission, 2010).</dd>

<dt>Value of Unmanaged Land</dt> <dd>GCAM requires profit rates for all land types in the historical period for calibration. Managed land profit is calculated in the <a href="inputs_supply.html">supply model</a>. For unmanaged land, however, the value is input into the model. Currently, GCAM uses information from GTAP.</dd>
</dl><br/>

### Input Data

#### Historical Land Cover and Use

#### Terrestrial Carbon Information

#### Other Historical Emissions

#### Value of Unmanaged Land

## Processing of Inputs


## Modifying Inputs
