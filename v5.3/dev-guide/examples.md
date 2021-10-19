---
layout: index
title: GCAM Development Examples
gcam-version: v5.3
devguide: dev-guide.html
---
## GCAM Development Examples

* [GCAM Fusion](#gcam-fusion-related-documentation)
    * [FilterStep objects](#filterstep-objects)
    * [Filter objects](#filter-objects)
    * [Predicates](#predicates)
    * [Constructing filters using a string notation](#constructing-filters-using-a-string-notation)
    * [Writing New GCAM Components](#writing-new-gcam-components)
    * [What to know when writing or updating a GCAM class](#what-to-know-when-writing-or-updating-a-gcam-class)
* [Centrally Managed State Variables](#centrally-managed-state-variables)
* [Other GCAM Fusion related utilities](#other-gcam-fusion-related-utilities)
    * [ExpandDataVector](#expanddatavector)
    * [Factory](#factory)
* [C++11/14 Features and syntax used in GCAMFusion](#c1114-features)

## GCAM Fusion related documentation

### FilterStep objects



A FilterStep is the object that GCAMFusion uses to search a single GCAM
container's data vector.  It can optionally specify a data name to match which
is compared against the `Data::mDataName`.  If the data name in the FilterStep
is empty it is assumed to match *any* data name.  

The other optional parameter is a [Filter](#filter-objects).  Filter objects are
valid for search targets that are containers for other objects.  Such containers
are indicated with the `ARRAY` or `CONTAINER` flag.  If specified, a filter can
be used to select any single element of the matched container.  If no filter is
specified, it is assumed to be `NoFilter`, which selects the entire
container.  Note that if a Filter other than `NoFilter` is set, and the matched
object is not a container (i.e., has the `SIMPLE` flag, then the match will be
rejected even if the data name matches.  

In addition if no data name and no filter is set then not only does this
FilterStep match all data but it also enables special "descendant step"
traversal behavior in GCAMFusion where the next FilterStep can be matched zero
or more containers down.  This is analogous to the `//` operator in XPath
queries.  For example, if a 'sector' object has 'subsector' children, which in
turn have 'technology' children of their own, then `sector//share-weight` will
find data named 'share-weight' at both the subector and technology levels.  It
would also find a share-weight object contained in the sector itself if there
were any, but in this example there are no such matches; share weights are only
defined for subsectors and technologies.



### Filter objects

A Filter object allows GCAMFusion to select a subset of a data object that is a
container for other objects. The available Filters are:

* NoFilter: matches all elements
* NamedFilter: Calls the -&gt;getName() method on the container to compare in it's predicate. `SIMPLE` and `ARRAY` will never match.
* YearFilter: Calls the -&gt;getYear() method if the data is `CONTAINER` or uses the `Modeltime` to convert period index to year if the data is `ARRAY` and compares that year in it's predicate. `SIMPLE` data will never match.
* IndexFilter: Computes the index offset of each element in an `ARRAY` or `CONTAINER` Data for comparison in it's predicate. `SIMPLE` Data will never match.



### Predicates



A predicate is a way to test whether a year, or name, or index, etc matches a
value the user was looking for. Currently predicates can only operate on string
and int. If a predicate that is doing a string comparison is given an int to
match (i.e. called from a YearFilter) it will always return false, and vice
versa. The available predicates are:

|   StringEquals | string | Tests if the proposition exactly matches a string value.|
|   StringRegexMatches | string | Tests if the proposition matches a regular expression in the egrep notation.|
|   IntEquals | int | Tests if the proposition exactly matches an int value.|
|   IntGreaterThan | int | Tests if the proposition is strictly greater than an int value.|
|   IntGreaterThanEq | int | Tests if the proposition is greater or equal to an int value.|
|   IntLessThan | int | Tests if the proposition is strictly less than an int value.|
|   IntLessThanEq | int | Tests if the proposition is less or equal to an int value.|


### Constructing filters using a string notation

The `parseFilterString` utility allows users to construct filters using a
convenient text notation, instead of constructing them manually.  The rules for
constructing the string are:

* Separate steps with `/`.  Each step matches a data name. *E.g.*, `region/sector`. 
* A filter object can optionally be specified inside square brackets. *E.g.*, `/ghg[NamedFilter,StringEquals,CO2]` 
  * All characters in a filter step up to the opening bracket assumed to the
    data name. (`ghg` in the example)
  * All characters in between the '\[' and '\]' (if they exist) are split by
    ','.  In the example the elements would be `NamedFilter`, `StringEquals`,
    and `CO2`.
    * The first element is the [Filter](#filter-objects)  
    * Unless the filter is a `NoFilter`, there must be a total of three elements.  Note it is an error to use `NoFilter` and supply predicate values as well.
    * The second element is a predicate [predicate](#predicates).  
	* The third element is the value to match in the predicate.  
* A `//` can be used to cause the next filter step to match an arbitrary number
  of levels (including zero) down the tree.  *E.g.*, `sector//technology`.


Writing New GCAM Components
---------------------------

When developing new C++ classes for GCAM, it is important to make them
compatible with GCAM Fusion.  The next few sections explain how GCAM Fusion is
put together, why it was done that way, and what this means for developing new
C++ classes.


### Background and rationale

To accomplish our goals set out earlier for coming up with a high level API for
implementing two-way feedbacks with GCAM we need to:  
* Provide a way to traverse the heirarchical GCAM strucuture from a high level.
* Avoid forcing users to become familiar with the internals of GCAM, instead
  leveraging their knowledge of the XML strucuture.  
* Avoid putting too much burden on GCAM developers to maintain the API when
  developing new capabilities.  


Our first challenge is that, while we currently have a mapping from XML name to
data objects (such as XMLParse, toInputXML, or XMLDB output),  it is mostly a
manual process replicated in EACH of these cases where it is needed. It would be
better if we associated that name just one time together with the declartion of
the variable. 

We can illustrate this with a pseudocode example.  C++ only needs to know what
type the data member is and what you will call it in your C++ code, and you
specify these things in a member declaration:

```cpp
class Sector {
    //! Sector name
    string, mName
    //! Sector price by period updated with solution prices.
    PeriodVector<double>, mPrice
    //! subsector objects
    vector<Subsector*>, mSubsectors
}
```

For our purposes we want to add an XML -- or user readable name.  We'd like to
do something like this, but C++ doesn't allow it:

```cpp
// Not valid C++
class Sector {
    //! Sector name
    string, mName, "name"
    //! Sector price by period updated with solution prices.
    PeriodVector<double>, mPrice, "price"
    //! subsector objects
    vector<Subsector*>, mSubsectors, "subsector"
}
```

In addition to the names, we need to be able to loop over the data members so
that we could search for some particular member variable.  We need to tie each
of these varaibles together so we can know which variables to loop over:


```cpp
class Sector {
    DEFINE_DATA(                   // Put all of the member variables in a structure we can iterate over.
        //! Sector name
        string, mName, "name"
        //! Sector price by period updated with solution prices.
        PeriodVector<double>, mPrice, "price"
        //! subsector objects
        vector<Subsector*>, mSubsectors, "subsector"
    )
}
```



We also need to be able to know that "subsector" is actually a container of data
itself and not just some simple data object.  Thus these containers are
identified by name or year, such as `/subsector[@name='coal']`.  In fact it
might be useful to note that the prices too can be filtered too even though it
is not a container, such as `/price[@year=2010]`:


```cpp
class Sector {
    DEFINE_DATA(
        //! Sector name
        DEFINE_VARIABLE( SIMPLE, string, mName, "name" ),
        //! Sector price by period updated with solution prices.
        DEFINE_VARIABLE( ARRAY, PeriodVector<double>, mPrice, "price" ),
        //! subsector objects
        DEFINE_VARIABLE( CONTAINER, vector<Subsector*>, mSubsectors, "subsector" )
    )
}
```



Class inheritance presents an extra challenge.  Each subclass is allowed to
define its own list of data, which is _cumulative_ with the data defined by its
class ancestors. 

```cpp
class PassThroughSector: public Sector {
    // Because a PassThroughSector is also a sector, it has all of the members
	// of a sector, plus the ones we're about to define:
    DEFINE_DATA(
        //! The appropriate sector name for which's marginal revenue should be used
        //! when calculating fixed output.
        DEFINE_VARIABLE( SIMPLE, string, mMarginalRevenueSector, "marginal-revenue-sector" )
    )
}
``` 

In order to treat these subclasses properly, GCAM Fusion will have to splice the
lists of data from all the classes in the hierarchy together at run
time.  Therefore, we need additional tags to provide the information it needs to
do that. 

```cpp
class PassThroughSector: public Sector {
    DEFINE_DATA_WITH_PARENT(
        Sector,
        //! The appropriate sector name for which's marginal revenue should be used
        //! when calculating fixed output.
        DEFINE_VARIABLE( SIMPLE, string, mMarginalRevenueSector, "marginal-revenue-sector" )
    )
}
```


### Implementation

The structures in the previous section give us almost all of what we need, but
they aren't actually valid C++. To get compilable code out of this we define a
series of macros and use some template meta programming to transform these data
definitions into the valid, yet much more, C++ syntax during the compiler's
preprocessing step.  The source code at the end of the previous section gets
preprocessed into code that looks like this:

```cpp
class Sector {
    typedef boost::fusion::vector<Data<string, SIMPLE>, Data<PeriodVector<double>, ARRAY>, Data<vector<Subsector*>, CONTAINER> > DataVectorType;
    DataVectorType generateDataVector() {
        return DataVectorType( Data<string, SIMPLE>( mName, "name" ), Data<PeriodVector<double>, ARRAY>( mPrice, "price" ), Data<vector<Subsector*>, CONTAINER>( mSubsectors, "subsector" ) );
    }

    string mName;
    PeriodVector<double> mPrice;
    vector<Subsector*> mSubsectors;
}
```

To be clear, all of the code in this block is generated automatically from the
input in the previous block; developers never have to handle it directly;
they'll be using the constructs from the last section.

You will notice that we use such classes as `Data<string, SIMPLE>` and
`Data<Subsector*, CONTAINER>`.  These are just helper structs to let us tie
together user facing names as well as potentially other meta data with a
reference to the actual data being contained (such as string or Subsector\*).
Here is how they are defined:

```cpp
/*!
 * \brief Basic structure for holding data members for GCAM classes.
 * \details The idea behind this structure is that every data member
 *          has two important properties: the data itself and a name
 *          used to refer to it (e.g., in XML inputs).  In addition
 *          there may be some additional compile time meta data that
 *          would be useful to generate code or search by in GCAM
 *          Fusion such as the data type or some combination from the
 *          enumeration DataFlags.
 *          This structure makes all of those available for inspection
 *          by other objects and functions.
 */
template<typename T, int DataFlagsDefinition>
struct Data {
    Data( T& aData, const char* aDataName ):mData( aData ), mDataName( aDataName ) {}
    Data( T& aData, const std::string& aDataName ):mData( aData ), mDataName( aDataName.c_str() ) {}
    /*! \note The Data struct does not manage any of it's member variables and
     *        instead simply holds reference to some original source.
     */
    virtual ~Data() { }
    
    /*!
     * \brief The human readable name for this data. 
     */
    const char* mDataName;

    /*!
     * \brief A reference to the actual data stored.
     */
    T& mData;
    
    /*!
     * \brief Type for this data item
     */
    typedef T value_type;
    
    /*!
     * \brief A constexpr (compile time) function that checks if a given aDataFlag
     *        matches any of the flags set set in DataFlagsDefinition.
     * \param aDataFlag A Flag that may be some combination of the flags declared
     *                  in the enumeration DataFlags.
     * \return True if aTypeFlag was set in the data definition flags used to
     *         define this data structure.
     */
    static constexpr bool hasDataFlag( const int aDataFlag ) {
        return ( ( aDataFlag & ~DataFlagsDefinition ) == 0 );
    }
    
    /*!
     * \pre All Data definitions must at the very least be tagged as SIMPLE,
     *      ARRAY, or CONTAINER.
     */
    static_assert( hasDataFlag( SIMPLE ) || hasDataFlag( ARRAY ) || hasDataFlag( CONTAINER ),
                   "Invalid Data definition: failed to declare the kind of data." );
};
```

Then the type `DataVectorType` is a special kind of vector, one that can hold
data of varying types, which can be looped over to process data in bulk.  These
special types of vectors are provided by the
[Boost Fusion library](http://www.boost.org/doc/libs/1_65_1/libs/fusion/doc/html/),
which is where GCAM Fusion gets its name.  Besides providing providing storage
for mixed-type data, these "fusion" vectors allow us to perform algorithms at both compile
time and run time.



Note that an instance of the DataVectorType is only created if the
`generateDatatVector()` method is called (which should typically only be called
through GCAM Fusion via [ExpandDataVector](#expanddatavector)) thus there is no
runtime overhead penalty imposed on GCAM except when calling GCAMFusion to
search for data.  In addition this implies that all of the changes required to
allow for GCAM Fusion need only to be made in the header files by declaring
variables as described above.



What to know when writing or updating a GCAM class
--------------------------------------------------

As mentioned earlier GCAM Fusion changes the way we declare member variables for
GCAM classes.  Some of these changes are simply to associate meta information
that the GCAM Fusion tools can utilize to search and traverse the GCAM
objects.  Other changes are actually just to ensure we have a uniform approach
so that we may generate as much boiler plate code as possible without the need
to special case.  Note while it is possible to not follow or utilize and of the
GCAM Fusion tools and coding standards and still create valid and usable GCAM
objects it is *highly discouraged*. Although GCAM Fusion was originally
developed to facilitate model coupling and feedbacks, we can (and, in
development versions of the model, do) take advantage of GCAM Fusion to provide
software infrastructure such as automatically generating all XML parsing code,
or make several copies of a running GCAM memory space to allow for parallel
computation.



### Make all DATA definitions protected:

All member variable definitions should be protected instead of private.  It may
be the case that PassThroughSector should not have access to change the mPrice
of the Sector base class.   Unfortunately if we want to generically join the
Sector and PassThroughSector data vectors for introspection via GCAM Fusion the
PassThroughSector needs access to the entire Sector data vector.



### Using the DEFINE\_DATA macros:

We provide a utility header `#include
"util/base/include/data_definition_util.h"` that defines the all of the tools
for defining data members.  Generally these will be instantiated by using the
following Macros:



#### DEFINE\_DATA( ... ) and DEFINE\_DATA\_WITH\_PARENT( ... )


These calls are used to wrap all of the class data member definitions.  A user
must use the `DEFINE_DATA_WITH_PARENT` for any class that is derived from a
base class.  Even if that base class is abstract with no data members.  The very
first argument to the `DEFINE_DATA_WITH_PARENT` is the name of the direct
parent of this subclass for instance: 


```cpp
class Technology: public ITechnology {
    protected:
    // Define data such that introspection utilities can process the data from this
    // subclass together with the data members of the parent classes.
    DEFINE_DATA_WITH_PARENT(
        ITechnology,
        ...
    )
};

class TranTechnology : public Technology {
    protected:
    DEFINE_DATA_WITH_PARENT(
        Technology,
        ...
    )
};
```

A user then would use `DEFINE_DATA` in the base class even if it is not going to
define and data members.  The first argument to `DEFINE_DATA` must be a list of
the name of the class then all possible subclasses of the class.  Note that
classes that do not have any classes derive from them will still use this method
and the subclass list will only contain itself.


```cpp
// Need to forward declare the subclasses as well.
class Technology;
class DefaultTechnology;
class IntermittentTechnology;
class WindTechnology;
class SolarTechnology;
class NukeFuelTechnology;
class TranTechnology;
class AgProductionTechnology;
class PassThroughTechnology;
class UnmanagedLandTechnology;
class EmptyTechnology;

class ITechnology: public IParsedComponent, private boost::noncopyable {
    protected:
        DEFINE_DATA(
        /* Declare all subclasses of ITechnology to allow automatic traversal of the
         * hierarchy under introspection.
         */
        DEFINE_SUBCLASS_FAMILY( ITechnology, Technology, DefaultTechnology, IntermittentTechnology,
                                WindTechnology, SolarTechnology, NukeFuelTechnology, TranTechnology,
                                AgProductionTechnology, PassThroughTechnology, UnmanagedLandTechnology,
                                EmptyTechnology )
    )
};
```

Within the `DEFINE_DATA*` sections after the declarations related to the
subclass tree navigation are the actual data member definitions.  They are
listed one after the other separated by commas.  Each definition will use one of
the following Macros depending on the nature of that data definition: 

```cpp
class Sector {
    protected:
    DEFINE_DATA(
        /* Declare all subclasses of Sector to allow automatic traversal of the
         * hierarchy under introspection.
         */
        DEFINE_SUBCLASS_FAMILY( Sector, SupplySector, AgSupplySector, ExportSector,
                                PassThroughSector ),

        //! Sector name
        DEFINE_VARIABLE( SIMPLE, "name", mName, std::string ),

        //! subsector objects
        DEFINE_VARIABLE( CONTAINER, "subsector", mSubsectors, std::vector<Subsector*> ),
        
        //! Sector price by period updated with solution prices.
        DEFINE_VARIABLE( ARRAY, "price", mPrice, objects::PeriodVector<double> ),

        //! The discrete choice model used to calculate sector shares.
        DEFINE_VARIABLE( CONTAINER, "discrete-choice-function", mDiscreteChoiceModel, IDiscreteChoice* )
                
    )
};
```



#### DEFINE\_VARIABLE with flag SIMPLE

This is used to define a member variable that is just a piece of data such as
ints, double, string, Value, etc.  More directly, you would want to use this
definition tag if the member variable does not contain more data
(i.e. `/price/logit-exponent` isn't valid) or can't be filtered
(i.e. `/name[@year=2020]` isn't valid).



#### DEFINE\_VARIABLE with flag ARRAY


This is used to define a member variable that is an array of simple data such as
PeriodVector&lt;Value&gt; or vector&lt;int&gt;, etc.  More directly, you want to
use this definition tag if the member variable does not contain more data
(i.e. `/price/logit-exponent` isn't valid) but can be filtered
(i.e. `/price[@year=2020]` is valid).



#### DEFINE\_VARIABLE with flag CONTAINER

This is used to define a member variable that is a container of more data such
as Region, Sector, etc (i.e. `/discrete-choice-function/logit-exponent` is
valid).  Note that the variable definition may be a vector, such as with
subsector or just a single object such as with discrete-choice-function.  We
just use the CONTAINER tag to handle both cases.  The reason is for container
thery may be filtered by [NamedFilter](#filter-objects) or
[YearFilter](#filter-objects).  If the data being held is
vector&lt;Subsector\*&gt; for instance this allows us to search only the one
that matches the name: `/subsector[@name='coal']/share-weight`.  If the data
isn't a vector and just a single object it may still make sense to filter by
name, such an example would be the climate model
`/climate-model[@name='hector']`. 



#### DEFINE\_VARIABLE with flag SIMPLE | STATE or ARRAY | STATE



The data flags can be combined with the vertical bar operator `|` if associating
more tags may be useful.  Note Data **must** be tagged with one
of `SIMPLE`, `ARRAY`, or `CONTAINER`.  Currently there is only one other flag
defined to combine with those other flags: `STATE`.  In fact it only makes sense
to use `STATE` with `SIMPLE` or `ARRAY`.  You should add this flag to any Data
definition who's data will get set during a call to `World::calc`, as described
in [Centrally Managed State Variables](#centrally-managed-state-variables).

### Add your new class to `gcam_data_containers.h`
Since the `GCAMFusion` object determines which GCAM objects it will access at runtime it potentially needs to be able to traverse *all* GCAM objects.  Thus we maintain a header file that includes all GCAM objects that `DEFINE_DATA` that GCAM Fusion may need to access in `util/base/include/gcam_data_containers.h`.  Thus if you add a new class you must also include the header file to your new class in `gcam_data_containers.h` as well.

### Some side effects from the way we have done the data definitions



<span style="color: rgb(0,0,0);font-weight: bold;">No more use of smart pointers as data members</span>



These were dropped because it made detecting what the actual data was much more
difficult (i.e. the type I need to know is `IDiscreteChoice*` not
`std::auto_ptr<IDiscreteChoice*>`).  I could try harder if we want to put these
back in, it will result in a lot more template specialization and work
arounds.  Also note `std::auto_ptr` is deprecated in favor of
`std::unique_ptr`.



Centrally Managed State Variables
---------------------------------


A new feature that is enabled by GCAM Fusion, although otherwise unrelated, is
tagging and collecting "state" variables into a central location where they can
be managed for the purposes of partial derivative calculations.  By "state"
variables we refer to any variable whose value gets set during a call
to `World::calc`.  Such an example would be `mPrice` of the `Sector` class as the
price of intermediate sectors are dynamically calculated as the share weighted
cost of it's competing inputs. 


State variables are of interest since during partial derivative calculations we
start from some "base" state, change just one price, re-run the model by
calling `World::calc` with the new price, and record the change in all of the
supplies/demands.  Then we need to revert back to the base state before we can
proceed with the next partial derivative.  This state includes more than just
the input prices; it also includes all of the intermediate calculations such as
demands and market shares.

A naive approach would be to just call `World::calc` using the original prices
from the "base" state.  However such a strategy would essentially double the
number of computation required to calculate partial derivatives.  Instead GCAM
has code to track and manage state to be able to quickly reset the "base" state
when calculating partial derivatives.  However prior to GCAM Fusion this code
was strewn throughout the code in many places: 

-   Each market had a "stored" price, supply, and demand and corresponding methods to store/restore them.
-   Any GCAM object that needed to addToSupply/Demand would have to keep an
    additional "state" member variables to make the call to the market
    place: `mLastCalcValue = marketplace->addToDemand( mName, aRegionName, annualServiceDemand, mLastCalcValue, aPeriod );` 
-   Any other state would get lazily recalculated by marking at the Activity
    level a "stale" flag.  If a Demand Activity was still marked as stale when
    it needed to recalculate a partial derivative then it would be forced to
    recalculate it's Price Activity.  A strategy which creates extra work and
    potentially easy to break/get wrong. 


With the changes to central manage state that come along with GCAM Fusion we simplify this to: 

-   The centrally managed "scratch" chunk of memory gets copied over with the "base" chunk of memory.
-   Any GCAM object that needed to addToSupply/Demand must do so with a
    `Value` member variable marked as 
	`STATE`: `marketplace->addToDemand( mName, aRegionName, mServiceDemands[ aPeriod ], aPeriod );` 


The new approach is simpler, and it's easier to guarantee we didn't miss
something by using
[DEBUG_STATE](#ensuring-that-no-state-variable-is-missed).  In addition when
running with GCAM Parallel enabled we can allocate a "scratch" space for every
thread allowing for each of the ~470 partial derivative calculations to be
calculated completely independently and in parallel from each other.  This gives
us far greater parallelism than we had previously. 


To make this work, developers must tag the Data definitions in classes they are
writing with the `STATE`
[flag](#define_variable-with-flag-simple--state-or-array--state) to indicate
which member variables are part of the model state.  The type of these variables
could in principle be any simple type or array of simple type; however, for
simplicity and to provide an object that gives us an opportunity for indirection
to swap out the actual location of the underlying data from a central location
we have limited state variables to use the `Value` class:



`DEFINE_VARIABLE( SIMPLE | STATE, "price", mPrice, Value )`


or


`DEFINE_VARIABLE( ARRAY | STATE, "emissions", mEmissions, objects::PeriodVector<Value> )`



By adding the `STATE` tag it allows us to search, using GCAM Fusion, for all of
the objects with that tag.  A new class `ManageStateVaraibles` is responsible
doing the search as well as all of the other state maintenance as discussed
below.  Note that state data is collected each period so as to keep the number
of values to store and copy remains reasonable.  To do this we:


-   Skip data that is in a Technology that is not operating or a Market not of the current year
-   Data in a period vector are only collected for the current period.
-   Data in a year vector (such as LUC emissions) for only the years in the current timestep.


Once we know how many state data there are in a period we can allocate space to
store the centrally managed data in a two dimensional array.  The first
dimension is an entry for each state variable.  The second dimension is for the
states, where the first is the "base" state and the rest are "scratch".  Without
parallel enabled there is just 1 scratch state.  However, when parallel
calculations are enabled there is one scratch space for each thread.  

Since we need to be able to quickly copy over scratch state we need to store the
data contigiously.  Thus in order to keep several copies of state and quickly
replace it is important we keep that total number of state variables to a
reasonable amount.  Currently we observe 300,000 to 700,000 double values
depending on the model period which is ~ 2 - 5 MB worth of memory per scratch
space.  



After the central state memory is allocated we loop over each state Value and set a flag to indicate that it is active state and assign it an offset into the centrally managed state.  We also set static variable `Value::sCentralValue` to point to the centrally managed "base" state.  Thus the Value class will lookup the actual data using:


```cpp
/*!
 * \brief An accessor method to get at the actual data held in this class.
 * \details This method will appropriately get the value locally or the centrally
 *          managed state if the mIsStateCopy flag is set.
 * \return A reference the the appropriate value represented by this class.
 */
inline double& Value::getInternal() {
    return mIsStateCopy ?
#if !GCAM_PARALLEL_ENABLED
        sCentralValue[mCentralValueIndex]
#else
        sCentralValue.local()[mCentralValueIndex]
#endif
        : mValue;
}
```


When it comes time to calculate partial derivatives `Value::sCentralValue` is reset to the "scratch" space (thus the reason to make it static so it may be quickly switched in all Values).  Before each partial is calculated the "scratch" array is copied over with the "base" array using the highly optimized function `memcpy`:



```cpp
/*!
 * \brief Copies the "base" state over the "scratch" space.
 * \details This method is typically called before starting a partial derivative
 *          calculation which will make changes in the "scratch" space.  Note when
 *          GCAM_PARALLEL_ENABLED the appropriate "scratch" space to reset is identified
 *          as the one assigned to the calling thread via the thread local Value::sCentralValue.
 */
void ManageStateVariables::copyState() {
#if !GCAM_PARALLEL_ENABLED
    memcpy( mStateData[1], mStateData[0], (sizeof( double)) * mNumCollected );
#else
    memcpy( Value::sCentralValue.local(), mStateData[0], (sizeof( double)) * mNumCollected );
#endif
}
```



Note that with GCAM parallel `Value::sCentralValue` is a thread local variable thus each variable can be indpendently set by each thread that is accessing that code.  What this means in practical terms is for instance that the electricity technology Gas CC could have calculated different costs at the same exact time depending on which computation thread is asking.



Once we are done solving the period the `ManageStateVariables` will loop back over each state Value and reset the `mIsStateCopy` flag and copy back the "base" state value for long term storage.  Also releasing the memory for the centrally managed state's arrays.



#### Ensuring that no state variable is missed


We can check to make sure that not Data definitions were missed being tagged as
"state" by enabling the preprocessor flag `DEBUG_STATE` which will enable checks
to flag Values that are changed during a call to `World::calc` as well as other
checks to ensure Values get collected / reset properly.



Other GCAM Fusion related utilities
-----------------------------------



### ExpandDataVector

Generally developers will not need to call this method directly.  Instead, it is
used indirectly through searches via GCAM Fusion.  It is a utility for ensuring
that we get the complete data vector from a data container taking into account
the data vectors inherited from any base classes.  Expanding the full data
vector is more tricky than it would first appear since we need to be able to
determine which SubClass we are dealing with at runtime as we only ever store
instances with the Base class pointer (this is typically accomplished with
virtual methods). However the return type of each SubClass would be different
for each SubClass. Thus we need to use a double dispatch based approach with a
visitor that will collect the full data vector. In order for this visitor to be
generic it needs to be templated however mixing virtual methods with templated
argument is not allowed by the compiler due to possibly infinite method
combinations.



### Factory

A generic templated factory that can create any member of a
[SubClassFamilyVector](#define_data---and-define_data_with_parent--) given the XML
name.  This class is currently not used however could be employed to replace all
of the various Factory singleton classes that currently exist in GCAM.  It would
really be useful when/if we generate all XML Parsing code by the compiler.



C++11/14 Features:
------------------



Some code written in GCAM Fusion take advantge of some new language
features. While not always necessary they proved useful. Note this isn't the
full breadth of the new C++11/14 features, just the ones you may find in GCAM
Fusion. In addtion there are some classes, such as regular expressions, which
are also part of the new standard however I will not talk about them since it
doesn't change any language expressions that may be confusing to C++ coders.


### auto


You may see variables declared as the `auto` type. It is however not a type;
instead, it allows the developer to elide the variable type and allow the
compiler to set the appropriate type at compile time. If the compiler can't
figure it out unambigously then it will raise an error. This is particularly
useful when dealing with templated typedefs and nested or derivived types, where
the type defininitions can get quite complex. For example, it is easier to write
and understand: 

```cpp
template<typename SomeKindOfArrayOfContainerType>
void someFunc(ContainerData<SomeKindOfArrayOfContainerType> aData ) {
    // descriptive comment to tell use what is being decalared.
    auto copyOfData = aData.mData.begin()->clone();
    ...
}
```

Than to write: 

```cpp
template<typename SomeKindOfArrayOfContainerType>
void someFunc(ContainerData<SomeKindOfArrayOfContainerType> aData ) {
    typename boost::remove_ptr<ContainerData::value_type::value_type>::type copyOfData = aData.mData.begin()->clone();
    ...
}
```



### decltype(..)

The `decltype` declaraiton allows you to copy the type of some other
variable. This is useful for deriving other types.  For example, this
declaration gives the const iterator associated with a container.  It isn't
necessary to specify, or even know, the exact type of the container:

`typename decltype( mSomeContainer )::const_iterator`



### Using decltype in the return

For the same reason it is useful to take advantage of `decltype` you may want to
take advantage in declaring a function return type based off of the argument
passed in. To do this you need to use some slightly alternative syntax:


```cpp
template<typename SomeVectorDef>
functionName( SomeVectorDef aVector ) -> decltype( aVector )::const_iterator {
    return aVector.begin();
}
``` 

### Closures 

Closures allow you to construct anonymous functions that capture variables
from their immediate environment.  They are especially useful in conjunction
with algorithm templates from the `std::algorithm` library, such as `find_if`.
```cpp
    int nsub = successors_subgraph.count();
    typename groupset_t::iterator it_sg_ex_srcs =
      find_if(subgroups.begin(), subgroups.end(),
              [nsub] (const groupid_t &g) -> bool {return g.nodes().count() == nsub && g.type == linear;}); 
```														 

Likewise, when dealing with structures of unknown and differing types, as might
happen when writing a template class or function, we need to use templated
functors to deal with each different type:


```cpp
struct Helper {
    std::string mName;
    Helper(std::string aName):mName(aName) { }
    template<typename SomeClassType>
    bool operator()( SomeClassType aClass ) {
        return aClass->getName() == mName;
    }
};
...
boost::fusion::vector<Sector, Subsector, ITechnology> vec(aSector, aSubsector, aTech);
Helper func(aName);
bool isNameCoal = boost::fusion::any(vec, func);
```

With closures this can be written more simply: 

```cpp
boost::fusion::vector<Sector, Subsector, ITechnology> vec(aSector, aSubsector, aTech);
bool isNameCoal = boost::fusion::any(vec,
    [aName]( auto aClass ) -> bool {
        return aClass->getName() == aName;
    }
);
``` 

The values in the `[ ]` names the variables from the local scope to be made
available in the closure.  Including an `&` in front of the variable indicates
to pass by reference.  Simply providing the `&` indicates make available all
local variables by reference. 


### Foreach in C++


C++ introduced its version of foreach, which reduces the verbosity of looping
over arrays of data. So instead of: 


```cpp
vector<ITechnology*> techs;
for( vector<ITechnology*>::const_iterator it = techs.begin(); it != techs.end(); ++it ) {
    cout << (*it)->getCost() << endl;
}
```

or


```cpp
vector<ITechnology*> techs;
for( sizt_t index = 0; index < tech.size(); ++index ) {
    cout << techs[index]->getCost() << endl;
}
```

We can write:



```cpp
vector<ITechnology*> techs;
for( const ITechnology* tech : techs ) {
    cout << tech->getCost() << endl;
}
```

Note that although this kind of loop is often called a "foreach" loop, in C++ it
is invoked with the `for` keyword.
