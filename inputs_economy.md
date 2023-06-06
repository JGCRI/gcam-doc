---
layout: index
title: External Inputs for Modeling the Economy
prev: diagram.html
next: economy.html
gcam-version: v6 
---

GCAM's economic inputs include information on population and income. These inputs are required for each [geopolitical region](common_assumptions.html#geopolitical-regions) and [historical year](common_assumptions.html#historical-years).

## External Inputs

### Description

Table 1: External inputs used for economics<sup>[1](#table_footnote1)</sup>

| Name | Description | Type | Source | Resolution | Unit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Population  | Population by country and year, used for 1700-1900 | External data set | Maddison | Country/region and year | Thousands |
| Population  | Population by country and year, used for 1950-2015 | External data set | UN | Country/region and year | Thousands |
| Population  | Population by country and year, used for 2015-2100 | External data set | <a href="https://secure.iiasa.ac.at/web-apps/ene/SspDb/dsd?Action=htmlpage&page=about">SSP database</a> | Country and year | Thousands |
| GDP | Historical GDP used for most countries for GDP prior to 2015 | External data set | <a href="http://www.ers.usda.gov/datafiles/International_Macroeconomic_Data/Historical_Data_Files/HistoricalRealGDPValues.xls">USDA</a> | Country and year | billion US$2010/yr (MER) |
| GDP | Historical GDP used for remaining countries for GDP prior to 2015 | External data set | World Bank | Country and year | billion US$2010/yr (MER) |
| GDP growth rate | Near-term growth rate of GDP (2015-2024) | External data set | <a href="http://www.imf.org/external/pubs/ft/weo/2015/02/weodata/index.aspx">IMF</a> | Country and year | % |
| GDP  | GDP by country and year, used for 2025-2100 | External data set | <a href="https://secure.iiasa.ac.at/web-apps/ene/SspDb/dsd?Action=htmlpage&page=about">SSP database, OECD Model</a> | Country and year | billion US$2005/yr (PPP) |
| National accounts | National accounts including capital, investment, depreciation, value-added, etc. | External data set | <a href="https://www.rug.nl/ggdc/productivity/pwt/pwt-releases/pwt9.1"> Penn World Table V9.1</a> | Country and year | million 2011US$ |
| National accounts | Value-added inputs and sectorial input-output tables in 2004, 2007, 2011, and 2014 | External data set | <a href="https://www.gtap.agecon.purdue.edu/databases/v10/index.aspx"> GTAP V10 Data Base</a> | Country, year, and sector | Nominal US$ and value shares |

<font size="-1">
<a name="table_footnote">1</a>: Note that this table differs from the one provided on the <a href="economy.html#inputs-to-the-module">Economy Modeling Page</a> in that it only lists external inputs to the economics module (either data sources or assumptions). Additionally, the units listed are the units of the raw inputs, rather than the units the GCAM requires.
</font>

<br/>
Note that for the Shared Socioeconomic Pathways (SSPs), different inputs are used for some variables. See [SSPs](ssp.html) for more information.

### Input Data

#### Population
Historical population is provided in [Maddison_population.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/Maddison_population.csv) (used for 1700-1900) and [UN_popTot.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/UN_popTot.csv) (used for 1950-2015).

Future population is provided in [SSP_database_v9.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/SSP_database_v9.csv).

#### GDP and national accounts
Historical GDP is provided in [USDA_GDP_MER.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/USDA_GDP_MER.csv) (used through 2015).

Near-term GDP growth rates are provided in [IMF_GDP_growth.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/IMF_GDP_growth.csv). 

Future GDP is provided in [SSP_database_v9.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/SSP_database_v9.csv). 

Historical national accounts from Penn World Table are provided in [pwt91.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/pwt91.csv) and [pwt91_na.csv](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/inst/extdata/socioeconomics/pwt91_na.csv). 

GTAP data (proprietary) is aggregated, processed (into value shares) and stored in [PREBUILT_DATA](https://github.com/JGCRI/gcam-core/blob/master/input/gcamdata/data/PREBUILT_DATA.red.csv). 

