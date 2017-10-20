---
layout: index
title: GCAM Fusion users guide
prev: 
next: 
gcam-version: v4.3 
---

Here we discuss the GCAM Fusion API modelers tools to perform two way coupling with a running GCAM simulation.  We start with an introduction then move on to some more indepth documentation some of which may only be relevant for someone who is interested in modifying or adding new components to GCAM itself.  *Note:* this document is meant for an audience who is knowledgable with C++.


Background

----------



GCAM is a object oriented model using a hierarchical structure to represent the various sectors and activities that it models.  This is convenient for setting up the abstractions and relationships with in the model however it does not lend itself well to getting data in and out apart from using a similarly hierarchical data structure: XML which is what we have used thus far.  We generally "set" data once at the start of the model with XMLParse.  We "get" data mostly through the use of custom visitors or after the run has completed via an XML database.
This has been a hinderance for modelers who would like to implement one-way or two-way coupling bwteen their own model and GCAM.  Where they may want to push new "parameters" into GCAM from a high level so as to dynamically incorporate feedbacks from other models as the model moves forward through time.  

The goal for GCAM Fusion is to be able to manipulate the internal parameters of GCAM from a high level.  However most users will not be familar with GCAM object and member variable names.  They are usually familiar with the XML tag names used in the input/output which typically map directly on to those internal variables. In addition many of our users have grown accustomed to searching the XML via simple XPath queries that look like: `/scenario[@name='Reference']//sector[@name='electricity]//share-weight[@year <= 2050]`.  Thus GCAM Fusion is a query engine for GCAM with a query syntax _somewhat_ like XPath using the same data names as the XML input tags.  Users can then use the search results as they like including changing the value of the results.


== Providing a hook to calling feedbacks ==

Currently we are providing the following hooks for users to call their feedbacks:

* Just before a simulation period of GCAM begins it's solution process.
* After a simulation period of GCAM has solved and the `hector` climate model has been called.

The exact interface is as follows:

```cpp
/*!
 * \ingroup Objects
 * \brief This provides the interface for classes which will provide feedback to
 *        model parameters as calculated based upon model results as the simulation
 *        moves forward through the model years.
 * \details This interface will provide two hooks to notify when to calculate feedbacks:
 *          Before a new model period is about to start and after a model period has
 *          has finished solving and climate model results for the period are available.
 *          A references to the Scenario and IClimateModel will be provided however
 *          it is implied that the subclasses of this interface will utilize the 
 *          GCAM fusion capabilities to gain access to the internal model state
 *          necessary to compute and/or push feedbacks into GCAM.
 * \warning MAGICC does not currently run between periods so these feedbacks may
 *          not work correctly if climate results are needed and MAGICC is configured
 *          as the climate model.
 *
 * \author Pralit Patel
 */
class IModelFeedbackCalc : public INamed,
                           public IParsable,
                           public IRoundTrippable,
                           private boost::noncopyable
{
public:
    virtual ~IModelFeedbackCalc() { }
    
    /*!
     * \brief A call back to indicate that a new simulation period is about to begin.
     * \details Note that climate model results will not yet be available for the current.
     *          period however results up to where the year where the model left off
     *          from the prior model year should still be available.
     * \param aScenario The Scenario object that contains the full state of the currently
     *                  running model.
     * \param IClimateModel The climate model instance which can be queried for climate
     *                      results.
     * \param aPeriod The model period that is about to begin calculation.
     */
    virtual void calcFeedbacksBeforePeriod( Scenario* aScenario, const IClimateModel* aClimateModel, const int aPeriod ) = 0;
    
    /*!
     * \brief A call back to indicate that a simulation period has ended and the climate
     *        model has been run updated through this period.
     * \param aScenario The Scenario object that contains the full state of the currently
     *                  running model.
     * \param IClimateModel The climate model instance which can be queried for climate
     *                      results.
     * \param aPeriod The model period that just finished it's calculation.
     */
    virtual void calcFeedbacksAfterPeriod( Scenario* aScenario, const IClimateModel* aClimateModel, const int aPeriod ) = 0;
};
```


An Introduction Using an Illustrative Example

-----------------------

In order to explain how to use the GCAM Fusion capabilities let's jump right into it with an illustrative feedback example.  In this toy example we will, broadly speaking:

* Query GCAM to capture some desriable state of the simulation
* Use those results to calculate some sort of impact which we would like to effect on the simluation moving forward
* Adjust some GCAM parameter(s) to reflect the impact.

Such a usage pattern will likely be common.  More specifically to this toy example we will query for global CO2 emissions, calculate feedbacks to heating / cooling degree days using an exteremely simplistic linear relationsip, and finally change the heating and cooling degree days with in GCAM for the next simulation period.

To start we will create a new class which implements the feedback interface mentioned above:

