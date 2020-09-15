![CoreMedia Labs Logo](https://documentation.coremedia.com/badges/banner_coremedia_labs_wide.png "CoreMedia Labs Logo")

![CoreMedia Content Cloud Version](https://img.shields.io/static/v1?message=2007&label=CoreMedia%20Content%20Cloud&style=for-the-badge&labelColor=666666&color=672779 
"This badge shows the CoreMedia version this project is compatible with. 
Please read the versioning section of the project to see what other CoreMedia versions are supported and how to find them."
)
![Status](https://img.shields.io/static/v1?message=active&label=Status&style=for-the-badge&labelColor=666666&color=2FAC66 
"The status badge describes if the project is maintained. Possible values are active and inactive. 
If a project is inactive it means that the development has been discontinued and won't support future CoreMedia versions."
)

# Extensions for Publication Workflows

## Feature Overview

With the release _2007.1_ of _CoreMedia Content Cloud 10_ it is now possible to 
configure a customized workflow to be used in _CoreMedia Studio_.
This open source extension is a container for customized workflows and 
currently provides two new publication workflows which are both exemplary and 
ready to use in production:
* [Scheduled Publication](scheduled-publication-workflow/README.md): Publish CoreMedia documents at a specified time in the future automatically.
* [Three Step Publication](three-step-publication-workflow/README.md): Review CoreMedia documents and publish by different editors.  

## Container for Workflow Extensions

Each workflow extension is contained in a subfolder which in turn contains
all the modules for the workflow. The main [POM](pom.xml) though contains references
to modules to all contained workflows. 
Keep the references to the workflow you want to use and delete the references 
to the workflows you want to exclude.

## Versioning

To find out which CoreMedia versions are `supported by this project, 
please take look at the releases section or on the existing branches. 
To find the matching version of your CoreMedia system, please checkout the branch 
with the corresponding name. For example, if your CoreMedia version is 2007.1, 
checkout the branch 2007.1.


## Documentation & Tutorial

* **Documentation**

    Each workflow extension has its own documenation.    

* **[Changelog](CHANGELOG.md)**

    for recent changes

* **[Issues](https://github.com/CoreMedia/coremedia-additional-workflows/issues)**

    for known bugs and feature requests

## CoreMedia Labs

Welcome to [CoreMedia Labs](https://blog.coremedia.com/labs/)! This repository
is part of a platform for developers who want to have a look under the hood or
get some hands-on understanding of the vast and compelling capabilities of
CoreMedia. Whatever your experience level with CoreMedia is, we've got something
for you.

Each project in our Labs platform is an extra feature to be used with CoreMedia,
including extensions, tools and 3rd party integrations. We provide some test
data and explanatory videos for non-customers and for insiders there is
open-source code and instructions on integrating the feature into your
CoreMedia workspace. 

The code we provide is meant to be example code, illustrating a set of features
that could be used to enhance your CoreMedia experience. We'd love to hear your
feedback on use-cases and further developments! If you're having problems with
our code, please refer to our issues section. If you already have a solution to 
an issue, we love to review and integrate your pull requests. 

