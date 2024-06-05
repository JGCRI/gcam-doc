---
layout: index
title: Earth System Module – Hector v3.1.1	
prev: water.html
next: emissions.html
gcam-version: v7
---

This section describes the carbon-cycle climate module - Hector - that is available for use in GCAM. Hector v3.1.1 is the default climate model (Hartin et al., 2015) within GCAM.

Hector, an open-source, object-oriented, reduced-form global climate carbon-cycle model, is written in C++. This model runs essentially instantaneously while still representing the most critical global-scale earth system processes. Hector has a three-part main carbon cycle: a one-pool atmosphere, three-pool land, and 4-pool ocean. The model’s terrestrial carbon cycle includes primary production and respiration fluxes, accommodating arbitrary geographic divisions into, e.g., ecological biomes or political units. Hector actively solves the inorganic carbon system in the surface ocean, directly calculating air– sea fluxes of carbon and ocean pH. Hector reproduces the global historical trends of atmospheric [CO<sub>2</sub>], radiative forcing, and surface temperatures. Hector’s flexibility, open-source nature, and modular design facilitate a broad range of research. 

![Hector Carbon Cycle diagram](gcam-figs/hector_box_model.png)<br/>
Figure 1: Conceptual diagram of the CO2 fluxes (numbered thick gray arrows) between Hector’s four major carbon cycle boxes: a well-mixed atmosphere (Atmosphere), terrestrial carbon cycle (Land), ocean carbon cycle (Ocean), and fossil fuels (Earth). The thinner arrows within the land and ocean boxes denote Hector's more complex submodule carbon cycle dynamics, which are not discussed in detail here. The solid lines indicate that CO2 fluxes are calculated within Hector, whereas the dashed lines indicate that the fluxes are externally defined inputs read into the model. The fluxes are labeled: (1) CO2 emissions from fossil fuels and industry and uptake carbon capture technologies; (2) CO2 emissions and uptake from land use change (e.g., afforestation, deforestation, etc.); (3) vegetation uptake from the atmosphere (4) the aggregate CO2 from respiration from the terrestrial biosphere; and ocean carbon (5) uptake and (6) outgassing. The model’s permafrost implementation (Woodard et al. 2021) emits both CO2 and CH4 into the atmosphere, and is shown in gray.
{: .fig}


## GCAM-Hector interactions
Currently the GCAM sectors interact with Hector via emissions.  At every time step, emissions from GCAM are passed to Hector. Hector converts these emissions to concentrations when necessary, and calculates the associated radiative forcing, as well as the response of the climate system and earth system (e.g., temperature, carbon-fluxes, etc.). Hector's climate information can be used as a climate constraint for in a [GCAM policy run](policies.html).

Table 1: Emissions and sources from each sector passed to Hector.  


| Emission| Sector  | Notes |
| ---|:----| :------ |
| CO<sub>2</sub><sup>*</sup>| [AgLU](aglu.html), [Energy](energy.html)  | |
| CH<sub>4</sub> | AgLU, Energy, Industrial Processes    | |
| N<sub>2</sub>O | AgLU, Energy    | |
| NH<sub>3</sub> | AgLU, Energy  |  |
| SO<sub>2</sub> | AgLU, Energy, Industrial Processes    | |
| CO | AgLU, Energy, Industrial Processes    |         |
| BC | AgLU, Energy    | |
| OC | AgLU, Energy    ||
| NO<sub>x</sub>  | AgLU, Energy, Industrial Processes    | |
| NMVOC | Energy, Industrial Processes | |
| C<sub>2</sub>F<sub>6</sub>| Energy, Industrial Processes | |
| CF<sub>4</sub> |Industrial Processes, Urban Processes | |
| SF<sub>6</sub> |Energy, Industrial Processes | |
| HFC134a| Energy| |
| HFC32| Energy| |
| HFC125| Urban Processes | |
| HFC227ea| Urban Processes | |
| HFC23| Urban Processes | |
| HFC236fa| Urban Processes | converted to HFC143a equivalents to be included in  Hector |
| HFC134a | Industrial Processes | |
| HFC245fa| Industrial Processes | |
| HFC365mfc| Industrial Processes | |

