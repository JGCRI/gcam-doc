---
layout: index
title: Global Change Assessment Model (GCAM)
gcam-version: v5.2
---

This page includes some examples of input files required to create policies. Note that each example will need to be tailored to your own needs. 

## <a name="general-info"> General Information and Common Tags </a>
There are several tags that you will see in many different policy examples. This section explains these options.

### Basic Policy Types
`ghgpolicy`: essentially a special case of `policy-portfolio-standard` that applies to emissions

`policy-portfolio-standard`: a policy type that allows you to set up taxes, subsidies, constraints (in absolute value and share), and renewable energy standards

### Price vs quantity policies
`fixedTax`: An unsolved market, where the price (e.g., tax, subsidy) can be specified. If this is read in before a `constraint` for the same market, then it will be used as an initial guess for the constraint price.

`constraint`: A solved the market. In years for which a value is set, the solver will find a price that ensures the constraint is met.

### Specifying taxes vs. subsidies OR less than, greater than or equal to constraints
`tax`: for a `fixedTax`, this will be added to the cost. for a `constraint`, the results in an upper bound (unless `min-price` is set). Note that mechanically the `constraint` value is set as a "supply" and the model will adjust the "demand" (by changing the price) to ensure the constraint is met.

`subsidy`: for a `fixedTax`, this will be subtracted from the cost. for a `constraint`, the results in an lower bound (unless `min-price` is set). Note that mechanically the `constraint` value is set as a "demand" and the model will adjust the "supply" (by changing the price) to ensure the constraint is met.

`RES`: In this case, the value of the `constraint` is ignored

`min-price`: Default is zero, but if set to a negative value will result in an exact constraint.

### Other Options

`market`: a means of grouping different regions together. This can be set to any string. ALl regions that have a common string will add to/demand from the same market.

### Setting up inputs for policies
In addition to setting up a policy market using the `ghgpolicy` or `policy-portfolio-standard` options described above, you also need to indicate what is included in the policy.

For `ghgpolicy`, the GHG objects are usually already in place. For example, MAC curves look at `market-name` (default CO2; be careful about units `mac-price-conversion`). But, you could always add more tags for constraints. For example, if you wanted to constrain electricity CO2 only, you could add `<CO2 name=”CO2_ELEC”>` to all of the electricity technologies (watch out for CCS) and then add a `ghgpolicy` constraining "CO2_ELEC".

`input-tax`: This can be used with the `tax` policy and will add this input to the demand of a market OR add to tech cost.

`input-subsidy`: This can be used with the `subsidy` policy and will add this input to supply of a market OR subtract from tech cost.

`res-secondary-output`: This is used with the `RES` policy. It will add to supply OR subtract from tech cost.

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
The following inputs will set a constraint on bioenergy use in the USA, limiting it to 10 EJ/yr. Note that the `input-tax` tag will need to be added to all model periods (the example only uses 2020 for brevity). Additionally, this tag needs to be added to all production technologies and regions that are included in the target. For example, if you wanted to include 1st generation bioenergy in this constraint, you would need to add a tag to those technologies in the refinery sector, as 1st generation bioenergy does not go through the "regional biomass" market. If you wanted to only constrain one type of bioenergy, then would only put the `input-tax` tag in the technology producing that type of bioenergy (e.g., you could include a technology with this `input-tax` in the biomass resource to limit MSW production only). This example sets an upper bound on production. If instead you wanted a lower bound, then you would use `input-subsidy` in the technology and `policyType` equals "subsidy" in the policy-portfolio-standard. If you wanted to set an exact constraint, you can use either a tax or a subsidy with the additional tag `<min-price year="2020" fillout="1">-100</min-price>` which will allow the tax or subsidy to go negative, effectively enabling either a tax or a subsidy within the same constraint. 

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
The following input file will keep UnmanagedForest area in the USA GreatLakes region above 12 thous sq km, starting in the year 2020 and going through out the model time horizon. This could be converted to an upper bound by changing `policyType` to "tax". Note that the `land-constraint-policy` tag will need to be added to any `UnmanagedLandLeaf` you want to constraint. If more than one `UnmanagedLandLeaf` is given the same policy name ("reduced_deforestation" in this example) and market name (USA in this example), then the sum of those leafs will be constrained to the specified amount.

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