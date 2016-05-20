---
layout: index
title: GCAM Solver
prev: 
next:
gcam-version: v3.2 
---

GCAM has several [solver algorithms](#Solver_algorithms) at its
disposal. The solver algorithms can be combined so that several of
them are used in sequence. The mix of algorithms can be varied from
one model timestep to the next and can be customized for markets that
require special treatment. Additionally, each solver algorithm has
several adjustable parameters that are user configurable. These
configuration options are specified in the
[solver configuration file](#Solver_Configuration_File).

<a name="Solver_algorithms">Solver Algorithms</a>
-----------------

### Bisection Solver

#### Description

The bisection solver is a multidimensional generalization of of
one-dimensional bisection methods. The one-dimensional methods work by
first establishing a bracket, identified by a change of sign in
$$f(x)$$, around the solution. At each iteration $$f(x)$$ is evaluated
at the midpoint of the bracket interval, and the sign of the result
tells us which half of the interval contains the solution. The
endpoints of the bracket are adjusted to the newly-identified
interval, and the iterations continue until the interval is small
enough that we have effectively isolated the solution.

For a system of equations in multiple dimensions, it is generally not
possible to construct a rigorous bracket around a solution. Even if we
find two points for which all of the equations in the system have
opposite sign, there is no guarantee that a solution exists somewhere
on the line connecting the two points. The reason why is that the
solution to the equation $$\vec F(\vec x) = 0$$ is a single point
$$\vec x_0$$ where all components of $$\vec F$$ are simultaneously
zero. As we move from one of our putative bracket points to the other
the overwhelming likelihood is that the components of $$\vec F$$ will
change sign at different places along the path, none of which will be
the solution we seek. Thus, in general, bracketing and bisection is
not a viable strategy for solving a system of equations.

Despite this shortcoming, bisection can often be used to get the
solver into the general vicinity of the solution, from which the
Newton-Raphson solver can easily find it. For initial guesses far from
the solution, bisection can often be faster than more sophisticated
solution techniques. Moreover, bisection places no conditions on the
Jacobian matrix, making it useful for jostling the solver out of
singular regions. These two properties make bisection a useful
technique for getting a solution started, before finishing with
another technique.

#### Parameters

* **bracket-interval**: The amount by which the bracket boundary will
be increased or decreased when attempting to bracket the
solution. This is a multiplicative factor, so a bracket interval of
$$f$$ means that we will increase prices by multiplying by $$1+f$$ and
decrease them by dividing by $$1+f$$.  
* **max-bracket-iterations**: The
maximum number of steps the solver will take when attempting to
bracket the solution.  
* **max-iterations** : The maximum number of
bisection iterations the solver will perform before giving up.  
* **solution-info-filter** : A
[solution info filter](#Solution-info-filter_Predicates) predicate
that will be used to determine which markets the solver will attempt
to solve.  

### Newton-Raphson Solver

#### Description

The Newton-Raphson Solver is a globally convergent iterative method
based on the one in *Numerical Recipes*, section
9.7<sup>[1](#NR)</sup>. In each iteration we solve the
equation

$$  
J(\vec x) \cdot \delta \vec x = -\vec F(\vec x) \;\;\;\;\;\;\;\;\;\; (1) 
$$  

for a correction step $$\delta \vec x$$, where $$J$$ is the Jacobian
matrix of first derivatives of $$\vec F$$. After each iteration we
replace $$ \vec x$$ with $$ \vec x + \delta \vec x$$ and iterate until
$$ \vec F$$ is sufficiently small.

The procedure just described will often fail to converge when $$ \vec
x$$ is far from its solution value. This problem is particularly
evident in functions that have rapidly changing or discontinuous
derivatives and in functions where the Jacobian matrix is nearly
singular. In these situations, equation (1) attempts to extrapolate
local information about the gradient of the function to distant
regions where it is invalid. Such a step can easily land the solver in
an unusual region of the parameter space (*i.e.,* a region for which
the model is ill-behaved or undefined), and when this happens the
algorithm rarely recovers.

We mitigate these problems by monitoring $$ f = \|\vec F\| $$ and
backtracking along the direction of $$ \delta \vec x$$ when an
ordinary Newton-Raphson step causes $$ f$$ to increase. This allows
the solver to follow the Newton step far enough to progress toward the
desired solution, while rejecting large steps that take us further
away from it. Computationally we implement this procedure by scaling
the Newton-Raphson step by a factor $$ \lambda \leq 1$$ . We start
each iteration with $$ \lambda = 1$$ and evaluate $$ f$$ . If it has
failed to decrease sufficiently, we decrease $$ \lambda$$ until we
obtain an acceptable step. The heuristic for accepting a step and the
procedure for decreasing $$ \lambda$$ are described in *Numerical
Recipes*.<sup>[1](#NR)

#### Limitations

The backtracking procedure greatly enhances the convergence properties
of the solver over the basic Newton-Raphson procedure, but the solver
will still fail under some circumstances. The most commonly occurring
such circumstance is a singular Jacobian caused by one or more prices
having no impact on the excess demand in any of the solved markets. In
GCAM this situation occurs predictably at high and low price
extremes. Many of the input supply and demand functions saturate in
extreme price regimes, leading to zero derivatives. GCAM currently
deals with this problem by excluding markets with obvious price
extremes from the Newton-Raphson solver and using other solver
algorithms on them until their prices come into the normal price
domain. In the long run the problem could also be addressed by
engineering supply and demand inputs such that they retain a slight
slope even at price extremes.

#### Parameters

* **ftol**: Convergence criterion for the solver. The solver is
  considered converged when the magnitude of the largest component of $$
  \vec F$$  is less than ftol.  
* **max-iterations**: Maximum number of iterations of the main loop to
  execute before giving up. This is only loosely related to the number
  of evaluations used as a criterion in the
  [general parameters](#General_Solver_Parameters). For $$ N$$
  markets, one iteration will make $$ O(N)$$  calls to
  `world->calc()`. However, since $$ N$$  of these will be partial
  derivative evaluations, they will count for approximately $$ N/10$$
  "evaluations".  
* **solution-info-filter** : A
  [solution info filter](#Solution-info-filter_Predicates) predicate
  that will be used to determine which markets the solver will attempt
  to solve.  

<a name="Solver_Configuration_File"></a>

Solver Configuration File 
-------------------------

The solver configuration, including the choice of solver or solvers to
use and settable solver parameters, is selected in the solver
configuration file. This file is specified in the input Configuration
file using a line of the form:

`<Value name="solver_config">../input/solution/cal_solver_config.xml</Value>`

### Syntax

The solver configuration file comprises a series of blocks that
specify the configuration of the solver to use in each period of the
model run. For example:  
` <user-configurable-solver year="2005">`  
`       <solution-tolerance>0.001</solution-tolerance>`  
`       <solution-floor>0.0001</solution-floor>`  
`       <calibration-tolerance>0.01</calibration-tolerance>`  
`       <max-model-calcs>2500</max-model-calcs> `  
`        .`  
`        .`  
`        .`  
` </user-configurable-solver>`  

The first line indicates that this is the configuration to be used in 2005. If the same solver configuration is to be used for all subsequent years, we can add the "fillout" parameter:

` <user-configurable-solver year="2010" fillout="1">`

The first few lines of the configuration specify [General Solver Parameters](#General_Solver_Parameters), which apply to all solver components. For the most part, these parameters dictate things like stopping conditions, which apply to all of the solver components that will be used.

Following the general parameters are one or more blocks that specify
solver components, which direct the solver to run particular solution
algorithms. For example:  
`       <log-newton-raphson-backtracking-solver-component>`  
`           <max-iterations>25</max-iterations>`  
`           <ftol>1.0e-3</ftol>`  
`           <solution-info-filter>solvable-nr || (market-type="Tax" &amp;&amp; solvable)</solution-info-filter>`  
`       </log-newton-raphson-backtracking-solver-component>`  

The first few lines specify parameters that are specific to this
particular solver component. The `solution-info-filter` line gives a
[predicate](#Solution-info-filter_Predicates) for determining which
markets the component will attempt to solve. This filter allows us to
exclude from a solver component markets that are likely to cause that
component to fail (for example, markets that make the Jacobian matrix
singular for the Newton-Raphson solver) or whose solution is unlikely
to be improved by the component.

The algorithms will be run consecutively in the order listed in the
configuration file. When all have been run, the termination criteria
will be checked. The sequence of components will be repeated until
either the model is solved or the maximum number of model evaluations
has been exceeded.

<a name="General_Solver_Parameters"></a>
### General Solver Parameters

* **calibration-tolerance**: ?  
* **max-model-calcs**: The maximum number of times the full model will
  be evaluated in the course of the solution. If the solver has not
  found a valid solution by that time, it exits and issues a warning.  
* **solution-tolerance**: The relative excess demand threshold, below
  which the model is considered solved. Loosely speaking, this is the
  accuracy to which we wish to solve the model.  
* **solution-floor**: The absolute excess demand threshold, below
  which the model is considered solved. This parameter covers the
  cases where a low demand value makes achieving a relative excess
  demand threshold unfeasible.  

### <a name="Solution-info-filter_Predicates">Solution-info-filter Predicates</a>

The predicates available to filter markets are:

* **all**: True for any market.  
* **market-name**: True if the name of the market matches the name
  given in the filter.  
* **market-type**: True if the type of the market matches the type
  given in the filter. The available market types are Normal,
  Calibration, Inverse-Calibration, Tax, RES, Subsidy,
  [Trial-Value, Demand, and Price](Cycle-breaking_in_GCAM.html).  
* **solvable**: True for markets that should be solved. "Solvable" in
  this context refers to intent, not capability. A market is
  "solvable" if its price is an independent variable (*i.e.*, not
  determined by another market). Additionally, constraint markets
  (*e.g.*, greenhouse gas caps) are "unsolvable" when the constraint
  is not binding.
* **solvable-nr**: True for markets that should be solved and meets
  the criteria for solving with a Newton-Raphson solver. For most
  markets these criteria are that the price and supply are
  nonzero. (Exception: trial-value markets are exempt from the nonzero
  price and supply requirements.)
* **unsolved**: True for markets that are not yet solved.  

Predicates can be combined with the logical operators **and** (&&)
(*NB:* Since the & character is reserved in XML, it must be written as
`&amp;amp;`), **or** (||), and **not** (!) to form compound
predicates. These conjunctions can be grouped with parentheses. 

For example:

` <solution-info-filter>solvable-nr || (market-type="Tax" &amp;amp;&amp;amp; solvable)</solution-info-filter>`

or

` <solution-info-filter>unsolved &amp;amp;&amp;amp; solvable &amp;amp;&amp;amp; `  
`      !(market-name="globalcrude oil" || market-name="globalnatural gas" || market-name="globalcoal") </solution-info-filter>`  

The first of these accept all solvable-nr markets and all solvable tax
markets (even if they don't meet the NR requirements). The second
would exclude the global crude oil, natural gas, and coal markets and
accept all other solvable markets that are not yet solved.

Model Abstraction Layer
-----------------------

For newer solver algorithms, the GCAM solver is decoupled from the
rest of the GCAM model by an abstraction layer that presents the model
to the solver as a vector function of a single vector argument: $$
\vec y = \vec F(\vec x)$$ . Both vectors have length equal to the
number of solved markets. The input vector $$ \vec x$$ is the log of
the prices (or price-analogs, for special markets that redefine the
price method). The output vector $$ \vec y$$ is the log of the
relative excess demand (or analog, for markets that redefine it), $$
\vec y = \log(D/S)$$ .

The solver is mostly unaware of the details of how the input vector is
processed for use in the model or how the model is invoked. The sole
exception is the `partial` method, which allows the solver to signal
that it is computing a partial derivative. This allows the abstraction
layer to optimize the model computation by skipping the calculation of
values that have not changed. It does not affect the results returned.

The abstraction layer takes care of all of the manipulations that have
to happen to get the model to run with a set of input prices. In
order, these are:

-   Zeroing all market supplies and demands *(full calculation only)*.
-   Saving the current market values and setting flags *(partial calculation only)*.
-   Determining the affected nodes *(partial calculation only)*
-   Converting from log price to price.
-   Calling `world->calc()`
-   Converting from excess demand to log excess demand.
-   Restoring any state that was modified.

This arrangement greatly simplifies the development of solver
algorithms and eliminates redundant code that was formerly duplicated
in each algorithm. Some older algorithms bypass the abstraction layer
and perform these tasks directly. Over time, these solvers will be
phased out and replaced with versions that call the model through the
abstraction layer.

References
----------

<a name="NR">Press, W., et al (1992), *Numerical Recipes in C, Second ed.*, Cambridge University Press, ISBN 0521431085</a>