<sup>*</sup> CO<sub>2</sub> emissions from the AgLU sector are separate from CO<sub>2</sub> emissions from the Energy sector. Any change in atmospheric carbon, occurs as a function of anthropogenic fossil fuel and industrial emissions (F<sub>A</sub>), land-use change emissions (F<sub>LC</sub>), and the atmospheric-ocean (F<sub>O</sub>) and atmosphere-land (F<sub>L</sub>) carbon fluxes. 

dC<sub>atm</sub>/dt = F<sub>A</sub>(t) + F<sub>LC</sub>(t) - F<sub>O</sub>(t) - F<sub>L</sub>(t)

Land carbon pools change as a result of NPP, RH and land-use change fluxes, whose effects are partitioned among the carbon pools (Hartin et al., 2015).

## Hector Outputs
At every time step Hector calculates and outputs key climate variables.  

**Atmosphere**

* Global mean air temperature (two time series are available, one with values original Hector output and one relative to 1850-1900)
* Global mean surface temperature (two time series are available, one with values original Hector output and one relative to 1850-1900)
* Atmospheric concentrations for CO<sub>2</sub> & other species 
* Total radiative forcing & radiative forcing of individual emissions

**Land**

* NBP - net biome production
* NPP - net primary production
* RH - heterotrophic respiration
* Carbon pools (vegetation, detritus, soil)

**Ocean** 

* Ocean carbon uptake
* Carbon pools (high and low latitude surface, intermediate and deep)
* Carbonate system (DIC, pCO<sub>2 </sub>, CO<sub>3</sub><sup>2-</sup>, pH, aragonite and calcite 
	saturations)
* Sea surface temperature
* Ocean to atmosphere heat flux
	

## Getting and Installing Hector for Use with GCAM
For users who are running GCAM with the Mac or Windows Release Package, Hector support is already compiled in.  For users compiling from source or interested in getting the Hector source, please see the [Hector section in How to Set Up and Build GCAM](gcam-build.html#3-compiling-hector).

## Policy options

Hector is a flexible, simple climate model. Users can run Hector under various configurations, parameters, and constraints. 

**Hector Configurations** 

By default, Hector's carbon cycle model treats the entire land surface as a single, homogeneous ecosystem. However, it is possible to introduce some land surface heterogeneity by splitting the land surface into several different biomes with distinct parameters. This is explained in detail [here](https://jgcri.github.io/hector/articles/multiple-biomes.html).


**Hector Parameters** 

Hector has many parameters can be user adjusted; see the [online Hector manual](https://jgcri.github.io/hector/) for more information. 

**Constraints** 

The Hector model can be run subject to *constraints* that force the model to have a certain behavior. Technically, this means that the model's components output user-provided data as opposed to their own calculations, similar to the [data mode](http://www.cesm.ucar.edu/models/cesm1.0/cesm/cesm_doc_1_0_4/x42.html) of a CESM sub-model. Currently, the available constraints include CO~2~ concentrations, total radiative forcing, and temperature. 

## IAMC Reference Card

Climate indicators

  * [X] Concentration: CO~2~
  * [X] Concentration: CH~4~
  * [X] Concentration: N~2~O
  * [ ] Concentration: Kyoto gases
  * [X] Radiative forcing: CO~2~
  * [X] Radiative forcing: CH~4~
  * [X] Radiative forcing: N~2~O
  * [X] Radiative forcing: F-gases
  * [X] Radiative forcing: Kyoto gases
  * [X] Radiative forcing: aerosols
  * [X] Radiative forcing: land albedo
  * [X] Radiative forcing: AN3A
  * [X] Radiative forcing: total
  * [X] Temperature change
  * [ ] Sea level rise
  * [X] Ocean acidification

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
4. [Online Hector manual](https://jgcri.github.io/hector/)
5. Woodard, Dawn L., Alexey N. Shiklomanov, Ben Kravitz, Corinne Hartin, and Ben Bond-Lamberty. 2021. “A Permafrost Implementation in the Simple Carbon–climate Model Hector v.2.3pf.” Geoscientific Model Development 14 (7): 4751–67.

