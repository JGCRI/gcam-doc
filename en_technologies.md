---
layout: index
title: Energy Technologies
prev: choice.html
next: solver.html
gcam-version: v8.2
---

This page documents the parameters and functional forms found within technologies in GCAM's energy system. In the hierarchy of the information in the XML input and output files, the technology is located at the following level:
<br/>**scenario / world / region / supplysector / subsector / technology**<br/>
Note that in the input XML files, technology-level information may be located within individual regions' "technology", "stub-technology", "intermittent-technology" tags, or within the global-technology-database.

The information computed within technologies is passed up to subsectors and then subsequently to supplysectors (the markets). Quantities, such as the input and output, are simply added; i.e., the subsector output is equal to the sum of the constituent technologies. Subsector costs are computed as the output-weighted average of constituent technology costs, using only the new installations in the given time period. That is, where a technology's lifetime is assumed longer than the length of the model time period, and there is stock carryover from prior time periods, the technology costs in a given time period only reflect the installations in that time period. The costs of each technology are estimated as the average levelized costs of producing the given good, including all fuel costs, amortized capital costs, operations and maintenance costs, and where applicable, emissions penalties.

For GCAM-Macro capabilities, selected technology cost inputs also include capital-tracking information. These inputs preserve the standard technology-level cost representation, but allow the capital-related portion of technology costs and investment demand to be linked to the regional capital market. This enables capital price feedbacks to affect capital-intensive energy technologies while keeping the detailed bottom-up energy technology structure.

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
{OutputFraction}=1-{MaxShutDown}*\frac{ ({Midpoint}+1)^{steepness} }{ ({Midpoint}+1)^{steepness}+({MarginalProfit}+1)^{steepness} }
$$  

$$
{MarginalProfit}=\frac{ {MarginalRevenue}-{VariableCost} }{|VariableCost|}
$$

* profit-shutdown-decider/**median-shutdown-point**: The midpoint of the profit shutdown function above
* profit-shutdown-decider/**steepness**: Shape parameter of profit shutdown function above.
* **s-curve-shutdown-decider**: this is a type of phased retirement function, for technologies whose assumed lifetime is greater than one model timestep. From the installation period to the end of the assumed lifetime, the output is calculated according to the following functional form:  

$$
{OutputFraction}=\frac{1}{1+e^{ {steepness}*(t-halflife)} }
$$

* s-curve-shutdown-decider/**steepness**: shape parameter; see equation above
* s-curve-shutdown-decider/**half-life**: the number of years at which point half of the cohort is assumed retired (see equation above)
* **exogenous-shutdown-decider**: The exogenous shutdown decider scales the output of a vintaged technology in years after it's initial operating period. The output can be scaled above or below the technology vintage's original output. It should be noted that the exogenous shutdown decider and s-curve shutdown decider serve similar functions and generally should not be used together; however, the exogenous shutdown decider and profit shutdown decider reflect different dynamics and can be used in combination. A fixed-output is sometimes used to represent changing technology production over time. Using the exogenous shutdown decider instead of a fixed-output is beneficial because (1) the exogenous shutdown decider and profit shutdown decider can be used in tandem, while the profit shutdown decider will not operate on a fixed-output, and (2) using an exogenous shutdown decider for technologies that operate historically allows them to be considered in the calibration process, while share weights aren't calibrated for fixed-output technologies.
* exogenous-shutdown-decider/**output-scalar**: For a vintaged technology, the ratio of its output in some year to its output from its initial operating period. An example setup is shown below:
```
	<region name="USA">
		<supplysector name="electricity">
			<subsector name="coal">
				<stub-technology name="coal (conv pul)">
					<period year="2015">
						<exogenous-shutdown-decider name="exogenous-shutdown">
							<output-scalar year="2021">0.5</output-scalar>
							<output-scalar year="2025">0.3</output-scalar>
							<output-scalar year="2030">0.2</output-scalar>
							<output-scalar year="2035">0.1</output-scalar>
							<output-scalar year="2040">0</output-scalar>
							<output-scalar year="2045">0</output-scalar>
							<output-scalar year="2050">0</output-scalar>
						</exogenous-shutdown-decider>
					</period>
				</stub-technology >
			</subsector>
		</supplysector>
	</region>
```
* **secondary-output(name)**: the primary output of a technology is the supplysector where it is located. Secondary outputs are used for technologies that produce multiple modeled outputs (e.g., combined heat and power). As with energy inputs, the secondary output name must match the name of another market.
* secondary-output/**output-ratio**: the ratio of the secondary output to the primary output.
* secondary-output/**pMultiplier**: the multiplier on revenue from the secondary output. If set to 1, then the technology cost will be reduced by the output-ratio times the price of the secondary output commodity; if zero, then the technology cost will not be credited for any revenue for producing the secondary output.
* **share-weight**: share-weight of the [choice function](choice.html). Also used as a switch for technology availability (0: not available; all values > 0: available).
* **standard-capture-component**: this tag indicates that the technology captures some portion of its CO2 emissions
* standard-capture-component/**remove-fraction**: the portion of CO2 emissions captured
* standard-capture-component/**storage-market**: the name of the sector where captured CO2 in the given region is tracked.

### Electricity Technologies
The following are input parameters that are specific to electricity generation technologies.

* **input-capital**: used for reading in capital costs for electricity technologies and for tracking capital investment demand.
* input-capital/**capacity-factor**: annual average utilization factor, defined as the annual output divided by the output if operated at maximum rated capacity.
* input-capital/**capital-overnight**: overnight capital costs (i.e., excluding the interest payments required during the construction time), in 1975$ per kW of installed capacity.
* input-capital/**interest-rate**: technology-specific rate used to annualize capital costs. This rate is scaled by changes in the regional capital market price.
* input-capital/**payback-years**: number of years over which capital payments are annualized.
* input-capital/**tracking-market**: market to which capital investment demand is added, typically the regional capital market.
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

* **minicam-non-energy-input/input-cost**: the average levelized cost of transportation, in 1975$ per vehicle-km.
* **minicam-energy-input/coefficient**: the input-output coefficient is indicated in EJ of energy per output unit (EJ/billion vehicle-km).
* **loadFactor**: average number of persons per vehicle for passenger technologies, or tonnes per vehicle for freight technologies

* **tracking-non-energy-input(name)**: a variant of `minicam-non-energy-input` used when part of a total non-energy cost is treated as capital-related and linked to a capital tracking market. This input is useful when only total non-energy costs are available, but a portion of that cost should respond to capital-market feedbacks in GCAM-Macro.
* tracking-non-energy-input/**input-cost**: total non-energy cost before decomposition into capital and non-capital components.
* tracking-non-energy-input/**capital-ratio**: fraction of `input-cost` treated as capital-related.
* tracking-non-energy-input/**interest-rate**: technology-specific rate used to annualize the capital portion of cost. This rate is scaled by changes in the regional capital market price.
* tracking-non-energy-input/**payback-years**: number of years over which the capital portion of cost is annualized.
* tracking-non-energy-input/**invest-unit-conversion**: Optional unit conversion used when calculating the capital investment value added to the tracking market.
* tracking-non-energy-input/**tracking-market**: market to which derived capital investment demand is added, typically the regional capital market.
* tracking-non-energy-input/**depreciation-rate**: Optional depreciation rate used to derive investment demand. Only needed for non-vintaged technologies.

