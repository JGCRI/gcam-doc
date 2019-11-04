---
layout: index
title: Trade in GCAM
prev: 
next: 
gcam-version: v5.2
---

International trade in most commodities in GCAM is done by one of three methods: (1) Heckscher-Ohlin or single global markets, (2) global trade with regionally-differentiated markets with Armington-like preferences between domestic and imported commodities, and (3) fixed interregional trade.  Other approaches for trade can also be implemented in the GCAM framework (such as [GCAM USA](gcam-usa.html) where logit based decisions are made to facilitating trade between the 50-states).

## Heckscher-Ohlin
Commodities such as coal, gas, oil, bio-energy, Corn, Rice, etc are each traded in a single global market.  Each region will see the same global price and independently decide how much each will supply and demand of each commodity given that price.  A region's net trade position is dynamic depending on economics, technical change, demand, growth, resources, etc.  Under this method for trading goods there is no modeled preference for a given region to demand a commodity from any other specific region.

## Armington Style Trade for Primary Ag
For the primary agriculture commodities such as Corn, Rice, and purpose grown bio-energy we use an Armington style distinction between domestic and imported goods, but not with fixed bilateral imports.    The competition between imports and domestic is governed by a logit.  Imports are from a single global pool that draws from all regions and is also governed by a logit.

## Fixed Interregion Trade
Some commodities such as meat and dairy and trade volumes are currently held fixed at their historical value for the rest of the simulation. Other approaches are possible using nested logits, but the fixed trade assumption based on historical data is a conservative approach.

## No Trade of Secondary energy goods
Note that secondary energy products such as [Electricity](energy.html#electricity) or [Refined Liquids](energy.html#refining) are assumed to not be traded at all between the GCAM geo-political regions.

