---
layout: index
title: Supply of Water
prev: inputs_supply.html
next: outputs_quantity.html
gcam-version: v6 
---

# Table of Contents

- [Inputs to the Module](#inputs-to-the-module)
- [Description](#description)
- [Equations](#equations)
- [Insights and intuition](#insights-and-intuition)
- [IAMC Reference Card](#iamc-reference-card)
- [References](#references)

## Inputs to the Model
**Table 1: Inputs required by the supply module <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
| Runoff supply curves (cost and availability) | Water basin and year | $$km^3$$ | [Exogenous](inputs_supply.html) |
| Ground water supply curves (cost and availability) | Water basin and year | $$km^3$$ | [Exogenous](inputs_supply.html) |
| Desalination cost | Water basin and year | $$km^3$$ | [Exogenous](inputs_supply.html) |
| Water prices | By basin and year | 1975$/m3 | [Marketplace](marketplace.html)  |

<a name="table_footnote">1</a>: Note that this table differs from the one provided on the [Supply Inputs Page](inputs_supply.html#description) in that it lists all inputs to the water supply module, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.


## Description

Three distinct sources of fresh water are modeled, renewable water (surface and ground), non-renewable groundwater, and desalinated water. Renewable water is water that is replenished naturally by surface runoff and subsurface infiltration and release. Non-renewable groundwater is fossil groundwater resources or groundwater where abstraction exceeds recharge. Renewable water and non-renewable groundwater are separately modeled for each basin. Desalinated water is available as an additional source of freshwater within each basin and for alternative end-use demands for water.

### Renewable water

Renewable water supplies are based on runoff estimates from Xanthos, a detailed global hydrology model ([Liu et al. 2018](#liu2018); [Vernon et al. 2019](#vernon2019)). Xanthos accounts for surface and subsurface processes to compute runoff at 0.5° grid resolution. Global climate datasets are utilized in conjunction with Xanthos to determine historical annual average runoff aggregated for each basin ([Liu et al. 2018](#liu2018); [Turner et al. 2019b](#turner2019b); [Vernon et al. 2019](#vernon2019)). Of the total basin runoff, water available or accessible for human use takes into consideration requirements for ecosystem services, inaccessibility due to rapid flow and remote locations, and capacity of reservoir storage. Accessible fractions of total runoff vary across basins. Renewable water volumes up to the accessible fraction is available at nominal or low cost. Additional renewable water beyond the accessible fraction is available at a sharply higher cost to ensure availability of water for ecosystem services and to reflect capital investments necessary for reservoir expansion.

### Non-renewable groundwater

Non-renewable groundwater is also represented at the basin-scale so that it is a supplemental source to basin renewable water. Non-renewable groundwater is modeled as a graded depletable resource with a fixed amount of total groundwater availability. Detailed global assessments of porosity, aquifer thickness, permeability, and water depth are utilized to establish the total volume of water available at the grid-scale. Basin level estimates of environmentally exploitable groundwater are aggregated from grid-scale data. A groundwater supply curve representing the relationship between exploitable groundwater and cost of extraction is constructed from a physics-based extraction cost model. Capital and operating costs that include well installation and maintenance costs as a function of depth and geological complexity, and energy inputs and costs required for pumping are included for a rigorous estimate of the relationship between groundwater volume and extraction cost ([Turner et al. 2019a](#turner2019a); [Kim et al. 2016](#kim2016)).


### Desalinated water

Desalinated water is available as source of freshwater from purified saline water. Electrical energy input and capital and operational costs are included for representing the cost of desalinated water. Due to the high cost of desalination, desalinated water is only utilized when renewable and non-renewable water supplies are scarce and the cost of freshwater is high. In GCAM core simulations, more expensive desalinated water is assumed to be available for non-irrigation purposes only. However, it can be made available for irrigation use or excluded from any end-use representations of water demand through simple data input changes that either includes or excludes the desalination technology option. Desalinated water representation is nested within the water distribution sectors where it competes with basin water supply from renewable and nonrenewable sources.


### Water distribution

Conveyance losses and improvements to water distribution efficiencies are included in the water distribution sectors. Conveyance losses for irrigated water use has been included and differentiated for each GCAM region. Conveyance losses/efficiencies for GCAM regions are derived from country level data from [Rohwer et al. 2007](#rohwer2007) and are the weighted mean of the original country level data weighted by irrigated harvested area. 

### Water markets

Water supplies and demands at each basin are balanced through a market mechanism in which prices for water (shadow price) are adjusted until water demands are constrained to available supply. Additional documentation of this capability is available in [Kim et al. 2016](#kim2016), [Turner et al. 2019ab](#turner2019a), [Graham et al. 2018](#graham2018), and [Cui et al. 2018](#cui2018). For additional information, see the detailed description on [water markets](details_water.html#water-markets).

### Water subsidies and water rights

The water distribution sector for each demand category includes the cost of water transport, distribution and/or treatment and other adjustments such as subsidies, in addition to the resource cost of water. Thus, water prices for each demand category is differentiated. This framework provides a covenient location for including water subsidies or reduced water costs from allocation rights for irrigated agriculture. In GCAM, the price of water for agriculture use has been reduced to 5% of the general water price (see `water.IRR_PRICE_SUBSIDY_MULT` in [constants.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/constants.R)). This factor is based on an OECD report on water pricing ([OECD 2009](#oecd2009)) which indicates that industrial and household water users pay more than 100 times as much as agriculture users. In some regions, the marginal cost of irrigated water use is zero. Crop growth requires substantial water inputs and the profitability of agricultural relies on the low cost of water provisions. Without this subsidy, historical calibration of agriculture production in GCAM is not possible for historically water scarce regions with high cost of water. Water subsidies for irrigated agriculture have not been differentiated by region and basin, and improved understanding of regional differences in water subsidies and their impact on agriculture production remain for future work.

## Insights and intuition

### Future changes in climate and socioeconomic systems will drive both the availability and use of water resources, leading to evolutions in scarcity.

While human systems dominate changes in water scarcity independent of socioeconomic or climate future, the sign of these changes depend particularly on the socioeconomic scenario. Under specific socioeconomic futures, human-driven water scarcity reductions occur in up to 44% of the global land area by the end of the century. [Turner et al. 2019](https://iopscience.iop.org/article/10.1088/1748-9326/ab639b/meta)

### Agricultural impacts of sustainable water use in the United States

The implementation of future sustainable water governance measures will require additional investments that allow farmers to maximize production while minimizing water withdrawals to avoid potentially detrimental revenue losses. [Graham et al. 2021](https://www.nature.com/articles/s41598-021-96243-5)

## IAMC Reference Card

Co-linkages
- [X] Water availability



## References

<a name="cui2018">[Cui et al. 2018]</a> Cui, Ryna Yiyun, Katherine Calvin, Leon Clarke, Mohamad Hejazi, Son Kim, Page Kyle, Pralit Patel, Sean Turner and Marshall Wise (2018). *Regional responses to future, demand-driven water scarcity*. Environmental Research Letters, 13, 9. [Link](https://doi.org/10.1088/1748-9326/aad8f7)

<a name="graham2018">[Graham et al. 2018]</a> Graham, N., E. Davies, M. I. Hejazi, K. Calvin, S. H. Kim, L. Helinksi, F.R. Miralles-Wilhelm, L Clarke, G.P. Kyle, P Patel, M.A. Wise, and C.R. Vernon (2018). *Water sector assumptions for the Shared Socioeconomic Pathways in an integrated modeling framework*. Water Resources Research, 54, [Link](https://doi.org/10.1029/2018WR023452)

<a name="kim2016">[Kim et al. 2016]</a> Kim SK, Hejazi M, et al. (2016). *Balancing global water availability and use at basin scale in an integrated assessment model*. Climatic Change 136:217-231. [Link](http://link.springer.com/article/10.1007/s10584-016-1604-6/fulltext.html)

<a name="kyle2021">[Kyle et al. 2021]</a> Kyle, P., Hejazi, M., Kim, S., Patel, P., Graham, N., & Liu, Y. (2021). Assessing the future of global energy-for-water. Environmental Research Letters, 16(2), 024031.

<a name="liu2018">[Liu et al. 2018]</a> Liu Y., M. Hejazi, H. Li, X. Zhang, G. Leng (2018). *A  hydrological emulator for global applications - HE v1.0.0*. Geoscientific Model Development. [Link](https://www.geosci-model-dev.net/11/1077/2018/gmd-11-1077-2018.pdf)

<a name="oecd2009">[OECD 2009]</a>. *Managing Water for All: An OECD Perspective on Pricing and Financing*, OECD, Paris. [Link](https://www.oecd.org/env/42350563.pdf)

<a name="rohwer2007">[Rowher et al. 2007]</a> Rohwer, J., Gerten, D., and Lucht, W. 2007. *Development of Functional Irrigation Types for Improved Global Crop Modelling* PIK Report No. 104, Potsdam Institute for Climate Impact Research. [Link](https://www.pik-potsdam.de/research/publications/pikreports/.files/pr104.pdf)

<a name="turner2019a">[Turner et al. 2019a]</a> Turner S.W.D., M. Hejazi, C. Yonkofski, S. Kim, P. Kyle (2019a). *Influence of groundwater extraction costs and resource depletion limits on simulated global nonrenewable water withdrawals over the 21st century*. Earth's Future (2019), 10.1029/2018EF001105  [Link](https://doi.org/10.1029/2018EF001105)

<a name="turner2019b">[Turner et al. 2019b]</a> Turner, Sean, Mohamad Hejazi, Katherine Calvin, Page Kyle, Sonny Kim (2019b). *A pathway of global food supply adaptation in a world with increasingly constrained groundwater*. Science of The Total Environment, 673, 165-176, [Link](https://doi.org/10.1016/j.scitotenv.2019.04.070).

<a name="vernon2019">[Vernon 2019]</a> Vernon, C., M. Hejazi, S. Turner, Y. Liu, C. Braun, X. Li, and R. Link. *A Global Hydrologic Framework to Accelerate Scientific Discovery*. Journal of Open Research Software (2019). [Link](https://openresearchsoftware.metajnl.com/articles/10.5334/jors.245/)


