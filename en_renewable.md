---
layout: index
title: Renewable Energy Resources
next: en_transformation.html
current-version: v4.2 
---

GCAM's renewable resources include wind, solar, geothermal, hydropower, and biomass; some regions are also assigned a "traditional biomass" resource. In contrast to the depletable resources, whose cumulative stocks are explicitly tracked, renewable resource quantities in GCAM are always indicated in terms of annual flows. Wind, solar, geothermal, and hydropower are considered only as options for producing electricity, and are not traded between regions. Traditional biomass is only used by the buildings sector in selected regions. Of the six renewable energy resources, only biomass is (a) traded globally, and (b) used as an energy form or feedstock in a wide variety of sectors.

In general, the costs of producing electricity from renewable energy forms consist of the sum of the resource costs described here, the technology costs, and in some cases, backup-related costs. The latter two components to the costs are documented in the [electricity sector](electricity.html).

## Wind

All regions are assigned a wind energy supply curve, where the quantity is in exajoules (EJ) of electricity produced per year, and the price is in 1975$ per gigajoule (GJ) of electricity produced. Unlike fossil resources, uranium, or biomass, the quantities of wind energy are considered to be within "regional" markets; they can not be traded between the different modeled geopolitical regions. The specific supply curve in each region is assigned three parameters, detailed in the following equation:

$$
Q = maxSubResource * \frac{P^{CurveExponent} }{ ( {MidPrice^{CurveExponent} + P^{CurveExponent} ) } }
$$

Where Q refers to the quantity of electricity produced, P the price, and the remaining parameters are exogenous, with the names in the XML input files corresponding to the names in the equation above. maxSubResource indicates the maximum quantity of wind energy that could be produced at any price, curve-exponent is a shape parameter, and mid-price indicates the price at which 50% of the maximum available resource is produced. The supply curves in each region are derived from bottom-up analysis documented in [Zhou et al. (2012)](en_refs.html#zhou2012). Note that in this supply curve formulation, the price is zero when the quantity is zero; this is becase the costs in the resource supply curve only reflect the portion of the wind energy costs that increase with deployment. The remainder of the costs are in the technology and backup, described in the [electricity sector](electricity.html).

![Figure 1](gcam-figs/wind.jpeg)
Figure 1: Global gridded potential for wind electricity generation.
{: .fig}

## Solar

Solar energy is modeled as two separate resources: "global solar resource" and "distributed_PV", where the latter refers only to photovoltaic installations on residential and commercial buildings. As with wind, both of these resources are indicated in terms of electricity production. Global solar resource is modeled as an unlimited resource, and with a very low price; unlike with wind, it is assumed that marginal resource-related costs do not escalate with deployment levels. The technology and backup-related costs are documented in the [electricity sector](electricity.html).

The "distributed_PV" supply curve is of the same functional form as the wind supply curve, with an upward-sloping function designed to capture the increases in costs with deployment. In the USA region, the distributed_PV supply curve is estimated from data compiled by [Denholm (2008)](en_refs.html#denholm2008). The curve-exponent is assumed the same in all other regions, the mid-prices are adjusted according to the irradiance in each region, and the maxSubResources are adjusted according to the estimated building floorspace.

## Geothermal

Modeling of geothermal energy in GCAM is documented in [Hannam et al. (2009)](en_refs.html#hannam2009). Like wind and solar, geothermal energy is only used in GCAM as a source of electricity production, but the quantities in the resource supply curves are indicated in terms of EJ of heat input to power plants, estimated as 10 times the quantity of electricity generated. This 10% thermo-electric efficiency is a bit lower than most regions where it has been estimated, but is the [IEA's (2011)](en_refs.html#iea2011) default assumption. The supply curves in each region are graded, similar to the fossil resource curves but with the exception that the quantities refer to annual flows, not cumulative stocks. As with wind and solar, the supply curves are intended to capture only the portion of the costs of producing geothermal electricity that escalate with deployment, with the remainder of the costs in the corresponding technologies of the electricity sector. In the four phases of geothermal electricity production identified by [Deloitte (2008)](en_refs.html#deloitte2008), the supply curves in GCAM include identification, exploration, and drilling, but not production.

An additional XML file with Enhanced Geothermal Resources (EGS) is included with the standard GCAM input fileset, but is not included in the default configuration file. EGS expands the geothermal resource base significantly, albeit at higher costs, but is excluded from the default configuration due to the uncertainties about the future availability, effectiveness, and potential costs and risks of the technology.

## Hydropower

Hydropower is the simplest of all energy forms in GCAM; the quantity of hydropower produced in each region and year is exogenous, prescribed as a "fixedOutput". Hydropower costs are not estimated, and the technology does not contribute to the modeled electricity price in each region. The quantities in future years are generally consistent with the long-term "economic" potential identified by the International Hydropower Association [(IHA 2000)](en_refs.html#iha2000).

## Biomass

While most of the effort in modeling biomass supply is in the [agriculture and land use component](aglu.html), there is a renewable resource represented in the energy system, that generally refers to municipal and industrial wastes that can be used for energy purposes. The supply curves use the same functional form as printed in the Wind section above, and the specific quantities are documented in [Gregg and Smith (2010)](en_refs.html#gregg2010). Unlike other resources, the waste biomass supply curve is assumed to grow with GDP, as prescribed by the exogenous supply elasticity of GDP, or "gdpSupplyElast".

## Traditional biomass

Traditional biomass in GCAM is defined as the IEA's "primary solid biomass" product consumed by the residential sector, in selected regions where it is considered to be an important part of the energy system. The largest consumers of traditional biomass in 2010 were China, India, and Western Africa. The specific energy goods involved include firewood, agricultural residues, animal dung, and others; no effort is made to disaggregate the category into these consistuent parts, or to link the production volumes with the agriculture and land use module.


