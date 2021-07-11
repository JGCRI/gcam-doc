---
layout: index
title: External Inputs to the Land Model
prev: diagram.html
next: land.html
gcam-version: v5.4 
---

GCAM's external land inputs include information on land, carbon, other emissions, and the value of unmanaged land in the historical period. These inputs are required for each [global land unit](common_assumptions.html#global-land-units) and [historical year](common_assumptions.html#historical-years).


## External Inputs

### Description

Table 1: External inputs used by the land model <sup>[1](#table_footnote)</sup>
| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Historical Land Use and Land Cover | Land area by region, land type and year. Land cover data is provided beginning in 1700 in order to spin-up the carbon cycle within GCAM. Crop-specific harvested area is used to downscale FAO data to a subnational level; however this data is only available for a single year. Similarly, the division between irrigated and rainfed land is only available for a single year only. | External Data Set | <a href="https://github.com/JGCRI/moirai">Moirai</a> | Raw data is by country, water basin and land type. | thousand $$km^2$$ |
| Historical Harvested Area | Harvested land area by country, crop, and year. | External Data Set | FAO | Raw data is by country, crop, and year | Hectares |
| Terrestrial Carbon Information | Inputs include potential vegetation and soil carbon density (i.e., carbon density if the land grew to equilibrium), and mature age for vegetation carbon. Note that vegetation carbon contents for crops are calculated from crop yields. All other carbon parameters are external inputs. | External Data Set |  Houghton (1999) and King (1997) | Land type and Biome | Various |
| Soil time scale | Inputs include the number of years for soil carbon changes to occur. Note that this is not the time to equilibrium, which is much longer. | Assumption | | GCAM geopolitical region | Years |
| Value of Unmanaged Land | GCAM requires profit rates for all land types in the historical period for calibration. Managed land profit is calculated in the <a href="inputs_supply.html">supply model</a>. For unmanaged land, however, the value is input into the model. | External Data Set | <a href="https://github.com/JGCRI/moirai">Moirai</a> | Raw data is by country, water basin, and land use. | million USD |
| Share Parameters | GCAM requires the user to specify the logit exponents that determine the substitutability between different leafs and nodes in the land model. These parameters were chosen to produce land supply elasticities comparable to those found in the literature, although it should be noted that there is not a transformation between logit exponents and supply elasticities for all land types. | Assumption |  | Specified by land node | N/A |
| Parameters to introduce a new land type | For land types that do not exist in the historical period, GCAM requires parameters to introduce these land types in the future. Specifically, GCAM needs to know how that land type will compete with other land types in its nest _if_ it were to have equal profit. | Assumption | | Currently specified globally, but could be specified by region and water basin | Share |

<font size="-1">
<a name="table_footnote">1</a>: Note that this table differs from the one provided on the <a href="land.html#inputs-to-the-module">Land Modeling Page</a> in that it only lists external inputs to the land module (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.
</font>

<br/>
Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

### Data

#### Historical Land Use and Land Cover
The raw data used for historical land cover is provided in [Land_type_area_ha.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/LDS/Land_type_area_ha.csv). Crop-specific harvested area is provided in [FAO_ag_HA_ha_PRODSTAT.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_HA_ha_PRODSTAT.csv). The data used to separate crops into irrigated and rainfed is provided in [MIRCA_irrHA_ha.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/LDS/MIRCA_irrHA_ha.csv) and [MIRCA_rfdHA_ha.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/LDS/MIRCA_rfdHA_ha.csv).

#### Historical Harvested Area
Historical harvested area by crop and country is provided in [FAO_ag_HA_ha_PRODSTAT.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_HA_ha_PRODSTAT.csv).

#### Terrestrial Carbon Information
The mature age and carbon density information used in GCAM is provided in [Various_CarbonData_LTsage.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/Various_CarbonData_LTsage.csv). 

#### Soil time scale
The soil time scale is provided in [A_soil_time_scale_R.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/A_soil_time_scale_R.csv)

#### Value of Unmanaged Land
The value of unmanaged land is provided in [LDS_value_milUSD.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/LDS/LDS_value_milUSD.csv).

#### Share Parameters
The logit exponents used in the land allocation module are provide in [A_LandNode_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/A_LandNode_logit.csv) and [A_LandNode_logit_irr.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/A_LandNode_logit_irr.csv).

#### Parameters to introduce a new land type
The calibration parameters for bioenergy are in [A_bio_ghost_share.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/A_bio_ghost_share.csv).


