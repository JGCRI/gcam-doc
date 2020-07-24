---
layout: index
title: External Inputs to the Land Model
prev: diagram.html
next: land.html
gcam-version: v5.3 
---

GCAM's external land inputs include information on land, carbon, other emissions, and the value of unmanaged land in the historical period. These inputs are required for each [global land unit](common_assumptions.html#global-land-units) and [historical year](common_assumptions.html#historical-years).


## External Inputs

### Description

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Historical Land Use and Land Cover | Land area by region, land type and year. Land cover data is provided beginning in 1700 in order to spin-up the carbon cycle within GCAM. Crop-specific harvested area is provided only for a single year to downscale FAO data to a subnational level. | External Data Set | <a href="https://github.com/JGCRI/moirai">Moirai</a> | Raw data is by country, water basin and land type. | thousand $$km^2$$ |
| Historical Harvested Area | Harvested land area by country, crop, and year. | External Data Set | FAO | Raw data is by country, crop, and year | Hectares |
| Terrestrial Carbon Information | Inputs include potential vegetation and soil carbon density (i.e., carbon density if the land grew to equilibrium), mature age for vegetation carbon, and soil carbon time scale. Note that vegetation carbon contents for crops are calculated from crop yields. All other carbon parameters are external inputs. | External Data Set |  Houghton (1999) and King (1997) | Land type and Biome | Various |
| Value of Unmanaged Land | GCAM requires profit rates for all land types in the historical period for calibration. Managed land profit is calculated in the <a href="inputs_supply.html">supply model</a>. For unmanaged land, however, the value is input into the model. | External Data Set | <a href="https://github.com/JGCRI/moirai">Moirai</a> | Raw data is by country, water basin, and land use. | million USD |
| Share Parameters | GCAM requires the user to specify the logit exponents that determine the substitutability between different leafs and nodes in the land model.These parameters were chosen to produce land supply elasticities comparable to those found in the literature. | Assumption |  | Specified by land node | N/A |

Table 1: External inputs used by the land model <sup>[1](#table_footnote)</sup>

### Data

#### Historical Land Use and Land Cover
The raw data used for historical land cover is provided in [Land_type_area_ha.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/LDS/Land_type_area_ha.csv). Crop-specific harvested area is provided in [FAO_ag_HA_ha_PRODSTAT.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_HA_ha_PRODSTAT.csv). The data used to separate crops into irrigated and rainfed is provided in [MIRCA_irrHA_ha.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/LDS/MIRCA_irrHA_ha.csv) and [MIRCA_rfdHA_ha.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/LDS/MIRCA_rfdHA_ha.csv).

#### Historical Harvested Area

#### Terrestrial Carbon Information
TODO: Add

#### Value of Unmanaged Land
TODO: Add

#### Share Parameters
The logit exponents used in the land allocation module are provide in [A_LandNode_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/A_LandNode_logit.csv) and [A_LandNode_logit_irr.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/A_LandNode_logit_irr.csv).


<a name="table_footnote">1</a>: Note that this table differs from the one provided on the [Land Modeling Page](land.html#inputstothemodel) in that it only lists external inputs to the land model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.