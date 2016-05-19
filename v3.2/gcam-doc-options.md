---
layout: index
title: Options for GCAM Documentation Hosting
prev: gcam-doc-options.html
gcam-version: v3.2
---

[Back to top](index.html)

# Options for GCAM Documentation Hosting

I've narrowed down the options for hosting the GCAM documentation to
a few options that will likely work for us.  These options offer
tradeoffs between ease of use and features.  Generally, the more
control you have over the appearance of the final product, the more
work you have to put into deciding how the product should look.

## Free hosting

All of the options in this section are hosted free of charge.
  
* **GitHub Pages**:  This is a more elaborate option provided by
  GitHub.  It uses the Jekyll content management system.  As a result,
  it provides support for themes, fancy layouts, and periodically
  updated content like blogs or news posts.  The content is written in
  markdown, so formatting the documentation won't be too hard.  GitHub
  also has some tools to help with selecting a theme and layout.  If
  we're happy with one of the standard options, we could probably be
  up and running rather quickly.
  
* **readthedocs.org**: This is a site that specializes in hosting
  documentation for open-source projects.  The primary advantage of
  this option is that it has the ability to pull documentation
  directly from the code repository and generate up to date docs
  continuously.  This can be very handy for documenting GCAM
  internals, though it's not clear how important to us this kind of
  documentation is.  We will probably have to maintain general
  documentation like usage and science topics statically, like in the
  other systems described above.  Also, it's based off of a
  documentation system built for python, so supporting other languages
  probably won't be completely seamless.
  
* **Miraheze**:  Free hosting service for MediaWiki (the same system
  we use for the UMD wiki).  Their service is free of charge,
  add-free, and offers the option to us a customized domain (sadly,
  gcam.org appears to be taken).  There are actually a whole slew of
  MediaWiki hosting services, both free and paid.  The full list is
  available at https://www.mediawiki.org/wiki/Hosting_services .


## Customized domains

Both Miraheze and GitHub Pages (but not GitHub Wiki) support custom
domains.

## Forums

I haven't been able to find any service that offers integrated content
hosting and forums.  I suspect that if we want this we are going to
have to use two different providers and tie them together through a
custom domain, which is starting to sound like a lot of work.  We can
discuss some options the next time we talk about the subject.
