---
layout: index
title: Cycle-breaking in GCAM
prev: 
next:
gcam-version: v3.2 
---

In GCAM's model of the economy production of a good creates demand for (i.e., draws supply from) other goods in "upstream" markets, and it creates supply for (i.e., is demanded by) goods in "downstream" markets. GCAM implicitly assumes that these relationships form a directed acyclic graph (DAG). That is, for every market in the model, the market's price is independent of the characteristics of its downstream markets, and its demand is independent of the characteristics of its upstream markets. When this assumption is violated we must find a way to break the cycles in the market graph in order for the model to run.

Price and Demand markets
------------------------

The most obvious way to create a cycle is for a market to appear upstream of itself: A -&gt; B -&gt; C -&gt; A. These cases happen when an indirect output of a sector is also used as an input to that sector. For example, electricity is an input to unconventional oil production; however, the products of unconventional oil production are also an option for electricity generation. In these situations, we select a market that participates in the cycle and replace it with two new markets that break the cycle. Using the generic example above, the new graph structure would be A -&gt; B -&gt; C -&gt; A'.

These two markets are called a "Price Market" and a "Demand Market", respectively. They are both solvable markets; however, unlike most of the markets in GCAM ("Normal Markets") they do not represent equations for market equilibrium. Instead, they represent consistency conditions between the two ends of the newly-broken cycle. That is, in addition to the market equilibrium conditions represented by the Normal Markets, the Price and Demand Markets add additional equations to the solver that represent the requirements that the price and quantity as viewed from both ends of the broken cycle (A and A' in our generic example) must be equal.

One consequence of this strategy is that although the Price and Demand Markets use variables called "price", "supply", and "demand", those variables do not necessarily represent the quantities they are named after. Instead, the "price" represents a trial value set by the solver, and the "demand" represents the corresponding actual value computed in the model. The "price" value is copied into the supply so that when the solver solves the equation supply = demand, it is actually solving trial value = actual value.

|        |                                         |                                          |
|--------|-----------------------------------------|------------------------------------------|
|        | **Price Market**                        | **Demand Market**                        |
| price  | trial price value (set by solver)       | trial demand value (set by solver)       |
| supply | trial price value (copied from "price") | trial demand value (copied from "price") |
| demand | actual price (computed in model)        | actual demand (computed in model)        |

Conceptually, this strategy is implemented by following two rules:

-   Model entities *reading* a price or a demand value from a market always receive the *trial* value.
-   Model entities *writing* a value into a market (whether by setting it or adding to it) always modify the *actual* value.

In software we implement these rules by overriding the setter and accessor methods as necessary. We also allow the Price Market to act as a proxy for the Demand Market, so that model entities reading or setting a demand value in the Price Market will actually access the corresponding Demand Market. This last step is not theoretically necessary, but it allows the cycle-breaking mechanism to operate transparently to the rest of the model. The Price Market serves all the functions the rest of the model expects of a Market, and the the Demand Market operates invisibly in the background. If we did not perform this bit of programming legerdemain, the rest of the model would have to allow for the possibility that the price of a good and its demand were represented in two different markets.

With these considerations in mind, the methods of Price and Demand Markets are overridden as follows, with "dm-&gt;" indicating that a call is forwarded to the linked Demand Market:

|             |                                                                                                                     |                                                                                                  |
|-------------|---------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
|             | **Price Market**                                                                                                    | **Demand Market**                                                                                |
| getPrice    | returns trial price (see note below)                                                                                | returns trial demand                                                                             |
| getDemand   | returns dm-&gt;getDemand                                                                                            | returns trial demand                                                                             |
| getSupply   | returns dm-&gt;getSupply                                                                                            | returns trial demand                                                                             |
| setPrice    | sets "demand" (i.e., actual price) to input value. Also copies trial price to "supply". (see additional note below) | sets "price" to input value (This is probably an error, but seems not to be called in practice.) |
| addToDemand | calls dm-&gt;addToDemand                                                                                            | adds to "demand" (i.e., actual demand)                                                           |
| addToSupply | calls dm-&gt;addToSupply                                                                                            | copies "price" (i.e., trial demand) to "supply" (ignores input value)                            |

The base class methods used by the solver (setRawPrice, getSolverDemand, etc.) are not overridden in these subclasses, so they perform their usual functions. This is crucial, as otherwise there is no way to set the "price" value of a Price Market.

There is one further complication in the implementation of Price Markets. If the actual price is negative, the Price Market stores it as positive and sets a flag. The getPrice method checks the value of that flag and inverts the sign of its return value if the flag is set. This has the effect of hiding the negative value from the solver. This functionality will probably be removed when the solver is upgraded to deal correctly with negative prices.

Trial Value Markets
-------------------

It sometimes happens that the market price for a good depends on the final output of that same good. An example of this phenomenon is the case of intermittent electricity generation technologies. The cost of these technologies depends on their market share, which is not known until the downstream demand has been calculated. These cases do not create a loop in the graph of market relationships in the same sense as the cases described in the previous section; however, they require special treatment in the form of "Trial Value Markets".

When a technology has a self-dependency, GCAM creates a Trial Value Market to hold a guess for the unknown value needed to calculate the cost. This guess is supplied by the solver and stored as the "price" in the Trial Value Market. As with the Price and Demand Markets, whenever affected technology attempts to read the unknown value, it gets the guess supplied by the solver. Whenever it reports the actual value calculated by the model, that value is stored in the "demand" variable. These actions are mediated by helper functions in the SectorUtils class. The trial value is also copied to the "supply" variable so that the solver can solve for consistency between the guess and the calculated value.

|        |                                                        |
|--------|--------------------------------------------------------|
| price  | Trial value (input by solver)                          |
| supply | Trial value (copied from "price" and output to solver) |
| demand | Actual value (calculated by model)                     |


