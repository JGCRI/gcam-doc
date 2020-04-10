---
layout: index
title: Earth System Module – Hector v2.0	
prev: water.html
next: emissions.html
gcam-version: v5.2
---

This section describes the carbon-cycle climate module - Hector - that is available for use in GCAM. MAGICC5.3 (Wigley, 2008) has traditionally been the only climate module available in GCAM. Hector v2.0 is the default climate model (Hartin et al., 2015) within GCAM.  Users still have the option of running MAGICC5.3 in GCAM5.1, however, we will not be supporting this option going forward.     

Hector, an open-source, object-oriented, reduced-form global climate carbon-cycle model, is written in C++. This model runs essentially instantaneously while still representing the most critical global-scale earth system processes. Hector has a three-part main carbon cycle: a one-pool atmosphere, three-pool land, and 4-pool ocean. The model’s terrestrial carbon cycle includes primary production and respiration fluxes, accommodating arbitrary geographic divisions into, e.g., ecological biomes or political units. Hector actively solves the inorganic carbon system in the surface ocean, directly calculating air– sea fluxes of carbon and ocean pH. Hector reproduces the global historical trends of atmospheric [CO<sub>2</sub>], radiative forcing, and surface temperatures. The model simulates all four Representative Concentration Pathways (RCPs) with equivalent rates of change of key variables over time compared to current observations, MAGICC, and models from CMIP5 (Hartin et al., 2015). Hector’s flexibility, open-source nature, and modular design facilitates a broad range of research in various areas. 

There most notable change between Hector v1.1 and Hector v2.0 is the inclusion of a one-dimensional ocean heat diffusion model - DOECLIM (Kriegler, 2005; Tanaka and Kriegler, 2007). With this addition, Hector v2.0 exhibits improved vertical ocean heat uptake, as well as surface response to radiative forcing. (https://github.com/JGCRI/hector/pull/206)
https://github.com/JGCRI/hector/releases

![Hector Carbon Cycle diagram](gcam-figs/hector_box_model.png)<br/>
Figure 1: Representation of Hector’s carbon cycle, land, atmosphere, and ocean. The atmosphere consists of one well-mixed box. The ocean consists of four boxes, with advection and water mass exchange simulating thermohaline circulation. At steady state, the high-latitude surface ocean takes up carbon from the atmosphere, while the low-latitude surface ocean off-gases carbon to the atmosphere. The land consists of a user-defined number of biomes or regions for vegetation, detritus and soil. At steady state the vegetation takes up carbon from the atmosphere while the detritus and soil release carbon back into the atmosphere. The earth pool is continually debited with each time step to act as a mass balance check on the carbon system. 
{: .fig}

## GCAM-Hector interactions
Currently the GCAM sectors interact with Hector via their emissions.  At every time step, emissions from GCAM are passed to Hector. Hector converts these emissions to concentrations when necessary, and calculates the associated radiative forcing, as well as the response of the climate system (e.g., temperature, carbon-fluxes, etc.)  

Table 1: Emissions and sources from each sector passed to Hector.  
{: .fig}

| Emission| Sector  | Notes |
| ------- |:-------| :------ |
| CO<sub>2</sub><sup>*</sup>     | [AgLU](aglu.html), [Energy](energy.html)  | |
| CH<sub>4</sub>     | AgLU, Energy, Industrial Processes    | |
| N<sub>2</sub>O 	  | AgLU, Energy    | |
| NH<sub>3</sub>     | AgLU, Energy  |  |
| SO<sub>2</sub>    | AgLU, Energy, Industrial Processes    | |
| CO 	  | AgLU, Energy, Industrial Processes    |         |
| BC      | AgLU, Energy    | |
| OC      | AgLU, Energy    ||
| NO<sub>x</sub> | AgLU, Energy, Industrial Processes    | |
| NMVOC | Energy, Industrial Processes | |
| C<sub>2</sub>F<sub>6</sub>| Energy, Industrial Processes | |
| CF<sub>4</sub>|Industrial Processes, Urban Processes | |
| SF<sub>6</sub>|Energy, Industrial Processes | |
| HFC134a| Energy| |
| HFC32| Energy| |
| HFC125| Urban Processes | |
| HFC227ea| Urban Processes | |
| HFC23| Urban Processes | |
| HFC236fa| Urban Processes | not included in Hector |
| HFC134a| Industrial Processes | |
| HFC245fa| Industrial Processes | |
| HFC365mfc| Industrial Processes | not included in Hector |

<sup>*</sup> CO<sub>2</sub> emissions from the AgLU sector are separate from CO<sub>2</sub> emissions from the Energy sector. Any change in atmospheric carbon, occurs as a function of anthropogenic fossil fuel and industrial emissions (F<sub>A</sub>), land-use change emissions (F<sub>LC</sub>), and the atmospheri-ocean (F<sub>O</sub>) and atmosphere-land (F<sub>L</sub>) carbon fluxes. 

dC<sub>atm</sub>/dt = F<sub>A</sub>(t) + F<sub>LC</sub>(t) - F<sub>O</sub>(t) - F<sub>L</sub>(t)

Land carbon pools change as a result of NPP, RH and land-use change fluxes, whose effects are partiioned among the carbon pools (Hartin et al., 2015).

## Hector Outputs
At every time step Hector calculates and outputs key climate variables.  
<dl>
<dt>Atmosphere</dt>
<dd><ul>
	<li>Global mean temperature change</li> 
	<li>Radiative forcing of all emissions</li>
	<li>Atmospheric CO<sub>2</sub> concentrations.</li>
	</ul>
</dd>
<dt>Land</dt>
<dd><ul>
	<li>Air-land carbon fluxes</li>
	<li>NPP - net primary production</li>
	<li>RH - heterotrophic respiration</li>
	<li>Carbon pools (vegetation, detritus, soil)</li>
	</ul>
</dd>
<dt>Ocean</dt>
<dd><ul>
	<li>Air-sea carbon fluxes</li>
	<li>Carbon pools (high and low latitude surface, intermediate and deep)</li>
	<li>Carbonate system (DIC, pCO<sub>2 </sub>, CO<sub>3</sub><sup>2-</sup>, pH, aragonite and calcite 
	saturations)</li>
	<li>surface ocean temperature</li>
	<li>oceanic heat flux</li>
	</ul>
</dd>
</dl>

## Getting and Installing Hector for Use with GCAM
For users who are running GCAM with the Mac or Windows Release Package, Hector support is already compiled in.  For users compiling from source or interested in getting the Hector source, please see the [Hector section in How to Set Up and Build GCAM](gcam-build.html#3-compiling-hector).

## References
1. Hartin, C. A., Patel, P., Schwarber, A., Link, R. P., and
   Bond-Lamberty, B. P.: A simple object-oriented and open-source
   model for scientific and policy analyses of the global climate
   system – Hector v1.0, Geosci. Model Dev., 8, 939-955,
   doi:10.5194/gmd-8-939-2015, 2015. [link](http://www.geosci-model-dev.net/8/939/2015/)  
2. Hartin, C. A., Bond-Lamberty, B., Patel, P., and Mundra, A.: Ocean
   acidification over the next three centuries using a simple global
   climate carbon-cycle model: projections and sensitivities,
   Biogeosciences, 13, 4329-4342,
   doi:10.5194/bg-13-4329-2016, 2016. [link](http://www.biogeosciences.net/13/4329/2016/bg-13-4329-2016.html)  
3. Wigley, T. M. (2008), MAGICC/SENGEN 5.3: User manual (version 2),
   edited, p. 80, NCAR, Boulder CO.  
4. [Hector wiki](https://github.com/JGCRI/hector/wiki)

