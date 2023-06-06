---
layout: index
title: Debugging
gcam-version: v7
devguide: dev-guide.html
---
## Debugging: common issues

### Types of messages in GCAM  
GCAM prints different levels of messages to help identify issues.  

* WARNING: a notification of a potential problem; however, since this could be benign the model will continue (e.g., unrecognized text string in an xml input file).
 
* ERROR: a notification of a likely problem. In some cases, the model will continue to run (e.g., the sum of area read in for all land leafs in a region is more than 0.1% different from the total area read in for that region); in other cases, the model will abort (e.g., if the difference is more than 5%).

* SEVERE: Major issue that will prohibit the model from running properly (e.g., no world within the scenario container)

### Configuration/input file errors

#### Problem: Immediate crash
_Message immediately follows "Parsing input files..."_

Message: `ERROR: Unexpected XML Read Exception` 

Possible causes: 

* The gcamdata system has not yet been run or did not produce XMLs

* The `XMLInputFileName` or `BatchFileName` (or their pathways) are incorrect

* If running from code editor, the project’s working directory needs to be set to the exe/ folder. Sometimes it defaults to the `cvs/objects/build/*/` folder


#### Problem: Crash while reading ScenarioComponents XML files
_Message immediately follows the parsing of an individual input file._

Message: `ERROR: Unexpected XML Read Exception`

Possible causes: 

* File was not found (look for typos in the file name)

* File was not correctly formatted (when edited by hand)


#### Problem: Crash after parsing, but before first period
_Message immediately follows "XML parsing complete."_

Message: `ERROR: Could not find global technology for...`

Possible causes:  

* Mis-spelled a technology name (Cement instead of cement). Strings in GCAM are case-sensitive.

* Missing technology

* Added some land input in some region / basin / crop combination that does not exist

#### Problem: Message printed to screen about "explicitly creating a market for CO2"
_Model will not abort, but will have problems solving later._

Message: `Using negative-emissions-final-demand with target-finder without explicitly creating a market for CO2 may hinder solution performance. Please read in a policy file with a zero tax.`

Cause: A carbon price must be read in with target finder in order to set up dependencies.

### Calibration and solver failures

#### Calibration failures
_A calibration failure means that the read-in values for supply and demand do not match._

Message: `Model did not calibrate successfully in period...`

Cause: Unbalanced supply and demand in calibration years. Check all calibration data, including coefficients to debug. 

#### Solver failures
_A solver failure means that the model cannot find a set of prices where supply and demand are equal for all commodities._

Message: `Model did not solve within set iteration...`

_Note: solution issues can be difficult to decipher_

Things to try: 

* Useful to make ”one” change at a time

* Double check your configuration

* Use supply / demand curves feature to check problem markets (`input/extra/supply_demand_curves.xml`). Discontinuities and vertical supply or demand curves are difficult to solve. 

* Increase the iteration count in the solver configuration file. [Note: there is no guarantee this will work, but it is easy to try and has helped in the past]

* Ask for help on GitHub: https://github.com/jgcri/gcam-core/issues



