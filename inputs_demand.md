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

#### Data

##### Variable #1
<Insert links to the input files on Github>

## References

<a name="chaturvedi2015">[Chaturvedi et al. 2015]</a> Chaturvedi, V., Hejazi, M., Edmonds, J., Clarke, L., Kyle, P., Davies, E., and Wise, M. 2013. Climate mitigation policy implications for global irrigation water demand. *Mitigation and Adaptation Strategies for Global Change* 20(3), pp 389-407. [Link](https://link.springer.com/article/10.1007/s11027-013-9497-4)

<a name="cui2018">[Cui et al. 2018]</a> Cui, Ryna Yiyun, Katherine Calvin, Leon Clarke, Mohamad Hejazi, Son Kim, Page Kyle, Pralit Patel, Sean Turner and Marshall Wise (2018). *Regional responses to future, demand-driven water scarcity*. Environmental Research Letters, 13, 9. [Link](https://doi.org/10.1088/1748-9326/aad8f7)

<a name="davies2013">[Davies et al. 2013]</a> Davies, E.G.R., Kyle, P., and Edmonds, J. 2013. An integrated assessment of global and regional water demands for electricity generation to 2095. *Advances in Water Resources* 52(3), pp 296-313. [Link](https://www.sciencedirect.com/science/article/pii/S0309170812003028)

<a name="fao2016">[FAO Aquastat]</a> FAO. 2016. *AQUASTAT Main Database*, Food and Agriculture Organization of the United Nations (FAO). [Link](http://www.fao.org/faostat/en/)

<a name="faostat2016">[FAOSTAT]</a> FAO. 2016. *FAOSTAT Statistics Database*, Food and Agriculture Organization of the United Nations (FAO). [Link](http://www.fao.org/nr/water/aquastat/data/query/index.html?lang=en)

<a name="graham2018">[Graham et al. 2018]</a> Graham, N., E. Davies, M. I. Hejazi, K. Calvin, S. H. Kim, L. Helinksi, F.R. Miralles-Wilhelm, L Clarke, G.P. Kyle, P Patel, M.A. Wise, and C.R. Vernon (2018). *Water sector assumptions for the Shared Socioeconomic Pathways in an integrated modeling framework*. Water Resources Research, 54, [Link](https://doi.org/10.1029/2018WR023452)

<a name="hejazi2013">[Hejazi et al. 2013]</a> Hejazi, M., J. Edmonds, V. Chaturvedi, E. Davies, and J. Eom. Scenarios of global municipal water-use demand projections over the 21st century. *Hydrological Sciences Journal* 58, pp 519-538. [Link](https://www.sciencedirect.com/science/article/pii/S0040162513001169)

<a name="hejazi2014">[Hejazi et al. 2014]</a> Hejazi, M., J. Edmonds, L. Clarke, P. Kyle, E. Davies, V. Chaturvedi, M. Wise, P. Patel, J. Eom, K. Calvin, R. Moss, and S. Kim. 2014. Long-term global water projections using six socioeconomic scenarios in an integrated assessment modeling framework. *Technological Forecasting and Social Change* 13, pp 112-123. [Link](https://www.sciencedirect.com/science/article/pii/S0040162513001169)

<a name="ibnet">[IBNET]</a> IBNET. 2016. *Benchmarking Database*, International Benchmarking Network for Water and Sanitation Utilities (IBNET). [Link](https://www.ib-net.org/)

<a name="kenny2009">[Kenny et al. 2009]</a> Kenny, J., N. Barber, S. Hutson, K. Linsey, J. Lovelace, M. Maupin. *Estimated use of water in the United States in 2005* Circular 1344, U.S. Geological Survey, U.S. Department of the Interior, Reston, Virginia. [Link](https://pubs.usgs.gov/circ/1344/pdf/c1344.pdf)

<a name="kim2016">[Kim et al. 2016]</a> Kim SK, Hejazi M, et al. (2016). *Balancing global water availability and use at basin scale in an integrated assessment model*. Climatic Change 136:217-231. [Link](http://link.springer.com/article/10.1007/s10584-016-1604-6/fulltext.html)

<a name="kyle2013">[Kyle et al. 2013]</a> Davies, E.G.R., Kyle, P., and Edmonds, J. 2013. Kyle, P., E.G.R. Davies, J.J. Dooley, S.J. Smith, L.E. Clarke, J.A. Edmonds, and M.I Hejazi. 2013. Influence of climate change mitigation technology on global demands of water for electricity generation. *International Journal of Greenhouse Gas Control* 13, pp 112-123. [Link](https://www.sciencedirect.com/science/article/pii/S1750583612003179)

<a name="liu2018">[Liu et al. 2018]</a> Liu Y., M. Hejazi, H. Li, X. Zhang, G. Leng (2018). *A  hydrological emulator for global applications - HE v1.0.0*. Geoscientific Model Development. [Link](https://www.geosci-model-dev.net/11/1077/2018/gmd-11-1077-2018.pdf)

<a name="macknick2011">[Macknick et al. 2011]</a> Macknick, J., Newmark, R., Heath, G., and Hallett, K.C. 2011. *A Review of Operational Water Consumption and Withdrawal Factors for Electricity Generating Technologies*. NREL/TP-6A20-50900. National Renewable Energy Laboratory. [Link](https://www.nrel.gov/docs/fy11osti/50900.pdf)

<a name="maheu2009">[Maheu 2009]</a> Maheu, A. 2009. *Energy Choices and their Impacts on Demand for Water Resources: An Assessment of Current and Projected Water Consumption in Global Energy Production.* McGill University, Montreal, Canada. [Link](http://www.unisfera.org/sn_uploads/0Energy_demand_on_water_Finalversion.pdf)

<a name="mekonnen2010">[Mekonnen and Hoekstra 2010]</a> Mekonnen, M.M., and Hoekstra, A.Y. 2010. *The Green, Blue and Grey Water Footprint of Farm Animals and Animal Products. Vol 2: Appendices. Appendix IV. Drinking and service water footprint per animal (litre/day)*. Value of Water Research Report Series No. 48. UNESCO-IHE Institute for Water Education. [Link](http://waterfootprint.org/media/downloads/Report-48-WaterFootprint-AnimalProducts-Vol2.pdf)

<a name="mekonnen2011">[Mekonnen and Hoekstra 2011]</a> Mekonnen, M.M., and Hoekstra, A.Y. 2011. The green, blue and grey water footprint of crops and derived crop products. *Hydrology and Earth System Sciences* 15, pp 1577–1600. [Link](https://www.hydrol-earth-syst-sci.net/15/1577/2011/hess-15-1577-2011.html)

<a name="netl2008">[NETL 2008]</a> National Energy Technology Laboratory. *Water Requirements for Existing and Emerging Thermoelectric Plant Technologies*. DOE/NETL-402/080108, National Energy Technology Laboratory. [Link](http://www.circleofblue.org/wp-content/uploads/2010/08/Water-Requirements-for-Existing-and-Emerging-Thermoelectric-Technology.pdf)

<a name="oecd2009">[OECD 2009]</a>. *Managing Water for All: An OECD Perspective on Pricing and Financing*, OECD, Paris. [Link](https://www.oecd.org/env/42350563.pdf)

<a name="rohwer2007">[Rowher et al. 2007]</a> Rohwer, J., Gerten, D., and Lucht, W. 2007. *Development of Functional Irrigation Types for Improved Global Crop Modelling* PIK Report No. 104, Potsdam Institute for Climate Impact Research. [Link](https://www.pik-potsdam.de/research/publications/pikreports/.files/pr104.pdf)

<a name="shiklomanov2000">[Shiklomanov 2000]</a> Shiklomanov, I. 2000. World water resources and water use: present assessment and outlook for 2025. pp. 160-203 in: Rijsberman, F.R. (Ed.), *World Water Scenarios: Analysis of Global Water Resources and Use*. Earthscan, London, UK. [Link](http://www.uni-frankfurt.de/45217769/Vassolo_Doell_WRR2005.pdf)

<a name="solley1998">[Solley et al. 1998]</a> Solley, W., R. Pierce, H. Perlman. 1998. *Estimated use of water in the United States in 1995* Circular 1200, U.S. Geological Survey, U.S. Department of the Interior, Reston, Virginia. [Link](https://pubs.usgs.gov/circ/1998/1200/report.pdf)

<a name="turner2019a">[Turner et al. 2019a]</a> Turner S.W.D., M. Hejazi, C. Yonkofski, S. Kim, P. Kyle (2019a). *Influence of groundwater extraction costs and resource depletion limits on simulated global nonrenewable water withdrawals over the 21st century*. Earth's Future (2019), 10.1029/2018EF001105  [Link](https://doi.org/10.1029/2018EF001105)

<a name="turner2019b">[Turner et al. 2019b]</a> Turner, Sean, Mohamad Hejazi, Katherine Calvin, Page Kyle, Sonny Kim (2019b). *A pathway of global food supply adaptation in a world with increasingly constrained groundwater*. Science of The Total Environment, 673, 165-176, [Link](https://doi.org/10.1016/j.scitotenv.2019.04.070).

<a name="vassolo2005">[Vassolo and Döll 2005]</a> Vassolo, S., and Döll, P. 2005. Global-scale gridded estimates of thermoelectric power and manufacturing water use. *Water Resources Research* 41, W04010. [Link](http://www.uni-frankfurt.de/45217769/Vassolo_Doell_WRR2005.pdf)

<a name="vernon2019">[Vernon 2019]</a> Vernon, C., M. Hejazi, S. Turner, Y. Liu, C. Braun, X. Li, and R. Link. *A Global Hydrologic Framework to Accelerate Scientific Discovery*. Journal of Open Research Software (2019). [Link](https://openresearchsoftware.metajnl.com/articles/10.5334/jors.245/)

<a name="vickers2001">[Vickers 2001]</a> Vickers, A. 2001. *Handbook of Water Use and Conservation*. WaterPlow Press, Amherst, MA, USA. [Link](http://waterplowpress.com/)

<a name="yonkofski2019">[Yonkofski et al. 2019]</a> Yonkofski, C., Watson, D., Hejazi, M. 2019 *Cost and Availability of Non-renewable Groundwater*. Earth’s Future (in review).


<font size="-1"><a name="table_footnote1">1</a>: Note that this table differs from the one provided on the <a href="demand_energy.html#inputstothemodel">Energy Demand Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>    

<a name="table_footnote2">2</a>: Note that this table differs from the one provided on the <a href="demand_water.html#inputstothemodel">Water Demand Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.<br/>  

<a name="table_footnote3">3</a>: Note that this table differs from the one provided on the <a href="demand_land.html#inputstothemodel">Food, Feed, and Forestry Demand Modeling Page</a> in that it only lists external inputs to the supply model (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.</font>  
