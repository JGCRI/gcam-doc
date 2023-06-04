---
layout: index
title: Supply of Food, Feed, and Forestry
prev: inputs_supply.html
next: outputs_quantity.html
gcam-version: v6 
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
**Table 1: Inputs required by the supply module <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
| Land use and land cover | By GLU, land type, and year | thousand $$km^2$$ | [Land Allocator](land.html) |
| Historical harvested area (used to calculate historical yield) | By GLU, crop, management practice, and year | thousand $$km^2$$ | [Exogenous](inputs_supply.html) |
| Historical production (used to calculate historical yield) | By GLU, crop, management practice, and year | thousand $$km^2$$ | [Exogenous](inputs_supply.html) |
| Agriculture productivity growth (used to calculate future yield) | By GLU, crop, management practice, year | % per year | [Exogenous](inputs_supply.html) |
| Non-fertilizer, non-water, non-land variable cost of production | By GLU, crop, management practice, and year | 1975$/kg | [Exogenous](inputs_supply.html)  |
| Fertilizer coefficients | By GLU, crop, management practice, and year | 1975$/kg | [Exogenous](inputs_supply.html)  |
| Water coefficients | By GLU, crop, management practice, and year | 1975$/kg | [Exogenous](inputs_demand.html)  |
| Commodity prices | By region, commodity, and year | 1975$/kg | [Marketplace](marketplace.html)  |
| Fertilizer prices | By region, commodity, and year | 1975$/kg | [Marketplace](marketplace.html)  |
| Water prices | By basin and year | 1975$/m3 | [Marketplace](marketplace.html)  |

