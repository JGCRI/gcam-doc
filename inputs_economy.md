---
layout: index
title: External Inputs for Modeling the Economy
prev: diagram.html
next: economy.html
gcam-version: v8.2
---

GCAM's economic inputs include information on population and income. These inputs are required for each [geopolitical region](common_assumptions.html#geopolitical-regions) and [historical year](common_assumptions.html#historical-years).

GCAM's economy-related inputs include socioeconomic drivers, national-account data, labor-market information, and macroeconomic calibration parameters, for each [geopolitical region](common_assumptions.html#geopolitical-regions) and [historical year](common_assumptions.html#historical-years). These inputs are processed in `gcamdata` and written to the socioeconomic XML files used by GCAM. The main socioeconomic drivers include population, GDP, employment/labor supply, and total factor productivity (TFP). Additional macroeconomic inputs are used to calibrate capital stocks, depreciation, savings, investment, factor compensation, trade-balance terms, and macroeconomic production-function parameters.

The data processing described here supports both fixed-GDP configurations, in which GDP follows exogenous scenario assumptions, and GCAM-Macro configurations, in which TFP is calibrated so that open-GDP reference runs reproduce the corresponding socioeconomic GDP trajectories. The conceptual structure of GCAM-Macro is described in the [Economy](economy.html) page.

Note for a detailed description on how to update TFP assumptions see the helper `gcamdata` script for this purpose [update_macro_productivity.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/data-raw/update_macro_productivity.R).

## External Inputs

### Description

