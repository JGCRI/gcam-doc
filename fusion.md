---
layout: index
title: GCAM Fusion users guide
prev: gcam-build.html
next: updates.html
gcam-version: v5.3
---

Here we discuss the GCAM Fusion API modelers tools to perform two way coupling
with a running GCAM simulation.  We start with an introduction then move on to
some more in-depth documentation some of which may only be relevant for someone
who is interested in modifying or adding new components to GCAM itself.  

*Note:* the discussion that follows is aimed at an audience proficient with
 C++.  GCAM developers looking to understand how to make their GCAM module complaint with GCAM Fusion should check the [Developer Guide](dev-guide/examples.html).


Background
----------


GCAM is a object oriented model using a hierarchical structure to represent the
various sectors and activities that it models.  This is convenient for setting
up the abstractions and relationships with in the model; however it does not
make it easy or convenient to get data in and out of the model.  We generally
set inputs data once at the start of the model by parsing the XML input
files.  We retrieve data mostly through the use of custom visitors at the end of
a scenario, or after the run has completed via an XML database.  

These limitations have been a hinderance for modelers who would like to
implement one-way or two-way coupling bwteen their own model and GCAM, in which
data from the coupled models is pushed into GCAM from a high level so as to
dynamically incorporate feedbacks simulation moves forward through time.

The goal for GCAM Fusion is to be able to control the internal parameters of
GCAM from a high level.  However, most users will not be familar with GCAM object
and member variable names.  They are usually familiar with the XML tag names
used in the input/output which typically map directly on to those internal
variables. In addition many of our users have grown accustomed to searching the
XML via simple XPath queries that look like:
`/scenario[@name='Reference']//sector[@name='electricity]//share-weight[@year <= 2050]`.
Thus GCAM Fusion is a query engine for GCAM with a query syntax _somewhat_ like
XPath using the same data names as the XML input tags.  Users can then use the
search results as they like including changing the value of the results.


Providing a hook to calling feedbacks
-------------------------------------

Currently we are providing the following hooks for users to call their feedbacks:

* Just before a simulation period of GCAM begins its solution process.
* After a simulation period of GCAM has solved and the `hector` climate model
  has been called.
  
Limiting access to the API in this way is a key part of our strategy for keeping
the model structure manageable.  Arbitrary updates to model internals can happen
_only_ at designated times.  This prevents every model object from becoming, in
effect, a global variable.

You create a feedback calculation by creating a "feedback object", which is an
instance of a class that implements `IModelFeedbackCalc` interface.  The key
functions in the interface are  

* `calcFeedbacksBeforePeriod`: A callback function that will be called at the
  start of a model period.  

* `calcFeedbacksAfterPeriod`:  A callback function that will be called at the
  end of a model period. 

The full definition of `IModelFeedbackCalc` is:

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
 *          GCAM Fusion capabilities to gain access to the internal model state
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
---------------------------------------------

In order to explain how to use the GCAM Fusion capabilities let's jump right
into it with an illustrative feedback example.  In this example we will:

* Query GCAM to capture key variables in the simulation,
* Use those results to calculate an impact that we would like to affect the
  simluation moving forward, and
* Adjust some GCAM parameter(s) to reflect the impact.

Such a usage pattern will likely be common.  More specifically, in this example
we will query for global CO2 emissions, calculate feedbacks to heating and
cooling degree days using a simplistic linear relationsip, and finally change
the heating and cooling degree days with in GCAM for the next simulation period.

<a name="feedback"></a>
To start we will create a new class which implements the feedback interface
mentioned above.  

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
    virtual void calcFeedbacksBeforePeriod( Scenario* aScenario, const
                                            IClimateModel* aClimateModel, const int aPeriod );
    
    virtual void calcFeedbacksAfterPeriod( Scenario* aScenario, const
                                           IClimateModel* aClimateModel, const int aPeriod ); 
    
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

You will notice that we have also included the XML parsing hooks that GCAM uses
to initialize its components such as `XMLParse` and `toInputXML`.  These
functions allow us to activate our feedback by including them in an XML add-on
file 

The source code that goes with this declaration will then look like the following skeleton:

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
    // This is the string you will use to refer to this object
	// in input files.
    const static string XML_NAME = "degree-day-feedback";
    return XML_NAME;
}

const string& DegreeDaysFeedback::getName() const {
    return mName;
}

bool DegreeDaysFeedback::XMLParse( const DOMNode* aNode ) {
	// Code to read the feedback object from XML inputs
}

void DegreeDaysFeedback::toInputXML( ostream& aOut, Tabs* aTabs ) const {
	// Code to write the object's configuration as XML 
	// (This is used when saving a configuration to be reread later)
}

