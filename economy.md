---
layout: index
title: Economy
prev: inputs_economy.html
next: outputs_prices.html
gcam-version: v5.4 
---

# Table of Contents

- [Inputs to the Module](#inputs-to-the-module)
- [Description](#description)
- [Equations](#equations)
- [Insights and intuition](#insights-and-intuition)
- [IAMC Reference Card](#iamc-reference-card)

## Inputs to the Module
**Table 1: Inputs required by the economic module <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
| Population | Region and year | thousands | [Exogenous](inputs_economy.html) |
| Labor productivity growth rate | Region and year | unitless | [Exogenous](inputs_economy.html) |
| Labor force participation rate | Region and year | unitless | [Exogenous](inputs_economy.html) |
| Base year GDP | Region | million 1990$ | [Exogenous](inputs_economy.html) |

## Description

The socioeconomic component of GCAM sets the scale of economic activity and associated demands for model simulations. Assumptions about population and per capita GDP growth for each of the 32 geo-political regions together determine the Gross Domestic Product (GDP). GDP and population both can drive the demands for a range of different demands within GCAM. Population and economic activity are used in GCAM through a one-way transfer of information to other GCAM components. For example, neither the price nor quantity of energy nor the quantity of energy services provided to the economy affect the calculation of the principle model output of the GCAM macro-economic system, GDP.

## Equations 
The equations that determine economic variables are described here.

#### GDP

Regional GDP is calculated using a simple one-equation model:

$$
Equation 1: GDP_{r,t+1} = POP_{r,t+1} * LF_{r,t+1} * *( 1+GRO_{r,t+1})^{tStep}( \frac{GDP_{r,t}}{POP_{r,t}LF_{r,t}} ) * (\frac{P_{r,t+1}}{P_{r,t}})^\alpha
$$

Where $$r$$=region, $$t$$=the period, $$tStep$$=number of years in the time step, $$GDP_{r,t}$$=population in region $$r$$ in period $$t$$, $$POP_{r,t}$$=population in region $$r$$ in period $$t$$, $$LF_{r,t}$$=labor force participation in region $$r$$ in period $$t$$ and $$GRO_{r,t}$$=labor productivity growth rate in region $$r$$ in period $$t$$. The last term is an energy-price feedback, where $$P_{r,t}$$ is the price of energy services and $$\alpha$$ is a feedback elasticity (e.g., the percentage change in GDP for a percentage change in price). Note that $$\alpha$$ is set to zero in GCAM, effectively removing this term from the calculation of GDP.  

See `initialGDPcalc` and `adjustGDP` in [gdp.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/containers/source/gdp.cpp).

## Insights and intuition

### Socioeconomic growth and demand

Changes in future per capita GDP and population will affect the final demand for energy, food, and forestry. For example, increases in population will increase regional consumption proportionally, while changes in per capita GDP affect consumption through income elasticities (See [demand inputs](inputs_demand.html)). Thus, different assumptions of future GDP and population growth across different socioeconomic scenarios may play key roles in driving to an alternative future. In addition, regional heterogeneity in future GDP and population growth, leading to heterogeneous regional demand growth, is also a critical driver to future changes in regional supply, biophysical responses, and trade patterns.

## IAMC Reference Card

Population
- [X] Yes (exogenous)
- [ ] Yes (endogenous)

Population age structure
- [ ] Yes (exogenous)
- [ ] Yes (endogenous)

Education level
- [ ] Yes (exogenous)
- [ ] Yes (endogenous)

Urbanization rate
- [ ] Yes (exogenous)
- [ ] Yes (endogenous)

GDP
- [ ] Yes (exogenous)
- [X] Yes (endogenous)

Income distribution
- [ ] Yes (exogenous)
- [ ] Yes (endogenous)

Employment rate
- [ ] Yes (exogenous)
- [ ] Yes (endogenous)

Labor productivity
- [X] Yes (exogenous)
- [ ] Yes (endogenous)

Total factor productivity
- [X] Yes (exogenous)
- [ ] Yes (endogenous)

Autonomous energy efficiency improvements
- [X] Yes (exogenous)
- [ ] Yes (endogenous)


<a name="table_footnote">1</a>: Note that this table differs from the one provided on the [Economy Inputs Page](inputs_economy.html#description) in that it lists all inputs to the economy module, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.

