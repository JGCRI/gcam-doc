---
layout: index
title: Demand for Energy
prev: inputs_demand.html
next: outputs_quantity.html
gcam-version: v5.3 
---

# Table of Contents

- [Inputs to the Model](#inputs-to-the-model)
- [Description](#description)
- [Equations](#equations)
- [Insights and intuition](#insights-and-intuition)
- [Policy options](#policy-options)
- [IAMC Reference Card](#iamc-reference-card)
- [References](#references)

## Inputs to the Model
**Table 1: Inputs required by the demand model <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
|  |  |  | [Exogenous](inputs_demand.html) |


## Description

### Buildings

GCAM disaggregates the building sector into residential and commercial sectors and models three aggregate services (heating, cooling, and other). Within each region, each type of building and each service starts with a different mix of fuels supplying energy (see Figure below). The future evolution of building energy use is shaped by changes in (1) floorspace, (2) the level of building service per unit of floorspace, and (3) fuel and technology choices by consumers. Floorspace depends on population, income, the average price of energy services, and exogenously specified satiation levels. The level of building service demands per unit of floorspace depend on climate, building shell conductivity, affordability, and satiation levels. The approach used in the buildings sector is documented in [Clarke et al. 2018](demand_energy.html#clarke2018), which has a focus on heating and cooling service and energy demands. Within building services, the structures and functional forms are similar to any other GCAM sector, described in [Energy Technologies](en_technologies.html).

### Industry

With the exception of cement and fertilizer, which are explicitly modeled in GCAM, the industrial sector is represented as a consumer of generic energy services and feedstocks. Within energy use there is cost-based competition between fuels, but with a low elasticity of substitution, as the specific uses of the energy are not specified. Cogeneration of electricity is tracked, and represented as a separate technology option for each fuel consumed by the industrial sector (other than electricity). Cogeneration technology options are characterized by higher capital costs, but are credited with the revenue from electricity sold; as such the deployment of cogeneration in any scenario will depend on future fuel and electricity prices. Output of aggregate industrial sectors is represented in generic terms.

#### Cement

GCAM includes a physical representation of the manufacture of cement, that tracks both the fuel- and limestone-derived emissions of CO<sub>2</sub>. Production volumes are indicated in Mt of cement; input-output coefficients of heat and electricity are indicated in GJ per kg of cement, and the input-output coefficient of limestone is unitless. The energy input-output coefficients are specific to each region, based on [Worrell et al. (2001)](energy.html#worrell2001) and Tables 6.9 and 6.10 in [IEA (2007)](energy.html#iea2007). The limestone input-output coefficient is calculated to return the region's cement-related emissions reported by [CDIAC 2017](energy.html#CDIAC2017). Each region's calibrated fuel shares in this industry are from Table 6.6 in [IEA 2007](energy.html#iea2007). A simple schematic with example input-outout coefficients is shown below; note that in the structure, "process heat cement" is treated as a specific energy commodity, so as to avoid allowing electricity to compete for market share of this input to the cement production process.

<img src="gcam-figs/cement.png" width="500" height="250" /><br/>
Structure of GCAM's representation of cement production, with example input-output coefficients shown (GJ/kg of energy, and unitless for limestone)
{: .fig}

Cement is treated as a final demand in GCAM; demands are driven by population and income, and the commodity is not an input to any further modeled processes.

Note that there is a CO<sub>2</sub> capture and storage technology for cement production, wherein the CO<sub>2</sub> from limestone calcination is captured. The costs of the capture technology are parameterized around [Mahasenan et al. 2005](energy.html#mahasenan2005).

#### N Fertilizer

The representation of nitrogenous fertilizers ("N fertilizer"), indicated in Mt of fixed N in synthetic fertilizers, includes both the specific production technologies for transforming various feedstocks into N fertilizer, as well as the demands for the commodity in the agricultural sectors. Nitrogenous fertilizers manufactured for non-agricultural purposes are excluded from the commodity modeled in GCAM.

Fuel and feedstock sources and input-output coefficients are calibrated based on Table 4.15 of [IEA 2007](energy.html#iea2007). The schematic below shows how N fertilizer is situated between the energy and agricultural systems of GCAM.

<img src="gcam-figs/Nfertilizer.png" width="300" height="200" /><br/>
**Structure of GCAM's representation of N fertilizer supply and demand, with example input-output coefficients shown (GJ/kg of N fertilizer on the energy inputs, and unitless for the N fertilizer inputs to crop production). Note that the fuel/feedstock sources are competing technologies, not fixed inputs to a production function.**
{: .fig}

The hydrogen production stage of ammonia production emits a relatively pure stream of CO<sub>2</sub> that is often captured for commercial purposes. Technologies with CCS are modeled in GCAM; additional capture and compression costs and energy inputs are based on H2A [DOE 2015](energy.html#doe2015).

### Transportation

The approach to modeling transportation in GCAM has been documented in [Kim et al. 2006](energy.html#kim2006), [Kyle and Kim 2011](energy.html#kyle2011), and the dataset in the current version of GCAM is documented in [Mishra et al. 2013](energy.html#mishra2013). The modeling approach is consistent with the other sectors in the model, though with several different functional forms, and a higher level of detail than is found in the other sectors of the model.

#### System Boundaries and Structure

The transportation sector in GCAM is subdivided into four final demands: long-distance passenger air travel, (other) passenger travel, international freight shipping, and (other) freight. The transportation sector excludes energy consumption and materials moved via pipeline transport (but see [gas supply system](energy.html#gas-processing)). Energy used by mobile mining, agricultural, industrial, and construction equipment is similarly not considered as transportation energy use, unless used on roadways and for the primary purpose of moving passengers and/or freight.

The passenger sector consists of up to five nesting levels, corresponding to different modes (e.g., road, rail), sub-modes (e.g., bus, light duty vehicle), size classes, and drivetrain technologies. The passenger sector also includes non-motorized modes (walking and cycling, not shown), which are not represented as energy consumers. Their market share in future periods largely depends on income, prices, elasticities, and also the time value of transportation, described below.

#### Functional Forms

The demand ($$D$$) for transportation services (e.g., passenger-km, tonne-km) in region $$r$$ and time period $$t$$ is given by the following equation:

$$
D_{r,t}=D_{r,t-1}(\frac{Y_{r,t}}{Y_{r,t-1}})^\alpha (\frac{P_{r,t}}{P_{r,t-1}})^\beta (\frac{N_{r,t}}{N_{r,t-1}})
$$

Where $$Y$$ is the per-capita GDP, $$P$$ is the total service price aggregated across all modes, $$N$$ is the population, and $$\alpha$$ and $$\beta$$ are income and price elasticities, respectively.

These final service demands are supplied by transportation supply sectors, which, as with other supply sectors in GCAM, are composed of subsectors and ultimately technologies. The functional forms for computing costs in both the subsectors and technologies differ slightly from other parts of the model. At the subsector level, the subsector competition may add the time value of transportation, as shown in the equation for the price ($$P$$) of mode $$i$$, in region $$r$$ and time period $$t$$:

$$
P_{i,r,t}=\sum_{j=1}^{N} (\alpha_{j,i,r,t}*P_{j,i,r,t}) + \frac{W_{r,t}*V_{i,r,t}}{S_{i,r,t}}
$$

In the equation above, $$j$$ refers to any of N technologies within subsector $$i$$, and $$\alpha$$ is the share of technology $$j$$ in subsector $$i$$. Where this equation differs from the subsectors elsewhere in GCAM is the final term, the wage rate ($$W$$) multiplied by the "time value multiplier" ($$V$$), divided by the average speed of the mode ($$S$$). The wage rate is calculated as the per-capita GDP divided by the number of working hours in the year, and the speed of each mode is exogenous (see [below](#input-data) for a list of exogenous variables). The time value multiplier is assumed for each mode, according to literature estimates of peoples' valuation of their time in transport (e.g., [Zamparini and Reggiani 2007](energy.html#zamparini2007), [VTPI 2013](energy.html#vtpi2013)), also considering the waiting times (and costs thereof) inherent in each mode ([Polzin and Chu 2005](energy.html#polzin2005)). Note that the time value term does not influence technology-level competition (e.g., between different vehicle sizes or fuels). Time value is also not considered in the freight sector, where the future inter-modal competition takes place on the basis of the evolution of the weighted average technology costs alone.

The time value term is only used for modeling the competition between passenger modes. The net effects of including the time value in the modal competition are (1) a shift towards faster modes of transportation as incomes increase, and (2) relative stabilization of the number of hours per person per day spent in transportation. This is because the time value of all forms of transportation increases with GDP, which tends to increase transportation costs at high levels of income. These effects are consistent with the econometric literature on modal shifting and time travel budgets (e.g., [Shafer 1998](energy.html#shafer1998), [Shafer and Victor 2000](energy.html#shafer2000)). 

Transportation services in GCAM are ultimately supplied by [transportation technologies](en_technologies.html#tran_techs), which take inputs of energy and produce outputs of service-distance (e.g., passenger-km, tonne-km). The costs of transportation technologies are computed as follows, for technology $$j$$ in subsector $$i$$, region $$r$$, and time period $$t$$:

$$
P_{j,i,r,t}=\frac{P_{f,r,t}*I_{j,i,r,t}+N_{j,i,r,t}}{L_{j,i,r,t}}
$$

In this equation, $$P_f$$ stands for the fuel price, $$I$$ is the vehicle fuel intensity, N is the levelized non-fuel cost (expressed per vehicle-km), and L is the load factor (persons or tonnes per vehicle).

The non-fuel costs are estimated for some technologies (e.g., light-duty vehicles) from exogenous assumptions about vehicle capital costs, non-fuel operations and maintenance costs, financing assumptions, and annual vehicle utilization (vehicle-km per year). For others, such as all freight technologies and passenger bus and rail, the non-fuel cost is estimated by deducting estimated fuel costs from reported total service costs (e.g., [BTS 2015](energy.html#bts2015)). In either case, the non-fuel cost is converted to dollars per vehicle-km for the equation above. The model then computes market shares of the different technologies as described in [logit choice](choice.html).



## Equations 
The equations that determine energy demand are described here.

#### Per Capita floorspace

The demand for per-capita floorspace, *f*, in future time period *t* is shown below. In this and subsequent equations, "satiation" indicates the level of service demand at which increases in income do not lead to further demands for services.

$$
f_{t}=(s-a)[1-exp(-\frac{ln(2)}{\mu}I_{t}(\frac{P_{t}}{P_{t0}})^\beta)]+a
$$

where *s* is the exogenous satiation level of per-capita floorspace, *μ* is the per-capita GDP at 50% of the satiation level, *a* is an exogenous tuning parameter, *P* is the total levelized cost of the modeled energy services per unit floorspace, *I* is per capita GDP, and $$\beta$$ is the price elasticity of averaged energy services.

The demands of generic services per unit floorspace, *d*, are shown in the equation below:

$$
d_{t}=k[1-exp(-\frac{ln(2)}{\mu}\frac{I_{t}}{P_{t}})]
$$

where *k* is a calibration parameter that captures satiation effects, and the other parameters are the same as the equation above, with the exception that here *P* refers to the price of the service. Space heating (*h*) and cooling (*c*) services use a similar approach with some additional considerations, shown below:

$$
h_{t}=k*(HDD_{t}*\eta_{t}*R_{t}-\lambda_{h}*IG_{t})[1-exp(-\frac{ln(2)}{\mu}\frac{I_{t}}{P_{t}})]
$$

$$
c_{t}=k*(CDD_{t}*\eta_{t}*R_{t}+\lambda_{c}*IG_{t})[1-exp(-\frac{ln(2)}{\mu}\frac{I_{t}}{P_{t}})]
$$

where *HDD* and *CDD* refer to heating and cooling degree days, respectively, η is the exogenous average building shell conductance, R is the exogenous average floor-to-surface ratio of buildings, IG is the internal gain heat from other building services, and λ is an exogenous internal gain scaler. In this way, the demands of heating and cooling services per unit of floorspace may vary depending on changes in climate, building shell characteristics, and the amount of internal gain heat coming from other modeled services.

## Policy options 

To be completed...

## Insights and intuition

### Effects of climate on energy demand

Changes in climate will affect residential energy demand [(Zhou et al. 2013)](https://link.springer.com/article/10.1007/s10584-013-0772-x) and building energy expenditures [(Clarke et al., 2018)](https://www.sciencedirect.com/science/article/pii/S0140988318300112), differently across world regions.

### Future changes in energy demand

Residential energy will increase by the end of the century given the projected increase in population and GDP. The implementation of a climate policy promotes the electrification of the sector [(Eom et al.,  2013)](https://www.sciencedirect.com/science/article/pii/S0360544212006214).

## IAMC Reference Card

Passenger transportation
- [X] Passenger trains
- [X] Buses
- [X] Light Duty Vehicles (LDVs)
- [X] Electric LDVs
- [X] Hydrogen LDVs
- [X] Hybrid LDVs
- [X] Gasoline LDVs
- [X] Diesel LDVs
- [X] Passenger aircrafts
- [X] CNG Buses
- [X] CNG Three-wheelers
- [X] Diesel Three-wheelers
- [X] Electric Buses
- [X] Electric Three-wheelers
- [X] LPG/CNG LDVs

Freight transportation
- [X] Freight trains
- [X] Heavy duty vehicles
- [X] Freight aircrafts
- [X] Freight ships

Industry
- [ ] Steel production
- [ ] Aluminium production
- [X] Cement production
- [ ] Petrochemical production
- [ ] Paper production
- [ ] Plastics production
- [ ] Pulp production

Residential and commercial
- [X] Space heating
- [X] Space cooling
- [ ] Cooking
- [ ] Refrigeration
- [ ] Washing
- [ ] Lighting
- [ ] Other electrical uses
- [ ] Water heating

<a name="table_footnote">1</a>: Note that this table differs from the one provided on the [Demand Inputs Page](inputs_demand.html#description) in that it lists all inputs to the land model, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.

## References


