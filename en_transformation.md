---
layout: index
title: Energy Transformation
next: en_refining.html
current-version: v4.2 
---

Broadly, the energy transformation sectors in GCAM consist of all supplysectors between the energy resources and the final demands, where the latter are identified by the final-energy keywords "buildings", "industry", or "transportation". Energy transformation sectors consume energy goods which are supplied either by resources or other energy transformation sectors, and they produce energy goods which are consumed either by other energy transformation sectors or by final demand sectors. This category is also considered to include a number of "pass-through" supplysectors whose purpose is explicit tracking of cost mark-ups and efficiency losses in the inter-sectoral transportation of energy goods. The main energy transformation sectors highlighted in this documentation are [electricity](en_electricity.html), [refining](en_refining.html), [gas processing](en_gas_processing), [hydrogen production](en_hydrogen.html), and [district services](en_district_services.html).

In energy transformation sectors, the output unit and input unit are EJ (per year), the price unit is 1975$ per GJ of output, and the subsector nest is used for competition between different fuels (or feedstocks). The competition between subsectors takes place according to a calibrated logit sharing function, detailed in [choice function](choice.html). Within the subsectors, there may be multiple competing technologies, where technologies typically represent either different efficiency levels, and/or the application of carbon dioxide capture and storage (CCS). The parameters relevant for technologies in GCAM are identified and explained in [energy technologies](en_technologies.html).

In the schematic of the energy system depicted below, the energy transformation and distribution sectors include all sectors except for the resources (colored red) and the final demands (colored light blue).

![Figure 1](gcam-figs/energy_system_structure.png)
Figure 1: Simplified schematic of the energy system in each region, showing the inter-sectoral flows of energy goods in GCAM.
{: .fig}



