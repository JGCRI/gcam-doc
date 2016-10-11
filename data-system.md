---
layout: index
title: The GCAM Data System
prev: 
next: 
gcam-version: v4.3 
---

## 1.Introduction
This document provides information on running the GCAM data system.  The data system refers to the system by which GCAM imports and processes primary data sources to generate the XML input files for GCAM, and explicitly assigns all assumptions and mappings.  Unfortunately the GCAM data system relies on proprietary data, namely the [IEA energy balances](https://www.iea.org/statistics/relateddatabases/worldenergystatisticsandbalances/).  Since not all users may have purchased access to this data we have also provided a [data system release add-on](user-guide.html#introduction) package which replaces portions of the data system and includes aggregate data which we may still distribute and still allow users _some_ means to modify assumptions to run GCAM under.  Therefore this document is divided into two over-arching sections: [Simplified GCAM Data System](#simplified-gcam-data-system) and [The Full GCAM Data System](#gcam-data-system).

### 1.1 Utilities Required for Running the Data System
In either case it will be *very* helpful to have the `Make` and its associated utilities installed.  The make utility is useful since it will keep track of dependencies between these files and automatically re-run any steps that need to occur to update the XML files based off of any changes a user may have made.

#### 1.1.1 Getting Make on Windows
The easiest way to get the required utilities is to install the [Git version control system for Windows](https://git-scm.com/downloads) (and preferred as using Git to manage changes and get the latest GCAM development updates is in itself very useful).  The Git download contains a `Git bash` which can provide a command line interface to run the `make` command.
Unfortunately, it does not contain the `Make` utility itself but a suitable version can be found through [Win Builds](http://win-builds.org/1.5.0/packages/windows_64/make-4.0-5-x86_64-w64-mingw32.txz).  There are many ways to install Make into a location in which the Git Bash can find it.  The follow is one way that should work if run in Git bash:

```
cd ~
mkdir bin
cd bin
tar -xzf ~/Downloads/make-4.0-5-x86_64-w64-mingw32.txz
```

#### 1.1.2 Getting Make on Mac
Mac users can use the Terminal app to run the `make` commands however the required command line tools may not be installed if they have not yet downloaded any developer tools.  The easiest way to get the required utilities is to install the Xcode command line tools. Some instructions on how to do this can be found [here](http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/)

### 1.2 R and Packages for Running The Full Data System
Data processing in the GCAM data system is done using the [R programming language for statistical computing](https://www.r-project.org).  In addition we use the "reshape2" R package which can typically be installed through R:

```
install.packages("reshape2")
install.packages("stringr")
```

#### 1.2.1 R notes on Windows
When installing packages Windows users may have to run R as "administrator" to be able to install the libraries in an appropriate location (otherwise they should make sure where they are installed will be found by subsequent invocations of R).  Note that on Windows, R is not included by default in the `PATH` (the list of places to find an executable on the command line).  However this will be needed so that it can be found when running the `Makefile` from within Git bash.  You can find some instruction on how to do this [here](https://cran.r-project.org/bin/windows/base/rw-FAQ.html#Rcmd-is-not-found-in-my-PATH_0021) although we reccommend to update the `PATH` from the Control Panel since the syntax for the command prompt is different for Git bash.

## 2. Simplified GCAM Data System
The "Simplified" GCAM data system can be obtained by downloading the [data-system.tar.gz](user-guide.html#introduction).  It will add the "level2" CSV files, the GCAM XML input files, and the "xml-batch" files that are used to help convert the CSV files into the XML files.  In addition it will replace the `Makefile`s in the gcam-data-system so that `make xml` will just convert the "level2" CSV files into the XML input files instead of trying to run the R processing files that require the IEA data and will fail without it.
Users can edit the values in any of the CSV files which will be detected by the `Make` utility and rebuild the XML files appropriately.  While the documentation found in `<GCAM Workspace>/input/gcam-data-system/_common/documentation` is geared towards documenting the full data system, users of the simplified data system may still find it help to decode the numbering system used to name the level2 CSV files.

## 3. GCAM Data System
The idea behind the full GCAM data system is to assimilate and aggregate primary data sources, and add modeling assumptions to produce the inputs required to run GCAM.  It consists of a series of R scripts that are partitioned by GCAM components such as energy, agriculture, socio-economics, Non-CO<sub>2</sub> emissions, etc.  Within each component it is partitioned into level1 and level2, which are generally differentiated in their specificity for building GCAM input files. Level1 output data consists of human-readable tables, with generic sector/commodity names and region numbers; level1 data tables could be useful for constructing input datasets for many models. Level2 output files consist of only data, with associated ID variables, that will be read to XML, and are formatted and organized specifically for this purpose. The level2 CSV files get translated to the final XML input format that is read by GCAM, just as is the case in the [Simplified system](#simplified-gcam-data-system).
As mentioned the IEA Energy Balances dataset is required and must be [installed](#installing-iea-data).  Once that is done users can successfully [run the gcam-data-system](#running-gcam-data-system).

### 3.1 Installing IEA Data
Users who have access the the [IEA energy balances](https://www.iea.org/statistics/relateddatabases/worldenergystatisticsandbalances/) will need to export the data from the Beyond 2020 browser.  The GCAM data system is configured for the 2012 edition of the IEA energy balances, which goes through 2010 for all countries and sectors, and provides 2011 estimates for a small selection of variables. While more recent versions with more recent years will ostensibly work with the existing R code, any changes to the names or available categories of any variables (COUNTRY, PRODUCT, FLOW) in the source data will require updates to the mappings and/or code. To export the data in the format used by the data system, users should open the `Beyond 2020 Browser`, and toggle the variables so that the years are columns, and the following ID variables are all displayed, with no variables held fixed:

```
COUNTRY (as names)
FLOW (as "short names", or ID codes)
PRODUCT (as names)
```

The reason why `FLOW` should be displayed as `ID codes` is that in several cases, different flows with different ID codes are assigned the same name (e.g., "EREFINER" and "TREFINER" are differentiated flows, but both are named "Petroleum Refineries"). Once the full dataset is displayed, users can select `File -> Export`, and select "CSV". The exported files should be named `en_OECD.csv` for the OECD countries' energy balances, and `en_nonOECD.csv` for the non-OECD balances, and placed in the `<GCAM Workspace>/input/gcam-data-system/energy-data/level0` folder. Once the CSV files are created, several further adjustments are required:

1. All special characters should be removed (e.g., Côte d’Ivoire is renamed Cote dIvoire)
2. Text in the data columns (e.g., letters for redacted data on the nuclear industry in various countries) should be removed, and replaced with 0.
3. Missing values should be set to 0

If using a more recent edition, users should check to make sure that the country names, flow codes, and product names are the same as what the mappings files are expecting; see `<GCAM Workspace>/input/gcam-data-system/energy-data/mappings/IEA*` for the set of mapping files.

### 3.2 Running GCAM Data System
In order to run the GCAM data system users simply need to run the make commands such as:

```
cd <GCAM Workspace>/input/gcam-data-system
make xml
```
Running the "xml" command of the makefile in the root directory will execute all necessary code all the way through to the generation of XML files. The "clean" command will wipe the output of any prior runs of the data system, so the next "xml" after a "clean" will run all code files. A run from a clean workspace currently takes about 30 minutes. Note that the make utility doesn’t always pick up every dependency; particularly after modifications that affect a large number of code files, the system may miss files that should have been re-run. This usually causes either the data system or GCAM to crash. As a general rule, if the changes made will affect a large number of modules (e.g. a change to the country/region mapping), it’s probably best to either clean the workspace prior to re-running, or manually force the system to re-run all code files that are known to be affected by the change(s). One can manually force R code files to be run at the next make by deleting the log files associated with the given code files; the makefile treats the log files as the primary outputs of the code files. The file paths to the log files are in for example `energy-processing-code/logs/L202.Ccoef.R.log`.

A very detailed documentation of the GCAM data system can be found in `<GCAM Workspace>/input/gcam-data-system/_common/documentation`.  It can help navigate the GCAM data system and understand how and where users can change inputs or assumptions to update the GCAM model inputs to suite a user's needs.

