package com.coremedia.blueprint.workflow.createsite;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.multisite.SiteCreationReport;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;

import static java.util.Objects.requireNonNull;

public class SiteCreationReportImpl implements SiteCreationReport {

  private final String siteId;
  private final Content siteRootFolder;
  private final Content siteIndicator;
  private final String siteName;
  private final String siteLocale;
  private final String siteManagerGroup;
  private final String uriSegment;
  private final String siteRootProperty;

  public SiteCreationReportImpl(@Nullable final String siteId,
                                @NonNull final Content siteRootFolder,
                                @NonNull final Content siteIndicator,
                                @Nullable final String siteName,
                                @Nullable final String siteLocale,
                                @Nullable final String siteManagerGroup,
                                @Nullable final String uriSegment,
                                @NonNull final String siteRootProperty) {
    requireNonNull(siteRootFolder, "siteRootFolder must not be null.");
    requireNonNull(siteIndicator, "siteIndicator must not be null.");
    requireNonNull(siteRootProperty, "siteRootProperty must not be null.");

    this.siteId = siteId;
    this.siteRootFolder = siteRootFolder;
    this.siteIndicator = siteIndicator;
    this.siteName = siteName;
    this.siteLocale = siteLocale;
    this.siteManagerGroup = siteManagerGroup;
    this.uriSegment = (uriSegment == null) ? null : uriSegment.toLowerCase();
    this.siteRootProperty = siteRootProperty;
  }

  @Override
  @NonNull
  public Content getSiteRootFolder() {
    return siteRootFolder;
  }

  @NonNull
  @Override
  public String getSiteRootProperty() {
    return siteRootProperty;
  }

  @Override
  @NonNull
  public Content getSiteIndicator() {
    return siteIndicator;
  }

  @Nullable
  @Override
  public String getSiteName() {
    return siteName;
  }

  @Nullable
  @Override
  public String getSiteLocale() {
    return siteLocale;
  }

  @Nullable
  @Override
  public String getUriSegment() {
    return uriSegment;
  }

  @Nullable
  @Override
  public String getSiteId() {
    return siteId;
  }

  @Nullable
  @Override
  public String getSiteManagerGroup() {
    return siteManagerGroup;
  }

  @Nullable
  @Override
  public String translationStrategy() {
    return null;
  }

}
