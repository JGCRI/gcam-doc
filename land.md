---
layout: index
title: The GCAM Land Model
prev: diagram.html
next: supply_land.html
gcam-version: v5.3 
---

## Inputs to the Model
**Table 1: Inputs required by the land model <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
| Historical land use and land cover | By GLU, land type, and year | thousand $$km^2$$ | [Exogenous](inputs_land.html) |
| Vegetation carbon density | By GLU and land type | kg per $$m^2$$ | [Exogenous](inputs_land.html) |
| Soil carbon density | By GLU and land type | kg per $$m^2$$ | [Exogenous](inputs_land.html) |
| Mature age | By GLU and land type | years | [Exogenous](inputs_land.html) |
| Soil time scale | By geopolitical region and land type | years | [Exogenous](inputs_land.html) |
| Value of unmanaged land | By GLU | 1975$ per thous $$km^2$$ | [Exogenous](inputs_land.html) |
| Profit rate of managed land | By GLU | 1975$ per thous $$km^2$$ | [Supply Model](supply_land.html) |
| Logit exponents | By GLU and land node | Unitless | [Exogenous](inputs_land.html) |



## Description

### Economic Modeling Approach

In this section, we describe and discuss the approach we have developed for the economic modeling of land allocation in the Global Change Analysis Model (GCAM). More information, including a comparison to other models, is available in Wise et al. (2014).

#### Land Sharing Approach 

