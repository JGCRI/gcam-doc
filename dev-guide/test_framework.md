---
layout: index
title: GCAM Testing Framework
gcam-version: v5.4
devguide: dev-guide.html
---
## GCAM Testing Framework
This page is here to serve as guidance for GCAM developers who may need to update or extend the GCAM Testing Framework.  Note the GCAM testing framework is meant to automate many of the steps developers must do to verify their changes do not break GCAM on any of the platforms GCAM is known to run on.  The services we use to do this are provided internal to PNNL, as noted below, therefore they cannot be used outside of the network.

### Notes on initializing and updating the testing framework
Most users will interact with the testing framework only through the pull request interface and will not need to worry about updating the testing framework.  Some instances of when they would need to update include:
* Updating any of the third party library dependencies (excluding gcamdata as that is self contained in the `DESCRIPTION` file)
* They need to extend or add tests
* A change that affects the way we run Core scenarios such as how we run a policy

As described in the details [below](test_framework.html#background) the testing framework is contained in it's own Git repository but included in the GCAM core repository as a submodule.  Thus to get the scripts you will need to update it:
```
> cd <GCAM workspace>
> git submodule update --init util/testing-framework
```

To understand how the testing framework is organized and how it all fits together users can read the detailed description [below](test_framework.html#background).

The development cycle is the same as any other:
```
> cd util/testing-framework
> git checkout -b my-new-feature-branch
> # make the required changes
> git add .
> git commit
> # don't forget to push your changes!
> git push
```

However where it differs is we now need to update the submodule "pointer" in the GCAM workspace as well:
```
> cd ../../
> git add util/testing-framework
> git commit
> git push
```

At this point you can open your pull request and the automated tests will use your updated testing framework automatically.  In addition no other pull requests will yet be affected!  At this point you should also open a pull request in the [gcam-testing-framework repository](https://stash.pnnl.gov/scm/jgcri/gcam-testing-framework.git) and link to it from your GCAM pull request so all changes can be considered together.

### Background
The following software / serices may be useful to review and describe their purpose given users may not be familiar with them.  Note we are relying on these services being provided by PNNL's Dev Central which is currently being provided free of charge code.  It does of course imply these tests can only be launched from inside the PNNL network.

#### Bitbucket (aka stash)
We have been using Bitbucket to manage the internal GCAM Git repository.  It is only worth mentioning since within the  "Pull Request" section is where most users will interact with the testing framework.  
Note the JGCRI project is located at: https://stash.pnnl.gov/projects/JGCRI

#### Jenkins
Jenkins provides a "continuous integration" service, which simply means regularly run some arbitrary set of tests on your version controlled code.  It is extremely flexible in terms of how to configure and run tests.  In addition PNNL has configured several "build servers" available through Jenkins to use with varying pre-installed tools and operating systems.  
Note the JGCRI project is located at: https://ci.pnnl.gov/jenkins/job/JGCRI/

#### Artifactory
Artifactory is essentially a file server.  You can upload any arbitrary files to save there, attach meta data and have multiple versions of.  In addition it offers front ends to serve as a local proxy for such services as CRAN (R packages), Docker Hub, PyPi (Python packages), and many more.  
You can browse the files at: https://artifactory.pnnl.gov and specific locations where we will save artifacts are noted below.

### Docker
Not as essential to the testing framework but it will come up so we will describe it.  Docker is a set of tools which aims to allow users to package everything required to run their software, including the operating system, inside a minimal client.  A user can subsequently "pull" this software container and run it with a docker client on their local operating system, whatever it may be, and can make certain local resource, such as a folder containing GCAM, available inside the docker container.  Finally Docker provides a "Docker hub" website as a means to publish your containers, not only for other users to run but also extend to make new containers.

#### Pull Request Notifier Plugin for Bitbucket
This is a plugin to Bitbucket which allows us to signal Jenkins when to kick off tests.  This plug can trigger on any Bitbucket action, such as pull request opened or updated.  It makes available a number of useful meta data about what happened and will send it off to some arbitrary URL.  In addition it allows us to add a new menu option with in the pull request and even configure arbitrary forms to collect user input to send along too.  The full documentation of what is possible is on it's Github page: https://github.com/tomasbjerre/pull-request-notifier-for-bitbucket

#### Generic Webhook Plugin for Jenkins
This is the counterpart for the "Pull Request Notifier for Bitbucket".  It will listen for notifications, unpack the metadata, and launch the configured test based off of the metadata.
Documentation, again on it's Github page: https://github.com/jenkinsci/generic-webhook-trigger-plugin

#### Notify Bitbucket Instance Plugin for Jenkins
A plugin to update the build status (In Progress, Failure, Success) in Bitbucket.  The Jenkins plugin takes care of all of the details for us automatically filling in the name of the test, build number, and link back to Jenkins so a user can watch the progress / look at logs or build artifacts after the fact.  
The plugin makes use of [Bitbucket Build Status API](https://developer.atlassian.com/server/bitbucket/how-tos/updating-build-status-for-commits/) which actually need to call directly to add / update the builds status of the jobs submitted on PIC.

### Testing Framework Scripts
All of the testing framework scripts and associated data have been placed into their own Git repository at https://stash.pnnl.gov/scm/jgcri/gcam-testing-framework.git

However it has been included in the gcam-core Git repository as a "Submodule" stored in "util/testing-framework".  Again, note that this is on the internal repository so won't be available form outside the PNNL network.  A Git Submodule is essentially a version controlled pointer.  It allows us to say version AAA of GCAM requires version BBB of gcam-testing-framework.

Thus, let's take as an example, if a user creates a branch in which they update the version of the BaseX library.  They can create a branch in the testing framework that will install the updated BaseX for testing as well; and update the submodule pointer to point to that branch in the testing framework.  In this way the tests from this pull request will run just fine with the updated version of BaseX.  And existing pull requests would not be affected so would continue to run just fine with the old version of BaseX.

Most GCAM users will never need to actually "initialize" this submodule and so won't affect them.  Jenkins is configured to "initialize" ALL submodules (which it would have had to do to get hector anyways) so it will get the testing scripts with it's checkout of the gcam-core.

#### Jenkinsfile Script
Jenkins allows us to define tests as arbitrary scripts in what it calls "Jenkinsfile" scripts.  This allows us lots of flexibility to do what we need.  The downside is the language these scripts are written in is Groovy, a Java based scripting language.  Because all of the build steps are contained in these scripts we can re-use them to run multiple Jenkins "tests" such as one triggered by a Bitbucket pull request or one triggered monthly.

#### The Configured Test

#### Launch Windows Tests
We have configured a "Pull Request Notifier" which is triggered on:
* Pull request open
* Pull request has commits added (`RESCOPED_FROM`)

It will notify Jenkins with the "JGCRI-gcam-windows" tag with the meta data:
* `PULL_REQUEST_FROM_BRANCH`
* `PULL_REQUEST_ID`
* `PULL_REQUEST_USER_DISPLAY_NAME`

Jenkins will the trigger the [JGCRI/gcam-windows](https://ci.pnnl.gov/jenkins/job/JGCRI/job/gcam-windows/) test.  It will checkout the `$PULL_REQUEST_FROM_BRANCH` and run the script `util/testing-framework/windows/Jenkinsfile`. It will run on the `windows-build-02` build executor which already has the development tools we need in installed:
* R 3.5
* MsBulid 15.0 / Visual Studio 2017
* Java 1.8

From there we will need to perform the following steps:
1. Build the `gcamdata` package to generate XMLs
  * Create some space inside of our workspace to install the R packages
  * Install the `devtools` package
  * Install the `testthat` package
  * Use `devtools::install_deps()` to install the latest version all of the rest of the gcamdata R package dependencies
  * Load `gcamdata` and run the driver making XMLs only

2. Compile GCAM
  * We need to install the third party libraries GCAM requires to compile including boost, and xerces-c.  Instead of trying to build them from scratch as part of the test we instead stored the pre-built versions on Artifactory at: https://artifactory.pnnl.gov:443/artifactory/generic-pnnl/JGCRI/libs/windows
  * Note because we wanted avoid having to store and unzip the boost headers we instead use the fact that we need to we install the "BH" R package to my advantage and get the headers from there.  Unfortunately in Windows you need administrative privileges to make "symlinks" so we have to move the headers around.
  * Call the MsBuild tool pointing it to the Visual Studio project file and telling it to build the Release target and x64 platform.

3. Run the reference scenario
  * We will need the Java jars to be able to write to the BaseX DB.  We have included those in Artifactory under https://artifactory.pnnl.gov:443/artifactory/generic-pnnl/JGCRI/libs/jars
  * On windows we need to be able to find the `JAVA_HOME` so that we can update the `PATH` and find `jvm.dll`.  To do this We replicate the approach we implemented in the `run-gcam.bat` script we include in the release package, run:  `java -cp ..\\libs\\jars\\*;XMLDBDriver.jar XMLDBDriver --print-java-home`
  * Finally run `gcam.exe -C configuration_ref.xml`

4. Clean up
  * At the moment this only entails deleting the `database_basexdb` which would otherwise accumulate across all tests over time

#### Launch Linux Tests
We have configured a "Pull Request Notifier" which is triggered on:
* Pull request open
* Pull request has commits added (`RESCOPED_FROM`)

It will notify Jenkins with the "JGCRI-gcam-linux" tag with the meta data:
* `PULL_REQUEST_FROM_BRANCH`
* `PULL_REQUEST_ID`
* `PULL_REQUEST_USER_DISPLAY_NAME`

Jenkins will the trigger the [JGCRI/gcam-linux](https://ci.pnnl.gov/jenkins/job/JGCRI/job/gcam-linux/) test.  It will checkout the `$PULL_REQUEST_FROM_BRANCH` and run the script `util/testing-framework/linux-docker/Jenkinsfile`.  Neither of the linux build executors had the development tools we require already installed, perhaps with the exception of Java.  The dev central team recommended using Docker to create the build environment we required, and given the base operating system of your typical Docker image is some flavor of linux this seemed like a good approach.  Thus we use the `docker-rhel-7` build executor.

Since we want to make sure we are always testing with the very latest R packages we rebuild the rebuild the gcamdata Docker image from scratch each time from `util/testing-framework/linux-docker/docker-gcamdata/Dockerfile`.

For the Docker image to compile GCAM we build it from the Dockerfile `linux-docker/docker-gcam-build/Dockerfile`.

Then to build and run we will need to perform the following steps:
1. Build the `gcamdata` package to generate XMLs
  * Build and run the `gcamdata` Docker image as described above
  * Update R packages just in case the CRAN versions got updated before the Docker base image did
  * Load gcamdata and run the driver making XMLs only

2. Compile GCAM
  * Build the `gcam-build` Docker image as described above
  * Run make gcam

3. Run the reference scenario
  * Inside the same `gcam-build` docker image run `./gcam.exe -C configuration_ref.xml`

4. Clean up
  * At the moment this only entails deleting the `database_basexdb` which would otherwise accumulate across all tests over time

#### Launch PIC Runs
We have configured a Pull Request Notifier "Button" labeled "Launch Validation Runs" and contains the check box form options:

##### Delete existing DBs
If we should exist delete any previously existing output database **per scenario**.  The default is true so that if a user needs to continually re-run they do not accumulate large databases unnecessarily.  It may be useful to uncheck this option however if you made some update to your pull request but need to compare results from the last time it was run to compare behavior.

##### Select which scenarios to run:
This defaults to the set of scenario we currently require users to run: Ref, Ref + 2.6; SSPs,  SSPs + SPA 2.6.  However all of the SPA climate target levels in the committed `batch_SSP_SPA*.xml` are available.  Note this button form was generated manually but the actual scenarios available are generated from the batch files committed in the gcam-core repo.

When the "button" is clicked and a user confirms, It will notify Jenkins with the "JGCRI-gcam-pic" tag with the meta data:
* `PULL_REQUEST_FROM_BRANCH`
* `PULL_REQUEST_ID`
* `PULL_REQUEST_USER_DISPLAY_NAME`
* `BUTTON_FORM_DATA`

Jenkins will then trigger the [JGCRI/gcam-pic](https://ci.pnnl.gov/jenkins/job/JGCRI/job/gcam-pic/) test.  It will checkout the `$PULL_REQUEST_FROM_BRANCH` and run:
* Save `$BUTTON_FORM_DATA` into a file `user_options.json` which can be processed later when we are setting up the runs on PIC
* rsync the current workspace to PIC at `/pic/projects/GCAM/gcam-ci-run/${PULL_REQUEST_ID}`
* Run the script `util/testing-framework/pic/run_tests.sh` on PIC via ssh and passing the arguments: `$BUILD_NUMBER $PULL_REQUEST_ID $GIT_COMMIT`

`run_tests.sh` takes care of:
* Update the "PIC verification run setup" build status in the pull request to `IN_PROGRESS`
* `make xml`
* `cp ~/gcam-core-clean/input/extra/transportation_UCD_SSP* input/extra/`
* `make -j 8 gcam`
* Run `parse_gcam_batch.R exe/configuration_ref.xml ${FRAMEWORK_DIR}/batch_core_ref.xml`
* Run `parse_gcam_batch.R exe/configuration_policy.xml ${FRAMEWORK_DIR}/batch_core_policy.xml`
* Run `parse_gcam_batch.R exe/configuration_ref.xml exe/batch_SSP_REF.xml`
* Run `parse_gcam_batch.R exe/configuration_ref.xml exe/batch_SSP_SPA1.xml`
* Run `parse_gcam_batch.R exe/configuration_ref.xml exe/batch_SSP_SPA23.xml`
* Run `parse_gcam_batch.R exe/configuration_ref.xml exe/batch_SSP_SPA4.xml`
* Run `parse_gcam_batch.R exe/configuration_ref.xml exe/batch_SSP_SPA5.xml`
* Update the "PIC verification run setup" build status in the pull request to `SUCCESS`

`parse_gcam_batch.R` takes care of:
* Parse the configuration and batch XML using the `xml2` package
* Parse the `user_options.json` using the `jsonlite` package
* Update the config file to turn off all outputs except the XMLDB and turn on "append-scenario-name" for the XMLDB output
* Turn off "BatchMode" and "find-path" (the later may get re-enabled later of course)
* Get a list of all "BatchRunner/ComponentSet" + "BatchRunner/runner-set" → "FileSet"
* Use `expand.grid` to generate permutations
* Loop over each permutation
  * `paste0` together FileSet names to generate the scenario name
  * Skip if the scenario is not in the `user_options[["scenario_run_list"]]`
  * If the batch file had "SSP" in the name then clear out the `<ScenarioComponents>`
  * If the current "FileSet" was really from a runner-set (and not single-scenario-runner) then set "find-path" to 1 and update "policy-target-file" accordingly
  * Otherwise append to contents of the FileSet to the `<ScenarioComponents>`
  * write out the generated config XML
  * Run `stage_run.sh` with the arguments: `scenario, config_file_name, length(user_options[["clear_output"]]` (the last will give 0 if that check box was not selected and 1 if it was)

`stage_run.sh` takes care of:
* Clear the output database if so configured
* Delete the folder  `exe_${SCENARIO}` if it existed previously
* Copy `exe` to `exe_${SCENARIO}`
* Move `$CONFIGURATION_FILE` to `exe_${SCENARIO}/configuration.xml`
* Copy in `run_gcam.sbatch`
* Generate JSON files to update the Build status message in the pull request for `$SCENARIO`
* Submit `run_gcam.sbatch` to the PIC job scheduler

Once `run_gcam.sbatch` is run by the SLURM scheduler it:
* Sets a time limit of 10 hours
* Runs `./gcam.exe -C configuration.xml`
* Updates the build status including of error (even job timeout) using the previously generated JSON files from `stage_run.sh`

