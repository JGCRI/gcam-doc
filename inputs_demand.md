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
|  |  | |  |  |

Table 1: External inputs used for demand of energy<sup>[1](#table_footnote1)</sup>

#### Data

##### Variable #1
<Insert links to the input files on Github>

### Water





#### Description

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Agriculture water coefficients | Water coefficients for agricultural commodities, including blue (irrigation) and green (rain) water, includes data for a single year circa 2000 | External data set | <a href="http://waterfootprint.org/media/downloads/Report47-Appendix-II.zip">Mekonnen and Hoekstra</a> | Crop, country, water type (blue, green) | $$m^3$$ per ton |
| Industrial manufacturing water coefficients | Water coefficients for industrial manufacturing for 1995 | External data set | [Vassolo and Döll 2005](#vassolo2005) | Continent and water type (withdrawals, consumption) | $$Mm^3$$ per year |


Table 2: External inputs used for demand of water <sup>[2](#table_footnote2)</sup>

#### Data

##### Agriculture water coefficients
The raw data used for agricultural water coefficients is provided in [Mekonnen_Hoekstra_Rep47_A2.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/aglu/Mekonnen_Hoekstra_Rep47_A2.csv). Note that these water demand estimates are built up from gridded (for 18 crops) and nation-level (for the remaining ~150 crops) "water footprint" estimates of [Mekonnen and Hoekstra 2011](#mekonnen2011).

##### Industrial manufacturing water coefficients

The main data source used for estimating the manufacturing sector's water consumption is the [Vassolo and Döll 2005](#vassolo2005) global inventory of manufacturing and electric power water demands for a base year of 1995. The manufacturing water demands of each country are multiplied by an exogenous ratio of self-supply to total industrial withdrawals (about 0.8; this comes from US-specific data in [Kenny et al. 2009](#kenny2009)), and extrapolated to all historical years assuming a fixed ratio between industrial electricity and water demands. The values estimated from this bottom-up calculation are limited to a maximum of 85% of the corresponding nation and year's estimate of industrial water withdrawals in [FAO Aquastat](#fao2016). Note that in contrast to the methods documented in [Hejazi et al. 2014](#hejazi2014), we do not estimate the manufacturing sector's water demands as the difference between the Aquastat industrial withdrawals and GCAM's bottom-up estimates of electric power sector demands, due to methodological differences in estimation of power sector water demands. As noted in [Davies et al. 2013](#davies2013), power sector water demand estimates are sensitive to assumptions of the share of power plants using once-through flow cooling systems and the specific water intensities thereof. As such, the difference between the two (Aquastat industrial water and GCAM electricity water) is not deemed to return a reliable estimate of manufacturing water withdrawals in all regions and time periods. Future water demands by the industrial sector simply scale with industrial output.


### Food / Feed / Forestry

#### Description

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
|  |  | |  |  |

Table 3: External inputs used for demand of food, feed, and forestry <sup>[3](#table_footnote3)</sup>

<dt>Historical Consumption</dt> <dd>Inputs include food, non-food, bioenergy, and feed consumption of all crop and forestry products for each of the 32 geopolitical regions for the historical base years. We currently rely on IMAGE for animal feed and FAO data for all remaining inputs. Feed inputs also include secondary outputs of DDGS (dried distillers grains and solubles) from ethanol production, and feedcakes from biodiesel production.</dd>

<dt>Historical Prices</dt> <dd>Inputs include the price of all food, feed, and forestry commodities for our historical base years. We currently use producer prices from FAO for these inputs.</dd>

<dt>Price and Income Elasticities of Food</dt> <dd>Elasticity parameters that influence the response of food to demand to future changes in prices and income levels.</dd>
</dl><br/>


#### Data

##### Variable #1
<Insert links to the input files on Github>

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
