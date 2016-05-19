---
layout: index
title: GCAM-parallel
prev: 
next:
gcam-version: v3.2 
---

GCAM-parallel is a set of extensions to GCAM that allow the model to be computed as a parallel computation across all of the processors on a single machine. Depending on the number of processors available, this parallelism can speed up model evaluations by as much as a factor of 8. The extensions were designed to be minimally intrusive, so most of the changes are confined to a new GCAM module. The parallel computation capability can be enabled or disabled at compile time using an option in the &lt;tt&gt;configure.gcam&lt;/tt&gt; file.

System Requirements
-------------------

Currently GCAM-parallel is supported only on unix-like environments, such as Linux or Mac OSX. You will also need a copy of the Threading Building Blocks (TBB) library. TBB is available from <http://threadingbuildingblocks.org> under an open-source license. GCAM has been tested against [TBB version 4.0 update 4](http://threadingbuildingblocks.org/ver.php?fid=185).

Using GCAM-parallel
-------------------

### Compiling

To build the parallel version of GCAM, first obtain a copy of TBB. Build and install it according to the instructions contained in the TBB distribution. Enable the parallel modules by setting &lt;tt&gt;GCAM\_PARALLEL\_ENABLED = 1&lt;/tt&gt; in &lt;tt&gt;[configure.gcam](GCAM_Build_Configuration "wikilink")&lt;/tt&gt;. There are also a few environment variables that will need to be set:

-   &lt;tt&gt;TBB\_INCDIR&lt;/tt&gt; - The top-level directory containing the TBB header files. The header files themselves should be in a directory called &lt;tt&gt;tbb&lt;/tt&gt;, so, for example, the main TBB header will be &lt;tt&gt;$TBB\_INCDIR/tbb/tbb.h&lt;/tt&gt;
-   &lt;tt&gt;TBB\_LIBDIR&lt;/tt&gt; - Location of the TBB library files. The libraries should be directly in this directory (*i.e.*, without a tbb subdirectory like the one under $TBB\_INCDIR)
-   &lt;tt&gt;TBB\_LINK\_DEBUG&lt;/tt&gt; *(Optional)* - Setting this environment variable to 1 will use debug versions of the TBB libraries. Setting it to anything else, or leaving it unset, will use the normal libraries.

If you have previously built GCAM, you will have to run &lt;tt&gt;make clean&lt;/tt&gt; at this point. After that, &lt;tt&gt;make gcam&lt;/tt&gt; will build a parallel-enabled version of gcam and place it in the &lt;tt&gt;exe&lt;/tt&gt; directory, under the top level of the GCAM working directory. The final program is called &lt;tt&gt;gcam.exe&lt;/tt&gt;, just like the regular (non-parallel) version, so it will overwrite the previous version of the GCAM executable file, if any.

### Running

GCAM-parallel adds one additional parameter, &lt;tt&gt;parallel-grain-size&lt;/tt&gt;, to the GCAM configuration file. It is set in the "ints" section of the main configuration file: &lt;code&gt;

`<Value name="parallel-grain-size">10</Value>`

&lt;/code&gt; This parameter controls the target grain size in the parallel decomposition. Actual grain sizes may differ significantly from the target, depending on the details of the flow graph structure, so the value supplied for this parameter is only a rough approximation to the actual grain size that emerges from the decomposition. However, there is a general correlation between the value of &lt;tt&gt;parallel-grain-size&lt;/tt&gt; and the amount of parallelism and overhead at run time. Larger values will produce less parallelism, but also less overhead, while smaller values will produce more parallelism and overhead. Although we have not yet determined what value of this parameter corresponds to the optimal trade off between parallelism and overhead, values between 20 and 50 have been observed to produce satisfactory results. Some values less than 20 have been observed to produce good parallel performance, but only at the cost of long (80 seconds or more) run times for the graph analysis. Consequently, values less than 20 are not recommended. If no value is specified, the default value of 30 will be used.

The parallel extensions also add several additional log files:

-   &lt;tt&gt;parallel\_debug\_log&lt;/tt&gt;: This log traces the values being written to and read from the marketplaces in the code. It is used to debug apparently incorrect results from the parallel versions of the calculation. The logging instances are actually commented out in the code because invoking a logging operation (*e.g.*, &lt;code&gt;mylog &lt;&lt; "Log message";&lt;/code&gt;) creates a substantial amount of overhead *even if* the log configuration is set to produce no output at that logging level. Enable this logging *only* if you are trying to track down a discrepancy between serial and parallel versions of the code.
-   &lt;tt&gt;flow-graph-log&lt;/tt&gt;: The subroutine that builds the flow graph structure writes a depiction of the flow graph it produces in dot format into this log.
-   &lt;tt&gt;parallel-grain-log&lt;/tt&gt;: The subroutine that builds the grain graph writes a depiction of the grain graph into this log. Like the flow graph output, it is in dot format.

