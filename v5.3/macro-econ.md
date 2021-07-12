---
layout: index
title: The GCAM Macro-Economic System
prev: overview.html
next: ssp.html
gcam-version: v5.3
---

The socioeconomic componenta of GCAM set the scale of economic activity and associated demands for model simulations. Assumptions about population and per capita GDP growth for each of the 32 geo-political regions together determine the Gross Domestic Product (GDP). GDP and population both can drive the demands for a range of different demands within GCAM. Population and economic activity are used in GCAM through a one-way transfer of information to other GCAM components. For example, neither the price nor quantity of energy nor the quantity of energy services provided to the economy affect the calculation of the principle model output of the GCAM macro-economic system, GDP. 

### Inputs and Outputs

GCAM's **inputs** include information on population and the rate of per capita income growth for each of GCAM's energy-economic regions. GCAM requires globally consistent data sets for each of its historical model periods, currently 1990, 2005, 2010 and 2015, to initialize the model. Each scenario requires assumptions about population and per capita GDP growth for future time periods.

* Population: The number of people living in each GCAM region in the benchmark and projection years.
* GDP Per Capita Growth:   The annual average rate of growth for per capita GDP over each time step in the projection. Time steps are 5 years by default.
  
The macro-economic module takes both of these to produce overall GDP in each GCAM energy-ecoonomic region.

## Macro-Economic Modeling Approach

Regional GDP is calculated using a simple one-equation model:

$$
Equation 1: GDP_{r,t+1} = POP_{r,t+1}( 1+GRO_{r,t})^{tStep}( \frac{GDP_{r,t}}{POP_{r,t}} ) P^{ \alpha }_{r,t+1}
$$

Where $$r$$=region, $$t$$=the period, $$tStep$$=number of years in the time step, $$GDP_{r,t}$$=population in region $$r$$ in period $$t$$, $$POP_{r,t}$$=population in region $$r$$ in period $$t$$ and $$GRO_{r,t}$$=annual average per capita GDP growth rate in region $$r$$ in period $$t$$.

## Calibration and Assumptions

Historical population and observed GDP are used to calibrate a GCAM simulation using data from 1990, 2005, 2010, and 2015. Prognostic values for population and GDP per capita growth rates are provided by the user, though a default set is provided in the GCAM data base. Alternative assumptions associated with the SSPs are also immplemented in the GCAM implementation of the [Shared-Socioeconomic Pathways](ssp.html).

## References

Edmonds, J. and J. Reilly. 1983. "A Long-Term, Global, Energy-Economic Model of Carbon Dioxide Release From Fossil Fuel Use," Energy Economics, 5(2):74-88.

Moss, R. H., J. A. Edmonds, K. A. Hibbard, M. R. Manning, S. K. Rose, D. P. van Vuuren, T. R. Carter, S. Emori, M. Kainuma, T. Kram, G. A. Meehl, J. F. B. Mitchell, N. Nakicenovic, K. Riahi, S. J. Smith, R. J. Stouffer, A. M. Thomson, J. P. Weyant and T. J. Wilbanks (2010). "The next generation of scenarios for climate change research and assessment." Nature 463(7282): 747-756.

van Vuuren, D. P., K. Riahi, K. Calvin, R. Dellink, J. Emmerling, S. Fujimori, S. Kc, E. Kriegler and B. O’Neill (2017). "The Shared Socio-economic Pathways: Trajectories for human development and global environmental change." Global Environmental Change 42: 148-152.
