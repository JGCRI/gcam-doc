---
layout: index
title: GCAM Emissions
prev: ssp.html
next: aglu.html
gcam-version: v5.1
---

## Overview

GCAM projects emissions of a suite of greenhouse gases (GHGs) and air pollutants:

CO<sub>2</sub>, CH<sub>4</sub>, N<sub>2</sub>O, CF<sub>4</sub>, C<sub>2</sub>F<sub>6</sub>, SF<sub>6</sub>, HFC23, HFC32, HFC43-10mee, HFC125, HFC134a, HFC143a, HFC152a, HFC227ea, HFC236fa, HFC245fa, HFC365mfc, SO<sub>2</sub>, BC, OC, CO, VOCs, NO<sub>x</sub>, NH<sub>3</sub>

Future emissions are determined by the evolution of drivers (such as energy consumption, land-use, and population) and technology mix. How this is represented in GCAM varies by emission type. 

Table Of Contents

* [CO<sub>2</sub> Emissions](#co2-emissions)
* [non-CO<sub>2</sub> GHG Emissions](#non-co2-ghg-emissions)
* [Non-CO<sub>2</sub> Emissions Overview](#non-co2-overview)
* [non-CO<sub>2</sub> GHG Emissions](#non-co2-ghg-emissions)
* [Advanced Non-CO<sub>2</sub> User Options](#user-options)

## <a name="co2-emissions">CO<sub>2</sub> Emissions</a>

GCAM endogenously estimates CO<sub>2</sub> fossil-fuel combustion emissions based on fossil fuel combustion and global emission factors by fuel (oil, unconventional oil, natural gas, and coal). These emission factors are consistent with values from the CDIAC global inventory. 

GCAM can be considered as a process model for CO<sub>2</sub> emissions and reductions. CO<sub>2</sub> emissions change over time as fuel consumption in GCAM endogenously changes. Application of Carbon Capture and Storage (CCS) is explicitly considered as separate technological options. The GCAM, in effect, produces a Marginal Abatement Curve for CO2 as a carbon-price is applied within the model.

CO<sub>2</sub> from limestone used in cement production are also estimated. Limestone consumption has one global emissions factor, however, each region’s IO coefficient (limestone / cement) is calibrated to return CDIAC estimates. (CO<sub>2</sub> from fuel consumed in producing limestone is estimated in the same manner as other fuel consumption.)

CO<sub>2</sub> emissions from gas flaring are not currently included in GCAM.

### CO<sub>2</sub> Emissions From Land-Use/Land-Use Change (LULUC)

Land-Use Change emissions are tracked separately. In general, emissions are estimated as:

Δ C Stock = [Land Area (t)] • [C density (t)] - [Land Area (t-1)] • [C density (t-1)]

When land is converted to forests, the above-ground (e.g. vegetation) carbon-content of that new forest land exponentially approaches an exogenously-specified, region-dependent value in order to represent the finite time required for forests to grow, as shown in the figure below.

![Figure 1](gcam-figs/forest_carbon_evolution.png)
Timescales for forest regrowth in GCAM.
{: .fig}

Changes in the carbon content of soils due to land-use change also exponentially approach an equilibrium value using a region-dependent timescale. This represents the timescales for carbon pool changes in soils.

##<a name="non-co2-overview"> Non-CO<sub>2</sub> Emissions Overview</a>

We summarize here some general points common to non-CO<sub>2</sub> emissions in GCAM

Non-CO2 emissions, both GHGs & air pollutants, originate from many sources and can be controlled using multiple abatement technologies
This is too much detail to include globally explicitly at the process level. We, therefore, use parameterized functions for future emissions controls (for air pollutants) and Marginal Abatement Cost (MAC) curves (for GHGs) to change emission factors over time.

Note that technology shifts still play a role, since emission factors can differ between technologies.

Most base-year non-CO<sub>2</sub> emissions are calibrated to the EDGAR inventory, with USA fuel-level detail used to split derive fuel-specific emission splits. BC & OC emissions are calibrated using the RCP (CMIP5) inventories. Additional information on fluorinated gases is from Guus Velders.

####  Energy System Drivers
* Emissions in the energy system can be driven by input (e.g., fuel consumed by a particular technology) or output (e.g., fuel or service produced by a particular technology).
* Emissions information is technology-specific.  As a result, different technologies that produce the same output can have different emissions per unit of activity.
* Most gases and species, we model some explicit driver for the emissions. However, for some F-gases (e.g., fire extinguishers), the driver depends only on GDP.

####  Agriculture and Land-Use Drivers
* Emissions in the agricultural system can be driven by output (e.g., for crop production) or land area (e.g., for open burning).
* Emissions information is crop and region specific in GCAM. However, inventory data is region specific, but not crop specific (or AEZ specific).

####  Naming Conventions
There are some naming conventions for a few emission species/sectors within GCAM that are useful to note.

* Emissions from most agricultural activities are suffixed with "\_AGR", except for burning of agricultural waste on fields (AWB), which are suffixed with "\_AWB". (This allows us to separate emissions from these distinct processes from the same technology.) These are in addition to emissions named without a suffix. So to obtain total emissions, queries must query for all three naming versions (e.g., CH4, CH4"\_AGR", and CH4"\_AWB".)
* Sulfur dioxide (SO<sub>2</sub>) emissions are currently differentiated by four metaregions (SO2\_1,SO2\_2,SO2\_3,SO2\_4).


## <a name="non-co2-ghg-emissions">Non-CO<sub>2</sub> GHG Emissions</a>

GCAM also produces emissions of non-CO<sub>2</sub> greenhouse gases such as methane (CH<sub>4</sub>), nitrous oxide (N<sub>2</sub>O) and halocarbons. These emissions are modeled as:

Emissions = base-emissions-factor • activity-level • (1 - MAC( e-price ))

where:

| | |
| :------------- |:-------------|
| emissions-factor | Base-year emissions per unit activity |
| activity-level | Emissions per unit activity |
| MAC | Marginal Abatement Cost Curve |
| e-price | Emissions Price |

Non-CO<sub>2</sub> GHG emissions are proportional to the activity except for any reductions in emission intensity due to the MAC curve. Under a carbon policy, emissions are reduced by an amount determined by the MAC curve.

The default set-up is that MAC curves use the scenario's carbon price (if any). The non-CO<sub>2</sub> GHG MACs are an exogenous input, and are read in in units of carbon-prices.

Below-zero (e.g. “no cost”) MAC mitigation (e.g. MAC reduction percentage is > 0 at zero carbon price) are applied in the reference case and phased in over several decades. (This can be turned off by setting the no-zero-cost-reductions option to 1 within a MAC curve.)

Note that a species-specific emissions market can also be specified using advanced options, described below.

### Fluorinated Gases

Fluorinated gas emissions are linked either to the size of the industrial sector (e.g., semiconductors) or to GDP (e.g., fire extinguishers). As those drivers change, emissions will change. Additionally, we include abatement options based on EPA MAC curves.

For HFC134a from cooling (e.g., air conditioners), we make additional adjustments to emissions factors in developing regions to reflect their continued transition from CFCs to HFCs.

## <a name="air-pollutant-emissions">Air Pollutant Emissions</a>

Air pollutant emissions such as sulfur dioxide (SO<sub>s</sub>) and nitrogen oxides (NO<sub>x</sub>) are modeled as:

Emissions = base-emissions-factor • activity-level • (1 - Em-Control( gdp/capita ))

where Em-Control is a function that represents decreasing emissions intensity as per-capita income increases:

Em-Control = 1 - ( 1.0 / ( 1.0 + ( currGDP/cap - baseGDP/cap ) / steepness ))

where steepness is aa parameter that current varies by emission species, but not by region. This captures the general global trend of increasing pollutant controls over time, but does not capture regional and technological heterogeneity.

Note that the GCAM implementation of the SSP scenarios used a different approach, incorporating region, sector, and fuel specific pollutant emission factor pathways (Calvin et al 2016, Rao et al. 2016). 

## <a name="user-options">Advanced Non-CO<sub>2</sub> User Options</a>

### Linked Emission Markets
Emissions prices of different GHGs can be linked together for a multi-gas policy using the linked-ghg-policy object. For example, in the default [linked_ghg_policy.xml](https://github.com/JGCRI/gcam-core/blob/master/input/policy/linked_ghg_policy.xml) file in the GCAM release, all non-CO<sub>2</sub> GHGs are linked to the market for CO<sub>2</sub>. 

The parameter price-adjust is used to convert prices (e.g., 100 year GWPs in the default set-up) and demand-adjust is used to convert demand units (e.g., to common units of carbon equivalents). 
These can be changed by year if desired.

Setting price-adjust to zero means that there is no economic feedback for the price of this GHG. MAC curves, however, will still operate under the default set-up (whereby MAC curves are driven by CO<sub>2</sub> prices). This can be changed separately for energy/industrial/urban CH4, agricultural CH4 (CH4\_AGR), and CH4 from agricultural waste burning (CH4\_AWB), LUC CO<sub>2</sub> emissions (e.g. CO2_LUC).

Note that you must first create a policy by reading in a <ghgpolicy> object (by reading an an XML with this object first, see the various policy files in the GCAM release) and then you can define how this links to any emissions (through <linked-ghg-policy> objects).

This flexibility allows CO<sub>2</sub>-only, CO<sub>2</sub>-equivalent, or non-CO<sub>2</sub> markets/constraints for various “baskets” of emissions as needed.

Note that the GCAM default set-up includes economic feedbacks for methane and nitrous oxide. This is an idealized assumption, but might not happen in real-world policies. For example, in many current systems agricultural emissions are offsets only – e.g., they get paid to reduce emissions, but are not charged for any remaining emissions. (So to simulate this type of policy, price-adjust would be set to zero).

### Markets For non-CO<sub>2</sub> Emission Species

Markets can be set for any emission species. (e.g., CH4-only market, NOx market, etc.)

Note that it generally does not make sense to set up a emissions market unless the model has a direct way to reduce emissions! (e.g. you’ve added relevant MAC curves.) For example, in [Shi et al. (2017)](energy.html#shi2017) US electricity sector SO<sub>2</sub> and NO<sub>x</sub> markets were used to represent current policies that cap emissions in certain states. MAC curves for existing power plants were added to allow emissions to change in response to market prices.

xml inputs within the MAC curve that will likely need to be used to set-up new markets are:

XML Tag | Description
------------ | -------------
market-name | Name of market from which the price used by the MAC curve will be obtained (default = "CO2")
mac-price-conversion | Value to multiply market price by to convert to unit expected by the MAC curve (for example, converting from $/tC to $/tCO2eq) (default  = 1)
Note | mac-price-conversion can also be set to -1, which is a flag to turn off all use of the MAC curve. This is useful for sensitivity studies.

One additional MAC-curve option to note is:

| | |
------------ | -------------
zero-cost-phase-in-time | Number of years over which to phase-in "below-zero" MAC curve reductions (default = 25 years)


### Other Non-CO<sub>2</sub> Emission Options

Emission objects can be added/changed via user input in any time period. New parameters (such as emission factors) overwrite any previous values. Note that emission control objects will be copied forward. For vintaged technologies (e.g. electric generation, road transport), any new emission object will be applied to new vintages. Old vintages will retain the previously read-in emission characteristics.

This also means that GHG objects can be removed after a given year by reading in a blank GHG object for that gas.

In addition to the GDP control object, a linear-control object is also available that allows a user to specify that an emission factor will linearly change over time to a user-defined value over a specified time period. The parameters controlling the linear-control object are:

XML Tag | Description
------------ | -------------
end-year | Year by which emission factor should reach specified value
start-year | (Optional) Start year after which EF should begin to decline. (defaults to final calibration year)
final-emissions-coefficient | Emissions coefficient that should be set by end-year (and every year thereafter)
allow-ef-increase | (optional) Allow emission factors to increase from their start-year value (default to false)


## References

<a name="shi2017">[Shi et al. 2017]</a> Shi W, Ou Y, Smith S J, Ledna C M, Nolte C G, Loughlin D H 2017. "Projecting state-level air pollutant emissions using an integrated assessment model: GCAM-USA" *Applied Energy* 208 511–521. doi: 10.1016/j.apenergy.2017.09.122. [Link](https://www.sciencedirect.com/science/article/pii/S0306261917314125
