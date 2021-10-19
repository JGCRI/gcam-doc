---
layout: index
title: GCAM Policy Examples
gcam-version: v5.3
---

This page includes some examples of input files required to create policies. Note that each example will need to be tailored to your own needs. 

## <a name="general-info"> General Information and Common Tags </a>
There are several tags that you will see in many different policy examples. This section explains these options. The use of these tags is demonstrated in the examples that follow this section.

### Basic Policy Types
`policy-portfolio-standard`: a policy type that allows you to set up taxes, subsidies, constraints, and renewable energy standards. The discussion below refers to `policy-portfolio-standard` setup unless otherwise noted.

`ghgpolicy`: essentially a special case of `policy-portfolio-standard` that applies to emissions

### Price vs quantity policies
`fixedTax`: When provided without a `constraint`, this creates an unsolved market where the value specified here is added to (tax) or subtracted from (subsidy) the cost of technologies included in the policy. If this is read in before a `constraint` for the same market and model period, then it will be used as an initial guess for the constraint price.

`constraint`: Sets up a solved market. In years for which a value is set, the solver will find a price that ensures the constraint is met. The constraint can either be an upper bound (if the `tax` tag is used), a lower bound (if the `subsidy` tag is used), or an exact amount to match (see notes on `min-price`). See below for more information. 

### Specifying taxes vs. subsidies OR less than, greater than or equal to constraints
A `policy-portfolio-standard` can have of of three types of policies (`tax`, `subsidy`, `RES`) as specified by the `policyType` tag.

`tax`: if only a `fixedTax` is read in, then the model will add values specified in the `fixedTax` to the cost. If `tax` policy is specified with a `constraint`, then the constraint values will upper bounds unless `min-price` is set (see below). Note that mechanically the `constraint` value is set as a "supply" and the model will adjust the "demand" (by changing the price) to ensure the constraint is met.

`subsidy`: if only a `fixedTax` is read in, the values supplied will be subtracted from the cost. If `subsidy ` policy is specified with a `constraint`, then the constraint values will be lower bounds unless `min-price` is set (see below). Note that mechanically the `constraint` value is set as a "demand" and the model will adjust the "supply" (by changing the price) to ensure the constraint is met.

`RES`: Specifies a renewable energy standard. In this case, the value of the `constraint` is ignored

`min-price`: Mechanically, this is the cut off price below which the model will consider an inequality constraint solved. If the price is below `min-price` and the supply (demand) is larger (smaller) than the constraint for a tax (subsidy), then the model will consider the market solved. The default is zero. If this is set to a large enough negative value (allowing negative prices as part of the solution process), constraints must be met exactly. That is, production must equal the amount specified in the constraint rather than the constraint being an upper bound (for a tax) or a lower bound (for a subsidy) on production. This can be used with either a `tax` or `subsidy` policy and would have the same result in either case.  

### Other Options

`market`: a means of grouping different regions together. This can be set to any string. All regions that have a common string will add to/demand from the same market.

Note that the string used for market has no relationship to actual region names, although region names are often used for connivence. (e.g., a user could specify that India and EU-12 are in a market called "Canada". which will have nothing to do with the GCAM region Canada.)

### Setting up inputs for policies
In addition to setting up a policy market using the `ghgpolicy` or `policy-portfolio-standard` options described above, you also need to indicate what is included in the policy.

