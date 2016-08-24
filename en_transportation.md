---
layout: index
title: Transportation
next: toc.html
current-version: v4.2 
---

The approach to modeling transportation in GCAM has been documented in [Kim et al. 2006](en_refs.html#kim2006), [Kyle and Kim 2011](en_refs.html#kyle2011), and the dataset in the current version of GCAM is documented in [Mishra et al. 2013](en_refs.html#mishra2013). The modeling approach is consistent with the other sectors in the model, though with several different functional forms, and a higher level of detail than is found in the other sectors of the model.

## System Boundaries and Structure

The transportation sector in GCAM is subdivided into four final demands: long-distance passenger air travel, (other) passenger travel, international freight shipping, and (other) freight. The transportation sector excludes energy consumption and materials moved via pipeline transport (but see [gas supply system](en_gas_processing.html)). Energy used by mobile mining, agricultural, industrial, and construction equipment is similarly not considered as transportation energy use, unless used on roadways and for the primary purpose of moving passengers and/or freight.

The structure of the passenger sector differs by region, but a typical region is depicted Figure 1.

![Figure 1](gcam-figs/trnfig_passenger.png)<br/>
Figure 1: Schematic of passenger sector in a typical GCAM region.
{: .fig}

As shown, the passenger sector consists of up to five nesting levels, corresponding to different modes (e.g., road, rail), sub-modes (e.g., bus, light duty vehicle), size classes, and drivetrain technologies. The passenger sector also includes non-motorized modes (walking and cycling, not shown), which are not represented as energy consumers. Their market share in future periods largely depends on the time value of transportation, described below.

## Functional Forms

The demand ($$D$$) for transportation services (e.g., passenger-km, tonne-km) in region $$r$$ and time period $$t$$ is given by the following equation:

$$
D_{r,t}=D_{r,t-1}(\frac{Y_{r,t}}{Y_{r,t-1}})^\alpha (\frac{P_{r,t}}{P_{r,t-1}})^\beta (\frac{N_{r,t}}{N_{r,t-1}})
$$

Where $$Y$$ is the per-capita GDP, $$P$$ is the total service price aggregated across all modes, $$N$$ is the population, and $$\alpha$$ and $$\beta$$ are income and price elasticities, respectively.

These final service demands are supplied by transportation supply sectors, which, as with other supply sectors in GCAM, are composed of subsectors and ultimately technologies. The functional forms for computing costs in both the subsectors and technologies differ slightly from other parts of the model. At the subsector level, the subsector competition may add the time value of transportation, as shown in the equation for the price ($$P$$) of mode $$i$$, in region $$r$$ and time period $$t$$:

$$
P_{i,r,t}=\sum_{j=1}^{N} (\alpha_{j,i,r,t}*P_{j,i,r,t}) + \frac{W_{r,t}*V_{i,r,t}}{S_{i,r,t}}
$$

In the equation above, $$j$$ refers to any of N technologies within subsector $$i$$, and $$\alpha$$ is the share of technology $$j$$ in subsector $$i$$. Where this equation differs from the subsectors elsewhere in GCAM is the final term, the wage rate ($$W$$) multiplied by the "time value multiplier" ($$V$$), divided by the average speed of the mode ($$S$$). The wage rate is calculated as the per-capita GDP divided by the number of working hours in the year, and the speed of each mode is exogenous (see [below](#input_data) for a list of exogenous variables). The time value multiplier is assumed for each mode, according to literature estimates of peoples' valuation of their time in transport (e.g., [Zamparini and Reggiani 2007](en_refs.html#zamparini2007), [VTPI 2013](en_refs.html#vtpi2013)), also considering the waiting times (and costs thereof) inherent in each mode ([Polzin and Chu 2005](en_refs.html$polzin2005)). Note that the time value term does not influence technology-level competition (e.g., between different vehicle sizes or fuels). Time value is also not considered in the freight sector, where the future inter-modal competition takes place on the basis of the evolution of the weighted average technology costs alone.

The time value term is only used for modeling the competition between passenger modes. The net effects of including the time value in the modal competition are (1) a shift towards faster modes of transportation as incomes increase, and (2) relative stabilization of the number of hours per person per day spent in transportation. This is because the time value of all forms of transportation increases with GDP, which tends to increase transportation costs at high levels of income. These effects are consistent with the econometric literature on modal shifting and time travel budgets (e.g., [Shafer 1998](en_refs.html#shafer1998), [Shafer and Victor 2000](en_refs.html#shafer2000)). 

Transportation services in GCAM are ultimately supplied by [transportation technologies](en_technologies.html#tran_techs), which take inputs of energy and produce outputs of service-distance (e.g., passenger-km, tonne-km). The costs of transportation technologies are computed as follows, for technology $$j$$ in subsector $$i$$, region $$r$$, and time period $$t$$:

$$
P_{j,i,r,t}=\frac{P_{f,r,t}*I_{j,i,r,t}+N_{j,i,r,t}}{L_{j,i,r,t}}
$$

In this equation, $$P_f$$ stands for the fuel price, $$I$$ is the vehicle fuel intensity, N is the levelized non-fuel cost (expressed per vehicle-km), and L is the load factor (persons or tonnes per vehicle).

The non-fuel costs are estimated for some technologies (e.g., light-duty vehicles) from exogenous assumptions about vehicle capital costs, non-fuel operations and maintenance costs, financing assumptions, and annual vehicle utilization (vehicle-km per year). For others, such as all freight technologies and passenger bus and rail, the non-fuel cost is estimated by deducting estimated fuel costs from reported total service costs (e.g., [BTS 2015](en_refs.html#bts2015)). In either case, the non-fuel cost is converted to dollars per vehicle-km for the equation above. The model then computes market shares of the different technologies as described in [logit choice](choice.html).

## Input Data <a name="input_data"/>

The specific values and sources of the input data assumptions to the transportation module of GCAM are documented in [Mishra et al. 2013](en_refs.html#mishra2013); this section identifies what variables are collected, for each country or region analyzed in detail in constructing GCAM's transportation input files. The idenfifying information for each transportation technology is provided in Table 1.

**Table 1**: Transportation input data categories for a sample region in GCAM.

| Service   | Mode               | Size class          | Technology     | Fuel        |
|:----------|:-------------------|:--------------------|:---------------|:------------|
| Passenger | Air Domestic       | All                 | Liquids        | Liquids     |
| Passenger | Air International  | All                 | Liquids        | Liquids     |
| Passenger | Bus                | All                 | Liquids        | Liquids     |
| Passenger | Bus                | All                 | NG             | Natural Gas |
| Passenger | HSR                | All                 | Electric       | Electricity |
| Passenger | LDV_2W             | Motorcycle (>250cc) | Liquids        | Liquids     |
| Passenger | LDV_2W             | Motorcycle (>250cc) | BEV            | Electricity |
| Passenger | LDV_4W             | Compact Car         | Liquids        | Liquids     |
| Passenger | LDV_4W             | Compact Car         | Hybrid Liquids | Liquids     |
| Passenger | LDV_4W             | Compact Car         | NG             | Natural Gas |
| Passenger | LDV_4W             | Compact Car         | BEV            | Electricity |
| Passenger | LDV_4W             | Compact Car         | FCEV           | Hydrogen    |
| Passenger | LDV_4W             | Midsize Car         | Liquids        | Liquids     |
| Passenger | LDV_4W             | Midsize Car         | Hybrid Liquids | Liquids     |
| Passenger | LDV_4W             | Midsize Car         | NG             | Natural Gas |
| Passenger | LDV_4W             | Midsize Car         | BEV            | Electricity |
| Passenger | LDV_4W             | Midsize Car         | FCEV           | Hydrogen    |
| Passenger | LDV_4W             | Large Car           | Liquids        | Liquids     |
| Passenger | LDV_4W             | Large Car           | Hybrid Liquids | Liquids     |
| Passenger | LDV_4W             | Large Car           | NG             | Natural Gas |
| Passenger | LDV_4W             | Large Car           | BEV            | Electricity |
| Passenger | LDV_4W             | Large Car           | FCEV           | Hydrogen    |
| Passenger | LDV_4W             | Light Truck and SUV | Liquids        | Liquids     |
| Passenger | LDV_4W             | Light Truck and SUV | Hybrid Liquids | Liquids     |
| Passenger | LDV_4W             | Light Truck and SUV | NG             | Natural Gas |
| Passenger | LDV_4W             | Light Truck and SUV | BEV            | Electricity |
| Passenger | LDV_4W             | Light Truck and SUV | FCEV           | Hydrogen    |
| Passenger | Rail               | All                 | Liquids        | Liquids     |
| Passenger | Rail               | All                 | Electric       | Electricity |
| Freight   | Rail               | All                 | Coal           | Coal        |
| Freight   | Rail               | All                 | Liquids        | Liquids     |
| Freight   | Rail               | All                 | Electric       | Electricity |
| Freight   | Ship Domestic      | All                 | Liquids        | Liquids     |
| Freight   | Ship International | All                 | Liquids        | Liquids     |
| Freight   | Truck              | Truck (0-2.7t)      | Liquids        | Liquids     |
| Freight   | Truck              | Truck (0-2.7t)      | NG             | Natural Gas |
| Freight   | Truck              | Truck (2.7-4.5t)    | Liquids        | Liquids     |
| Freight   | Truck              | Truck (2.7-4.5t)    | NG             | Natural Gas |
| Freight   | Truck              | Truck (4.5-12t)     | Liquids        | Liquids     |
| Freight   | Truck              | Truck (4.5-12t)     | NG             | Natural Gas |
| Freight   | Truck              | Truck (>12t)        | Liquids        | Liquids     |
| Freight   | Truck              | Truck (>12t)        | NG             | Natural Gas |

*Note*: LDV = light duty vehicle; 4W = four wheels; HSR = high speed rail; SUV = sport utility vehicle; NG = natural gas vehicle; BEV = battery electric vehicle; FCEV = fuel cell electric vehicle.

Note that the size classes shown are tailored to each region, depending on the data availabilty in the given region, and the patterns of energy consumption. For instance, the region shown only has one size class for motorcycle, but in other regions as many as three motorcycle size classes may be represented. For each category identified above, the following variables are collected, for a single base year (or more as available), and scenario-specific values of these variables are also assumed for all future years, except where otherwise noted:

* **energy consumption**: PJ per year (base year(s) only)
* **load factor**: persons per vehicle (passenger), or tonnes per vehicle (freight)
* **vehicle fuel intensity**: MJ of energy per km of travel
* **cost**: either disaggregated capital and O&M costs, or levelized non-fuel costs

	* if using disaggregated capital and O&M cost, **annual vehicle utilization**, in vehicle-km per year

* **service output**: km per year (base year(s) only). This is only relevant for walking and cycling, as it can be derived from the other data provided for all other modes.
* **speed**: average door-to-door speed of the mode, in km per hour. This is indicated at the mode level, and in some cases size class, but does not differ by drivetrain technology.