---
layout: index
title: GCAM Style Guide
gcam-version: v5.1
---
## GCAM Style Guide

* GCAM Style
* Links to style guide for `gcamdata` and other ecosystem models

Adapted from Coding Standards for C, C++, and Java by the PNNL BioInformatics Initiative and by NASA's Vision 2000 CCS Package and Application Team, Collab Software Coding Standards Guide for Java by DOE's EMSL Collaboratory team, and the PNNL Coding Standards of the Software Systems Engineering Process.

### Introduction
The purpose of these coding standards is to increase productivity, reduce errors, and facilitate the maintenance, portability, and reuse of custom C, C++, and Java source code developed under the GCAM Modeling Group. These standards were developed from a variety of sources, including other standards documents, software examples from de facto standard language references, and personal experience. As with any guidelines, there will be circumstances where full compliance is not desirable for efficiency, maintainability, or other reasons. In these cases, conformance should not be pursued simply for the sake of meeting the standards.

#### When the standards are not followed, it is advisable to add a comment with the reason for non-conformance.

This document is organized into five sections:

* Directory Structure - directory structure.
* File Organization - source file contents and layout
* Naming Conventions - how to name files and identifiers
* Style Guide - guidelines for how source code should look
* Recommended Programming Practices

The   symbol is used to denote language specific information. Within tables, "n/a" denotes "not applicable".
 
### 1 Directory Structure
All custom source and header files should be grouped into relevant topics and placed within the topic directory. Header and source files should be further separated in Include and Source directories within the topic directory. Libraries should be placed in separate locations and added through the IDE. If the project involves mixed-code (i.e. Fortran and C++) it is acceptable to separate the source code by language, with a single folder named after each language. As projects become more complex, this standard is likely to evolve.
 
### 2 File Organization
#### 2.0 File Contents
Files should be used to organize related code modules, either at the class (for C++ and Java) or function (for C) level. The following table identifies the contents of individual files for each language:

File contents	|C++	|Java
:----|:----|:----
class declaration (header)	|X	|n/a
class definition (source)	|X	|X
main function	|X	|(with primary class)
function(s)	|X	|n/a
globals	|X	|n/a

#### 2.1 Source File Layout
Source files should contain the following components in the order shown:

File contents	|C++	|Java
:----|:----|:----
prolog	|X	|X
package imports	|n/a	|X
system #includes	|X	|n/a
application #includes	|X	|n/a
external functions	|X	|n/a
external variables	|X	|n/a
constants	|X	|X
static variable initializations	|X	|X
class declaration	|n/a	|X
public methods	|X	|X
protected methods	|X	|X
private methods	|X	|X
functions	|X	|n/a
  
  (C++) When its possible to put a needed  #include line in the source file instead of in the header file, do so.  This will reduce unnecessary file dependencies and save a little compile time.

#### 2.2 Header File Layout
Header files should contain the following components in the order shown (note that Java does not use header files):

File contents|C++	|Java
:----|:----|:----
file guard	|X	|n/a
prolog	|X	|n/a
system #includes	|X	|n/a
application #includes	|X	|n/a
/#defines	|X	n|/a
macros	|X	|n/a
external functions	|X	|n/a
external variables	|X	|n/a
constants	|X	|n/a
structs	|X	|n/a
forward declarations	|X	|n/a
class declaration	|X	|n/a
public methods	|X	|n/a
protected methods	|X	|n/a
private methods	|X	|n/a
inline method definitions	|X	|n/a
functions	|X	|n/a

#### 2.3 Header File Guard
   (C++) All header files should contain a file guard mechanism to prevent multiple inclusion. This mechanism is implemented as shown by the following lines:
   
```C++
#ifndef MeaningfulNameH         // first line of the header file  
#define MeaningfulNameH         // second line of the header file

                       
                      // body of the header file. 
          
#endif  // MeaningfulNameH      // last line of the header file; note comment
```

#### 2.4 Prolog
The following standard Copyright Notice will appear first in the prolog in every file.
  
