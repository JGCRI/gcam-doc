---
layout: index
title: Outputs from Emissions Modeling
prev: emissions.html
next: diagram.html
gcam-version: v6 
---

## Description of Outputs

| Name | Resolution | Unit | Query | XML Tag |
| :--- | :--- | :--- | :--- | :--- |
|Emissions (CO<sub>2</sub>)|Technology, Region<sup>[3](#table_footnote)</sup>, and Year|MtC/year|<span id="CO2 emissions by tech (excluding resource production)"><button onclick='getQuery("CO2 emissions by tech (excluding resource production)", "CO2 emissions by tech (excluding resource production")'>CO2 emissions by tech (excluding resource production)</button></span>|`emissions`|
| Emissions (non-CO<sub>2</sub>)<sup>[1,2](#table_footnote)</sup> |  Technology, Region<sup>[3](#table_footnote)</sup>, and Year | Various<sup>[4](#table_footnote)</sup>  | <span id="nonCO2 emissions by tech (excluding resource production)"><button onclick='getQuery("nonCO2 emissions by tech (excluding resource production)", "nonCO2 emissions by tech (excluding resource production)")'>nonCO2 emissions by tech (excluding resource production)</button></span> | `emissions` |
|Resource production emissions (CO<sub>2</sub>)|Subresource, Region, and Year|MtC/year|<span id="CO2 emissions by resource production"><button onclick='getQuery("CO2 emissions by resource production", "CO2 emissions by resource production")'>CO2 emissions by resource production</button></span>|`emissions`|
|Resource production emissions (non-CO<sub>2</sub>)|Subresource, Region, and Year|MtC/year|<span id="CO2 emissions by resource production"><button onclick='getQuery("nonCO2 emissions by resource production", "nonCO2 emissions by resource production")'>nonCO2 emissions by resource production</button></span>|`emissions`|
| Land use change emissions | By GLU and land type | MtC / year | <span id="LUC emissions by region"><button onclick='getQuery("LUC emissions by region", "LUC emissions by region")'>LUC emissions by region</button></span> | `land-use-change-emission` |
| Change in above ground carbon | By GLU and land type | MtC / year |  | `above-land-use-change-emission`|
| Change in below ground carbon | By GLU and land type | MtC / year |  | `below-land-use-change-emission`|
| CO<sub>2</sub> Sequestration<sup>[6](#table_footnote)</sup> |  Technology, Region<sup>[3](#table_footnote)</sup>, and Year | MtC / year  | <span id="CO2 sequestration by tech"><button onclick='getQuery("CO2 sequestration by tech", "CO2 sequestration by tech")'>CO2 sequestration by tech</button></span> | `emissions-sequestered` |

<br/>
Outputs are specified in the `startVisitGHG`<sup>[5](#table_footnote)</sup> and `startVisitCarbonCalc` methods of [xml_db_outputter.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/reporting/source/xml_db_outputter.cpp). 
<br/> <br/>
Note that the query "CO<sub>2</sub> emissions by region" represents gross CO<sub>2</sub> emissions for a region and is equal to the sum of all emissions from "CO<sub>2</sub> emissions by tech (excluding resource production)" and all emissions from "CO<sub>2</sub> emissions by resource production". A region's net CO<sub>2</sub> emissions can be calculated by adding "CO<sub>2</sub> emissions by region" and "LUC emissions by region".
<br/> <br/>

<font size="-1">
<a name="table_footnote">1</a>: A full list of gases included in GCAM is provided on the <a href="emissions.html#iamc-reference-card">emissions page</a>.  <br/>
<a name="table_footnote">2</a>: There is a long list of standard queries that report emissions outputs. The "nonCO2 emissions by tech (excluding resource production)"  and "CO2 emissions by tech (excluding resource production)" queries listed above will report all emissions except for land use change CO<sub>2</sub> and emissions from resource production at the technology level. The other queries filter or aggregate those outputs. For example, the "CO2 emissions by region" query aggregates <i>emissions</i> to the region level for fossil fuel and industrial CO<sub>2</sub> only.   <br/>
<a name="table_footnote">3</a>: Emissions are reported at the regional resolution of the sector. See <a href="common_assumptions.html#regional-resolution">Regional Resolution</a>      <br/>
<a name="table_footnote">4</a>: Units vary. Fluorinated gas emissions are reported in Gg of the specific gas per year. All other emissions are reported in Tg of the specific gas per year (e.g., CH<sub>4</sub> emissions are reported in TgCH<sub>4</sub> / yr).    <br/>
<a name="table_footnote">5</a>: While the method is called <i>startVisitGHG</i>, it includes non-GHG emissions. However, land use change CO<sub>2</sub> emissions are not included in this method.     <br/>
<a name="table_footnote">6</a>: There are two emissions sequestration queries. The "CO2 sequestration by tech" query listed above will return CO<sub>2</sub> sequestration by technology, while "CO2 sequestration by sector" aggregates this to the sector level.     <br/>
</font>