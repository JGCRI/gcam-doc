---
layout: index
title: Supply of Energy
prev: inputs_supply.html
next: outputs_quantity.html
gcam-version: v5.3 
---

# Table of Contents

- [Inputs to the Module](#inputs-to-the-module)
- [Description](#description)
- [Equations](#equations)
- [Insights and intuition](#insights-and-intuition)
- [Policy options](#policy-options)
- [IAMC Reference Card](#iamc-reference-card)
- [References](#references)

## Inputs to the Module
**Table 1: Inputs required by the supply module <sup>[1](#table_footnote)</sup>**

| Name | Resolution | Unit | Source |
| :--- | :--- | :--- | :--- |
| Historical energy supply (used for calibration) | By region, fuel, flow, and year | EJ/yr | [Exogenous](inputs_supply.html) |
| Resource supply curves | By region, resource, and grade | EJ and 1975$/GJ | [Exogenous](inputs_supply.html) |
| Technology costs | By region, technology, and year | 1975$/GJ | [Exogenous](inputs_supply.html) |
| Logit exponents | By region, sector or subsector, and year | unitless | [Exogenous](inputs_supply.html) |
| Share weight interpolation rules | By region, technology or subsector, and year | unitless | [Exogenous](inputs_supply.html) |
| Efficiency or input-output coefficient | By region, technology or subsector, and year | unitless | [Exogenous](inputs_supply.html) |
| Energy commodity prices | By region, fuel, and year | 1975$/GJ | [Marketplace](marketplace.html) |
| GHG value | By region, technology, gas, and year | 1975$/GJ | [Emissions](emissions.html) |


<a name="table_footnote">1</a>: Note that this table differs from the one provided on the [Supply Inputs Page](inputs_supply.html#description) in that it lists all inputs to the energy supply module, including information passed from other modules. Additionally, the units listed are the units GCAM requires, rather than the units the raw input data uses.


## Description

### Resources

#### Depletable Resources 

GCAM models depletable resources (oil, unconventional oil, natural gas, coal, and uranium) using graded resource supply curves. The fossil resources are produced from these supply curves using a "Resource / Reserve" model.  In this approach as the market price of the resource increases, we look up the [supply curve](details_energy.html#depletable-resources) to determine the additional quantity available and move that quantity of "resource" into a "reserve".  We assume production of that reserve over some well / mine lifetime appropriate for each fuel.  Technical change can be applied to reduce the extraction cost of the "resource" in future years. See [Energy Trade](#energy-trade) for a discussion of fossil fuel trade.

#### Renewable Resources 

GCAM's renewable resources include onshore wind, offshore wind, solar, geothermal, hydropower, and biomass; some regions are also assigned a "traditional biomass" resource. In contrast to the depletable resources, whose cumulative stocks are explicitly tracked, renewable resource quantities in GCAM are always indicated in terms of annual flows. Wind and solar are considered as options for producing electricity or hydrogen, while geothermal and hydropower are only considered as options for producing electricity. None of these resources are traded between regions. Traditional biomass is only used by the buildings sector in selected regions. Of the six renewable energy resources, only biomass is (a) traded globally, and (b) used as an energy form or feedstock in a wide variety of sectors.

In general, the costs of producing electricity from renewable energy forms consist of the sum of the resource costs described here, the technology costs, and in some cases, backup-related costs. The latter two components to the costs are documented in the [electricity sector](supply_energy.html#electricity).

##### Wind

All regions are assigned a onshore wind and offshore wind energy supply curves, where the quantity is in exajoules (EJ) of electricity produced per year, and the price is in 1975$ per gigajoule (GJ) of electricity produced. Unlike fossil resources, uranium, or biomass, the quantities of wind energy are considered to be within "regional" markets; they can not be traded between the different modeled geopolitical regions. The [supply curves](details_energy.html#wind) in each region are derived from bottom-up analysis documented in [Eurek et al. (2017)](supply_energy.html#eurek2017). Note that in this supply curve formulation, the price is zero when the quantity is zero; these include factors such as reduced capacity factors, and water depth for offshore wind. Region-specific grid connection costs are derived from data on wind resource distance to grid, also from [Eurek et al. (2017)](supply_energy.html#eurek2017). The remainder of the costs of wind electricity generation are in the technology and backup, described in the [electricity sector](supply_energy.html#electricity).

##### Solar

Solar energy is modeled as two separate resources: "global solar resource" and "distributed_PV", where the latter refers only to photovoltaic installations on residential and commercial buildings. As with wind, both of these resources are indicated in terms of electricity production. Global solar resource is modeled as an unlimited resource, and with a very low price; unlike with wind, it is assumed that marginal resource-related costs do not escalate with deployment levels. The "distributed_PV" supply curve is of the same functional form as the wind supply curve, with an upward-sloping function designed to capture the increases in costs with deployment. Resource potential in each region is based on estimated building floorspace. The technology and backup-related costs are documented in the [electricity sector](#electricity). Capacity factors and costs vary by region and type of solar (e.g., distributed photovoltaic (PV), concentrating solar power (CSP)). See [solar](details_energy.html#solar) for more details.


##### Geothermal

Modeling of geothermal energy in GCAM is documented in [Hannam et al. (2009)](supply_energy.html#hannam2009). Like wind and solar, geothermal energy is only used in GCAM as a source of electricity production, but the quantities in the resource supply curves are indicated in terms of EJ of heat input to power plants, estimated as 10 times the quantity of electricity generated. This 10% thermo-electric efficiency is a bit lower than most regions where it has been estimated, but is the [IEA's (2011)](supply_energy.html#iea2011) default assumption. The supply curves in each region are graded, similar to the fossil resource curves but with the exception that the quantities refer to annual flows, not cumulative stocks. As with wind and solar, the supply curves are intended to capture only the portion of the costs of producing geothermal electricity that escalate with deployment, with the remainder of the costs in the corresponding technologies of the electricity sector. In the four phases of geothermal electricity production identified by [Deloitte (2008)](supply_energy.html#deloitte2008), the supply curves in GCAM include identification, exploration, and drilling, but not production. See also [geothermal](details_energy.html#geothermal)

##### Hydropower

Hydropower is the simplest of all energy forms in GCAM; the quantity of hydropower produced in each region and year is exogenous, prescribed as a "fixedOutput". Hydropower costs are not estimated, and the technology does not contribute to the modeled electricity price in each region. The quantities in future years are generally consistent with the long-term "economic" potential identified by the International Hydropower Association [(IHA 2000)](supply_energy.html#iha2000).

##### Biomass

While most of the effort in modeling biomass supply is in the [agriculture and land use component](land.html), there is a renewable resource represented in the energy system, that generally refers to municipal and industrial wastes that can be used for energy purposes. The supply curves use the same functional form as described in the Wind section above, and the specific quantities are documented in [Gregg and Smith (2010)](supply_energy.html#gregg2010). Unlike other resources, the waste biomass supply curve is assumed to grow with GDP, as prescribed by the exogenous supply elasticity of GDP, or "gdpSupplyElast".

##### Traditional biomass

Traditional biomass in GCAM is defined as the IEA's "primary solid biomass" product consumed by the residential sector, in selected regions where it is considered to be an important part of the energy system. The largest consumers of traditional biomass in 2010 were China, India, and Western Africa. The specific energy goods involved include firewood, agricultural residues, animal dung, and others; no effort is made to disaggregate the category into these consistuent parts, or to link the production volumes with the agriculture and land use module.


### Energy Transformation

Broadly, the energy transformation sectors in GCAM consist of all supplysectors between the [primary energy resources](supply_energy.html#resources) and the [final energy demands](demand_energy.html). The main energy transformation sectors highlighted in this documentation are [electricity](supply_energy.html#electricity), [refining](supply_energy.html#refining), [gas processing](supply_energy.html#en_gas_processing), [hydrogen production](supply_energy.html#hydrogen), and [district services](supply_energy.html#district-services). For more details, see [energy transformation](details_energy.html#energy-transformation)

#### Electricity

The GCAM electricity sector models the conversion of primary fuels (e.g., coal, gas, oil, bioenergy) to electricity. For most fuels, GCAM includes several different technology options (e.g., pulverized coal, coal integrated gasification combined cycle (IGCC), etc.). Individual technologies compete for market share based on their technological characteristics (conversion efficiency in the production of products from inputs), and cost of inputs and price of outputs. The cost of a technology in any period depends on (1) its exogenously specified non-energy cost, (2) its endogenously calculated fuel cost, and (3) any cost of emissions, as determined by the climate policy. The first term, non-energy cost, represents capital, fixed and variable O&M costs incurred over the lifetime of the equipment (except for fuel or electricity costs). For electricity technologies, GCAM reads in each of these terms and computes the levelized cost of energy within the model. For example, the non-energy cost of coal-fired power plant is calculated as the sum of overnight capital cost (amortized using a capital recovery factor and converted to dollars per unit of energy output by applying a capacity factor), fixed and variable operations and maintenance costs. The second term, fuel or electricity cost, depends on the specified efficiency of the technology, which determines the amount of fuel or electricity required to produce each unit of output, as well as the cost of the fuel or electricity. For more information, see [electricity](details_energy.html#electricity).

#### Refining 

The refining sector, or liquid fuels production sector, explicitly tracks all energy inputs, emissions, and costs involved with converting primary energy forms into liquid fuels. Liquid fuels include gasoline, diesel, kerosene, ethanol and many other liquid hydrocarbon fuels; for the full mapping see [Mapping the IEA Energy Balances](details_inputs.html#mapping-the-iea-energy-balances). Although liquid fuels encompasses many products, GCAM only models a single "refined liquids" product that is consumed by all end-use sectors. The refining sector includes subsectors of oil refining, biomass liquids, gas to liquids, and coal to liquids, each of which are described below. Each of these four subsectors is available starting in the first future time period, and the capital stocks of refineries are explicitly tracked.  For more information, see [refining](details_energy.html#refining).

##### Oil Refining

The oil refining subsector accounts for the vast majority of the historical output of the refining sector, globally and in all regions. Each region is assigned a single production technology for oil refining; this technology does not differentiate between conventional and unconventional oil, whose competition is explicitly modeled upstream of the refining sector. In a typical region, the oil refining technology consumes three energy inputs: crude oil, natural gas, and electricity (see [Figure](details_energy.html#oil-refining)). The coefficients of the oil refining production technology reflect whole-process inputs and liquid fuel outputs; there is no explicit tracking of the production and on-site use of intermediate products such as refinery gas (still gas). Electricity produced at refineries (both the fuel inputs and electricity outputs) is modeled in the electricity and/or industrial energy use sectors, as the IEA Energy Balances ([IEA 2019](supply_energy.html#iea2019)) do not disaggregate autoproducer electric power plants at refineries from elsewhere. There is no oil refining technology option with CO<sub>2</sub> capture and storage (CCS) considered.

##### Biomass Liquids

The biomass liquids subsector includes up to eight technologies in each region, with a global total of [11 production technologies](details_energy.html#biomass-liquids). The biomass liquids technologies include up to four "first-generation" biofuels in each region, defined as biofuels produced from agricultural crops that are also used as food, animal feed, or other modeled uses (described in the [land module](land.html)). The model tracks secondary feed outputs of first generation biofuel production, as DDGS (dried distillers grains and solubles) from ethanol production, and as feedcakes from biodiesel production. Second-generation technologies consume the "biomass" or "biomassOil" commodities, which include purpose-grown bioenergy crops, as well as residues from forestry and agriculture, and municipal and industrial wastes.  Starting in 2020, second-generation biofuels (cellulosic ethanol and Fischer-Tropsch syn-fuels) are introduced, each with three levels of CCS: none, level 1, and level 2. The first CCS level generally consists of relatively pure and high-concentration CO2 sources (e.g., from gasifiers or fermenters), which have relatively low capture and compression costs. The second CCS level includes a broader set of sources (e.g., post-combustion emissions), and incurs higher costs but has a higher CO<sub>2</sub> removal fraction.

##### Coal to Liquids

The majority of the world's coal to liquids production is in South Africa ([IEA 2012](supply_energy.html#iea2012)), but the technology is available to all regions in GCAM starting in the first future time period. Note that the CO<sub>2</sub> emissions intensity is substantially higher than all other liquid fuel production technologies, due to high process energy intensities, and high primary fuel carbon contents. Where crude oil refining emits about 5.5 kg of CO<sub>2</sub> per GJ of fuels produced, coal to liquids emits over 130 kg of CO<sub>2</sub> per GJ of fuel produced. The upstream emissions from fuel production by this pathway are substantially higher than the "tailpipe" emissions from combustion of the fuels produced (about 70 kg CO<sub>2</sub> per GJ). As with biomass liquids, two different production technologies with CCS are represented, with costs and CO<sub>2</sub> removal fractions based on [Dooley and Dahowski (2009)](supply_energy.html#dooley2009).

##### Gas to Liquids

While a minor contributor to liquid fuels production globally (about 0.1%; [IEA 2012](supply_energy.html#iea2012)), gas to liquids has received increased attention in recent years, with several large-scale plants completed in the last decade ([Glebova 2013](supply_energy.html#glebova2013)), and others in various stages of planning  and construction ([Enerdata 2014](supply_energy.html#enerdata2014)). Because of the relatively low carbon content of natural gas, and whole-process energy efficiency ratings typically about 60%, the net CO<sub>2</sub> emissions from the process are about 20 kg CO<sub>2</sub> per GJ of fuel, significantly lower than coal to liquids. There is only one production technology represented in GCAM, with no CCS option available.

#### Gas processing

The three subsectors of the gas processing sector, and the downstream sectors are described below. See [gas processing](details_energy.html#gas-processing) for an overview of the structure.

##### Natural Gas
Natural gas accounts for almost 99% of the gaseous fuel production represented in GCAM's calibration year (2015). The natural gas commodity in GCAM includes all gaseous fuels produced at gas wells, the gaseous co-products from oil production, and gas produced from coal mines and coal seams. The natural gas commodity excludes natural gas liquids, and it excludes gas that is vented, flared, or re-injected. Further information is available in [Mapping the IEA Energy Balances](details_inputs.html#mapping-the-iea-energy-balances) and [IEA (2011)](supply_energy.html#iea2011). In the gas processing sector, the natural gas technology is assigned an input-output coefficient of 1, as natural gas plant fuel is not a disaggregated flow in the IEA energy balances.

##### Coal Gasification
The GCAM coal gasification technology in historical years represents gas works gas, or town gas, that is produced from coal. It does not include blast furnace gas, coke oven gas, and other coal-derived gaseous fuels that are by-products of other activities, and typically consumed on-site. Many regions produced no coal gas in 2010. In future periods, the technology represents a broader suite of coal gasification processes that are capable of producing a commodity that competes for market share with natural gas. See [Linden et al. 1976](supply_energy.html#linden1976) for a review of technologies for producing pipeline-grade gaseous fuels from coal.

##### Biomass Gasification
In historical years, biomass gasification, or biogas, is considered to be gases captured from landfills, sludge, and agricultural wastes, that are used to provide heat and power. As with coal gasification, in future periods, biomass gasification is intended to represent a suite of processes that convert biomass feedstocks into pipeline-grade gaseous fuels that can be used by a variety of end users. For a technical description see [Zwart et al. 2006](supply_energy.html#zwart2006).

##### Gas Pipeline, Delivered Gas, and Wholesale Gas
The gas pipeline sector explicitly represents the energy consumed by compressors for transmission and distribution of natural gas. Delivered gas and wholesale gas are differentiated in their consumers and therefore cost mark-ups; delivered gas refers to gas used by the buildings and transportation sectors, whereas wholesale gas is used by industrial and energy sector consumers. The historical input-output coefficient of the gas pipeline sector in any region is estimated as the sum of reported pipeline energy consumption, delivered gas, and wholesale gas, divided by the sum of delivered gas and wholesale gas.

#### District Services

Heat is included as a final energy carrier in the IEA Energy Balances, and is intended to represent heat sold to third parties. That is, the use of heat and/or steam produced on-site at buildings and factories is simply reported as the energy consumption used to produce the heat and/or steam.

In most regions in GCAM, heat is not explicitly represented as an energy commodity; instead, the reported fuel inputs to heat plants are assigned directly to the end use sectors that consume the heat (buildings and industry). Combined heat and power (CHP) is included as a technology option, but is located within the industrial energy use sector, and no inter-sectoral flow of heat is represented. However, in several regions where purchased heat accounts for a large share of the final energy use, GCAM does include a representation of district heat production, with four competing technology options, as described in [district services](details_energy.html#district-services).

#### Hydrogen

Hydrogen in GCAM is modeled purely as a future energy commodity; while industrial scale volumes of hydrogen are currently produced (e.g., at oil refineries or ammonia plants), the present-day use of hydrogen is almost entirely for non-energy purposes. Hydrogen is not treated as a fuel in the IEA Energy Balances [IEA 2019](supply_energy.html#iea2019), or most other energy statistics. As such, the use of hydrogen as an energy carrier is assumed zero in the base years of GCAM, and starting in 2020 it is allowed to compete for market share supplying heat and power in the industrial sector, and for vehicle fuel in the transportation sector. The representation of hydrogen in GCAM includes 10 production technologies in two production sectors, with cost mark-ups to reflect levelized infrastructural costs, as well as variable transmission and distribution costs. The structure of the hydrogen production and distribution sectors and technologies in GCAM generally uses the structure of the U.S. Department of Energy's Hydrogen Analysis (H2A) models [DOE 2015](supply_energy.html#doe2015). As in the H2A model, the production of hydrogen takes place in two distinct sectors: H<sub>2</sub> Forecourt Production (i.e., on-site generation) and H<sub>2</sub> Central Production. Hydrogen can be produced from natural gas, coal, biomass, nuclear (thermal splitting), and electrolysis (electricity, wind, and solar). See [hydrogen](details_energy.html#hydrogen) for more information.

### Energy Trade

GCAM models trade for coal, gas, oil, and bioenergy using an Armington approach that is described in [fossil fuel trade](details_energy.html#fossil-fuel-trade). Under this approach regions are allowed to choose between domestically produced products or globally traded products when making a consumption decision. This approach allows for the computation of a regionally distinct consumption price for fossil fuels based on the domestic and imported consumption. 

Other primary energy carriers (e.g., solar, wind, geothermal) are not traded and all secondary fuels (e.g., electricity, refined liquids, hydrogen) are not traded inter-regionally. For more generalinformation, see the [discussion of approaches to international trade](details_trade.html).

## Equations 

The equations that determine energy supply are described here. 

### Total technology cost

The total cost for a technology is the sum of the cost of the technology, the cost of its inputs, and any GHG value:

$$
C = t + \sum_{j=1}^{n} i_j + \sum_{k=1}^{m} g_k - \sum_{l=1}^{o} v_l
$$

Where $$C$$ is the total cost, $$t$$$ is the exogenously specified technology cost (capturing capital cost and operating & maintenance costs), $$i_j$$ is the cost of input $$j$$ (e.g., a fuel),  $$g_k$$ is the GHG value of gas $$k$$, and $$v_l$$ is the value of secondary output $$l$$. Costs vary by region, technology, and year. 

See `calcCost` for total cost calculation,  `getTotalInputCost` for the calculation of input costs, and `calcSecondaryValue` for the calculation of secondary values including the GHG value. All three methods are specified in [technology.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/technologies/source/technology.cpp).

### Technology or subsector share

GCAM uses one of [two different logit formulations](choice.html#the-logit) to calculate the shares for each technology or subsector. 

The first option, also known as the `relative-cost-logit`, is:

$$
s_i = \frac{\alpha_i c_i^\gamma}{\sum_{j=1}^{N} \alpha_j c_j^\gamma}
$$

where $$s_i$$ is the share of technology or subsector $$i$$, $$alpha_i$$ is the share weight, $$c_i$$ is the cost of technology or subsector $$i$$, and $$beta$$ is the logit exponent.

The second option, also known as the `absolute-cost-logit`, is: 

$$
s_i = \frac{\alpha_i \exp(\beta c_i)}{\sum_{j=1}^{N} \alpha_j
\exp(\beta c_j)}.
$$

where $$s_i$$ is the share of technology or subsector $$i$$, $$alpha_i$$ is the share weight, $$c_i$$ is the cost of technology or subsector $$i$$, and $$beta$$ is the logit exponent.

See [relative cost logit](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/functions/source/relative_cost_logit.cpp) and [absolute cost logit](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/functions/source/absolute_cost_logit.cpp).

### Renewable resource supply

The specific supply curve in each region for wind and solar is assigned three parameters, detailed in the following equation:

$$
Q = maxSubResource * \frac{P^{CurveExponent} }{ ( {MidPrice^{CurveExponent} + P^{CurveExponent} ) } }
$$

Where Q refers to the quantity of electricity produced, P the price, and the remaining parameters are exogenous, with the names in the XML input files corresponding to the names in the equation above. maxSubResource indicates the maximum quantity of renewable energy that could be produced at any price, curve-exponent is a shape parameter, and mid-price indicates the price at which 50% of the maximum available resource is produced.

See `annualsupply` in [smooth_renewable_subresource.cpp](https://github.com/JGCRI/gcam-core/blob/master/cvs/objects/resources/source/smooth_renewable_subresource.cpp).

## Policy options 
This section summarizes some of the energy-based policy options available in GCAM. 

### Energy production policies

Users can include [energy production policies](policies.html#energy-production-policies), which can constrain energy production or create incentives to increase or decrease production. 

### Energy intensity standards

Users can also include [energy intensity standards](policies_examples.html#res), such as a renewable energy standard.

## Insights and intuition

To be completed...

## IAMC Reference Card

### Energy technology substitution

Energy technology choice
- [ ] No discrete technology choices
- [X] Logit choice model
- [ ] Production function
- [ ] Linear choice (lowest cost)
- [ ] Lowest cost with adjustment penalties

Energy technology substitutability
- [ ] Mostly high substitutability
- [ ] Mostly low substitutability
- [X] Mixed high and low substitutability

Energy technology deployment
- [ ] Expansion and decline constraints
- [X] System integration constraints

### Energy

Electricity technologies
- [X] Coal w/o CCS
- [X] Coal w/ CCS
- [X] Gas w/o CCS
- [X] Gas w/ CCS
- [X] Oil w/o CCS
- [X] Oil w/ CCS
- [X] Bioenergy w/o CCS
- [X] Bioenergy w/ CCS
- [X] Geothermal power
- [X] Nuclear power
- [X] Solar power
- [X] Solar power-central PV
- [X] Solar power-distributed PV
- [X] Solar power-CSP
- [X] Wind power
- [X] Wind power-onshore
- [X] Wind power-offshore
- [X] Hydroelectric power
- [ ] Ocean power

Hydrogen production
- [X] Coal to hydrogen w/o CCS
- [X] Coal to hydrogen w/ CCS
- [X] Natural gas to hydrogen w/o CCS
- [X] Natural gas to hydrogen w/ CCS
- [X] Oil to hydrogen w/o CCS
- [X] Oil to hydrogen w/ CCS
- [X] Biomass to hydrogen w/o CCS
- [X] Biomass to hydrogen w/ CCS
- [X] Nuclear thermochemical hydrogen
- [ ] Solar thermochemical hydrogen
- [X] Electrolysis

Refined liquids
- [X] Coal to liquids w/o CCS
- [X] Coal to liquids w/ CCS
- [X] Gas to liquids w/o CCS
- [X] Gas to liquids w/ CCS
- [X] Bioliquids w/o CCS
- [X] Bioliquids w/ CCS
- [X] Oil refining

Refined gases
- [X] Coal to gas w/o CCS
- [X] Coal to gas w/ CCS
- [X] Oil to gas w/o CCS
- [X] Oil to gas w/ CCS
- [X] Biomass to gas w/o CCS
- [X] Biomass to gas w/ CCS

Heat generation
- [X] Coal heat
- [X] Natural gas heat
- [X] Oil heat
- [X] Biomass heat
- [ ] Geothermal heat
- [ ] Solarthermal heat
- [X] CHP (coupled heat and power)

### Grid Infrastructure

Electricity
- [X] Yes (aggregate)
- [ ] Yes (spatially explicit)

Gas
- [X] Yes (aggregate)
- [ ] Yes (spatially explicit)

Heat
- [X] Yes (aggregate)
- [ ] Yes (spatially explicit)

CO2
- [X] Yes (aggregate)
- [ ] Yes (spatially explicit)

Hydrogen
- [X] Yes (aggregate)
- [ ] Yes (spatially explicit)


## References

<a name="deloitte2008">[Deloitte 2008]</a> Deloitte Development LLC, 2008, *Geothermal Risk Mitigation Strategies Report*, prepared for Department of Energy, Office of Energy Efficiency and Renewable Energy, Geothermal Program. [Link](https://www1.eere.energy.gov/geothermal/pdfs/geothermal_risk_mitigation.pdf)

<a name="dooley2009">[Dooley and Dahowski 2009]</a> Dooley, J.J., and Dahowski, R.T. 2009. Large-scale U.S. unconventional fuels production and the role of carbon dioxide capture and storage technologies in reducing their greenhouse gas emissions. *Energy Procedia* 1(1), pp. 4225-4232. [Link](http://www.sciencedirect.com/science/article/pii/S1876610209008765)

<a name="enerdata2014">[Enerdata 2014]</a> Enerdata, 2016. *The Future of Gas-to-Liquid (GTL) Industry*. [Link](http://www.enerdata.net/enerdatauk/press-and-publication/energy-news-001/future-gas-liquid-gtl-industry_29879.html)

<a name="eurek2017">[Eurek et al. 2017]</a> Eurek, K., P. Sullivan, M. Gleason, D. Hettinger, D. Heimiller, A. Lopez (2017). An improved global wind resource estimate for integrated assessment models. Energy Economics, 64.

<a name="glebova2013">[Glebova 2013]</a> Glebova, O. 2013. *Gas to Liquids: Historical Development and Future Prospects*, Report NG 80, Oxford Institute for Energy Studies. [Link](https://www.oxfordenergy.org/wpcms/wp-content/uploads/2013/12/NG-80.pdf)

<a name="gregg2010">[Gregg and Smith 2010]</a> Gregg, J.S., and Smith, S.J. Global and regional potential for bioenergy from agricultural and forestry residue biomass. *Mitigation and Adaptation Strategies for Global Change* 15(3), pp 241-262. [Link](http://link.springer.com/article/10.1007/s11027-010-9215-4)

<a name="hannam2009">[Hannam et al. 2009]</a> Hannam, P., Kyle, P., and Smith, S.J. 2009. *Global Deployment of Geothermal Energy Using a New Characterization in GCAM 1.0*, PNNL-19231, Pacific Northwest National Laboratory. [Link](http://www.pnl.gov/main/publications/external/technical_reports/PNNL-19231.pdf)

<a name="iea2011">[IEA 2011]</a> International Energy Agency, 2011, *Energy Balances of OECD Countries: Documentation for Beyond 2020 Files*, International Energy Agency, Paris, France. [Link](http://wds.iea.org/wds/pdf/documentation_OECDBAL_2011.pdf)

<a name="iea2012">[IEA 2012]</a> International Energy Agency, 2011, *Energy Balances of OECD Countries 1960-2010 and Energy Balances of Non-OECD Countries 1971-2010*, International Energy Agency, Paris, France. [Link](http://www.iea.org/bookshop/661-Energy_Balances_of_OECD_Countries)

<a name="iea2019">[IEA 2019]</a> International Energy Agency, 2019, *Energy Balances of OECD Countries 1960-2017 and Energy Balances of Non-OECD Countries 1971-2017*, International Energy Agency, Paris, France. 

<a name="iha2000">[IHA 2000]</a> International Hydropower Association, et al., 2000, *Hydropower and the World's Energy Future*. [Link](http://www.ieahydro.org/media/ffab53b0/Hydropower%20and%20the%20World's%20Energy%20Future%20.pdf)

<a name="linden1976">[Linden et al. 1976]</a> Linden, H.R., Bodle, W.W., Lee, B.S., and Vyas, K.C. 1976. Production of high-btu gas from coal. *Annual Reviews of Energy* 1, pp. 65-86. [Link](http://www.annualreviews.org/doi/pdf/10.1146/annurev.eg.01.110176.000433)

<a name="zwart2006">[Zwart et al. 2006]</a> Zwart, R., Boerrigter, H., Deurwaarder, E.P., van der Meijden, C.M., and van Paasen, S.V.B. 2006. *Production of Synthetic Natural Gas (SNG) from Biomass: Development and operation of an integrated bio-SNG system*. Report ECN-E-06-018, Energy Research Centre of the Netherlands. [Link](https://www.ecn.nl/docs/library/report/2006/e06018.pdf)
