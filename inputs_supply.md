---
layout: index
title: Inputs for Modeling Supply
prev: diagram.html
next: supply_land.html
gcam-version: v5.3 
---

GCAM's supply inputs include information on production, prices, technology cost and performance, and other emissions in the historical period in order to calibrate model parameters. In addition, GCAM's supply modeling requires information on future technology cost and performance and emissions factors for future periods. GCAM requires that supply data is globally consistent with [demand data](inputs_demand.html) for each of its historical model periods as it solves for market equilibrium in these years as it does for future years. These inputs are required for each [region](common_assumptions.html#regional-resolution) and [historical year](common_assumptions.html#historical-years).

QUESTION: Should we move the historical year to a separate page that is linked to?
TODO: This page currently only includes text copied from AgLU. Much more work needs to be done.

## Raw Inputs

### Description

#### Food, Feed, and Forestry

<dl>
<dt>Historical Production</dt> <dd>Inputs include historical production of all crops and forestry products for each of the AgLU regions for the model base years. We currently rely on a blend of FAO and <a href="https://github.com/JGCRI/moirai">Moirai</a> data for these inputs. FAO includes country-level data over the entire historical period. Moirai provides the information needed to subdivide the FAO data into the sub-national information required by GCAM. </dd>

<dt>Biomass Crop Yields</dt> <dd>Estimates of biomass crop yields today.</dd>

<dt>Future Crop Yield Improvements</dt> <dd>Assumed rates of annual yield improvements for each of the crops and crop management options in each region.</dd>

<dt>Residue Biomass Information</dt> <dd>Parameters governing how much residue biomass can be harvested. Data includes parameters needed to calculate the amount of residue available (Harvest Index, Energy Content, Water Content, and Root-to-Shoot Ratio), parameters needed to calculate the maximum that can be harvested (the fraction that must be left on the field for erosion control), and information on the supply curve (the fraction harvested at different prices).</dd>

<dt>Other Variable Costs</dt> <dd>Per unit crop production cost of inputs that are not modeled explicitly in GCAM. Specifically, capital, operating, and labor costs other than land, water, and fertilizer</dd>

<dt>Other Historical Emissions</dt> <dd>Inputs include emissions of all non-CO<sub>2</sub> gases and species for each year and region. Data for BC and OC is from the RCP inventory (Lamarque et al., 2011). Data for all other gases and species is from EDGAR (European Commission, 2010).</dd>
</dl><br/>

### Input Data

#### Food, Feed, and Forestry

##### Historical Production

##### Other Historical Emissions

##### Biomass Crop Yields

##### Future Crop Yield Improvement

##### Residue Biomass Information

##### Other Variable Costs


## Processing of Inputs

#### Supply of Food, Feed, and Forestry

## Modifying Inputs

