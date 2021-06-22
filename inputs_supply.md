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
| Historical supply of energy | Supply of energy in the historical period; used for initialization/calibration of GCAM | External data | IEA | Specified by fuel, transformation sector, country, and year |  ktoe and GWh |
| CO<sub>2</sub> capture rates | Fraction of CO2 captured in CCS technologies. | Assumption |  | Specified by technology and year | unitless |
| Retirement rules | For vintaged technologies, GCAM requires the user to specify the lifetime, and the parameters required for phased and profit-based shutdown. | Assumption |  | Specified by technology and year | Years (for lifetime), unitless for others |
| Logit exponents | GCAM requires the user to specify the logit exponents that determine the substitutability between technologies. | Assumption |  | Specified by sector and subsector | N/A |
| Share weight interpolation rules | These rules dictate how share weights (GCAM's calibration parameter) are specified in future years. | Assumption |  | Specified by sector and subsector | N/A |
| Cost of conversion technologies | Cost of production for conversion technologies | External data | Various | Specified by technology and year |  1975$/GJ |
| Capital cost | Overnight capital cost of electricity generation technologies | External data | Various | Specified by technology and year |  1975$/kW |
| Fixed O&M costs | Fixed operating and maintenance (O&M) costs for electricity generation technologies | External data | Based on Annual Energy Outlook | Specified by technology and year |  1975$/kW/yr |
| Variable O&M costs | Variable operating and maintenance (O&M) costs for electricity generation technologies | External data | Based on Annual Energy Outlook | Specified by technology and year |  1975$/MWh |
| Capacity factor | Ratio of generation to capacity | Assumption |  | Specified by technology and year |  Unitless |
| Fixed charge rate | Factor used to levelize capital cost | Assumption |  | Specified by technology |  Unitless |
| Default efficiencies | Default amount of output produced per unit of input; can be overwritten by region-specific information derived from historical data | Assumption | | Specified by technology and year | GJ per GJ |
| Default input-output coefficients | Default amount of input required per unit of output produced; can be overwritten by region-specific information derived from historical data | Assumption | | Specified by technology and year |  GJ per GJ |
| Resource supply curves | Mapping between cost and resource extraction. Resource extraction is cumulative for deplatable resources and annual for renewable resources | External data | Various | Specified by resource and year |  EJ for extraction, 1975$/GJ for cost |


Table 1: External inputs used for supply of energy<sup>[1](#table_footnote1)</sup>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

#### Data

Throughout GCAM, the number in the name of assumption file indicates to which sector the file applies. Files with `A10` through `A20` in the name are assumptions for resources. Files with `A21` and `A22` in the name are assumptions for refining and gas processing. Files with `A23` in the name are assumptions for electricity, `A24` is for heat, and `A25` is for hydrogen. Files with `A26` in the name are assumptions for transmission and distribution.

##### Historical supply of energy

GCAM uses IEA energy balances as a source for historical energy supply and demand. IEA data are proprietary and thus are not provided in the GCAM data repository. Instead, we provide all of the `R` code used to process the IEA data so that the user can replicate the processing _if_ they purchase the IEA data. In addition, we provide aggregated data after it has undergone processing so that GCAM input files can be created and used by the user community. 

##### CO<sub>2</sub> capture rates

CO<sub>2</sub> capture rates for cement are specified in [A25.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A25.globaltech_co2capture.csv). Capture rates for fertilizer are specified in [A23.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_co2capture.csv)

##### Retirement rules

Retirement rules are specified in [A22.globaltech_retirement.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A22.globaltech_retirement.csv), [A23.globaltech_retirement.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_retirement.csv)


##### Logit exponents

Logit exponents are specified in [A21.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.sector.csv), [A21.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.subsector_logit.csv), 
[A22.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A22.sector.csv), [A22.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A22.subsector_logit.csv), 
[A23.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.sector.csv), 
[A23.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.subsector_logit.csv), [A24.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A24.sector.csv),  [A24.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A24.subsector_logit.csv), 
[A25.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A25.sector.csv),  [A25.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A25.subsector_logit.csv), [A26.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A26.sector.csv), and  [A26.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A26.subsector_logit.csv). 

#### Share weight interpolation rules

Share weight interpolation rules are specified in [A21.subsector_shrwt.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.subsector_shrwt.csv), [A21.subsector_interp.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.subsector_interp.csv), 
[A21.tradedtech_shrwt.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.tradedtech_shrwt.csv),
[A21.globaltech_shrwt.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.globaltech_shrwt.csv), and
[A21.globaltech_interp.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.globaltech_interp.csv). Similar files are defined for other sectors. For each sector, the file that ends `_interp` specifies the rule (e.g., fixed, linear) and the file that ends `_shrwt` indicates the value to interpolate to (if needed). Files that include `subsector` in the name define share weights at the subsector level, while `globaltech` and `tradedtech` indicate share weith information at the technology level.

##### Costs 

Costs of conversion technologies are specified in  [A21.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A21.globaltech_cost.csv),  [A22.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A22.globaltech_cost.csv),  [A24.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A24.globaltech_cost.csv),  [A25.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A25.globaltech_cost.csv), and 
[A26.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A26.globaltech_cost.csv).

For electricity generation technologies, costs are determined by the [capital cost](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_capital.csv), [fixed operating & maintenance costs](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_OMfixed.csv), [variable operating & maintenance cost](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_OMvar.csv), [capacity factor](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_capacity_factor.csv), and [the fixed charge rate](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_capital.csv).

##### Default efficiencies
Efficiencies are specified in [A23.globaltech_eff.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_eff.csv), [A25.cost_efficiency.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A25.cost_efficiency.csv), and [A26.cost_efficiency.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A26.cost_efficiency.csv).

##### Default input-output coefficients

Coefficients are specified in [A21.globaltech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.globaltech_coef.csv), [A22.globaltech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A22.globaltech_coef.csv), and
[A24.globaltech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A24.globaltech_coef.csv).

##### Resource supply curves

Resource supply curves are specified for [fossil fuels](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A11.fos_curves.csv), [uranium](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A12.U_curves.csv), [rooftop PV](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A15.roofPV_curves.csv),
[EGS](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A16.EGS_curves.csv), [geothermal](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A16.geo_curves.csv),
[municipal solid waste](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A13.MSW_curves.csv) ,
[traditional biomass](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A17.tradbio_curves.csv) , and
[wind](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A20.wind_class_CFs.csv).

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
