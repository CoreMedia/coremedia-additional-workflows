package com.coremedia.blueprint.workflow.createsite;

import com.coremedia.cap.common.CapObjectDestroyedException;
import com.coremedia.cap.common.IdHelper;
import com.coremedia.cap.content.Content;
import com.coremedia.cap.content.ContentRepository;
import com.coremedia.cap.content.Version;
import com.coremedia.cap.content.query.QueryService;
import com.coremedia.cap.content.results.CopyResult;
import com.coremedia.cap.content.results.CopyResultItem;
import com.coremedia.cap.multisite.ContentSiteAspect;
import com.coremedia.cap.multisite.SiteCreationReport;
import com.coremedia.cap.multisite.SiteModel;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.cap.undoc.multisite.ContentObjectSiteAspect;
import com.coremedia.cap.undoc.multisite.TranslationStrategy;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;
import java.util.Locale;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.Objects.requireNonNull;

public class CreateSiteMethod {
  private static final Logger LOG = LoggerFactory.getLogger(CreateSiteMethod.class);

  private static final Function<Content, String> CONTENT_STRING_FUNCTION = c -> c + " [" + (c.isDestroyed() ? "" : c.getPath()) + "]";
  /**
   * The integer value, which represents null as content property.
   */
  private static final int NULL_INT_PROPERTY_VALUE = Integer.MIN_VALUE;

  private final SiteModel siteModel;
  private final SitesService sitesService;

  public CreateSiteMethod(@NonNull final SitesService sitesService) {
    requireNonNull(sitesService, "sitesService must not be null.");
    this.sitesService = sitesService;
    this.siteModel = requireNonNull(sitesService.getSiteModel(), "siteModel must not be null.");
  }

  public void execute(@NonNull final Content templateSiteRootFolder,
                      @Nullable final String targetSiteId,
                      @Nullable final String targetSiteName,
                      @Nullable final String targetSiteLocale,
                      @Nullable final String targetSiteManagerGroup,
                      @Nullable final String targetSiteUriSegment,
                      @NonNull final Content targetSiteRootFolder) {
    requireNonNull(templateSiteRootFolder, "templateSiteRootFolder must not be null.");
    final ContentRepository contentRepository = templateSiteRootFolder.getRepository();
    final CopyResult copyResult = contentRepository.copyCheckedInVersionsRecursivelyTo(
            templateSiteRootFolder.getChildren(), null, targetSiteRootFolder);
    final CopyResultItem siteIndicatorResultItem = findSiteIndicatorResultItem(templateSiteRootFolder, copyResult);

    updateClonedSiteIndicator(siteIndicatorResultItem, targetSiteId, targetSiteName, targetSiteManagerGroup, targetSiteLocale);
    updateProperties(copyResult, targetSiteLocale);

    String siteModelRootProperty = siteModel.getRootProperty();

    final Content clonedSiteIndicator = siteIndicatorResultItem.getCopy();
    final SiteCreationReport report = new SiteCreationReportImpl(targetSiteId,
            targetSiteRootFolder,
            clonedSiteIndicator,
            targetSiteName,
            targetSiteLocale,
            targetSiteManagerGroup,
            targetSiteUriSegment,
            siteModelRootProperty);
    siteModel.postProcess(report);
    clonedSiteIndicator.getRepository().getConnection().flush();
  }

  private CopyResultItem findSiteIndicatorResultItem(@NonNull Content masterSiteRootFolder, CopyResult copyResult) {
    final Content masterSiteIndicator = findSiteIndicator(masterSiteRootFolder);
    Collection<? extends CopyResultItem> siteIndicatorResultItems = copyResult.getResultMap().get(masterSiteIndicator);
    assert siteIndicatorResultItems.size() == 1 : "There must be exactly one copy of the master site indicator";
    return siteIndicatorResultItems.iterator().next();
  }

  private Content findSiteIndicator(Content siteRootFolder) {
    QueryService queryService = siteRootFolder.getRepository().getQueryService();
    Collection<Content> siteIndicators = queryService.poseContentQuery("TYPE " + siteModel.getSiteIndicatorDocumentType() + " AND BELOW ?0", siteRootFolder);
    Content siteIndicator;
    if (siteIndicators.size() == 1) {
      siteIndicator = siteIndicators.iterator().next();
    } else {
      throw new IllegalStateException(
              "Expected exactly one site indicator below " + CONTENT_STRING_FUNCTION.apply(siteRootFolder) +
                      ", but was: " + siteIndicators.stream().map(CONTENT_STRING_FUNCTION).collect(Collectors.joining(", ")));
    }
    return siteIndicator;
  }

