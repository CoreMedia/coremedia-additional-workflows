package com.coremedia.blueprint.workflow.createsite;

/**
 * Extracted parameters for the {@link CreateSiteAction}.
 */
public class CreateSiteParameters {

  public final String templateSiteId;
  public final String targetLocale;
  public final String targetSiteName;
  public final String targetSiteId;
  public final String targetSiteUriSegment;
  public final String targetSiteManagerGroup;

  public CreateSiteParameters(String templateSiteId,
                              String targetLocale,
                              String targetSiteName,
                              String targetSiteId,
                              String targetSiteUriSegment,
                              String targetSiteManagerGroup) {
    this.templateSiteId = templateSiteId;
    this.targetLocale = targetLocale;
    this.targetSiteName = targetSiteName;
    this.targetSiteId = targetSiteId;
    this.targetSiteUriSegment = targetSiteUriSegment;
    this.targetSiteManagerGroup = targetSiteManagerGroup;
  }

}
