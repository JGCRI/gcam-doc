---
layout: index
title: Inputs for Modeling Supply
prev: diagram.html
next: supply_land.html
gcam-version: v5.3 
---

GCAM's supply inputs include information on production, prices, technology cost and performance, and other emissions in the historical period in order to calibrate model parameters. In addition, GCAM's supply modeling requires information on future technology cost and performance and emissions factors for future periods. GCAM requires that supply data is globally consistent with [demand data](inputs_demand.html) for each of its historical model periods as it solves for market equilibrium in these years as it does for future years. These inputs are required for each [region](common_assumptions.html#regional-resolution) and [historical year](common_assumptions.html#historical-years).

# Table of Contents

- [Energy](#energy)
- [Water](#water)
- [Food, Feed, and Forestry](#food--feed--forestry)

## External Inputs

### Energy

#### Description

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
|  |  | |  |  |

Table 1: External inputs used for supply of energy<sup>[1](#table_footnote1)</sup>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

#### Data

##### Variable #1
<Insert links to the input files on Github>

### Water

#### Description

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
|  |  | |  |  |

Table 2: External inputs used for supply of water <sup>[2](#table_footnote2)</sup>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

#### Data

##### Variable #1
<Insert links to the input files on Github>

### Food / Feed / Forestry

#### Description

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
|  |  | |  |  |

Table 3: External inputs used for supply of food, feed, and forestry <sup>[3](#table_footnote3)</sup>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

<dt>Historical Production</dt> <dd>Inputs include historical production of all crops and forestry products for each of the AgLU regions for the model base years. We currently rely on a blend of FAO and GTAP data for these inputs. FAO includes country-level data over the entire historical period, while GCAM has sub-national information for a single year in time.</dd>

<dt>Historical Prices</dt> <dd>Inputs include the price of all food, feed, and forestry commodities for our historical base years. We currently use producer prices from FAO for these inputs.</dd>

<dt>Future Crop Yield Improvements</dt> <dd>Assumed rates of annual yield improvements for each of the crops and crop management options in each region.</dd>

<dt>Other Variable Costs</dt> <dd>Per unit crop production cost of inputs that are not modeled explicitly in GCAM. Specifically, capital, operating, and labor costs other than land, water, and fertilizer</dd>


#### Data

##### Variable #1
<Insert links to the input files on Github>

<font size="-1"><a name="table_footnote1">1</a>: Note that this table differs from the one provided on the <a href="supply_energy.html#inputstothemodel">Energy Supply Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>    

<a name="table_footnote2">2</a>: Note that this table differs from the one provided on the <a href="supply_water.html#inputstothemodel">Water Supply Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>  

<a name="table_footnote3">3</a>: Note that this table differs from the one provided on the <a href="supply_land.html#inputstothemodel">Food, Feed, and Forestry Supply Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.</font>  