  private void updateClonedSiteIndicator(CopyResultItem siteIndicatorResultItem,
                                         @Nullable final String siteId,
                                         @Nullable final String siteName,
                                         @Nullable final String siteManagerGroup,
                                         @Nullable final String clonedSiteLocale) {
    final Content clonedSiteIndicator = siteIndicatorResultItem.getCopy();

    final boolean wasCheckedOut = clonedSiteIndicator.isCheckedOut();
    if (!wasCheckedOut) {
      clonedSiteIndicator.checkOut();
    }

    clonedSiteIndicator.set(siteModel.getIdProperty(), siteId);
    clonedSiteIndicator.set(siteModel.getNameProperty(), siteName);
    clonedSiteIndicator.set(siteModel.getSiteManagerGroupProperty(), siteManagerGroup);

    updateStandardContent(clonedSiteIndicator,
            siteIndicatorResultItem.getContent(),
            siteIndicatorResultItem.getVersion(),
            clonedSiteLocale);

    if (!wasCheckedOut) {
      clonedSiteIndicator.checkIn();
    }

    clonedSiteIndicator.getRepository().getConnection().flush();
  }

  private void updateProperties(@SuppressWarnings("TypeMayBeWeakened") final CopyResult copyResult,
                                @Nullable final String clonedSiteLocale) {
    for (final CopyResultItem copyResultItem : copyResult.getResults()) {
      final Content copy = copyResultItem.getCopy();
      if (copy != null) {
        updateStandardContent(copy, copyResultItem.getContent(), copyResultItem.getVersion(), clonedSiteLocale);
      }
    }
  }

  /**
   * Updates standard properties for localized documents such as master and locale.
   *
   * @param clone            the clone to possibly update
   * @param master           the master document of the clone
   * @param masterVersion    master version to take into account
   * @param clonedSiteLocale the locale of the new site; will be taken into account, if the master content has the same locale as its site.
   */
  private void updateStandardContent(@NonNull final Content clone, // NOSONAR - Ignore Too Complex
                                     @NonNull final Content master,
                                     @Nullable final Version masterVersion,
                                     @Nullable final String clonedSiteLocale) {
    try {
      if (clone.isDocument()) {
        final ContentSiteAspect cloneAspect = sitesService.getContentSiteAspect(clone);
        final ContentObjectSiteAspect masterAspect = (ContentObjectSiteAspect) sitesService.getSiteAspect(master);

        final boolean wasCheckedOut = clone.isCheckedOut();
        boolean anythingWritten = false;

        if (!wasCheckedOut) {
          clone.checkOut();
        }

        if (masterAspect.hasSiteLocale() && clonedSiteLocale != null) {
          anythingWritten = cloneAspect.setLocale(Locale.forLanguageTag(clonedSiteLocale));
        }
//        anythingWritten |= cloneAspect.setMaster(master);

//        boolean negateVersionNumber = true;
//        int masterVersionNumber = getMasterVersionNumber(masterVersion, negateVersionNumber);
//        anythingWritten |= cloneAspect.setMasterVersionNumber(masterVersionNumber);

//        if (masterAspect.isIgnoreUpdates()) {
//          /*
//           * CMS-18511: Decision, that it is a bad idea to propagate ignoreUpdates,
//           * especially, as it collides with current implementation auf auto-merge-algorithm,
//           * which ignores `ignoreUpdates` for merging (thus, later changes will never be
//           * propagated along derived sites.
//           */
//          ((com.coremedia.cap.undoc.multisite.ContentSiteAspect) cloneAspect).setIgnoreUpdates(false);
//        }

        if (!wasCheckedOut) {
          if (anythingWritten) {
            clone.checkIn();
          } else {
            clone.revert();
          }
        }
        clone.getRepository().getConnection().flush();
      }
    } catch (CapObjectDestroyedException e) {
      LOG.debug("ContentObject {} has been destroyed during site derivation (master: {}, copy: {})",
              e.getObject(), masterVersion, clone, e);
    }
  }

  private static int getMasterVersionNumber(@Nullable Version masterVersion, boolean negate) {
    int factor = negate ? -1 : 1;

    return masterVersion != null
            ? factor * IdHelper.parseVersionId(masterVersion.getId())
            : NULL_INT_PROPERTY_VALUE;
  }

}
