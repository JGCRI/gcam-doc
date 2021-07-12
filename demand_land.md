---
layout: index
title: Demand for food, forestry, etc.
prev: inputs_demand.html
next: outputs_quantity.html
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

**Table 1: Inputs required by the demand module <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
| Historical demand for agriculture (used for calibration) | By region, demand, commodity, and year | Mt/yr | [Exogenous](inputs_demand.html) |
| Historical demand for livestock (used for calibration) | By region, demand, commodity, and year | Mt/yr | [Exogenous](inputs_demand.html) |
| Historical demand for forest (used for calibration) | By region and year | billion km<sup>3</sup>/yr | [Exogenous](inputs_demand.html) |
| Commodity prices | By region, commodity, and year | 1975$/kg or 1975$/m<sup>3</sup> | [Marketplace](marketplace.html) |
| Income and price elasticity (for non-food, non-feed) | By region, demand, and year | unitless | [Exogenous](inputs_demand.html) |
| Scale parameter, self-price elasticity, cross-price elasticity, income elasticity, regional bias, price scaling parameters (for food demand) | By region | unitless | [Exogenous](inputs_demand.html) |
| Logit exponents | By region and sector or subsector | unitless |  [Exogenous](inputs_demand.html) |
| GDP per capita | By region and year | thous 1990$ per person | [Economy module](economy.html) |
| Population | By region and year | thousand | [Economy module](economy.html) |

<font size="-1">
<a name="table_footnote">1</a>: Note that this table differs from the one provided on the <a href="inputs_demand.html#food-feed-and-forestry">Demand Inputs Page</a> in that it lists all inputs to the land demand module, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.
</font>

<br/>

## Description

### Food demand

Food demand is based on the approach documented in [Edmonds et al. (2017)](#edmonds2017).

### Feed demand

Shares of feed are determined by a [logit sharing approach](choice.html), which depends on the relative costs of the different feed options. Demand for feed is determined by the scale of livestock demand and these feed shares

### Non-food, non-feed demand

Non-food, non-feed demand, including forestry demand, is determined by price, income, and population size. 

## Equations 
The equations that determine food, feed, and forest demand are described here.

### Food demand

$$
q = A * (x^h(x)) * (w_self^e_self(x)) * (w_cross^e_cross(x))
$$

where $$A$$ is a scale parameter, $$x$$ is the income divided by price of materials, $$h(x)$$ is the income elasticity, and $$w_i$$ is the price of the food input divided by the price of materials times some scale factor, and $e_i$$ are price elasticities. 
 
$$x^h(x)$$ is calculated all together depending on the type of FoodDemandInput. See `StaplesFoodDemandInput::calcIncomeTerm` and `NonStaplesFoodDemandInput::calcIncomeTerm` in [food_demand_input.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/functions/source/food_demand_input.cpp).

$$e_self =  g_self - alpha * f(x)$$, $$e_cross = g_cross - alpha_cross * f(x)$$, where $$g_self$$ is self price elasticity parameter, $$g_cross$$ is the cross price elasticity, $$alpha$$ is the share of the total budget for the good, and $$f(x)$$ is the derivative of the income term. See `StaplesFoodDemandInput::getCrossPriceElasticity`, `NonStaplesFoodDemandInput::getCrossPriceElasticity`, `StaplesFoodDemandInput::calcIncomeTermDerivative`, and `NonStaplesFoodDemandInput::calcIncomeTermDerivative` in [food_demand_input.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/functions/source/food_demand_input.cpp). 

See also [food_demand_function.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/functions/source/food_demand_function.cpp)

#### Non-food, non-feed demand

Per-capita non-food, non-feed demands (*D*) from time period *t-1* to time period *t*.

$$
D_t = D_{t-1} * (\frac{pcGDP_t}{pcGDP_{t-1}})^{\alpha^i_t} *
  (\frac{P_t}{P_{t-1}})^{\alpha^p_t} 
$$

where $$pcGDP$$ is per-capita GDP, $$P$$ is the commodity price, $$\alpha^i_t$$ is the income elasticity in time $$t$$ and $$\alpha^p_t}$$ is the price elasticity at time t

See `calcDemand` in [minicam_price_elasticity_function.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/functions/source/minicam_price_elasticity_function.cpp).


## Policy options 

To be completed...

## Insights and intuition

To be completed...

## IAMC Reference Card

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
- [X] Forest fuelwood
- [X] Forest residues




## References

<a name="edmonds2017">[Edmonds et al. (2017)]</a> EDMONDS, J. A., R. LINK, S. T. WALDHOFF, and R. CUI, 2017: A GLOBAL FOOD DEMAND MODEL FOR THE ASSESSMENT OF COMPLEX HUMAN-EARTH SYSTEMS. Clim. Chang. Econ., 08, 1750012, https://doi.org/10.1142/S2010007817500129.


