---
title: "Emissions"
layout: index
prev: supply_energy.html
next: outputs_emissions.html
gcam-version: v6
---
## Overview

GCAM projects emissions of a suite of greenhouse gases (GHGs) and air pollutants:

CO<sub>2</sub>, CH<sub>4</sub>, N<sub>2</sub>O, CF<sub>4</sub>, C<sub>2</sub>F<sub>6</sub>, SF<sub>6</sub>, HFC23, HFC32, HFC43-10mee, HFC125, HFC134a, HFC143a, HFC152a, HFC227ea, HFC236fa, HFC245fa, HFC365mfc, SO<sub>2</sub>, BC, OC, CO, VOCs, NO<sub>x</sub>, NH<sub>3</sub>

Future emissions are determined by the evolution of drivers (such as energy consumption, land-use, and population), technology mix, and abatement measures. How this is represented in GCAM varies by emission type.


# Table of Contents

- [Inputs to the Module](#inputs-to-the-module)
- [Description](#description)
- [Equations](#equations)
- [Policy options](#policy-options)
- [References](#references)
- [IAMC Reference Card](#iamc-reference-card)
- [References](#references)

## Inputs to the Module

**Table 1: Inputs to the Module**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
| Emissions data by sector for NonCO2 (Described in detailed in initialization section below)| country, sector,fuel,gas, year| $$Tg$$ | [Exogenous](inputs_supply.html) |
| Activity data from GCAM by sector|By region, year, sector, fuel| $$EJ$$ | [Endogenous](inputs_supply.html) |
| Marginal abatement cost (MAC) assumptions| By region, sector, year | $$Unitless$$ | [Exogenous](inputs_supply.html) |
| Energy production (for emissions driven by production)| By region, technology, year | EJ/yr | [Energy Supply Module](supply_energy.html) |
| Energy consumption (for emissions driven by consumption)| By region, technology, year | EJ/yr | [Energy Demand Module](demand_energy.html) |
| Agricultural production| By GLU, technology, year | Mt/yr | [Land Supply Module](supply_land.html) |
| Land use and land use change | By GLU, type, year | thous km<sup>3</sup> | [Land Module](land.html) |

<br/>

## Description

### <a name="co2-emissions"/>CO<sub>2</sub> Emissions

GCAM endogenously estimates CO<sub>2</sub> fossil-fuel related emissions based on fossil fuel consumption and global emission factors by fuel (oil, unconventional oil, natural gas, and coal). These emission factors are consistent with global emissions by fuel from the CDIAC global inventory ([CDIAC 2017](#cdiac2017)). 

GCAM can be considered as a process model for CO<sub>2</sub> emissions and reductions. CO<sub>2</sub> emissions change over time as fuel consumption in GCAM endogenously changes. Application of Carbon Capture and Storage (CCS) is explicitly considered as separate technological options for a number of processes, such as electricity generation and fertilizer manufacturing. The GCAM, in effect, produces a Marginal Abatement Curve for CO<sub>2</sub> as a carbon-price is applied within the model.

CO<sub>2</sub> emissions from limestone used in cement production are also estimated. Limestone consumption has one global emissions factor, however, each region's IO coefficient (limestone / cement) is calibrated to return CDIAC estimates ([CDIAC 2017](#cdiac2017)). (CO<sub>2</sub> from fuel consumed in producing limestone is estimated in the same manner as other fuel consumption.)

CO<sub>2</sub> emissions from gas flaring are not currently included in GCAM.

### <a name="co2-luc-emissions"/>CO<sub>2</sub> Emissions From Land-Use and Land-Cover Change (LULCC)
 
Land-Use and Land-Cover Change emissions are tracked separately. See [Carbon Emissions](land.html#carbon-emissions).

### <a name="non-co2-overview"/>Non-CO<sub>2</sub> Emissions Overview

We summarize here some general points common to non-CO<sub>2</sub> emissions in GCAM


#### Initialization

##### Data sources

* Non-CO<sub>2</sub> emissions, both GHGs & air pollutants in GCAM are initialized from the [CEDS inventory](https://github.com/JGCRI/CEDS) ([Hoesly et al 2018](#Hoesly2018)). Standard CEDS output datasets are used for input, although the emissions by GCAM regions are also generated as prebuilt data. Only the pre-built data  should be distributed publicly (to parallel with the IEA energy data). The data covers emissions for all GCAM regions from 1970 to 2019.  Only anthropogenic emissions (including open burning) are processed.

* The CEDS inventory do not contain emissions for grasslands, forest fires, deforestation and agricultural waste burning on fields. The data for these categories of emissions were added from the GFED LULC data set(as used in CMIP6). 

* CEDS does not have a breakdown of emissions for road transport by mode. Therefore, GAINS emission factors by transport sectors (passenger, freight) and fuels to supplement the CEDS road emissions and derive emissions by different modes using emissions factors from the [GAINS data set](https://iiasa.ac.at/web/home/research/researchPrograms/air/ECLIPSEv5.html).

* Additional information on fluorinated gases is from the [2019 EPA Global Non-CO2 Greenhouse Gas Emission Projection & Mitigation Potential Report](https://www.epa.gov/global-mitigation-non-co2-greenhouse-gases/global-non-co2-greenhouse-gas-emission-projections).

Note that there are some [calibration year differences between CEDS and GCAM](details_emissions.html#calibration-year-differences-between-ceds-and-gcam).


#### Modeling approach

Modeling non-CO<sub>2</sub> abatement at the process level would require too much detail for the scales at which GCAM operates. We, therefore, use parameterized functions for future emissions controls (for air pollutants) and Marginal Abatement Cost (MAC) curves (for GHGs) to change emission factors over time. The emissions controls, which reduce emissions factors as a function of per-capita GDP in each region and time period, are based on the general understanding that pollutant control technologies are deployed as incomes rise (e.g., [Smith et al. 2005](#smith2005), although the functional form used in GCAM 5 is different than that in this reference). The MAC curves for GHGs are mapped directly to GCAM's technologies from the EPA's 2019 report on non-CO<sub>2</sub> greenhouse gas mitigation ([EPA 2019](#epa2019)).

Note that technology shifts still play a role, since emission factors can differ between technologies.

#####  Energy System Drivers

* Emissions in the energy system can be driven by input (e.g., fuel consumed by a particular technology) or output (e.g., fuel or service produced by a particular technology).
* Emissions information is technology-specific.  As a result, different technologies that produce the same output can have different emissions per unit of activity.
* For most gases and species, we explicitly model the drivers for the emissions. However, for some (e.g., HFCs from fire extinguishers), the future emissions scale directly with population and/or GDP.

#####  Agriculture and Land-Use Drivers

* Emissions in the agriculture and land use system can be driven by output (e.g., for crop production) or land area (e.g., for forest fires).
* Emissions are modeled at the level of agricultural technologies: region, water basin, crop type, and irrigation and management level. Note however that the underlying inventory data is far coarser, typically only available by sector and country. 

#####  Naming Conventions

There are some naming conventions for a few emission species/sectors within GCAM that are useful to note.

* Emissions from most agricultural activities are suffixed with "\_AGR", except for burning of agricultural waste on fields (AWB), which are suffixed with "\_AWB". (This allows us to separate emissions from these distinct processes from the same technology.) These are in addition to emissions named without a suffix. So to obtain total emissions, the three variants of a given species should be added (e.g., CH4 emissions is the sum of CH4, CH4"\_AGR", and CH4"\_AWB".)
* Sulfur dioxide (SO<sub>2</sub>) emissions are currently differentiated by four metaregions (SO2\_1,SO2\_2,SO2\_3,SO2\_4). These are kept separate for purposes of feeding the emissions information to the climate model; for emissions estimation, these different categories should be added to obtain global totals.

### Equations 

#### <a name="non-co2-ghg-emissions"/>Non-CO<sub>2</sub> GHG Emissions

The non-CO<sub>2</sub> greenhouse gases include methane (CH<sub>4</sub>), nitrous oxide (N<sub>2</sub>O) and fluorinated gases. These emissions, *E*, are modeled for any given technology in time period *t* as:

$$
E_{t}=A_{t}*F_{t0}*(1-MAC(Cprice_{t})))
$$

where:

| | |
| :------------- |:-------------|
| `F` | Emissions factor: base-year emissions per unit activity |
| `A` | Activity level (e.g., output of a technology) |
| `MAC` | Marginal Abatement Cost Curve |
| `Eprice` | Emissions Price |

<br/>

Non-CO<sub>2</sub> GHG emissions are proportional to the activity except for any reductions in emission intensity due to the MAC curve. As noted above, the MAC curves are assigned to a wide variety of technologies, mapped directly from [EPA 2019](#epa2019). Under a carbon policy, emissions are reduced by an amount determined by the MAC curve.

The default set-up is that MAC curves use the scenario's carbon price (if any). The non-CO<sub>2</sub> GHG MACs are an exogenous input, and are read in as the percent of emissions abated as a function of the emissions prices. Note that they are read in with explicit cost points (i.e., piece-wise linear form), with no underlying equation describing the percentage of abatement as a function of the carbon price.

Below-zero (i.e. no cost) MAC mitigation (e.g. MAC reduction percentage is > 0 at zero carbon price) are applied in the reference case and phased in over several decades. (This can be turned off by setting the no-zero-cost-reductions option to 1 within a MAC curve.)

Note that a species-specific emissions market can also be specified using advanced options, described below.

#### Fluorinated Gases

Most fluorinated gas emissions are linked either to the industrial sector as a whole (e.g., semiconductor-related F-gas emissions are driven by growth in the "industry" sector), or population and GDP (e.g., fire extinguishers). As those drivers change, emissions will change. Additionally, we include abatement options based on EPA MAC curves.

SF<sub>6</sub> emissions from electric transformers scale with electricity consumption.  HFC134a from cooling (e.g., air conditioners) scale with air conditioner electricity consumption. For these emissions we also make additional exogenous adjustments to emissions factors in future periods in developing regions to reflect their continued transition from CFCs to HFCs. 

#### Air Pollutant Emissions

Air pollutant emissions such as sulfur dioxide (SO<sub>2</sub>) and nitrogen oxides (NO<sub>x</sub>) are modeled as:

$$
E_{t}=A_{t}*EF_{t0}*(1-EmCtrl(pcGDP_{t}))
$$

where EmCtrl is a function that represents decreasing emissions intensity as per-capita income increases:

$$
EmCtrl_{t}=1-\frac{1}{1+\frac{(pcGDP_{t}-pcGDP_{t0})}{steepness}}
$$

where *pcGDP* stands for the per-capita GDP, and *steepness* is an exogenous constant, specific to each technology and pollutant species, that governs the degree to which changes in per-capita GDP will be translated to emissions controls. The purpose here is to capture the general global trend of increasing pollutant controls over time, but does not capture regional and technological heterogeneity.

Note that the GCAM implementation of the SSP scenarios used a different approach, incorporating region-, sector-, and fuel-specific pollutant emission factor pathways ([Calvin et al. 2017](#calvin2017), [Rao et al. 2017](#rao2017)). 

## Policy options 

Users are allowed to selectively specify both new vintage specific emissions factors and existing vintage retrofits for technologies when calculating emissions. Users can also specify a GDP level at which emissions controls are applied to the model. 

Users can also specify marginal abatement cost curves (MACC) for emissions in the model. These can be specified by the user directly or the user can also select to apply pre-calculated MACC curves from the EPA to the GCAM sectors. Note that the EPA sectors were harmonized with the GCAM sectors when calculating these MACC curves. MACC are applied with technological change applied over time and there are different levels of change applied for the different SSPs. 

There are three main policy approaches that can be applied in GCAM to reduce emissions of CO<sub>2</sub> or other greenhouse gases: a fixed carbon or GHG price, emissions constraints, or climate constraints. In all cases, GCAM implements the policy approach by placing a price on emissions. This price then filters down through all the systems in GCAM and alters production and demand. For example, a price on carbon would put a cost on emitting fossil fuels. This cost would then influence the cost of producing electricity from fossil-fired power plants that emit CO<sub>2</sub>, which would then influence their relative cost compared to other electricity generating technologies and increase the price of electricity. The increased price of electricity would then make its way to consumers that use electricity, potentially decreasing its competitiveness relative to other fuels. The three policy approaches are described below.

* Carbon or GHG prices: GCAM users can directly specify the price of carbon or GHGs. Given a carbon price, the resulting emissions will vary depending on other scenario drivers, such as population, GDP, resources, and technology. See [example](policies_examples.html#carbon-price).

* Emissions constraints. GCAM users can specify the total amount of emissions (CO<sub>2</sub> or GHG) as well. GCAM will then calculate the price of carbon needed to reach the constraint in each period of the constraint.

* Climate constraints: GCAM users can specify a climate variable (e.g., concentration or radiative forcing) target. Users determine whether that target can be exceeded (overshoot) prior to the target year. GCAM will adjust carbon prices in order to find the least cost path to reaching the target. Note when running in this mode GCAM will need to run the scenario several times to find the optimal path to reach the climate target, thus taking significantly longer to run.

### Linked Emission Markets

Emissions prices of different GHGs can be linked together for a multi-gas policy using the linked-ghg-policy object. For example, in the default [linked_ghg_policy.xml](https://github.com/JGCRI/gcam-core/blob/master/input/policy/linked_ghg_policy.xml) file in the GCAM release, all non-CO<sub>2</sub> GHGs are linked to the market for CO<sub>2</sub>. Also, see [example](policies_examples.html#linked-policy)

The parameter `price-adjust` is used to convert prices and `demand-adjust` is used to convert demand units (typically to convert to a common units of carbon equivalents using the individual gasses Global Warming Potential).
These can be changed by year as well in order to, for example, phase in a gas into the policy.

Setting price-adjust to zero means that there is no economic feedback for the price of this GHG. MAC curves, however, will still operate under the default set-up (whereby MAC curves are driven by CO<sub>2</sub> prices). This can be changed separately for energy/industrial/urban CH<sub>4</sub>, agricultural CH<sub>4</sub> (CH4_AGR), and CH<sub>4</sub> from agricultural waste burning (CH4_AWB), Land Use Change CO<sub>2</sub> emissions (e.g. CO2_LUC).

Note that you must first create a policy by reading in a `<ghgpolicy>` object in your configuration before attempting to read in a linked GHG policy that needs to link to it.

This flexibility allows CO<sub>2</sub>-only, CO<sub>2</sub>-equivalent, or non-CO<sub>2</sub> markets/constraints for various baskets of emissions as needed.

Note that the GCAM default set-up includes economic feedbacks for methane and nitrous oxide. This is an idealized assumption, but might not happen in real-world policies. For example, in many current systems agricultural emissions are offsets only e.g., they get paid to reduce emissions, but are not charged for any remaining emissions. (So to simulate this type of policy, `price-adjust` would be set to zero).

### Markets For non-CO<sub>2</sub> Emission Species

Markets in GCAM can be set for any emission species. (e.g., CH<sub>4</sub> -only market, NOx market, etc.)

Note that it generally does not make sense to set up an emissions market unless the model has a direct way to reduce emissions. For instance, you've added relevant MAC curves, or explicit technology options with differing emissions rates. For example, in [Shi et al. (2017)](policies.html#shi2017) US electricity sector SO<sub>2</sub> and NO<sub>x</sub> markets were used to represent current policies that cap emissions in certain states. MAC curves for existing power plants were added to allow emissions to change in response to market prices. 

XML inputs within the MAC curve that will be needed to set-up new markets are:

XML Tag | Description
------------ | -------------
market-name | Name of market from which the price used by the MAC curve will be obtained (default = "CO2")
mac-price-conversion | Value to multiply market price by to convert to unit expected by the MAC curve (for example, converting from $/tC to $/tCO2eq) (default  = 1)
Note | mac-price-conversion can also be set to -1, which is a flag to turn off all use of the MAC curve. This is useful for sensitivity studies.
zero-cost-phase-in-time | Number of years over which to phase-in "below-zero" MAC curve reductions (default = 25 years)

<br/>


## Insights and Intuition

### Effects of combined mitigation pathways for CO2 and NonCO2 gases

Stabilizing climate change well below 2&#176;C and towards 1.5&#176;C requires comprehensive mitigation of all greenhouse gases (GHG), including both CO2 and non-CO2 GHG emissions. While decarbonization-driven fuel switching mainly reduces non-CO2 emissions from fuel extraction and end use, targeted non-CO2 mitigation measures can significantly reduce fluorinated gas emissions from industrial processes and cooling sectors. [(Ou et al. 2021)](https://www.nature.com/articles/s41467-021-26509-z)

### Markets

For information on using markets for non-CO2 emissions see the [markets for non-CO<sub>2</sub>](policies.html#non-co2-markets) section of the polices page.

### Additional Non-CO<sub>2</sub> Emission Options

Emission objects can be added/changed via user input in any time period. New parameters (such as emission factors) overwrite any previous values. Note that emission control objects will be copied forward. For vintaged technologies (e.g. electric generation, road transport), any new emission object will be applied to new vintages. Old vintages will retain the previously read-in emission characteristics.

This also means that GHG objects can be removed or overwritten after a given year by reading in a new GHG object for that gas. This also applies to GHG control objects. Reading in a new control object, for example, in 2020 for an electric generation technology will negate the effect of a previously read in control object of the same name for that vintage and future vintages. This can, for example, represent a transition from some emissions control regime applied to older vintages to a regime defined by new source performance standards. 

In addition to the GDP control object, a linear-control object is also available that allows a user to specify that an emission factor will linearly change over time to a user-defined value over a specified time period. The parameters controlling the linear-control object are:

XML Tag | Description
------------ | -------------
`end-year` | Year by which emission factor should reach specified value
`start-year` | (Optional) Start year after which EF should begin to decline. (defaults to final calibration year)
`final-emissions-coefficient` | Emissions coefficient that should be set by end-year (and every year thereafter)
`allow-ef-increase` | (optional) Allow emission factors to increase from their start-year value (default to false)

<br/>

## IAMC Reference Card

Greenhouse gases
- [X] CO2 fossil fuels
- [X] CO2 cement
- [X] CO2 land use
- [X] CH4 energy
- [X] CH4 land use
- [X] CH4 other
- [X] N2O energy
- [X] N2O land use
- [X] N2O other
- [X] CFCs
- [X] HFCs
- [X] SF6
- [X] PFCs

Pollutants
- [X] CO energy
- [X] CO land use
- [X] CO other
- [X] NOx energy
- [X] NOx land use
- [X] NOx other
- [X] VOC energy
- [X] VOC land use
- [X] VOC other
- [X] SO2 energy
- [X] SO2 land use
- [X] SO2 other
- [X] BC energy
- [X] BC land use
- [X] BC other
- [X] OC energy
- [X] OC land use
- [X] OC other
- [X] NH3 energy
- [X] NH3 land use
- [X] NH3 energy
- [X] NH3 other

Carbon dioxide removal
- [X] Bioenergy with CCS
- [X] Reforestation
- [X] Afforestation
- [ ] Soil carbon enhancement
- [X] Direct air capture
- [ ] Enhanced weathering

## References

<a name="calvin2017">[Calvin et al. 2017]</a> Calvin, K., Bond-Lamberty, B., Clarke, L., et al. 2017. The SSP4: a world of deepening inequality. *Global Environmental Change* 42: 284-296. doi:10.1016/j.gloenvcha.2016.06.010. [Link](https://www.sciencedirect.com/science/article/pii/S095937801630084X)

<a name="cdiac2017">[CDIAC 2017]</a> Boden, T., and Andres, B. 2017, *National CO2 Emissions from Fossil-Fuel Burning, Cement Manufacture, and Gas Flaring: 1751-2014*, Carbon Dioxide Information Analysis Center, Oak Ridge National Laboratory. [Link](http://cdiac.ess-dive.lbl.gov/ftp/ndp030/nation.1751_2014.ems)

<a name="edgar2011">[EDGAR 2011]</a> Joint Research Centre. 2011. *EDGAR - Emissions Database for Global Atmospheric Research: Global Emissions EDGAR v4.2*. doi:10.2904/EDGARv4.2. [Link](http://edgar.jrc.ec.europa.eu/overview.php?v=42)
<a name="epa2011">[EPA 2011]</a> US EPA, 2011, *2011 National Emissions Inventory (NEI) Data*. United States Environmental Protection Agency, Office of Air Quality Planning and Standards. [Link](https://www.epa.gov/air-emissions-inventories/2011-national-emissions-inventory-nei-data)

<a name="epa2019">[EPA 2019]</a> US EPA, 2019, *Global Non-CO<sub>2</sub> Greenhouse Gas Emission Projection & Mitigation Potential Report*. United States Environmental Protection Agency, Office of Atmospheric Programs. [Link](https://www.epa.gov/global-mitigation-non-co2-greenhouse-gases/global-non-co2-greenhouse-gas-emission-projections)

<a name="lamarque2010">[Lamarque et al. 2010]</a> Lamarque, J.F., Bond, T. C., Eyring, V., et al. 2010. Historical (1850-2000) gridded anthropogenic and biomass burning emissions of reactive gases and aerosols: methodology and application, *Atmospheric Chemistry and Physics* 10(15): 7017-7039. doi:10.5194/acp-10-7017-2010. [Link](https://www.atmos-chem-phys.net/10/7017/2010/acp-10-7017-2010.html)

<a name="rao2017">[Rao et al. 2017]</a> Rao, S., Klimont, Z., Smith, S., et al. 2017. Future air pollution int he Shared Socio-economic Pathways. *Global Environmental Change* 42: 246-358. doi:10.1016/j.gloenvcha.2016.05.012. [Link](https://www.sciencedirect.com/science/article/pii/S0959378016300723)

<a name="smith2005">[Smith et al. 2005]</a> Smith, S.J., Pitcher, H., and Wigley, T. 2005. "Future Sulfur Dioxide Emissions" *Climatic Change* 3: 267-318. doi: 10.1007/s10584-005-6887-y. [Link](https://link.springer.com/article/10.1007/s10584-005-6887-y)

<a name="Hoesly2018">[Hoesly et al. 2018]</a>Hoesly, R. M., Smith, S. J., Feng, L., Klimont, Z., Janssens-Maenhout, G., Pitkanen, T., Seibert, J. J., Vu, L., Andres, R. J., Bolt, R. M., Bond, T. C., Dawidowski, L., Kholod, N., Kurokawa, J.-I., Li, M., Liu, L., Lu, Z., Moura, M. C. P., O'Rourke, P. R., and Zhang, Q.: Historical (1750-2014) anthropogenic emissions of reactive gases and aerosols from the Community Emissions Data System (CEDS), *Geosci. Model Dev*., 11, 369-408, [Link](https://doi.org/10.5194/gmd-11-369-2018), 2018
