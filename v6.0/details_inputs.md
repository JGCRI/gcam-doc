---
layout: index
title: The GCAM Land Model
prev: inputs_supply.html
next: inputs_demand.html
gcam-version: v6 
---

This page provides more detailed explanations of the descriptions provided in the [inputs to supply](inputs_supply.html) and [inputs to demand](inputs_demand.html) modeling pages.

{:toc}

## Mapping the IEA Energy Balances

The IEA Energy Balances [(IEA 2019)](details_inputs.html#iea2019) are a comprehensive set of country-level statistics of energy production, transformation, and use that is the primary source of most calibration information in GCAM. However, the data product itself is somewhat complex, and the mappings from the IEA's categories to GCAM's sectors and fuels are not obvious. This section is intended to provide an overview description of the data processing with some detailed tables. It does not define the categories within the IEA data; interested readers are instead referred to the documentation [(IEA 2011)](details_inputs.html#iea2011).

## Processing the IEA Data

First, the three composite regions in the IEA Energy Balances (Other Africa, Other Asia, Other Non-OECD Americas) are downscaled to the country level on the basis of population, according to the IEA's reported country-to-region mapping. This is necessary for the construction of several GCAM regions. Several minor modifications to the dataset are made where thermodynamically impossible conversions were found (e.g., non-zero electricity generation with zero input fuel) that would otherwise result in errors in GCAM. Once the cleaned and country-level dataset is produced, the mappings from the IEA's categories to GCAM's categories are used to aggregate the entire dataset by GCAM regions and sectors. The detailed mappings are shown in [Table 3](#table3) and [Table 4](#table4), and described further below.

### Resolving primary energy balances

In the IEA Energy Balances, the following identity holds for any country and primary fuel:

$$
{Production} + {Imports} - {Exports} + {NetStockChanges} + {NetStatisticalDifferences} = {Consumption}
$$

In GCAM, stock changes and statistical differences are not represented, so globally, the sum of consumption must equal the sum of production, and within any region the sum of production and net trade must be equal to consumption. This is resolved by using the consumption data as reported, and scaling the production data so that the global totals are equal. Net trade in each region is then the difference between the reported consumption and the derived, scaled production.

### Resolving secondary energy balances

Similar identities can be constructed for each secondary fuel, wherein the production in the equation above would be replaced by the output of the relevant energy transformation sector(s). Because net stock changes and statistical differences are not modeled for any fuel in GCAM, the data can not be used exactly as reported, and the strategies for addressing these "flows" differ by fuel.

For electricity, the fuel inputs to power plants, electricity generation by power plants, own use of electricity, and distribution losses of electricity are used exactly as reported in each region. The consumption by end use sectors (buildings, industry, and transportation) are scaled to match the generation minus own use and losses. As such, any statistical differences are effectively distributed to the end use sectors.

A similar approach is taken for district heat, in the regions where it is considered as a fuel. In most regions, district heat used by end-use sectors is simply represented by adding the reported fuel inputs to district heating systems to the final energy consumption quantities of the end use sectors. However in regions with significant usage of district services, documented in [district heat](supply_energy.html#district-services), the estimates of fuel inputs to the district heat plants are used as reported. Heat outputs are derived using exogenous input-output coefficients, and apportioned to end-use sectors according to relative shares of reported heat consumption.

For refined liquid fuels, the end-use consumption estimates by buildings, industry, and transportation are used as reported. Gross energy consumption quantities at petroleum refineries are also used exactly as reported, so any statistical differences or stock changes in the secondary fuels are effectively assigned to the input-output coefficients of the refineries in the historical years.

The remaining fuels used by end-use consumers (coal, natural gas, and biomass) are primary fuels, whose statistical differences are assigned to the production and trade quantities as described above.

### Resolving final energy consumption
This section documents the processing of data from the IEA Energy Balances to GCAM's "aggregate" final energy consumers: residential, commercial, industrial energy use, industrial feedstocks, and the following transportation modes: air, rail, road, and domestic and international ship. Further processing of the data to the more detailed end-use sectors, services, and technologies in GCAM is documented in [buildings](demand_energy.html#buildings), [industry](demand_energy.html#industry), and [transportation](demand_energy.html#transportation).

### Detailed mappings of products and flows
The tables below show the mappings from the IEA's "flows" to GCAM's sectors, and from the IEA's "products" to GCAM's fuels. Exceptions to simple one-to-one mappings are noted below the tables.

**Table 3<a name="table3"/>:** Mapping from IEA flows to GCAM sectors
  (and subsectors where appropriate)
{: .tbl}  

| flow_code | flow_name                                     | sector                                                  |
|:-----------|:-----------------------------------------------|:---------------------------------------------------------|
| INDPROD   | Production                                    | resources                                               |
| IMPORTS   | Imports                                       |                                                         |
| EXPORTS   | Exports                                       |                                                         |
| MARBUNK   | International Marine Bunkers                  | transportation/international shipping                   |
| AVBUNK    | International Aviation Bunkers                | transportation/air                                      |
| STOCKCHA  | Stock Changes                                 |                                                         |
| TPES      | Total Primary Energy Supply                   |                                                         |
| TRANSFER  | Transfers                                     |                                                         |
| STATDIFF  | Statistical Differences                       |                                                         |
| TOTTRANF  | Transformation Sector                         |                                                         |
| MAINELEC  | Main Activity Producer Electricity Plants     | electricity                                             |
| AUTOELEC  | Autoproducer Electricity Plants               | electricity                                             |
| MAINCHP   | Main Activity Producer CHP Plants             | electricity                                             |
| AUTOCHP   | Autoproducer CHP Plants                       | industrial energy use                                   |
| MAINHEAT  | Main Activity Producer Heat Plants            | district heat                                           |
| AUTOHEAT  | Autoproducer Heat Plants                      | district heat                                           |
| THEAT     | Heat Pumps                                    | industrial energy use                                   |
| TBOILER   | Electric Boilers                              | industrial energy use                                   |
| TELE      | Chemical heat for electricity production      |                                                         |
| TBLASTFUR | Blast Furnaces                                | industrial energy use                                   |
| TGASWKS   | Gas Works                                     | gas processing/coal gasification; industrial energy use |
| TCOKEOVS  | Coke Ovens                                    | industrial energy use                                   |
| TPATFUEL  | Patent Fuel Plants                            | industrial energy use                                   |
| TBKB      | BKB Plants                                    | industrial energy use                                   |
| TREFINER  | Petroleum Refineries                          | refining/oil refining                                   |
| TPETCHEM  | Petrochemical Industry                        | industrial energy use                                   |
| TCOALLIQ  | Coal Liquefaction Plants                      | refining/coal to liquids                                |
| TGTL      | Gas-to-Liquids (GTL) Plants                   | refining/gas to liquids                                 |
| TBLENDGAS | For Blended Natural Gas                       | gas processing/coal gasification; industrial energy use |
| TCHARCOAL | Charcoal Production Plants                    | industrial energy use                                   |
| TNONSPEC  | Non-specified (Transformation)                | industrial energy use                                   |
| TOTENGY   | Energy Sector                                 |                                                         |
| EMINES    | Coal Mines                                    | industrial energy use                                   |
| EOILGASE0 | Oil and Gas Extraction                        | industrial energy use                                   |
| EBLASTFUR | Blast Furnaces                                | industrial energy use                                   |
| EGASWKS   | Gas Works                                     | gas processing/coal gasification; industrial energy use |
| EBIOGAS   | Gasification Plants for Biogas                | industrial energy use                                   |
| ECOKEOVS  | Coke Ovens                                    | industrial energy use                                   |
| EPATFUEL  | Patent Fuel Plants                            | industrial energy use                                   |
| EBKB      | BKB Plants                                    | industrial energy use                                   |
| EREFINER  | Petroleum Refineries                          | refining/oil refining                                   |
| ECOALLIQ  | Coal Liquefaction Plants                      | refining/coal to liquids                                |
| ELNG      | Liquefaction (LNG) / Regasification Plants    | industrial energy use                                   |
| EGTL      | Gas-to-Liquids (GTL) Plants                   | refining/gas to liquids                                 |
| EPOWERPLT | Own Use in Electricity, CHP and Heat Plants   | electricity net ownuse; industrial energy use           |
| EPUMPST   | Used for Pumped Storage                       | electricity net ownuse; industrial energy use           |
| ENUC      | Nuclear Industry                              | industrial energy use                                   |
| ECHARCOAL | Charcoal Production Plants                    | industrial energy use                                   |
| ENONSPEC  | Non-specified (Energy)                        | industrial energy use                                   |
| DISTLOSS  | Distribution Losses                           | electricity t&d; gas pipeline; industrial energy use       |
| TFC       | Total Final Consumption                       |                                                         |
| TOTIND    | Industry Sector                               | industrial energy use                                   |
| IRONSTL   | Iron and Steel                                |                                                         |
| CHEMICAL  | Chemical and Petrochemical                    |                                                         |
| NONFERR   | Non-Ferrous Metals                            |                                                         |
| NONMET    | Non-Metallic Minerals                         |                                                         |
| TRANSEQ   | Transport Equipment                           |                                                         |
| MACHINE   | Machinery                                     |                                                         |
| MINING    | Mining and Quarrying                          |                                                         |
| FOODPRO   | Food and Tobacco                              |                                                         |
| PAPERPRO  | Paper, Pulp and Print                         |                                                         |
| WOODPRO   | Wood and Wood Products                        |                                                         |
| CONSTRUC  | Construction                                  |                                                         |
| TEXTILES  | Textile and Leather                           |                                                         |
| INONSPEC  | Non-specified (Industry)                      |                                                         |
| TOTTRANS  | Transport Sector                              |                                                         |
| WORLDAV   | World Aviation Bunkers                        |                                                         |
| DOMESAIR  | Domestic Aviation                             | transportation/air                                      |
| ROAD      | Road                                          | transportation/road                                     |
| RAIL      | Rail                                          | transportation/rail                                     |
| PIPELINE  | Pipeline Transport                            | gas pipeline; industrial energy use                     |
| WORLDMAR  | World Marine Bunkers                          |                                                         |
| DOMESNAV  | Domestic Navigation                           | transportation/domestic ship                            |
| TRNONSPE  | Non-specified (Transport)                     | transportation                                          |
| TOTOTHER  | Other Sectors                                 |                                                         |
| RESIDENT  | Residential                                   | residential                                             |
| COMMPUB   | Commercial and Public Services                | commercial                                              |
| AGRICULT  | Agriculture/Forestry                          | industrial energy use                                   |
| FISHING   | Fishing                                       | industrial energy use                                   |
| ONONSPEC  | Non-specified (Other)                         | commercial                                              |
| NONENUSE  | Non-Energy Use                                | industrial feedstocks                                   |
| NEINTREN  | Non-Energy Use Industry/Transformation/Energy |                                                         |
| NECHEM    | Memo: Feedstock Use in Petchemical Industry   |                                                         |
| NETRANS   | Non-Energy Use in Transport                   |                                                         |
| NEOTHER   | Non-Energy Use in Other Sectors               |                                                         |
| ELOUTPUT  | Elect.Output in GWh                           |                                                         |
| ELMAINE   | Elec Output-main activity producer ele plants | electricity                                             |
| ELAUTOE   | Elec Output-autoproducer electricity plants   | electricity                                             |
| ELMAINC   | Elec Output-main activity producer CHP plants | electricity                                             |
| ELAUTOC   | Elec Output-autoproducer CHP plants           | industrial energy use, electricity                                   |
| HEATOUT   | Heat Output in ktoe                           |                                                         |
| HEMAINC   | Heat Output-main activity producer CHP plants | electricity; district heat                              |
| HEAUTOC   | Heat Output-autoproducer CHP plants           |                                                         |
| HEMAINH   | Heat Output-main activity producer heat plant |                                                         |
| HEAUTOH   | Heat Output-autoproducer heat plants          | |

**Table 4<a name="table4"/>:** Mapping from the IEA fuels to GCAM
  fuels
{: .tbl}

| product                                                | fuel            |
|:--------------------------------------------------------|:-----------------|
| Hard coal (if no detail)                               | coal            |
| Brown coal (if no detail)                              | coal            |
| Anthracite                                             | coal            |
| Coking coal                                            | coal            |
| Other bituminous coal                                  | coal            |
| Sub-bituminous coal                                    | coal            |
| Lignite                                                | coal            |
| Patent fuel                                            | coal            |
| Coke oven coke                                         | coal            |
| Gas coke                                               | coal            |
| Coal tar                                               | coal            |
| BKB/peat briquettes                                    | coal            |
| Gas works gas                                          | gas             |
| Coke oven gas                                          | coal            |
| Blast furnace gas                                      | coal            |
| Other recovered gases                                  | coal            |
| Peat                                                   | coal            |
| Natural gas                                            | gas             |
| Natural Gas                                            | gas             |
| Crude/NGL/feedstocks (if no detail)                    | refined liquids |
| Crude oil                                              | refined liquids |
| Natural gas liquids                                    | refined liquids |
| Refinery feedstocks                                    | refined liquids |
| Additives/blending components                          | refined liquids |
| Other hydrocarbons                                     | refined liquids |
| Refinery gas                                           | refined liquids |
| Ethane                                                 | refined liquids |
| Liquefied petroleum gases (LPG)                        | refined liquids |
| Motor gasoline                                         | refined liquids |
| Aviation gasoline                                      | refined liquids |
| Gasoline type jet fuel                                 | refined liquids |
| Kerosene type jet fuel                                 | refined liquids |
| Other kerosene                                         | refined liquids |
| Other Kerosene                                         | refined liquids |
| Gas/diesel oil                                         | refined liquids |
| Fuel oil                                               | refined liquids |
| Naphtha                                                | refined liquids |
| White spirit & SBP                                     | refined liquids |
| Lubricants                                             | refined liquids |
| Bitumen                                                | refined liquids |
| Paraffin waxes                                         | refined liquids |
| Petroleum coke                                         | refined liquids |
| Non-specified oil products                             | refined liquids |
| Industrial waste                                       | biomass         |
| Municipal waste (renewable)                            | biomass         |
| Municipal waste (non-renewable)                        | biomass         |
| Primary solid biofuels                                 | biomass         |
| Biogases                                               | gas             |
| Biogasoline                                            | refined liquids |
| Biodiesels                                             | refined liquids |
| Other liquid biofuels                                  | biomass         |
| Non-specified primary biofuels and waste               | biomass         |
| Charcoal                                               | biomass         |
| Elec/heat output from non-specified manufactured gases |                 |
| Heat output from non-specified combustible fuels       | heat            |
| Nuclear                                                | electricity     |
| Hydro                                                  | electricity     |
| Geothermal                                             | electricity     |
| Solar photovoltaics                                    | electricity     |
| Solar thermal                                          | electricity     |
| Tide, wave and ocean                                   | electricity     |
| Wind                                                   | electricity     |
| Other sources                                          | electricity     |
| Electricity                                            | electricity     |
| Heat                                                   | heat            |
| Total                                                  |                 |
| Total of all energy sources                            |                 |
| Memo: Renewables                                       |                 |

Exceptions to one-to-one mapping from the categories in the IEA Energy Balances are noted here:

* Gas works: Energy inputs and outputs from gas works are only assigned to the coal gasification subsector of gas processing when the input fuel is coal. Otherwise, energy consumed here is mapped to "industrial energy use", and energy produced is simply added to the primary supply of natural gas.
* Losses: electricity is assigned to "elect_td_XXX"; gas is assigned to "gas pipeline", and the remainder of the fuels are assigned to "industrial energy use".
* Pipeline transport: natural gas is assigned to "gas pipeline", and all other fuels are assigned to "industrial energy use".
* Primary solid biomass: this is normally mapped to "biomass", except when consumed by the residential sector in a region where traditional biomass is modeled as a commodity, in which case it is assigned to "traditional biomass".
* Own use in electricity, CHP and heat plants: Electricity is mapped to "electricity_net_ownuse" and all other fuels are mapped to "industrial energy use".
* Other liquid biofuels: normally these are mapped to "biomass", but when consumed by the transportation road flow, they are assigned to "refined liquids", and for production purposes are assigned to the "refining/biomass liquids/ethanol" technology in each region.
* Petroleum refineries: electricity, gas, and oil inputs are mapped to the refining sector, oil refining technology. However all other inputs (e.g., coal, district heat) are assigned to "industrial energy use."
* Transportation sector consumption of primary biomass commodities and heat are not considered.

## References

<a name="iea2011">[IEA 2011]</a> International Energy Agency, 2011, *Energy Balances of OECD Countries: Documentation for Beyond 2020 Files*, International Energy Agency, Paris, France. [Link](http://wds.iea.org/wds/pdf/documentation_OECDBAL_2011.pdf)

<a name="iea2019">[IEA 2019]</a> International Energy Agency, 2019, *Energy Balances of OECD Countries 1960-2017 and Energy Balances of Non-OECD Countries 1971-2017*, International Energy Agency, Paris, France. 