Apart from the additional integer parameter and log files, the procedure for running the code and the output from it are identical to those in standard GCAM. TBB will automatically detect the number of processors available and will place worker threads on all of them. For this reason, you will get the best performance by running GCAM-parallel on a system that is completely dedicated to the run, but a dedicated system is not absolutely necessary. However, in no case should you attempt to run more than GCAM-parallel on a single computer or cluster node. The two (or more) instances will compete for resources and will end up running considerably slower than they would have run consecutively.

### Evergreen

Users running on Evergreen (or similar clusters) have a couple of options for submitting GCAM-parallel as a batch job (you should not try to run it on one of the login nodes). You must ensure that the system does not attempt to run more than one GCAM instance per node. The best way to do this is to put the following in your batch script: &lt;code&gt;

`#PBS -l nodes=1`
`#PBS -l walltime=10:00`
`#PBS -l pmem=40gb`
`#PBS -A gcam`
`set bindir=/lustre/data/rpl/gcam-parallel/exe`
`set wdir=$bindir`
`cd $wdir`
`time gcam.exe -Cconfig-g500.xml -Llconf-g500.xml`

&lt;/code&gt; By reserving 40GB of memory for each GCAM-parallel process, you will ensure that no other processes are scheduled on that node, even though there are (so far as the scheduler knows) unused processors on the node.

### Hyperthreading

If a machine has hyperthreading enabled, the TBB libraries will detect the hyperthreading slots as additional processors, and it will run worker threads on them. So far we have not been able to test performance with and without hyperthreading, so we cannot say for certain whether having hyperthreading enabled is helpful, harmful, or neutral for performance. This is something we will investigate going forward.

Implementation Details
----------------------

### The GCAM Data Flow Graph

<img src="Gcam-usa-energy-small.png" title="fig:Flow graph for the energy portion of the USA region. There are additional independent tasks in the USA region, and each region is currently independent of all the others." alt="Flow graph for the energy portion of the USA region. There are additional independent tasks in the USA region, and each region is currently independent of all the others." width="400" /> Parallel analysis of GCAM begins with the construction of a flow graph, which describes all of the computational tasks required for a single GCAM evaluation and the dependencies between them. Most of the work required to produce this graph, *including* breaking cyclic dependencies, is produced by the topological sort in the standard (*i.e.*, serial) GCAM code. The parallel module translates the graph produced by the GCAM topological sort into a set of data structures suitable for further analysis.

In theory, the flow graph produced at this stage of the calculation is suitable for parallelizing GCAM. In practice, however, the amount of computation in each task is small enough that parallelizing at this granularity would create excessive overhead due to the time required to schedule and dispatch tasks. Therefore, it is necessary to aggregate portions of the graph into parallel "grains" that will be scheduled and executed as a unit. That is, all of the tasks within a grain will be executed serially on a single processor, while independent grains may be executed in parallel. The advantage of this strategy is that aggregation increases the amount of useful work done on each cycle of scheduling and dispatch, reducing the overhead. The disadvantage is that aggregation reduces the amount of parallelism available in the graph. The ideal granularity reflects a trade off between these two competing factors.

### Graph Analysis

<img src="Gcam-usa-clans-small.png" title="fig:Hierarchical breakdown of the full GCAM USA region (a superset of the graph in the previous figure)." alt="Hierarchical breakdown of the full GCAM USA region (a superset of the graph in the previous figure)." width="300" /> Parsing a flow graph into grains begins with a hierarchical breakdown of the graph into a tree of aggregations called "clans." Each clan is an aggregation of nodes from the original flow graph, such that a node outside the clan that is an ancestor of any member is an ancestor of all members, and a node outside the clan that is a descendant of any member is a descendant of all members.&lt;ref&gt;In practice, we make a pass through the graph using both of these conditions, and then if necessary make a second pass in which we reparse subgraphs that could not be further decomposed ("primitive" subgraphs) with the second requirement relaxed for the source nodes of the subgraph. We are able to do this because adding extraneous dependencies does not cause the code to generate incorrect answers.&lt;/ref&gt; The practical effect of these conditions is that the preconditions for running tasks in a grain are uniform across the grain. Thus, as soon as the first task in a grain is ready to run, we can run the entire grain without further dependence checking.

