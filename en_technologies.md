---
layout: index
title: Energy Technologies
prev: choice.html
next: solver.html
current-version: v4.3 
---

This page documents the parameters and functional forms found within technologies in GCAM's energy system. In the heirarchy of the information in the XML input and output files, the technology is located at the following level:
<br/>**scenario / world / region / supplysector / subsector / technology**<br/>
Note that in the input XML files, technology-level information may be located within individual regions' "technology", "stub-technology", "intermittent-technology" tags, or within the global-technology-database.

The information computed within technologies is passed up to subsectors and then subsequently to supplysectors (the markets). Quantities, such as the input and output, are simply added; i.e., the subsector output is equal to the sum of the constituent technologies. Subsector costs are computed as the output-weighted average of constituent technology costs, using only the new installations in the given time period. That is, where a technology's lifetime is assumed longer than the length of the model time period, and there is stock carryover from prior time periods, the technology costs in a given time period only reflect the installations in that time period. The costs of each technology are estimated as the average levelized costs of producing the given good, including all fuel costs, amortized capital costs, operations and maintenance costs, and where applicable, emissions penalties.

The following section includes a glossary of parameters that characterize technologies in GCAM, providing any relevant equations. Parameters specific to individual sectors (e.g., electricity or transportation) are identified in separate sections.

## Technology Parameter Glossary

### General Technologies

* **CalDataOutput/calOutputValue**: calibrated output of the technology in the base year
* **CO2(name)**: this is an object used for tracking the CO2 emissions from the given technology. The default is "CO2"; alternatives may be useful for sector- or technology-specific policies.
* **lifetime**: the maximum number of years that the technology is assumed to be operated. The default number of years is the length of the model timestep.
* **minicam-energy-input(name)**: the name of the input being consumed. This input corresponds to a resource or another supplysector of the same name, generally within the same region (but see market-name below). Note that any technology can take multiple inputs, and these inputs are not confined to energy goods.
* minicam-energy-input/**calibrated-value**: calibrated quantity of energy consumed. A technology may be calibrated in the base year either on the basis of its input(s) or output.
* minicam-energy-input/**coefficient**: input-output ratio. Unitless if the input and output units are the same.
* minicam-energy-input/**efficiency**: output / input ratio (inverse of coefficient). Either an efficiency or coefficient may be used for any technology.
* minicam-energy-input/**market-name**: the region from which to consume the input commodity. The default value is the region in which the technology is located.
* **minicam-non-energy-input(name)**: the name of the type of non-energy input. The generic assumption is "non-energy"; however, if multiple non-energy inputs are read in, their costs are added.
* minicam-non-energy-input/**input-cost**: the total levelized non-fuel cost, in 1975$ per one billionth of the output unit. For sectors whose output is EJ, the price unit is 1975$/GJ. Non-energy costs may be computed from assumed capital costs, fixed and variable O&M costs, financing assumptions, assumed equipment lifetimes, and assumed utilization rates, or they may be simply computed as known total costs minus known fuel costs. In the electric sector, the different cost components, financing assumptions, and utilization factors are read in explicitly.
* **non-energy-use-capture-component**: this tag indicates that some portion of the carbon in the input fuel is used in a non-energy application, where it may be not emitted as CO2.
* non-energy-use-capture-component/**remove-fraction**: the portion of the carbon in the input fuel that is not emitted.
* non-energy-use-capture-component/**target-gas**: the CO2 name
* **profit-shutdown-decider**: the profit shutdown decider indicates to decrease the output of technologies installed in prior time periods as the variable (fuel + emissions) costs approach the price of the commodity being produced. The functional form is as follows:  

$$
{OutputFraction}=1-{MaxShutDown}*\frac{ {Midpoint} }{ {Midpoint}+({ProfitRate}+1)^{steepness} }
$$  

$$
{ProfitRate}=\frac{ {PriceReceived}-{VariableCost} }{PriceReceived}
$$

* profit-shutdown-decider/**median-shutdown-point**: The midpoint of the profit shutdown function above
* profit-shutdown-decider/**steepness**: Shape parameter of profit shutdown function above.
* **s-curve-shutdown-decider**: this is a type of phased retirement function, for technologies whose assumed lifetime is greater than one model timestep. From the installation period to the end of the assumed lifetime, the output is calculated according to the following functional form:  

$$
{OutputFraction}=\frac{1}{1+e^{ {steepness}*(t-halflife)} }
$$

* s-curve-shutdown-decider/**steepness**: shape parameter; see equation above
* s-curve-shutdown-decider/**half-life**: the number of years at which point half of the cohort is assumed retired (see equation above)
* **secondary-output(name)**: the primary output of a technology is the supplysector where it is located. Secondary outputs are used for technologies that produce multiple modeled outputs (e.g., combined heat and power). As with energy inputs, the secondary output name must match the name of another market.
* secondary-output/**output-ratio**: the ratio of the secondary output to the primary output.
* secondary-output/**pMultiplier**: the multiplier on revenue from the secondary output. If set to 1, then the technology cost will be reduced by the output-ratio times the price of the secondary output commodity; if zero, then the technology cost will not be credited for any revenue for producing the secondary output.
* **share-weight**: share-weight of the [choice function](choice.html). Also used as a switch for technology availability (0: not available; all values > 0: available).
* **standard-capture-component**: this tag indicates that the technology captures some portion of its CO2 emissions
* standard-capture-component/**remove-fraction**: the portion of CO2 emissions captured
* standard-capture-component/**storage-market**: the name of the sector where captured CO2 in the given region is tracked.

### Electricity Technologies
The following are input parameters that are specific to electricity generation technologies.

* **input-capital**: used for reading in capital costs
* input-capital/**capacity-factor**: annual average utilization factor, defined as the annual output divided by the output if operated at maximum rated capacity.
* input-capital/**fixed-charge-rate**: portion of overnight capital costs that are paid each year, estimated from assumed expected lifetime and discount rate.
* input-capital/**capital-overnight**: overnight capital costs (i.e., excluding the interest payments required during the construction time), in 1975$ per kW of installed capacity.
* **input-OM-fixed/OM-fixed**: annual fixed operations and maintenance costs, or costs that do not scale with the output of the technology, in 1975$/kW/yr.
* **input-OM-var/OM-var**: variable operations and maintenance costs, in 1975$/MWh.

#### Intermittent Electricity Technologies
The following are input parameters that are used in calculating the backup requirements of intermittent renewables.

* **backup-capacity-factor**: the annual average utilization of the backup capacity, used to calculate fuel requirements, emissions, and variable costs.
* **backup-capital-cost**: the annualized cost of backup capacity, in 1975$/kW/yr.
* **electric-sector-name**: the name of the electric sector in the region
* **trial-market-name**: the name of the market where the technology's intermittency-related costs will be computed. Can be bundled with other technologies.
* **capacity-limit-backup-calculator/capacity-limit**: mid-point of the curve relating backup capacity requirements to the capacity share of intermittent technologies on the grid. See [electricity](energy.html#electricity) for explanation and equations.

### Transportation Technologies
Transportation technologies have several parameters that are different from other technologies in GCAM.

* **minicam-non-energy-input/input-cost**: the average levelized cost of transportation, in 1990$ per vehicle-km. The conversion from 1975$ to 1990$ is 2.212.
* **minicam-energy-input/coefficient**: the input-output coefficient is indicated in btus of energy per one millionth of the output unit (btu/vehicle-km). The assmued conversion from btu to kJ is 1.055.
* **loadFactor**: average number of persons per vehicle for passenger technologies, or tonnes per vehicle for freight technologies
