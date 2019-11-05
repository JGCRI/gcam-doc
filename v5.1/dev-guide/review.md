---
layout: index
title: GCAM Review Process
gcam-version: v5.1
devguide: dev-guide.html
---
## GCAM Review Process

### Overview of the GCAM Core Model Review Process

The GCAM core model review process is intended to provide flexibility to engage the appropriate staff on all proposals and to ensure a timely and thorough review of proposals. It is also intended to provide a repository of documentation on improvements we have made to the model. This means that each core model proposal should provide a thorough overview of the model change that can serve as documentation. Finally, the core model review process is also intended to provide a forum whereby staff can keep abreast of changes to the model either by visiting the page or by participating in proposal reviews. 

### GCAM Core Model Proposal and Pull Request

Making a change to the GCAM core model requires two different documents: a core model proposal and a pull request.

#### Core model proposal

There are five basic parts of a core model proposal: purpose, personnel, description of changes, validation, and documentation updates. The purpose is typically 1-2 sentences describing the goal of the model development. The personnel section lists those who worked on the development. The description of changes should describe all changes made to GCAM (both C++ code changes and gcamdata system changes). This section can include equations, links to papers, tables of data, etc. The validation section should include figures comparing the modified version of GCAM to the current master version. We typically require comparisons for the core model + 5 SSPs, for both Reference and 2.6 W/m<sup>2</sup> scenarios. The figures will depend on the specific model development (e.g., if you are making a change to the energy system, more energy-related figures will be required than if you are changing something related to water demands). In general, you should include figures that demonstrate the extent of the changes on GCAM and reviewers will ask for more if needed. The documentation update section describes any changes required to the GCAM documentation pages to reflect the changes made in your proposal.

If you have access to PNNL resources, then the core model proposal should be completed on [Confluence](https://confluence.pnnl.gov/confluence/display/JGCRI/GCAM+Core+Model+Proposals). If you do not have access, someone from PNNL will work with you to get the proposal properly entered. 

#### Pull request

After the coding changes are complete, a pull request should be opened either on GitHub (external developers) or on stash (internal developers). Please ensure your developments follow the [GCAM style](style.html) and that the description of your pull request is meaningful. 
 
### The Review

After the core model proposal and the pull request are completed, reviewers will be assigned to the proposal. Reviewers are chosen based on expertise and typically include both developers and users of GCAM. Reviewers will look over both the proposal and pull request, checking to see that (1) the changes are scientifically and technically correct, (2) coding standards are followed, (3) all changes in the pull request are documented in the proposal, and (4) the proposed documentation updates reflect the modified model.





