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

  private static final long serialVersionUID = -5584637750075258451L;

  @Override
  public Object extractParameters(Task task) {
    Process process = task.getContainingProcess();

    String templateSiteId = process.getString(templateSiteIdVariable);
    String targetLocale = process.getString(targetLocaleVariable);
    String targetSiteName = process.getString(targetSiteNameVariable);
    String targetSiteId = process.getString(targetSiteIdVariable);
    String targetSiteUriSegment = process.getString(targetSiteUriSegmentVariable);
    String targetSiteManagerGroup = process.getString(targetSiteManagerGroupVariable);

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


  // --------------------------------------------------- bean parser ------------------------------------------------ //

  private String templateSiteIdVariable;
  private String targetLocaleVariable;
  private String targetSiteNameVariable;
  private String targetSiteIdVariable;
  private String targetSiteUriSegmentVariable;
  private String targetSiteManagerGroupVariable;

  public String getTemplateSiteIdVariable() {
    return templateSiteIdVariable;
  }

  public void setTemplateSiteIdVariable(String templateSiteIdVariable) {
    this.templateSiteIdVariable = templateSiteIdVariable;
  }

  public String getTargetLocaleVariable() {
    return targetLocaleVariable;
  }

  public void setTargetLocaleVariable(String targetLocaleVariable) {
    this.targetLocaleVariable = targetLocaleVariable;
  }

  public String getTargetSiteNameVariable() {
    return targetSiteNameVariable;
  }

  public void setTargetSiteNameVariable(String targetSiteNameVariable) {
    this.targetSiteNameVariable = targetSiteNameVariable;
  }

  public String getTargetSiteIdVariable() {
    return targetSiteIdVariable;
  }

  public void setTargetSiteIdVariable(String targetSiteIdVariable) {
    this.targetSiteIdVariable = targetSiteIdVariable;
  }

  public String getTargetSiteUriSegmentVariable() {
    return targetSiteUriSegmentVariable;
  }

  public void setTargetSiteUriSegmentVariable(String targetSiteUriSegmentVariable) {
    this.targetSiteUriSegmentVariable = targetSiteUriSegmentVariable;
  }

  public String getTargetSiteManagerGroupVariable() {
    return targetSiteManagerGroupVariable;
  }

  public void setTargetSiteManagerGroupVariable(String targetSiteManagerGroupVariable) {
    this.targetSiteManagerGroupVariable = targetSiteManagerGroupVariable;
  }

  // ---------------------------------------------------------------------------------------------------------------- //

}
