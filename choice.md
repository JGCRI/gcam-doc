---
layout: index
title: Economic Choice in GCAM
current-version: v4.2
---

## Introduction

Most of the economic activities represented in GCAM present us with a
choice among several ways to produce the end result of the activity.
Examples of these choices include choosing between different fuels or
feed stocks, between different technologies, and between
transportation modes.  In some cases the choice is between different
uses of a limited resource, such as when we allocate land area to
different uses.  In each of these cases we must allocate the total
activity to the available alternatives.  

Choice in GCAM is based on a single numerical value that orders the
alternatives by preference.  Generically, we call this the *choice
indicator*, $$p$$.  In practice the choice indicator is either cost or
profit rate, though other indicators are possible in principle.  In
cases where multiple factors influence a choice, such as passenger
transportation (where faster modes are more desirable), the additional
factors are converted into a cost penalty and added to the basic cost
to produce a single indicator that incorporates all of the relevant
factors.

## Choice Functions

A function that takes as input a vector of indicators and returns a
vector of market shares for the corresponding choice alternatives is
called a *choice function*.  Choice functions reflect that the single
best choice does not necessarily capture the entire market.  A variety
of factors not captured in the model, such as individual preferences,
local variations in cost, and simple happenstance cause some of the
market to go to alternatives that, based on their indicator alone, are
theoretically inferior choices.  

GCAM provides a flexible system for specifying choice functions at
runtime on a sector-by-sector basis.  Choice functions are represented
in the code by classes that implement the `IDiscreteChoice` interface.
Two such classes, the *Logit* and the *Modified Logit* are currently
provided.  

Both of these choice functions are part of a family of that assume
that the fitness of a choice alternative is a sum of two components,
one determined entirely by the choice indicator (*e.g.*, cost), and
another determined by factors not captured in the model.  This latter
component is assumed to be random with some specified distribution.
The particular distribution chosen determines the discrete choice
model in use.  

### The Logit 

