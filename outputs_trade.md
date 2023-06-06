---
layout: index
title: Trade Outputs
prev: output_prices.html
next: outputs_land.html
gcam-version: v7 
---

## Description of Outputs

There is no specific `XML tag` or query for trade in GCAM. For commodities that are traded via the [Armington Style Approach](details_trade.html#armington-style-trade), there are specific technologies for imports and domestic consumption (e.g., the "regional corn" sector has a "domestic corn" and "imported corn" technology) and exports are tracked in a traded sector (e.g., the "traded corn" sector has technologies for each region that exports into the global market). For all commodities, trade information can be derived by taking the difference between production and consumption of a particular commodity in a particular region. See [quantities](outputs_quantity.html) for information on how to get production and consumption.