void DegreeDaysFeedback::calcFeedbacksBeforePeriod( Scenario* aSceanrio, 
                                                    const IClimateModel* aClimateModel, 
													const int aPeriod ) 
{
    // code that gets called just before a period will begin to solve
}

void DegreeDaysFeedback::calcFeedbacksAfterPeriod( Scenario* aScenario, 
                                                   const IClimateModel* aClimateModel,
                                                   const int aPeriod )
{
    // code that gets called after a period is done solving, 
}
```

The two XML functions allow us to set up our feedback object from GCAM XML input
files.  Here is how they are defined:

```cpp
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

```

With these functions in place, you will be able to activate the feedbacks by
including an XML add-on file in your GCAM configuration.  Including the add-on
file will cause the feedback object to be created and added to the scenario's
list of feedbacks.  The `calcFeedbacksBeforePeriod` and
`calcFeedbacksAfterPeriod` methods will then be run automatically at the
beginning and end of each GCAM time step.
The add-on file would contain the following XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<scenario>
	<degree-day-feedback>
	<!-- The numerical values for the coefficients here are just examples -->
		<hdd-coef>23</hdd-coef>
		<cdd-coef>42</cdd-coef>
	</degree-day-feedback>
</scenario>
```

Next we will add in some calls to GCAM Fusion to query for the global CO2
emissions from the model.  You will need to include the following header files
into your .cpp file:

```cpp
#include "util/base/include/gcam_fusion.hpp"
#include "util/base/include/gcam_data_containers.h"
```

Be aware that including GCAMFusion essentially includes the *entire* model.  This
is because it needs to be able to search and traverse potentially any object in
the model.  This will lead to a long compile time for any source file that
includes it.  Therefore, you should try to isolate code that uses these
capabilities in a small number of fusion-aware translation units.

<a name="handler"></a>
Next, you will need an object that will handle the results of the search.  This
object can be of any type, since
the `GCAMFusion` class is templated. The only requirement is that the object must provide
the templated functions that
will be called on data found by the search.  The functions required will depend
on what combination of the three event types supported by GCAM Fusion you are
using.  The event types eare explained below.  If you aren't using an event
type, you can omit its processing function.

```cpp
struct GatherEmiss {
    // a variable to keep the sum
    double mEmiss = 0;

    // call back methods for GCAMFusion
    // called if the fourth template argument to GCAMFusion is true
    template<typename T>
    void processData( T& aData );


    // call back methods for GCAMFusion
    // called if the second templated argument to GCAMFusion is true
    // we won't be using it in this example.
    //template<typename T>
    //void pushFilterStep( const DataType& aData );


    // call back methods for GCAMFusion
    // called if the third templated argument to GCAMFusion is true
    // we won't be using it in this example.
    //template<typename T>
    //void popFilterStep( const DataType& aData );
};
```

We now have everything we need to use the GCAM Fusion interface.
The `GCAMFusion` object takes four template parameters:

-   The handler object that we just defined.
-   A boolean flag to indicate whether the handler will process the start of each
    step taken into a `CONTAINER` object (default is `false`).
-   A boolean flag to indicate whether the handler will process stepping out of
    a `CONTAINER` object (default is false). 
-   A boolean flag to indicate whether the handler will process the data being found
    (default is `true`).
	
The last flag (the one that defaults to `true`) is the most common use case, and
it's the only one we will use in this example.

The `GCAMFusion` object constructor takes two arguments:

-   A vector of FilterSteps
-   An instance of an object that can handle the results of the search

Then we can call GCAM Fusion with a search string and have it use the above
struct to process the results:


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
    // note we are just using the default template flags here: just process data, not the steps
    GCAMFusion<GatherEmiss> gatherEmiss( gatherEmissProc, emissFilterSteps );
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