The first of the two discrete choice models used by GCAM is the Logit
model<sup>[[1](#ref1)][[2](#ref2)]</sup>.  In the Logit model the
share $$s_i$$ of choice alternative $$i$$ (with cost $$p_i$$) is given
by

$$
s_i = \frac{\alpha_i \exp(\beta p_i)}{\sum_{j=1}^{N} \alpha_j
\exp(\beta p_j)}.
$$

In this expression, the $$\alpha_i$$ are the *share weights*.  Share
weights serve two purposes in the model.  First, they are used to
calibrate the model to observed historical values.  This calibration
procedure has the effect of absorbing regionally specific preferences
for particular choice alternatives (arising, for example, from
societal preferences, existing infrastructure, barriers to market
entry, or the like) into the share weight parameters.  Share weights
are also used in GCAM to provide for new technologies to be phased in
gradually.  GCAM accomplishes this by setting share weights for new
technologies to low values in the first year they are available and
gradually increasing them to a neutral value in later years.

The $$\beta$$ parameter is called the *logit coefficient*.  It
determines how large a cost difference is needed to produce a given
difference in market share<sup>[[3](#note3)]</sup>.  We can show this
by writing the expression for the ratio of market shares for two
options $$i$$ and $$j$$:

$$
\frac{s_i}{s_j} = \frac{\alpha_i}{\alpha_j} \exp(\beta (p_i - p_j))
$$

From this we see that the difference in market share depends
(considering share weights as fixed) entirely on the cost difference,
and the logit coefficient sets the scale for how large a cost
difference has to be to produce a significant effect.

### The Modified Logit

The second discrete choice model supported by GCAM is the Modified
Logit model<sup>[[4](#ref4)]</sup>.  In this model the share $$s_i$$
is given by

$$
s_i = \frac{\alpha_i p_i^\gamma}{\sum_{j=1}^{N} \alpha_j p_j^\gamma}
$$

As in the Logit model, the $$\alpha_i$$ are the share weights.  The
$$\gamma$$ parameter is the *logit exponent*<sup>[[5](#note5)]</sup>.  The
logit exponent performs an analogous role to the logit coefficient in
the Logit model.  The share ratio for this choice function is

$$
\frac{s_i}{s_j} = \frac{\alpha_i}{\alpha_j}
\left(\frac{p_i}{p_j}\right)^\gamma 
$$

Evidently, the ratio of the choice indicators serves a similar role in
the Modified Logit to the difference of the indicators in the Logit.
The value of the logit exponent $$\gamma$$ determines how large the
ratio must be to produce a significant difference in market share.
One consequence of this behavior is that the Modified Logit becomes
poorly behaved when one or more of the choice indicators approaches
zero.  GCAM handles this situation by putting a floor under the choice
indicator values<sup>[[6](#note6)]</sup>.  Any alternative with $$p_i
< 0.001$$, has its share calculated as if $$p_i = 0.001$$.  This floor
ensures that we can always calculate a valid share value, but at the
cost of suppressing any response to differences in choice indicators
below the floor.

### Comparison of choice models

The principal difference between the Logit and Modified Logit choice
models is that the former computes shares on the basis of differences
in the choice indicator, while the latter uses ratios.  As a result,
for indicators in the typical range for GCAM, the Modified Logit is
much less sensitive to incremental differences in the choice
indicator<sup>[[7](#note7)]</sup>. In the energy system this has the
effect of allowing high-cost technologies to retain more market share
than they would in the Logit case.  For a gradually increasing cost
adder, such as a greenhouse gas tax, it can take a long time to push
uncompetitive technologies completely out of the market.

One way of understanding this behavior is by recalling that the
underlying model for these discrete choice functions is of a fitness
function that is partially deterministic (represented by the choice
indicator, $$p$$) and partly random with a prescribed distribution.
In the Logit case the distribution is the *Generalized Extreme Value
(GEV)* distribution, while in the Modified Logit case the distribution
is the *Weibull* distribution.  

<p class="fig">
<img src="gcam-figs/logit-dist-cmp.png" alt="Comparison of choice function distributions"/><br/>
Figure 1: Comparison of the probability distributions underlying the
two choice functions.</p>

From Figure 1 it is apparent that changing the mean of a GEV
distribution while keeping its logit coefficient constant does not
change the shape of the distribution.  By contrast, changing the mean
of a Weibull distribution while keeping the logit exponent constant
makes the distribution broader or narrower.  

## Notes and References

<a name="ref1">[1]</a> Train, K. (2003), <cite>Discrete Choice Methods
with Simulation</cite>.

<a name="ref2">[2]</a> McFadden, D. (1973), "Conditional Logit
Analysis of Qualitative Choice Behavior", in <cite>Frontiers in
Econometrics</cite>.

<a name="note3">[3]</a> The logit coefficient $$\beta$$ may be either
positive or negative, depending on the interpretation of the choice
indicator $$p$$.  Having $$\beta < 0$$ favors lower values of $$p$$
and is therefore appropriate when $$p$$ represents cost (the usual
case in GCAM).  In the land system the choice indicator represents
profit rate, and we use $$\beta > 0$$ in these choice functions to
favor higher profit rates.

<a name="ref4">[4]</a> Clarke, J. F. and Edmonds, J. (1993), "Modeling
energy technologies in a competitive market", <cite>Energy
Economics</cite> 15 (2), 123 - 129.

<a name="note5">[5]</a> As with the $$\beta$$ coefficient in the Logit
model, the sign of $$\gamma$$ depends on the interpretation of the
choice indicator, with negative values favoring smaller $$p$$ and
positive values favoring larger $$p$$.

<a name="note6">[6]</a> This statement is actually only true in the
energy system.  In the land system (where the choice indicator is the
profit rate), shares are calculated normally for all $$p>0$$.  For
$$p\leq0$$ the share is automatically set to zero.

<a name="note7">[7]</a> This is not universally true.  For $$p \ll 1$$
tiny increments in $$p$$ can produce huge share differences.  For most
of GCAM, where $$p$$ represents cost, values in this range are
uncommon, but they do occur occasionally.
