---
layout: index
title: Inputs for Modeling Supply
prev: diagram.html
next: supply_land.html
gcam-version: v5.4 
---

GCAM's supply inputs include information on production, prices, technology cost and performance, and other emissions in the historical period in order to calibrate model parameters. In addition, GCAM's supply modeling requires information on future technology cost and performance and emissions factors for future periods. GCAM requires that supply data is globally consistent with [demand data](inputs_demand.html) for each of its historical model periods as it solves for market equilibrium in these years as it does for future years. These inputs are required for each [region](common_assumptions.html#regional-resolution) and [historical year](common_assumptions.html#historical-years).

# Table of Contents

- [Energy](#energy)
- [Water](#water)
- [Food, Feed, and Forestry](#food-feed-and-forestry)

## External Inputs

### Energy

#### Description

**Table 1: External inputs used for supply of energy<sup>[1](#table_footnote1)</sup>**

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Historical supply of energy | Supply of energy in the historical period; used for initialization/calibration of GCAM | External data | [IEA](#iea2019) | Specified by fuel, transformation sector, country, and year |  ktoe and GWh |
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
| Historical non-CO<sub>2</sub> emissions | Historical emissions of non-CO<sub>2</sub> | External data | [CEDS](https://github.com/JGCRI/CEDS)  | Specified by country, technology, gas, and year | Various |
| CO<sub>2</sub> emissions coefficients | Default carbon content of fuels | External data | [CDIAC](#cdiac2017) and [IEA](#iea2019)  | Specified by fuel | kgC / GJ |
| Historical CO<sub>2</sub> emissions | Historical emissions of CO<sub>2</sub> | External data | [CDIAC](#cdiac2017) | Specified by nation and year | ktC per year |


<font size="-1">
<a name="table_footnote1">1</a>: Note that this table differs from the one provided on the <a href="supply_energy.html#inputs-to-the-module">Energy Supply Modeling Page</a> in that it only lists external inputs to the supply module (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>    
</font>

<br/>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

#### Data

Throughout GCAM, the number in the name of assumption file indicates to which sector the file applies. Files with `A10` through `A20` in the name are assumptions for resources. Files with `A21` and `A22` in the name are assumptions for refining and gas processing. Files with `A23` in the name are assumptions for electricity, `A24` is for heat, and `A25` is for hydrogen. Files with `A26` in the name are assumptions for transmission and distribution. Files with `A61` in the name are assumptions about carbon storage.

##### Historical supply of energy

GCAM uses IEA energy balances as a source for historical energy supply and demand. IEA data are proprietary and thus are not provided in the GCAM data repository. Instead, we provide all of the `R` code used to process the IEA data so that the user can replicate the processing _if_ they purchase the IEA data. In addition, we provide aggregated data after it has undergone processing so that GCAM input files can be created and used by the user community. 

##### CO<sub>2</sub> capture rates

CO<sub>2</sub> capture rates for refining are specified in [A22.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A22.globaltech_co2capture.csv). Capture rates for electricity generation are specified in [A23.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A23.globaltech_co2capture.csv); capture rates for hydrogen production are specified in [A25.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A25.globaltech_co2capture.csv).

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
[A26.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A26.globaltech_cost.csv), [A21.globalrsrctech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A21.globalrsrctech_cost.csv), and [A61.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A61.globaltech_cost.csv).

For electricity generation technologies, costs inputs are specified in [capital cost](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/NREL_ATB_capital.csv), [fixed operating & maintenance costs](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/NREL_ATB_OMfixed.csv), and [variable operating & maintenance cost](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/NREL_ATB_OMvar.csv).

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
[traditional biomass](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A17.tradbio_curves.csv), 
[onshore wind](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/NREL_onshore_energy.csv) and [offshore wind](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/NREL_offshore_energy.csv).

##### Emissions 

Default carbon contents of fuels are specified in [A_PrimaryFuelCCoef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/emissions/A_PrimaryFuelCCoef.csv). Historical CO<sub>2</sub> emissions are provided in [CDIAC_CO2_by_nation.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/emissions/CDIAC_CO2_by_nation.csv).

Historical non-CO<sub>2</sub> emissions information is provided in several files within the [CEDS folder]((https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/emissions/CEDS).

### Water

#### Description

**Table 2: External inputs used for supply of water <sup>[2](#table_footnote2)</sup>**

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Surface water supply curves (cost and availability) | Xanthos derived total maximum runoff values, combined with accessible water calculation to determine water available at very low price and the level of accessible water for cost-curve inflection | Exogenous Data | Xanthos output | Water basin and year | $$km^3$$ available per USD |
| Groundwater supply curves (cost and availability) | Amount of groundwater available in each basin at increasingly high graded levels | [Turner et al., 2019a](#turner2019a) | Water basin and year | $$km^3$$ available per USD |
| Desalination cost | Cost of desalinated water within a basin which is available at high cost and available once the price of water within a basin surpasses a certain threshold | Exogenous Data | Global Constant | USD per $$km^3$$ |

<font size="-1">
<a name="table_footnote2">2</a>: Note that this table differs from the one provided on the <a href="supply_water.html#inputs-to-the-module">Water Supply Modeling Page</a> in that it only lists external inputs to the supply module (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>    
</font>

<br/>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

#### Data

#### Surface water supply curves
Surface water supply curves are based on runoff estimates from Xanthos, a detailed global hydrology model ([Liu et al. 2018](#liu2018); [Vernon et al. 2019](#vernon2019)). Xanthos accounts for surface and subsurface processes to compute runoff at 0.5° grid resolution. Global climate datasets are utilized in conjunction with Xanthos to determine historical annual average runoff aggregated for each basin ([Liu et al. 2018](#liu2018); [Turner et al., 2019a](#turner2019a); [Vernon et al. 2019](#vernon2019)). Of the total basin runoff, water available or accessible for human use takes into consideration requirements for ecosystem services, inaccessibility due to rapid flow and remote locations, and capacity of reservoir storage. Accessible fractions of total runoff vary across basins. Renewable water volumes up to the accessible fraction is available at nominal or low cost. Additional renewable water beyond the accessible fraction is available at a sharply higher cost to ensure availability of water for ecosystem services and to reflect capital investments necessary for reservoir expansion.
Basin level runoff is specified in [xanthos_basin_runoff.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/water/xanthos_basin_runoff.csv). 
Accessible fraction is specified in [xanthos_accessible_water.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/water/xanthos_accessible_water.csv).
For additional accessible calculations, basin historical basin level demands are specified in [basin_water_demand_1990_2015.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/water/basin_water_demand_1990_2010.csv) and groundwater availability is specified in [groundwater_trend_watergap.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/water/groundwater_trend_watergap.csv).

#### Groundwater supply curves
Non-renewable groundwater supply curves are modeled as a graded depletable resource with a fixed amount of total groundwater availability. Basin level estimates of environmentally exploitable groundwater are aggregated from grid-scale data. Groundwater supply curves represent the relationship between exploitable groundwater and cost of extraction. As the available water within the initial grades is exhausted, the price for additional groundwater resources increases as a function of depth and geological complexity. Energy inputs and costs required for pumping are included for a rigorous estimate of the relationship between groundwater volume and extraction cost ([Turner et al., 2019a](#turner2019a); [Kim et al. 2016](#kim2016)).
Graded groundwater availability is specified in [groundwater_constrained.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/water/groundwater_constrained.csv) with groundwater extraction trends found in [groundwater_trend_watergap.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/water/groundwater_trend_watergap.csv) and [groundwater_trend_gleeson.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/water/groundwater_trend_gleeson.csv).

#### Desalination costs
The costs of desalinated water reflects electrical energy input and capital and operational costs. Due to the high cost of desalination, desalinated water is only utilized when renewable and non-renewable water supplies are scarce and the cost of freshwater is high. Desalinated water representation is nested within the water distribution sectors where it competes with basin water supply from renewable and nonrenewable sources.

### Food, Feed, and Forestry

#### Description

**Table 3: External inputs used for supply of food, feed, and forestry <sup>[3](#table_footnote3)</sup>**

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
| Historical non-CO<sub>2</sub> emissions | Historical emissions of non-CO<sub>2</sub> | External data | [CEDS](https://github.com/JGCRI/CEDS)  | Specified by country, technology, gas, and year | Various |

<font size="-1">
<a name="table_footnote3">3</a>: Note that this table differs from the one provided on the <a href="supply_land.html#inputs-to-the-module">Land Supply Modeling Page</a> in that it only lists external inputs to the supply module (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>    
</font>

<br/>

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

The costs associated with land, irrigation, and fertilizer are endogenously determined in GCAM (see [Land Supply](supply_land.html)). Other costs of production are exogenously specified and the data used for those costs can be found in [USDA_cost_data.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/USDA_cost_data.csv), with [USDA_item_cost.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/USDA_item_cost.csv) specifying which costs are included in GCAM. Note that we use cost information for the USA in all regions.

##### Emissions 

Historical non-CO<sub>2</sub> emissions information is provided in several files within the [CEDS folder]((https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/emissions/CEDS).


## References

<a name="cdiac2017">[CDIAC 2017]</a> Boden, T., and Andres, B. 2017, *National CO2 Emissions from Fossil-Fuel Burning, Cement Manufacture, and Gas Flaring: 1751-2014*, Carbon Dioxide Information Analysis Center, Oak Ridge National Laboratory. [Link](http://cdiac.ess-dive.lbl.gov/ftp/ndp030/nation.1751_2014.ems)

<a name="iea2019">[IEA 2019]</a> International Energy Agency, 2019, *Energy Balances of OECD Countries 1960-2017 and Energy Balances of Non-OECD Countries 1971-2017*, International Energy Agency, Paris, France. 

<a name="kim2016">[Kim et al. 2016]</a> Kim SK, Hejazi M, et al. (2016). *Balancing global water availability and use at basin scale in an integrated assessment model*. Climatic Change 136:217-231. [Link](http://link.springer.com/article/10.1007/s10584-016-1604-6/fulltext.html)

<a name="kyle2021">[Kyle et al. 2021]</a> Kyle, P., Hejazi, M., Kim, S., Patel, P., Graham, N., & Liu, Y. (2021). Assessing the future of global energy-for-water. Environmental Research Letters, 16(2), 024031.

<a name="liu2018">[Liu et al. 2018]</a> Liu Y., M. Hejazi, H. Li, X. Zhang, G. Leng (2018). *A  hydrological emulator for global applications - HE v1.0.0*. Geoscientific Model Development. [Link](https://www.geosci-model-dev.net/11/1077/2018/gmd-11-1077-2018.pdf)

<a name="turner2019a">[Turner et al. 2019a]</a> Turner S.W.D., M. Hejazi, C. Yonkofski, S. Kim, P. Kyle (2019a). *Influence of groundwater extraction costs and resource depletion limits on simulated global nonrenewable water withdrawals over the 21st century*. Earth's Future (2019), 10.1029/2018EF001105  [Link](https://doi.org/10.1029/2018EF001105)

<a name="vernon2019">[Vernon 2019]</a> Vernon, C., M. Hejazi, S. Turner, Y. Liu, C. Braun, X. Li, and R. Link. *A Global Hydrologic Framework to Accelerate Scientific Discovery*. Journal of Open Research Software (2019). [Link](https://openresearchsoftware.metajnl.com/articles/10.5334/jors.245/)

