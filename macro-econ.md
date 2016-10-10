---
layout: index
title: The GCAM Macro-Economic System
prev: overview.html
next: energy.html
current-version: v4.3 
---

The **Macro-Economic System** component of core GCAM sets the overall scale of economic activity for model simulations. Assumptions about population, and per capital income growth for each of the 32 geopolitical regions determines the Gross Domestic Product (GDP) in each of GCAM's 32 global geo-political regions. At present, the macro-economic systems provide a one-way transfer of information to other GCAM components; the state of other GCAM components does not affect the overall scale of human activities in GCAM (see below for minor exception to this statement). For example, neither the price nor quantity of energy nor the quantity of energy services provided to the economy affect the calculation of the principle model output of the GCAM macro-economic system, Gross Domestic Product (GDP). Similarly, no detail is provided other macro-economic variables such GDP components (consumption, investment, net exports, aggregate capital stock, and so forth) nor social welfare. The development of two-way coupling with other GCAM components is an important focus of present research efforts. 

## Macro-Economic System Inputs and Outputs

### Inputs

GCAM's inputs include information on population and the rate of per capita income growth. GCAM requires globally consistent data sets for each of its historical model periods, currently 1990, 2005, and 2010, to initialize the model. The GCAM data system can produce such data sets annually beginning in 1971. Currently, GCAM uses data from 1990, 2005, and 2010 to initialize the model, but could be initialized to any year beginning in 1971.

Each scenario requires assumptions about future populations for future time periods.

* Population

  The number of people living in each GCAM region in the benchmark and projection years.

* GDP Per Capita Growth

  The annual average rate of growth of per capita income over each time step in the projection. Time steps are 5 years by default.
  
### Output
  
The GCAM Macro-Economic System has two outputs, population and GDP. 

* Population

  The number of people living in each GCAM region in the benchmark and projection years. Population is a pass-through variable as it is also a direct input.

* GDP

  GDP is calculated using population and the GDP per capita growth rate.

## Macro-Economic Modeling Approach

Regional GDP is calculated using a simple one-equation model:

$$
Equation 1: GDP_{r,t+1} = POP_{r,t+1}( 1+GRO_{r,t})^{tStep}( \frac{GDP_{r,t}}{POP_{r,t}} ) P^{ \alpha }_{r,t+1}
$$

Where $$r$$=region, $$t$$=the period, $$tStep$$=number of years in the time step, $$GDP_{r,t}$$=population in region $$r$$ in period $$t$$, $$POP_{r,t}$$=population in region $$r$$ in period $$t$$ and $$GRO_{r,t}$$=annual average per capita GDP growth rate in region $$r$$ in period $$t$$.

While in general, it is not implemented, a energy-feedback elasticity is included in the present formulation. The present feedback is determined by the term: $$P^{\alpha}_{r,t+1}$$,  where $$P$$ is the aggregate price of energy service, calculated in the energy system component of the model and $$\alpha$$ is the GDP feedback elasticity (Edmonds and Reilly, 1983) . It is the percentage change in the GDP for a one-percent change in the price of energy services. The value is set to zero by default, which effectively removes this term from the determination of GDP, but if non-zero values are used, these values would be negative.

## Calibration

Historical population and observed GDP are used to calibrate a GCAM simulation using data from 1990, 2005, and 2010. Prognostic values for population and GDP per capita growth rates are provided by the user, though a default set is provided in the GCAM default download data base.

## Connections to Other GCAM Systems 

The macro-economic systems provide information to other parts of the GCAM system. GDP and population values are used in the energy, land-use and water systems of GCAM. Macro-economic system coupling is one-way at present. GCAM macro systems do not use information derived from any other component of GCAM unless the energy-GDP feedback term is turned on. That is $$\alpha\neq0$$. Future versions of the macro-economic systems component of GCAM will introduce two-way coupling between GDP and the other GCAM human-systems components, energy, land and water.

## Reference

Edmonds, J. and J. Reilly. 1983. "A Long-Term, Global, Energy-Economic Model of Carbon Dioxide Release From Fossil Fuel Use," Energy Economics, 5(2):74-88.
