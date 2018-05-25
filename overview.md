---
layout: index
title: GCAM Model Overview
prev: 
next: macro-econ.html
gcam-version: v5.0 
---

## Introduction

GCAM is a global integrated assessment model that represents the behavior of, and complex interactions between five systems: the energy system, water, agriculture and land use, the economy, and the climate. GCAM has been under development for over 30 years. Work began in 1980 with the work first documented in 1982 in working papers (Edmonds and Reilly, 1982a,b,c) and the first peer-reviewed publications in 1983 (Edmonds and Reilly, 1983a,b,c). A this point, the model was known as the Edmonds-Reilly (and subsequently the Edmonds-Reilly-Barnes) model. The model was renamed MiniCAM in the mid-1990s, and the model was renamed to GCAM in the mid-2000s. The first coupling to a carbon cycle model was published in Edmonds, et al. (1984). The first use of GCAM (MiniCAM at the time) in conjunction with a Monte Carlo uncertainty analysis was published in Reilly, Edmonds, Gardner and Brenkert (1987).

Throughout its lifetime, GCAM has evolved in response to the need to address an expanding set of science and assessment questions. The original question that the model was developed to address was the magnitude of mid-21st-century global emissions of fossil fuel CO2. Over time GCAM has expanded its scope to include a wider set of energy producing, transforming, and using technologies, emissions of non-CO2 greenhouse gases, agriculture and land use, water supplies and demands, and physical Earth systems. It is increasingly being used in multi-model, multi-scale analysis, in which it is either soft- or hard-coupled to other models with different foci and often greater resolution in key sectors. For example, it has been coupled to a state of the art Earth system model (Collins, et al., 2015). GCAM has been used to produce scenarios for national and international assessments ranging from the very first IPCC scenarios (Response Strategies Working Group, 1990) through the present Shared Socioeconomic Pathways (Ebi, et al., 2014). Hundreds of papers have been published in peer-reviewed journals using GCAM over its lifetime and the GCAM system continues to be an important international tool for scientific inquiry. GCAM is also a community model being used by researchers across the globe, creating a shared global research enterprise. GCAM can be run on Windows, Linux, Apple, and high-performance computing systems.

## Background: Integrated Assessment Models

GCAM is an integrated assessment model. The role of integrated assessment research and integrated assessment modeling is to bring multiple human and physical Earth systems together in one place to shed light on system interactions and provide scientific insights that would not otherwise be available from the pursuit of traditional disciplinary scientific research alone. IA models are constructed to explore these interactions in a single computational platform with a sufficiently low computational requirement to allow for broad explorations of scenarios and uncertainties. IA models include both human and physical Earth systems, Figure 1. Components of an IA model are designed to capture the behavior of human and physical systems, but they do not necessarily include the most detailed process-scale representations of its constituent components. On the other hand, IA model components in principle provide a faithful representation of the best current scientific understanding of underlying behavior.

<img src="gcam-figs/overview_fig1.png" width="600"><br/>
Figure 1: Illustrative Schematic of IA modeling and research, linking human and Earth systems. Note that not all IA models represent all of the systems shown in this illustrative figure.
{: .fig}

In general IAMs can be divided into two categories, those that are highly aggregated and whose core problem is the conduct of global, century-scale, cost-benefit analysis (examples include DICE, FUND, and PAGE), and higher resolution models whose core problem is understanding the physical and economic details of human and physical Earth system interactions. GCAM is a member of the latter class of more highly-resolved IA models.

IA models like GCAM, as with any model, are not predictors of the future. They are used to provide conditional forecasts of the future. GCAM takes in external "scenario assumptions" about key drivers such as population, economic activity, technology, and policies, analyzes the implications of these through representations of human and physical systems operate and interact, and then developed a more complete, modeled scenario description that includes the implications of the scenarios assumptions, for example, on commodity prices, energy use, land use, water use, emissions, and concentrations. 

<img src="gcam-figs/overview_fig2.png" width="600"><br/>
Figure 2: Conceptual diagram of the way that IA models use scenario assumptions to produce fuller, modeled scenarios that include a wide range of additional information
{: .fig}

Conditional forecasts with a single set of scenario assumptions is the most common way that a model such as GCAM is used to explore scientific and assessment questions. However, another class of question that GCAM has taken up is the systematic representation of uncertainty. As early as the 1980s, GCAM was used to map the implications of uncertain key input assumptions and parameters into implied distributions of outputs such as greenhouse gas emissions, energy use, energy prices, and trade patterns. A range of techniques has been employed using GCAM to explore the potential range of future outcomes. Techniques include, scenarios analysis, sensitivity analysis, and Monte Carlo simulations. Exploring and understanding the role of uncertainty in shaping events remains an important research use of GCAM.