```cpp
#include "containers/include/imodel_feedback_calc.h"

/*!
 * \ingroup Objects
 * \brief Calc feed back to heating and cooling degree days.
 * \details Test implementation.
 *
 * \author Pralit Patel
 */
class DegreeDaysFeedback : public IModelFeedbackCalc
{
public:
    DegreeDaysFeedback();
    virtual ~DegreeDaysFeedback();
    
    static const std::string& getXMLNameStatic();
    
    // INamed methods
    virtual const std::string& getName() const;
    
    // IParsable methods
    virtual bool XMLParse( const xercesc::DOMNode* aNode );
    
    // IRoundTrippable methods
    virtual void toInputXML( std::ostream& aOut, Tabs* aTabs ) const;
    
    // IModelFeedbackCalc methods
    virtual void calcFeedbacksBeforePeriod( Scenario* aScenario, const IClimateModel* aClimateModel, const int aPeriod );
    
    virtual void calcFeedbacksAfterPeriod( Scenario* aScenario, const IClimateModel* aClimateModel, const int aPeriod );
    
protected:
    //! The name of this feedback
    std::string mName;
    
    //! A HDD feedback coefficient of sorts
    double mHDDCoef;
    
    //! A CDD feedback coefficient of sorts
    double mCDDCoef;
    
    //! The base year emissions value to calculate feedback from
    double mBaseYearValue;
};
```

You will notice that I have also included the XML parsing hooks that GCAM uses to initialize it's components such as `XMLParse` and `toInputXML`.  Providing these hooks will be necessary however you can use which ever means to set up your component as is appropriate for you.

The source will then look like the following shell:

```cpp
#include "util/base/include/definitions.h"
#include <cassert>
#include <vector>

#include "containers/include/degree_days_feedback.h"
#include "util/base/include/xml_helper.h"
#include "containers/include/scenario.h"
#include "util/base/include/model_time.h"

using namespace std;
using namespace xercesc;

DegreeDaysFeedback::DegreeDaysFeedback()
:mHDDCoef( 0 ),
mCDDCoef( 0 ),
mBaseYearValue( 0 )
{
}

DegreeDaysFeedback::~DegreeDaysFeedback() {
}

const string& DegreeDaysFeedback::getXMLNameStatic() {
    const static string XML_NAME = "degree-day-feedback";
    return XML_NAME;
}

const string& DegreeDaysFeedback::getName() const {
    return mName;
}

bool DegreeDaysFeedback::XMLParse( const DOMNode* aNode ) {
    /*! \pre Make sure we were passed a valid node. */
    assert( aNode );
    
    // get the name attribute.
    mName = XMLHelper<string>::getAttr( aNode, XMLHelper<void>::name() );

    // get all child nodes.
    DOMNodeList* nodeList = aNode->getChildNodes();
    
    // loop through the child nodes.
    for( unsigned int i = 0; i < nodeList->getLength(); i++ ){
        DOMNode* curr = nodeList->item( i );
        string nodeName = XMLHelper<string>::safeTranscode( curr->getNodeName() );
        
        if( nodeName == XMLHelper<void>::text() ) {
            continue;
        }
        else if( nodeName == "hdd-coef" ) {
            mHDDCoef = XMLHelper<double>::getValue( curr );
        }
        else if( nodeName == "cdd-coef" ) {
            mCDDCoef = XMLHelper<double>::getValue( curr );
        }
        else {
            ILogger& mainLog = ILogger::getLogger( "main_log" );
            mainLog.setLevel( ILogger::ERROR );
            mainLog << "Unknown element " << nodeName << " encountered while parsing " << getXMLNameStatic() << endl;
        }
    }
    
    return true;
}

void DegreeDaysFeedback::toInputXML( ostream& aOut, Tabs* aTabs ) const {
    XMLWriteOpeningTag( getXMLNameStatic(), aOut, aTabs );

    XMLWriteElement( mHDDCoef, "hdd-coef", aOut, aTabs );
    XMLWriteElement( mCDDCoef, "cdd-coef", aOut, aTabs );
    
    XMLWriteClosingTag( getXMLNameStatic(), aOut, aTabs );
}

void DegreeDaysFeedback::calcFeedbacksBeforePeriod( Scenario* aSceanrio, const IClimateModel* aClimateModel,
                                                    const int aPeriod )
{
    // gets called just before a period will begin to solve
}

void DegreeDaysFeedback::calcFeedbacksAfterPeriod( Scenario* aScenario, const IClimateModel* aClimateModel,
                                                   const int aPeriod )
{
    // gets called after a period is done solving, this will be the one we will use in
    // our example
}
```

Next let's add in some calls to GCAM Fusion to query for the global CO2 emissions from the model.  We'll take this one step at a time.  You will need to include the following header files into your .cpp file:

```cpp
#include "util/base/include/gcam_fusion.hpp"
#include "util/base/include/gcam_data_containers.h"
```

