---
layout: index
title: GCAM Build Instructions
prev: 
next:
current-version: v4.2 
---

## 1.Introduction
This section is for users that wish to compile GCAM source code into an executable. **The instructions in this section are not necessary if you are using a release version of GCAM and are only modifying GCAM XML input files.**

## 2. <a name="Mac_and_Unix_Build">Mac OS X and Unix Build Instructions</a>
Although the GCAM source code provides an "xcode3" project file, the most straightforward method of building the Mac version is using the Makefiles in the "linux" directory (gcam-core/cvs/objects/build/linux). (Building on Linux/Unix systems will be similar.) See notes below for using xcode.

### 2.1. Install Prerequisites

##### 2.1.1 Development tools
- Install java SDK 1.8
- Install C++ compliers.  The easiest way to do this is to install XCode, available in the App Store at no cost. Follow instructions provided with Xcode to install. If asked, also install the command-line tools. Even if you don't use xcode, this will install the C++ complier, the make command, and other command-line tools.


##### 2.1.2. Install xerces library

Download the "xerces" library, which is available at [https://xerces.apache.org/xerces-c/download.cgi](https://xerces.apache.org/xerces-c/download.cgi)

Once you expand the xerces zip or tar file, you can find detailed installation instructions for building and installing the library in `doc/html/index.html`. 

Set the following environment variables:

* `XERCES_SRC`: Set to the top-level directory created when you unpacked the xerces zip or tar file.
* `XERCES_INSTALL`:  Set to the directory in which you want to install xerces.

Example:  
```
export XERCES_SRC=$HOME/GCAM/build/xerces-c-3.1.4
export XERCES_INSTALL=$HOME/GCAM/libs/xerces
```

With these variables set, you can configure and build xerces as follows:
```
cd $XERCES_SRC
./configure CFLAGS="-arch x86_64" CXXFLAGS="-arch x86_64" --prefix=$XERCES_INSTALL --disable-netaccessor-curl
make install
```
The `--disable-netaccessor-curl` flag avoids having xerces use the curl library, a feature GCAM doesn't require.

After installing xerces, you can optionally delete all the intermediate files that were generated during the xerces build by running:

```	
make clean
```

Set the following environment variables to the directory where you built xerces:  
```
export XERCES_INCLUDE=$XERCES_INSTALL/include
export XERCES_LIB=$XERCES_INSTALL/lib
```

##### 2.1.3 Install boost headers

You also need to download the  [Boost C++ library](http://www.boost.org/users/download/). GCAM uses the "header only" features, so there is nothing to build. 

Set the `BOOST_INCLUDE` environment variable to indicate where you unpacked the boost library.  Example:

```
export BOOST_INCLUDE=$HOME/GCAM/build/boost_1_61_0
```

### 2.2 Build GCAM using command shell

Change directory to wherever you have the GCAM source code, and then move down to the linux directory, e.g.,

```
cd ~/GCAM/gcam-core/cvs/objects/build/linux
```

You will need to set some environment variables to indicate where to find the necessary Java libraries.  `JAVA_HOME` should be set to the home directory for the Java SDK (Software Development Kit) on your system, which you should have installed in step 1.  The exact name of this directory depends on the version of Java you have installed.  The example below is for Java 1.8.0_74

```
export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk1.8.0_74.jdk/Contents/Home"
export JAVA_LIB="$JAVA_HOME/jre/lib/server"
export JAVA_INCLUDE="$JAVA_HOME/include"
```

<!-- I'm pretty sure that the -std=c++11 flag should be part of the default CXXFLAGS in the build.  Double check
        and delete this section if so.  -rpl
        
Depending on the version of XCode (and ultimately, of the C++ compiler on your machine), you may have to specify a particular C++ language version to use. In my case (running XCode 6.2 on Mac OS 10.9.5) I had to define this additional environment variable:

	export CXX='c++ -std=c++11'
-->

GCAM also needs to know where to find certain java libraries (`*.jar` files). Note the backslash before the `*`, which prevents it from being expanded by the shell:

```
export JARS_LIB=/wherever/on/your/machine/\*
```

After that, you should be ready to build.  Run:

```
make gcam
```

Note that there are some warnings, but there should be no errors. When the compilation completes, you should have a version of GCAM in `gcam-core/exe/gcam.exe`.

Test the version by changing to `gcam-core/exe` directory and running the new executable:

```
cd ../../../../exe
./gcam.exe -Cconfiguration_ref.xml -Llog_conf.xml
```

### 2.3. Build GCAM using xcode 

GCAM also is released with an xcode project file (gcam-core/cvs/objects/build/xcode3). Using the xcode development environment allows a user to conveniently edit code, view headers and function definitions, and compile the model, but also to run in debug mode. While we cannot supply a comprehensive guide to using xcode, as exact details change with each version, below are some notes on setting up xcode. Some of the details below may change or not be necessary depending on the version of xcode and the GCAM project file you are using. 

- Change scheme to Release:
objects -> Edit scheme … -> Build Configuration
- Select project file in folder view (ensure All settings are selected) -> search for std -> Change C++ Standard Library to libstdc++
- Add to “Other Linker Flags” -ljvm
- Add to “Runpath Search Paths”: 
/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home/jre/lib/server
- Add to “Library Search Paths”: /System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home/jre/lib/server


Note that to run GCAM from within xcode, you must set the working directory to the exe directory within your workspace. This is done within the “options” section of the current scheme.

## 3. <a name="Windows_Build">Windows Build Instructions</a>

_to be added_
