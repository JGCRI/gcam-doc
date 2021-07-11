---
layout: index
title: Outputs from Emissions Modeling
prev: emissions.html
next: diagram.html
gcam-version: v5.4 
---

## Description of Outputs

| Name | Resolution | Unit | Query | XML Tag |
| :--- | :--- | :--- | :--- | :--- |
| Emissions<sup>[1,2](#table_footnote)</sup> |  Technology, Region<sup>[3](#table_footnote)</sup>, and Year | Various<sup>[4](#table_footnote)</sup>  | <span id="nonCO2 emissions by tech"><button onclick='getQuery("nonCO2 emissions by tech", "nonCO2 emissions by tech")'>nonCO2 emissions by tech</button></span> | `emissions` |
| Land use change emissions | By GLU and land type | MtC / year | <span id="LUC emissions by region"><button onclick='getQuery("LUC emissions by region", "LUC emissions by region")'>LUC emissions by region</button></span> | `land-use-change-emission` |
| Change in above ground carbon | By GLU and land type | MtC / year |  | `above-land-use-change-emission`|
| Change in below ground carbon | By GLU and land type | MtC / year |  | `below-land-use-change-emission`|
| CO<sub>2</sub> Sequestration<sup>[6](#table_footnote)</sup> |  Technology, Region<sup>[3](#table_footnote)</sup>, and Year | MtC / year  | <span id="CO2 sequestration by tech"><button onclick='getQuery("CO2 sequestration by tech", "CO2 sequestration by tech")'>CO2 sequestration by tech</button></span> | `emissions-sequestered` |

<br/>
Outputs are specified in the `startVisitGHG`<sup>[5](#table_footnote)</sup> and `startVisitCarbonCalc` methods of [xml_db_outputter.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/reporting/source/xml_db_outputter.cpp). 

<font size="-1">
<a name="table_footnote">1</a>: While the query is called "nonCO2 emissions", it also includes CO<sub>2</sub> emissions. A full list of gases included in GCAM is provided on the <a href="emissions.html#iamc-reference-card">emissions page</a>.  <br/>
<a name="table_footnote">2</a>: There is a long list of standard queries that report emissions outputs. The "nonCO2 emissions by tech" query listed above will report all emissions except for land use change CO<sub>2</sub> at the technology level. The other queries filter or aggregate those outputs. For example, the "CO2 emissions by region" query aggregates <i>emissions</i> to the region level for fossil fuel and industrial CO<sub>2</sub> only.   <br/>
<a name="table_footnote">3</a>: Emissions are reported at the regional resolution of the sector. See <a href="common_assumptions.html#regional-resolution">Regional Resolution</a>      <br/>
<a name="table_footnote">4</a>: Units vary. CO<sub>2</sub> emissions are reported in MtC/yr. Fluorinated gas emissions are reported in Gg of the specific gas per year. All other emissions are reported in Tg of the specific gas per year (e.g., CH<sub>4</sub> emissions are reported in TgCH<sub>4</sub> / yr).    <br/>
<a name="table_footnote">5</a>: While the method is called <i>startVisitGHG</i>, it includes non-GHG emissions. However, land use change CO<sub>2</sub> emissions are not included in this method.     <br/>
<a name="table_footnote">6</a>: There are two emissions sequestration queries. The "CO2 sequestration by tech" query listed above will return CO<sub>2</sub> sequestration by technology, while "CO2 sequestration by sector" aggregates this to the sector level.     <br/>
</font>