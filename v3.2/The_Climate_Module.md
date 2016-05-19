---
layout: index
title: The Climate Module
prev: 
next:
gcam-version: v3.2 
---

&lt;small&gt;[*This page is valid for GCAM 3.0 r3371. Click here for info on how to view a previous version.*](GCAM_Revision_History "wikilink")&lt;/small&gt;

The GCAM employs the MAGICC model version 5. MAGICC is documented in several papers&lt;ref name="WigleyRaper92"&gt;Wigley, T.M.L. and Raper, S.C.B. 1992. Implications for Climate And Sea-Level of Revised IPCC Emissions Scenarios Nature 357, 293–300.&lt;/ref&gt;&lt;ref name="WigleyRaper02"&gt;Wigley, T.M.L. and Raper, S.C.B. 2002. Reasons for larger warming projections in the IPCC Third Assessment Report J. Climate 15, 2945–2952.&lt;/ref&gt;&lt;ref name="Raperetal96"&gt;Raper, S.C.B., Wigley T.M.L. and Warrick R.A. 1996. in Sea-Level Rise and Coastal Subsidence: Causes, Consequences and Strategies J.D. Milliman, B.U. Haq, Eds., Kluwer Academic Publishers, Dordrecht, The Netherlands, pp. 11–45.&lt;/ref&gt;. In the current version of GCAM, the MAGICC code has been re-implemented in C++. MAGICC consists of a coupled set of simple models for the entire chain from emissions to concentrations to global radiative forcing to global changes in temperature and sea-level. &nbsp;Only a brief overview is given here. For a more complete description see referenced publications.

&lt;br&gt;

Emissions of greenhouse gases, aerosols, and short-lived species are determined endogenously in GCAM (see summary table below). That is, emissions are linked to underlying human activities. Emissions mitigation for CO2 is treated explicitly and endogenously for fossil fuel, industrial and land-use emissions in the GCAM. &nbsp;While emissions of non-CO2 greenhouse gases, aerosols and short-lived species are endogenously determined, emissions mitigation is modeled as a marginal abatement cost schedule (MAC). &nbsp;Montreal gases are treated exogenously with emissions set at levels secified by the relevant international&nbsp;agreements. Terrestrial carbon emissions in GCAM are derived from the detailed land-use-land-cover model described [elsewhere](Agriculture,_Land-Use,_and_Bioenergy "wikilink") in this wiki.

&lt;br&gt;

The first set of models within MAGICC convert emissions to concentrations, and covers a suite of greenhouse and pollutant&nbsp;gases. The carbon-cycle model in MAGICC incorporates an impulse response formulation for the ocean carbon component and a global-terrestrial model that self- consistently includes the impact of land-use changes over time on terrestrial carbon stocks and feedbacks. Changing oxidation capacity of the atmosphere due to changes in methane and pollutant emissions is accounted for in computing methane and HFC concentrations. Concentrations of N2O and other fluorinated gases are computed using constant atmospheric lifetimes.

&lt;br&gt;

Global radiative forcing from well-mixed greenhouse gases is determined from concentration values using simple relationships drawn from the literature. Forcing from carbon dioxide is proportional to the natural logarithm of carbon dioxide concentrations, forcing from methane and nitrous oxide is proportional to the square root of concentrations (with an interaction term). Forcing from fluorinated gases is linear in concentration. &nbsp;Forcing from tropospheric ozone is estimated using non-linear relationships between emissions of methane and reactive gases NOx, CO, and VOCs.&nbsp;

&lt;br&gt;

Direct and indirect forcing from aerosols is included. Direct forcing from sulfur dioxide, black carbon, and organic carbon are taken to be proportional to SO2, BC, and OC emissions, respectively. The GCAM version of MAGICC has been updated to include a direct representation of BC and OC emissions provided by GCAM (see Smith et al. 2011,*in preparation*). In the distribution version of MAGICC, BC and OC forcing is, in contrast, inferred from proxy measures such as land-use change and SO2 or CO emissions. Indirect cloud forcing in MAGICC is taken to be proportional to the natural logarithm of sulfur dioxide emissions.&nbsp;

&lt;br&gt;

Given total radiative forcing, global mean temperature change is calculated using an upwelling-diffusion model of ocean thermal response (with 40 ocean layers), together with a differential land/ocean forcing response. Climate calculations are performed with four boxes: two hemispheres plus land/ocean for each. Aerosol forcing is split into these four boxes as well. MAGICC uses its calculation of heat diffusion into the ocean to estimate sea-level rise due to thermal expansion. Sea-level rise (SLR) components due to melting of land glaciers and (optionally) large arctic and antarctic ice sheets are also included.&lt;br&gt;

&lt;br&gt;

