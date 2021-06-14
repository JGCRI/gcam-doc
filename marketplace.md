---
layout: index
title: Marketplace
prev: economy.html
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
**Table 1: Inputs required by the marketplace model**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
|  |  |  | [Exogenous](inputs_supply.html) |


## Description

### Trade

GCAM uses different approaches to modeling trade depending on the commodity. See [trade](details_trade.html) for more information on these approaches.

#### Agricultural Markets and Trade
Version 5.2 and greater of GCAM include the capability to represent regional agricultural markets, with explicitly modeled gross imports and exports of selected crop types. In contrast to the purely global approach, wherein crop prices are only tracked at the global level, the regional markets approach also has region-specific crop prices and markets. Note that bilateral trade is not modeled; for each crop, a region's gross imports come from, and exports go to, a single global market for the given crop.

The structural implementations of a "global-market" versus a "regional-market" representation are shown in Figure 2.

![AgLU Global Markets](gcam-figs/ag_global_mkt.png)<br/>
![AgLU Regional Markets](gcam-figs/ag_regional_mkt.png)<br/>
Figure 2: Global (upper) and regional (lower) agricultural markets structures, for a representative crop and three representative regions.
{: .fig}

In the global-market representation, each region's production is output to a global market, which in turn supplies each region's demand sectors (i.e., food, feed, biofuel production, and other uses). As there is only one global market per crop commodity, all regions see the same price. Similarly, the impacts of a supply (demand) shock within any region do not directly cause a shock to the demand (supply) of that region; these sorts of within-region impacts are buffered by the global market.

In the regional-market representation, one additional sector per crop is added to each region for representing domestic supplies; consistent with GCAM terminology elsewhere, these sectors are named, e.g., "regional corn". The total domestic supply of any crop and region is equal to production minus exports plus imports. The production sector's prices are region-specific, as are the "regional crop" prices seen by the demand sectors. Therefore, a shock to the producer prices of an agricultural commodity in some region has a direct impact on the consumption sectors within that region.

For each crop, this structure introduces two new nests with [calibrated logit choice](choice.html):

1. The global "traded crop" is supplied by gross exports from each of GCAM's geopolitical regions.
2. The "regional crop" sector within each region allocates market share to domestic production versus imports of the global "traded crop".



## Equations 
The equations used in the marketplace are described here.

#### Variable #1
<Insert equations used to calculate variable #1>

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

## References