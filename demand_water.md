---
layout: index
title: Demand for Water
prev: inputs_demand.html
next: outputs_quantity.html
gcam-version: v5.3 
---

# Table of Contents

- [Inputs to the Module](#inputs-to-the-module)
- [Description](#description)
- [Equations](#equations)
- [Insights and intuition](#insights-and-intuition)
- [Policy options](#policy-options)
- [IAMC Reference Card](#iamc-reference-card)
- [References](#references)

## Inputs to the Module

**Table 1: Inputs required by the demand module <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
| Crop water coefficients | GLU, GCAM commodity, water type (consumption, withdrawals, biophysical consumption) and year | $$km^3$$ per Mt | [Exogenous](inputs_demand.html) |
| Crop production | GLU, GCAM commodity, and year | Mt per year | [Land Supply Module](supply_land.html) |
| Electricity water coefficients | GCAM region, technology, water type (consumption, withdrawals) and year | $$km^3$$ per EJ | [Exogenous](inputs_demand.html) |
| Electricity production | GCAM region, technology, and year | EJ per year | [Energy Supply Module](supply_energy.html) |
| Livestock water coefficients | GCAM region, livestock type, water type (consumption, withdrawals, biophysical consumption) and year | $$km^3$$ per Mt | [Exogenous](inputs_demand.html) |
| Livestock production | GCAM region, livestock type, and year | Mt per year | [Land Supply Module](supply_land.html) |
| Primary energy water coefficients | GCAM region, fuel, water type (consumption, withdrawals, biophysical consumption) and year | $$km^3$$ per EJ | [Exogenous](inputs_demand.html) |
| Primary energy production | GCAM region, fuel, and year | EJ per year | [Energy Supply Module](supply_energy.html) |
| Industry water coefficients | GCAM region, water type (consumption, withdrawals, biophysical consumption) and year | $$km^3$$ per EJ | [Exogenous](inputs_demand.html) |
| Industry output | GCAM region and year | EJ per year | [Energy Demand Module](demand_energy.html) |
| Income and price elasticity | By region, demand, and year | unitless | [Exogenous](inputs_demand.html) |
| GDP per capita | By region and year | thous 1990$ per person | [Economy Module](economy.html) |
| Population | By region and year | thousand | [Economy](economy.html) |

<font size="-1">
<a name="table_footnote">1</a>: Note that this table differs from the one provided on the <a href="inputs_demand.html#water">Demand Inputs Page</a> in that it lists all inputs to the water demand module, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.
</font>

<br/>

## Description

Water demand is calculated for six major sectors: [agriculture](#agriculture), [electricity generation](#electricity-generation), [industrial manufacturing](#industrial-manufacturing), [primary energy production](#primary-energy-production), [livestock](#livestock), and [municipal uses](#municipal-uses). For each sector, up to four types of water demand are represented (see [Types of water in GCAM](#types-of-water-in-gcam))

### Agriculture

Agriculture water demand is determined by exogenously specified water coefficients and endogenously determined crop production. For irrigated crop production, GCAM tracks three types of water demands identified above: water withdrawals, water consumption, and biophysical water consumption. Here, "water withdrawals" refer to irrigation water applied to agricultural fields, and include evapo-transpiration requirements of crops that are met by irrigation water (i.e., "blue water"), plus any "field losses" of water. Note that upstream "conveyance losses"--i.e., water that leaks or evaporates from distribution canals--are represented in the water transport and distribution sectors, not in the crop technologies. The loss coefficients for conveyance and field losses are from the country-level estimates of [Rohwer et al. 2007](#rohwer2007). For irrigated crops, "water consumption" refers to the evapo-transpiration requirements of the crops that is met by irrigation water (i.e., "blue water"). Both water withdrawals and consumption exclude rainfall-derived water ("green water") consumed by crops grown in irrigated systems. "Biophysical water consumption", which applies equally to rainfed and irrigated technologies within any basin and crop type, is the sum of blue and green water requirements. It excludes any field or conveyance losses.

More documentation of the approach to modeling agricultural water demand in GCAM is available in [Chaturvedi et al. 2015](#chaturvedi2015) and [Hejazi et al. 2014](#hejazi2014)

### Electricity Generation

GCAM represents up to five cooling options for each thermo-electric power generation technology: once-through, recirculating, cooling pond, dry cooling, and once-through with seawater. These specific cooling technologies, described in [NETL 2008](#netl2008), differ significantly in both water withdrawal and water consumption requirements. The specific water demand coefficients assigned to each power generation and cooling technology are from [Macknick et al. 2011](#macknick2011). Note that not all five cooling system options are available for each power plant technology in each region; for example, cooling ponds were often excluded from underlying inventory estimates, and as such are excluded from some regions and generation technologies. Similarly, at present there is no "dry cooling" option represented for the current generation of thermal nuclear power plants.

Cooling system options compete in a calibrated logit nest, similar to the competition between fuels within this sector. The capital costs are from [NETL 2008](#netl2008) and vary across cooling options. Electric generation efficiencies of dry-cooled power plants are lower than the other cooling options that utilize water. The competition between cooling system options is endogenous and cost-based.<sup>[2](#elec_footnote)</sup>

More documentation of the approach to modeling agricultural water demand in GCAM is available in [Davies et al. 2013](#davies2013), and [Kyle et al. 2013](#kyle2013).

### Industrial manufacturing

The industrial manufacturing sector's water demands include surface and groundwater that is self-supplied by industrial manufacturers. The water demanded by this sector excludes water demands of coal mining and oil and gas production, which are represented in the respective energy production sectors. It also excludes water withdrawn for cooling of on-site (i.e., located at industrial facilities) thermo-electric power generation, which is modeled in the electricity generation sector. Finally, industrial facilities' use of municipal water is also excluded (modeled in the municipal water sector). Note that the definitional bounds differ from the "industrial water withdrawals" in [FAO Aquastat](#fao2016), in that the latter includes the electric power sector.


### Livestock

All types/technologies of animal production in GCAM are assigned a region-specific coefficient of water demand for livestock production, which represents both animal drinking water, plus any other water used by the animal production operations. There is no distinction between withdrawals and consumption in livestock production; all water withdrawn is assumed to be consumed. The coefficients in GCAM are indicated in cubic meters of water per kilogram of animal commodity produced (e.g., beef, dairy, etc). The coefficients are calculated from [Mekonnen and Hoekstra 2010](#mekonnen2010), which provides total water demands in liters of water per animal per day, by country, for a base year of about 2000. The computation of GCAM's water demand coefficients therefore also takes into consideration the animal stocks, which come from [FAOSTAT](#faostat2016). The water demand coefficients computed are held constant over all model time periods.

### Primary energy production

The approach for modeling the water demands of primary energy production is documented in [Hejazi et al. 2014](#hejazi2014), and includes bottom-up estimates of water demand per unit energy produced for the following fuels: coal, oil (conventional and unconventional), natural gas, and uranium. The main data source used for estimating water consumption per unit energy produced is [Maheu 2009](#maheu2009), which offers global average water consumption coefficients for each fuel type. These coefficients are somewhat higher than the values used in GCAM, as they do not distinguish between seawater and freshwater. The values read into GCAM are therefore the [Maheu 2009](#maheu2009) estimates less the fraction assumed to be seawater. This fraction is assumed to be 95% in the Middle East, and 43% in all other regions; the latter value is from a USA-based estimate in [Kenny et al. 2009](#kenny2009). Water withdrawals are estimated as water consumption multiplied by an exogenous withdrawals to consumption ratio of 3.3, which comes from a 1995 USA assessment ([Solley et al. 1998](#solley1998)).

### Municipal uses

Water withdrawals from [FAO Aquastat](#fao2016) are assigned to a "municipal water" sector in each region that grows with population and GDP, with the demand levels moderated by assumed technical change. Municipal water prices come from the International Benchmarking Network for Water and Sanitation Utilities ([IBNET](#ibnet)). The functional form used for projecting future municipal water demand takes future water price increases into account. 

Municipal water consumption is also modeled; the distinction between the two comes from an assumed overall municipal water supply efficiency, based on [Shiklomanov 2000](#shiklomanov2000). Where the withdrawal volume indicates the total water input to the municipal water supply system, consumption indicates only the water that is used by consumers in a way that it is not returned to the immediate water environment.

In the future, the ratio between withdrawals and consumption is assumed static, so both the withdrawals and consumption grow according to the equation above. Future work on adaptive measures can explore the potential changes to withdrawl and consumption intensities.

For more information, see  [Hejazi et al. 2013](#hejazi2013) and summarized in [Hejazi et al. 2014](#hejazi2014).

### Types of water in GCAM

* **water withdrawals**: water diverted or withdrawn from a surface water or groundwater source ([Vickers 2001](#vickers2001)).
* **water consumption**: water use that permanently withdraws water from its source; water that is no longer available because it has evaporated, been transpired by plants, incorporated into products or crops, consumed by people or livestock, or otherwise removed from the immediate water environment ([Vickers 2001](#vickers2001)).
* **biophysical water consumption**: total water required for crop evapo-transpiration; the sum of "blue" and "green" water in [Mekonnen and Hoekstra 2011](#mekonnen2011)
* **seawater**: water from the oceans, including brackish estuaries, that is withdrawn for cooling thermo-electric power plants, or used in primary energy production.


### Basin-To-Region and Basin-To-Sector Mapping

Agricultural water demand is modeled at the basin level directly. Demands for water from other sectors are modeled at the geopolitical region and then mapped to the basin. For more information, see the detailed description of the [basin mapping](details_water.html#basin-to-region-and-basin-to-sector-mapping).


## Equations 
The equations that determine water demand are described here.

#### Municipal water demand

The equation is shown below for per-capita municipal water demands (*pcW*) from time period *t-1* to time period *t*.

$$
pcW_t = pcW_{t-1} * (\frac{pcGDP_t}{pcGDP_{t-1}})^{0.37} *
  (\frac{P_t}{P_{t-1}})^{-0.33} * (1 - Tech_t)
$$

where pcGDP is per-capita GDP, P is water price, and Tech stands for autonomous technological change, an exogenous assumption.

See `calcDemand` in [minicam_price_elasticity_function.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/functions/source/minicam_price_elasticity_function.cpp).

## Insights and intuition

### Dynamics of electricity cooling systems

When water supply constraints are not imposed or when water prices and scarcity is low, the shares of different cooling systems in the electricity generation sector tend to largely reflect the exogenous share-weight assumptions, which follow the assumptions and logic of [Davies et al. 2013](#davies2013). On the other hand, when water supply constraints are imposed and regional water scarcity escalates, the cost of water use directly affects the choice of cooling system. Most regions shift from once-through to recirculating systems over time, but regions that use primarily seawater at present are assumed to continue to do so in all future time periods.

## IAMC Reference Card

Not applicable. The IAMC reference card does not have water demand related entries.

<font size="-1">
<a name="elec_footnote">2</a>: Note that because of the limits to the supplysector/subsector/technology structure of the energy system technologies in GCAM, this additional "cooling system" level of nesting is achieved through the use of “pass-through” technologies and sectors. To help with interpretation of the model output, the electric sector queries have been written to report these cooling system technologies under the "electricity" sector, but the raw input XML files and model output nevertheless have the fully disaggregated structure.
</font>

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

<a name="shiklomanov2000">[Shiklomanov 2000]</a> Shiklomanov, I. 2000. World water resources and water use: present assessment and outlook for 2025. pp. 160-203 in: Rijsberman, F.R. (Ed.), *World Water Scenarios: Analysis of Global Water Resources and Use*. Earthscan, London, UK. 

<a name="solley1998">[Solley et al. 1998]</a> Solley, W., R. Pierce, H. Perlman. 1998. *Estimated use of water in the United States in 1995* Circular 1200, U.S. Geological Survey, U.S. Department of the Interior, Reston, Virginia. [Link](https://pubs.usgs.gov/circ/1998/1200/report.pdf)

<a name="vickers2001">[Vickers 2001]</a> Vickers, A. 2001. *Handbook of Water Use and Conservation*. WaterPlow Press, Amherst, MA, USA. [Link](http://waterplowpress.com/)

<a name="yonkofski2019">[Yonkofski et al. 2019]</a> Yonkofski, C., Watson, D., Hejazi, M. 2019 *Cost and Availability of Non-renewable Groundwater*. Earth’s Future (in review).