<a name="table_footnote">1</a>: Note that this table differs from the one provided on the [Supply Inputs Page](inputs_supply.html#food-feed-and-forestry) in that it lists all inputs to the land supply module, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.


## Description


### Variable Costs

Variable costs are defined here as the non-land costs of crop production, per-unit of crop.  We model the cost of fertilizer and water explicitly, including input-output coefficients and prices of each. Other components of variable cost are derived from USDA cost data.

Variable costs set hard price floors in the model: production goes to zero when price is less than or equal to the variable costs. As a result, these costs should be interpreted as pure minimum or shut-down costs. They should be just the cost of materials and hired labor for producing a crop or product with a given technology in a subregion. 

Value-added categories are not included in the variable costs. In addition, variable costs do not include land costs, as the model is based on allocating land on per unit profits. They should also not include cost categories that represent return to capital or profits. We can assume these costs are captured in the distribution of profit rates behind the logit. Otherwise, consider that if these costs are put into our variable costs, ultimately all marginal profit rates (from economic theory) would be zero and provide no value to our modeling. In addition, accounting costs such as depreciation should not be part of variable costs.

Data on labor costs can be difficult to use, since some farm wage categories are income that the farmer either earns or expects to be paid and thus, some labor costs are really profit to the land-owner (i.e., farmer). Therefore, we have restricted our variable cost data to include what is labeled as “hired labor”.

Note that introducing variable costs that differ by region can result in unintended consequences. Different variable costs create different price floors, which can result in a region ceasing production of a particular product if technical change lowers the global product price significantly (i.e., to a point where the variable cost is less than the price received). 

The main points can be summarized as:

* Variable costs create price floors
* Variable costs should be based on technology data. They should not be used as calibration parameters to adjust profits.
* Variable costs should not include land costs, value-added categories of land, return to capital, and owner-wages.


## Equations 

### Profit rate

Profit rate for all agricultural production technologies is calculated as:

$$
profitRate = 1e9*( price + subsidy - varCost - inputCosts + secondaryValue ) * yield + impliedSubsidy
$$

where $$price$$ is the commodity price, $$subsidy$$ is any exogenously-specified subsidy, $$varCost$$ is the non-land variable cost, $$inputCosts$$ are the costs of inputs (e.g., fertilizer, water), $$yield$$ is the yield for the technology, and $$impliedSubsidy$$ is an implicit subsidy calculated in the calibration periods to ensure profits are above a specified threshold. Note that the subsidy is multiplied by $$1e9$$, as the land allocator expects profit rates in 1975$/billion m<sup>2</sup>.

See `calcProfitRate` in [ag_production_technology.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/technologies/source/ag_production_technology.cpp).

### Supply

Agricultural supply is calculated as:

$$
supply = yield * land
$$

where $$yield$$ is the yield for the technology and $$land$$ is the land allocation (retrieved from the [land allocation module](land.html)).

See `calcSupply` in [ag_production_technology.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/technologies/source/ag_production_technology.cpp).

### Yield

For technologies that have production in the historical period, yield for the historical period is calculated as:

$$
yield = supply / land
$$

For all technologies, future yield is calculated as:

$$
yield_{t} = yield_{t-1} * (1 + APG)^{timestep}
$$

where $$yield_{t}$$ is the yield in time $$t$$, $$APG$$ is the agricultural productivity growth rate and $$timestep$$ is the number of years between $$t$$ and $$t-1$$.

See `initCalc` in [ag_production_technology.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/technologies/source/ag_production_technology.cpp).

## Livestock production

GCAM uses one of [two different logit formulations](choice.html#the-logit) to calculate the shares for each technology or subsector. For livestock, subsectors represent different production systems, where technologies represent different feed sources.

The first option, also known as the `relative-cost-logit`, is:

$$
s_i = \frac{\alpha_i c_i^\gamma}{\sum_{j=1}^{N} \alpha_j c_j^\gamma}
$$

where $$s_i$$ is the share of technology or subsector $$i$$, $$alpha_i$$ is the share weight, $$c_i$$ is the cost of technology or subsector $$i$$, and $$beta$$ is the logit exponent.

The second option, also known as the `absolute-cost-logit`, is: 

$$
s_i = \frac{\alpha_i \exp(\beta c_i)}{\sum_{j=1}^{N} \alpha_j
\exp(\beta c_j)}.
$$

where $$s_i$$ is the share of technology or subsector $$i$$, $$alpha_i$$ is the share weight, $$c_i$$ is the cost of technology or subsector $$i$$, and $$beta$$ is the logit exponent.

See [relative cost logit](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/functions/source/relative_cost_logit.cpp) and [absolute cost logit](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/functions/source/absolute_cost_logit.cpp).

 
## Policy options 

There are a number of ways that policies can be applied directly to influence the land sector in GCAM. These include the following.

* Protected Lands: With this policy, GCAM users can set aside a fraction of natural land, removing it from economic competition. This land cannot be converted to crops, pasture, or any other land type. This is similar to real-world policies such as reducing emissions from deforestation and forest degradation (REDD). See more on how these assumptions can be adjusted [here](land.html#protecting-lands).

* Valuing carbon in land: When applying a price on carbon through any of the emissions-related policy approaches, GCAM users can choose whether that price extends to land use change CO<sub>2</sub> emissions. This policy is modeled as a subsidy to land-owners for the holding carbon stocks as opposed to a price on the emissions themselves.

* Bioenergy constraints: GCAM users can impose constraints on bioenergy within GCAM. Under such a policy, GCAM will calculate the tax or subsidy required to ensure that the constraint is met. By default two bioenergy related constraints are enabled in GCAM and described below.  Alternative approaches could be used for more direct constraints as show in the [examples](policies_examples.html#energy-constraint).
  * Negative emissions budget: This constraint limits the total *gross value* of all negative emissions, be it bioenergy or otherwise, to a certain fraction of GDP as defined by `energy.NEG_EMISS_GDP_BUDGET_PCT` in [constants.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/constants.R#L549).  To enforce the constraint the model will scale back the value of the subsidy given to bioenergy to stay within the budget.  Thus limiting the value but not necessarily the quantity of negative emissions.  Note this budget is also applied to the valuation of carbon in land when running such a policy, however the actual value of those emissions are not included in this budget at the moment.
  * Biomass externality cost: We include an additional constraint which is meant to represent the costs paid for various externalities resulting from large scale production of purpose grown bioenergy crops.  This constraint is represented with an increasing cost with higher levels of production as defined in [A27.GrdRenewRsrcCurves.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/energy/A27.GrdRenewRsrcCurves.csv).

* Land constraints: GCAM users can constrain the amount of land of a particular type in a given region. Under such a policy, GCAM will calculate the tax or subsidy required to ensure that the constraint is met. See [example](policies_examples.html#land-constraint).

## Insights and intuition

### Implications of Limiting CO2 Concentrations for Land Use and Energy

Land-use modification strategies reduce the cost of limiting atmospheric CO2 concentrations, but can make crop prices rise and transform human diets, for example, when people consume less beef and other carbon-intensive protein sources. The rate at which crop productivity is improved has a strong influence on emissions from land-use change. Thus, the technology used for growing crops is potentially as important for limiting atmospheric CO2 as are approaches like CO2 capture and storage [(Wise et al. 2009)](https://www.science.org/doi/full/10.1126/science.1168475).

## IAMC Reference Card

Agricultural commodities
- [X] Wheat
- [X] Rice
- [X] Other coarse grains
- [X] Oilseeds
- [X] Sugar crops
- [X] Ruminant meat
- [X] Non-ruminant meat and eggs
- [X] Dairy products




## References

