---
layout: index
title: The GCAM Land Allocation Module
prev: diagram.html
next: supply_land.html
gcam-version: v5.4 
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
**Table 1: Inputs required by the land allocation module <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
| Historical land use and land cover | By GLU, land type, and year | thousand $$km^2$$ | [Exogenous](inputs_land.html) |
| Vegetation carbon density | By GLU and land type | kg per $$m^2$$ | [Exogenous](inputs_land.html) |
| Soil carbon density | By GLU and land type | kg per $$m^2$$ | [Exogenous](inputs_land.html) |
| Mature age | By GLU and land type | years | [Exogenous](inputs_land.html) |
| Soil time scale | By geopolitical region and land type | years | [Exogenous](inputs_land.html) |
| Value of unmanaged land | By GLU | 1975$ per thous $$km^2$$ | [Exogenous](inputs_land.html) |
| Profit rate of managed land | By GLU | 1975$ per thous $$km^2$$ | [Land Supply Module](supply_land.html) |
| Logit exponents | By GLU and land node | Unitless | [Exogenous](inputs_land.html) |

<a name="table_footnote">1</a>: Note that this table differs from the one provided on the [Land Inputs Page](inputs_land.html#description) in that it lists all inputs to the land module, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.

<br/>

## Description

### Economic Modeling Approach

In this section, we describe and discuss the approach we have developed for the economic modeling of land allocation in the Global Change Analysis Model (GCAM). More information, including a comparison to other models, is available in Wise et al. (2014).

#### Land Sharing Approach 

Economic land use decisions in GCAM are based on a logit model of sharing based on relative inherent profitability of using land for competing purposes. In GCAM, there is a distribution of profit behind each competing land use within a region. The share of land allocated to any given use is based on the probability that that use has a highest profit among the competing uses. For more information, see the detailed description of the [land sharing approach](details_land.html#land-sharing-approach).

#### Land Nesting Strategy

The way land types are nested in GCAM, in combination with the logit exponents used, determines the substitutability of different land types in the model in future periods. Figure 1 shows a simplified nesting diagram of land with a subregion. Note that crops are further divided beyond what is in Figure 1, nesting irrigated/rainfed and hi/lo fertilizer. For more information, see the detailed description of the [land nesting strategy](details_land.html#land-nesting-strategy).

![AgLU Land Nesting Diagram](gcam-figs/AgLUTree.bmp)<br/>
Figure 1: AgLU Land Nest
{: .fig}

#### Intensification

The inclusion of multiple management types for each crop within each subregion of GCAM allows the model to represent price-induced intensification. That is, we can increase yields via increased fertilizer or irrigation if economic conditions favor those options. Like the rest of the land allocation decisions in GCAM, the share of each management practice depends on relative profitability. As profits of one option increase, more land will be allocated to that option. If the option is higher yielding, then average yields will increase (an intensification response). In general, GCAM will intensify when there is a lot of land competition (like when carbon in land is valued). Note that it is possible for average yields in a subregion to decline over time; this will happen if commodity prices decline or if the price of fertilizer and/or water increases. 

#### Calibration

While the profit-based logit land sharing is fairly straightforward, it must be calibrated to match historical data on land use shares and profit rates in the base year. The calibration method solves for parameters that adjust observed profit rates, which are based on base year data, such that they equal the potential average profit rates implied by base year shares and the assumed average price of unmanaged land. In future model periods, the calibration profit scalers calculated in the final historical period are used to adjust the future profit rates in the logit sharing and profit equations. For more information, see the detailed description of the [calibration](details_land.html#calibration). Additional information is also provided on [modeling new land uses or crops](details_land.html#modeling-land-uses-and-crops-that-are-new-to-a-region) and [crop outliers](details_land.html#crop-outliers).

#### Regional Production and Comparative Advantage
In its determination of the economic allocation of crop production and land use across regions of the globe, GCAM follows the basic economic principle of comparative advantage. In simplest terms, countries or regions will produce more of what they are better at and import more of what they are not as good at producing.  For more information, see the detailed description of [comparative advantage](details_land.html#regional-production-and-comparative-advantage).

### Terrestrial Carbon Approach

Land-use change CO<sub>2</sub> emissions are calculated in GCAM using a simple accounting approach, similar to that of Houghton (1999). That is, GCAM determines the change in above and below ground carbon stock for a given land use change and allocates that change in carbon stock over time.  

#### Vegetation Carbon

For vegetation carbon, we distinguish between two different activities – land expansion and land contraction. In the event that land allocated to a particular type contracts, i.e., there is less land in the current period than the previous period, we assume that all vegetation carbon emissions are released instantaneously.  In this event, the land-use change emissions for the current period from above ground carbon changes are equal to the change in above ground carbon stock. Emissions from above ground carbon changes for all other periods are equal to zero. In the event land expands, we spread the change in carbon stock across time depending on the length of time it takes for the vegetation to mature.  For crops, the mature age is typically set a 1 year, meaning that all carbon uptake occurs instantaneously. For forests, however, we assume it takes anywhere from 30 years to 100 years to uptake all of the carbon. We use an example of the Bertalanffy-Richards function (see [equation](#vegetation-carbon-emissions)).

#### Soil Carbon

For soil carbon, we assume we assume both emissions and uptake are exponential, where the exponential half-life depends on the region. Colder regions have longer half-lives.

#### Carbon Stocks

GCAM tracks carbon stocks by calculating and storing cumulative land-use change emissions, and then applying those emissions as time proceeds. As land expands, we compute future uptake to be added to the carbon stock, and as land contracts we compute future emissions to subtract from the carbon stock.

## Equations 
TODO: Add new land leaf equations

The equations that determine land allocation and the resulting carbon emissions from land use and land cover change are described here.

### Profit

#### Leaf profit
Profit for managed land leafs is calculated in the [supply module](supply_land.html) and passed to the land allocator. Profit for unmanaged land leafs is [input](inputs_land.html#value-of-unmanaged-land) into the model. Within the land allocator, this profit is adjusted if land-related policies are included.

See `setProfitRate` in [land_leaf.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_leaf.cpp) and `setUnmanagedLandProfitRate` in [unmanaged_land_leaf.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/unmanaged_land_leaf.cpp).

#### Node profit

The average profit of a node is calculated as 

$$
\pi_i = \left[{\sum_{j=1}^{N} \lambda_j \pi_j^\rho}\right]^{\frac{1}{\rho}}
$$

where $$\lambda_i$$ is the [profit scaler](land.html#calibration) for leaf or node $$i$$, $$\pi_i$$ is the [profit](land.html#profit) for node $$i$$, $$\pi_j$$ is the [profit](land.html#profit) for leaf or node $$j$$ contained within node $$i$$, and $$\rho$$ is the [logit exponent](inputs_land.html#share-parameters).

See `calculateNodeProfitRates` in [land_node.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_node.cpp).

### Shares

The share of each leaf or node is calculated as

$$
s_i = \frac{(\lambda_i \pi_i)^\rho}{\sum_{j=1}^{N} (\lambda_j \pi_j)^\rho}
$$

where $$s_i$$ is the share of leaf or node $$i$$, $$\lambda_i$$ is the [profit scaler](land.html#calibration) for leaf or node $$i$$, $$\pi_i$$ is the [profit](land.html#profit) for leaf or node $$i$$, and $$\rho$$ is the [logit exponent](inputs_land.html#share-parameters).

See `calcLandShares` in [land_leaf.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_leaf.cpp) and [land_node.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_node.cpp).

### Land Area

To calculate land area, GCAM works its way down the [nesting tree](land.html#land-nesting-strategy), starting from the top where total land area in a region is provided as an [input](inputs_land.html#Historical-Land-Cover-and-Use). For each node or leaf below, the area is calculated as

$$
a_i = a_{above} * s_i
$$

where $$a_i$$ is the area for leaf or node $$i$$, $$s_i$$ is the [share](land.html#shares), and $$a_{above}$$ is the area of the parent node. 

See `calcLandAllocation` in [land_leaf.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_leaf.cpp) and [land_node.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_node.cpp).

### Calibration

To calibrate the land allocator, the [share equation](land.html#shares) is inverted to solve for $$\lambda_i$$.

See `calibrateLandAllocator` in [land_allocator.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_allocator.cpp) and `calculateShareWeights` in [land_node.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_node.cpp).

### Carbon Emissions
The total cumulative change in emissions is calculated as

$$
E^{veg/soil}_{t}=\Delta C_{t}=A_{t}*D^{veg/soil}_{t}-A_{t-1}*D^{veg/soil}_{t-1}
$$

where $$E$$ indicates carbon emissions due to a land use change in timestep $$t$$, $$C$$ indicates carbon stocks, $$A$$ indicates land area, and $$D$$ indicates the average carbon density of the land area. These emissions are allocated over time differently for [vegetation](#vegetation-carbon-emissions) and [soil](#soil-carbon-emissions) carbon.

#### Vegetation Carbon Emissions

If vegetation emissions are positive (i.e., $$E^{veg}_{t} > 0$$), then all emissions are released in the current year, $$y$$. That is, $$E^{veg}_{y} = E^{veg}_{t}$$.

If vegetation emissions are negative, then these emissions are spread out over time using a sigmoid function: 

$$
E^{veg}_{y} = E^{veg}_{t} * \left[1 - e^{\frac{-3.0 * (y - t + 1)}{M}} \right]^2 - \left[1 - e^{\frac{-3.0 * (y - t)}{M}} \right]^2
$$

where $$t$$ is the time of land conversion, $$y$$ is the current year, $$M$$ is the mature age (specified by land type and region). 

See `precalc_sigmoid_helper` in [land_carbon_densities.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/ccarbon_model/source/land_carbon_densities.cpp) for the implementation of the sigmoid and `calcAboveGroundCarbonEmission` in [asimple_carbon_calc.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/ccarbon_model/source/asimple_carbon_calc.cpp) for the calculation of vegetation carbon emissions. For more information on the sigmoid function and its sensitivity to mature age, see [Figure](details_land.html#land-use-change-emissions).

#### Soil Carbon Emissions

Soil carbon emissions follow an exponential approach:

$$
E^{soil}_{y} =  E^{soil}_{t} * \left[\left( 1.0 - e^{ -1.0 * \kappa * (y - t)} \right) - \left( 1.0 - e^{ -1.0 * \kappa * (y - t - 1)} \right)\right]
$$

where $$\kappa = \frac{ log(2) }{ s / 10.0}$$ and $$s$$ is the soil time scale, specified by region (see [inputs_land](inputs_land.html#description)).

See `calcBelowGroundCarbonEmission` in [asimple_carbon_calc.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/ccarbon_model/source/asimple_carbon_calc.cpp) for the calculation of soil carbon emissions. 

### Carbon Stock

Total carbon stock, $$C_y$$ in year $$y$$ is calculated as

$$
C_y = C_{y-1} - \left[E^{veg}_{y-1} + E^{soil}_{y-1}\right]
$$

where $$E^{veg}_{y}$$ are vegetation carbon emissions in year $$y$$ and $$E^{soil}_{y}$$ are soil carbon emissions in year $$y$$.

See `calc` in [asimple_carbon_calc.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/ccarbon_model/source/asimple_carbon_calc.cpp).

## Policy options 
This section summarizes some of the land-based policy options available in GCAM. More information on the trade-offs of these options is available in Calvin et al. (2014).

### Protecting Lands

With this policy, we can set aside some land, removing it from economic competition. This will result in that land area being fixed across time and any land expansion/contraction will not affect this area. 

The default in GCAM is to protect 90% of all non-commercial ecosystems. This protection level is specified in the GCAM data system; see `aglu.PROTECTION_DATA_SOURCE_DEFAULT` in [constants.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/constants.R#L344). Users can define a custom percentage of protected lands using the parameter `aglu.PROTECT_DEFAULT`.

#### Protection constraints based on land suitability and protection constraints
Users can also specify spatially distinct levels of land availability by setting the parameter `aglu.PROTECTION_DATA_SOURCE_DEFAULT` to `FALSE`. In this case, levels of available land for expansion are decided based on levels of suitability (as defined by Zabel et al. 2014) and protection constraints (as defined by the IUCN). There are 7 mutually exclusive types of land based on these suitability and protection constraints. They are:

1. Unsuitable and Unprotected
2. Suitable and Unprotected
3. Suitable with a high level of protection that is intact
4. Suitable with a high level of protection that is deforested
5. Suitable with a low level of protection
6. Unsuitable with a high value of protection
7. Unsuitable with a low value of protection. 

When a user chooses to use the spatially distinct protection constraints, by default land that is classified as Suitable and Unprotected (No 2 from the above) will be made available for expansion. The user can make other types of land available using the parameter `aglu.NONPROTECT_LAND_STATUS` in [constants.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/constants.R#L341).


### Valuing Carbon in Land

In a policy regime, we can choose to put a price on land-use change CO<sub>2</sub> emissions that is related to the price on fossil fuel and industrial CO<sub>2</sub> emissions. The land carbon price can be any multiplier of the fossil fuel carbon price. This factor is applied at the geopolitical region level, and can be differentiated across regions. We model this policy as a subsidy to land-owners for the holding carbon stocks, as opposed to a tax/subsidy on the change in carbon in land. Specifically, the subsidy is equal to the carbon price x the carbon density x a discount factor to account for the amount of time it takes carbon to accumulate x a discount factor to annualize the subsidy.

An example file is included to implement this policy is included in GCAM; see [global_uct.xml](https://github.com/JGCRI/gcam-core/blob/master/input/policy/global_uct.xml).  

### Bioenergy Constraints

We can impose constraints (lower or upper bounds) on bioenergy within GCAM. Under such a policy, GCAM will calculate the tax or subsidy required to ensure that the constraint is met. Note that by default a bioenergy constraint in GCAM (starting with v4.4) is imposed based on the amount of subsidy available for net negative emissions.

See [Energy Constraint](policies_examples.html#energy-constraint) for an xml snippet.

### Land expansion costs/constraints

One approach we have implemented and tested is to add a land expansion cost curve to targeted land types in specific regions. Specifically, we have added land expansion cost curves to unmanaged forest land in individual regions in which a carbon policy resulted in fast transformation from grassland to unmanaged forest. This method effectively adds a cost associated with converting to forests.  This cost can be interpreted as the cost of planting, watering, fire management, etc. required to grow trees on previously unforested land.

The land expansion cost curve is implemented as a “renewable” resource that land must “purchase” on a per-unit of land basis. The cost curve can be set at a zero cost up to a predefined amount of land: e.g., base year allocation, pre-industrial allocation, etc. Beyond this point, the cost curve increases to either represent a physical expansion cost or an arbitrarily high cost that would act as a hard constraint on expansion. One drawback to this approach is that each cost curve adds a market equation that needs to be solved. The market should behave well, but adding markets should always be done with care as it does put additional burdens on the solution algorithm.

See [Land Constraint](policies_examples.html#land-constraint) for an xml snippet.

### Carbon Parks

We have also included code to implement a crop technology that plants trees as densely as possible just for the purposes of storing carbon. Such a “carbon park” technology would allow us to explicitly include physical costs and demands for other inputs such as fertilizer and water when that modeling is available. This would clearly be a “managed” land option and would allow us some more options for modeling carbon policies. As with expansion costs/constraints, carbon parks are not a part of the current core configuration, but can be implemented through changes in input files.

## Insights and intuition

### Model evaluation
The GCAM land model has been evaluated using a hindcast experiment, as shown in [Calvin et al. (2017)](https://www.worldscientific.com/doi/abs/10.1142/S2010007817500051) and [Snyder et al. (2017)](https://gmd.copernicus.org/articles/10/4307/2017/). A few insights emerge from these studies. First, GCAM cannot predict policy, but the inclusion of policies that exist in the real world (e.g., biofuels targets) improves the performance of the model. Second, the use of forecasted yields to drive land allocation decisions improves the performance of the model as compared to using observed yields. Third, GCAM does better at trends than interannual variability. Finally, GCAM does better at some crops and regions than other crops and regions.

### Sensitivity to parameters
The effect of a change in profitability of one land type on land allocation depends on the choice of parameters, as shown in [Zhao et al. (2020)](https://www.worldscientific.com/doi/abs/10.1142/S2010007820500049). Larger logit exponents will result in a stronger transition to a land type whose profit increases than would occur with lower logit exponents. Note that this paper replicates the GCAM land allocation mechanism in a simple offline example and does not use the full GCAM. 

### Differences across regions
The effect of an increase in one type of land depends on where that increase occurs and what it displaces because of differences in regional land allocation and carbon densities as shown in [Wise et al. (2015)](https://www.sciencedirect.com/science/article/pii/S0140988315001619). For example, expanding bioenergy in a forested region will result in higher carbon emissions per unit of fuel produced than expanding bioenergy in a non-forested region.

### Implications of policy
The choice of [policy options](#policy-options) in the land system has a dramatic effect on the resulting land allocation, resulting in changes in agricultural production, energy production, emissions, and prices. This result is demonstrated in [Calvin et al. (2014)](https://link.springer.com/article/10.1007/s10584-013-0897-y). For example, policies that place a value on carbon in the land system will result in a transition to high carbon ecosystems (i.e., reforestation and afforestation). Policies that incentivize low carbon energy systems, without any additional incentives in the land system, result in large-scale deployment of bioenergy.


## IAMC Reference Card

Land Cover
- [X] Cropland
- [X] Cropland irrigated
- [X] Cropland food crops
- [X] Cropland feed crops
- [X] Cropland energy crops
- [X] Forest
- [X] Managed forest
- [X] Natural forest
- [X] Pasture
- [X] Shrubland
- [X] Built-up area

Agriculture and forestry demands
- [X] Agriculture food
- [X] Agriculture food crops
- [X] Agriculture food livestock
- [X] Agriculture feed
- [X] Agriculture feed crops
- [X] Agriculture feed livestock
- [X] Agriculture non-food
- [X] Agriculture non-food crops
- [X] Agriculture non-food livestock
- [X] Agriculture bioenergy
- [X] Agriculture residues
- [X] Forest industrial roundwood
- [ ] Forest fuelwood
- [X] Forest residues

Agricultural commodities
- [X] Wheat
- [X] Rice
- [X] Other coarse grains
- [X] Oilseeds
- [X] Sugar crops
- [X] Ruminant meat
- [X] Non-ruminant meat and eggs
- [X] Dairy products

Carbon dioxide removal
- [X] Bioenergy with CCS
- [X] Reforestation
- [X] Afforestation


## References

Calvin, K., Wise, M., Kyle, P., Patel, P., Clarke, L., Edmonds, J., 2014. Trade-offs of different land and bioenergy policies on the path to achieving climate targets. *Climatic Change* 123, 691–704. https://doi.org/10.1007/s10584-013-0897-y.

Calvin, K., Wise, M., Kyle, P., Clarke, L., Edmonds, J., 2017. A hindcast experiment using the GCAM 3.0 agriculture and land-use module. *Climate Change Economics* 8. https://doi.org/10.1142/S2010007817500051

Houghton, R.A. 1999. The annual net flux of carbon to the atmosphere from changes in land use 1850-1990. Tellus 51B: 298-313.

Snyder, A. C., Link, R. P., & Calvin, K. V. (2017). Evaluation of integrated assessment model hindcast experiments: A case study of the GCAM 3.0 land use module. Geoscientific Model Development, 10(12). https://doi.org/10.5194/gmd-10-4307-2017.

Wise, Marshall, Calvin, Katherine, Page Kyle, Patrick Luckow, James Edmonds.  2014. Economic and Physical Modeling of Land Use in GCAM 3.0 and an Application to Agricultural Productivity, Land, and Terrestrial Carbon.  Climate Change Economics. DOI 10.1142/S2010007814500031.

Wise, M., Hodson, E. L., Mignone, B. K., Clarke, L., Waldhoff, S., & Luckow, P. (2015). An approach to computing marginal land use change carbon intensities for bioenergy in policy applications. Energy Economics, 50, 337–347. https://doi.org/10.1016/j.eneco.2015.05.009

Zabel, Florian, Birgitta Putzenlechner, and Wolfram Mauser. "Global agricultural land resources-a high resolution suitability evaluation and its perspectives until 2100 under climate change conditions." PloS one 9.9 (2014): e107522. https://doi.org/10.1371/journal.pone.0107522

