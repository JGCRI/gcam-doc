---
layout: index
title: Agriculture, Land-Use, and Bioenergy
gcam-version: v3.2 
---

Land-use and land-use change, for agriculture, forestry, and other
uses, are key to understanding future scenarios of global change and
emissions mitigation. Land-use has been one of the largest
anthropogenic sources of emissions of greenhouse gases, aerosols and
short-lived species. The conversion of grasslands and forests to
agricultural land results in a net emission of CO2 to the
atmosphere. This conversion has been the largest of all sources of
anthropogenic land use emissions historically. In the future, biomass
energy crops could compete for agricultural land with traditional
agricultural crops, linking land-use more directly with the energy
system. Efforts to capture carbon in terrestrial reservoirs, such as
forests, may place a damper on deforestation activities, and
potentially lead to afforestation or reforestation
activities. Interactions with crop prices may also prove
important. Since land is limited, increasing the demand for land
either to protect forests or to plant bioenergy crops could put upward
pressure on crop prices that would not otherwise occur.

To capture these dynamics, GCAM includes a completely integrated model
that allocates the land area for each of GCAM’s regions among
different land uses, tracks production from these uses, and tracks
carbon flows into and out of terrestrial reservoirs. The GCAM
agriculture, land use, land cover, terrestrial carbon cycle module
determines the demands for and production of products originating on
the land, the prices of these products, the allocation of land to
competing ends, the rental rate on land, and the carbon stocks and
flows associated with land use.

The Agriculture and Land Use Model (AgLU)
-----------------------------------------