```
LEGAL NOTICE
This computer software was prepared by Battelle Memorial Institute, hereinafter the Contractor, under Contract No. DE-AC05-76RL0 1830 with the Department of Energy (DOE). NEITHER THE GOVERNMENT NOR THE CONTRACTOR MAKES ANY WARRANTY, EXPRESS OR IMPLIED, OR ASSUMES ANY LIABILITY FOR THE USE OF THIS SOFTWARE. This notice including this sentence must appear on any copies of this computer software.

EXPORT CONTROL
User agrees that the Software will not be shipped, transferred or exported into any country or used in any manner prohibited by the United States Export Administration Act or any other applicable export laws, restrictions or regulations (collectively the "Export Laws"). Export of the Software may require some form of license or other authority from the U.S. Government, and failure to obtain such export control license may result in criminal liability under U.S. laws. In addition, if the Software is identified as export controlled items under the Export Laws, User represents and warrants that User is not a citizen, or otherwise located within, an embargoed nation (including without limitation Iran, Syria, Sudan, Cuba, and North Korea) and that User is not otherwise prohibited under the Export Laws from receiving the Software.
 
Copyright 2011 Battelle Memorial Institute.  All Rights Reserved.
Distributed as open-source under the terms of the Educational Community 
License version 2.0 (ECL 2.0). http://www.opensource.org/licenses/ecl2.php
 
For further details, see: http://www.globalchange.umd.edu/models/gcam/” 
```

The following comment block should appear next.

```C++
/•	Author or authors
•	Creation Date
•	Point of Contact
•	Author or authors
•	Creation Date
•	Description of the file contents
/*!
* \file filename
* \ingroup project name
* \brief Brief description
* 
* Detailed description
* \author Author // Use one /author tag for each author
* \date $Date$ Leave this exactly as written.
* \version $Revision$ Leave this exactly as written.
*/
```
```

#### 3 Naming Conventions
The following table summarizes the naming conventions:
Identifier	C	C++	Java
package	n/a	shortname1
class, union, struct	MeaningfulName2
exception class	n/a	MeaningfulException2
interface	n/a	IMeaningfulActionable3
typedef	MeaningfulName2	n/a
enum	n/a	MeaningfulName2	n/a
function, method	meaningfulName4
accessor method	n/a	getX, setX
object, variable	meaningfulName4
global variable	     gMeaningfulName5	      gMeaningfulName5	      gMeaningfulName5
member variable	    mMeaningfulName6	     mMeaningfulName6	     mMeaningfulName6
argument variable	    aMeaningfulName7	     aMeaningfulName7	     aMeaningfulName7
/#define, macro	MEANINGFUL_NAME8	n/a
const, static final variable	MEANINGFUL_NAME7
source file	.c	.cpp	.java
header file	.h	n/a
 
   (Java) 1 Package names are entirely lower case. 
   (C++, Java) 2 Most names are abutted word(s) with first letter of each word capitalized and the remaining letters of each word in lower-case. 
   (Java)  3  Interface names start with capital "I". The rest of the name is as in 2. 
   (C++, Java) 4  Function/method and object/variable names are abutted word(s) with first letter of each word except the first word capitalized and the remaining letters of each word in lower-case.  The first letter of the first word is lower-case. 
   (C++, Java)  5 Global variable names start with a lower-case g;  the rest of the name is as in 2. 
   (C++, Java)  6 Member variable names start with a lower-case m; the rest of the name is as in  2. 
   (C++, Java)  7 Argument variable names start with a lower-case a; the rest of the name is as in  2. 
   (C++, Java)  8 Names are entirely in capital letters; words are separated with an underscore.
####3.1 Descriptive Names
Names should be readable and self-documenting. Abbreviations and contractions are discouraged. Shorter synonyms are allowed when they follow common usage within the domain.
####3.2 Valid Characters
All names should begin with a letter. Individual words in compound names are differentiated by capitalizing the first letter of each word as opposed to separating with an underscore. The use of special characters (anything other than letters and digits), including underscores is strongly discouraged. The first 31 characters of a name (including the prefix) must be unique, due to restrictions of various platforms. The uniqueness must not be due solely to a difference in case.
####3.3 File Names
Filenames should only contain one period, to separate the file extension.
####3.4 Function Names
Function names should preferably be an action verb. Boolean-valued functions (those that have two possible return values) should use the "is" prefix as in "isEmpty()".
  (C++) All functions must be prototyped, with the prototypes residing in header files.
#### 3.5 Namespaces
Namespace collision should be minimized without introducing cryptic naming conventions by using the C++ namespace or Java package constructs.
  (Java) Create a new Java package to group classes of related functionality. Package source and class files then reside in a convenient hierarchical directory structure that maps directly to the package name.
 
 
### 4 Style Guidelines
The primary purpose of style guidelines is to facilitate long-term maintenance. During maintenance, programmers who are usually not the original authors are responsible for understanding source code from a variety of applications. Having a common presentation format reduces confusion and speeds comprehension. Therefore, the following guidelines are specified based on the principles of good programming practice and readability. In the cases where two or more equally valid alternatives are available, one was selected to simplify specification. In the future, automated tools may be used to apply style guidelines to source code files.
#### 4.1 Lines
##### 4.1.1 Line Length
All lines should be displayable without wrapping on an 80-character display. If wrapping is required, try to break at an operator, and start the next line with the operator vertically aligned. For example:
```C++
    cout << "This is an example of a line which must be wrapped, value = "
         << value << endl;
