---
layout: index
title: The GCAM Water Module
prev: aglu.html
next: hector.html
gcam-version: v5.2
---

## Water Demand

Based on contributions of a number of GCAM developers and collaborators, GCAM now represents water demands throughout the energy and agricultural systems. The types of water flows represented include the following:

* **water withdrawals**: water diverted or withdrawn from a surface water or groundwater source ([Vickers 2001](water.html#vickers2001)).
* **water consumption**: water use that permanently withdraws water from its source; water that is no longer available because it has evaporated, been transpired by plants, incorporated into products or crops, consumed by people or livestock, or otherwise removed from the immediate water environment ([Vickers 2001](water.html#vickers2001)).
* **biophysical water consumption**: total water required for crop evapo-transpiration; the sum of "blue" and "green" water in [Mekonnen and Hoekstra 2011](water.html#mekonnen2011)
* **seawater**: water from the oceans, including brackish estuaries, that is withdrawn for cooling thermo-electric power plants, or used in primary energy production.

Water demand representations have been constructed for six major sectors: agriculture, electrity generation, industrial manufacturing, primary energy production, livestock, and municipal uses. Municipal water demands are represented in a specific "municipal water" sector, but all other water demands are modeled as inputs to otherwise existing technologies in the energy and AgLU systems. The sectors relevant for water demands are described below.

### Agriculture
Water demands of agriculture in GCAM have been documented in [Chaturvedi et al. 2015](water.html#chaturvedi2015) and [Hejazi et al. 2014](water.html#hejazi2014), but the present version of GCAM includes a number of updates from the methods documented therein. As indicated in the [AgLU documentation](aglu.html), crop production in each of GCAM's regions is subdivided into the following explicitly modeled categories relevant for water demands: crop type, water basin, and whether the production system is irrigated or rainfed. The water demand estimates are built up from gridded (for 18 crops) and nation-level (for the remaining ~150 crops) "water footprint" estimates of [Mekonnen and Hoekstra 2011](water.html#mekonnen2011).

Irrigated crop production tracks three types of water demands identified above: water withdrawals, water consumption, and biophysical water consumption. Here, "water withdrawals" refer to irrigation water applied to agricultural fields, and include evapo-transpiration requirements of crops that are met by irrigation water (i.e., "blue water"), plus any "field losses" of water. Note that upstream "conveyance losses"--i.e., water that leaks or evaporates from distribution canals--are represented in the water transport and distribution sectors, not in the crop technologies. The loss coefficients for conveyance and field losses are from the country-level estimates of [Rohwer et al. 2007](water.html#rohwer2007). For irrigated crops, "water consumption" refers to the evapo-transpiration requirements of the crops that is met by irrigation water (i.e., "blue water"). Both water withdrawals and consumption exclude rainfall-derived water ("green water") consumed by crops grown in irrigated systems. "Biophysical water consumption", which applies equally to rainfed and irrigated technologies within any basin and crop type, is the sum of blue and green water requirements. It excludes any field or conveyance losses.

The input data pertaining to water requirements of crop production address a single time slice, of around the year 2000, and are based on historical climatic conditions. In the historical model time periods, water demand coefficients of any crop production technology may fluctuate due to compositional shifts within multi-crop commodities, and/or due to geographic shifts in the production in any multi-country land use regions. In future time periods, all water demand coefficients for agriculture and crop production are held constant.

### Electricity Generation
The general approach and data sources used for power sector water demands are documented in [Davies et al. 2013](water.html#davies2013), and [Kyle et al. 2013](water.html#kyle2013). In these initial studies, however, each region and generation technology was exogenously assigned water withdrawal and consumption coefficients that were based on assumptions about shares of different cooling system types in each region and time period. In the present version of GCAM, each cooling system type is modeled explicitly and the choice of cooling options can change over time in response to the cost of water use.

GCAM represents up to five cooling options for each thermo-electric power generation technology: once-through, recirculating, cooling pond, dry cooling, and once-through with seawater. These specific cooling technologies, described in [NETL 2008](water.html#netl2008), differ significantly in both water withdrawal and water consumption requirements. The specific water demand coefficients assigned to each power generation and cooling technology are from [Macknick et al. 2011](water.html#macknick2011). Note that not all five cooling system options are available for each power plant technology in each region; for example, cooling ponds were often excluded from underlying inventory estimates, and as such are excluded from some regions and generation technologies. Similarly, at present there is no "dry cooling" option represented for the current generation of thermal nuclear power plants.

Cooling system options compete in a calibrated logit nest, similar to the competition between fuels within this sector. The capital costs are from [NETL 2008](water.html#netl2008) and vary across cooling options. Electric generation efficiencies of dry-cooled power plants are lower than the other cooling options that utilize water. The competition between cooling system options is endogenous and cost-based. When water supply constraints are not imposed or when water prices and scarcity is low, the model output tends to largely reflect the exogenous share-weight assumptions, which follow the assumptions and logic of [Davies et al. 2013](water.html#davies2013). On the other hand, when water supply constraints are imposed and regional water scarcity escalates, the cost of water use directly affects the choice of cooling system.
Most regions shift from once-through to recirculating systems over time, but regions that use primarily seawater at present are assumed to continue to do so in all future time periods. 

Note that because of the limits to the supplysector/subsector/technology structure of the energy system technologies in GCAM, this additional "cooling system" level of nesting is achieved through the use of “pass-through” technologies and sectors. This strategy is also used to create the transportation sector's multi-level nested structure, which includes modes, sub-modes, vehicle size classes, and fuel drivetrains. To help with interpretation of the model output, the electric sector queries have been written to report these cooling system technologies under the "electricity" sector, but the raw input XML files and model output nevertheless have the fully disaggregated structure.

### Industrial Manufacturing
The industrial manufacturing sector's water demands include surface and groundwater that is self-supplied by industrial manufacturers. The water demanded by this sector excludes water demands of coal mining and oil and gas production, which are represented in the respective energy production sectors. It also excludes water withdrawn for cooling of on-site (i.e., located at industrial facilities) thermo-electric power generation, which is modeled in the electricity generation sector. Finally, industrial facilities' use of municipal water is also excluded (modeled in the municipal water sector). Note that the definitional bounds differ from the "industrial water withdrawals" in [FAO Aquastat](water.html#fao2016), in that the latter includes the electric power sector.

The main data source used for estimating the manufacturing sector's water consumption is the [Vassolo and Döll 2005](water.html#vassolo2005) global inventory of manufacturing and electric power water demands for a base year of 1995. The manufacturing water demands of each country are multiplied by an exogenous ratio of self-supply to total industrial withdrawals (about 0.8; this comes from US-specific data in [Kenny et al. 2009](water.html#kenny2009)), and extrapolated to all historical years assuming a fixed ratio between industrial electricity and water demands. The values estimated from this bottom-up calculation are limited to a maximum of 85% of the corresponding nation and year's estimate of industrial water withdrawals in [FAO Aquastat](water.html#fao2016). Note that in contrast to the methods documented in [Hejazi et al. 2014](water.html#hejazi2014), we do not estimate the manufacturing sector's water demands as the difference between the Aquastat industrial withdrawals and GCAM's bottom-up estimates of electric power sector demands, due to methodological differences in estimation of power sector water demands. As noted in [Davies et al. 2013](water.html#davies2013), power sector water demand estimates are sensitive to assumptions of the share of power plants using once-through flow cooling systems and the specific water intensities thereof. As such, the difference between the two (Aquastat industrial water and GCAM electricity water) is not deemed to return a reliable estimate of manufacturing water withdrawals in all regions and time periods. Future water demands by the industrial sector simply scale with industrial output.

### Livestock
All types/technologies of animal production in GCAM are assigned a region-specific coefficient of water demand for livestock production, which represents both animal drinking water, plus any other water used by the animal production operations. There is no distinction between withdrawals and consumption in livestock production; all water withdrawn is assumed to be consumed. The coefficients in GCAM are indicated in cubic meters of water per kilogram of animal commodity produced (e.g., beef, dairy, etc). The coefficients are calculated from [Mekonnen and Hoekstra 2010](water.html#mekonnen2010), which provides total water demands in liters of water per animal per day, by country, for a base year of about 2000. The computation of GCAM's water demand coefficients therefore also takes into consideration the animal stocks, which come from [FAOSTAT](water.html#faostat2016). The water demand coefficients computed are held constant over all model time periods.

### Municipal
Municipal water in GCAM is documented in detail in [Hejazi et al. 2013](water.html#hejazi2013) and summarized in [Hejazi et al. 2014](water.html#hejazi2014). Water withdrawals from [FAO Aquastat](water.html#fao2016) are assigned to a "municipal water" sector in each region that grows with population and GDP, with the demand levels moderated by assumed technical change. Municipal water prices come from the International Benchmarking Network for Water and Sanitation Utilities ([IBNET](water.html#ibnet)). The functional form used for projecting future municipal water demand takes future water price increases into account. The equation is shown below for per-capita water demands (*pcW*) from time period *t-1* to time period *t*.

$$
pcW_t = pcW_{t-1} * (\frac{pcGDP_t}{pcGDP_{t-1}})^{0.37} *
  (\frac{P_t}{P_{t-1}})^{-0.33} * (1 - Tech_t)
$$

where pcGDP is per-capita GDP, P is water price, and Tech stands for autonomous technological change, an exogenous assumption.

Municipal water consumption is also modeled; the distinction between the two comes from an assumed overall municipal water supply efficiency, based on [Shiklomanov 2000](water.html#shiklomanov2000). Where the withdrawal volume indicates the total water input to the municipal water supply system, consumption indicates only the water that is used by consumers in a way that it is not returned to the immediate water environment.

In the future, the ratio between withdrawals and consumption is assumed static, so both the withdrawals and consumption grow according to the equation above. Future work on adaptive measures can explore the potential changes to withdrawl and consumption intensities.

### Primary Energy
The approach for modeling the water demands of primary energy production is documented in [Hejazi et al. 2014](water.html#hejazi2014), and includes bottom-up estimates of water demand per unit energy produced for the following fuels: coal, oil (conventional and unconventional), natural gas, and uranium. The main data source used for estimating water consumption per unit energy produced is [Maheu 2009](water.html#maheu2009), which offers global average water consumption coefficients for each fuel type. These coefficients are somewhat higher than the values used in GCAM, as they do not distinguish between seawater and freshwater. The values read into GCAM are therefore the [Maheu 2009](water.html#maheu2009) estimates less the fraction assumed to be seawater. This fraction is assumed to be 95% in the Middle East, and 43% in all other regions; the latter value is from a USA-based estimate in [Kenny et al. 2009](water.html#kenny2009). Water withdrawals are estimated as water consumption multiplied by an exogenous withdrawals to consumption ratio of 3.3, which comes from a 1995 USA assessment ([Solley et al. 1998](water.html#solley1998)).

## Water Supply

Water supplies in GCAM now include global estimates of current and future water availability for all major river basins of the world. Water use from the above demand sectors are constrained at basin-scale so as to represent more realistic assessments of water use for each and all of the GCAM regions and from all major river basins. 

### Global River Basins

Since GCAM is a global model with representations of water use for all global regions, the supply of water must be consistent within this global framework. While many water issues are local and regional in nature, we have represented the global supply of water at the scale of major river basins. Currently 235 global river basins are represented in GCAM. The full list of major river basins included in GCAM is shown in Table 1. Each of the GCAM regions contains the river basins within its border. In many instances, river basins may overlap across multiple GCAM regions where water resources are shared. A few remote basins without water demand representations, such as Antarctica, are not actively modeled.

**Table 1. Major Water Basins in GCAM**
{: .tbl}

|id|name|id|name|id|name|id|name|id|name|
|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|:--|
1|Arctic Ocean Islands|51|Japan|101|Caribbean|151|Lake Chad|201|New Zealand|
2|Northwest Territories|52|Caspian Sea-East Coast|102|Hamun-i-Mashkel|152|Senegal|202|Australia-South Coast
3|Siberia-North Coast|53|Don|103|Taiwan|153|Cauvery|203|Mar Chiquita|
4|Siberia-West Coast|54|Danube|104|Arabian Sea Coast|154|Sri Lanka|204|South Africa-West Coast
5|Kara Sea Coast|55|Adriatic Sea-Greece-Black Sea Coast|105|North Gulf|155|India South Coast|205|Salinas Grandes
6|Lena|56|Ob|106|Yangtze|156|Orinoco|206|La Plata
7|Pacific and Arctic Coast|57|Po|107|Sabarmati|157|Colombia-Ecuador-Pacific Coast|207|North Chile-Pacific Coast
8|Scandinavia-North Coast|58|Amu Darya|108|Xun Jiang|158|Palau and East Indonesia|208|Murray-Darling
9|Russia-Barents Sea Coast|59|Italy-West Coast|109|Hong-Red River|159|North Borneo Coast|209|Pampas Region
10|Mackenzie|60|Spain-Portugal-Atlantic Coast|110|Ganges-Bramaputra|160|Volta|210|North Argentina-South Atlantic Coast
11|Iceland|61|France-South Coast|111|Yucatan Peninsula|161|Northeast South America-South Atlantic Coast|211|Tasmania
12|Sweden|62|Rhone|112|South China Sea Coast|162|Gulf of Guinea|212|South America-Colorado
13|Finland|63	|Mediterranean Sea Islands	|113|Mahi|163|Sumatra|213|Negro
14|Northern Dvina|64|Gironde|114|	Mexico-Interior|164|Sulawesi|214|Central Patagonia Highlands
15|Hudson Bay Coast|65|	North and South Korea|115|Pacific Central Coast|165|Kalimantan|215|South Argentina-South Atlantic Coast
16|Scotland|66|Bo Hai-Korean Bay-North Coast|116|Bay of Bengal-North East Coast|166|Magdalena|216	|Antarctica
17|Neva|67|Spain-South and East Coast|117|Tapti|167|Irian Jaya Coast|217|California River
18|Volga|68|Lake Balkash|118|Yasai|168|Amazon|218|Upper Mississippi
19|Atlantic Ocean Seaboard|69|Tiber|119|Philippines|169|South Chile-Pacific Coast|219|Lower Mississippi River
20|Baltic Sea Coast|70|	Black Sea-South Coast|120|Brahamani|170|Shebelli-Juba|220|Upper Colorado River
21|Denmark-Germany Coast|71|Tagus|121|North Marina Islands and Guam|171|Africa-East Central Coast|221|Lower Colorado River
22|Narva|72|Caspian Sea-South West Coast|122|Mahandi|172|North Brazil-South Atlantic Coast|222	|Great
23|Saskatchewan-Nelson|73|	Ebro|123|Godavari|173|Papua New Guinea Coast|223|Missouri River
24|Ireland|74	|Douro|124|Hainan|174|Tocantins|224|Arkansas White Red
25|Daugava|75	|Mediterranean Sea-East Coast|125|Mekong|175|Java-Timor|225|Texas Gulf Coast
26|England and Wales|76|Syr Darya|126|Viet Nam-Coast|176|Solomon Islands|226|South Atlantic Gulf
27|Fraser|77|Ziya He-Interior|127|Salween|177|Madasgacar|227|Great Lakes
28|Ems-Weser|	78	|China Coast|	128	|India North East Coast|178|Sepik|228|Ohio River
29|Oder|79|Huang He|129	|India West Coast|179|Rift Valley|229|Pacific Northwest
30|Wisla|80|Mediterranean South Coast|130|Papaloapan|180|Peru-Pacific Coast|230|Tennessee River
31|Elbe|81|Guadiana|131	|Rio Lerma|181|Fly|231|Rio Grande River
32|Rhine|82|Central Iran|132|Rio Verde|182|Angola-Coast|232|New England
33|Poland Coast|	83|Guadalquivir|133|Grijalva-Usumacinta|183|Congo|233|Mid Atlantic
34|Churchill|84|Tigris-Euphrates|134|Rio Balsas|184|Australia-North Coast|234|Hawaii
35|Neman|85|Tarim Interior	|135|Southern Central America|185|South Pacific Islands|235|Narmada
36|Scheldt|86|Africa-North West Coast|136|Isthmus of Tehuantepec|186|East Brazil-South Atlantic Coast
37|Russia-South East Coast|87|Nile|137|Irrawaddy|187|Parnaiba
38|Ural|88|Persian Gulf Coast|138|Sittang|188|Zambezi
39|Dnieper|89|Indus|139	|Peninsula Malaysia|189|Australia-East Coast
40|St Lawrence|90|Farahrud|140|Krishna|190|Africa-Indian Ocean Coast
41|France-West Coast|91|Baja California|141|Andaman-Nicobar Islands|191|Australia-West Coast
42|Gobi Interior|92|Plateau of Tibet Interior|142|Africa-West Coast|192|Sao Francisco 
43|Amur|93|Red Sea-East Coast|143|Caribbean Coast|193|Australia-Interior 
44|Loire|94|Arabian Peninsula|144|Africa-North Interior|194|Orange
45|Caspian Sea Coast|95|Dead Sea|145|India East Coast|195|Uruguay-Brazil-South Atlantic Coast
46|Seine|96|Mexico-Northwest Coast|146|Chao Phraya|196|Namibia-Coast
47|Black Sea-North Coast|97|Helmand|147|Pennar|197|Africa-South Interior
48|Yenisey|98|Sinai Peninsula|148|Gulf of Thailand Coast|198|South Africa-South Coast
49|Dniester|99|Eastern Jordan-Syria|149|Niger|199|Limpopo
50|Italy-East Coast|100	|Africa-Red Sea-Gulf of Aden Coast|150|Micronesia|200|La Puna Region



### Water Sources

Three distinct sources of fresh water are modeled, renewable water (surface and ground), non-renewable groundwater, and desalinated water. Renewable water is water that is replenished naturally by surface runoff and subsurface infiltration and release. Non-renewable groundwater is fossil groundwater resources or groundwater where abstraction exceeds recharge. Renewable water and non-renewable ground water are separately modeled for each basin. Desalinated water is available as an additional source of freshwater within each basin and for alternative end-use demands for water.

Renewable water supplies are based on runoff estimates from Xanthos, a detailed global hydrology model ([Liu et al. 2018](water.html#liu2018); [Vernon et al. 2019](water.html#vernon2019)). Xanthos accounts for surface and subsurface processes to compute runoff at 0.5° grid resolution. Global climate datasets are utilized in conjunction with Xanthos to determine historical annual average runoff aggregated for each basin ([Liu et al. 2018](water.html#liu2018); [Turner et al. 2019b](water.html#turner2019b); [Vernon et al. 2019](water.html#vernon2019)). Of the total basin runoff, water available or accessible for human use takes into consideration requirements for ecosystem services, inaccessibility due to rapid flow and remote locations, and capacity of reservoir storage. Accessible fractions of total runoff vary across basins. Renewable water volumes up to the accessible fraction is available at nominal or low cost. Additional renewable water beyond the accessible fraction is available at a sharply higher cost to ensure availability of water for ecosystem services and to reflect capital investments necessary for reservoir expansion.

Non-renewable groundwater is also represented at the basin-scale so that it is a supplemental source to basin renewable water. Non-renewable groundwater is modeled as a graded depletable resource with a fixed amount of total groundwater availability. Detailed global assessments of porosity, aquifer thickness, permeability, and water depth are utilized to establish the total volume of water available at the grid-scale. Basin level estimates of environmentally exploitable groundwater are aggregated from grid-scale data. A groundwater supply curve representing the relationship between exploitable groundwater and cost of extraction is constructed from a physics-based extraction cost model. Capital and operating costs that include well installation and maintenance costs as a function of depth and geological complexity, and energy inputs and costs required for pumping are included for a rigorous estimate of the relationship between groundwater volume and extraction cost. ([Yonkofski et al. 2019](water.html#yonkofski2019); [Turner et al. 2019a](water.html#turner2019a); [Kim et al. 2016](water.html#kim2016)).

Desalinated water is available as source of freshwater from purified saline water. Electrical energy input and capital and operational costs are included for representing the cost of desalinated water. Due to the high cost of desalination, desalinated water is only utilized when renewable and non-renewable water supplies are scarce and the cost of freshwater is high. In GCAM core simulations, more expensive desalinated water is assumed to be available for non-irrigation purposes only. However, it can be made available for irrigation use or excluded from any end-use representations of water demand through simple data input changes that either includes or excludes the desalination technology option. Desalinated water representation is nested within the water distribution sectors where it competes with basin water supply from renewable and nonrenewable sources.


### Basin-To-Region and Basin-To-Sector Mapping

For irrigated agriculture, land units have been previously revised to be consistent with major river basins and thus, irrigated water use draws water directly from the basin in which the crop is grown. No additional mapping of irrigated water demand to basins is necessary to capture the agricultural use of water by basins.

All other uses of water, electric power, industries, municipal, primary energy, and livestock are modeled at the country or GCAM regional scale. Representations of these end-use sectors and their water demands are not spatially disaggregated sufficiently to be directly consistent with water supply at more detailed basin-scale. This mismatch is more pronounced for larger GCAM regions with multiple basins contained within its boundary than smaller regions with few basins. To address this mismatch, a mapping structure of regional water demands by sector to basin supply is constructed based on gridded historical datasets of population and power plant locations in the case of electric power. The mapping structure represents the basin shares of total water withdrawal (or consumption) from each regionally aggregated end-use water demand categories. The mapping resolves water supplies and demands at the basin scale and allows the balancing of water supplies and demands to future changes in the basin supply and regional end-use demand for water.

Water mappings are embedded within specific water distribution sectors corresponding to the end-use categories. Creation of these water distribution sectors and “routing” of water through these sectors provide easy tracking of aggregated water volumes and water prices for each end-use type. Conveyance losses and improvements to water distribution efficiencies are also conveniently handled in the water distribution sectors. Conveyance losses for irrigated water use has been included and differentiated for each GCAM region. Conveyance losses/efficiencies for GCAM regions are derived from country level data from [Rohwer et al. 2007](water.html#rohwer2007) and are the weighted mean of the original country level data weighted by irrigated harvested area. 

Water distribution sector for each demand category includes the cost of water transport, distribution and/or treatment and other adjustments such as subsidies, in addition to the resource cost of water. Thus, water prices for each demand category is differentiated. This framework provides a covenient location for including water subsidies or reduced water costs from allocation rights for irrigated agriculture. In GCAM, the price of water for agriculture use has been reduced by a factor of 1/100th. This factor is based on an OECD report on water pricing ([OECD 2009](water.html#oecd2009)) which indicates that industrial and household water users pay more than 100 times as much as agriculture users. In some regions, the marginal cost of irrigated water use is zero. Crop growth requires substantial water inputs and the profitability of agricultural relies on the low cost of water provisions. Without this subsidy, historical calibration of agriculture production in GCAM is not possible for historically water scarce regions with high cost of water. Water subsidies for irrigated agriculture have not been differentiated by region and basin, and improved understanding of regional differences in water subsidies and their impact on agriculture production remain for future work.

Additionally, the mappings structure allows multiple GCAM regions to access water resources from overlapping and shared basins. Basins have independent geographic boundaries and are separate to the GCAM regional boundaries. Basins may be contained within a single or multiple GCAM regions. The mapping structure for non-irrigated water demands quantifies what portion of regional demands came from which basins. The entirety of the basin is available for use by any GCAM region or regions that are mapped to it. For instance, the US and Canada share a common basin, such as the Great Lakes, and both countries have access to the total available supply of water in that basin. In practice, basins supplies are typically shared by overlapping regions. Irrigated agriculture water demands from multiple GCAM regions may also draw water from common basins. Upstream versus downstream issues within a basin, whether shared by mutliple regions or not, are not modeled. There are no biases or limitations placed on the regional use of shared basin water resources.

Currently, mappings of water demands to basins are assumed to remain fixed over time. This implies no inter-basin transfer and also does not capture long-term shifts in regional demands for water (excluding irrigated water demand), either due to population migration and/or spatial shifts in industrial and energy production within the GCAM region. These distributional issues are likely to be of greater concern for large regions that contain multiple basins as mentioned above. Future work in which sub-regional representations of water demands are modeled (e.g. GCAM-USA, GCAM-China, GCAM-India) in conjunction with remapping of finer scale demands to basin supplies can provide more consistent views of long-term responses to local and regional water use. We remain cognizant of the difficulties in the consistent representation of spatial and temporal scales in modeling the supply and demand of water resources.

### Water Markets

Water supplies and demands at each basin are balanced through a market mechanism in which prices for water (shadow price) are adjusted until water demands are constrained to available supply. Additional documentation of this capability is available in [Kim et al. 2016](water.html#kim2016), [Turner et al. 2019ab](water.html#turner2019a), [Graham et al. 2018](water.html#graham2018), and [Cui et al. 2018](water.html#cui2018).

Water prices at the basin-scale are “cleared” with all other market prices or simultaneously solved. Supplies of water increase with higher water prices subject maximum limits, whereas demands for water fall. Substitution to alternative technologies or crops with lower water intensity, shifts in the trade of agriculture commodities, or direct reductions in the withdrawal or consumption of water are the demand responses to higher water prices. The rising cost of water may limit or alter the production of goods and services until water supplies and demands are rebalanced through the market mechanism. Market clearing water prices are determined for each water basin. The water balancing and market behavior currently utilizes demands based on withdrawal volumes. Market behavior based on consumptive volumes is possible; however, we find that the use of consumptive volumes, which is low relative to total available water volumes, is grossly unresponsive to water scarcity. Both the irrigated water subsidies and the choice of withdrawl or consumptive volume for water pricing can have a substantial impact on the behavior of water constraints in GCAM. Further exploration of the demand responses to withdrawal and consumption differences remain for future work.

When renewable water supplies are abundant relative to demand, water prices remain low (or negligible), and non-renewable groundwater and desalinated water do not contribute to supply. In this case, water supplies are not binding and do not constrain the production of goods and services. When water demands approach or exceed accessible renewable supplies, water prices rise more rapidly such that more expensive non-renewable groundwater and desalinated water contribute to supply. Generally, renewable water supplies are lower in cost and are utilized first and to a greater extent before depending on more expensive non-renewable groundwater or desalinated water. Over time, basins may produce from all three sources of water depending on the market price of water and the cost of alternative water resources in each basin.

In order to improve the solution behavior of all GCAM markets with interlinked water dependencies, and to limit the total number of new markets to solve, renewable and non-renewable water resources have been combined into one effective resource supply curve. This limits the number of new markets to solve to 235, the number of water basins included. Renewable and non-renewable water resources are separately tracked, however. In GCAM, two Sub-Resource objects are included within the Resource object for each water basin, one each to represent renewable and non-renewable water resources.  The Sub-Resource supply curves are additive and together represent the total supply of water.

Adding renewable and non-renewable resource curves into one is conceptually a new feature to GCAM. Discontinuity in the aggregate supply curve due to changing renewable potential and/or depletion of nonrenewable water resources has been accounted for by ensuring that the two Sub-Resource curves are overlapping so as to ensure continuity of the aggregate supply curve.
The ability to combine and overlay multiple supply curves into one provides great flexibility in the potential for alternative characterization of water resources and their contributions to the overall supply. For instance, both renewable and non-renewable resources can be further disaggregated, such as by separating renewable water into surface and ground water (recharge) portions or separating fossil groundwater by alternative aquifer characteristics. The shape of the multiple resource curves and the degree to which they overlap or not can determine water use behavior, such as the simultaneous or sequential production of alternative water resources.

One notable feature of the GCAM's Renewable Sub-Resource object is the ability to vary the maximum available resource potential by time period. This feature enables the assessment of climate impacts on water availability. Projected future changes in precipitation from climate models (GCMs) are utilized to calculate river runoff and changes in the maximum available potential of renewable water supplies by time and basin.

### Running GCAM Water Scenarios

Constraining the supply of water in a GCAM simulation is a simple matter of utilizing a revised GCAM configuration file (_configuration\_ref.xml_), which includes one new (_water\_supply\_constrained.xml_) and one revised (_water\_mapping.xml_) xml files. The _water\_supply\_constrained.xml_ includes constrained water supplies as described above for each basin. The revised _water\_mapping.xml_ contains mappings of end-use water demands by category to specific water basins. The _unlimited\_water\_supply.xml_, as well as all other existing water inputs files, continue to be utilized and is necessary for running the water constrained scenarios.

Turning off water supply constraints and reverting to an unconstrained or unlimited water supply behavior is achieved by removing or commenting out the _water\_supply\_constrained.xml_ file from the configuration file.


## References

<a name="chaturvedi2015">[Chaturvedi et al. 2015]</a> Chaturvedi, V., Hejazi, M., Edmonds, J., Clarke, L., Kyle, P., Davies, E., and Wise, M. 2013. Climate mitigation policy implications for global irrigation water demand. *Mitigation and Adaptation Strategies for Global Change* 20(3), pp 389-407. [Link](https://link.springer.com/article/10.1007/s11027-013-9497-4)

<a name="cui2018">[Cui et al. 2018]</a> Cui, Ryna Yiyun, Katherine Calvin, Leon Clarke, Mohamad Hejazi, Son Kim, Page Kyle, Pralit Patel, Sean Turner and Marshall Wise (2018). *Regional responses to future, demand-driven water scarcity*. Environmental Research Letters, 13, 9. [Link](https://doi.org/10.1088/1748-9326/aad8f7)

<a name="davies2013">[Davies et al. 2013]</a> Davies, E.G.R., Kyle, P., and Edmonds, J. 2013. An integrated assessment of global and regional water demands for electricity generation to 2095. *Advances in Water Resources* 52(3), pp 296-313. [Link](https://www.sciencedirect.com/science/article/pii/S0309170812003028)

<a name="fao2016">[FAO Aquastat]</a> FAO. 2016. *AQUASTAT Main Database*, Food and Agriculture Organization of the United Nations (FAO). [Link](http://www.fao.org/faostat/en/)

<a name="faostat2016">[FAOSTAT]</a> FAO. 2016. *FAOSTAT Statistics Database*, Food and Agriculture Organization of the United Nations (FAO). [Link](http://www.fao.org/nr/water/aquastat/data/query/index.html?lang=en)

<a name="graham2018">[Graham et al. 2018]</a> Graham, N., E. Davies, M. I. Hejazi, K. Calvin, S. H. Kim, L. Helinksi, F.R. Miralles-Wilhelm, L Clarke, G.P. Kyle, P Patel, M.A. Wise, and C.R. Vernon (2018). *Water sector assumptions for the Shared Socioeconomic Pathways in an integrated modeling framework*. Water Resources Research, 54, [Link](https://doi.org/10.1029/2018WR023452)

<a name="hejazi2013">[Hejazi et al. 2013]</a> Hejazi, M., J. Edmonds, V. Chaturvedi, E. Davies, and J. Eom. Scenarios of global municipal water-use demand projections over the 21st century. *Hydrological Sciences Journal* 58, pp 519-538. [Link](https://www.sciencedirect.com/science/article/pii/S0040162513001169)

<a name="hejazi2014">[Hejazi et al. 2014]</a> Hejazi, M., J. Edmonds, L. Clarke, P. Kyle, E. Davies, V. Chaturvedi, M. Wise, P. Patel, J. Eom, K. Calvin, R. Moss, and S. Kim. 2014. Long-term global water projections using six socioeconomic scenarios in an integrated assessment modeling framework. *Technological Forecasting and Social Change* 13, pp 112-123. [Link](https://www.sciencedirect.com/science/article/pii/S0040162513001169)

<a name="ibnet">[IBNET]</a> IBNET. 2016. *Benchmarking Database*, International Benchmarking Network for Water and Sanitation Utilities (IBNET). [Link](https://www.ib-net.org/)

<a name="kenny2009">[Kenny et al. 2009]</a> Kenny, J., N. Barber, S. Hutson, K. Linsey, J. Lovelace, M. Maupin. *Estimated use of water in the United States in 2005* Circular 1344, U.S. Geological Survey, U.S. Department of the Interior, Reston, Virginia. [Link](https://pubs.usgs.gov/circ/1344/pdf/c1344.pdf)

<a name="kim2016">[Kim et al. 2016]</a> Kim SK, Hejazi M, et al. (2016). *Balancing global water availability and use at basin scale in an integrated assessment model*. Climatic Change 136:217-231. [Link](http://link.springer.com/article/10.1007/s10584-016-1604-6/fulltext.html)

<a name="kyle2013">[Kyle et al. 2013]</a> Davies, E.G.R., Kyle, P., and Edmonds, J. 2013. Kyle, P., E.G.R. Davies, J.J. Dooley, S.J. Smith, L.E. Clarke, J.A. Edmonds, and M.I Hejazi. 2013. Influence of climate change mitigation technology on global demands of water for electricity generation. *International Journal of Greenhouse Gas Control* 13, pp 112-123. [Link](https://www.sciencedirect.com/science/article/pii/S1750583612003179)

<a name="liu2018">[Liu et al. 2018]</a> Liu Y., M. Hejazi, H. Li, X. Zhang, G. Leng (2018). *A  hydrological emulator for global applications - HE v1.0.0*. Geoscientific Model Development. [Link](https://www.geosci-model-dev.net/11/1077/2018/gmd-11-1077-2018.pdf)

<a name="macknick2011">[Macknick et al. 2011]</a> Macknick, J., Newmark, R., Heath, G., and Hallett, K.C. 2011. *A Review of Operational Water Consumption and Withdrawal Factors for Electricity Generating Technologies*. NREL/TP-6A20-50900. National Renewable Energy Laboratory. [Link](https://www.nrel.gov/docs/fy11osti/50900.pdf)

<a name="maheu2009">[Maheu 2009]</a> Maheu, A. 2009. *Energy Choices and their Impacts on Demand for Water Resources: An Assessment of Current and Projected Water Consumption in Global Energy Production.* McGill University, Montreal, Canada. [Link](http://www.unisfera.org/sn_uploads/0Energy_demand_on_water_Finalversion.pdf)

<a name="mekonnen2010">[Mekonnen and Hoekstra 2010]</a> Mekonnen, M.M., and Hoekstra, A.Y. 2010. *The Green, Blue and Grey Water Footprint of Farm Animals and Animal Products. Vol 2: Appendices. Appendix IV. Drinking and service water footprint per animal (litre/day)*. Value of Water Research Report Series No. 48. UNESCO-IHE Institute for Water Education. [Link](http://waterfootprint.org/media/downloads/Report-48-WaterFootprint-AnimalProducts-Vol2.pdf)

<a name="mekonnen2011">[Mekonnen and Hoekstra 2011]</a> Mekonnen, M.M., and Hoekstra, A.Y. 2011. The green, blue and grey water footprint of crops and derived crop products. *Hydrology and Earth System Sciences* 15, pp 1577–1600. [Link](https://www.hydrol-earth-syst-sci.net/15/1577/2011/hess-15-1577-2011.html)

<a name="netl2008">[NETL 2008]</a> National Energy Technology Laboratory. *Water Requirements for Existing and Emerging Thermoelectric Plant Technologies*. DOE/NETL-402/080108, National Energy Technology Laboratory. [Link](http://www.circleofblue.org/wp-content/uploads/2010/08/Water-Requirements-for-Existing-and-Emerging-Thermoelectric-Technology.pdf)

<a name="oecd2009">[OECD 2009]</a>. *Managing Water for All: An OECD Perspective on Pricing and Financing*, OECD, Paris. [Link](https://www.oecd.org/env/42350563.pdf)

<a name="rohwer2007">[Rowher et al. 2007]</a> Rohwer, J., Gerten, D., and Lucht, W. 2007. *Development of Functional Irrigation Types for Improved Global Crop Modelling* PIK Report No. 104, Potsdam Institute for Climate Impact Research. [Link](https://www.pik-potsdam.de/research/publications/pikreports/.files/pr104.pdf)

<a name="shiklomanov2000">[Shiklomanov 2000]</a> Shiklomanov, I. 2000. World water resources and water use: present assessment and outlook for 2025. pp. 160-203 in: Rijsberman, F.R. (Ed.), *World Water Scenarios: Analysis of Global Water Resources and Use*. Earthscan, London, UK. [Link](http://www.uni-frankfurt.de/45217769/Vassolo_Doell_WRR2005.pdf)

<a name="solley1998">[Solley et al. 1998]</a> Solley, W., R. Pierce, H. Perlman. 1998. *Estimated use of water in the United States in 1995* Circular 1200, U.S. Geological Survey, U.S. Department of the Interior, Reston, Virginia. [Link](https://pubs.usgs.gov/circ/1998/1200/report.pdf)

<a name="turner2019a">[Turner et al. 2019a]</a> Turner S.W.D., M. Hejazi, C. Yonkofski, S. Kim, P. Kyle (2019a). *Influence of groundwater extraction costs and resource depletion limits on simulated global nonrenewable water withdrawals over the 21st century*. Earth's Future (2019), 10.1029/2018EF001105  [Link](https://doi.org/10.1029/2018EF001105)

<a name="turner2019b">[Turner et al. 2019b]</a> Turner, Sean, Mohamad Hejazi, Katherine Calvin, Page Kyle, Sonny Kim (2019b). *A pathway of global food supply adaptation in a world with increasingly constrained groundwater*. Science of The Total Environment, 673, 165-176, [Link](https://doi.org/10.1016/j.scitotenv.2019.04.070).

<a name="vassolo2005">[Vassolo and Döll 2005]</a> Vassolo, S., and Döll, P. 2005. Global-scale gridded estimates of thermoelectric power and manufacturing water use. *Water Resources Research* 41, W04010. [Link](http://www.uni-frankfurt.de/45217769/Vassolo_Doell_WRR2005.pdf)

<a name="vernon2019">[Vernon 2019]</a> Vernon, C., M. Hejazi, S. Turner, Y. Liu, C. Braun, X. Li, and R. Link. *A Global Hydrologic Framework to Accelerate Scientific Discovery*. Journal of Open Research Software (2019). [Link](https://openresearchsoftware.metajnl.com/articles/10.5334/jors.245/)

<a name="vickers2001">[Vickers 2001]</a> Vickers, A. 2001. *Handbook of Water Use and Conservation*. WaterPlow Press, Amherst, MA, USA. [Link](http://waterplowpress.com/)

<a name="yonkofski2019">[Yonkofski et al. 2019]</a> Yonkofski, C., Watson, D., Hejazi, M. 2019 *Cost and Availability of Non-renewable Groundwater*. Earth’s Future (in review).
