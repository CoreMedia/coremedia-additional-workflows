package com.coremedia.blueprint.workflow.createsite;

import com.coremedia.cap.content.Content;
import com.coremedia.cap.content.ContentRepository;
import com.coremedia.cap.multisite.Site;
import com.coremedia.cap.multisite.SitesService;
import com.coremedia.cap.multisite.impl.CloneSiteMethod;
import com.coremedia.cap.workflow.Process;
import com.coremedia.cap.workflow.Task;
import com.coremedia.cap.workflow.plugin.ActionResult;
import com.coremedia.translate.workflow.RobotUserAction;

import static java.util.Objects.requireNonNull;

public class CreateSiteAction extends RobotUserAction {

  @Override
  public Object extractParameters(Task task) {
    Process process = task.getContainingProcess();

    String templateSiteId = process.getString("templateSiteId");
    String targetLocale = process.getString("targetLocale");
    String targetSiteName = process.getString("targetSiteName");
    String targetSiteId = process.getString("targetSiteId");
    String targetSiteUriSegment = process.getString("targetSiteUriSegment");
    String targetSiteManagerGroup = process.getString("targetSiteManagerGroup");

    return new CreateSiteParameters(templateSiteId, targetLocale, targetSiteName, targetSiteId, targetSiteUriSegment, targetSiteManagerGroup);
  }

  @Override
  protected Object doExecuteAsRobotUser(Object p) {
    SitesService sitesService = getSitesService();
    CreateSiteParameters params = (CreateSiteParameters) p;

    Site templateSite = sitesService.getSite(params.templateSiteId);
    requireNonNull(templateSite, "No template site found with id '" + params.templateSiteId + "'");

    ContentRepository contentRepository = templateSite.getSiteIndicator().getRepository();

    // Create root folder
    String targetSiteFolderPath = sitesService.computeDerivedSitePath(params.targetSiteName, params.targetLocale);
    Content targetSiteRootFolder = contentRepository.getFolderContentType().create(contentRepository.getRoot(),targetSiteFolderPath);

    new CloneSiteMethod(sitesService).execute(
            templateSite.getSiteRootFolder(),
            params.targetSiteId,
            params.targetSiteName,
            params.targetLocale,
            params.targetSiteManagerGroup,
            params.targetSiteUriSegment,
            targetSiteRootFolder,
            null);

    Site createdSite = sitesService.getSite(params.targetSiteId);
    return createdSite;
  }

}