## Overview of GCAM Computational Components 

The GCAM framework includes three independent pieces: (1) the GCAM data system, (2) the GCAM core in which the economic decisions and dynamic interactions between human and Earth systems are represented, and (3) a set of disaggregation models that allow for more spatially and temporally disaggregated representations of GCAM output than are possible in the GCAM core. Many GCAM users will only focus on use of the GCAM core, using a XML input data set and producing output into an output database written in BaseX Others will also work with the data system to develop new versions of the model with different assumptions or different model resolution. Disaggregation models are produced and available separately and not included in the release version of GCAM.

<img src="gcam-figs/overview_fig3.png" width="600"><br/>
Figure 3: Overview of the three components of the GCAM modeling framework
{: .fig}

The GCAM Data System combines and reconciles a wide range of different data sets, and systematically incorporates a range of future assumptions. The output of the data system is an XML dataset with historical and base-year data for calibrating the model along with assumptions about future trajectories such as GDP, population, and technology. It includes the necessary information for representing energy, water, land, and the economic system. The GCAM Data System is largely constructed in R, but accommodates inputs in a range of different formats. Creating new scenarios does not require the use of the GCAM data system. New, "add on" xml files can be created to overwrite key future scenario assumptions such as population, economic activity, and technology cost and performance, among others.

The GCAM core (discussed below) is the component of the model in which economic decisions are made, for example land use and technology choices, and in which dynamics and interactions are modeled within and among different human and Earth systems. The GCAM core is written in C++ and takes in inputs in XML. Outputs are produced into a BaseX database file.

Many applications of GCAM require information at finer spatial and temporal scales than is provided by the GCAM core. A number of additional disaggregation models have been developed to create this information. These models are not included in the release version of GCAM, but can be obtained separately. 

## Overview of Integrated Dynamics in the GCAM Core

Supplied with input information from the GCAM Data System, the GCAM Core is the heart of the dynamic character of GCAM. GCAM takes in a set of scenario assumptions and then processes those assumptions to create a full scenario of prices, energy and other transformations, and commodity and other flows across regions and into the future. GCAM represents five different interacting and interconnected systems. The interactions between these different systems all take place within the GCAM core; that is, they are not modeled as independent modules, but as one integrated whole, Figure 3. The five systems in then GCAM Core are as follows:

* [**Macro-economy**](macro-econ.html): This module takes population and labor productivity assumptions as inputs and produces regional Gross Domestic Product and regional populations as inputs for the other modules. The macroeconomy sets the scale of economic activity in GCAM. A research branch of GCAM contains a version with feedbacks from the energy sector back to GDP. This version is not presently available in the core GCAM release.

* [**Energy systems**](energy.html): The energy system is a detailed representation of the sources of primary energy supply, modes of energy transformation, and energy service demands such as passenger and freight transport, industrial energy use, and residential and commercial energy service demands. The module reports demands for and supplies of energy forms as well as emissions of greenhouse gases, aerosols and other short-lived species. Energy systems demand bioenergy from agriculture and land systems and water from water systems.

* [**Agriculture and Land Systems**](aglu.html): The agriculture and land systems provide in information about land use, land cover, carbon stocks and net emissions, the production of bioenergy, food, fiber, and forest products. Demands are driven by the size of the population, their income levels, and commodity prices. The module reports demands for and supplies of agricultural and other commodities, land and emissions of greenhouse gases, aerosols and other short-lived species. The demand for bioenergy is a derived demand by the energy sector. Agriculture and land systems demand water from water systems.

* [**Water Systems**](water.html): The water module provides information about water withdrawals and water consumption for energy, agriculture, and municipal uses.

* [**Physical Earth System**](hector.html): The physical Earth system in GCAM is modeled using Hector, a physical Earth system emulator that provides information about the composition of the atmosphere based on emissions provided by the other modules, ocean acidity, and climate.

The structure of the model explored in the GCAM core - for example, the number of regions and technologies - is data driven. In all cases, the GCAM core represents the entire world, but it is constructed with different levels of resolution for each of these different systems. In the current release version of GCAM, the energy-economy system operates at 32 regions globally and land is divided into 283 agroecological zones. New model developments on water supplies and demands are being constructed based on 233 water basins worldwide. The climate module operates at a global scale.