Table 1: External inputs used for economics<sup>[1](#table_footnote1)</sup>

| Name | Description | Type | Source | Resolution | Unit / notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Population, historical | Historical population by country and year | External data set | [Maddison and UN population inputs](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/socioeconomics/POP) | Country / region and year | Thousands of people |
| Population, future | SSP population projections used to extend historical population | External data set | [SSP Scenario Explorer](https://data.ece.iiasa.ac.at/ssp) and [GCAM SSP input files](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/socioeconomics/SSP) | Country and year | Thousands of people |
| GDP, historical | Historical GDP by country | External data set | [GCAMFAOSTAT GDP inputs](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/socioeconomics/GDP) | Country and year | Converted in `gcamdata` to million 1990 USD |
| GDP, future | SSP GDP projections used to extend historical GDP | External data set | [SSP Scenario Explorer](https://data.ece.iiasa.ac.at/ssp) and [GCAM SSP input files](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/socioeconomics/SSP) | Country and year | Growth rates are used to extend historical GDP |
| National accounts | GDP decomposition, capital stock, depreciation, labor compensation, capital compensation, saving rates, and related national-account variables | External data sets | [Penn World Table v11.0 and Global Macro Database inputs](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/socioeconomics/NationalAccounts) | Country / GCAM region and year | Processed into GCAM regional macroeconomic accounts |
| Employment and labor data | Employment data used for labor-market and sectoral labor processing | External data sets | [ILO employment inputs](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/socioeconomics/ILO), with additional sectoral information used in agricultural processing | Country, sector, and year | Thousand persons |
| GTAP value-share data | Sectoral labor, capital, and value-share information used in macroeconomic and sectoral calibration | External / prebuilt data | [GTAP-related socioeconomic inputs](https://github.com/JGCRI/gcam-core/tree/master/input/gcamdata/inst/extdata/socioeconomics/GTAP) and `PREBUILT_DATA` | Region, sector, and year | Value shares and monetary values |
| Labor supply allocation | Parameters used to allocate regional labor supply across agriculture and Materials | Assumption file | [A_labor_supply_sector.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/A_labor_supply_sector.csv) | GCAM region and sector | Logit and allocation parameters |
| Materials production function | Nested CES parameters for the Materials sector in GCAM-Macro | Assumption file | [gcam_macro_nested_CES_function.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/gcam_macro_nested_CES_function.csv) | GCAM region / production-function nest | Elasticity and share-function parameters |
| Materials TFP | Calibrated TFP parameters for GCAM-Macro open-GDP runs | Assumption / calibrated input | [gcam_macro_TFP_open.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/gcam_macro_TFP_open.csv)| GCAM region, scenario, and year | Index, base year = 1 |
| Income elasticities | Income-elasticity assumptions for selected final-demand sectors | Assumption files | Processed through [zsocio_L232.Inc_Elas_scenarios.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L232.Inc_Elas_scenarios.R) | Sector, region, scenario, and year | Elasticity |

<br />

## Input data processing

Historical population is processed from Maddison and UN population inputs in [zsocio_L100.Population_hist.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L100.Population_hist.R). Future population is processed from the SSP database in [zsocio_L100.SSP_database.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L100.SSP_database.R). The processed population data are then harmonized and extended in [zsocio_L101.Population.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L101.Population.R).

Historical GDP is processed from GCAMFAOSTAT GDP inputs in [zsocio_L100.GDP_hist.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L100.GDP_hist.R). Future GDP is processed from the SSP database and stitched to historical GDP in [zsocio_L102.GDP.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L102.GDP.R). The same processing system also generates per-capita GDP and PPP/MER conversion factors used by GCAM.

National-account variables are processed primarily from Penn World Table v11.0 and the Global Macro Database in [zsocio_L100.NationalAccounts.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L100.NationalAccounts.R), [zsocio_L103.NationalAccounts.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L103.NationalAccounts.R), and [zsocio_L203.NationalAccounts.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L203.NationalAccounts.R). These modules construct the national-account inputs used to calibrate GCAM-Macro, including capital stock, depreciation rates, labor and capital compensation, savings rates, capital net exports, factor productivity, and Materials-sector production-function parameters.

Employment and labor-market data are processed using ILO employment data and related mappings in [zsocio_L100.Employment.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L100.Employment.R). With GCAM-Macro, total employment is used as a labor-supply constraint and is allocated between agriculture and the Materials sector. Labor-supply and scenario inputs are assembled in [zsocio_L201.Pop_GDP_scenarios.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_L201.Pop_GDP_scenarios.R) and written to the scenario-specific socioeconomic XML files in [zsocio_xml_socioeconomics_SSP.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_xml_socioeconomics_SSP.R).

## Socioeconomic XML outputs

The processed economy inputs are written to three groups of socioeconomic XML files.

Table 2: Main socioeconomic XML outputs used by GCAM

| XML file(s) | Main contents | Processing module |
| :--- | :--- | :--- |
| `socioeconomics_CORE.xml`, `socioeconomics_SSP1.xml`, ..., `socioeconomics_SSP5.xml` | Population, GDP, PPP/MER conversion, total employment (`Labor_Total`), labor-force share, labor supply sectors, labor resource prices, and total factor productivity | [zsocio_xml_socioeconomics_SSP.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_xml_socioeconomics_SSP.R) |
| `socioeconomics_macro.xml` | National-account variables, savings-rate parameters, Materials-sector nested CES production-function inputs, factor productivity, tracking accounts, capital resources, and capital-link information | [zsocio_xml_socioeconomics_macro.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_xml_socioeconomics_macro.R) |
| `socioeconomics_incelas_SSP1.xml`, ..., `socioeconomics_incelas_SSP5.xml` | Income-elasticity assumptions for selected final-demand sectors | [zsocio_xml_socioeconomics_IncomeElasticity.R](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/R/zsocio_xml_socioeconomics_IncomeElasticity.R) |

<br />
The CORE socioeconomic XML uses the SSP2 population, GDP, and labor assumptions, but uses the CORE-specific calibrated TFP trajectory for GCAM-Macro reference calibration.

GTAP data (proprietary) is aggregated, processed (into value shares) and stored in `PREBUILT_DATA`.

## Notes on KLEAM-related inputs

GCAM-Macro-KLEAM extends the earlier GCAM-Macro KLEM structure by integrating agriculture with the macroeconomic accounting, labor-market, and savings-investment systems. As a result, the economy inputs now include labor-supply and labor-allocation information in addition to population and GDP. KLEAM also uses expanded national-account tracking and sectoral capital/investment information to support endogenous capital rental price feedbacks across Agriculture, Energy, and Materials.

Agricultural labor and capital inputs, agricultural productivity inputs, and sectoral capital tracking are described in the land, supply input, and economy pages. Additional details can be found in [CMP-411](cmp/411-GCAM_Macro_KLEAM.pdf).
