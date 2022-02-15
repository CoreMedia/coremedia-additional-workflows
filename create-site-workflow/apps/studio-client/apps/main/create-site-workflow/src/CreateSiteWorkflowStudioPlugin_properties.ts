import Editor_properties from "@coremedia/studio-client.main.editor-components/Editor_properties";

interface CreateSiteWorkflowStudioPlugin_properties {
  CreateSiteDialog_title: string;
  CreateSiteDialog_siteTemplate_fieldLabel: string;
  CreateSiteDialog_siteName_fieldLabel: string;
  CreateSiteDialog_siteName_placeholder: string;
  CreateSiteDialog_siteId_fieldLabel: string;
  CreateSiteDialog_siteId_placeholder: string;
  CreateSiteDialog_siteLocale_fieldLabel: string;
  CreateSiteDialog_siteLocale_placeholder: string;
  CreateSiteDialog_siteUriSegment_fieldLabel: string;
  CreateSiteDialog_siteUriSegment_placeholder: string;
  CreateSiteDialog_siteManagerGroup_fieldLabel: string;
  CreateSiteDialog_siteManagerGroup_placeholder: string;
  CreateSiteDialog_autoGenSiteIdAndUri_boxLabel: string;
  CreateSiteDialog_createButton_text: string;
  CreateSiteDialog_cancelButton_text: string;
  CreateSiteDialog_toast_siteCreated_title: string;
  CreateSiteDialog_toast_siteCreated_message: string;
  CreateSiteDialog_templateSitesIdPrefix: string;

  SiteTemplateSelector_fieldLabel: string;
  SiteTemplateSelector_emptyText: string;
}

const CreateSiteWorkflowStudioPlugin_properties: CreateSiteWorkflowStudioPlugin_properties = {
  SiteTemplateSelector_emptyText: "Select a template",
  SiteTemplateSelector_fieldLabel: "Template",
  CreateSiteDialog_templateSitesIdPrefix: "template-",
  CreateSiteDialog_autoGenSiteIdAndUri_boxLabel: "Automatically generate Site ID and URI segment",
  CreateSiteDialog_cancelButton_text: Editor_properties.dialog_defaultCancelButton_text,
  CreateSiteDialog_createButton_text: "Create Site",
  CreateSiteDialog_siteId_fieldLabel: "Site ID",
  CreateSiteDialog_siteId_placeholder: "new-site-id",
  CreateSiteDialog_siteLocale_fieldLabel: "Locale",
  CreateSiteDialog_siteLocale_placeholder: "en",
  CreateSiteDialog_siteManagerGroup_fieldLabel: "Site Manager Group",
  CreateSiteDialog_siteManagerGroup_placeholder: "global-manager",
  CreateSiteDialog_siteName_fieldLabel: "Site Name",
  CreateSiteDialog_siteName_placeholder: "New Site",
  CreateSiteDialog_siteTemplate_fieldLabel: "",
  CreateSiteDialog_siteUriSegment_fieldLabel: "Site URI Segment",
  CreateSiteDialog_siteUriSegment_placeholder: "new-site",
  CreateSiteDialog_toast_siteCreated_message: "New site '{0}' has been created.",
  CreateSiteDialog_toast_siteCreated_title: "Site created",
  CreateSiteDialog_title: "Create Site from Template",
};

export default CreateSiteWorkflowStudioPlugin_properties;
