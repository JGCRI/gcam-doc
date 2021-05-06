---
layout: index
title: Economy
prev: inputs_economy.html
next: outputs_prices.html
gcam-version: v5.3 
---

# Table of Contents

- [Inputs to the Model](#inputs-to-the-model)
- [Description](#description)
- [Equations](#equations)
- [Insights and intuition](#insights-and-intuition)
- [Policy options](#policy-options)
- [IAMC Reference Card](#iamc-reference-card)
- [References](#references)

## Inputs to the Model
**Table 1: Inputs required by the economic model <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
|  |  |  | [Exogenous](inputs_supply.html) |


## Description

<Add as many subsections and sub-subsections as needed to describe this area. Each subsection should have a short paragraph qualitatively describing the topic. Additional information can be included on a details_xyz.md page if needed>


## Equations 
The equations that determine economic variables are described here.

#### GDP

Regional GDP is calculated using a simple one-equation model:

$$
Equation 1: GDP_{r,t+1} = POP_{r,t+1}( 1+GRO_{r,t})^{tStep}( \frac{GDP_{r,t}}{POP_{r,t}} ) P^{ \alpha }_{r,t+1}
$$

Where $$r$$=region, $$t$$=the period, $$tStep$$=number of years in the time step, $$GDP_{r,t}$$=population in region $$r$$ in period $$t$$, $$POP_{r,t}$$=population in region $$r$$ in period $$t$$ and $$GRO_{r,t}$$=annual average per capita GDP growth rate in region $$r$$ in period $$t$$.

See `method name` in [code_file.cpp](link to code on GitHub).

## Policy options 
This section summarizes some of the energy-based policy options available in GCAM. 

### Policy type #1
<Insert paragraph describing a type of policy for this sector. Include links to xml input files on GitHub and/or the policies.html or policies_examples.html pages>

## Insights and intuition

### Paper/Topic #1
<One paragraph summary of a key insight from one or more papers>

## IAMC Reference Card
<Add relevant parts of IAMC reference card>


<a name="table_footnote">1</a>: Note that this table differs from the one provided on the [Supply Inputs Page](inputs_supply.html#description) in that it lists all inputs to the land model, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.

## References

