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
| Share weight interpolation rules | These rules dictate how share weights (GCAM's calibration parameter) are specified in future years. | Assumption |  | Specified by subsector and technology | N/A |
| Cost of conversion technologies | Cost of production for conversion technologies | External data | Various | Specified by technology and year |  1975$/GJ |
| Capital cost | Overnight capital cost of electricity generation technologies | External data | Annual Technology Baseline (ATB) 2019 | Specified by technology and year |  1975$/kW |
| Fixed O&M costs | Fixed operating and maintenance (O&M) costs for electricity generation technologies | External data | Annual Technology Baseline (ATB) 2019 | Specified by technology and year |  1975$/kW/yr |
| Variable O&M costs | Variable operating and maintenance (O&M) costs for electricity generation technologies | External data | Annual Technology Baseline (ATB) 2019 | Specified by technology and year |  1975$/MWh |
| Capacity factor | Ratio of generation to capacity for electricity generation technologies | Assumption |  | Specified by technology and year |  Unitless |
| Fixed charge rate | Factor used to levelize capital cost | Assumption |  | Specified by technology |  Unitless |
| Default efficiencies | Default amount of output produced per unit of input; can be overwritten by region-specific information derived from historical data | Assumption | | Specified by technology and year | GJ per GJ |
| Default input-output coefficients | Default amount of input required per unit of output produced; can be overwritten by region-specific information derived from historical data | Assumption | | Specified by technology and year |  GJ per GJ |
| Resource supply curves | Mapping between cost and resource extraction. Resource extraction is cumulative for deplatable resources and annual for renewable resources | External data | Various | Specified by resource and year |  EJ for extraction, 1975$/GJ for cost |


Table 1: External inputs used for supply of energy<sup>[1](#table_footnote1)</sup>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

#### Data

Throughout GCAM, the number in the name of assumption file indicates to which sector the file applies. Files with `A10` through `A20` in the name are assumptions for resources. Files with `A21` and `A22` in the name are assumptions for refining and gas processing. Files with `A23` in the name are assumptions for electricity, `A24` is for heat, and `A25` is for hydrogen. Files with `A26` in the name are assumptions for transmission and distribution. Files with `A61` in the name are assumptions about carbon storage.

##### Historical supply of energy

GCAM uses IEA energy balances as a source for historical energy supply and demand. IEA data are proprietary and thus are not provided in the GCAM data repository. Instead, we provide all of the `R` code used to process the IEA data so that the user can replicate the processing _if_ they purchase the IEA data. In addition, we provide aggregated data after it has undergone processing so that GCAM input files can be created and used by the user community. 

##### CO<sub>2</sub> capture rates

CO<sub>2</sub> capture rates for cement are specified in [A25.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A25.globaltech_co2capture.csv). Capture rates for fertilizer are specified in [A23.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_co2capture.csv). CO2 capture rates for refining are specified in [A22.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A22.globaltech_co2capture.csv). Capture rates for electricity generation are specified in [A23.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_co2capture.csv); capture rates for hydrogen production are specified in [A25.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A25.globaltech_co2capture.csv).

##### Retirement rules

Retirement rules are specified in [A22.globaltech_retirement.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A22.globaltech_retirement.csv), [A23.globaltech_retirement.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_retirement.csv) and  [A10.ResSubresourceProdLifetime.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A10.ResSubresourceProdLifetime.csv).


##### Logit exponents

Logit exponents are specified in [A21.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.sector.csv), [A21.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.subsector_logit.csv), 
[A22.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A22.sector.csv), [A22.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A22.subsector_logit.csv), 
[A23.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.sector.csv), 
[A23.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.subsector_logit.csv), [A24.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A24.sector.csv),  [A24.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A24.subsector_logit.csv), 
[A25.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A25.sector.csv),  [A25.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A25.subsector_logit.csv), [A26.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A26.sector.csv),   [A26.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A26.subsector_logit.csv),  [A61.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A61.subsector_logit.csv),  [A_ff_RegionalSector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A_ff_RegionalSector.csv), and [A_ff_RegionalSubsector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A_ff_RegionalSubsector.csv), and [A_ff_TradedSector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A_ff_TradedSector.csv). 

#### Share weight interpolation rules

Share weight interpolation rules are specified in [A21.subsector_shrwt.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.subsector_shrwt.csv), [A21.subsector_interp.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.subsector_interp.csv), 
[A21.tradedtech_shrwt.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.tradedtech_shrwt.csv),
[A21.globaltech_shrwt.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.globaltech_shrwt.csv), and
[A21.globaltech_interp.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.globaltech_interp.csv). Similar files are defined for other sectors. For each sector, the file that ends `_interp` specifies the rule (e.g., fixed, linear) and the file that ends `_shrwt` indicates the value to interpolate to (if needed). Files that include `subsector` in the name define share weights at the subsector level, while `globaltech`, `tradedtech`, and `globaltranTech` indicate share weight information at the technology level.

##### Costs 

Costs of conversion technologies are specified in  [A21.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A21.globaltech_cost.csv),  [A22.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A22.globaltech_cost.csv),  [A24.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A24.globaltech_cost.csv),  [A25.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A25.globaltech_cost.csv),  
[A26.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A26.globaltech_cost.csv),  
[A21.globalrsrctech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A21.globalrsrctech_cost.csv), and 
[A61.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A61.globaltech_cost.csv).

For electricity generation technologies, costs inputs are specified in [capital cost](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_capital.csv), [fixed operating & maintenance costs](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_OMfixed.csv), and [variable operating & maintenance cost](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_OMvar.csv).

##### Default efficiencies
Efficiencies are specified in [A23.globaltech_eff.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_eff.csv), [A25.globaltech_eff.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A25.globaltech_eff.csv), and [A26.globaltech_eff.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A26.globaltech_eff.csv).

##### Default input-output coefficients

Coefficients are specified in [A21.globaltech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.globaltech_coef.csv), [A22.globaltech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A22.globaltech_coef.csv), 
[A24.globaltech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A24.globaltech_coef.csv), 
[A21.globalrsrctech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A21.globalrsrctech_coef.csv), and
[A61.globaltech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A61.globaltech_coef.csv).

##### Resource supply curves

Resource supply curves are specified for [fossil fuels](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A11.fos_curves.csv), [uranium](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A12.U_curves.csv), [rooftop PV](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A15.roofPV_curves.csv),
[EGS](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A16.EGS_curves.csv), [geothermal](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A16.geo_curves.csv),
[municipal solid waste](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A13.MSW_curves.csv) ,
[traditional biomass](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A17.tradbio_curves.csv), and
[onshore wind, and offshore wind](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A20.wind_class_CFs.csv).

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
| Historical country-level production of crops | Production of agricultural commodities by country in the historical period; used for initialization/calibration of GCAM | External data | FAO | Specified by crop, country, and year | tons |
| Historical country-level harvested area for crops | Harvested area for agricultural commodities by country in the historical period; used for initialization/calibration of GCAM | External data | FAO | Specified by crop, use, country, and year | ha |
| Historical sub-national production of crops | Production of agricultural commodities by water basin in a single year; used for initialization/calibration of GCAM | External data | <a href="https://github.com/JGCRI/moirai">moirai</a> | Specified by crop, country and basin | tons |
| Historical sub-national harvested area of crops | Harvested area of agricultural commodities by water basin in a single year; used for initialization/calibration of GCAM | External data | <a href="https://github.com/JGCRI/moirai">moirai</a> | Specified by crop, country and basin | ha |
| Historical production of livestock | Production of livestock commodities in the historical period; used for initialization/calibration of GCAM | External data | FAO | Specified by crop, use, country, and year | tons |
| Feed fractions for livestock | Fraction of feed by type | External data | IMAGE | Specified by commodity, feed system, feed type, IMAGE region and year (1970-2030) | unitless |
| Livestock feed I-O coefficients | Amount of input per unit of output for livestock feed systems | External data | IMAGE | Specified by commodity, feed system, IMAGE region and year (1970-2030) | Dry feed to animal commodity ratio |
| Historical cost of production | Historical cost of crop production in the USA | External data | <a href="http://www.ers.usda.gov/Data/CostsAndReturns/">USDA</a> | Specified by crop, type of cost, and year | various (e.g., $ per planted acre, $ per bushel) |
| Historical prices | Historical prices of agriculture and livestock commodities; used for initialization/calibration of GCAM | External data | FAO | Specified by country, commodity, and year |  |
| Agriculture productivity growth | Projected yields through 2050 for agricultural commodities | External data | FAO | Specified by country, commodity, and year |  |
| Logit exponents | Share parameters dictating substitution between different feed options for livestock | Assumption |  | Specified by type of livestock | unitless |


Table 3: External inputs used for supply of food, feed, and forestry <sup>[3](#table_footnote3)</sup>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

#### Data

##### Historical production and harvested area

For both production and harvested area of crops, GCAM blends country level time series provided by the FAO with subnational information provided by [moirai](https://github.com/JGCRI/moirai) in a single year to determine historical production and harvested area for each [GCAM land region](common_assumptions.html#regional-resolution). FAO data is specified in [FAO_ag_Prod_t_PRODSTAT.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_Prod_t_PRODSTAT.csv) and [FAO_ag_HA_ha_PRODSTAT.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_HA_ha_PRODSTAT.csv). Moirai data is specified in [LDS_ag_prod_t.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/LDS/LDS_ag_prod_t.csv) and [LDS_ag_HA_ha.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/LDS/LDS_ag_HA_ha.csv). Livestock production is specified in [FAO_an_Prod_t_PRODSTAT.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_an_Prod_t_PRODSTAT.csv).

##### Livestock feed information

GCAM bases its historical livestock feed representation on the IMAGE model. GCAM requires information on [input-output coefficients](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/IMAGE/IMAGE_an_FeedIO_Rimg_C_Sys_Y.csv), [feed fractions](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/IMAGE/IMAGE_an_Feedfrac_Rimg_C_Sys_Fd_Y.csv), and [production mixes](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/IMAGE/IMAGE_an_Prodmixfrac_Rimg_C_Y.csv).

##### Ag productivity growth

GCAM captures change in yield due to increases in fertilizer use or irrigation endogenously. All other non-climate related factors driving yield increases are exogenously specified, with data specified in [FAO_ag_CROSIT.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_CROSIT.csv).

##### Prices

GCAM uses producer prices to initialize the model (future prices are endogenous). Those prices are provide in [FAO_ag_an_ProducerPrice.csv.gz](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_an_ProducerPrice.csv.gz).


##### Cost of production

The costs associated with land, irrigation, and fertilizer are endogenously determined in GCAM (see [Land Supply](supply_land.html). Other costs of production are exogenously specified and the data used for those costs can be found in [USDA_cost_data.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/USDA_cost_data.csv), with [USDA_item_cost.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/USDA_item_cost.csv) specifying which costs are included in GCAM. Note that we use cost information for the USA in all regions.

<font size="-1"><a name="table_footnote1">1</a>: Note that this table differs from the one provided on the <a href="supply_energy.html#inputstothemodel">Energy Supply Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>    

<a name="table_footnote2">2</a>: Note that this table differs from the one provided on the <a href="supply_water.html#inputstothemodel">Water Supply Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>  

<a name="table_footnote3">3</a>: Note that this table differs from the one provided on the <a href="supply_land.html#inputstothemodel">Food, Feed, and Forestry Supply Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.</font>  