WARNING: including GCAMFusion essentially includes the **entire** model.  This is because it needs to be able to search and traverse potentially any object in the model.  This will lead to a long compile time for any source file that includes it.

The `GCAMFusion` object takes four template parameters:

-   The type of the object that can handle the results of the search
-   A boolean flag to indicate if said object will process the data being found (default is `true`).
-   A boolean flag to indicate if said object will process the start of each step taken into a `CONTAINER` object (default is `false`).
-   A boolean flag to indicate if said object will process stepping out of a `CONTAINER` object (default is false).


The GCAMFusion object takes two parameters:

-   A vector of FilterSteps
-   An instance of an object that can handle the results of the search

The object that will handle the results of the search can be any object since GCAMFusion is templated. This object must provide the templated function that will be called when that event occurs corresponding to the templated flags used in creation of the GCAMFusion object:

```cpp
struct GatherEmiss {
    // a variable to keep the sum
    double mEmiss = 0;

    // call back methods for GCAMFusion
    // called if the second templated flag to GCAMFusion is true
    template<typename T>
    void processData( T& aData );


    // call back methods for GCAMFusion
    // called if the third templated flag to GCAMFusion were true
    //template<typename T>
    //void pushFilterStep( const DataType& aData );


    // call back methods for GCAMFusion
    // called if the fourth templated flag to GCAMFusion were true
    //template<typename T>
    //void popFilterStep( const DataType& aData );
};
```

Then we can call GCAM Fusion with a search string and have it use the above struct to process the results:


```cpp
void DegreeDaysFeedback::calcFeedbacksAfterPeriod( Scenario* aScenario, const IClimateModel* aClimateModel,
                                                   const int aPeriod )
{
    vector<FilterStep*> emissFilterSteps = parseFilterString( "world/region/sector/subsector/technology/period[YearFilter,IntLessThanEq,"+
        modeltime->getper_to_yr( aPeriod )+"]/ghg[NamedFilter,StringEquals,CO2]" );
    // notice we can search by a year by using the YearFilter or by a GCAM model period by just using
    // an IndexFilter
    emissFilterSteps.push_back( new FilterStep( "emissions", new IndexFilter( new IntEquals( aPeriod ) ) ) );
    GatherEmiss gatherEmissProc;
    GCAMFusion<GatherEmiss, true> gatherEmiss( gatherEmissProc, emissFilterSteps );
    // We must provide an object as the context to start the search, in this case we
    // start at the top with the Scenario object.
    gatherEmiss.startFilter( aScenario );
    // Results are not returned and instead the processData callback function of the
    // GatherEmiss class is called when a matching emissions value is found.

    // We can then retrieve the result to use it in our impact calculations 
    double currGlobalEmiss = gatherEmissProc.mEmiss;
    cout << "Curr global emissions are " << currGlobalEmiss << " in period " << aPeriod << endl;
}
```

