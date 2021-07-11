---
layout: index
title: Marketplace
prev: economy.html
next: outputs_prices.html
gcam-version: v5.4 
---

# Table of Contents

- [Inputs to the Module](#inputs-to-the-module)
- [Description](#description)
- [Policy options](#policy-options)
- [Insights and intuition](#insights-and-intuition)

## Inputs to the Model
**Table 1: Inputs required by the marketplace module**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
| Supply of all energy commodities | Region and year  | EJ/yr | [Energy Supply Module](supply_energy.html) |
| Demand for all energy commodities | Region and year  | EJ/yr | [Energy Demand Module](demand_energy.html) |
| Supply of all agriculture and land-based commodities | Region and year  | Various (e.g., Mt/yr, billion m<sup>3</sup>/yr) | [Land Supply Module](supply_land.html) |
| Demand for all agriculture and land-based commodities | Region and year  | Various (e.g., Mt/yr, billion m<sup>3</sup>/yr) | [Land Demand Module](demand_land.html) |
| Supply of all water types | Basin and year  | km<sup>3</sup> | [Water Supply Module](supply_water.html) |
| Demand for water withdrawals and consumption | Basin and year  | km<sup>3</sup> | [Water Demand Module](demand_water.html) |

<br/>

## Description

GCAM operates by determining a set of prices that ensure supply is equal to demand for all time steps. The marketplace collects the supplies and demands and uses [solver algorithms](solver.html) to determine those prices.

## Policy options 

This section summarizes some of the marketplace policy options available in GCAM. 

### Carbon or GHG prices

GCAM users can directly specify the price of carbon or GHGs. Given a carbon price, the resulting emissions will vary depending on other scenario drivers, such as population, GDP, resources, and technology. See [example](policies_examples.html#carbon-price).

## Insights and intuition

To be completed...
