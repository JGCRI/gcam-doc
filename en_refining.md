---
layout: index
title: Refining
next: en_gas_processing.html
current-version: v4.2 
---

The refining sector, or liquid fuels production sector, explicitly tracks all energy inputs, emissions, and costs involved with converting primary energy forms into liquid fuels. Liquid fuels include gasoline, diesel, kerosene, ethanol and many other liquid hydrocarbon fuels; for the full mapping see [Mapping the IEA Energy Balances](en_IEA_mapping.html). The refining sector includes subsectors of oil refining, biomass liquids, gas to liquids, and coal to liquids, each of which are described below. Each of these four subsectors is available starting in the first future time period, and the capital stocks of refineries are explicitly tracked. The structure of refining in the broader energy system is shown in Figure 1, with example input-output coefficients.

![Figure 1](gcam-figs/refining.png)<br/>
Figure 1: Structure of refining sector and associated products within the energy system, with sample input-output coefficients shown. Electricity and natural gas inputs to oil refining not shown for simplicity.
{: .fig}

## Oil Refining

The oil refining subsector accounts for the vast majority of the historical output of the refining sector, globally and in all regions. Each region is assigned a single production technology for oil refining; as indicated in Figure 1, this technology does not differentiate between conventional and unconventional oil, whose competition is explicitly modeled upstream of the refining sector. In a typical region, the oil refining technology consumes three energy inputs: crude oil, natural gas, and electricity. This is depicted in Figure 2, with typical input-output coefficients shown.

![Figure 2](gcam-figs/oil_refining.png)<br/>
Figure 2: Oil refining production technology, with example coefficients.
{: .fig}

The coefficients of the oil refining production technology reflect whole-process inputs and liquid fuel outputs; there is no explicit tracking of the production and on-site use of intermediate products such as refinery gas (still gas). Electricity produced at refineries (both the fuel inputs and electricity outputs) is modeled in the electricity and/or industrial energy use sectors. There is no oil refining technology option with CO<sub>2</sub> capture and storage (CCS) considered.

## Biomass Liquids

The biomass liquids subsector includes up to eight technologies in each region, with a global total of 11, listed in Table 1.

**Table 1**: Biomass liquids production technologies in GCAM

| Technology        | Inputs           |
| :------------- |:-------------|
| biodiesel (soybean)     | OilCrop, natural gas |
| biodiesel (oil palm)     | PalmFruit |
| biodiesel (Jatropha)     | biomassOil |
| cellulosic ethanol      | biomass      |
| cellulosic ethanol CCS level 1 | biomass      |
| cellulosic ethanol CCS level 2 | biomass      |
| corn ethanol      | Corn, natural gas, electricity |
| sugar cane ethanol      | SugarCrop |
| FT biofuels      | biomass |
| FT biofuels CCS level 1      | biomass |
| FT biofuels CCS level 2      | biomass |

The biomass liquids technologies include up to two "first-generation" biofuels in each region, defined as biofuels produced agricultural crops that are also used as food, animal feed, or other modeled uses (described in the [AgLU module](aglu.html)). Second-generation technologies consume the "biomass" and "biomassOil" commodities, which include purpose-grown bioenergy crops, as well as residues from forestry and agriculture, and municipal and industrial wastes.  Starting in 2020, second-generation biofuels (cellulosic ethanol and Fischer-Tropsch syn-fuels) are introduced, each with three levels of CCS: none, level 1, and level 2. The first CCS level generally consists of relatively pure and high-concentration CO2 sources (e.g., from gasifiers or fermenters), which have relatively low capture and compression costs. The second CCS level includes a broader set of sources (e.g., post-combustion emissions), and incurs higher costs but has a higher CO<sub>2</sub> removal fraction.

## Coal to Liquids

The majority of the world's coal to liquids production is in South Africa, but the technology is available to all regions in GCAM starting in the first future time period. Note that the CO<sub>2</sub> emissions intensity is substantially higher than all other liquid fuel production technologies; where crude oil refining emits about 5 kg of CO<sub>2</sub> per GJ of fuels produced, the emissions factor for coal to liquids is about 130 kg of CO<sub>2</sub> per GJ of fuel produced, which is higher than the emissions from combustion of the fuels produced (about 70 kg CO<sub>2</sub> per GJ). As with biomass liquids, two different production technologies with CCS are represented, with costs and CO<sub>2</sub> removal fractions based on [Dooley and Dahowski (2009)](en_refs.html#dooley2009).

## Gas to Liquids

While a minor contributor to liquid fuels production globally (about 0.1%), gas to liquids has received increased attention in recent years, with a number of large-scale projects planned, under construction, or recently finished. Because the carbon content of the input fuel is lower than the carbon content of the fuels produced, the net CO<sub>2</sub> emissions from the process (about 10 kg CO<sub>2</sub> per GJ of fuel) are significantly lower than coal to liquids. As such, it may be an important technology in scenarios with high oil prices and/or CO<sub>2</sub> emissions prices. There is only one production technology represented in GCAM, with no CCS option available.