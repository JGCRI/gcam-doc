---
layout: index
title: Compiling GCAM
prev: 
next:
gcam-version: v3.2 
---

Compiling on Posix Systems
--------------------------

The GCAM user package comes with Makefiles suitable to build with most unix systems. However some third part libraries are required to build (Boost is provided under Main\_User\_Workspace/libs/boost-lib and does not need to be built). The Berkeley DBXML contains all such libraries and can be obtained from: <http://www.oracle.com/technetwork/products/berkeleydb/downloads/index.html>

Version 2.5.16 is recommended.

Build instructions can be found at: <http://docs.oracle.com/cd/E17276_01/html/ref_xml/xml_unix/intro.html#buildall>

GCAM will utilize the C++ libraries, the Model Interface tool to view results requires the Java bindings to be built as well (--enable-java flag to the build script). WARNING: bugs the in DBXML library affect the Model Interface and patches (provided under Main\_User\_Workspace/libs/dbxml-patches) should be applied before building DBXML.

Some users have had additional issues when compiling the Berkeley DBXML libraries: 1. In building dbxml, I got a compile error that says:

`   In file included from ../src/framework/ReferenceCounted.cpp:24:0:`
`   ../include/xqilla/framework/XPath2MemoryManager.hpp:90:11: erro: ‘ptrdiff_t’ does not name a type`
`   `

I found a fix, which worked for me. Just insert:

`   #include <cstddef>`
`   `

before the line of "\#include &lt;algorithm&gt;" in ../include/xqilla/framework/XPath2MemoryManager.hpp

2. Building with --enable-java resulting in a java failure during configuration that was resolved by setting an option to increase memory:

`   export _JAVA_OPTIONS="-Xmx256M"`

Once the third party libraries are built we can build GCAM. The GCAM Makefile will check the following environment variables to find required third party libraries (the following commands may need to be adjusted depending on your shell):

`   export DBXML_LIB=<DBXML directory>/dbxml-2.5.16/install/lib`

`   export DBXML_INCLUDE=<DBXML directory>/dbxml-2.5.16/install/include`

`   export BOOST_INCLUDE=<GCAM directory>/Main_User_Workspace/libs/boost-lib`

The make file is located under: cd &lt;GCAM directory&gt;/Main\_User\_Workspace/cvs/objects/build/linux

And can be started by simply typing make (note you may add the -j \[N\] to use multiple cores to compile where N is a number which makes sense for your system).

The executable gcam.exe will be copied to &lt;GCAM directory&gt;/Main\_User\_Workspace/exe

Where it can be execute: ./gcam.exe

Or:

./gcam.exe -C&lt;alternative configuration file&gt;

To run the Model Interface Java is required and will need to be able to find the DBXML libraries as well. This may be accomplished by setting: export LD\_LIBRARY\_PATH=$LD\_LIBRARY\_PATH:&lt;DBXML directory&gt;/dbxml-2.5.16/install/lib

cd &lt;GCAM directory&gt;/ModelInterface

java -jar ModelInterface.jar

Alternatively you could avoid setting LD\_LIBRARY\_PATH and set the library path directly in Java:

java -Djava.library.path=&lt;DBXML directory&gt; /dbxml-2.5.16/install/lib -jar ModelInterface.jar

Compiling with XCode
--------------------

Details Soon

Compiling with Visual Studio
----------------------------

Details Soon
