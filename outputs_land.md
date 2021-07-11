---
layout: index
title: Outputs from the Land Model
prev: supply_land.html
next: outputs_emissions.html
gcam-version: v5.4 
---

## Description of Outputs

| Name | Resolution | Unit | Query | XML Tag |
| :--- | :--- | :--- | :--- | :--- |
| Land use and land cover | By GLU, land type, and year | thousand $$km^2$$ | <span id="detailed land allocation"><button onclick='getQuery("detailed land allocation", "detailed land allocation")'>detailed land allocation</button></span> | `land-allocation` |
| Land use change emissions | By GLU and land type | MtC / year | <span id="LUC emissions by region"><button onclick='getQuery("LUC emissions by region", "LUC emissions by region")'>LUC emissions by region</button></span> | `land-use-change-emission` |
| Change in above ground carbon | By GLU and land type | MtC / year |  | `above-land-use-change-emission`|
| Change in below ground carbon | By GLU and land type | MtC / year |  | `below-land-use-change-emission`|
| Above ground carbon stock | By GLU and land type | MtC | <span id="vegetative carbon stock by region"><button onclick='getQuery("vegetative carbon stock by region", "vegetative carbon stock by region")'>vegetative carbon stock by region</button></span> | `above-ground-carbon-stock` |

Outputs are specified in the `startVisitLandLeaf` and `startVisitCarbonCalc` methods of [xml_db_outputter.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/reporting/source/xml_db_outputter.cpp). 