---
layout: index
title: GCAM-MPI Message Specifications
prev: 
next:
gcam-version: v3.2 
---

These are the messages currently exchanged within GCAM-MPI and documentation of their internal formatting

Control Messages
----------------

QUIT  
Normal Exit. Proceed to cleanup. A QUIT message should be empty.

RUN  
Run a portion of the scenario with whatever parameters are currently set

|              |       |                                                                                                                  |
|--------------|-------|------------------------------------------------------------------------------------------------------------------|
| Start Period | (int) | First period to run. May be &lt;tt&gt;Scenario::RUN\_ALL\_PERIODS&lt;/tt&gt; to do all                           |
| End Period   | (int) | Period after the last period to run. Ignored if Start Period is &lt;tt&gt;Scenario::RUN\_ALL\_PERIODS&lt;/tt&gt; |

Input Messages
--------------

CLRLVL  
Clear any tax levels (i.e., levels set for quadrature points, *not* tax policies set with TAXFN) in a worker process. This behavior differs from a RESET message (q.v.), which will also clear any policies that have been set. After receiving this message a process will run only the primary run until further notice. A CLRLVL message is empty.

CSTMTD  
Specify the cost calculation method. Message consists of a single integer, which should be converted from the ParEmissCalc::costmethod enum type.

DATAREQ  
Specify the return data requested of a GCAM worker by a supervisor. The DATAREQ message should be sent only to a worker process. Supervisors do not use DATAREQ messages to communicate with one another because each supervisor has only one thing that it knows how to calculate; thus, communicating to them what they are expected to return is unnecessary.

|                                        |                           |                                                                                                                                                                                                                                                          |                                                                                                |
|----------------------------------------|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
|                                        | N&lt;sub&gt;t&lt;/sub&gt; | (int)                                                                                                                                                                                                                                                    | Number of targets to report.                                                                   |
| Repeat N&lt;sub&gt;t&lt;/sub&gt; times | target type               | (int)                                                                                                                                                                                                                                                    | Enum constant giving the type of target (concentration, forcing, etc.)                         |
| target period                          | (int)                     | Period in which the target should be evaluated. If &lt; 0, then evaluate at whatever year the target is at its maximum for the scenario.                                                                                                                 |
| target GHG                             | (char\[GHGNAMEMAX\])      | String indicating the greenhouse gas the target applies to. Pad with NUL characters if the name is shorter than GHGNAMEMAX. This field will be ignored if the target is not specific to a single GHG (e.g., forcing); however, it must still be present. |
|                                        | N&lt;sub&gt;e&lt;/sub&gt; | (int)                                                                                                                                                                                                                                                    | Number of GHG emissions to report.                                                             |
| repeat N&lt;sub&gt;e&lt;/sub&gt; times | emission GHG              | (char\[GHGNAMEMAX\])                                                                                                                                                                                                                                     | String indicating the GHG for which to report emissions. Pad with NUL characters as necessary. |

LINMIN  
Perform a line minimization starting along the line containing the input point and parallel to the input direction vector. The initial point and the direction vector must have the same length. In many runs the cost calculator will choose the first parameter of the model to satisfy a climate constraint. In these cases dummy values for the non-free parameter and the first component of the direction must still be provided.

|     |            |                                  |
|-----|------------|----------------------------------|
| N   | (int)      | Number of dimensions             |
| P   | (int\[N\]) | coordinates of the initial point |
| v   | (int\[N\]) | direction vector                 |

RESET  
Clear all run configuration in a worker process. This should return the worker to the state read in from XML at the code's start-up. There is no defined meaning for sending this to a supervisor process. A RESET message is empty.

TAXFN  
Specify a tax function, along with initialization parameters. Some subroutines may treat receiving a TAXFN message as implying a break with previous calculations, possibly requiring a reset to the function's internal state. Therefore, it should not be used to update the parameters of an existing tax function. Use TAXPARAMS for that.

*NB: We don't currently have a consistent way of treating multiple TAXFN messages for different GHGs. Worker processes treat them as cumulative (i.e., each new message adds another tax). The cost calculator, on the other hand treats them as mutually exclusive (i.e., each new TAXFN message replaces the last and triggers a RESET for the workers). Eventually we should probably create an option to have multiple taxes in a single TAXFN message.*

