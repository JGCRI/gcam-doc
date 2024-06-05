---
layout: index
title: Quantity Outputs
prev: supply_land.html
next: outputs_prices.html
gcam-version: v7
---

## Description of Outputs

| Name | Resolution | Unit | Query | XML Tag |
| :--- | :--- | :--- | :--- | :--- |
| Physical Output<sup>[1](#table_footnote)</sup> | Technology, Region<sup>[2](#table_footnote)</sup>, Vintage, and Year  | Various<sup>[3](#table_footnote)</sup> | <span id="outputs by tech"><button onclick='getQuery("outputs by tech", "outputs by tech")'>outputs by tech</button></span> | `physical-output` |
| Resource Production | Region, Resource and Year   | Various<sup>[3](#table_footnote)</sup> | <span id="resource production"><button onclick='getQuery("resource production", "resource production")'>resource production</button></span> | `output` |
| Inputs<sup>[1](#table_footnote)</sup> | Technology, Input, Region<sup>[2](#table_footnote)</sup>, Vintage, and Year    | Various<sup>[3](#table_footnote)</sup> | <span id="inputs by tech"><button onclick='getQuery("inputs by tech", "inputs by tech")'>inputs by tech</button></span> | `demand-physical` |
| Supply | Market<sup>[4](#table_footnote)</sup> and Year   | Various<sup>[3](#table_footnote)</sup> | <span id="supply of all markets"><button onclick='getQuery("supply of all markets", "supply of all markets")'>supply of all markets</button></span> | `supply` |
| Demand | Market<sup>[4](#table_footnote)</sup> and Year   | Various<sup>[3](#table_footnote)</sup> | <span id="demand of all markets"><button onclick='getQuery("demand of all markets", "demand of all markets")'>demand of all markets</button></span> | `demand` |

Outputs are specified in the `startVisitOutput`, `startVisitResource`, `startVisitInput`, and `startVisitMarket` methods of [xml_db_outputter.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/reporting/source/xml_db_outputter.cpp).

<font size="-1">
<a name="table_footnote">1</a>: There is a long list of standard queries that report quantity outputs. The "physical output" query listed above will report all outputs at the technology level. The "inputs" query listed above will report all inputs to each technology. The other queries filter or aggregate those outputs. For example, the "outputs by sector" query aggregates <i>physical-output</i> to the sector level; the "elec gen by gen tech" query filters the <i>physical-output</i> for electricity generating technologies. The "primary energy consumption by region (direct equivalent)" aggregates all energy-related inputs, providing a total energy consumption by fuel, region, and year. <br/>
<a name="table_footnote">2</a>: Outputs are reported at the regional resolution of the sector. See <a href="common_assumptions.html#regional-resolution">Regional Resolution</a>  <br/>
<a name="table_footnote">3</a>: Units vary. In general, energy-related outputs are reported in EJ/yr, agricultural outputs are in Mt/yr, forestry outputs are in million m<sup>3</sup>/yr, and water outputs are in km<sup>3</sup>/yr.  <br/>
<a name="table_footnote">4</a>: Supply and demand can be reported by market. The market name contains both region and commodity information. For example, <i>globalcrude oil</i> is the globally traded crude oil market and <i>USACorn</i> is Corn market in the USA. Some markets will have both a global and a regional supply or demand.
</font>