As you can see above the FilterSteps can be created manually or by using the utility `parseFilterString` to conveniently generate it for you by using a syntax _similar_ to XPath. Each [filter step](#filterstep-objects) may contain a data name and a filter . Each [filter](#filter-objects) contains a [predicate](#predicates) and the predicate value.


As mentioned above GCAMFusion finds a result that matches the search it will call `processData` and the user can get or set the value as appropriate for their needs:
Note GCAMFusion can not know what the type of the result of the search is going to be ahead of time.  Searches are made at runtime while the code to handle the results are generated at compile time.  This is the reason the processData method must be templated.  We can create template specializations for what we think the appropriate type should be and for all other types such as `ITechnology*` we ignore (or maybe assert that the code should never get there during runtime).


```cpp
template<typename T>
void GatherEmiss::processData( T& aData ) {
    assert( false );
}
template<>
void GatherEmiss::processData<Value>( Value& aData ) {
    mEmiss += aData;
}
```

Next we do something interesting with our results.. although in this example the term interesting may be stretching it:

```cpp
    if( aPeriod == modeltime->getFinalCalibrationPeriod() ) {
        // just store the base year value
        mBaseYearValue = currGlobalEmiss;
    }
    // scale heating and cooling degree days for the next period
    mCurrDDScaler = 1.0 / ( currGlobalEmiss / mBaseYearValue ) * mHDDCoef;
```

Finally we can query for the appropriate GCAM paramaters again but this time changing the value.  You will notice that really everything works the same as when we were collecting the CO2 emissions.  The data passed to `processData` is passed by reference to the actual parameter that lives in the GCAM objects and is not const so we are free to change it as we please.

```cpp
    // Note the actual services are "resid heating" or "comm cooling", etc so we
    // use regular expression partial matching so we do not have to spell it out.
    vector<FilterStep*> ddFilterSteps = parseFilterString( "world/region/consumer/nodeInput/nodeInput/nodeInput[NamedFilter,StringRegexMatches,heating]" );
    ddFilterSteps.push_back( new FilterStep( "degree-days", new IndexFilter( new IntEquals( aPeriod + 1 ) ) ) );
    GCAMFusion<DegreeDaysFeedback, true> scaleHDD( *this, ddFilterSteps );
    scaleHDD.startFilter( aScenario );
    
    mCurrDDScaler = ( currGlobalEmiss / mBaseYearValue ) * mCDDCoef;
    // only updating the service name filter of our query, we can keep the rest of it the same
    delete ddFilterSteps[ ddFilterSteps.size() - 2 ];
    ddFilterSteps[ ddFilterSteps.size() - 2 ] = new FilterStep( "nodeInput", new NamedFilter( new StringRegexMatches( "cooling" ) ) );
    GCAMFusion<DegreeDaysFeedback, true, true> scaleCDD( *this, ddFilterSteps );
    scaleCDD.startFilter( aScenario );

    // note we are still responsible for the memory we allocate even if it was done in the parseFilterString utility
    for( auto filterStep : ddFilterSteps ) {
        delete filterStep;
    }
```

And the call backs..

```cpp
template<typename T>
void DegreeDaysFeedback::processData( T& aData ) {
    assert( false );
}
template<>
void DegreeDaysFeedback::processData<Value>( Value& aData ) {
    // We are manipulating aData which is referenced back to the actual GCAM objects
    aData *= mCurrDDScaler;
}

void DegreeDaysFeedback::pushFilterStep( INamed* const& aContainer ) {
    std::cout << "Saw step " << aContainer->getName() << std::endl;
}

template<typename T>
typename boost::disable_if<
    boost::is_base_of<INamed, typename boost::remove_pointer<T>::type>,
void>::type DegreeDaysFeedback::pushFilterStep( const T& aContainer ) {
    std::cout << "Saw unknown " << typeid( T ).name() << std::endl;
}
```

A couple things to note, sometimes it is easier to just use your feedback object to process callbacks from GCAM fusion.  It isn't required to use a helper struct to do so and sometimes it is easier not to.  Nothing additional is required to handle feedbacks, you don't have to implement any interface, just provide the `processData`, etc callback methods.
I've also included and configured the call back for `pushFilterStep` just for example.  I also threw in some uses of boost's (using the std library should work just fine too) type traits + SFINAE to control which objects we are intereasted in just to point out the possible strategies for only dealing with certain types (although how SFINAE techniques actually work is far too complicated to discuss here, luckily plenty has been written about the topic).


TODO: Linking in your feedbacks
---
TODO:

Intended Use of GCAM Fusion
---
Note that GCAM Fusion gives the users full access to all the internal parameters of GCAM for better or for worse.  Just because you are able to change these values doesn't mean GCAM will be able to operate normally when doing so.
Therefore we only reccommend using GCAM Fusion inside of the `IModelFeedback` methods.  Making feedbacks during the solution of a model period would require additional dependencies and linkages to ensure proper solution and GCAM Fusion would entirely circumvent those procedures.
As a rule of thumb adjusting the same model perameters which are parsed in GCAM XML input files should be fine to modify.  It should **not** be used to curcimvent normal object orientened principals or designs.  Object encapsulation allows us to ensure some level of consistency.

To be clear there are no sofware limitation imposed on the use of GCAM Fusion however code proposed for inclusion into the Core GCAM model may be rejected due to improper / abuse of the capabilities as it will hinder the long term maintainability of the model.


Some Documentation for Filter Steps
---

### FilterStep objects



A FilterStep is the object that GCAMFusion uses to search a single GCAM container's data vector.  It can optionally specify a data name to match which is compared against the `Data::mDataName`.  If the data name in the FilterStep is empty it is assumed to match *any* data name.  The other optional parameter is a [Filter](#filter-objects) which can used to filter any single element of the data vector that has an `ARRAY` or `CONTAINER` flag.  Note if no filter is specified it is assumed to be `NoFilter`.  Note if a Filter other than `NoFilter` is set then any element of the data vector that is defined as a `SIMPLE` Data object will be rejected even if the data name matches.  In addition if no data name and no filter is set then not only does this FilterStep match all data but it also enables special "descendant step" traversal behavior in GCAMFusion where the next FilterStep can be matched zero or more containers down.  For instance `sector//share-weight` will find `share-weight` data at the `subector` and `technology` levels.



### Filter objects



A Filter object allows GCAMFusion to select a subset of data vector element if that data element was for instance an array of containers. The available Filters are:

* NoFilter: matches all elements
* NamedFilter: Calls the -&gt;getName() method on the container to compare in it's predicate. `SIMPLE` and `ARRAY` will never match.
* YearFilter: Calls the -&gt;getYear() method if the data is `CONTAINER` or uses the `Modeltime` to convert period index to year if the data is `ARRAY` and compares that year in it's predicate. `SIMPLE` data will never match.
* IndexFilter: Computes the index offset of each element in an `ARRAY` or `CONTAINER` Data for comparison in it's predicate. `SIMPLE` Data will never match.



### Predicates



A predicate is a way to test whether a year, or name, or index, etc matches a value the user was looking for. Note that currently predicates can only operate on string and int. If a predicate that is doing a string comparison is given an int to match (i.e. called from a YearFilter) it will always return false. The available predicates are:



-   StringEquals | string | Tests if the proposition exactly matches a string value.
-   StringRegexMatches | string | Tests if the proposition matches a regular expression in the egrep notation (TODO: which notation do we want to use, check C++ standard for options).
-   IntEquals | int | Tests if the proposition exactly matches an int value.
-   IntGreaterThan | int | Tests if the proposition is strictly greater than an int value.
-   IntGreaterThanEq | int | Tests if the proposition is greater or equal to an int value.
-   IntLessThan | int | Tests if the proposition is strictly less than an int value.
-   IntLessThanEq | int | Tests if the proposition is less or equal to an int value.



### parseFilterString



This is a utility method so that users do not need to manually construct FilterSteps and can instead just easily specify using a convenient text notation. The string is processed by:

\* Split the string on the '/' so that the contents of each is assumed to be one FilterStep definition

\*\* All characters up to the '\[' (or end of the string) is assumed to the data name.

\*\* All characters in between the '\[' and '\]' (if they exist) are split by ','

\*\*\* Each element is then processed by the first element being the [Filter](#filter-objects)

\*\*\* The second and third element (must exist unless Filter is NoFilter) is a predicate and the value to match in the [predicate](predicates)


What GCAM Fusion Means for Writing a New GCAM Component
---

The following section is perhaps more advanced than most GCAM users would need to know.  It is geared towards someone who would need to add a new Class to GCAM and still be compatible with GCAM Fusion.




Background
---


To accomplish our goals set out earlier for coming up with a high level API for implementing two-way feedbacks with GCAM we need to deal with:
* Traverse the heirarchical GCAM strucuture from a high level
* Avoid forcing users to become familiar with the internals of GCAM, instead we can leverage their knowledge of the XML strucuture
* Avoid putting too much burden on GCAM developers to maintain the API when developing new capabilities


This then presents us with our first challenge. While we currently have a mapping from XML name to data objects (such as XMLParse, toInputXML, or XMLDB output) it is mostly a manual process replicated in EACH of these cases where it is needed. It would be better if we associated that name just one time together with the declartion of the variable. Lets use a simple psuedocode example to illustrate:

For C++ purposes it only needs to know what type the data member is and what you will call it in your C++ code:

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

For our purposes we want to add an XML -- or user readable name:

```cpp
class Sector {
    //! Sector name
    string, mName, "name"
    //! Sector price by period updated with solution prices.
    PeriodVector<double>, mPrice, "price"
    //! subsector objects
    vector<Subsector*>, mSubsectors, "subsector"
}
```

Cool.  Those things are all named but now we need to be able to loop over them so that we could search for /\* or /price etc.  We need to tie each of these varaibles together so we can know which variables to loop over:



```cpp
class Sector {
    DEFINE_DATA(
        //! Sector name
        string, mName, "name"
        //! Sector price by period updated with solution prices.
        PeriodVector<double>, mPrice, "price"
        //! subsector objects
        vector<Subsector*>, mSubsectors, "subsector"
    )
}
```



Ok.  Well, we need to be able to know that "subsector" is actually a container of data itself and not just some simple data object.  Thus these containers are identified by name or year, such as `/subsector[@name='coal']`.  In fact it might be useful to note that the prices too can be filtered too even though it is not a container, such as `/price[@year=2010]`:



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



Uh, hey but GCAM is full of inheritance.  Won't each subclass potentially define it's own list of data:



```cpp
class PassThroughSector: public Sector {
    DEFINE_DATA(
        //! The appropriate sector name for which's marginal revenue should be used
        //! when calculating fixed output.
        DEFINE_VARIABLE( SIMPLE, string, mMarginalRevenueSector, "marginal-revenue-sector" )
    )
}
```



Shoot, yea GCAM Fusion will have to splice those lists of data together at run time.  Let's give it some more tags to know it has to do that:



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



Cool!  But this isn't actually valid C++ is it?  Well.. sort of.  This is actually pretty close to how the GCAM data definitions will now look like with GCAM fusion.  But of course this syntax isn't C++.  Instead we are relying on Macros and template meta programming to transform these clean data definitions into the valid, yet much less elegant, C++ syntax during compile time:



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



You will notice that we use such classes as `Data<string, SIMPLE>` and `Data<Subsector*, CONTAINER>`.  These are just helper structs to let us tie together user facing names as well as potentially other meta data with a reference to the actual data being contained (such as string or Subsector\*):



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



Then the type `DataVectorType` is a special kind of vector, one that can hold data of varying types, which can be looped over to process data in bulk. In addition this "fusion" vector allows us to perform algorithms at both compile time and run time.



Note that an instance of the DataVectorType is only created if the `generateDatatVector()` method is called (which should typically only be called through GCAM Fusion via [ExpandDataVector](#expanddatavector)) thus there is no runtime overhead penalty imposed on GCAM except when calling GCAMFusion to search for data.  In addition this implies that all of the changes required to allow for GCAM Fusion need only to be made in the header files by declaring variables as described above.



What to know when writing or updating a GCAM class
--------------------------------------------------



As mentioned earlier GCAM fusion changes the way we declare member variables for GCAM classes.  Some of these changes are simply to associate meta information that the GCAM fusion tools can utilize to search and traverse the GCAM objects.  Other changes are actually just to ensure we have a uniform approach so that we may generate as much boiler plate code as possible without the need to special case.  Note while it is possible to not follow or utilize and of the GCAM Fusion tools and coding standards and still create valid and usable GCAM objects it is *highly discouraged*.  While you may think you don't want anyone messing with the internals of your object keep in mind that these tools provide the ability to do so much more that just a high level GCAM API.  We could (and have in experimental versions) take advantage to for instance to automatically generate all XML parsing code or make several copies of a running GCAM instance to run in parallel.



### Make all DATA definitions protected:



We need to make sure that all data definitions are made as protected instead of private.  It may be the case that PassThroughSector should not have access to change the mPrice of the Sector base class.   Unfortunately if we want to generically join the Sector and PassThroughSector data vectors for introspection via GCAM Fusion the PassThroughSector needs access to the entire Sector data vector.



### Using the DEFINE\_DATA macros:



We provide a utility header `#include "util/base/include/data_definition_util.h"` that defines the all of the tools for defining data members.  Generally these will be instantiated by using the following Macros:



#### DEFINE\_DATA( ... ) and DEFINE\_DATA\_WITH\_PARENT( ... )



These calls are used to wrap all of the class data member definitions.  A user must use the DEFINE\_DATA\_WITH\_PARENT for any class that is derived from a base class.  Even if that base class is abstract with no data members.  The very first "argument" to the DEFINE\_DATA\_WITH\_PARENT is the name of the direct parent of this subclass for instance:



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



A user then would use DEFINE\_DATA in the base class even if it is not going to define and data members.  The first argument to DEFINE\_DATA must be a list of the name of the class then all possible subclasses of the class \[link to a section where we explain why\].  Note that classes that do not have any classes derive from them will still use this method and the subclass list will only contain itself.



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



With in the DEFINE\_DATA\* sections after the declarations related to the subclass tree navigation are the actual data member definitions.  They are listed one after the other separated by a comma.  Each definition will use one of the following Macros depending on the nature of that data definition:



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



This is used to define a member variable that is just a piece of data such as ints, double, string, Value, etc.  More directly, you would want to use this definition tag if the member variable does not contain more data (i.e. `/price/logit-exponent` isn't valid) or can't be filtered (i.e. `/name[@year=2020]` isn't valid).



#### DEFINE\_VARIABLE with flag ARRAY



This is used to define a member variable that is an array of simple data such as PeriodVector&lt;Value&gt; or vector&lt;int&gt;, etc.  More directly, you want to use this definition tag if the member variable does not contain more data (i.e. `/price/logit-exponent` isn't valid) but can be filtered (i.e. `/price[@year=2020]` is valid).



#### DEFINE\_VARIABLE with flag CONTAINER



This is used to define a member variable that is a container of more data such as Region, Sector, etc (i.e. `/discrete-choice-function/logit-exponent` is valid).  Note that the variable definition may be a vector, such as with subsector or just a single object such as with discrete-choice-function.  We just use the CONTAINER tag to handle both cases.  The reason is for container thery may be filtered by [NamedFilter](#filter-objects) or [YearFilter](#filter-objects).  If the data being held is vector&lt;Subsector\*&gt; for instance this allows us to search only the one that matches the name: `/subsector[@name='coal']/share-weight`.  If the data isn't a vector and just a single object it may still make sense to filter by name, such an example would be the climate model `/climate-model[@name='hector']`.



#### DEFINE\_VARIABLE with flag SIMPLE | STATE or ARRAY | STATE



The data flags can be combined with the vertical bar operator `|` if associating more tags may be useful.  Note Data **must** be tagged with one of `SIMPLE`, `ARRAY`, or `CONTAINER`.  Currently there is only one other flag defined to combine with those other flags: `STATE`.  In fact it only makes sense to use `STATE` with `SIMPLE` or `ARRAY`.  You should add this flag to any Data definition who's data will get set during a call to `World.calc`, as described in [Centrally Managed State Variables](#centrally-managed-state-variables).



### Some side effects from the way we have done the data definitions



<span style="color: rgb(0,0,0);font-weight: bold;">No more use of smart pointers as data members</span>



<span style="color: rgb(255,204,0);">TODO:</span> these were dropped because it made detecting what the actual data was much more difficult (i.e. the type I need to know is `IDiscreteChoice*` not `std::auto_ptr<IDiscreteChoice*>`).  I could try harder if we want to put these back in, it will result in a lot more template specialization and work arounds.  Also note `std::auto_ptr` is deprecated in favor of `std::unique_ptr`.








Centrally Managed State Variables
---------------------------------



A new feature that is enabled by GCAM Fusion, although otherwise unrelated, is tagging and collecting "state" variables into a central location where they can be managed for the purposes of partial derivative calculations.  By "state" variables we refer to any variable who's value gets set during a call to `World.calc`.  Such an example would be `mPrice` of the `Sector` class as the price of intermediate sectors are dynamically calculated as the share weighted cost of it's competing inputs.



### Why is centrally managed better than what we had before



State variables are of interest since during partial derivative calculations we start from some "base" state and perturb a price of just one good, re-run the model by calling `World.calc` with the new price and record the impact that has on all of the supplies/demands as compared to the "base" supplies/demands.  Then we need to revert back to the "base" state before we can proceed with the next partial derivative.  A naive approach would be to just call `World.calc` using the original prices from the "base" state.  However such a strategy would essentially double the number of computation required to calculate partial derivatives.  Instead GCAM has code to track and manage state to be able to quickly reset the "base" state when calculating partial derivatives.  However prior to GCAM fusion this code was strewn through out the code in many places:



-   Each market had a "stored" price, supply, and demand and corresponding methods to store/restore them.
-   Any GCAM object that needed to addToSupply/Demand would have to keep an additional "state" member variables to make the call to the market place: `mLastCalcValue = marketplace->addToDemand( mName, aRegionName, annualServiceDemand, mLastCalcValue, aPeriod );`
-   Any other state would get lazily recalculated by marking at the Activity level a "stale" flag.  If a Demand Activity was still marked as stale when it needed to recalculate a partial derivative then it would be forced to recalculate it's Price Activity.  A strategy which creates extra work and potentially easy to break/get wrong.



With the changes to central manage state that come along with GCAM Fusion we simplify this to:



-   The centrally managed "scratch" chunk of memory gets copied over with the "base" chunk of memory.
-   Any GCAM object that needed to addToSupply/Demand must do so with a `Value` member variable marked as `STATE`: `marketplace->addToDemand( mName, aRegionName, mServiceDemands[ aPeriod ], aPeriod );`


The new approach is much more simple and easier to guarantee we didn't miss something by using [DEBUG_STATE](#ensuring-that-no-state-variable-is-missed).  In addition when running with GCAM Parallel enabled we can allocate a "scratch" space for every thread allowing for each of the ~470 partial derivative calculations to be calculated completely independently and in parallel from each other.  This gives us far greater parallelism than we had previously.



### How exactly does managing state variables work



First users must tag the Data definitions with the `STATE` [flag](#definevariable-with-flag-simple--state-or-array--state) to indicate which member variables are state.  The type of these variables could in principal be any simple type or array of simple type however for simplicity and to provide an object that gives us an opportunity for indirection to swap out the actual location of the underlying data from a central location we must use the `Value` class:



`DEFINE_VARIABLE( SIMPLE | STATE, "price", mPrice, Value )`


or


`DEFINE_VARIABLE( ARRAY | STATE, "emissions", mEmissions, objects::PeriodVector<Value> )`



By adding the `STATE` tag it allows us to search, using GCAM Fusion, for all of the objects with that tag.  A new class `ManageStateVaraibles` is responsible doing the search as well as all of the other state maintenance as discussed below.  Note that state data is collected each period so as to keep the number of values to store and copy remains reasonable.  To do this we:



-   Skip data that is in a Technology that is not operating or a Market not of the current year
-   Data in a period vector are only collected for the current period.
-   Data in a year vector (such as LUC emissions) for only the years in the current timestep.



Once we know how many state data there are in a period we can allocate space to store the centrally managed data in a two dimensional array.  The first dimension is an entry for each state variable.  The second dimension is for the states, where the first is the "base" state and the rest are "scratch" (without parallel enabled just 1 however when enabled it is one for each thread, on PIC some nodes can have as many as 48 threads).  Since we need to be able to quickly copy over scratch state we need to store the data contigiously.  Thus in order to keep several copies of state and quickly replace it is important we keep that total number of state variables to a reasonable amount.  Currently we observe 300,000 to 700,000 double values depending on the model period which is ~ 2 - 5 MB worth of memory per state which is well with in reason.



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



We can check to make sure that not Data definitions were missed being tagged as "state" (how I got'em all initially) by enabling the preprocessor flag `DEBUG_STATE` which will enable checks to flag Values that are changed during a call to `World.calc` as well as other checks to ensure Values get collected / reset properly.



Other GCAM Fusion related utilities
-----------------------------------



### ExpandDataVector



Generally users typically would not call this method directly and instead used indirectly through searches via GCAM Fusion.  It is a utility for ensuring that we get the complete data vector from a data container taking into account the data vectors inherited from any base classes.  Expanding the full data vector is more tricky than it would first appear since we need to be able to determine which SubClass we are dealing with at runtime as we only ever store instances with the Base class pointer (this is typically accomplished with virtual methods). However the return type of each SubClass would be different for each SubClass. Thus we need to use a double dispatch based approach with a visitor that will collect the full data vector. In order for this visitor to be generic it needs to be templated however mixing virtual methods with templated argument is not allowed by the compiler due to possibly infinite method combinations.



### Factory



A generic templated factory that can create any member of a [SubClassFamilyVector](#definedata---and-definedatawithparent--) given the XML name.  This class is currently not used however could be employed to replace all of the various Factory singleton classes that currently exist in GCAM.  It would really be useful when/if we generate all XML Parsing code by the compiler.



C++11/14 Features:
------------------



Some code written in GCAM Fusion take advantge of some new language features. While not always necessary they proved useful. Note this isn't the full breadth of the new C++11/14 features, just the ones you may find in GCAM Fusion. In addtion there are some classes, such as regular expressions, which are also part of the new standard however I will not talk about them since it doesn't change any language expressions that may be confusing to C++ coders.



### auto



You may see variables declared as the `auto` type. It is however not a type, instead it is basically a way for the programer to be lazy and not bother trying to figure out what the appropriate type is and instead say "let the compiler figure it out". If the compiler can't figure it out unambigously then it will raise an error. Apart from that you could use it any place. Although, my personal opinion, is this is not a good idea as a reviewer looking over the code needs to try harder to piece together what is going on. However when dealing with templated typedefs and nested / derivived types these type defininitions can get quite complex. In this case I propose it is actually clearer to just say:



```cpp
template<typename SomeKindOfArrayOfContainerType>
void someFunc(ContainerData<SomeKindOfArrayOfContainerType> aData ) {
    // descriptive comment to tell use what is being decalared.
    auto copyOfData = aData.mData.begin()->clone();
    ...
}
```



Than trying to parse:



```cpp
template<typename SomeKindOfArrayOfContainerType>
void someFunc(ContainerData<SomeKindOfArrayOfContainerType> aData ) {
    typename boost::remove_ptr<ContainerData::value_type::value_type>::type copyOfData = aData.mData.begin()->clone();
    ...
}
```



### decltype(..)



Similiar to the `auto` declaration the `decltype` allows the coder to be lazy about declaring the type of some variable. This declaration allows you to copy the type of some other variable. Although the true usefulness of this language tool is you can then use it to derive further types:

`typename decltype( mSomeVector )::const_iterator`



### Using decltype in the return



For the same reason it is useful to take advantage of `decltype` you may want to take advantage in declaring a function return type based off of the argument passed in. To do this you need to use some slightly alternative syntax:



```cpp
template<typename SomeVectorDef>
functionName( SomeVectorDef aVector ) -> decltype( aVector )::const_iterator {
    return aVector.begin();
}
```



### Closures



Often when dealing with structures of unknown and differing types we need to use templated functors to deal with each different type:



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



Can be more simply:



```cpp
boost::fusion::vector<Sector, Subsector, ITechnology> vec(aSector, aSubsector, aTech);
bool isNameCoal = boost::fusion::any(vec,
    [aName]( auto aClass ) -> bool {
        return aClass->getName() == aName;
    }
);
```



The values in the `[ ]` names the variables from the local scope to be made available in the closure.  Including an `&` in front of the variable indicates to pass by reference.  Simply providing the `&` indicates make available all local variables by reference.



### Foreach in C++



C++ introduced it's version of foreach which basically is meant to reduce the verbosity of looping over arrays of data. So instead of:



```cpp
vector<ITechnology*> techs;
for( vector<ITechnology*>::const_iterator it = techs.begin(); it != techs.end(); ++it ) {
    cout << (*it)->getCost() << endl;
}
```



Or



```cpp
vector<ITechnology*> techs;
for( sizt_t index = 0; index < tech.size(); ++index ) {
    cout << techs[index]->getCost() << endl;
}
```



We can simply write:



```cpp
vector<ITechnology*> techs;
for( const ITechnology* tech : techs ) {
    cout << tech->getCost() << endl;
}
```



Or even shorter if that is your cup of tea:



```cpp
vector<ITechnology*> techs;
for( auto tech : techs ) {
    cout << tech->getCost() << endl;
}
```

