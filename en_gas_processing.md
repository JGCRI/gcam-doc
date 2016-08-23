---
layout: index
title: Gas Processing
next: en_hydrogen.html
current-version: v4.2 
---

The structure of the natural gas supply and distribution in GCAM is shown in Figure 1:
![Figure 1](gcam-figs/gas_processing.png)
Figure 1: Gas processing and distribution, with example coefficients.
{: .fig}

Note that in this structure, biogas and coal gas compete for market share of the "gas processing" market, which is upstream of the gas pipeline and distribution sectors. This structure is intended to allow for substitution away from natural gas as the feedstock for the gaseous fuels used by the energy transformation and consumption sectors, as determined by the relative economics. The three subsectors of the gas processing sector, and the downstream sectors are described below.

### Natural Gas
Natural gas accounts for almost 99% of the gaseous fuel production represented in GCAM's calibration year (2010). The natural gas commodity in GCAM includes all gaseous fuels produced at gas wells, the gaseous co-products from oil production, and gas produced from coal mines and coal seams. The natural gas commodity excludes natural gas liquids, and it excludes gas that is vented, flared, or re-injected. Further information is available in [Mapping the IEA Energy Balances](en_IEA_mapping.html) and [IEA's (2011)](http://wds.iea.org/wds/pdf/documentation_OECDBAL_2011.pdf).

In the gas processing sector, the natural gas technology is assigned an input-output coefficient of 1, as natural gas plant fuel is not a disaggregated flow in the IEA energy balances.

### Coal Gasification
The GCAM coal gasification technology in historical years represents gas works gas, or town gas, that is produced from coal. It does not include blast furnace gas, coke oven gas, and other coal-derived gaseous fuels that are by-products of other activities, and typically consumed on-site. Many regions produced no coal gas in 2010. In future periods, the technology represents a broader suite of coal gasification processes that are capable of producing a commodity that competes for market share with natural gas.

### Biomass Gasification
In historical years, biomass gasification, or biogas, is considered to be gases captured from landfills, sludge, and agricultural wastes that are used to provide heat and power. As with coal gasification, in future periods, biomass gasification is intended to represent a broad suite of processes that convert biomass feedstocks into pipeline-grade gaseous fuels that can be used by a variety of end users.

### Gas Pipeline, Delivered Gas, and Wholesale Gas
The gas pipeline sector explicitly represents the energy consumed by compressors for transmission and distribution of natural gas. Delivered gas and wholesale gas are differentiated in their consumers and therefore cost mark-ups; delivered gas refers to gas used by the buildings and transportation sectors, whereas wholesale gas is used by industrial and energy sector consumers. The historical input-output coefficient of the gas pipeline sector in any region is estimated as the sum of reported pipeline energy consumption, delivered gas, and wholesale gas, divided by the sum of delivered gas and wholesale gas.

Note however that the following sectors consume natural gas upstream of the network shown in Figure 1: unconventional oil production, gas-to-liquids refineries, and central hydrogen production. The gas used by these three processes is not assigned the cost mark-ups or upstream pipeline losses assumed in other industrial or energy sector consumers, and there is no capacity for the model to produce the gas used for these purposes with coal- or biomass-derived gas.