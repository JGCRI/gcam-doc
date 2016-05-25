---
layout: index
title: Minimum system requirements for GCAM
prev: 
next:
gcam-version: v3.2 
---


GCAM developers frequenty receive questions on what type of computer
is required to run the model. In general, the model will run in a
reasonable amount of time (10-20 min) on most personal computers. Some
requirements have increased with the release of
[GCAM 3.0](GCAM_Revision_History.html), please see below.


Hardware Requirements
---------------------

-   At least 4 GB of RAM 
-   5GB of free disk space (model output databases can quickly become large files)


Software Requirements
---------------------

-   A 64-bit operating system such as:
    -   Windows 7
    -   Mac OS X (10.5 or greater recommended)
    -   Linux
-   64-bit Java


Additionally, Windows users will need to download the Visual Studio
2010 Redistributable Package (x64) available
at:&nbsp;[<http://www.microsoft.com/download/en/details.aspx?id=14632>](http://www.microsoft.com/download/en/details.aspx?id=14632). An
error saying 
`the program can't start because MSVCR100.dll is missing from your computer` 
is indicative of this software not being installed.


Recommended Software
--------------------

Additional software is recommend to make working with model files easier.

### XML Viewer

Data is provided to the model as XML files. While these files can be
viewed in web browsers or text editors, a dedicated xml viewer that
can provide a tree view of the file is recommed. On Windows, XML
Marker ([<http://www.symbolclick.com>](http://www.symbolclick.com)) is
one option. A cross-platform alternative is Oxygen XML Author
([<http://www.oxygenxml.com/>](http://www.oxygenxml.com/))

### Spreadsheet Application

Direct XML data file creation is possible, but it is easier to
generate a table as a CSV. The ModelInterface (included with the GCAM
distribution) can convert a CSV to an XML file, and the original CSV
files are included in the "input" directory of the GCAM
`Main_User_Workspace` folder. GCAM developers typically use Microsoft
Excel, although other alternatives do exist. 

### C++ Editor

For viewing model code, the recommended software on Windows and Mac
would be Microsoft Visual Studio C++ Express Edition 2010 or Apple
Xcode. This is less important, as GCAM is a flexible model and most
changes can be accomplished with data provided in CSV (and
subsequently XML) files. 