MAGICC has been shown to be able to emulate the global-mean results from most complex general circulation models&lt;ref name="RaperCubasch96"&gt;Raper, S. C. B. and U. Cubasch (1996) Emulation of the results from a coupled general circulation model using a simple climate model GEOPHYSICAL RESEARCH LETTERS, VOL. 23, NO. 10, PP. 1107-1110fckLRdoi:10.1029/96GL01065&lt;/ref&gt;. A range of user-specified parameters, including climate sensitivity, carbon-cycle&lt;ref name="SmithEdmonds2006"&gt;Smith, Steven J. and J.A. Edmonds (2006) The Economic Implications of Carbon Cycle Uncertainty Tellus B 58 (5), pp. 586–590.&lt;/ref&gt;, and aerosol forcing strength, are available that enable a GCAM user to produce a wide range of climate scenarios.&lt;br&gt; &lt;br&gt;

|                                                                                                            |                                                                                                  |
|------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
|                                                                                                            | **GCAM**                                                                                         |
| style="background: none repeat scroll 0% 0% Aquamarine;" | CO&lt;sub&gt;2&lt;/sub&gt; fuel combustion      | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous by technology and fuel     |
| style="background: none repeat scroll 0% 0% Aquamarine;" | CO&lt;sub&gt;2&lt;/sub&gt; from other industry  | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous by technology and fuel     |
| style="background: none repeat scroll 0% 0% Aquamarine;" | CO&lt;sub&gt;2&lt;/sub&gt; from land-use change | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous by technology and land use |
| style="background: none repeat scroll 0% 0% LemonChiffon;" | CH&lt;sub&gt;4&lt;/sub&gt;                    | style="background: none repeat scroll 0% 0% LemonChiffon;" | Endogenous, mitigation with MAC     |
| style="background: none repeat scroll 0% 0% LemonChiffon;" | N&lt;sub&gt;2&lt;/sub&gt;O                    | style="background: none repeat scroll 0% 0% LemonChiffon;" | Endogenous, mitigation with MAC     |
| style="background: none repeat scroll 0% 0% Salmon;" | CFCs                                                | style="background: none repeat scroll 0% 0% Salmon;" | Exogenous                                 |
| style="background: none repeat scroll 0% 0% LemonChiffon;" | HFCs                                          | style="background: none repeat scroll 0% 0% LemonChiffon;" | Endogenous, mitigation with MAC     |
| style="background: none repeat scroll 0% 0% LemonChiffon;" | PFCs                                          | style="background: none repeat scroll 0% 0% LemonChiffon;" | Endogenous, mitigation with MAC     |
| style="background: none repeat scroll 0% 0% LemonChiffon;" | SF&lt;sub&gt;6&lt;/sub&gt;                    | style="background: none repeat scroll 0% 0% LemonChiffon;" | Endogenous, mitigation with MAC     |
| style="background: none repeat scroll 0% 0% Salmon;" | Other Montreal gases                                | style="background: none repeat scroll 0% 0% Salmon;" | Exogenous                                 |
| style="background: none repeat scroll 0% 0% Aquamarine;" | CO                                              | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous                            |
| style="background: none repeat scroll 0% 0% Aquamarine;" | NO&lt;sub&gt;x&lt;/sub&gt;                      | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous                            |
| style="background: none repeat scroll 0% 0% Aquamarine;" | VOC                                             | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous                            |
| style="background: none repeat scroll 0% 0% Aquamarine;" | SO&lt;sub&gt;2&lt;/sub&gt;                      | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous                            |
| style="background: none repeat scroll 0% 0% Aquamarine;" | BC from fossil fuel burning                     | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous                            |
| style="background: none repeat scroll 0% 0% Aquamarine;" | OC&nbsp;from fossil fuel burning                | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous                            |
| style="background: none repeat scroll 0% 0% Aquamarine;" | BC from biomass burning                         | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous                            |
| style="background: none repeat scroll 0% 0% Aquamarine;" | OC&nbsp;from biomass burning                    | style="background: none repeat scroll 0% 0% Aquamarine;" | Endogenous                            |
| style="background: none repeat scroll 0% 0% Salmon;" | Nitrate                                             | style="background: none repeat scroll 0% 0% Salmon;" | Exogenous                                 |
| style="background: none repeat scroll 0% 0% Salmon;" | Mineral dust                                        | style="background: none repeat scroll 0% 0% Salmon;" | Exogenous                                 |
| style="background: none repeat scroll 0% 0% Salmon;" | Albedo                                              | style="background: none repeat scroll 0% 0% Salmon;" | Exogenous                                 |

&lt;br&gt;

References
==========

&lt;references /&gt;&lt;br&gt;
