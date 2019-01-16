# Understanding GCAM XML

As described in the [overview](overview.hmtl), GCAM reads model structure and data from files written in [XML](https://en.wikipedia.org/wiki/XML), a hierarchical file format that is easy to parse and search. For working with XML files, it is convenient to use an XML editor that can expand and 
collapse portions of the hierarchy.

The XML inputs to GCAM v5.1.2 provides over 34 million lines of XML. The GCAM data system creates 217 files -- not all of which are used at the same time -- which must be assembled into a single hierarchy.

## XML files are combined into a single XML tree

GCAM's data files begin with:

```XML
<scenario>
  <world>
```

and end with the corresponding closing tags:

```XML
  </world>
</scenario>
```
The `scenario` node is the root of the hierarchy. As XML files are read in, in the order specified in the `configuration.xml` file, their contents are merged into this hierarchy. For example, if one file has this:

```XML
<scenario>
  <world>
    <region name="USA">
      <x>1</x>
      <y>42</y>
    </region>
  </world>
</scenario>
```

And a second file has this:

```XML
<scenario>
  <world>
    <region name="Mexico">
      <x>2</x>
      <y>3</y>
    </region>
    <region name="USA">
      <x>10</x>
    </region>
  </world>
</scenario>
```

The merged result would be:

```XML
<scenario>
  <world>
    <region name="USA">
      <x>10</x>
      <y>42</y>
    </region>
    <region name="Mexico">
      <x>2</x>
      <y>3</y>
    </region>
  </world>
</scenario>
```

The rules for combining XML data are these:

1. If the element being read in includes the attribute `delete="1"`, any corresponding node in the document is deleted before the new node is added. That is, the `delete` attribute overrides the merging of content that would otherwise occur.

2. If the element being read in includes the attribute `nocreate="1"`, the element will be merged into the document only if a corresponding node already exists in the document. Otherwise, the new element will be discarded.

3. If the document has a container element with the same "path" (i.e., sequence of container elements from the root of the hierarchy) as the element being read in, the new element's contents are merged (recursively) with those already in the document. If no corresponding element previously existed in the document, the new element is added at the appropriate location.


## Global Technology Database 

To reduce redundancy, most technologies are defined in an element in the XML files called the `global-technology-database`, which we'll abbreviate here as GTDB. This provides common information about technologies, and of which can be overwritten in individual regions. Regional references to technologies in the GTDB are specified using the `stub-technology` element.

The `global-technology-database` element occurs in 54 files in GCAM v5.1.2. As the XML files are read in, these elements are merged according to the rules above. After all of the XML files have been 
read, all stub-technology nodes are replaced by copying the corresponding technology definition from the GTDB, and then merging any regionally-defined information for that technology, creating a region-specific version of the generic technology.

## Pass-through sectors and technologies

GCAM provides two levels of nesting: subsector and technology. Occasionally, additional levels of competition are needed to achieve the desired behavior. For example, (starting with GCAM v5) most electricity production technologies are further differentiated by cooling technology. To allow these additional levels of competition, GCAM allows “pass-through” sectors that provide additional levels of subsector/technology competition; the original “main” sector is represented with a technology that consumes the “pass-through” with a coefficient of 1 (perfect efficiency) and no additional costs. Pass through sectors must have only this one input.

### Pass-through Example

- An example and figure would be nice here