The GCAM-3 agriculture and land use model is described in detail in
two technical reports. The first addresses the economic approach,
math, and code:
[GCAM3AGLUDocumentation.pdf](https://wiki.umd.edu/gcam/images/8/87/GCAM3AGTechDescript12_5_11.pdf). The
second report describes the data, including all source data used and
detailed descriptions of the methods of data processing:
[GCAM3AGLUDataDocumentation.pdf](http://wiki.umd.edu/gcam/images/2/25/GCAM_AgLU_Data_Documentation.pdf). The
remainder of this section provides a summary of the information
contained in these reports.

An [economic land sharing](Economic_land_sharing.html) approach is
used to allocate land between alternative uses based on expected
profitability, which in turn depends on the productivity of the
land-based product (e.g. mass of harvestable product per ha), product
price, and non-land costs of production (labor, fertilizer, etc.). The
allocation of land types takes place in the model through global and
regional markets for agricultural products. These markets include
those for raw agricultural products as well as those for intermediate
products such as poultry and beef. Demands for most agricultural
products, with the exception of biomass products, are based primarily
on income and population. Land allocations evolve over time through
the operation of these markets, in response to changes in income,
population, technology, and prices.

The boundary between managed and unmanaged ecosystems is assumed to be
elastic in the GCAM. The area of land under cultivation expands and
contracts with the land rental rate. Thus, increased demands for land
result in higher rental rates and expansion into unmanaged ecosystems
and vice versa.

Competition between alternative land uses in the GCAM is modeled using
a [nested logit architecture](Nested_logit_architecture.html). A
representative, simplified nnesting structure is depicted in Figure 1.

![](images/Land_small.png "fig:Land small.png")&lt;br&gt;

###### Figure 1. Competition for Land in GCAM

The costs of supplying agricultural products are based on regional
characteristics, such as the productivity of land and the variable
costs of producing the crop. Exogenous assumptions are made for the
rate of increase in agricultural productivity. The productivity of
land-based products is subject to change over time based on future
estimates of crop productivity change.

Agricultural productivity change is aggregated by GCAM region and
commodity from the FAO CROSIT database, which has 108 countries and 34
commodities. We aggregate the data for irrigated, rainfed, and total
agricultural production, harvested area, and yields, but at present we
only use the total. The projection years are 2005 (base year), 2030,
and 2050, which allows annual productivity change rates to be
calculated for each region and crop. These projections are not
downscaled to AEZs, and at present there is no effort to differentiate
yield improvements by AEZ within region. In the future this could be
worth investigating. At present, the core model applies the median
improvement rate across all crops within each region to each crop,
rather than using the crop-specific yield improvements described
above. This is done in order to minimize the economic distortions of
differentiated yield (and therefore profit) increases. The same rate
is applied to biomass as to other crops, though this and all other
rates of change could be specified differently by scenario.


The AEZs within each of the 14 geopolitical GCAM regions are based on
the research developed for the GTAP model using SAGE land use
categories&lt;ref&gt;Monfreda, C., N. Ramankutty and T. W. Hertel
(2007). Global Agricultural Land Use Data for Climate Change
Analysis. in Economic Analysis of Land Use in Global Climate Change
Policy. T. W. Hertel, S. Rose and R. S. J. Tol,
Routledge.&lt;/ref&gt;: the combination of regions and AEZs resulting
in 151 distinct GCAM agriculture and land use subregions covering the
globe. Within each of these 151 subregions, land is categorized into
approximately a dozen types based on cover and use. Some of these
types, such as tundra and desert, are not considered arable. Among
arable land types, further divisions are made for lands historically
in non-commercial uses such as forests and grasslands as well as
commercial forestlands and croplands. Production of approximately
twenty crops is currently modeled, with yields of each specific to
each of the 151 subregions. The model is designed to allow
specification of different options for future crop management for each
crop in each subregion.

&lt;br&gt;Historical land use allocation is based on data from HYDE&lt;ref&gt;<https://www.gtap.agecon.purdue.edu/resources/res_display.asp?RecordID=1900%3C/ref%3E> for cropland, urban land, tundra, and rock/ice/desert. Managed forest and managed pasture land are calculated in each time period based on each region's annual production, disaggregated to AEZ's according to the estimated production of each AEZ.&nbsp;Unmanaged forest, unmanaged pasture, grassland, and shrubland are compiled from the HYDE data, with forest and pasture calculated as their respective values minus the managed forms in each of these lands. Historical agricultural production and harvested cropland area are taken from the [FAOSTAT](http://www.faostat.fao.org) database for 1990 and 2005, disaggregated to the AEZ level on the basis of production and harvested area in the GTAP data. Cropping systems are divided into nine food categories (rice, wheat, corn, other grains, oil crops,sugar crops, palm fruit, roots &amp; tubers, and miscellaneous crops) and animal production is represented by five categories (beef, dairy, pork, poultry, and other ruminants). The characterizations of animal production technologies are based on IMAGE data; subsectors are “mixed” and “pastoral”, and inputs to the systems are (1) fodder herbs and crop residues; (2) pasture and foddergrass; (3) feedcrops; and (4) scavenging and other. Under this categorization, animal feed is supplied both by pasture land and by grain and fodder crops and thus future demand for animal products impacts land allocation in GCAM. &lt;br&gt;

&lt;br&gt;The composition of SAGE’s 14 natural vegetation classifications is calculated in each region and AEZ for each of the five GCAM natural vegetation categories. Specifically, GCAM’s forest includes 8 SAGE categories, grassland includes 2, shrubland includes 2, tundra includes 1, and rock/ice/desert includes 2.&nbsp;Next, carbon contents are assigned to each of the SAGE 14 natural vegetation types, based on literature estimates&lt;ref&gt;Houghton, R.A. 1999. The annual net flux of carbon to the atmosphere from changes in land use 1850-1990. Tellus 51B: 298-313.&lt;/ref&gt;&lt;ref&gt;King, A. W., Post, W. M., and Wullschleger, S. D. 1997. The potential response of terrestrial carbon storage to changes in climate and atmospheric CO2. Climatic Change, 35(2), 199–227. Springer. Retrieved March 9, 2011, from <http://www.springerlink.com/index/K528446L38325833.pdf>.&lt;/ref&gt;&lt;ref&gt;Olson J.S., Watts J.A. and Allinson L.J. 1983 Carbon in Live Vegetation in Major World Ecosystems. Environmental Sciences Division Publication No. 1997. Oak Ridge National Laboratory, Tennessee.&lt;/ref&gt;.&nbsp;The carbon density of each region/AEZ/GCAM land type is calculated as the weighted average of the carbon contents of the SAGE natural vegetation types within the GCAM natural vegetation types, for each region and AEZ. For instance, GCAM forest in USA AEZ 9 is 53% temperate needleleaf evergreen forest, 12% temperate deciduous forest, 1% boreal evergreen forest, and 34% mixed evergreen/deciduous forest. Therefore the average carbon content of USA AEZ 9 forest is (160)(0.53) + (135)(0.12) + (90)(0.01) + (103)(0.34) = 137 MgC/ha, or 13.7 kgC/m2. Similar calculations are used for vegetation carbon contents for forest, grassland, shrubland, tundra, and rock/ice/desert.&nbsp;

&lt;br&gt;

Unmanaged pasture vegetation carbon contents are set equal to the region/AEZ’s corresponding SAGE grassland carbon contents. Managed pasture carbon contents are set equal to one half of unmanaged pasture carbon contents.&nbsp;Managed forest vegetation carbon contents are set equal to one half of the unmanaged forest carbon contents. See below for derivation and justification of managed forest land allocation and carbon contents.&nbsp;Cropland vegetation carbon contents are calculated based on yields, crop moisture contents, and harvest indices.

&lt;br&gt;

Bioenergy Production
--------------------

The supply characteristics of biomass are derived from the land-use
model. The demand for biomass is derived endogenously from the energy
component of the model. For example, the larger the value of carbon,
the more valuable biomass is as an energy source and the greater the
price the energy markets will be willing to pay for
biomass. Conversely, as populations grow and incomes increase,
competing demands for land may drive down the amount of land that
would be available for biomass production at a given price.

There are several types of bioenergy resources in GCAM, including the
following: traditional bioenergy production and use, bioenergy from
residues and waste products, bioenergy from crops traditionally grown
for food, and purpose-grown bioenergy crops. Traditional bioenergy
consists of straw, dung, fuel wood and other energy forms that are
utilized in an unrefined state in the traditional sector of an
economy. Traditional bioenergy use, although significant in developing
nations, is a relatively small component of global energy. Traditional
biomass is modeled as becoming less economically competitive as
regional incomes increase over the century.

Bioenergy from residue and waste products are fuels that are consumed
in the modern sectors of the economy, but which are byproducts of
another activity. Examples in the model include forestry and milling
by-products, crop residues in agriculture, and municipal solid
waste. The availability of byproduct energy feedstocks is determined
by the underlying production of primary products and the cost of
collection. The total potential agricultural waste available is
calculated as the total mass of the crop less the portion that is
harvested for food, grains, and fibers, and the amount of biomass
needed to prevent soil erosion and nutrient loss and sustain the land
productivity. The amount of potential waste that is converted to
bioenergy is based on the price of bioenergy. However, the bioenergy
price does not affect production of the crop from which the waste is
derived. For example, an increase in the price of bioenergy would
increase the share of the wheat crop collected for use as bioenergy,
but the higher bioenergy price would not affect the total production
of wheat. Instead, the higher bioenergy price would result in higher
purpose-grown energy crops.

GCAM models the production of biofuels resources that are already
widely used, such as sugar and starch based ethanol production from
conventional food crops such as corn and sugar, as well as biodiesel
from oil crops such as soybeans and palm. While these sources may be
surpassed by cellulosic biofuels in the future, they will likely
continue to be an important part source of energy going forward into
the next several decades. The regional production and land use
requirements of these crops is modeled in GCAM along with production
and land use demands from all agriculture products and forestry such
as food crops and wood. Most of these crops are already grown at large
scales for food and other uses around the world. For these bioenergy
resources, crop yields are readily available and can be computed for
each subregional AEZ from historical production and land use areas. As
a result, modeling these the supply of these crops as bioenergy
resources does not present any additional burden on the GCAM
agriculture and land use modeling. All that is required for modeling
is that links are made to refining sectors and technologies in the
GCAM energy system.

Purpose-grown bioenergy refers to crops whose primary purpose is the
provision of energy. These would include, for example, lignocellulosic
crops such switchgrass, miscanthus, and woody poplar, as well as oil
crops such as jatropha. The profitability of purpose-grown,
“second-generation” bioenergy depends on the expected profitability of
raising and selling that crop relative to other land-use options in
GCAM. This in turn depends on numerous other model factors including:
bioenergy crop productivity (which in turn depends on the character of
available land as well as crop type and technology), non-energy costs
of crop production, cost and efficiency of transformation of
purpose-grown bioenergy crops to final energy forms (including
liquids, gases, solids, electricity, and hydrogen), cost of
transportation to the refinery, and the price of final energy
forms. The price of final energy forms is determined endogenously as a
consequence of competition between alternative energy resources,
transformation technologies, and technologies to deliver end-use
energy services. In other words, prices are determined so as to match
demand and supplies in all energy markets.

A variety of crops could potentially be grown as bioenergy
feedstocks. The productivity of those crops will depend on where they
are grown—which soils they are grown in, climate characteristics and
their variability, whether or not they are fertilized or irrigated,
the availability of nitrogen and other minerals, ambient CO2
concentrations, and their latitude. In this analysis we assume that a
generic bioenergy crop, with characteristics similar to switchgrass,
can be grown in any region. Productivity is based on region-specific
climate and soil characterizes and varies by a factor of three across
the GCAM regions.

GCAM allows for the possibility that bioenergy could be used in the
production of electric power and in combination with technologies to
provide CO2 emissions captured and stored in geological reservoirs
(CCS). This particular technology combination is of interest because
bioenergy obtains its carbon from the atmosphere and if that carbon
were to be captured and isolated permanently from the atmosphere the
net effect of the two technologies would be to produce energy with
negative CO2 emissions&lt;ref&gt;Luckow, P., M.A. Wise, J.J. Dooley,
and S.H. Kim. 2010. Large-scale utilization of biomass energy and
carbon dioxide capture and storage in the transport and electricity
sectors under stringent CO2 concentration limit
scenarios. International Journal of Greenhouse Gas Control 4: 865-877.


Land Policy in GCAM
-------------------

GCAM has the capability to run several different types of land
policies, including protected land cases, terrestrial pricing
strategies, bioenergy taxes, bioenergy subsidies, and bioenergy
constraints. These policies will have differing effects on energy use,
land use, energy prices, food prices, CO2 emissions, non-CO2
emissions, and the cost of mitigation. Calvin et al. (2013) explores
the trade-offs of these policies.

### Protected land cases

In these cases, we set aside various amounts of non-commercial ecosystems, preventing expansion of crops and bioenergy into these lands. We have explored various levels of protection, varying from 10% to 100% of the non-commercial land area. We have also examined protecting only forests and expanding the protection to other non-commercial ecosystems (e.g., grassland, shrubs). &lt;b&gt;&lt;i&gt;The current default land policy in GCAM is to protect 90% of all non-commercial ecosystems.&lt;/i&gt;&lt;/b&gt;

### Terrestrial pricing strategies

Efficient climate policies are those that apply an identical price to
greenhouse gas emissions wherever they occur. Hence, an efficient
policy is one that applies identical prices to land use change
emissions and fossil and industrial emissions. Theoretically, carbon
in terrestrial systems can be priced using either a flow or a stock
approach. The flow approach is analogous to the pricing generally
discussed for emissions in the energy sector: landowners would receive
either a tax or a subsidy based on the net flow of carbon in or out of
their land. If they cut down forest to grow bioenergy crops, then they
would pay a tax on the CO2 emissions from the deforestation. In
contrast, the stock approach applies a tax or subsidy to landowners
based on the carbon content of their land. If the carbon content of
the land changes, for example, by cutting forests to grow bioenergy
crops, then the tax or subsidy that the landowner receives is adjusted
to represent the new carbon stock in the land. The stock approach can
be viewed as applying a “carbon” rental rate on the carbon in
land. Both approaches have strengths and weaknesses. Real-world
approaches may not be explicitly one or the other. When terrestrial
pricing strategies are enabled in GCAM, the stock approach is used.

### Bioenergy taxes, subsidies, and constraints

We can impose taxes, subsidies or constraints (upper or lower bounds)
on bioenergy. In the case of constraints, the GCAM solver will compute
the tax or subsidy needed to ensure the constraint is met.


Fertilizer
----------

A full nitrogen (N) fertilizer module has been developed for GCAM,
with production technologies in each region consistent with available
data on ammonia production, and consumption downscaled to region,
crop, and AEZ. In GCAM, N fertilizer is indicated in mass of fixed
N. Production and consumption by country (and therefore region) are
from FAO ResourceSTAT (FAOSTAT 2011a), with production totals
uniformly adjusted downwards so that the global total is equal to
global total consumption, excluding non-agricultural uses of N
fertilizer. Production by technology is from IEA (2007), which
indicates both the shares of the different production technologies
used in each of eleven global regions, in addition to the energy
intensity of the technologies used in each region. Consumption by
region is first downscaled to crops according to a dataset put
together by the International Fertilizer Industry Association (IFA)
working in collaboration with the FAO (Heffer 2009), and then
downscaled to AEZ on the basis of crop production, with the
downscaling in the USA informed by detailed fertilizer use data from
the USDA. Non-fuel costs of fertilizer production by natural gas steam
reforming are calculated to return observed market prices in base
years, with non-energy costs of all other technologies based on their
respective technologies in the H2A model. Fertilizer input-output
coefficients (kgN per kg crop) are held constant in all future
periods, allowing future fertilizer demand to scale linearly with any
assumed improvements in yields.

### Fertilizer Mass Balances and Trade

The FAO maintains a historical time series of fertilizer production
and consumption in all countries, in terms of total N. The production
data includes non-agricultural use of fertilizers, and as such is 5 -
10% higher than the global consumption quantities, which include only
fertilizer used for agricultural purposes. In GCAM we are only
concerned with the fertilizer produced for agriculture, so all
production in all regions is uniformly adjusted downwards so that
global production and consumption balance. Due to the large volume of
trade in the base year—the Soviet Union, for example, exports greater
than 80% of the fertilizer it produces —GCAM does include trade in
fertilizer, though in the same simple, exogenous fashion as trade in
meat is modeled. Exporting regions are assigned an additional final
demand with a fixed output for the duration of the model run, and
importing countries are assigned an additional production technology
that consumes no energy input.

References
----------

&lt;references /&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;

&lt;br&gt;