Economic land use decisions in GCAM are based on a logit model of sharing based on relative inherent profitability of using land for competing purposes. In GCAM, there is a distribution of profit behind each competing land use within a region. The share of land allocated to any given use is based on the probability that that use has a highest profit among the competing uses. For more information, see the detailed description of the [land sharing approach](details_land.html#landsharingapproach).

#### Land Nesting Strategy

The way land types are nested in GCAM, in combination with the logit exponents used, determines the substitutability of different land types in the model in future periods. Figure 1 shows the nesting diagram of land with a subregion. Note that crops are further divided beyond what is in Figure 1, nesting irrigated/rainfed and hi/lo fertilizer. For more information, see the detailed description of the [land nesting strategy](details_land.html#landnestingstrategy).

![AgLU Land Nesting Diagram](gcam-figs/AgLUTree.bmp)<br/>
Figure 1: AgLU Land Nest
{: .fig}

#### Intensification

The inclusion of multiple management types for each crop within each subregion of GCAM allows the model to represent price-induced intensification. That is, we can increase yields via increased fertilizer or irrigation if economic conditions favor those options. Like the rest of the land allocation decisions in GCAM, the share of each management practice depends on relative profitability. As profits of one option increase, more land will be allocated to that option. If the option is higher yielding, then average yields will increase (an intensification response). In general, GCAM will intensify when there is a lot of land competition (like when carbon in land is valued). Note that it is possible for average yields in a subregion to decline over time; this will happen if commodity prices decline or if the price of fertilizer and/or water increases. 

#### Calibration

While the profit-based logit land sharing is fairly straightforward, it must be calibrated to match historical data on land use shares and profit rates in the base year. The calibration method solves for parameters that adjust observed profit rates, which are based on base year data, such that they equal the potential average profit rates implied by base year shares and the assumed average price of unmanaged land. In future model periods, the calibration profit scalers calculated in the final historical period are used to adjust the future profit rates in the logit sharing and profit equations. For more information, see the detailed description of the [calibration](details_land.html#calibration). Additional information is also provided on [modeling new land uses or crops](details_land.html#modelinglandusesandcropsthatarenewtoaregion) and [crop outliers](details_land.html$#cropoutliers).

#### Regional Production and Comparative Advantage
In its determination of the economic allocation of crop production and land use across regions of the globe, GCAM follows the basic economic principle of comparative advantage. In simplest terms, countries or regions will produce more of what they are better at and import more of what they are not as good at producing.  For more information, see the detailed description of [comparative advantage](details_land.html#regionalproductionandcomparativeadvantage).

### Terrestrial Carbon Approach

Land-use change CO<sub>2</sub> emissions are calculated in GCAM using a simple accounting approach, similar to that of Houghton (1999). That is, GCAM determines the change in above and below ground carbon stock for a given land use change and allocates that change in carbon stock over time.  

#### Vegetation Carbon

For vegetation carbon, we distinguish between two different activities – land expansion and land contraction. In the event that land contracts, i.e., there is less land in the current period than the previous period, we assume that all emissions are released instantaneously.  In this event, the land-use change emissions for the current period from above ground carbon changes are equal to the change in above ground carbon stock. Emissions from above ground carbon changes for all other periods are equal to zero. In the event land expands, we spread the change in carbon stock across time depending on the length of time it takes for the vegetation to mature.  For crops, the mature age is typically set a 1 year, meaning that all carbon uptake occurs instantaneously. For forests, however, we assume it takes anywhere from 30 years to 100 years to uptake all of the carbon. We use an example of the Bertalanffy-Richards function.

#### Soil Carbon

For soil carbon, we assume we assume both emissions and uptake are exponential, where the exponential half-life depends on the region. Colder regions have longer half-lives.

#### Carbon Stocks

GCAM tracks carbon stocks by calculating and storing cumulative land-use change emissions, and then applying those emissions as time proceeds. As land expands, we compute future uptake to be added to the carbon stock, and as land contracts we compute future emissions to subtract from the carbon stock.

## Equations 
QUESTION: Should this be a child page?
TODO: Add new land leaf equations

The equations that determine land allocation and the resulting carbon emissions from land use and land cover change are described here.

### Profit

#### Leaf profit
Profit for managed land leafs is calculated in the [supply module](supply_land.html) and passed to the land allocator. Profit for unmanaged land leafs is [input](inputs_land.html#valueofunmanagedland) into the model. Within the land allocator, this profit is adjusted if land-related policies are included.

See `setProfitRate` in [land_leaf.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_leaf.cpp) and `setUnmanagedLandProfitRate` in [unmanaged_land_leaf.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/unmanaged_land_leaf.cpp).

#### Node profit

The average profit of a node is calculated as 

$$
\pi_i = \left[{\sum_{j=1}^{N} \lambda_j \pi_j^\rho}\right]^{\frac{1}{\rho}}
$$

where $$\lambda_i$$ is the [profit scaler](land.html#calibration) for leaf of node $$i$$, $$\pi_i$$ is the [profit](land.html#profit) for leaf or node $$i$$, and $$\rho$$ is the [logit exponent](inputs_land.html#shareparameters).

See `calculateNodeProfitRates` in [land_node.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_node.cpp).

### Shares

The share of each leaf or node is calculated as

$$
s_i = \frac{\lambda_i \pi_i^\rho}{\sum_{j=1}^{N} \lambda_j \pi_j^\rho}
$$

where $$s_i$$ is the share of leaf or node $$i$$, $$\lambda_i$$ is the [profit scaler](land.html#calibration) for leaf of node $i$, $$\pi_i$$ is the [profit](land.html#profit) for leaf or node $$i$$, and $$\rho$$ is the [logit exponent](inputs_land.html#shareparameters).

See `calcLandShares` in [land_leaf.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_leaf.cpp) and [land_node.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_node.cpp).

### Land Area

To calculate land area, GCAM works its way down the [nesting tree](land.html#landnestingstrategy), starting from the top where total land area in a region is provided as an [input](inputs_land.html#HistoricalLandCoverandUse). For each node or leaf below, the area is calculated as

$$
a_i = a_{above} * s_i
$$

where $$a_i$$ is the area for leaf or node $$i$$, $$s_i$$ is the [share](land.html#shares), and $$a_{above}$$ is the area of the parent node. 

See `calcLandAllocation` in [land_leaf.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_leaf.cpp) and [land_node.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_node.cpp).

### Calibration

To calibrate the land allocator, the [share equation](land.html#shares) is inverted to solve for $$\lambda_i$$.

See `calibrateLandAllocator` in [land_allocator.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_allocator.cpp) and `calculateShareWeights` in [land_node.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/land_allocator/source/land_node.cpp).

### Vegetation Carbon
TODO: Add

### Soil Carbon
TODO: Add

## Insights and intuition
TODO: Include references to key papers, describing the effect of changing various assumptions/inputs on land allocation

## Modifying the model
QUESTION: here or in separate page/child page?
QUESTION: how do we want to structure/present this?

## Policy options 
QUESTION: here or in modifying model?

This section summarized some of the land-based policy options available in GCAM. More information on the trade-offs of these options is available in Calvin et al. (2014).

### Protecting Lands

With this policy, we can set aside some land, removing it from economic competition. This will result in that land area being fixed across time and any land expansion/contraction will not affect this area. The default in GCAM is to protect 90% of all non-commercial ecosystems.

### Valuing Carbon in Land

In a policy regime, we can choose to put a price on land-use change CO<sub>2</sub> emissions that is related to the price on fossil fuel and industrial CO<sub>2</sub> emissions. The land carbon price can be any multiplier of the fossil fuel carbon price. This factor is applied at the geopolitical region level, and can be differentiated across regions. We model this policy as a subsidy to land-owners for the holding carbon stocks, as opposed to a tax/subsidy on the change in carbon in land. Specifically, the subsidy is equal to the carbon price x the carbon density x a discount factor to account for the amount of time it takes carbon to accumulate x a discount factor to annualize the subsidy.  

### Bioenergy Constraints

We can impose constraints (lower or upper bounds) on bioenergy within GCAM. Under such a policy, GCAM will calculate the tax or subsidy required to ensure that the constraint is met. Note that by default a bioenergy constraint in GCAM (starting with v4.4) is imposed based on the amount of subsidy available for net negative emissions.

### Land expansion costs/constraints

One approach we have implemented and tested is to add a land expansion cost curve to targeted land types in specific regions. Specifically, we have added land expansion cost curves to unmanaged forest land in individual regions in which a carbon policy resulted in fast transformation from grassland to unmanaged forest. This method effectively adds a cost associated with converting to forests.  This cost can be interpreted as the cost of planting, watering, fire management, etc. required to grow trees on previously unforested land.

The land expansion cost curve is implemented as a “renewable” resource that land must “purchase” on a per-unit of land basis. The cost curve can be set at a zero cost up to a predefined amount of land: e.g., base year allocation, pre-industrial allocation, etc. Beyond this point, the cost curve increases to either represent a physical expansion cost or an arbitrarily high cost that would act as a hard constraint on expansion. One drawback to this approach is that each cost curve adds a market equation that needs to be solved. The market should behave well, but adding markets should always be done with care as it does put additional burdens on the solution algorithm.

### Carbon Parks

We have also included code to implement a crop technology that plants trees as densely as possible just for the purposes of storing carbon. Such a “carbon park” technology would allow us to explicitly include physical costs and demands for other inputs such as fertilizer and water when that modeling is available. This would clearly be a “managed” land option and would allow us some more options for modeling carbon policies. As with expansion costs/constraints, carbon parks are not a part of the current core configuration, but can be implemented through changes in input files.


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

<a name="table_footnote">1</a>: Note that this table differs from the one provided on the [Land Inputs Page](inputs_land.html#description) in that it lists all inputs to the land model, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.