<style type="text/css">
.header{font-weight:bold;background-color:#333333;color:#ffffff;vertical-align:top}
.first_col{font-weight:bold;vertical-align:top}
.second_col{vertical-align:top}
</style>
<table>
  <caption>Spatial scale of systems in the release version of GCAM</caption>
  <tr>
    <th class="header">GCAM Component</th>
    <th class="header">Geospatial Resolution</th>
  </tr>
  <tr>
    <td class="first_col">Macro-Economy</td>
    <td class="second_col">32 Geopolitical Regions</td>
  </tr>
    <tr>
    <td class="first_col">Energy System</td>
    <td class="second_col">32 Geopolitical Regions</td>
  </tr>
    <tr>
    <td class="first_col">Energy System</td>
    <td class="second_col">32 Geopolitical Regions</td>
  </tr>
    <tr>
    <td class="first_col">Land System</td>
    <td class="second_col">283 Agro-Ecological Zones</td>
  </tr>
    <tr>
    <td class="first_col">Water Supplies</td>
    <td class="second_col">233 Hydrologic Basins</td>
  </tr>
    <tr>
    <td class="first_col">Physical Earth System</td>
    <td class="second_col">Global</td>
  </tr>
</table>
<br/>

The core operating principle for GCAM is that of market equilibrium. Representative agents in GCAM use information on prices, as well as other information that might be relevant, and make decisions about the allocation of resources. These representative agents exist throughout the model, representing, for example, regional electricity sectors, regional refining sectors, regional energy demand sectors, and land users who have to allocate land among competing crops within any given land region. Markets are the means by which these representative agents interact with one another. Agents pass goods and services along with prices into the markets. Markets exist for physical flows such as electricity or agricultural commodities, but they also can exist for other types of goods and services, for example tradable carbon permits. GCAM solves for a set of market prices so that supplies equal demands are balanced in all these markets across the model. The [GCAM solution process](solver.html) is the process of iterating on market prices until this equilibrium is reached.

As an example, in any single model period, GCAM derives a demand for natural gas starting with all of the uses to which natural gas might be put, such as passenger and freight transport, power generation, hydrogen production, heating, cooling and cooking, fertilizer production, and other industrial energy uses. Those demands depend on the external assumptions about, for example, electricity generating technology efficiencies, but also on the price of all of the commodities in the model. GCAM computes the supplies of all of the goods and services in the model. For example, it calculates the amount of natural gas that suppliers would like to supply given their available technology for extracting resources, and the market price. The model gathers all of the supplies and demands for commodities and adjusts prices so that in every market during that period supplies of everything from rice to solar power match demands.

<img src="gcam-figs/overview_fig4.png" width="600"><br/>
Figure 4: Conceptual Schematic of the Operation of the GCAM Core
{: .fig}

GCAM is a dynamic recursive model, which means that it moves forward with decision-makers in the model making decisions based only on current conditions rather than based on optimization over the full future, as is the case in intertemporal optimization models. After it solves each period, the model then uses the resulting state of the world, including the consequences of decisions made in that period - such as resource depletion, capital stock retirements and installations, and changes to the landscape - and then moves to the next time step and performs the same exercise.

The release version of GCAM is typically operated in five-year time steps with 2010 as the base year. However, the model has flexibility to be operated at different temporal resolutions through user-defined parameters, which means that it can be run, for example, at 10-year or one-year time steps. At the same time, GCAM was originally constructed to represent longer-term dynamics and not annual fluctuations. Current research is focused on better representing shorter time-scale and finer spatial scale phenomena, for example, water storage, food storage, and "stickiness" in key variables such as food demands.

While the agents in the GCAM model are assumed to act to maximize their own self-interest, the model as a whole is not performing an optimization calculation. In fact, actors in GCAM can make decisions that "seemed like a good idea at the time", but which are not optimal from a larger social perspective and which the decision maker would not have made had the decision maker known what lay ahead in the future. For example, the model's actors do not know about future climate regulations, and could install fossil fuel power in the years preceding the implementation of such policies. 

Key Scenario Assumptions for the GCAM Core

* Socioeconomics: Population, labor participation, and labor productivity

* Energy Technology Characteristics: e.g., costs, performance, water requirements

* Agricultural Technology Characteristics: e.g., crop yields, costs, carbon contents, water requirements

* Energy and Other Resources: e.g., fossil fuels, wind, solar, uranium, groundwater 

* Policies: e.g., emissions constraints, renewable portfolio standards

Key Scenario Results from the GCAM Core

* Energy System: energy demands, flows, technology deployments, and prices throughout the energy system.

* Agriculture and Land Use: prices and supplies of all agricultural and forest products, land use and land use change.

* Water: water demands and supplies for all agricultural, energy, and household uses

* Emissions: 16 greenhouse gases and short-lived species:  CO2, CH4, N2O, halocarbons, carbonaceous aerosols, reactive gases, sulfur dioxide.

## Changes from the Previous Version

[**Recent Updates**](updates.html): A summary of key update to GCAM between version 5.0 and the previous version (version 4.4).

## Regional Versions of GCAM 

In addition to disaggregation algorithms, another option for increased spatial resolution in GCAM is to increase the resolution at which the model operates within the GCAM Core. GCAM has been designed to allow for a "telescoping capability" to allow greater resolution in sectors or regions. Because GCAM is largely input-driven, creating higher resolution does not require changes to the structure of the code in the GCAM Core; it requires only changes to the GCAM Data System to create data at a higher resolution in the sectors or regions of interest. Two specific versions of GCAM have been created for this purpose. [GCAM-USA](gcam-usa.html) includes greater regional detail for the economic and energy systems in the United States, while retaining the same resolution for water and agriculture and retaining the same spatial resolution for energy and the economy in the remaining 31 regions in GCAM. A research version for China, GCAM-China uses the same approach, separating the energy and economic systems in China into provinces. 

## Community Modeling with GCAM

GCAM is a community model. This means that GCAM is fully available for [download](http://www.globalchange.umd.edu/archived-models/gcam/download/). A Community Listserv is available to users. The listserv is the primary means used for distributing information about GCAM. While the GCAM development group cannot provide technical support, the GCAM development group makes every effort to answer queries posted to the listserv. Users are encouraged to report publications using GCAM to the coordinating researchers at the Joint Global Change Research Institute. Release versions of GCAM are the versions that are released to the GCAM community. These are provided at regular intervals, depending on the nature of underlying model developments. They are numbered so as to uniquely identify each release. 

In addition to release versions, researchers in the GCAM community may work with "research" versions of the model that are customized to particular needs or that are being developed to add new capabilities to the model. Researchers who download GCAM are welcome to make any changes they like to either the data input files or the underlying source code for their own research versions of the model. However, any revised version, with altered input data or model code, must be identified not as GCAM but as GCAM-xxxx. For example, the GCAM version that has been customized with input data specific for India by research at the India Institute of Management Ahmadabad is referred to as GCAM-IIM.

As a community model, development of GCAM is open to the GCAM Community. Researchers who make model changes (code or data) that they feel may be useful to the broader GCAM community are encouraged to share those improvements with the community and to submit them for potential inclusion in a subsequent releases of the core GCAM.

## References

Edmonds, J. and J. Reilly. 1982a. "Global energy and CO2 to the year 2050," IEA/ORAU Working Paper Contribution No. 82-6. 

Edmonds, J. and J. Reilly. 1982b. "Global energy production and use to the year 2050," IEA/ORAU Working Paper Contribution No. 82-7.

Edmonds, J. and J. Reilly. 1982c. An introduction to the use of the IEA/ORAU, Long-term, global energy model," IEA/ORAU Working Paper Contribution No. 82-9. 

Edmonds, J. and J. Reilly. 1983a. "Global Energy and CO2 to the Year 2050," The Energy Journal, 4(3):21-47.

Edmonds, J. and J. Reilly. 1983b. "A Long-Term, Global, Energy-Economic Model of Carbon Dioxide Release From Fossil Fuel Use," Energy Economics, 5(2):74-88.

Edmonds, J. and J. Reilly. 1983c. "Global Energy Production and Use to the Year 2050," Energy, 8(6):419-32.

Edmonds, J., J. Reilly, J.R. Trabalka and D.E. Reichle. 1984. An Analysis of Possible Future Atmospheric Retention of Fossil Fuel CO2. TR013, DOE/OR/21400-1. National Technical Information Service, U.S. Department of Commerce, Springfield Virginia 22161. 

Reilly, J.M., Edmonds, J.A., Gardner, R.H., and Brenkert, A.L. 1987. "Uncertainty Analysis of the IEA/ORAU CO2 Emissions Model," The Energy Journal, 8(3):1-29. Response Strategies Working Group, Intergovernmental Panel on Climate Change. 1990. Emissions Scenarios.

Collins, William D., Anthony P. Craig, John E. Truesdale, A. V. Di Vittorio, Andrew D. Jones, Benjamin Bond-Lamberty, Katherine V. Calvin, James A. Edmonds, Allison M. Thomson, Benjamine Bond-Lamberty, Pralit Patel, Sonny H. Kim, Peter E. Thornton, Jiafu Mao, Xiaoying Shi, Louise P. Chini, and George C. Hurtt. "The integrated Earth system model version 1: formulation and functionality." Geoscientific Model Development 8, no. 7 (2015): 2203-2219.

Ebi, Kristie L., Stephane Hallegatte, Tom Kram, Nigel W. Arnell, Timothy R. Carter, Jae Edmonds, Elmar Kriegler et al. "A new scenario framework for climate change research: background, process, and future directions." Climatic Change 122, no. 3 (2014): 363-372.