For `ghgpolicy`, the GHG objects are usually already in place. For example, MAC curves look at `market-name` (default CO2; be careful about units [mac-price-conversion](policies.html#non-co2-markets)). But, you could always add additional tags to allow more specific constraints. For example, if you wanted to constrain electricity CO2 only, you could add an emissions tag `<CO2 name=”CO2_ELEC”>` to all of the electricity technologies (watch out for CCS) and then add a `ghgpolicy` constraining "CO2_ELEC".

For `policy-portfolio-standard` policies, one of the following tags below must be used in the relevant technology objects. As shown in the examples, these tags must be named with the corresponding policy name.

`input-tax`: This should be used with technologies that are a part of a `tax` policy. Mechanically, this tag links the technology to the policy, adding its value to the cost of the technology. For constraints, the quantity of this input is added to the demand for the policy market.

`input-subsidy`: This should be used with technologies that are a part of a `subsidy` policy. This tag links the technology to the policy, subtracting its value from the cost of the technology. For constraints, the quantity of this input is added to the supply for the policy market.

`res-secondary-output`: This is needed for use with the `RES` policy. The quantity of this output is added to the supply for the policy market.

## <a name="policy-examples"> Example Policies </a>

The following policy examples are provided in this section.

* [Carbon Price](#carbon-price)
* [Linked Policies](#linked-policy)
* [Energy Constraint](#energy-constraint)
* [Land Constraint](#land-constraint)
* [Energy Intensity Standard](#res)


## <a name="carbon-price"> Carbon Price </a>
The following input file will create a carbon price of $1/tC (in $1990) in the USA, starting in the year 2020 and going through out the model time horizon. Additional regions can be added to this file. Regions with the same `market` name will use the same carbon price.

```
<scenario>
    <world>
        <region name="USA">
            <ghgpolicy name="CO2">
                <market>USA</market>
                <fixedTax year="2020" fillout="1">1</fixedTax>
            </ghgpolicy>
        </region>
    </world>
</scenario>
```

## <a name="linked-policy"> Linked Policies </a>
Linked policies are used to tie the price of one policy to another. In the example below, CO2 and CH4 are linked to a policy called "GHG"; that is, the price of the GHG market will affect the price applied to both CO2 and CH4. The `price-adjust` is the price multiplier used to convert units; the example below assumes that the GHG price is in 1990$/tC and converts that to CH4 using GWPs. The `demand-adjust` is a multiplier on the output when adding emissions to a common market to be used in constraint; in this example, GWPs are used to convert each gas to its CO2-equivalent value.

```
<scenario>
   <world>
      <region name="USA">
         <linked-ghg-policy name="CO2">
            <price-adjust fillout="1" year="1975">1</price-adjust>
            <demand-adjust fillout="1" year="1975">3.667</demand-adjust>
            <market>global</market>
            <linked-policy>GHG</linked-policy>
            <price-unit>1990$/tC</price-unit>
            <output-unit>MtC</output-unit>
         </linked-ghg-policy>
         <linked-ghg-policy name="CH4">
            <price-adjust fillout="1" year="1975">5.7272</price-adjust>
            <demand-adjust fillout="1" year="1975">21</demand-adjust>
            <market>global</market>
            <linked-policy>GHG</linked-policy>
            <price-unit>1990$/GgCH4</price-unit>
	...
```

## <a name="energy-constraint"> Energy Constraint </a>
The following inputs will set a constraint on bioenergy use in the USA, limiting it to 10 EJ/yr. Note that the `input-tax` tag will need to be added to all model periods (the example only uses 2020 for brevity). Additionally, this tag needs to be added to all production technologies and regions that are included in the target. For example, corn ethanol, sugarcane ethanol, and biodiesel do not consume or produce "regional biomass" and therefore would be excluded from the policy below. If you wanted to include these options in this constraint, you would need to add a tag to those technologies in the refinery sector. 

This example sets an upper bound on production. If instead you wanted a lower bound, then you would use `input-subsidy` in the technology and `policyType` equals "subsidy" in the policy-portfolio-standard. If you wanted to set an exact constraint, you can use either a tax or a subsidy with the additional tag `<min-price year="2020" fillout="1">-100</min-price>` which will allow the tax or subsidy to go negative, effectively enabling either a tax or a subsidy within the same constraint.

If you wanted to only constrain one type of bioenergy, then would only put the `input-tax` tag in the technology producing that type of bioenergy (e.g., you could include `input-tax` in the biomass resource to just limit MSW production).  

```
<scenario>
   <world>
      <region name="USA">
         <supplysector name="regional biomass">
            <subsector name="regional biomass">
               <technology name="regional biomass">
                  <period year="2020">
                     <input-tax name="bio-constraint"/>
                  </period>
                  ...
               </technology>
            </subsector>
        </supplysector>
        <policy-portfolio-standard name="bio-constraint">
				<market>USA</market>
				<policyType>tax</policyType>	
				<constraint year="2020" fillout="1">10</constraint>
		</policy-portfolio-standard>
    </region>
	</world>
</scenario>
```

## <a name="land-constraint"> Land Constraint </a>
The following input file will keep UnmanagedForest area in the USA GreatLakes region above 12 thous sq km, starting in the year 2020 and going through out the model time horizon. Because the policy type is specified as `<policyType>subsidy</policyType>` the model will add a subsidy to the associated market to achieve the specified 12 thous sq km target. 

If an upper bound was needed instead, this can be implemented by changing `policyType` to "tax" in the below xml example. In this case the opposite will occur, with the model adding a tax to the associated market to keep land use below the specified value. 

Note that the `land-constraint-policy` tag will need to be added to any `UnmanagedLandLeaf` you want to constrain (e.g., land leaf objects use a different tag than technology objects, which were discussed above). If more than one `UnmanagedLandLeaf` is given the same policy name ("reduced_deforestation" in this example) and market name (USA in this example), then the sum of those leafs will be constrained to the specified amount.

```
<scenario>
    <world>
        <region name="USA">
            <LandAllocatorRoot name="root">
                <LandNode name="AgroForestLand_GreatLakes">
                    <LandNode name="AgroForest_NonPasture_GreatLakes">
                        <LandNode name="AllForestLand_GreatLakes">
                            <UnmanagedLandLeaf name="UnmanagedForest_GreatLakes">
                                <land-constraint-policy>reduced_deforestation</land-constraint-policy>
                            </UnmanagedLandLeaf>
                        </LandNode>
                    </LandNode>
                </LandNode>
            </LandAllocatorRoot>
            <policy-portfolio-standard name="reduced_deforestation">
                <market>USA</market>
                <policyType>subsidy</policyType>
                <constraint year="2020" fillout="1">12</constraint>
            </policy-portfolio-standard>
        </region>
     </world>
</scenario>
```

## <a name="res"> Energy Intensity Standard </a>
The following inputs will set up a energy intensity standard. These policies differ from the [energy constraint](#energy-constraint) described above in that they specify a share of a sectoral output. The example below sets a biofuels target, where the biofuels constraint is set by adding an additional input of "BioFuelsCredits" into the refined liquids for transportation sector. This credit input is read in as a `minicam-energy-input`, so its units are EJ with its price in $/GJ just like any other energy input, and its input coefficient is simply the target percentage.  This sets the demand for "BioFuelsCredits". (In this example, an additional pass-through sector called "refined liquids transport" was created to apply the constraint just on transportation rather than on all refined liquids. "refined liquids transport" is then used as the input to the transportation technologies.)

```
   <supplysector name="refined liquids transport">
            <subsector name="refined liquids transport">
               <technology name="refined liquids transport">
                  <period year="2020">
                     <minicam-energy-input name="BioFuelsCredits">
                        <coefficient>0.1</coefficient>
                     </minicam-energy-input>
                     <share-weight>1</share-weight>
                     <minicam-energy-input name="refining">
                        <coefficient>1</coefficient>
                     </minicam-energy-input>
                  </period>
```

The supply is created by putting a secondary output of "Biofuels Credits" on each of the biofuels liquids technologies, with an `output-ratio` of 1. The `output-ratio` specifies the quantity of "BioFuelsCredits" supplied for each GJ of biofuels produced. With a positive price of Biofuels Credits, the secondary output will have a value that reduces the biofuels technology costs and increases their market share.  If the constraint is not binding (there are more biofuels than required), the price of "BioFuelsCredits" will be zero and have no impact on market shares. 

```
<supplysector name="refining">
            <subsector name="biomass liquids">
               <technology name="cellulosic ethanol">
                  <period year="2020">
                     <res-secondary-output name="BioFuelsCredits">
                        <output-ratio>1</output-ratio>
                     </res-secondary-output>
                  </period>
```

The "BioFuelsMarket" and policy are created by reading in the policy as an RES policy.

```
  <policy-portfolio-standard name="BioFuelsCredits">
            <market>USA</market>
            <policyType>RES</policyType>
```