As you can see above the FilterSteps can be created manually or by using the
utility `parseFilterString` to conveniently generate it for you by using a
syntax _similar_ (but not precisely identical) to XPath. Each
[filter step](dev-guide/examples.html#filterstep-objects) may contain a data name and a filter . Each
[filter](dev-guide/examples.html#filter-objects) contains a [predicate](dev-guide/examples.html#predicates) and the predicate
value.

As mentioned above, when GCAMFusion finds a result that matches the search it
will call `processData` and the user can get or set the value as appropriate for
their needs:  

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
GCAMFusion cannot know what the type of the result of the search is going to be
ahead of time.  Searches are made at runtime while the code to handle the
results are generated at compile time.  This is the reason the processData
method must be templated.  Therefore, we create a template specialization for
the type we are expecting to be returned from our search (i.e., based on our
prior knowledge of the model structure).  In this case we expect the appropriate
type to be a `Value` class, so we provide a specialization for that type.  If
everything is working correctly, we shouldn't get any other type.  If we do,
then we've made a mistake in setting up the system.  Therefore, in the generic
template, which will be instantiated for any other types that might be returned
by the search, we assert that the code should never get there during runtime.
If for some reason it does, then the run will abort with an error.


Next we do something with our results.  To keep things simple for illustrative
purposes, we'll adjust degree days by a scale factor, but you could in principle
do anything here, including running another model and passing it the data you
just received.  

```cpp
    if( aPeriod == modeltime->getFinalCalibrationPeriod() ) {
        // just store the base year value
        mBaseYearValue = currGlobalEmiss;
    }
    // scale heating and cooling degree days for the next period
    mCurrDDScaler = 1.0 / ( currGlobalEmiss / mBaseYearValue ) * mHDDCoef;
```

Finally we can query for the appropriate GCAM paramaters again but this time
changing the value.  You will notice that really everything works the same as
when we were collecting the CO2 emissions.  The data passed to `processData` is
passed by reference to the actual parameter that lives in the GCAM objects and
is not const so we are free to change it as we please.  These are the queries
for building heating and cooling services:

```cpp
    // Note the actual services are "resid heating" or "comm cooling", etc so we
    // use regular expression partial matching so we do not have to spell it out.
    vector<FilterStep*> ddFilterSteps = parseFilterString( "world/region/consumer/nodeInput/nodeInput/nodeInput[NamedFilter,StringRegexMatches,heating]" );
    ddFilterSteps.push_back( new FilterStep( "degree-days", new IndexFilter( new IntEquals( aPeriod + 1 ) ) ) );
    GCAMFusion<DegreeDaysFeedback> scaleHDD( *this, ddFilterSteps );
    scaleHDD.startFilter( aScenario );
    
    mCurrDDScaler = ( currGlobalEmiss / mBaseYearValue ) * mCDDCoef;
    // only updating the service name filter of our query, we can keep the rest of it the same
    delete ddFilterSteps[ ddFilterSteps.size() - 2 ];
    ddFilterSteps[ ddFilterSteps.size() - 2 ] = new FilterStep( "nodeInput", new NamedFilter( new StringRegexMatches( "cooling" ) ) );
    GCAMFusion<DegreeDaysFeedback, true> scaleCDD( *this, ddFilterSteps );
    scaleCDD.startFilter( aScenario );

    // note we are still responsible for the memory we allocate even if it was done in the parseFilterString utility
    for( auto filterStep : ddFilterSteps ) {
        delete filterStep;
    }
```

And here are the call backs that set the scaled degree days in those sectors:

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

A couple things to note, sometimes it is easier to just use your feedback object to process callbacks from GCAM Fusion.  It isn't required to use a helper struct.  Your class/struct does not need to implement any interface or the like, just provide the `processData`, etc callback methods.

I have also included and configured the call back for `pushFilterStep` just for example.  In addition you will notice the use of `disable_if` and some uses of boost's (using the std library should work just fine too) type traits such as `is_base_of`.  The purpose is to demonstrate how to control which objects we are intereasted in our `pushFilterStep` call back.  In this example we have the compiler generate one version for any object for which we can call `->getName()` on (implements the `INamed` interface) and another for types which do not.

Linking to Other Models
-------------------------

Often you want to use the data you retrieve using the GCAM Fusion interface as
input to another model.  Likewise, you may want to return the results of running
that model to GCAM as feedbacks.  To do these things you will have to link your
model to GCAM.  There are three options for doing this.

### Run your model as a stand-alone program and communicate with GCAM via IPC

This method is a little clunky, but it is probably the easiest to get up and
running in most cases.  You will run your model as a stand-alone process, and
you will communicate with GCAM via interprocess communication (IPC).  

The easiest form of IPC to get up and running is the
[named pipe](http://www.linuxjournal.com/article/2156). (The linked article is
for Linux, but named pipes work the same on Mac OS X as they do on Linux.)  The
concept here is that you will have set up a named pipe for each communication
stream between GCAM and your model.  These communication streams are
unidirectional, so for two way communication you will always need at least two.
Once the pipes are set up you can read and write to them as if they were files.
Your model should expect to receive data from GCAM after each GCAM time step on
the input pipe, and it should write its data on the output pipe.  You will also
need to establish conventions for signaling in-band when the data for a single
time step is finished, and when a model is exiting.

On the GCAM side, you will put all of the code to communicate with your model in
one of the `calcFeedbacksBeforePeriod` or `calcFeedbacksAfterPeriod` methods
associated with a feedback object, as described in the
[previous section](#feedback).  The code in the method should collect the data
you want from GCAM objects, format it as required by your model, and write it to
the named pipe your code is using for input.  Then you will want to read your
model's response on the pipe your code is using for output.  This operation will
block until your model provides its response.

Next, you must recompile GCAM including your new feedback object and add its XML
add-on file to your GCAM configuration.  Then, to perform a run, execute both
models (*e.g.*, from two terminal windows).  The models should communicate with
one another whenever they have data to send, and block whenever they are waiting
for the other model to provide data they are expecting.

The advantage of this method is that it can be set up with relatively little
modification to either model's software.  The disadvantage is that one must
manage the communication between the models carefully to avoid deadlock, a
situation in which both processes are simultaneously stopped waiting for input
from the other process.

### Build your model as a library and have GCAM call it

To use this option you will take the object files produced by compiling your
model, and collect them into a library.  Building libraries works a differently
depending on what operating system you are using.  On unix-like operating
systems, including OS X, you can create them using the `ar` command.  When you
build this library, make sure you leave out the `main()` function from your
program.  You will be using GCAM's `main()`, and trying to build a program with
two `main`s will cause an error.

Once you have your library you will add that to the list of libraries that GCAM
links to.  Once you have done this, any functions in your model will be callable
from GCAM.  You will probably have two types of functions you will want to call:
functions to initialize your model and functions to run your model components.
Initialization functions can be called from GCAM's `main`.  Functions to run
your model's components should be called from the methods of GCAM feedback
objects, either `calcFeedbacksBeforePeriod` or `calcFeedbacksAfterPeriod`, as
appropriate.  When these callbacks run they will have access to the data
returned by filters and can provide them to your model.  Similarly, data
returned by your model can be set into objects returned by the filter step.
Once you have written the necessary feedback objects you can recompile GCAM, and
the linked models should be ready to run.

The advantage of this method is that if your model already supports accepting
data from other models, you will be able to use it with little or no
modification.  Your model will not need any particular knowledge of GCAM's
internal structure and might even be indifferent to whether it is getting data
from GCAM or from some other source.  The disadvantage of this method is that it
requires you to make some changes to GCAM, particularly where initializing your
model is concerend.  

This is the method used to implement the one-way coupling between GCAM and
Hector, so looking at that model may provide some guidance on how to proceed.
However, one difference between Hector and other models is that Hector predates
the GCAM Fusion interface.  Therefore, instead of being called from a filter
object, Hector is called from a hook built into GCAM specifically for that
purpose.  Future model coupling will take place through GCAM Fusion, eliminating
the need for custom hooks.

### Have your model call GCAM functions provided in libgcam.

This option is the inverse of the previous one.  Instead of building your model
as a library, you link your model to the `libgcam.a` library created when GCAM
is built.  All of GCAM's functions will be available to be called from your
model.  You will need to call GCAM initialization functions to set up the model
structure.  After that, the `Scenario::run()` method will allow you to run
individual time periods in the scenario.  You can call `Scenario::run()` at any
point in your model where it makes sense to do so; you can even run a period
multiple times with different feedbacks from your model in each evaluation, if
doing so is useful in the problem you are trying to solve.

Using this method, you will not need to create a feedback object.  Instead, you
can create a [handler](#handler) object and use it to call the GCAM Fusion
interface directly from anywhere in your code.  You can create multiple handlers
and multiple filters and use them as required to get or set data from GCAM.

This method gives you a lot more control over how and when GCAM runs than other
methods.  It is also the best method for coupling to models that have very
complex setup procedures, since it avoids having to replicate the setup within
GCAM.  The main disadvantage to this method is that it requires a lot of
GCAM-specific modifications to your model.  These modifications will have to be
disabled to use your model in stand-alone mode or to couple to another model.



Intended Use of GCAM Fusion
---------------------------

Note that GCAM Fusion gives the users full access to all the internal parameters
of GCAM for better or for worse.  Just because you are able to change these
values doesn't mean GCAM will be able to operate normally when doing so. 
Therefore we only reccommend using GCAM Fusion inside of the `IModelFeedback`
methods.  Making feedbacks during the solution of a model period would require
additional dependencies and linkages to ensure proper solution and GCAM Fusion
would entirely circumvent those procedures. 
As a rule of thumb adjusting the same model perameters which are parsed in GCAM
XML input files should be fine to modify.  It should **not** be used to
curcimvent normal object orientened principals or designs.  Object encapsulation
allows us to ensure some level of consistency. 

To be clear there are no sofware limitation imposed on the use of GCAM Fusion
however code proposed for inclusion into the Core GCAM model may be rejected due
to improper / abuse of the capabilities as it will hinder the long term
maintainability of the model.


