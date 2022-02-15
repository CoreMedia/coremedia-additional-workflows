import ResourceBundleUtil from "@jangaroo/runtime/l10n/ResourceBundleUtil";
import CreateSiteWorkflowStudioPlugin_properties from "./CreateSiteWorkflowStudioPlugin_properties";

ResourceBundleUtil.override(CreateSiteWorkflowStudioPlugin_properties, {
  SiteTemplateSelector_emptyText: "Wählen Sie eine Vorlage",
  SiteTemplateSelector_fieldLabel: "Vorlage",
  CreateSiteDialog_autoGenSiteIdAndUri_boxLabel: "Automatisch Site-ID und URI-Segment generieren",
  CreateSiteDialog_createButton_text: "Site erstellen",
  CreateSiteDialog_siteId_fieldLabel: "Site ID",
  CreateSiteDialog_siteLocale_fieldLabel: "Locale",
  CreateSiteDialog_siteManagerGroup_fieldLabel: "Site-Manager-Gruppe",
  CreateSiteDialog_siteName_fieldLabel: "Site Name",
  CreateSiteDialog_siteName_placeholder: "Neue Website",
  CreateSiteDialog_siteTemplate_fieldLabel: "Vorlage",
  CreateSiteDialog_siteUriSegment_fieldLabel: "Site-URI-Segment",
  CreateSiteDialog_toast_siteCreated_message: "Neue Site '{0}' wurde erstellt.",
  CreateSiteDialog_toast_siteCreated_title: "Site erstellt",
  CreateSiteDialog_title: "Site aus Vorlage erstellen",
});
