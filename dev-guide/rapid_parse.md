---
layout: index
title: Developers guide for XML Parse via RapidXML
gcam-version: v5.4 
devguide: dev-guide.html
---

# Table of Contents

- [Background](#background)
  - [Performance Analysis](#is-switching-xml-parse-method--libraries-even-worth-it)
  - [How RapidXML Works](#rapid-xml-parser)
- [Converting GCAM’s XMLParse](#converting-gcams-xmlparse)
  - [XML Parse and Fusion Data Definitions](#gcam-fusion-data-declerations-and-their-relationship-to-xml-parse)
  - [Overview of how XML Parse generation works](#xml-parse-call-structure)
    - [Parsing the child data of a container (ParseChildData)](#parsechilddataprocessdatavector)
    - [When custom parsing behavior is required (AParsable)](#example-of-aparsable-special-case)
    - [Checking if an XML tag matches some Data (XMLParseHelper::tagsMatch)](#xmlparsehelpertagsmatch)
    - [Parsing SIMPLE / ARRAY / Container Data (XMLParseHelper::parseData)](#xmlparsehelperparsedata)
- [Debugging XML Parse](#debugging-xml-parse)
- [Common errors for developers](#common-issues-and-errors-to-consider-for-developers)
  - [When to tag Data `NOT_PARSABLE`](#tagging-data-as-not_parsable)
  - [Unresolved symbol error during linking](#unresolved-symbol-error-during-linking)
  - [The generic Factory and no argument constructors](#the-generic-factory-and-no-argument-constructors)

## Background
We have been using the Xerces C++ XML parser to parse the XML inputs for GCAM for as long as I recall.  It is widely considered stable, mature, and the most complete XML parsing library for C++.  Providing for and adhering to all of the W3C XML standards, most of which we do not actually take advantage of in GCAM.

GCAM uses the DOM or "Document Object Model" method of parsing XML which translates the XML tags and attributes to corresponding C++ structures which can be examined, modified, or traversed in any way a user sees fit.  Xerces / the W3C standard also provides the alternative SAX, or Streaming API for XML, where the idea is the parser will notify you when it reads the next element, attribute, close element, etc and you handle these tags as they come up.  Such a method _seemed_ like a much better approach for what GCAM needed (more on that in a bit).

To actually translate the DOM XML into GCAM structures each GCAM "CONTAINER" implements the `IParsable` interface which is basically just the `XMLParse` method that takes a DOM node which represents that class.  For instance the `Resource` object will get the `<resource name="coal">` element.  That class will then check the node attributes and loop over the child nodes to parse it's member variables.  Overall the structure of the `XMLParse` methods is pretty straightforward `if(nodeName == "price")` then set `mPrice` to those values.  We have a number of utility methods in `XMLHelper` to deal with parsing a "CONTAINER" or "ARRAY" with certain built in _features_ such as `nocreate` or `fillout`.  Although this code is relatively straightforward it is scattered through out GCAM in hundreds of classes, thus a road block to switching XML parse methods or libraries.

### Is switching XML parse method / libraries even worth it?
To answer this question I set up some simple standalone experiment: use the XML library to "inspect" every single XML element and attribute and just run that over the largest XML file we currently handle `all_aglu_emissions_IRR_MGMT.xml` which currently is just over 300 MB in size.  I decided to test the current Xerces DOM parsing, and compare it to SAX which I _thought_ would be significantly faster.  In the Table below you can see that was not the case.  At this point I decided to search for alternatives which may be out there and found this really good [Stack Overflow discussion of C++ XML Parsers](https://stackoverflow.com/questions/9387610/what-xml-parser-should-i-use-in-c) which points out if you are looking for blazing speed and are willing to compromise on features `rapidxml` is your library.

| test |  time    | memory |
| ---- |  ----    | ------ |
| Xerces/DOM  | 10s   | 2.5 GB |
| Xerces/SAX  | 11s   | 1   MB |
| Rapid (DOM) | 3s    | 900 MB |


From these test we can see actually the different Xerces parsers run in a very similar time.  There is an incredible difference in memory usage however which seems to be where SAX parsing's real advantage lies.  Rapid XML indeed is much faster and an in between in terms of memory usage. Although at this point we are not concerned with memory usage as GCAM's actual memory use high will far eclipse the usage during XML Parse.  So let's take a closer look at Rapid XML to understand why it is so fast and are it's trade off ones we can live with.

### Rapid XML Parser
Rapid XML is a header only (the entire library is contained in a single header file) library which takes a minimalist approach to parsing XML.  It can *only* "parse" XML `string` data which already exist in memory.  It's API mimics that of the DOM API, it allows users to inspect and traverse elements as they please, however it does not adhere to the W3C standard and doesn't support advanced features such as namespaces.  With the exception of requiring the XML to already reside in memory, none of this is a deal breaker for use in GCAM.

To understand why the XML needs to be in memory as a string, let take a look at what Rapid XML is actually doing.
```
<some name="attr value"><xml>to parse</xml></some>
 |  | |     |            |   |      |            |
 a  b c     d            e   f      g            h
```

Rapid XML doesn't actually parse or create copies of the XML you ask it to parse.  Instead it scans on command to find the data you asked for.  So if you ask for the root element it simply finds `a` and returns a pointer to it.  If you wanted to know what the node name of the root element was, if you are not careful you get everything from `a` to `h`.  Instead you have to ask rapidxml to calculate to size of the node name in which case it finds `b`.  Then you as the user must copy out from `a` to `b` to get out the string `"some"`.  Similarly if you ask it to find the first attribute it returns a pointer to `c`, to get the attribute value it scans until it finds `d`.  The first child node it scans until it finds `e`.  And to the the value of `"xml"`, similar to node names, you have to ask it to find `f` and compute the size to find `g` and copy that out.

From this perspective it is easy to see why Rapid XML needs the XML as a single string in memory.  But of course GCAM's XML comes from files on disk.  The naive approach would be to just use an input stream to read in the file into one big string in memory.  However, reading data from a file using any of the standard methods is done using "buffering".  In other-words we read N bytes of data into temporary storage then have to copy it out into where we ultimately want it (and you had better calculate the total size of the document ahead of time unless you want even more copying).  This sort of thing comes up all the time and there is a better approach using [memory mapped files](https://en.wikipedia.org/wiki/Memory-mapped_file).  Which is a low level optimization implemented in all modern operating systems where the entire file gets "read" / cached into memory and you can get direct access to that chunk of memory.  Exactly how to do this varies between operating systems, which is probably why Rapid XML didn't just include the ability directly in their library.  However to work around this platform issue, as we typically do, we can rely on the Boost C++ library to abstract away the platform specific details.

It seems Xerces DOM parsing isn't that bad in terms of parsing performance, however all of these low level optimizations in Rapid XML add up to a significant performance boost.

## Converting GCAM's XMLParse
Reading and inspecting an XML file is all well and good but completely side steps the biggest road block: having to convert thousands of lines of code for parsing XML from Xerces to Rapid XML.  Luckily when designing GCAM Fusion we were forward thinking and put in place a number of things that would let us have the C++ compiler *generate* the vast majority of the XML Parse code for us.  Given templates and template meta programming can be quite confusing to even experienced C++ programmers I figure it would be good to detail exactly how this works here.

### GCAM Fusion Data declarations and their relationship to XML Parse
The basic premise of [GCAM Fusion](examples.html#gcam-fusion-related-documentation) is if we define our classes and member variables in some very [particular way](examples.html#writing-new-gcam-components):
```
DEFINE_DATA(
    /*! \brief Scenario is the only member of this container hierarchy. */
    DEFINE_SUBCLASS_FAMILY( Scenario ),
            
    /*! \brief The Scenario name. */
    DEFINE_VARIABLE( SIMPLE, "name", mName, std::string ),

    /*! \brief The modeltime for the scenario. */
    DEFINE_VARIABLE( SIMPLE | NOT_PARSABLE, "modeltime", mModeltime, const Modeltime* ),

    /*! \brief The goods and services marketplace. */
    DEFINE_VARIABLE( CONTAINER | NOT_PARSABLE, "marketplace", mMarketplace, Marketplace* ),
            
    /*! \brief The goods and services marketplace. */
    DEFINE_VARIABLE( CONTAINER, "world", mWorld, World* ),
            
    /*! \brief A vector booleans, one per period, which denotes whether each period is valid. */
    DEFINE_VARIABLE( SIMPLE | NOT_PARSABLE, "is-valid-period", mIsValidPeriod, std::vector<bool> ),
            
    /*! \brief Unsolved periods. */
    DEFINE_VARIABLE( ARRAY | NOT_PARSABLE, "unsolved-periods", mUnsolvedPeriods, std::vector<int> ),
            
    /*! \brief A pass through object used to parse SolutionInfo parameters
     *         until markets are created.
     */
    DEFINE_VARIABLE( CONTAINER, "solution-info-param-parser", mSolutionInfoParamParser, SolutionInfoParamParser* )
)
```

Then we can have utilities that can process and traverse these Data in a automated and generic way.  All of the member variables are tied together in `DEFINE_DATA` such that we can loop over them all.  The `DEFINE_SUBCLASS_FAMILY` and `DEFINE_DATA_WITH_PARENT` allows us to deal with inheritance and know all of the subclasses that are related to each other.  The `DEFINE_VARIABLE` statements tie a number of useful tid-bits of information together including the C++ data type, the C++ variable name, the "human readable name" (which we _happened_ to choose based off the XML parse names), as well as arbitrary flags we can associate. You may have noticed the `NOT_PARSABLE` flag which wasn't actually defined in the original GCAM Fusion but we add in now, and will describe more in a bit.

### XML Parse Call Structure
To describe the new process let's start from a high level with the function call structure then describe in more detail how each of those steps work.

* `XMLParseHelper::parseXML`: This is the top level where we give it the XML file to parse and a pointer to the "root" container, i.e. `Scenario*`, which serves as a context for parsing that XML file.  The XML file gets read and parsed as described above.  The given container gets wrapped in a `Data` class which is the light weight wrapper GCAM Fusion uses to tie together all of the pieces of information in the `DEFINE_VARIABLE` statements.  To begin recursively processing the XML we use the `ParseChildData` helper class:
* `ParseChildData`: Because GCAM Fusion has to [dynamically come up with the "Data Vector"](examples.html#expanddatavector) (a `boost::fusion::vector` of *all* of the Data member variable declarations) depending on the actual subclass instantiated at run time (i.e. `SupplySector` or `AgProductionSector`) we have to have a templated "call back" that can accept any combination of Data vectors.  `ParseChildData` declares the call back function:
* `ParseChildData::processDataVector`: This is where we loop over the Data vector and attempt to match up the child XML tags.  For each XML tag, if the current parsing CONTAINER is a subclass of `AParsable` we ask it to perform any custom parsing behavior; if the XML was not parsed by custom behavior we check `XMLParseHelper::tagsMatch` to see if the current child Data matches the current XML node; if they do match we use `XMLParseHelper::parseData` to convert the XML into the data structure wrapped in the current Data; finally if no Data matched we issue an "Unrecognized XML" warning and move on to the next.  See [below](#parsechilddataprocessdatavector) for more details on how this works.
* `AParsable::XMLParse`: Similar to the old `IParsable::XMLParse` GCAM CONTAINER classes could derive and implement `XMLParse` and can then be responsible for defining some custom behavior to parse some XML elements.  Classes that implement this method will get called with a *reference* to the child XML nodes.  If the subclass is able to parse that node they should return true, otherwise default parsing behavior will be attempted to parse that XML node.  Because classes will get access to the XML Node by reference they could, for instance, skip ahead and parse multiple child nodes at a time to avoid having them parsed by default behavior as well.  See [below](#example-of-aparsable-special-case) for more details on how this works.
* `XMLParseHelper::tagsMatch`: Check if the current Data should be responsible for holding the "value" of the current XML node.  This method needs to handle the case for SIMPLE data where we just check if the data name and XML node name match but also CONTAINER data where we might need a Factory to determine if any subclass matches XML names.  See [below](#xmlparsehelpertagsmatch) for more details on how this works.
* `XMLParseHelper::parseData`: If the tags match then this templated method will be used to convert the XML into the C++ data structure with the Data object wraps.  Here we obviously need different behavior different Data flags such as SIPMLE, ARRAY, or CONTAINER and support the various "processing flags" such as `fillout`, `delete`, and `nocreate`.  Finally it may recursively restart this function call chain starting at `ParseChildData` to handle child elements of CONTAINER Data.  See [below](#xmlparsehelperparsedata) for more details on how this works.

#### ParseChildData::processDataVector
This method essentially replaces the `if / else` manual tag matching of the old XMLParse methods.  It uses the DataVector concept from GCAM Fusion to loop over Data member variable declarations and check if `tagsMatch` and `parseData` if they do.  Given the various C++ data types it must deal with and the dynamic nature of the declarations it is heavily reliant on templates and template meta-programming (albeit at a high level):
```
/*!
 * \brief The call back from GCAM Fusion which has now expanded the full data vector for this CONTAINER subclass.
 * \details We can now loop over this Data vector and attempt to match up the child nodes of the current element to the
 *          Data member variables of the current container.  If the tags match up we will call parseData on it thus recursively
 *          processing the XML data.
 * \tparam DataVectorType The type of the full data vector which is dynamic in terms of compile time and runtime depending
 *                       on not just the fact that we are parsing a Resource object but also the fact that it could be a
 *                       RenewableResource etc.
 * \param aDataVector The boost fusion vector of Data which we can loop over to attempt to match up XML tags to Data names.
 */
template<typename DataVectorType>
void ParseChildData::processDataVector( DataVectorType aDataVector ) {
    using namespace std;
    // first attempt to parse any member variables that are set via attribute such as name
    // or year
    for(auto attr : mAttrs) {
        if(attr.first != "fillout" &&
           attr.first != "delete" &&
           attr.first != "nocreate")
        {
            // we optimize compile time / runtime here by limiting our search in the Data vector
            // to just those flagged as SIMPLE (but not also flagged as NOT_PARSABLE of course)
            boost::fusion::for_each(boost::fusion::filter_if<boost::mpl::lambda<IsSimpleAndParsable<boost::mpl::_1> >::type>(aDataVector), [attr] (auto aData) {
                if(aData.mDataName == attr.first) {
                    /*! \pre Attributes only map to SIMPLE data types. */
                    assert(aData.hasDataFlag(SIMPLE));
                    aData.mData = boost::lexical_cast<typename decltype(aData)::value_type>(attr.second);
                }
            });
        }
    }
    
    // loop over child nodes and attempt to match them to any elements in the Data vector
    for(rapidxml::xml_node<char>* child = mParentNode->first_node(); child; child = child->next_sibling()) {
        // skip whitespace for instance
        if(child->type() == rapidxml::node_element) {
            // If the current container is a subclass of AParsable the mContainer will have been
            // set and we should first ask it to attempt to parse this node.  If it returns true
            // that indicates it did in fact handle the data so we should skip any further action
            // on this node.
            bool found = mContainer ? mContainer->XMLParse(child) : false;
            // child could have changed and even moved to the end by XMLParse so double check
            if(child && !found) {
                string childNodeName(child->name(), child->name_size());
                // loop over the Data vector
                boost::fusion::for_each(aDataVector, [child, childNodeName, &found] (auto& aData) {
                    // check if the tags match (and we have not already found a match)
                    if(!found && XMLParseHelper::tagsMatch(childNodeName, aData)) {
                        // we have a match, now actually parse the XML into a C++ object
                        XMLParseHelper::parseData(child, aData);
                        found = true;
                    }
                });
                if(!found) {
                    // ideally we would send this to a logger however this method may
                    // be called before the loggers have been initialized
                    cout << "Unknown tag: " << childNodeName << " encountered while processing "
                         << string(mParentNode->name(), mParentNode->name_size()) << endl;
                }
            }
        }
    }
}
```

#### Example of AParsable special case
As noted, GCAM classes can perform custom parsing behavior, overriding the generic parsing logic by implementing `AParsable::XMLParse`:
```
#include "util/base/include/aparsable.h"
...

class AEmissionsControl: public INamed, public AParsable {
```

Then, in the subclasses that need custom parsing they should implement `XMLParse`:
```
class MACControl: public AEmissionsControl {
...

    bool XMLParse( rapidxml::xml_node<char>* & aNode );
```

The following is an example, note: `mMacCurve` and `mNoZeroCostReductions` should be flagged `NOT_PARSABLE` in the header as well:
```
bool MACControl::XMLParse(rapidxml::xml_node<char>* & aNode) {
    string nodeName = XMLParseHelper::getNodeName(aNode);
    if ( nodeName == "mac-reduction" ){
        map<string, string> attrs = XMLParseHelper::getAllAttrs(aNode);
        double taxVal = XMLParseHelper::getValue<double>(attrs["tax"]);
        double reductionVal = XMLParseHelper::getValue<double>( aNode );
        XYDataPoint* currPoint = new XYDataPoint( taxVal, reductionVal );
        mMacCurve->getPointSet()->addPoint( currPoint );
        return true;
    }
    else if ( nodeName == "no-zero-cost-reductions" ){
        mNoZeroCostReductions = true;
        return true;
    }
    else if ( nodeName == "tech-change" ){
        Data<objects::PeriodVector<double>, ARRAY> techChangeData(*mTechChange, "");
        XMLParseHelper::parseData(aNode, techChangeData);
        return true;
    }
    else {
        return false;
    }
}
```

#### XMLParseHelper::tagsMatch
When looping each XML element we need to figure out which Data member variable that element matches up with (if any).  For SIMPLE and ARRAY type Data members it is straightforward, just check if the data name matches the node name of the current XML.
```
// Specialization for non-containers
template<typename DataType>
typename boost::disable_if<
    boost::mpl::or_<
        typename CheckDataFlagHelper<DataType>::is_container,
        typename CheckDataFlagHelper<DataType>::is_not_parsable
    >,
bool>::type tagsMatchI(const std::string& aXMLTag, const DataType& aData) {
    // SIMPLE and ARRAY Data are straightforward, just check if the data name matches
    // the tag
    return aXMLTag == aData.mDataName;
}
```

For CONTAINER type such as `Sector*` it is a bit more complicated.  For these we do not check the data name but instead need to check the getXMLNameStatic() for each of the valid subtypes, such as `SupplySector*` or `AgProductionSector*`, etc.  We have numerous factory classes which take care of this sort of thing.  As mentioned earlier given the way we do our GCAM Fusion declarations it knows the inheritance relationships and as such when we first created GCAM Fusion we had developed a generic [Factory](examples.html#factory).  Which can then be used in specializations of `tagsMatch` for CONTAINER Data.  And of course obviates the need for the hand written factory classes we used to have.
```
// Specialization for a containers
template<typename DataType>
typename boost::enable_if<
    boost::mpl::and_<
        typename CheckDataFlagHelper<DataType>::is_container,
        boost::mpl::not_<typename CheckDataFlagHelper<DataType>::is_not_parsable>
    >,
bool>::type tagsMatchI(const std::string& aXMLTag, const DataType& aData) {
    // For CONTAINER Data we do not check the Data name but instead need to check
    // the getXMLNameStatic of all the possible subclasses of this type and see
    // if any of them match. We can use our generic Factory to do the heavy lifting.
    using FactoryType = typename GetActualContainerType<DataType>::FactoryType;
    return FactoryType::canCreateType( aXMLTag );
}
```

#### XMLParseHelper::parseData
Naturally, parsing the Data is a bit more complicated than merely checking if the XML tags match up to some Data.  Not only do we have to figure out how to translate XML into a C++ data structure but we must also support "processing instructions" such as `fillout`, `delete`, or `nocreate` for each of the different ways we store data such as single value, `std::vector`, `objects::PeriodVector`, or `std::map`, etc.  To describe how these work let's organize the specializations by: `SIMPLE`, `ARRAY`, and `CONTAINER`.  These methods essential replace the old `XMLHelper::getValue` / `XMLHelper::insertValueIntoVector` / `XMLHelper::parseContainerNode`.

##### XMLParseHelper::parseData / SIMPLE
For SIMPLE data the only thing to do is coerce the string value into the requested C++ type.  And to do that we use `boost::lexical_cast` the same as before.
```
// Specializations for non-containers i.e. actual data that is a single value
template<typename DataType>
typename boost::enable_if<
    boost::mpl::and_<
        boost::mpl::not_<typename CheckDataFlagHelper<DataType>::is_not_parsable>,
        typename CheckDataFlagHelper<DataType>::is_simple
    >,
void>::type parseDataI(const rapidxml::xml_node<char>* aNode, DataType& aData) {
    // for SIMPLE data the only thing to do is coerce the string value into the requested
    // C++ type
    std::string nodeValueStr(aNode->value(), aNode->value_size());
    auto nodeValue = boost::lexical_cast<typename DataType::value_type>(nodeValueStr);
    aData.mData = nodeValue;
}
```

##### XMLParseHelper::parseData / ARRAY
For ARRAY Data we need to convert the `year` attribute into the appropriate index into the given array of data and convert the string value from the XML to the `value_type` of the vector, again using `boost::lexical_cast`.  If the `fillout` attribute flag is set we copy the value to all positions until the end of the array.  However, we are being generic about the type of vector we have here so we can't just convert year to period.  Instead we use the GCAM Fusion utility `GetIndexAsYear::convertIterToYear` to convert between iterators and years and naively loop over the entire vector checking if we have hit the right year yet.
```
// Specializations for arrays of non-containers i.e. actual data but not TechVintageVector
template<typename DataType>
typename boost::enable_if<
    boost::mpl::and_<
        boost::mpl::not_<typename CheckDataFlagHelper<DataType>::is_not_parsable>,
        typename CheckDataFlagHelper<DataType>::is_array,
        boost::mpl::not_<typename std::is_same<typename DataType::value_type, objects::TechVintageVector<typename DataType::value_type::value_type> >::type>
    >,
void>::type parseDataI(const rapidxml::xml_node<char>* aNode, DataType& aData) {
    using namespace std;
    string nodeValueStr(aNode->value(), aNode->value_size());
    auto nodeValue = boost::lexical_cast<typename DataType::value_type::value_type>(nodeValueStr);
    // find the year attribute (make sure it is valid) and see if we need to fillout
    map<string, string> attrs = XMLParseHelper::getAllAttrs(aNode);
    auto yearIter = attrs.find( "year" );
    bool filloutFlagSet = XMLParseHelper::isAttrFlagSet( attrs, "fillout" );
    if( yearIter == attrs.end() ) {
        ILogger& mainLog = ILogger::getLogger( "main_log" );
        mainLog.setLevel( ILogger::ERROR );
        mainLog << "Could not find year attribute to set simple array data" << endl;
    }
    else {
        // We are being generic about the type of vector we have here so we can't just
        // convert year to period.  We rely on GetIndexAsYear::convertIterToYear to
        // convert between iterators and years and naively loop over the entire vector
        // checking if we have hit the right year yet.
        const int currAttrYear = boost::lexical_cast<int>( (*yearIter).second );
        bool done = false;
        bool doFillout = false;
        for( auto iter = aData.mData.begin(); iter != aData.mData.end() && !done; ++iter ) {
            const int year = GetIndexAsYear::convertIterToYear( aData.mData, iter );
            if( currAttrYear == year || doFillout ) {
                (*iter) = nodeValue;
                doFillout = filloutFlagSet;
                done = !doFillout;
            }
        }
    }
}
```


##### XMLParseHelper::parseData / CONTAINER
For CONTAINER Data we need to first determine if an instance of the class already exists and if not create a new one.  To tell if an instance already exists we need to search the array of CONTAINERs and check the `getName()` / `getYear()` and see if the XML attribute "name" / "year" matches any existing instances.  Of course all of this is generic.  So to determine if to search on name or year we can utilize the GCAM Fusion utility `NamedFilter` / `YearFilter`.  And again we need to naively loop over the entire array of CONTAINERs to see if we have a match.

If a match was found we first handle the `delete` attribute flag: delete and remove the instance and ignore the rest of the XML.

If no match was found, we first need to handle check if the `nocreate` or `delete` flag was set in which case we issue a warning and ignore the rest of the XML.  If not we need to create a new instance and insert it into the array of data.  To create the new instance we should use a Factory method to ensure we create the appropriate subclass.  And we can use the [generic Factory](examples.html#factory) utility which will loop over subclass declared in the the `DEFINE_SUBCLASS_FAMILY` GCAM Fusion declaration and check if the `getXMLNameStatic()` matches the current XML node name.

Finally we recursively process the child XML using `ParseChildData` helper class to kick off the chain of function calls all over again.  Using the current CONTAINER as the new parsing context and the child XML nodes of the current XML node.
```
// Specialization for a vector (or any iterable array that is not a map) container
template<typename DataType>
typename boost::enable_if<
    boost::mpl::and_<
        boost::mpl::not_<typename CheckDataFlagHelper<DataType>::is_not_parsable>,
        typename CheckDataFlagHelper<DataType>::is_container,
        boost::mpl::and_<has_iterator<typename DataType::value_type>, boost::mpl::not_<has_key_type<typename DataType::value_type> > >
    >,
void>::type parseDataI(const rapidxml::xml_node<char>* aNode, DataType& aData) {
    using namespace std;
    using data_type = typename GetActualContainerType<DataType>::data_type;
    using value_type = typename GetActualContainerType<DataType>::value_type;
    using FactoryType = typename GetActualContainerType<DataType>::FactoryType;
    
    string nodeName(aNode->name(), aNode->name_size());
    map<string, string> attrs = XMLParseHelper::getAllAttrs(aNode);
    bool deleteFlagSet = XMLParseHelper::isAttrFlagSet( attrs, "delete" );
    bool noCreateFlagSet = XMLParseHelper::isAttrFlagSet( attrs, "nocreate" );
    
    // We need to try to find in the array if the container exists
    auto dataIter = aData.mData.end();
    bool found = false;
    for( auto currIter = aData.mData.begin(); currIter != aData.mData.end() && !found; ++currIter ) {
        if( GetFilterForContainer<data_type>::filter_type::matchesXMLAttr( *currIter, attrs ) ) {
            found = true;
            dataIter = currIter;
        }
    }
    value_type currContainer = found ? *dataIter : 0;
    if( !found ) {
        // The instance of the container has not yet been set yet.
        if( deleteFlagSet ) {
            // log delete set but container not found
            ILogger& mainLog = ILogger::getLogger( "main_log" );
            mainLog.setLevel( ILogger::ERROR );
            mainLog << "Could not delete node " << nodeName << " as it does not exist." << std::endl;
            return;
        } else if( noCreateFlagSet ) {
            // log nocreate
            ILogger& mainLog = ILogger::getLogger( "main_log" );
            mainLog.setLevel( ILogger::NOTICE );
            mainLog << "Did not create node " << nodeName << " as the nocreate input flag was set." << std::endl;
            return;
        }
        else {
            // No previous container so add a new one.
            
            // Some error checking to make sure the type of class that was created is
            // actually a subclass of the type aData was declared as.  For instance
            // LandAllocator has a base class ALandAllocatorItem however in
            // RegionMiniCAM::mLandAllocator we want to ensure only the type LandAllocator
            // is created and not for instance a LandLeaf.
            typename FactoryType::FamilyBasePtr temp = FactoryType::createType( nodeName );
            currContainer = dynamic_cast<value_type>( temp );
            if( temp && !currContainer ) {
                // log temp->getXMLName() is not a subclass of typename DataType::value_type::getXMLNameStatic()
                ILogger& mainLog = ILogger::getLogger( "main_log" );
                mainLog.setLevel( ILogger::ERROR );
                mainLog << "Attempted to set incompatible type " << nodeName << " as " << typeid(typename DataType::value_type).name() << std::endl;
                abort();
            }
            aData.mData.push_back( currContainer );
        }
    }
    else {
        // There is already an instance set
        if( deleteFlagSet ) {
            // when we get a delete flag we simply delete and ignore the rest.
            ILogger& mainLog = ILogger::getLogger( "main_log" );
            mainLog.setLevel( ILogger::DEBUG );
            mainLog << "Deleting node: " << nodeName << std::endl;
            delete currContainer;
            currContainer = 0;
            aData.mData.erase( dataIter );
            return;
        }
        else {
            // else we can just use this instance
            // TODO: we should check to make sure the XML names are the same but we would currently fail this check often
        }
    }
    
    // parse child nodes
    ParseChildData parseChildHelper(aNode, attrs);
    parseChildHelper.setContainer(currContainer);
    ExpandDataVector<typename data_type::SubClassFamilyVector> getDataVector;
    currContainer->doDataExpansion( getDataVector );
    getDataVector.getFullDataVector(parseChildHelper);
}
```


### Debugging XML Parse
When users are developing new code, say they added some variable but for some reason it doesn't seem like it is getting parsed.  In the old approach it is really easy to add some "print" statements in the XMLParse method and see if we get the expected message when the code is run.

In the new way (in the generic case, i.e. no special case XMLParse was defined) it isn't so straightforward.  You could add print statements in XMLParseHelper.  But that code is being used to generate XML Parse for all classes so it would be like added print statements in all XMLParse methods which clearly isn't so useful.

To aid with this issue we include a feature to allow users to easily target specific GCAM classes for XML Parse debugging.  To enable this a user can edit `util/base/source/xml_parse_helper.cpp`, close to the top of the source file they will find `XMLPARSE_DEBUG_CONTAINERS` (empty by default to avoid the extra compile time / run time burden to enable the debugging):

```
// A tuple of GCAM Containers for which we want to debug the XML parsing
// such as `(World, ReserveSubResource)`.  Users can choose any class even
// if it is not the base class and they will need to add a `debugXMLParse`
// method to these classes (they do not need to add it to the base class
// however).  If no value is set here we avoid compiling the extra machinery
// required to support calling debugXMLParse.
#define XMLPARSE_DEBUG_CONTAINERS (ReserveSubResource)
```

In this example we will enable debugging for the `ReserveSubResource` and the next thing we need to do is create the debugging call back function `debugXMLParse`.  Note, you only need to add this method to class of interest (no need to update the base class as is the case with `AParsable::XMLParse`):
```
// you will likely need to include XMParseHelper to get the `xml_node` include
#include "util/base/include/xml_parse_helper.h"

...

class ReserveSubResource: public SubResource
{
public:
    ...

    bool debugXMLParse(const rapidxml::xml_node<char>* aNode);
};

```

The user will then get full access to the XML (i.e. `<reserve-subresource name="natrual gas">`) for `ReserveSubResource` when it is found.  They can traverse / inspect / parse the XML as they please.  Finally they should return `true` if they want to disable the generic XML Parse behavior or `false` if they want it to continue to attempt to parse the data as normal.
```
bool ReserveSubResource::debugXMLParse(const rapidxml::xml_node<char>* aNode) {
    // grab the region name from the XML so we can limit messages
    string currRegion = XMLParseHelper::getAllAttrs(aNode->parent()->parent())["name"];
    if(currRegion == "USA") {
        ILogger& mainLog = ILogger::getLogger( "main_log" );
        mainLog.setLevel( ILogger::NOTICE );
        // just dump all the tags
        string nodeName = XMLParseHelper::getNodeName(aNode);
        map<string, string> attrs = XMLParseHelper::getAllAttrs(aNode);
        mainLog << "In " << nodeName << " ";
        for(auto attr : attrs) {
            mainLog << attr.first << " = " << attr.second << " ";
        }
        mainLog << endl;
        
        // and all the direct child tags as well
        for(rapidxml::xml_node<char>* child = aNode->first_node(); child; child = child->next_sibling()) {
            // skip whitespace for instance
            if(child->type() == rapidxml::node_element) {
                nodeName = XMLParseHelper::getNodeName(child);
                attrs = XMLParseHelper::getAllAttrs(child);
                string nodeValue = XMLParseHelper::getValue<string>(child);
                mainLog << "Saw: " << nodeName << " ";
                for(auto attr : attrs) {
                    mainLog << attr.first << " = " << attr.second << " ";
                }
                mainLog << "value: " << nodeValue << endl;
                
                if(nodeName == "cal-production") {
                    // we can get it to convert to the C++ type using getValue
                    // for basically any type that has the << operator defined
                    double dblVal = XMLParseHelper::getValue<double>(child);
                    mainLog << "Value as double: " << dblVal << endl;
                }
                else if(nodeName == "techChange") {
                    // we can get it to insert into vector including fillout
                    // but we have to wrap it in the Data wrapper
                    Data<objects::PeriodVector<Value>, ARRAY> techChangeData(mTechChange, "techChange");
                    XMLParseHelper::parseData(child, techChangeData);
                    mainLog << "array content: ";
                    for(int period = 0; period < mTechChange.size(); ++period) {
                        mainLog << mTechChange[period] << ",";
                    }
                    mainLog << endl;
                }
            }
        }
    }
    // in this case we still want generic parsing so we return false to indicate
    // we didn't parse this data
    return false;
}
```

Then when run we can check our `main_log` and see the debugging messages:
```
In reserve-subresource name = natural gas 
Saw: average-production-lifetime value: 30
Saw: price-adder year = 2100 value: 0
Saw: cal-reserve year = 1975 value: 548.537244652028
Saw: cal-reserve year = 1990 value: 0
Saw: cal-reserve year = 2005 value: 526.509163108651
Saw: cal-reserve year = 2010 value: 103.042527916847
Saw: cal-reserve year = 2015 value: 157.05722479823
Saw: resource-reserve-technology name = natural gas value: 
                        
Saw: techChange fillout = 1 year = 1975 value: 0.005
array content: 0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,0.005,
Saw: techChange fillout = 1 year = 2005 value: 0.0075
array content: 0.005,0.005,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,0.0075,
Saw: cal-production year = 1975 value: 18.2845748
Value as double: 18.2846
Saw: cal-production year = 1990 value: 17.3718534
Value as double: 17.3719
```

## Common issues and errors to consider for developers
Given the heavy usage of templates and template meta-programming diagnosing issues can seem daunting.  To help we discuss some common issues that come up and how to resolve them.

The first thing to check is that you haven't missed any of the [GCAM Fusion specific definitions](./examples.html#writing-new-gcam-components) when developing a new GCAM component.

### Tagging Data as `NOT_PARSABLE`
Beyond the obvious use case of tagging Data as `NOT_PARSABLE` simply because a user shouldn't read in the parameter directly, you may want to also do this when you are attempting to set some C++ data type which does not define the "read" operator (`operator<<`).  If parsing this type is fairly straightforward from just the value of the current XML node you can edit `cvs/objects/util/base/source/xml_parse_helper.cpp` and add a specialization for `boost::lexical_cast` such as around line 750:
```
// ensure boost::lexical_cast knows how to parse logger levels
namespace boost {
template<>
inline ILogger::WarningLevel lexical_cast<ILogger::WarningLevel, std::string>(const std::string& aStr) {
    return static_cast<ILogger::WarningLevel>(boost::lexical_cast<int>(aStr));
}
}
```

However if the Data is more complex to parse and requires more information such as attributes you will need to mark the data `NOT_PARSABLE` and implement the custom parsing behavior by subclassing [AParsable](#example-of-aparsable-special-case).

### Unresolved symbol error during linking
This is most common when you are implementing some custom XMLParse routing and still need to use the `XMLParseHelper` utilities to continue parsing of child data from that point.  If you get a linker error such as the following:
```
Undefined symbols for architecture x86_64:
  "void XMLParseHelper::parseData<Data<Solver*, 4> >(boost::property_tree::detail::rapidxml::xml_node<char> const*, Data<Solver*, 4>&)", referenced from:
      Scenario::XMLParse(boost::property_tree::detail::rapidxml::xml_node<char>*&) in scenario.o
```

This was sort of a known limitation / compromise to speed up compile times.  You will need to manually force the compiler to register your `parseData` declaration for the new Data type in `cvs/objects/util/base/source/xml_parse_helper.cpp` at around line 830:
```
// This is kind of a wort.  Any AParsable subclasses which need to kick off recursive
// processing of it's Data will have gotten a "promise" from XMLParseHelper that it would
// define how exactly to do that.  But we do not *actually* generate that code at that time
// because it would have to recursively generate ALL the GCAM CONTAINER objects contained
// below that hierarchy.  So to avoid the unresolved symbol error at the linker stage we
// manually force the generation of those parseData promises below:

template<>
void XMLParseHelper::parseData<Data<ITechnology*, CONTAINER> >(const rapidxml::xml_node<char>* aNode, Data<ITechnology*, CONTAINER>& aData) {
    parseDataI(aNode, aData);
}

template<>
void XMLParseHelper::parseData<Data<std::vector<ITechnologyContainer*>, CONTAINER> >(const rapidxml::xml_node<char>* aNode, Data<std::vector<ITechnologyContainer*>, CONTAINER>& aData) {
    parseDataI(aNode, aData);
}
```

### The generic Factory and no argument constructors
To facilitate creating new GCAM "CONTAINER" classes we utilize the generic [Factory](examples.html#factory) to both check if XML names match as well as to actually create an instance of the object.  However, for the later there is one important caveat: the constructor for the object needs to have no arguments.

If your new GCAM CONTAINER class requires an argument in the constructor you will get a compile time error such as:
```
In file included from /Users/pralitp/model/gcam-core/cvs/objects/util/base/source/xml_parse_helper.cpp:81:
../../util/base/include/factory.h:119:25: error: no matching constructor for initialization of 'typename boost::remove_pointer<decltype(aType)>::type' (aka 'LinearControl')
                    new typename boost::remove_pointer<decltype( aType )>::type : aCurrResult;
```

To work around this you could avoid the argument and instead create a new method to set the values during `completeInit` which was what was done for instance with `Subsector::setNames`.  If won't work, such as if the argument value needs to be used to initialize data structures so they can be parsed, then you will need to subclass [AParsable](#example-of-aparsable-special-case) and implement custom parsing behavior and potentially a custom factory to create your objects.

