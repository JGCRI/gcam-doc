---
layout: index
title: Using Git with GCAM
gcam-version: v5.1
devguide: dev-guide.html
---
## Using Git with GCAM

### Getting started with Git

GCAM uses the Git version control system to manage the source code and
data associated with the model.  Therefore, if you're not already
familiar with Git, the first step in getting started with developing
for GCAM will be to learn to use it.  Here are some resources for
getting started with Git:

* The [Pro Git](https://git-scm.com/book/en/v2) book (available for
  free online).  
  [Chapters 1-3](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
  cover the most important topics.  
* [Git training videos](https://www.youtube.com/playlist?list=PL0lo9MOBetEHhfG9vJzVCTiDYcbhAiEqL)
  from GitHub.  

Git can be used entirely through text commands, but there are also
graphical clients available, which provide a point and click
interface, along with some visualization capabilities to help you
understand how various branches relate to each other.

* [Atlassian SourceTree](https://www.sourcetreeapp.com)  
* [GitHub Desktop](https://desktop.github.com)  
* [Tortoise Git](https://tortoisegit.org) (Microsoft Windows only)  
* Many IDEs, including Xcode, Microsoft Visual Studio, PyCharm, and
  Rstudio, provide tools for working with Git.  
  
### GCAM repositories  

The dev team maintains two GCAM repositories, one internal and one
public.  The internal one is hosted on PNNL's
[Bitbucket Server](https://stash.pnnl.gov/projects/JGCRI/repos/gcam-core/browse)
(accessible only from the PNNL intranet) and is only usable by PNNL
staff.  The second is hosted on
[GitHub](https://github.com/JGCRI/gcam-core) and is open to anyone.

Both of these repositories serve as a place to distribute the released
versions of GCAM and as a place to collect new development that is
being considered for inclusion in a future release.  The public
repository will generally lag a bit behind the internal repository
because the public repository contains only those releases which have
been tested and approved for distribution, while the internal
repository also has candidate releases and experimental features that
have not been as thoroughly tested.

PNNL staff should use the internal server.  Your project lead will be
able to get you write access to the repository, and after that you can
push your branch (q.v. [creating branches](#Creating-branches)) to the
server and open a pull request
(q.v. [opening pull requests](#Opening-pull-requests)). 

Outside users should use the GitHub repository.  You will have read
access to this repository, but you won't be able to write to it.
Instead, if you want to do development, use the
[fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
button on GitHub to create your own copy of the repository.  You will
be able to create branches in your copy, and you will be able to open
pull requests from your copy back to the main repository.
  
### GCAM Git workflow

GCAM development uses the
[GitHub Flow](https://guides.github.com/introduction/flow/) workflow.
This lightweight process allows us to keep feature developments
synchronized, even when multiple development teams are working without
active coordination.  At the same time, the process is simple enough
that it doesn't add an inordinate amount of development to implement.

#### Creating branches

When you start to add a new feature, the first step is to create a new
branch for your development.  Generally, you should branch from the
most recent release version of GCAM.  This will usually be the most
recent commit on the `master` branch.  We have a lot of branches open
on the GCAM repository at any given time, so it's important to keep
the branches organized.  We use a hierarchical naming scheme with
names in the following form:  
```
<user>/<branch-type>/<name>
```  
The first part is a user identifier, so everyone knows whom to talk to
if they have questions about the branch.  For branches on Bitbucket,
use your initials for this part.  For branches on GitHub, use your
GitHub username.  The branch type is a descriptor indicating what the
purpose of the branch is.  The most common types are `feature`, for
new features, and `bugfix` for fixing bugs.  Other types include
`paper` (changes to support a paper you're writing), `project`
(changes supporting a long-running project), or `experimental`
(speculative development that may or may not eventually be adopted).
The final component is a descriptive name that gives an idea of
what kind of work you're doing on the branch.  You'll have to type
this fairly frequently, so don't make it too long.


#### Opening pull requests

Once you've made some progress on your development, you will want to
open a
[pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests).
Notionally, a pull request is a proposal to merge changes from your
branch into another branch (usually the `master` branch).  However,
opening a pull request also provides other developers with an
opportunity to review your code and give feedback, so you don't have
to wait until your code is ready to go before you open one.  Open a
pull request as soon you have some progress to share.  On GitHub, pull
requests can be marked as drafts, indicating that they are not yet
ready to merge.  Bitbucket doesn't have an equivalent feature, so if a
pull request is not ready to merge, it's a good idea to add the tag
WIP ("work in progress") to the description when you create it.
Otherwise the process is similar between the two platforms.

Once you have opened the pull request, you will probably get some
feedback from other developers.  Push additional commits to your
branch addressing the feedback or continuing the development, and they
will automatically be added to the pull request.  Eventually, when
your development is complete, you should mark your pull request as
ready to merge.  Before the branch can be merged, you will have to
write a change proposal (q.v. [GCAM Review Process](review.html)).

### Other tips

* Talk to someone on the core development team before you start a new
  development.  Finding out if a feature you have in mind is already
  being developed, or if it conflicts with something that is being
  developed, before you start can save you a lot of wasted effort. 
* Keep your branches small and focused.  Generally, you want a feature
  to be the smallest set of changes that will make sense as a unit.
  Combining two features on separate branches is a lot easier than
  separating them from a single monster branch.
* Commit early and commit often, but try to make sure that each commit
  at least builds, and preferably runs without errors.  
* If you make a mistake, and you haven't pushed the commit yet, use 
  `git commit --amend` to fix it in the old commit. 
* Where possible, _don't_ merge the target branch into your branch if
  it has had new material added since you branched.  If you need to
  merge the new code to test your code with it, do that on a test
  branch, and reserve the branch in the pull request for just new
  additions.  Doing it this way is a bit more work, but it makes it
  easier to backport your feature to an earlier release, should that
  become necessary.