```

##### 4.1.2 Statements Per Line
Each statement should begin on a new line.
#### 4.2 Comments
##### 4.2.1 Automated Documentation Comments
For comments meant to be extracted by an automated documentation tool, follow the Java convention of using the standard C comment delimiters with an extra asterisk on the first one, as shown:
    /**
      * This is a module, class, function, or instance variable comment
      * that will be extracted by an automated documentation tool.
      */
This will provide a consistent look across all source code files, and should facilitate creation of automated documentation tools.
Such comments should be used to describe classes, methods, and global or instance variables.
#####4.2.2 Code Block Comments
Code block comments should precede the block, be at the same indentation level, and be separated by a blank line above and below the comment. Brief comments regarding individual statements may appear at the end of the same line, and should be vertically aligned with other comments in the vicinity for readability.
  (C++, Java) Code block comments should use the single line comment delimiter //.
#####4.2.3 Blank Lines
Use a single blank line to separate logical groups of code to improve readability. In source files, use two blank lines to separate each function.
#####4.2.4 Tabs
Do not use tabs.
#####4.2.3 Class Headers
     TDB
#####4.2.5 Function/Method Headers
•	Description
####4.3 Formatting
#####4.3.1 Indentation and Braces
The contents of all code blocks should be indented to improve readability. Three spaces are recommended as the standard indentation. Braces should be placed to show the level of indentation of the code block, with the open brace at the end of the statement which starts the block, and the close brace indented to match the statement.
        int main() {
                doSomething();
        }

        struct MyStruct {
                int x;
                int y;
        }

        if ( value == 0 ) {
                doSomething();
        }
		else if ( value == 2 ) { // note position of cascaded if statement
                doSomething2();
        }
		else {
                doSomething3();
        }

        while ( value < 300 ) {
                doSomething();
        }

        do {
                doSomething();
        } while ( value < 300 ) // note: ending brace and control on same line

        switch ( value ) {
        case 1:
                doSomething();
                break;
        case 2:
        case 3:
                doSomething2();
                break;
        default:
                break; // final break required
        }
#####4.3.2 Pointer and Reference Position
  (C++) All declarations of pointer or reference variables and function arguments should have the dereference operator * and the address-of operator & placed adjacent to the type, not the variable. For example:
        char*   text;                   // right
        char    *text;                  // not recommended

        char*   doSomething( int* x );  // right
        char    *doSomething( int *x ); // not recommended
####4.4 Statements
#####4.4.1 Control Statements
All control statements should be followed by an indented code block enclosed with braces, even if it only contains one statement. This makes the code consistent and allows the block to be easily expanded in the future. For example:
        if ( value == 0 ) {                 // right
                doSomething();
        }

        if ( value == 0 ) doSomething();    // wrong - no block, not indented

        if (value == 0)
                doSomething();              // wrong - no block
#####4.4.2 Conditional Statements
Conditional statements found in if, while, and do statements should be explicit based on the data type of the variable being tested. For example:
        int value = getValue();
        if ( value == 0 ) {                 // right
                doSomething();

        }
        if ( !value ) {                    // wrong - not explicit test
                doSomethingElse();
        }
        bool value = getValue();           // could be RWBoolean too.
        if ( !value ) {            	     // right
                doSomethingElse();         
        }
 (Java)
        boolean value = getValue();
        if ( !value ) {                     // right - this is explicit
                doSomethingElse();          // test for boolean type
        }
#####4.4.3 Include Statements
  (C++) For both source and header files, #include statements should be grouped together at the top of the file after the prolog. Includes should be logically grouped together, with the groups separated by a blank line. System includes should use the <file.h> notation, and all other includes should use the "file.h"notation. Path names should never be explicitly used in #include statements (with the exception of vendor library files such as Motif), since this is inherently non-portable. For example:
        #include <stdlib.h>                     // right
        #include <stdio.h>                      //                      
        #include <Xm/Xm.h>                      //
        #include "meaningfulname.h"             //

        #include "/proj/util/MeaningfulName.h"  // wrong - explicit path,
        #include <stdlib.h>                     //  out of order,
        #include </usr/include/stdio.h>         //  path for system file,
        #include "Xm/Xm.h"                      // local include of library file
####4.5 Declarations
#####4.5.1 Variable Declaration
Each variable should be individually declared on a separate line. Variables may be grouped by type, with groups separated by a blank line. Variable names should be aligned vertically for readability. There is no required ordering of types, however some platforms will give optimal performance if declarations are ordered from largest to smallest (e.g., double, int, short, char).
        int*    a;              // right
        int     b;              //
        int     c;              //
        double  d;              //
        double  e;              //
        double  a;              // right 
        int     b;              //

        double  d;              // acceptable - not grouped by type
        int     b;              //
        int*    a;              //
        double  e;              //
        int     c;              //
        int*    a, b, c;        // wrong - not individually declared, not
                                // on separate lines

        int*    a,              // wrong - not individually declared
                b,              //      
                c;              //
The two preceding examples are prone to error; notice that a is declared as a pointer to integer and b and c are declared as integers, not as pointers to integers. 
#####4.5.2 External Variable Declaration
  (C++) All external variables should be placed in header files. In general the use of global variables is discouraged. Use the following method to allow external variables to be created only once while using a single declaration. In the header file which declares the global variable, use a flag to cause the default action on inclusion to be referencing of an externally created variable. Only in the source file that wants to actually create the variable will this flag be defined.
In the header file MeaningfulName.h,
        #ifdef MeaningfulNameInit    // the flag is called MeaningfulNameInit
        #define EXTERN               // create the variable (only in main.cpp)
        #else
        #define EXTERN extern         // just a reference (default) 
        #endif
        EXTERN ErrorLogger errorLog;
        #undef EXTERN
All of the source files should include this header file normally:
        #include meaningfulname.h
while the following should appear only in the source file where you actually want to declare the variable and allocate memory for it (typically in main.cpp):
        #define MeaningfulNameInit
        #include meaningfulname.h
        #undef MeaningfulNameInit
#####4.5.3 Numeric Constant Declaration
Use only the uppercase suffixes (e.g., L, X, U, E, F) when defining numeric constants. For example:
        const int    VALUE  = A73B2X;   // right, hexadecimal constant
        const double EVALUE = 1.2E9;    // right, scientific notation constant

        const float  FVALUE = 1.2e9;    // wrong, lowercase e
#####4.5.4 Enumerated Type Declaration
  (C++) The enum type name and enumerated constants should each reside on a separate line. Constants and comments should be aligned vertically. Following is an example of a valid enum declaration:
        enum CompassPoints {    // Enums used to specify direction.
                NORTH = 0,      // 
                SOUTH = 1,      // 
                EAST  = 2,      // 
                WEST  = 3       //
        };
#####4.5.5 Struct and Union Declaration
  (C++) The struct type name and structure members should each reside on a separate line. This format separates the members for easy reading, is easy to comment, and eliminates line wrapping for large numbers of members. Each struct should have a one-line description on the same line as the type name. Each member should have a comment describing what it is, and units if applicable. Members and comments should be aligned vertically. Following is an example of a validstruct declaration:
        struct MeaningfulName {         // This is a struct of some data.
                int     firstInteger;   // This is the first int.
                int     secondInteger;  // This is the second int.
                double  firstDouble;    // This is the first double.
                double  secondDouble;   // This is the second double.
        };
#####4.5.6 Class Declaration
 (C++,Java) All class definitions should include a constructor, (virtual) destructor, copy constructor and operator=.   If the class has a pointer, provide a deep copy constructor (i.e., allocates memory and copies the object being pointed to, not just maintains a pointer to the original object).  If any of these four are not currently needed, create stub versions and place in the private section so they will not be automatically generated, then accidentally used.  (This protects from core dumps.)  All classes should have public, protected, and private access sections declared, in this order. Friend declarations should appear before the public section. All member variables should be either protected or private. It is recommended that definitions of inline functions follow the class declaration, although trivial inline functions (e.g., {} or { return x; }) may be defined within the declaration itself. Each member function and variable should be commented using the automated documentation comment delimiter /**. Member functions should be commented in the same fashion as a regular function. Member variables should each have a one line description. Members and comments should be aligned vertically. For example:
        class Value : public BaseValue {
        public:
                Value();                        // Default constructor.
                Value( const Value& oldValue ); // Copy constructor.
                ~Value();                       // Destructor.
                void setValue( int newValue );  // Set value.
                int getValue();                 // Get value.
 
        protected:
                void incrementValue();          // Increment value.

        private:
                int value;                      // The value.
        };
 
###5 Recommended Programming Practices
####5.1 Placement of Declarations
Local variables can be declared at the start of the function, at the start of a conditional block, or at the point of first use. However, declaring within a conditional block or at the point of first use may yield a performance advantage, since memory allocation, constructors, or class loading will not be performed at all if those statements are not reached.
####5.2 Switch Statements
Specify a break statement after every case block, including the last one unless multiple labels are used for one selection of code.  It is recommended that a default case always be defined.
####5.3 Return Statements
Where practical, have only one return from a function or method as the last statement. Otherwise, minimize the number of returns. Possibly highlight returns with comments and/or blank lines to keep them from being lost in other code.  Multiple returns are generally not needed except for reducing complexity for error conditions or other exceptional conditions.
####5.4 Casts
Avoid the use of casts except where unavoidable, since this can introduce run-time bugs by defeating compiler type-checking. Working with third-party libraries (e.g., X or Motif) often requires the use of casts.  When you need to cast, document the reasons.
####5.5 Literals
Use constants instead of literal values wherever possible. For example:
const double PI = 3.141259;                     // right
const char APP_NAME = "ACME Spreadsheet 1.0";   // right

area = 3.141259 * radius * radius;              // not recommended 
cout << "ACME Spreadsheet 1.0" << endl;         // not recommended
####5.6 Explicit Initialization
In general, explicitly initialize all variables before use.
It is very strongly recommended that you initialize all pointers either to 0 or to an object.  Do not allow a pointer to have garbage in it or an address in it, that will no longer be used.
####5.7 Constructs to Avoid
 (C++)
The use of #define constants is strongly discouraged, using const is recommended instead.
The use of #define macros is strongly discouraged, using inline functions is recommended instead.
The use of typedef is discouraged when actual types such as class, struct, or enum would be a better choice.
The use of extern (e.g., global) variables is strongly discouraged. The exception is for programs which benefit from having a small number of object pointers accessible globally via extern. The use of goto statements is not allowed.
####5.8 Macros
  (C++) All arguments to macros should be enclosed in parentheses to eliminate ambiguity on expansion. For example:
/#define MAX( x, y )   ( (x) > (y) ) ? (x) : (y) )
####5.9 Debug Compile-time Switch
  (C++) Code used only during development for debugging or performance monitoring should be conditionally compiled using #ifdef compile-time switches. The symbols to use are DEBUG and STATS, respectively. Debug statements announcing entry into a function or member function should provide the entire function name including the class. For example:
/#ifdef DEBUG
    cout << "MeaningfulName::doSomething: about to do something" << endl;
/#endif
Asserts will be used to verify assumptions including pre- and post-conditions.  The asserts technique will be used to report run-time errors and warning.  A good description of the use of assert can be found in Writing Solid Code by Steve Maguire.  The BioInfomatics Development Team will customize an assert object for the development of project code.
####5.10 Memory Management
  (C++) Use new and delete instead of malloc/calloc/realloc and free. Allocate memory with new only when necessary for variable to remain after leaving the current scope. Use the delete [] operator to deallocate arrays (the use of delete without the array operator to delete arrays is undefined). After deletion, set the pointer to zero, to safeguard possible future calls to delete. C++ guarantees that delete 0 will be harmless.
####5.11 Constructors
 (C++) All constructors should initialize all member variables to a known state. This implies that all classes should have a default constructor (i.e., MyClass();) defined. Providing a deep copy constructor is strongly recommended.  If the programmer wishes to not fully implement a copy constructor, then a stub copy constructor should be written and placed in the private section so no one will accidentally call it.
####5.12 Destructors
 (C++) All classes which allocate resources which are not automatically freed (e.g., have pointer variables) should have a destructor which explicitly frees the resources. Since any class may someday be used as a base class, destructors should be declared virtual, even if empty.
####5.13 Argument Passing
  (C++) If the argument is small and will not be modified, use the default pass by value. If the argument is large and will not be modified, pass by const reference. If the argument will be modified, pass by reference. For example:
void A::function( int p_notChanged );               // default: pass by value
void B::function( const C& p_bigReadOnlyObject )    // pass by const reference
void C::function( int p_notChanged, int& p_result );  // pass by reference
####5.14 Default Arguments
  (C++) Where possible, use default arguments instead of function overloading to reduce code duplication and complexity.
####5.15 Overriding Virtual Functions
   (C++) When overriding virtual functions in a new subclass, explicitly declare the functions virtual. Although not required by the compiler, this aids maintainability by making clear that the function is virtual without having to refer to the base class header file.
####5.16 Const Member Functions
  (C++) It is recommended that all member functions (example:  func(...) const {...}) which do not modify the member variables of an object be declared const. This allows these functions to be called for objects which were either declared as const or passed as const arguments. 
  (C++) It is recommended that all member function parameters be declared const (example:  func(const int i){...}) when possible.
####5.17 Referencing Non-C++ Functions
  (C++) Use the extern "C" mechanism to allow access to non-C++ (not just C) functions. This mechanism disables C++ name mangling, which allows the linker to resolve the function references. For example:
extern "C" {
    void aFunction();           // single non-C++ function prototype 
}

extern "C" {
/#include "functions.h"          // library of non-C++ functions 
}
####5.18 NULL Pointer
  (C++) Use the number zero (0) instead of the NULL macro for initialization, assignment, and comparison of pointers. The use of NULL is not portable, since different environments may define it to be something other than zero (e.g., (char*)0).
####5.19 Enumerated Types
   (C++) Use enumerated types instead of numeric codes. Enumerations improve robustness by allowing the compiler to perform type-checking, and are more readable and maintainable.
####5.20 Terminating Stream Output
  (C++) Use the iostream manipulator endl to terminate an output line, instead of the newline character \n. In addition to being more readable, the endl manipulator not only inserts a newline character but also flushes the output buffer.
####5.21 Object Instantiation
  (C++,Java) Where possible, move object declarations and instantiations out of loops, using assignment to change the state of the object at each iteration. This minimizes overhead due to memory allocation from the heap.
####5.22 Encapsulation
  (C++,Java) Instance variables of a class should not be declared public. Open access to internal variables exposes structure and does not allow methods to assume values are valid.
  (C++)  Putting variables in the private section is preferable over the protected section, for more complete encapsulation.  Use get and set methods in either protected or public if needed.
####5.23 Default Constructor
  (Java) Where possible, define a default constructor (with no arguments) so that objects can be created dynamically using Class.newInstance(). This exploits the power of Java to dynamically link in functionality that was not present at compile time.
####5.24 Importing Packages
  (Java) Use full package names instead of wildcards when importing to improve comprehensibility and provide context.
####5.25 Exception Handling
  (C++)  In general, avoid exception handling.  It is sometimes needed for third party code, but in general, use return values instead.  If you need it, document the reason for using it.
 
Additional Coding Standards and Style Guides
For additional background and suggestions, there are a number of coding standard documents available on the Web:
•	Collab Project Software Coding Standards Guide for Java by DOE's EMSL Collaboratory team (Sorry - no longer available as of 07/16/03)
•	PNNL Coding Standards of the Software Systems Engineering Process (sorry, no longer available as of 09/29/03)
•	Java Code Conventions by Sun Microsystems

