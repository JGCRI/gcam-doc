---
layout: index
title: Outputs from the Land Model
prev: supply_land.html
next: outputs_emissions.html
gcam-version: v6 
---

## Description of Outputs

| Name | Resolution | Unit | Query | XML Tag |
| :--- | :--- | :--- | :--- | :--- |
| Land use and land cover | By GLU, land leaf, and year | thousand $$km^2$$ | <span id="detailed land allocation"><button onclick='getQuery("detailed land allocation", "detailed land allocation")'>detailed land allocation</button></span> or <span id="aggregated land allocation"><button onclick='getQuery("aggregated land allocation", "aggregated land allocation")'>aggregated land allocation</button></span><sup>[1](#table_footnote)</sup>| `land-allocation` |
| Land use change emissions | By GLU and land leaf | MtC / year | <span id="LUC emissions by region"><button onclick='getQuery("LUC emissions by region", "LUC emissions by region")'>LUC emissions by region</button></span> | `land-use-change-emission` |
| Change in above ground carbon | By GLU and land leaf | MtC / year |  | `above-land-use-change-emission`|
| Change in below ground carbon | By GLU and land leaf | MtC / year |  | `below-land-use-change-emission`|
| Above ground carbon stock | By GLU and land leaf | MtC | <span id="vegetative carbon stock by region"><button onclick='getQuery("vegetative carbon stock by region", "vegetative carbon stock by region")'>vegetative carbon stock by region</button></span> | `above-ground-carbon-stock` |
| Profit rate | By GLU and land leaf | 1975$/thous km<sup>2</sup> | <span id="profit rate"><button onclick='getQuery("profit rate", "profit rate")'>profit rate</button></span> | `profit-rate` |

<br/>
Outputs are specified in the `startVisitLandLeaf` and `startVisitCarbonCalc` methods of [xml_db_outputter.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/reporting/source/xml_db_outputter.cpp). 

<font size="-1">
<a name="table_footnote">1</a>: There is a long list of standard queries that report land allocation outputs. The "detailed land allocation" query will list land for every single land leaf and region combo (see <a href="details_land.html#land-nesting-strategy">land nesting</a> for a complete list of land leafs). The "aggregated land allocation" query listed above will aggregate land into 12 categories (e.g., crops, biomass, etc.). There are also queries that will return land allocation for an individual GLU ("land allocation in a specified land use region") or total land by crop ("land allocation by land crop"). <br/>
</font>