|                           |                                       |                                                                                                                                                                                          |
|---------------------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GHG                       | (char\[GHGNAMEMAX\])                  | String indicating the greenhouse gas the tax applies to. Pad with NUL characters if the name is shorter than GHGNAMEMAX.                                                                 |
| Type                      | (int)                                 | Enum constant indicating the type of function. The enum for function types is established in functionutils.hpp                                                                           |
| Region                    | (int)                                 | Enum constant indicating the region the tax applies to (Reserved for future development; currently ignored)                                                                              |
| Sector                    | (int)                                 | Enum constant indicating the sector the tax applies to (Reserved for future development; currently ignored)                                                                              |
| y&lt;sub&gt;s&lt;/sub&gt; | (int)                                 | Start year: the first year the tax is applicable.                                                                                                                                        |
| y&lt;sub&gt;e&lt;/sub&gt; | (int)                                 | End year: the end of the tax function. What happens after this time depends on the function type (see above). Most types currently treat it as constant at f(y&lt;sub&gt;e&lt;/sub&gt;). |
| N&lt;sub&gt;i&lt;/sub&gt; | (int)                                 | Number of immutable parameters. This must be compatible with the type selected for the function.                                                                                         |
| N&lt;sub&gt;p&lt;/sub&gt; | (int)                                 | Number of regular parameters.                                                                                                                                                            |
| immutable parameters      | (double\[N&lt;sub&gt;i&lt;/sub&gt;\]) | The values of the immutable parameters. Once set, these can only be changed by issuing a new TAXFN message (essentially creating a whole new function).                                  |
| regular parameters        | (double\[N&lt;sub&gt;p&lt;/sub&gt;\]) | The values of the regular parameters. These may be modified using a TAXPARAMS message.                                                                                                   |

TAXPARAMS  
Set new parameters to a previously initialized tax function.

|                           |                                       |                                                                                                                          |
|---------------------------|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| GHG                       | (char\[GHGNAMEMAX\])                  | String indicating the greenhouse gas the tax applies to. Pad with NUL characters if the name is shorter than GHGNAMEMAX. |
| N&lt;sub&gt;p&lt;/sub&gt; | (int)                                 | Number of regular parameters. This value must match the value used to initialized the function.                          |
| params                    | (double\[N&lt;sub&gt;p&lt;/sub&gt;\]) | Values of the parameters.                                                                                                |

TAXLVL  
Specify a tax level to evaluate as a variation from a previously set policy. Typically this would be used to evaluate a single point on the abatement curve for the policy in question.

|       |                      |                                                                                   |
|-------|----------------------|-----------------------------------------------------------------------------------|
| GHG   | (char\[GHGNAMEMAX\]) | Name of the GHG the tax level applies to. Must be padded if less than GHGNAMEMAX. |
| value | (double)             | Value of the tax level                                                            |

Output Messages
---------------

RSLT  
Return data from a worker task.

|                                        |                                       |                                                                                                                                                                                                                |                                                                                |
|----------------------------------------|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| rowspan=2|                             | N&lt;sub&gt;e&lt;/sub&gt;             | (int)                                                                                                                                                                                                          | Number of emissions blocks to follow                                           |
| N&lt;sub&gt;p&lt;/sub&gt;              | (int)                                 | Number of periods in each emissions block                                                                                                                                                                      |
| Repeat N&lt;sub&gt;e&lt;/sub&gt; times | Emission Type                         | (int)                                                                                                                                                                                                          | Enum constant indicating the type of emission                                  |
| Emission Value                         | (double\[N&lt;sub&gt;p&lt;/sub&gt;\]) | Emissions values, one per period                                                                                                                                                                               |
| Price Scale Factor                     | (double\[N&lt;sub&gt;p&lt;/sub&gt;\]) | Ratio of the tax level evaluated to the tax level passed in the TAXLVL message. This factor is necessary for cost methods that evaluate different tax levels in each period (e.g., Method III).                |
|                                        | N&lt;sub&gt;t&lt;/sub&gt;             | (int)                                                                                                                                                                                                          | Number of target blocks to follow                                              |
| Repeat N&lt;sub&gt;t&lt;/sub&gt; times | Target type                           | (int)                                                                                                                                                                                                          | Enum constant indicating the type of target (concentration, temperature, etc.) |
| GHG                                    | (char\[GHGNAMEMAX\])                  | String giving the name of the GHG the target applies to. Pad as necessary for short names. This field will be ignored for targets that do not apply to an individual gas, but the field must still be present. |
| Target Period                          | (int)                                 | The period at which the target was evaluated. This might be fixed, or might be determined from the data (e.g., the maximum value taken on by the target)                                                       |
| Target value                           | (double)                              | The value of the target in Target Period                                                                                                                                                                       |

RTN  
Miscellaneous returned data that does not conform to the standard set forth under RSLT. This message is a freeform response, the meaning of which is established by convention between supervisor processes. For example, a cost calculation process might return its cost as a single floating-point value via a RTN message.

Error Messages
--------------

This category of message is reserved for future use; none are defined at this time. Currently we handle serious errors by calling MPI\_Abort(), which brings down the entire calculation. We handle less serious errors by logging the error and trying to do whatever seems reasonable.
