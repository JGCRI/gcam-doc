---
layout: index
title: Inputs for Modeling Demand
prev: diagram.html
next: demand_land.html
gcam-version: v5.3 
---

GCAM's demand inputs include information on consumption and prices in the historical period in order to calibrate model parameters. Additional parameters related to income and price elasticities are needed for modeling future periods. GCAM requires demand data to be globally consistent with [supply data](inputs_supply.html) for each of its historical model periods as it solves for market equilibrium in these years as it does for future years. These inputs are required for each [region](common_assumptions.html#regional-resolution) and [historical year](common_assumptions.html#historical-years).

# Table of Contents

- [Energy](#energy)
- [Water](#water)
- [Food, Feed, and Forestry](#food--feed--forestry)

## External Inputs

### Energy

#### Description

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Historical demand for energy | Demand for energy in the historical period; used for initialization/calibration of GCAM | External data | IEA | Specified by demand, fuel, country, and year |  ktoe and GWh |
| Price elasticity of demand | Elasticity determining how demand responds to changes in price | Assumption | | Specified by demand |  unitless |
| Value of time in transit multiplier | Factor multiplied by the wage rate to determine the value of time in transit, used in the transportation model | Assumption | | Specified by demand |  unitless |
| Cost | Cost of production | Assumption | | Specified by technology and year |  1975$/kg or 1975$/GJ |
| Default input-output coefficients | Default amount of input required per unit of output produced; can be overwritten by region-specific information derived from historical data | Assumption | | Specified by technology and year |  Various (e.g., GJ per kg, GJ per GJ) |
| Default efficiencies | Default amount of output produced per unit of input; can be overwritten by region-specific information derived from historical data | Assumption | | Specified by technology and year |  Various (e.g., GJ per kg, GJ per GJ) |
| CO<sub>2</sub> capture rates | Fraction of CO2 captured in CCS technologies. | Assumption |  | Specified by technology and year | unitless |
| Retirement rules | For vintaged technologies, GCAM requires the user to specify the lifetime, and the parameters required for phased and profit-based shutdown. | Assumption |  | Specified by technology and year | Years (for lifetime), unitless for others |
| Logit exponents | GCAM requires the user to specify the logit exponents that determine the substitutability between technologies. | Assumption |  | Specified by sector and subsector | N/A |
| Share weight interpolation rules | These rules dictate how share weights (GCAM's calibration parameter) are specified in future years. | Assumption |  | Specified by sector and subsector | N/A |
| Fuel preference elasticity | Elasticity dictating how share weights change with GDP per capita | Assumption | | Specified by technology and year | unitless |
| Satiation levels | Assumed satiation values for floorspace and residential energy services | Assumption | | Specified by demand, service, and region | m2/pers or EJ/pers |
| Income elasticity of demand | Elasticity determining how demand responds to changes in per capita output for industry and cement | Assumption | | Specified by demand | unitless

Table 1: External inputs used for demand of energy<sup>[1](#table_footnote1)</sup>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

#### Data

Throughout GCAM, the number in the name of assumption file indicates to which sector the file applies. Files with `A32` in the name are assumptions for industry, `A321` indicates cement, and `A322` indicates fertilizer. Files with `A44` in the name are assumptions for buildings. Files with `A54` in the name are assumptions for transportation. 

##### Historical demand for energy

GCAM uses IEA energy balances as a source for historical energy supply and demand. IEA data are proprietary and thus are not provided in the GCAM data repository. Instead, we provide all of the `R` code used to process the IEA data so that the user can replicate the processing _if_ they purchase the IEA data. In addition, we provide aggregated data after it has undergone processing so that GCAM input files can be created and used by the user community. 

##### Elasticities of demand

Price elasticity of demand is specified in [A32.demand.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A32.demand.csv), and [A54.demand.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A54.demand.csv). Income elasticities of demand for industry and cement are specified in [A32.inc_elas_output.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/A32.inc_elas_output.csv) and [A321.inc_elas_output.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/A321.inc_elas_output.csv).

##### Cost

Costs are specified in [A32.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/energy/A32.globaltech_cost.csv), [A321.globaltech_cost.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A321.globaltech_cost.csv), [A44.cost_efficiency.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A44.cost_efficiency.csv)

##### Default efficiencies

Efficiencies are specified in [A32.globaltech_eff.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A32.globaltech_eff.csv), [A44.cost_efficiency.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A44.cost_efficiency.csv), and [A44.tech_eff_mult_RG3.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A44.tech_eff_mult_RG3.csv).

##### Default input-output coefficients

Coefficients are specified in [A32.globaltech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A32.globaltech_coef.csv), [A321.globaltech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A321.globaltech_coef.csv),
[A322.globaltech_coef.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A322.globaltech_coef.csv)

##### CO<sub>2</sub> capture rates

CO<sub>2</sub> capture rates for cement are specified in [A321.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A321.globaltech_co2capture.csv). Capture rates for fertilizer are specified in [A322.globaltech_co2capture.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A322.globaltech_co2capture.csv)

##### Retirement rules

Retirement rules are specified in [A322.globaltech_retirement.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A322.globaltech_retirement.csv), [A44.cost_efficiency.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A44.cost_efficiency.csv)


##### Logit exponents

Logit exponents are specified in [A32.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A32.sector.csv), [A32.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A32.subsector_logit.csv), [A321.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A321.subsector_logit.csv), [A322.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A322.subsector_logit.csv), [A44.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A44.sector.csv),  [A44.subsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A44.subsector_logit.csv), [A54.sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A54.sector.csv), and  [A54.tranSubsector_logit.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A54.tranSubsector_logit.csv). 

#### Share weight interpolation rules

Share weight interpolation rules are specified in [A32.subsector_shrwt.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A32.subsector_shrwt.csv), [A32.subsector_interp.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A32.subsector_interp.csv), [A321.subsector_shrwt.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A321.subsector_shrwt.csv), [A321.subsector_interp.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A321.subsector_interp.csv), [A322.subsector_shrwt.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A322.subsector_shrwt.csv), [A322.subsector_interp.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A322.subsector_interp.csv), [A44.subsector_shrwt.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A44.subsector_shrwt.csv), [A44.subsector_interp.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A44.subsector_interp.csv), [A54.globaltranTech_shrwt_revised.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A54.globaltranTech_shrwt_revised.csv), [A54.globaltranTech_interp_revised.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A54.globaltranTech_interp_revised.csv), [A54.tranSubsector_shrwt_revised.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A54.tranSubsector_shrwt_revised.csv), [A54.tranSubsector_interp_revised.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A54.tranSubsector_interp_revised.csv). For each sector, the file that ends `_interp` specifies the rule (e.g., fixed, linear) and the file that ends `_shrwt` indicates the value to interpolate to (if needed).

##### Fuel preference elasticities

Fuel preference elasticities are specified in [A32.fuelprefElasticity.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A32.fuelprefElasticity.csv), [A44.fuelprefElasticity.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A42.fuelprefElasticity.csv).

##### Value of time in transit

Multipliers used to determine the value of time in transit are specified in [A54.tranSubsector_VOTT_revised.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A54.tranSubsector_VOTT_revised.csv).

#### Satiation levels

Satiation levels are specified in [A44.satiation_flsp](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A44.satiation_flsp.csv) and [A44.demand_satiation_mult](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A44.demand_satiation_mult.csv).

### Water


#### Description

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Agriculture water coefficients | Water coefficients for agricultural commodities, including blue (irrigation) and green (rain) water, includes data for a single year circa 2000 | External data set | <a href="http://waterfootprint.org/media/downloads/Report47-Appendix-II.zip">Mekonnen and Hoekstra</a> | Crop, country, water type (blue, green) | $$m^3$$ per ton |
| Industrial manufacturing water coefficients | Water coefficients for industrial manufacturing for 1995 | External data set | [Vassolo and Döll 2005](#vassolo2005) | Continent and water type (withdrawals, consumption) | $$Mm^3$$ per year |
| Livestock water coefficients | Water coefficients for drinking and the servicing of livestock commodities, includes data for the period 1996-2005 | [Mekonnen, M. M., & Hoekstra, A. Y. (2010)](#mekonnen2011). The green, blue and grey water footprint of farm animals and animal products. Volume 2: Appendices | External data set | livestock type | liters per head per day |
| Electricity cooling system shares | Histroical shares of cooling system types associated with power plants aggregated to GCAM3 regions | UCS and Schakel Inventories | External data set | GCAM3 region, power plant type, cooling system type, water type (fresh, seawater), and year | Unitless |
| Electricity water coefficients | Water withdrawal and consumption coefficients for power plants and cooling system types | External data set | Macknick et al., 2011 | fuel, power plant type, cooling system type, water type (fresh, seawater) | $$m^3$$ per MWh |
| Primary energy water coefficients | Water coefficients for the consumption of water during the process of mining primary energy fuel sources | Maheu, A. (2009). Energy choices and their impacts on demand for water resources: An assessment of current and projected water consumption in global energy production. Unisféra. | External data set | global, fuel, mining technology, water type (consumption) | $$m^3$$ per TJ |
| Municipal water withdrawals | Water withdrawal values for municipalities include data, as reported, from 1987 to 2017 | FAO Aquastat | External data set | GCAM region, year | $$km^3$$ |
| Municipal water use efficiency | Water efficiency values for municipalities | Shiklomanov 2000 | Continent | Percent |
| Municipal water cost | Price per unit of water delivered to municipalities | International Benchmarking Network for Water and Sanitation Utilities (IBNET) | External data set | Country | USD per $$km^3$$ |

Table 2: External inputs used for demand of water <sup>[2](#table_footnote2)</sup>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

#### Data

##### Agriculture water coefficients
The raw data used for agricultural water coefficients is provided in [Mekonnen_Hoekstra_Rep47_A2.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/Mekonnen_Hoekstra_Rep47_A2.csv). Note that these water demand estimates are built up from gridded (for 18 crops) and nation-level (for the remaining ~150 crops) "water footprint" estimates of [Mekonnen and Hoekstra 2011](#mekonnen2011).

##### Industrial manufacturing water coefficients

The data specifying manufacturing water coefficients is specified in [Vassolo_mfg_water.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/water/Vassolo_mfg_water.csv). Note that this data is derived from the [Vassolo and Döll 2005](#vassolo2005) global inventory of manufacturing and electric power water demands for a base year of 1995. The manufacturing water demands of each country are multiplied by an exogenous ratio of self-supply to total industrial withdrawals (about 0.8; this comes from US-specific data in [Kenny et al. 2009](#kenny2009)), and extrapolated to all historical years assuming a fixed ratio between industrial electricity and water demands. The values estimated from this bottom-up calculation are limited to a maximum of 85% of the corresponding nation and year's estimate of industrial water withdrawals in [FAO Aquastat](#fao2016). 

### Food / Feed / Forestry

#### Description

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Historical demand for crops | Demand for agricultural commodities in the historical period; used for initialization/calibration of GCAM | External data | FAO | Specified by crop, use, country, and year | tons |
| Historical demand for livestock | Demand for livestock commodities in the historical period; used for initialization/calibration of GCAM | External data | FAO | Specified by crop, use, country, and year | tons |
| Historical demand for forest | Demand for forest products in the historical period; used for initialization/calibration of GCAM | External data | FAO | Specified by country and year | m<sup>3</sup> |
| Income and price elasticity | Income and price elasticity of demand (only used for non-food demand) | Assumption |  | Specified by demand | unitless |
| Logit exponents | Share parameters dictating substitution between different commodities | Assumption |  | Specified by type demand | unitless |

Table 3: External inputs used for demand of food, feed, and forestry <sup>[3](#table_footnote3)</sup>

Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

#### Data

##### Historical demand for crops

Historical demand for agricultural commodities is provided in separate files for [food](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_Food_t_SUA.csv), [feed](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_Feed_t_SUA.csv),  [export](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_Exp_t_SUA.csv), and [import](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_ag_Imp_t_SUA.csv).

##### Historical demand for livestock

Historical demand for livestock commodities is provided in separate files for [food](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_an_Food_t_SUA.csv), [feed](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_an_Feed_t_SUA.csv),  [export](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_an_Exp_t_SUA.csv), and [import](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_an_Imp_t_SUA.csv).

##### Historical forest data

Historical data for forest demand is determined by [production](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_For_Prod_m3_FORESTAT.csv), [export](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_For_Exp_m3_FORESTAT.csv), and [import](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/FAO/FAO_For_Imp_m3_FORESTAT.csv) data.

##### Income and price elasticity

Price and income elasticity are specified in [A_demand_supplysector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/A_demand_supplysector.csv).

##### Logit exponents

Logit exponents are specified in [A_demand_supplysector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/A_demand_supplysector.csv) and [A_demand_subector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/A_demand_subsector.csv).

## References

<a name="davies2013">[Davies et al. 2013]</a> Davies, E.G.R., Kyle, P., and Edmonds, J. 2013. An integrated assessment of global and regional water demands for electricity generation to 2095. *Advances in Water Resources* 52(3), pp 296-313. [Link](https://www.sciencedirect.com/science/article/pii/S0309170812003028)

<a name="fao2016">[FAO Aquastat]</a> FAO. 2016. *AQUASTAT Main Database*, Food and Agriculture Organization of the United Nations (FAO). [Link](http://www.fao.org/faostat/en/)

<a name="faostat2016">[FAOSTAT]</a> FAO. 2016. *FAOSTAT Statistics Database*, Food and Agriculture Organization of the United Nations (FAO). [Link](http://www.fao.org/nr/water/aquastat/data/query/index.html?lang=en)

<a name="hejazi2014">[Hejazi et al. 2014]</a> Hejazi, M., J. Edmonds, L. Clarke, P. Kyle, E. Davies, V. Chaturvedi, M. Wise, P. Patel, J. Eom, K. Calvin, R. Moss, and S. Kim. 2014. Long-term global water projections using six socioeconomic scenarios in an integrated assessment modeling framework. *Technological Forecasting and Social Change* 13, pp 112-123. [Link](https://www.sciencedirect.com/science/article/pii/S0040162513001169)

<a name="kenny2009">[Kenny et al. 2009]</a> Kenny, J., N. Barber, S. Hutson, K. Linsey, J. Lovelace, M. Maupin. *Estimated use of water in the United States in 2005* Circular 1344, U.S. Geological Survey, U.S. Department of the Interior, Reston, Virginia. [Link](https://pubs.usgs.gov/circ/1344/pdf/c1344.pdf)

<a name="mekonnen2011">[Mekonnen and Hoekstra 2011]</a> Mekonnen, M.M., and Hoekstra, A.Y. 2011. The green, blue and grey water footprint of crops and derived crop products. *Hydrology and Earth System Sciences* 15, pp 1577–1600. [Link](https://www.hydrol-earth-syst-sci.net/15/1577/2011/hess-15-1577-2011.html)

<a name="vassolo2005">[Vassolo and Döll 2005]</a> Vassolo, S., and Döll, P. 2005. Global-scale gridded estimates of thermoelectric power and manufacturing water use. *Water Resources Research* 41, W04010. [Link](http://www.uni-frankfurt.de/45217769/Vassolo_Doell_WRR2005.pdf)


<font size="-1"><a name="table_footnote1">1</a>: Note that this table differs from the one provided on the <a href="demand_energy.html#inputstothemodel">Energy Demand Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>    

<a name="table_footnote2">2</a>: Note that this table differs from the one provided on the <a href="demand_water.html#inputstothemodel">Water Demand Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>  

<a name="table_footnote3">3</a>: Note that this table differs from the one provided on the <a href="demand_land.html#inputstothemodel">Food, Feed, and Forestry Demand Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.</font>  
