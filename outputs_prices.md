---
layout: index
title: Price Outputs
prev: marketplace.html
next: outputs_trade.html
gcam-version: v7 
---

## Description of Outputs

| Name | Resolution | Unit | Query | XML Tag |
| :--- | :--- | :--- | :--- | :--- |
| Price<sup>[1](#table_footnote1)</sup> | Market<sup>[2](#table_footnote2)</sup> and Year  | Various<sup>[3](#table_footnote3)</sup> | <span id="prices of all markets"><button onclick='getQuery("prices of all markets", "prices of all markets")'>prices of all markets</button></span> | `price` |
| Food demand prices | Region, Type and Year  | 2005$/Mcal/day | <span id="food demand prices"><button onclick='getQuery(food demand prices", "food demand prices")'>food demand prices</button></span> | `price-paid` |


<br/>
Outputs are specified in the `startVisitMarket` method of [xml_db_outputter.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/reporting/source/xml_db_outputter.cpp). 

<font size="-1">
<a name="table_footnote1">1</a>: There is a long list of standard queries that report price results. The price query above will report prices for all markets, while other queries filter those results. For example, the "ag commodity prices" query reports prices for agriculture and forestry commodities only. <br/>
<a name="table_footnote2">2</a>: Prices are reported by market. The market name contains both region and commodity information. For example, <i>globalcrude oil</i> is the price of the globally traded crude oil market and <i>USACorn</i> is the price of Corn in the USA. Some markets will have both a global and a regional price.  <br/>
<a name="table_footnote3">3</a>: Units vary by market. In general, energy-related prices are reported in $1975/GJ, agricultural prices are in $1975/kg, forestry prices are in $1975/m<sup>3</sup>, and carbon prices are in $1990/tC. <br/>
</font>
