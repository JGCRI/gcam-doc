---
layout: index
title: The GCAM Water Module
prev: aglu.html
next: hector.html
gcam-version: v5.1
---

## Water Demand

Based on contributions of a number of GCAM developers and collaborators, GCAM now represents water demands throughout the energy and agricultural systems. The types of water flows represented include the following:

* **water withdrawals**: water diverted or withdrawn from a surface water or groundwater source ([Vickers 2001](water.html#vickers2001)).
* **water consumption**: water use that permanently withdraws water from its source; water that is no longer available because it has evaporated, been transpired by plants, incorporated into products or crops, consumed by people or livestock, or otherwise removed from the immediate water environment ([Vickers 2001](water.html#vickers2001)).
* **biophysical water consumption**: total water required for crop evapo-transpiration; the sum of "blue" and "green" water in [Mekonnen and Hoekstra 2011](water.html#mekonnen2011)
* **seawater**: water from the oceans, including brackish estuaries, that is withdrawn for cooling thermo-electric power plants, or used in primary energy production.

Water demand representations have been constructed for six major sectors: agriculture, electrity generation, industrial manufacturing, primary energy production, livestock, and municipal uses. Municipal water demands are represented in a specific "municipal water" sector, but all other water demands are modeled as inputs to otherwise existing technologies in the energy and AgLU systems. The sectors relevant for water demands are described below.

### Agriculture
Water demands of agriculture in GCAM have been documented in [Chaturvedi et al. 2015](water.html#chaturvedi2015) and [Hejazi et al. 2014](water.html#hejazi2014), but the present version of GCAM includes a number of updates from the methods documented therein. As indicated in the [AgLU documentation](aglu.html), crop production in each of GCAM's regions is subdivided into the following explicitly modeled categories relevant for water demands: crop type, water basin, and whether the production system is irrigated or rainfed. The water demand estimates are built up from gridded (for 18 crops) and nation-level (for the remaining ~150 crops) "water footprint" estimates of [Mekonnen and Hoekstra 2011](water.html#mekonnen2011).

Irrigated crop production technologies take three types of water demands identified above: water withdrawals, water consumption, and biophysical water consumption. Here, "water withdrawals" refer to irrigation water applied to agricultural fields, and include evapo-transpiration requirements of crops that are met by irrigation water (i.e., "blue water"), plus any "field losses" of water. Note that upstream "conveyance losses"--i.e., water that leaks or evaporates from distribution canals--are represented in the water transmission and distribution sectors, not in the crop technologies. The loss coefficients for conveyance and field losses are from the country-level estimates of [Rohwer et al. 2007](water.html#rohwer2007). For irrigated crops, "water consumption" refers to the evapo-transpiration requirements of the crops that is met by irrigation water (i.e., "blue water"). Both water withdrawals and consumption exclude rainfall-derived water ("green water") consumed by crops grown in irrigated systems. "Biophysical water consumption", which applies equally to rainfed and irrigated technologies within any basin and crop type, is the sum of blue and green water requirements. It excludes any field or conveyance losses.

The input data pertaining to water requirements of crop production address a single time slice, of around the year 2000, and are based on historical climatic conditions. In the historical model time periods, water demand coefficients of any crop production technology may fluctuate due to compositional shifts within multi-crop commodities, and/or due to geographic shifts in the production in any multi-country land use regions. In future time periods, all water demand coefficients are held constant.

### Electricity Generation
The general approach and data sources used for power sector water demands are documented in [Davies et al. 2013](water.html#davies2013), and [Kyle et al. 2013](water.html#kyle2013). However, where in these initial studies each region and generation technology was exogenously assigned water withdrawal and consumption coefficients that were based on assumptions about shares of different cooling system types in each region and time period, in the present version of GCAM each cooling system type is modeled explicitly.

GCAM represents up to five cooling options for each thermo-electric power generation technology: once-through, recirculating, cooling pond, dry cooling, and once-through with seawater. These specific cooling technologies, described in [NETL 2008](water.html#netl2008), differ significantly in both water withdrawal and water consumption requirements. The specific water demand coefficients assigned to each power generation and cooling technology are from [Macknick et al. 2011](water.html#macknick2011). Note that not all five cooling system options are available for each power plant technology in each region; for example, cooling ponds were often excluded from underlying inventory estimates, and as such are excluded from some regions and generation technologies. Similarly, there is no "dry cooling" option represented for nuclear power plants.

Cooling system options compete in a calibrated logit nest, similar to the competition between fuels within this sector. The capital costs vary, and are from [NETL 2008](water.html#netl2008). Electric generation efficiencies of dry-cooled power plants are lower than the other options. While the competition between cooling system options is endogenous and cost-based, because water prices and scarcity are not represented, the model output tends to largely reflect the exogenous share-weight assumptions, which follow the assumptions and logic of [Davies et al. 2013](water.html#davies2013). Specifically, most regions are assumed to shift from once-through to recirculating systems over time, but regions that use primarily seawater at present are assumed to continue to do so in all future time periods.

Note that because of the supplysector/subsector/technology structure of the energy system technologies in GCAM, this additional "cooling system" level of nesting is achieved through the use of “pass-through” technologies and sectors. This strategy is also used to create the transportation sector's multi-level nested structure, which includes modes, sub-modes, vehicle size classes, and fuel drivetrains. To help with interpretation of the model output, the electric sector queries have been written to report these cooling system technologies under the "electricity" sector, but the raw input XML files and model output nevertheless have the fully disaggregated structure.

### Industrial Manufacturing
The industrial manufacturing sector's water demands include surface and groundwater that is self-supplied by industrial manufacturers. The water demanded by this sector excludes water demands of coal mining and oil and gas production, which are represented in the respective energy production sectors. It also excludes water withdrawn for cooling of on-site (i.e., located at industrial facilities) thermo-electric power generation, which is modeled in the electricity generation sector. Finally, industrial facilities' use of municipal water is also excluded (modeled in the municipal water sector). Note that the definitional bounds differ from the "industrial water withdrawals" in [FAO Aquastat](water.html#fao2016), in that the latter includes the electric power sector.

The main data source used for estimating the manufacturing sector's water consumption is the [Vassolo and Döll 2005](water.html#vassolo2005) global inventory of manufacturing and electric power water demands for a base year of 1995. The manufacturing water demands of each country are multiplied by an exogenous ratio of self-supply to total industrial withdrawals (about 0.8; this comes from US-specific data in [Kenny et al. 2009](water.html#kenny2009)), and extrapolated to all historical years assuming a fixed ratio between industrial electricity and water demands. The values estimated from this bottom-up calculation are limited to a maximum of 85% of the corresponding nation and year's estimate of industrial water withdrawals in [FAO Aquastat](water.html#fao2016). Note that in contrast to the methods documented in [Hejazi et al. 2014](water.html#hejazi2014), we do not estimate the manufacturing sector's water demands as the difference between the Aquastat industrial withdrawals and GCAM's bottom-up estimates of electric power sector demands, due to methodological differences in estimation of power sector water demands. As noted in [Davies et al. 2013](water.html#davies2013), power sector water demand estimates are sensitive to assumptions of the portion of power plants using once-through flow cooling systems, and the specific water intensities thereof. As such, the difference between the two is not deemed to return a reliable estimate of manufacturing water withdrawals in all regions and time periods.

Future water demands by the industrial sector simply scale with industrial output.

### Livestock
All technologies of animal production in GCAM are assigned a region-specific coefficient of water demand for livestock production, which represents both animal drinking water, plus any other water used by the animal production operations. There is no distinction between withdrawals and consumption in livestock production; all water withdrawn is assumed to be consumed. The coefficients in GCAM are indicated in cubic meters of water per kilogram of animal commodity produced (e.g., beef, dairy, etc). The coefficients are calculated from [Mekonnen and Hoekstra 2010](water.html#mekonnen2010), which provides total water demands in liters of water per animal per day, by country, for a base year of about 2000. The computation of GCAM's water demand coefficients therefore also takes into consideration the animal stocks, which come from [FAOSTAT](water.html#faostat2016). The water demand coefficients computed are held constant over all model time periods.

### Municipal
Municipal water in GCAM is documented in detail in [Hejazi et al. 2013](water.html#hejazi2013) and summarized in [Hejazi et al. 2014](water.html#hejazi2014). Water withdrawals from [FAO Aquastat](water.html#fao2016) are assigned to a "municipal water" sector in each region that grows with population and GDP, with the demand levels moderated by assumed technical change. Municipal water prices come from the International Benchmarking Network for Water and Sanitation Utilities ([IBNET](water.html#ibnet)). The functional form used for projecting future municipal water demand takes future price increases into account, although as a practical matter GCAM does not currently change water prices or municipal water system costs over time. The equation is shown below for per-capita water demands (*pcW*) from time period *t-1* to time period *t*.

$$
pcW_t = pcW_{t-1} * (\frac{pcGDP_t}{pcGDP_{t-1}})^{0.37} *
  (\frac{P_t}{P_{t-1}})^{-0.33} * (1 - Tech_t)
$$

where pcGDP is per-capita GDP, P is price, and Tech stands for autonomous technological change, an exogenous assumption.

Municipal water consumption is also modeled; the distinction between the two comes from an assumed overall municipal water supply efficiency, based on [Shiklomanov 2000](water.html#shiklomanov2000). Where the withdrawal volume indicates the total water input to the municipal water supply system, consumption indicates only the water that is used by consumers in a way that it is not returned to the immediate water environment.

In the future, the ratio between withdrawals and consumption is assumed static, so both the withdrawals and consumption grow according to the equation above.

### Primary Energy
The approach for modeling the water demands of primary energy production is documented in [Hejazi et al. 2014](water.html#hejazi2014), and includes bottom-up estimates of water demand per unit energy produced for the following fuels: coal, oil (conventional and unconventional), natural gas, and uranium. The main data source used for estimating water consumption per unit energy produced is [Maheu 2009](water.html#maheu2009), which offers global average water consumption coefficients for each fuel type. These coefficients are somewhat higher than the values used in GCAM, as they do not distinguish between seawater and freshwater. The values read into GCAM are therefore the [Maheu 2009](water.html#maheu2009) estimates less the fraction assumed to be seawater. This fraction is assumed to be 95% in the Middle East, and 43% in all other regions; the latter value is from a USA-based estimate in [Kenny et al. 2009](water.html#kenny2009). Water withdrawals are estimated as water consumption multiplied by an exogenous withdrawals:consumption ratio of 3.3, which comes from a 1995 USA assessment ([Solley et al. 1998](water.html#solley1998)).

## Water Supply
Water supply in GCAM is modeled as unlimited resources; most of the water types identified above have no price assigned to them. Freshwater withdrawals are assigned an exogenous price of about $0.003 per cubic meter, intended to reflect the cost of lifting and conveyance. Treatment and distribution costs and energy requirements are not explicitly part of GCAM at present, though these are part of the costs assumed for the municipal water sector.

## References

<a name="chaturvedi2015">[Chaturvedi et al. 2015]</a> Chaturvedi, V., Hejazi, M., Edmonds, J., Clarke, L., Kyle, P., Davies, E., and Wise, M. 2013. Climate mitigation policy implications for global irrigation water demand. *Mitigation and Adaptation Strategies for Global Change* 20(3), pp 389-407. [Link](https://link.springer.com/article/10.1007/s11027-013-9497-4)

<a name="davies2013">[Davies et al. 2013]</a> Davies, E.G.R., Kyle, P., and Edmonds, J. 2013. An integrated assessment of global and regional water demands for electricity generation to 2095. *Advances in Water Resources* 52(3), pp 296-313. [Link](https://www.sciencedirect.com/science/article/pii/S0309170812003028)

<a name="fao2016">[FAO Aquastat]</a> FAO. 2016. *AQUASTAT Main Database*, Food and Agriculture Organization of the United Nations (FAO). [Link](http://www.fao.org/faostat/en/)

<a name="faostat2016">[FAOSTAT]</a> FAO. 2016. *FAOSTAT Statistics Database*, Food and Agriculture Organization of the United Nations (FAO). [Link](http://www.fao.org/nr/water/aquastat/data/query/index.html?lang=en)

<a name="hejazi2013">[Hejazi et al. 2013]</a> Hejazi, M., J. Edmonds, V. Chaturvedi, E. Davies, and J. Eom. Scenarios of global municipal water-use demand projections over the 21st century. *Hydrological Sciences Journal* 58, pp 519-538. [Link](https://www.sciencedirect.com/science/article/pii/S0040162513001169)

<a name="hejazi2014">[Hejazi et al. 2014]</a> Hejazi, M., J. Edmonds, L. Clarke, P. Kyle, E. Davies, V. Chaturvedi, M. Wise, P. Patel, J. Eom, K. Calvin, R. Moss, and S. Kim. 2014. Long-term global water projections using six socioeconomic scenarios in an integrated assessment modeling framework. *Technological Forecasting and Social Change* 13, pp 112-123. [Link](https://www.sciencedirect.com/science/article/pii/S0040162513001169)

<a name="ibnet">[IBNET]</a> IBNET. 2016. *Benchmarking Database*, International Benchmarking Network for Water and Sanitation Utilities (IBNET). [Link](https://www.ib-net.org/)

<a name="kenny2009">[Kenny et al. 2009]</a> Kenny, J., N. Barber, S. Hutson, K. Linsey, J. Lovelace, M. Maupin. *Estimated use of water in the United States in 2005* Circular 1344, U.S. Geological Survey, U.S. Department of the Interior, Reston, Virginia. [Link](https://pubs.usgs.gov/circ/1344/pdf/c1344.pdf)

<a name="kyle2013">[Kyle et al. 2013]</a> Davies, E.G.R., Kyle, P., and Edmonds, J. 2013. Kyle, P., E.G.R. Davies, J.J. Dooley, S.J. Smith, L.E. Clarke, J.A. Edmonds, and M.I Hejazi. 2013. Influence of climate change mitigation technology on global demands of water for electricity generation. *International Journal of Greenhouse Gas Control* 13, pp 112-123. [Link](https://www.sciencedirect.com/science/article/pii/S1750583612003179)

<a name="macknick2011">[Macknick et al. 2011]</a> Macknick, J., Newmark, R., Heath, G., and Hallett, K.C. 2011. *A Review of Operational Water Consumption and Withdrawal Factors for Electricity Generating Technologies*. NREL/TP-6A20-50900. National Renewable Energy Laboratory. [Link](https://www.nrel.gov/docs/fy11osti/50900.pdf)

<a name="maheu2009">[Maheu 2009]</a> Maheu, A. 2009. *Energy Choices and their Impacts on Demand for Water Resources: An Assessment of Current and Projected Water Consumption in Global Energy Production.* McGill University, Montreal, Canada. [Link](http://www.unisfera.org/sn_uploads/0Energy_demand_on_water_Finalversion.pdf)

<a name="mekonnen2010">[Mekonnen and Hoekstra 2010]</a> Mekonnen, M.M., and Hoekstra, A.Y. 2010. *The Green, Blue and Grey Water Footprint of Farm Animals and Animal Products. Vol 2: Appendices. Appendix IV. Drinking and service water footprint per animal (litre/day)*. Value of Water Research Report Series No. 48. UNESCO-IHE Institute for Water Education. [Link](http://waterfootprint.org/media/downloads/Report-48-WaterFootprint-AnimalProducts-Vol2.pdf)

<a name="mekonnen2011">[Mekonnen and Hoekstra 2011]</a> Mekonnen, M.M., and Hoekstra, A.Y. 2011. The green, blue and grey water footprint of crops and derived crop products. *Hydrology and Earth System Sciences* 15, pp 1577–1600. [Link](https://www.hydrol-earth-syst-sci.net/15/1577/2011/hess-15-1577-2011.html)

<a name="netl2008">[NETL 2008]</a> National Energy Technology Laboratory. *Water Requirements for Existing and Emerging Thermoelectric Plant Technologies*. DOE/NETL-402/080108, National Energy Technology Laboratory. [Link](http://www.circleofblue.org/wp-content/uploads/2010/08/Water-Requirements-for-Existing-and-Emerging-Thermoelectric-Technology.pdf)

<a name="rohwer2007">[Rowher et al. 2007]</a> Rohwer, J., Gerten, D., and Lucht, W. 2007. *Development of Functional Irrigation Types for Improved Global Crop Modelling* PIK Report No. 104, Potsdam Institute for Climate Impact Research. [Link](https://www.pik-potsdam.de/research/publications/pikreports/.files/pr104.pdf)

<a name="shiklomanov2000">[Shiklomanov 2000]</a> Shiklomanov, I. 2000. World water resources and water use: present assessment and outlook for 2025. pp. 160-203 in: Rijsberman, F.R. (Ed.), *World Water Scenarios: Analysis of Global Water Resources and Use*. Earthscan, London, UK. [Link](http://www.uni-frankfurt.de/45217769/Vassolo_Doell_WRR2005.pdf)

<a name="solley1998">[Solley et al. 1998]</a> Solley, W., R. Pierce, H. Perlman. 1998. *Estimated use of water in the United States in 1995* Circular 1200, U.S. Geological Survey, U.S. Department of the Interior, Reston, Virginia. [Link](https://pubs.usgs.gov/circ/1998/1200/report.pdf)

<a name="vassolo2005">[Vassolo and Döll 2005]</a> Vassolo, S., and Döll, P. 2005. Global-scale gridded estimates of thermoelectric power and manufacturing water use. *Water Resources Research* 41, W04010. [Link](http://www.uni-frankfurt.de/45217769/Vassolo_Doell_WRR2005.pdf)

<a name="vickers2001">[Vickers 2001]</a> Vickers, A. 2001. *Handbook of Water Use and Conservation*. WaterPlow Press, Amherst, MA, USA. [Link](http://waterplowpress.com/)

