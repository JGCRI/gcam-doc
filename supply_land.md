---
layout: index
title: Supply of Food, Feed, and Forestry
prev: inputs_supply.html
next: outputs_quantity.html
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
**Table 1: Inputs required by the supply model <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
|  |  |  | [Exogenous](inputs_supply.html) |


## Description

{Add as many subsections and sub-subsections as needed to describe this area. Each subsection should have a short paragraph qualitatively describing the topic. Additional information can be included on a details_xyz.md page if needed}

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

To be completed...

## Policy options 

To be completed...

## Insights and intuition

To be completed...

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



<a name="table_footnote">1</a>: Note that this table differs from the one provided on the [Supply Inputs Page](inputs_supply.html#description) in that it lists all inputs to the land model, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.

## References

