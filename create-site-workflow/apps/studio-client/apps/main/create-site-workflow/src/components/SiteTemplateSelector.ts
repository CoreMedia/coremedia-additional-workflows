import ValueExpression from "@coremedia/studio-client.client-core/data/ValueExpression";
import LocalComboBox from "@coremedia/studio-client.ext.ui-components/components/LocalComboBox";
import BindListPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindListPlugin";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import DataField from "@coremedia/studio-client.ext.ui-components/store/DataField";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import CreateSiteWorkflowStudioPlugin_properties from "../CreateSiteWorkflowStudioPlugin_properties";

interface SiteTemplateSelectorConfig extends Config<LocalComboBox>, Partial<Pick<SiteTemplateSelector, "availableSitesExpression" | "selectedSiteExpression">> {

}

class SiteTemplateSelector extends LocalComboBox {

  declare Config: SiteTemplateSelectorConfig;

  static readonly SITE_ID: string = "siteId";

  static readonly SITE_NAME: string = "siteName";

  availableSitesExpression: ValueExpression = null;

  selectedSiteExpression: ValueExpression = null;

  constructor(config: Config<SiteTemplateSelector> = null) {
    super((() => {
      return ConfigUtils.apply(Config(SiteTemplateSelector, {
        fieldLabel: CreateSiteWorkflowStudioPlugin_properties.SiteTemplateSelector_fieldLabel,
        emptyText: CreateSiteWorkflowStudioPlugin_properties.SiteTemplateSelector_emptyText,
        labelSeparator: "",
        itemId: "siteTemplateChooser",
        valueField: SiteTemplateSelector.SITE_ID,
        displayField: SiteTemplateSelector.SITE_NAME,
        queryMode: "local",
        triggerAction: "all",
        forceSelection: true,
        anchor: "100%",
        ...ConfigUtils.append({
          plugins: [
            Config(BindListPlugin, {
              bindTo: config.availableSitesExpression,
              ifUndefined: null,
              sortDirection: "ASC",
              sortField: SiteTemplateSelector.SITE_NAME,
              fields: [
                Config(DataField, {
                  name: SiteTemplateSelector.SITE_ID,
                  mapping: "id",
                  encode: false,
                }),
                Config(DataField, {
                  name: SiteTemplateSelector.SITE_NAME,
                  mapping: "name",
                  encode: false,
                }),
              ],
            }),
            Config(BindPropertyPlugin, {
              bindTo: config.selectedSiteExpression,
              bidirectional: true,
              skipIfUndefined: true,
              componentEvent: "change",
            }),
          ],
        }),
      }), config);
    })());
  }

}

export default SiteTemplateSelector;
