---
layout: index
title: Global Change Assessment Model (GCAM)
gcam-version: v5.1
---

One of GCAM's uses is to explore the implications of different future policies. There are a number of types of policies that can be easily modeled in GCAM. The most common of these are discussed below.

## Emissions-Related Policies
There are three main policy approaches that can be applied in GCAM to reduce emissions of CO2 or other greenhouse gases: carbon or GHG prices, emissions constraints, or climate constraints. In all cases, GCAM implements the policy approach by placing a price on emissions. This price then filters down through all the systems in GCAM and alters production and demand. For exammple,a price on carbon would put a cost on emitting fossil fuels. This cost would then influence the cost of producing electricity from fossil-fired power plants that emit CO2, which would then influence their relative cost compared to other electricity generating technologies and increase the price of electricity. The increased price of electricity would then make its way to consumers that use electrcity, decreasing its competitiveness relative to other fuels and leading to a decrease in electricity demand. The three policy approaches are described below.

* Carbon or GHG prices: GCAM users can directly specify the price of carbon or GHGs. Given a carbon price, the resulting emissions will vary depending on other scenario drivers, such as population, GDP, resources, and technology.

* Emissions constraints. GCAM users can specify the total amount of emissions (CO2 or GHG) as well. GCAM will then calculate the price of carbon needed to reach the constraint in each period of the constraint.

* Climate constraints: GCAM users can specify a climate variable (e.g., concentration or radiative forcing) target for a particular year. Users determine whether that target can be exceeded prior to the target year. GCAM will adjust carbon prices in order to find the least cost path to reaching the target. (Note that this type of policy increases model run time significantly.)

## Energy Production Policies
There are times in which users would like to explore the implications of a constraint on production or a minimum production requirement. This capability allows GCAM users to model policies such as renewable portfolio standards and biofuels standards. Across sectors, these constraints must be applied as quantity constraints, but they can be applied as share constraints within individual sectors (e.g., fraction of electricity that comes from solar power). In implementing these policies, users This can either be a lower bound or upper bound. The model will solve for the tax (upper bound) or subsidy (lower bound) required to reach the given constraint.

## Land-Use Policies
There are a number of ways that policies can be applied directly to influence the land sector in GCAM. These include the following.

* Protected Lands: With this policy, GCAM users can set aside a fraction of natural land, removing it from economic competition. This land cannot be converted to crops, pasture, or any other land type. This is similar to real-world policies such as reducing emissions from deforestation and forest degradation (REDD). The default in GCAM is to protect 90% of all non-commercial ecosystems.

* Valuing carbon in land: When applying a price on carbon through any of the emissions-related policy approaches, GCAM users can choose whether that price extends to land use change CO2 emissions. This policy is modeled as a subsidy to land-owners for the holding carbon stocks as opposed to a price on the emissions themselves.

* Bioenergy constraints: GCAM users can impose constraints on bioenergy within GCAM. Under such a policy, GCAM will calculate the tax or subsidy required to ensure that the constraint is met. By default a bioenergy constraint in GCAM is imposed based on the amount of subsidy available for net negative emissions.

## Calculating Emissions Policy Costs
GCAM can be used to make an estimate of the economic costs of a climate policy. The cost metric used is the area under the marginal abatement cost (MAC) curve. This area under the MAC curve commonly referred to as “deadweight loss” (i.e., the change in producer and consumer surplus.) Currently, we are not modeling this cost as affecting GDP in GCAM.