As the clans are constructed and inserted into the tree, each is tagged as "independent," meaning its children can be run concurrently, or "linear," meaning its children must be run in sequence. "Children" in this context refers to the clans in the next level of the tree, not necessarily the individual tasks that make up the clan. Thus, an independent clan might have, for example, five child clans, each of which is linear. This scenario represents five distinct linear paths through the graph, all of which can be run concurrently, but which must maintain their internal ordering.

<img src="Gcam-usa-grain020.png" title="fig:Grain flow graph of the GCAM USA region with a target grain size of 20 tasks per grain. Note that some grains end up being significantly larger or smaller than the target size" alt="Grain flow graph of the GCAM USA region with a target grain size of 20 tasks per grain. Note that some grains end up being significantly larger or smaller than the target size" width="300" /> Once we have assembled the tree of clans, we can walk down the tree until we find clans that are close in size to our desired grain size. We make grains out of those clans, and we use the information in the original flow graph to create dependence edges between the grains. The TBB flow graph library can then use this grain flow graph to dispatch the tasks in a GCAM parallel evaluation.

### Invoking a Parallel Model Evaluation

A parallel model evaluation is invoked by calling &lt;tt&gt;World::calc()&lt;/tt&gt; with a second argument that is a pointer to a TBB flow graph. The prototype for this call is: &lt;code&gt;

`void World::calc(int period, GcamFlowGraph *work_graph);`

&lt;/code&gt; The World class stores a pointer to the global flow graph, so full model evaluations can be run by calling: &lt;code&gt;

`world->calc(aPeriod, world->getGlobalFlowGraph());`

&lt;/code&gt; In principle, partial model evaluations (such as those that occur when computing partial derivatives) could be accomplished by creating a flow graph containing just the tasks of interest and passing that to the version of &lt;tt&gt;World::calc()&lt;/tt&gt; above. However, the GCAM setup functions currently do not generate any partial flow graphs. Partial evaluations can be performed serially by calling the standard version of &lt;tt&gt;World::calc()&lt;/tt&gt;: &lt;code&gt;

`   const std::vector<IActivity*>& affectedNodes = mkts[partj].getDependencies();`
`   world->calc(period, affectedNodes);`

&lt;/code&gt; There is also a mechanism for passing a mask that allows you to run the global flow graph while skipping undesired nodes.

### Critical Sections

Whenever a thread accesses data that is shared with other threads, the code must take care to avoid race conditions. Typically, one mitigates potential race conditions by using a mutex lock to ensure that only one thread has access to code manipulating a shared variable at a time. Code protected in this way is called a "critical section." Critical sections are deleterious to performance because they force otherwise concurrent code to be serialized; therefore, they should be avoided whenever possible.

The principal source of potential race conditions in GCAM is updates to market supplies and demands. Generally, each market has several sectors that independently add to these quantities, and there is no guarantee that their tasks will be executed in the same grain (which would force them to be serialized)&lt;ref&gt;This is not a concern for the price member variable, which is updated entirely from a single computational task&lt;/ref&gt;. In this case, we avoid having a critical section by replacing the market member variables representing supply and demand with &lt;tt&gt;tbb::combinable&lt;/tt&gt;. The combinable class allows each thread to create a thread-local copy of the underlying variable. The class supports the &lt;tt&gt;combine()&lt;/tt&gt; method, which performs a reduction operation over the extant thread-local copies. For example, &lt;tt&gt;demand.combine(std::plus&lt;double&gt;)&lt;/tt&gt; will sum the thread-local partial results. The &lt;tt&gt;tbb::combinable&lt;/tt&gt; class can avoid critical sections for any concurrent operation that can be expressed as a reduction over partial results. TBB also provides the &lt;tt&gt;tbb::enumerable\_thread\_specific&lt;/tt&gt; class to provide thread-local storage for cases where the final result is not expressible as a reduction. Either of these mechanisms should be used wherever possible in preference to critical sections.

Another, non-obvious source of critical sections can be found in the standard library's I/O classes and in classes derived from them, such as the GCAM logger classes. The loggers are particularly insidious, since they incur the critical section overhead even when the logging level is set such that they produce no output. ***Merely setting the logging level to suppress output is not sufficient to avoid overhead.*** Therefore, logging should be used within functions called by &lt;tt&gt;World::calc()&lt;/tt&gt; *only* for debugging purposes. Logging calls in those functions should be *completely* removed (either by deletion or commenting out) for production GCAM builds.

Footnotes and References
------------------------

&lt;references/&gt;
