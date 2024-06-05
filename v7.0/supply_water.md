---
layout: index
title: Supply of Water
prev: inputs_supply.html
next: outputs_quantity.html
gcam-version: v7 
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

Three distinct sources of fresh water are modeled, renewable water, non-renewable groundwater, and desalinated water. Renewable water is water that is replenished naturally by surface runoff and subsurface infiltration and release (groundwater recharge). Non-renewable groundwater is water from aquifers whose recharge is sufficiently low as to be depletable on a human time scale and which have replishment timescales greater than 100 years. Renewable water and non-renewable groundwater are separately modeled for each basin. Desalinated water of brackish groundwater and seawater is available as an additional source of freshwater within each basin and for municipal and industrial end-use demands for water.

### Renewable water

Renewable water supplies are based on runoff estimates from Xanthos, a detailed global hydrology model ([Liu et al. 2018](#liu2018); [Vernon et al. 2019](#vernon2019)). Xanthos accounts for surface and subsurface processes to compute runoff at 0.5° grid resolution. Global climate datasets are utilized in conjunction with Xanthos to determine historical annual average runoff aggregated for each basin ([Liu et al. 2018](#liu2018); [Turner et al. 2019b](#turner2019b); [Vernon et al. 2019](#vernon2019)). Of the total basin runoff, water available or accessible for human use takes into consideration requirements for ecosystem services, inaccessibility due to rapid flow and remote locations, and capacity of reservoir storage.  We define the volume of renewable water resources accessible for human use as:
$$QA_i^t =  max( 0, min( QT_i^t – EFR_i, QB_i^t - EFR_i + RS_i ))$$,
where $$QA_i^t$$, $$QT_i^t$$, and $$QB_i^t$$ are the annual volumes of accessible renewable water, natural streamflow and baseflow, respectively, in basin i and year t; $$EFR_i$$ is the environmental flow requirement for each basin, and $$RS_i$$ is total reservoir storage capacity in each basin i ([Kim et al. 2016](#kim2016)). The minimum function ensures that the combined baseflow and reservoir storage do not exceed total streamflow. All volumes are measured in $$km^3$$ yr<sup>-1</sup>. According to the GRanD database [Lehner et al. 2011](#lehner2011), the total reservoir storage volume globally is approximately 6,100 $$km^3$$ yr<sup>-1</sup>; their geographic locations are then used to compute the total reservoir storage capacity in each basin -- a quantity that is currently assumed constant over time. As explained above, $$EFR_i$$ is a function of the monthly average streamflow for each basin. Baseflow is computed as a fraction of annual streamflow following the estimates of ([Beck et al. 2013](#beck2013)). Accessible fractions of total runoff vary across basins and time dependent on changes in precipitation. Renewable water volumes up to the accessible fraction is available at nominal or low cost. Additional renewable water beyond the accessible fraction is available at significantly higher cost to ensure availability of water for ecosystem services and to reflect capital investments necessary for reservoir expansion.

### Non-renewable groundwater

Non-renewable groundwater is also represented at the basin-scale so that it is a supplemental source to basin renewable water. Non-renewable groundwater is modeled as a graded depletable resource with a fixed amount of total groundwater availability. Detailed global assessments of areal extent, aquifer thickness, porosity, and the depth from the land surface to groundwater in each aquifer are used to obtain gridded 50 $$km^2$$ non-renewable groundwater availability ([Richts et al. 2011](#richts2011); [Fan et al. 2013](#fan2013); [Gleeson et al. 2014](#gleeson2014); [DeGraaf et al. 2015](#degraaf2015)). Basin level estimates of environmentally exploitable groundwater are aggregated from grid-scale data ([Turner et al. 2019a](#turner2019a)). Graded groundwater resource supply curves are constructed based on the costs and availabilities of water production from a physics-based extraction cost model. Capital and operating costs that include well installation and maintenance costs as a function of depth and geological complexity, and energy inputs and costs required for pumping are included for a rigorous estimate of the relationship between groundwater volume and extraction cost ([Turner et al. 2019a](#turner2019a); [Kim et al. 2016](#kim2016)).


### Desalinated water

Desalinated water is available as a source of freshwater from purified brackish groundwater and seawater. Historical desalinated water production is estimated from [FAO Aquastat](#fao) and [Jones et al. 2019](#jones2019). Electrical energy input and capital and operational costs are included for representing the cost of desalinated water. Due to the high cost of desalination, desalinated water is utilized when renewable and non-renewable water supplies are scarce and the cost of freshwater is high. In GCAM core simulations, more expensive desalinated water is currently assumed to be available for municipal and industrial purposes only where it is more likely to be utilized due to its high cost. However, it can be made available for, or excluded from, any end-use representations of water demand through simple data input changes that either includes or excludes the desalination technology option. Desalinated water representation is nested within the water distribution sectors where it competes with basin water supply from renewable and nonrenewable sources.


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

<a name="beck2013">[Beck et al. 2013]</a> Beck, H.E., Van Dijk, A.I., Miralles, D.G., De Jeu, R.A., Bruijnzeel, L.A., McVicar, T.R. and Schellekens, J., 2013. Global patterns in base flow index and recession based on streamflow observations from 3394 catchments. Water Resources Research, 49(12), pp.7843-7863. [Link](https://doi.org/10.1002/2013WR013918)

<a name="cui2018">[Cui et al. 2018]</a> Cui, Ryna Yiyun, Katherine Calvin, Leon Clarke, Mohamad Hejazi, Son Kim, Page Kyle, Pralit Patel, Sean Turner and Marshall Wise (2018). *Regional responses to future, demand-driven water scarcity*. Environmental Research Letters, 13, 9. [Link](https://doi.org/10.1088/1748-9326/aad8f7)

<a name="degraaf2015">[DeGraaf et al. 2015]</a> De Graaf, I.E.M., Van Beek, L.P.H., Wada, Y. and Bierkens, M.F.P., 2014. Dynamic attribution of global water demand to surface water and groundwater resources: Effects of abstractions and return flows on river discharges. Advances in water resources, 64, pp.21-33. [Link](https://doi.org/10.1016/j.advwatres.2013.12.002)

<a name="fan2013">[Fan et al. 2013]</a> Fan, Y., Li, H. and Miguez-Macho, G., 2013. Global patterns of groundwater table depth. Science, 339(6122), pp.940-943. [Link](https:://doi.org/10.1126/science.1229881)

<a name="fao">[FAO Aquastat]</a> FAO. 2016. AQUASTAT Main Database, Food and Agriculture Organization of the United Nations (FAO) [Link](https://www.fao.org/faostat/en/#home)

<a name="gleeson2014">[Gleeson et al. 2014]</a> Gleeson, T., Moosdorf, N., Hartmann, J. and Van Beek, L.P.H., 2014. A glimpse beneath earth's surface: GLobal HYdrogeology MaPS (GLHYMPS) of permeability and porosity. Geophysical Research Letters, 41(11), pp.3891-3898. [Link](https::/doi.org/10.1002/2014GL059856)

<a name="graham2018">[Graham et al. 2018]</a> Graham, N., E. Davies, M. I. Hejazi, K. Calvin, S. H. Kim, L. Helinksi, F.R. Miralles-Wilhelm, L Clarke, G.P. Kyle, P Patel, M.A. Wise, and C.R. Vernon (2018). *Water sector assumptions for the Shared Socioeconomic Pathways in an integrated modeling framework*. Water Resources Research, 54, [Link](https://doi.org/10.1029/2018WR023452)

<a name="jones2019">[Jones et al. 2019]</a> Jones, E., Qadir, M., van Vliet, M. T., Smakhtin, V., & Kang, S. M. (2019). The state of desalination and brine production: A global outlook. Science of the Total Environment, 657, 1343-1356. [Link](https://doi.org/10.1016/j.scitotenv.2018.12.076)

<a name="kim2016">[Kim et al. 2016]</a> Kim SK, Hejazi M, et al. (2016). *Balancing global water availability and use at basin scale in an integrated assessment model*. Climatic Change 136:217-231. [Link](http://link.springer.com/article/10.1007/s10584-016-1604-6/fulltext.html)

<a name="kyle2021">[Kyle et al. 2021]</a> Kyle, P., Hejazi, M., Kim, S., Patel, P., Graham, N., & Liu, Y. (2021). Assessing the future of global energy-for-water. Environmental Research Letters, 16(2), 024031.

<a name="lehner2011">[Lehner et al. 2011]</a> Lehner, B., Liermann, C.R., Revenga, C., Vörösmarty, C., Fekete, B., Crouzet, P., Döll, P., Endejan, M., Frenken, K., Magome, J. and Nilsson, C., 2011. Global reservoir and dam (grand) database. Technical Documentation, Version, 1, pp.1-14. [Link](https://sedac.ciesin.columbia.edu/downloads/docs/grand-v1/grand_technical_documentation_v1_1.pdf)

<a name="liu2018">[Liu et al. 2018]</a> Liu Y., M. Hejazi, H. Li, X. Zhang, G. Leng (2018). *A  hydrological emulator for global applications - HE v1.0.0*. Geoscientific Model Development. [Link](https://www.geosci-model-dev.net/11/1077/2018/gmd-11-1077-2018.pdf)

<a name="oecd2009">[OECD 2009]</a>. *Managing Water for All: An OECD Perspective on Pricing and Financing*, OECD, Paris. [Link](https://www.oecd.org/env/42350563.pdf)

<a name="richts2011">[Richts et al. 2011]</a>. Richts, A., Struckmeier, W. & Zaepke, M. (2011): WHYMAP and the Groundwater Resources of the World 1:25,000,000. In: Jones J. (Eds.): Sustaining Groundwater Resources. International Year of Planet Earth; Springer. [Link](https:://doi.org/10.1007/978-90-481-3426-7_10)

<a name="rohwer2007">[Rowher et al. 2007]</a> Rohwer, J., Gerten, D., and Lucht, W. 2007. *Development of Functional Irrigation Types for Improved Global Crop Modelling* PIK Report No. 104, Potsdam Institute for Climate Impact Research. [Link](https://www.pik-potsdam.de/research/publications/pikreports/.files/pr104.pdf)

<a name="turner2019a">[Turner et al. 2019a]</a> Turner S.W.D., M. Hejazi, C. Yonkofski, S. Kim, P. Kyle (2019a). *Influence of groundwater extraction costs and resource depletion limits on simulated global nonrenewable water withdrawals over the 21st century*. Earth's Future (2019), 10.1029/2018EF001105  [Link](https://doi.org/10.1029/2018EF001105)

<a name="turner2019b">[Turner et al. 2019b]</a> Turner, Sean, Mohamad Hejazi, Katherine Calvin, Page Kyle, Sonny Kim (2019b). *A pathway of global food supply adaptation in a world with increasingly constrained groundwater*. Science of The Total Environment, 673, 165-176, [Link](https://doi.org/10.1016/j.scitotenv.2019.04.070).

<a name="vernon2019">[Vernon 2019]</a> Vernon, C., M. Hejazi, S. Turner, Y. Liu, C. Braun, X. Li, and R. Link. *A Global Hydrologic Framework to Accelerate Scientific Discovery*. Journal of Open Research Software (2019). [Link](https://openresearchsoftware.metajnl.com/articles/10.5334/jors.245/)


