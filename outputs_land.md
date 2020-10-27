---
layout: index
title: Outputs from the Land Model
prev: supply_land.html
next: outputs_emissions.html
gcam-version: v5.3 
---

## Description of Outputs

| Name | Resolution | Unit | Query | XML Tag |
| :--- | :--- | :--- | :--- | :--- |
| Land use and land cover | By GLU, land type, and year | thousand $$km^2$$ | <span id="detailed land allocation"><button onclick='getQuery("detailed land allocation", "detailed land allocation")'>detailed land allocation</button></span> | `land-allocation` |
| Land use change emissions | By GLU and land type | MtC / year | <span id="LUC emissions by region"><button onclick='getQuery("LUC emissions by region", "LUC emissions by region")'>LUC emissions by region</button></span> | `land-use-change-emission` |
| Change in above ground carbon | By GLU and land type | MtC / year |  | `above-land-use-change-emission`|
| Change in below ground carbon | By GLU and land type | MtC / year |  | `below-land-use-change-emission`|
| Above ground carbon stock | By GLU and land type | MtC | <span id="vegetative carbon stock by region"><button onclick='getQuery("vegetative carbon stock by region", "vegetative carbon stock by region")'>vegetative carbon stock by region</button></span> | `above-ground-carbon-stock` |

Other land-related outputs include production and consumption [quantities](outputs_quantity.html#foodfeedforestry), [prices](outputs_prices.html#foodfeedforestry), [trade](outputs_trade.html), and [emissions](outputs_emissions.html#agricultureandlanduse).
