import CoreIcons_properties from "@coremedia/studio-client.core-icons/CoreIcons_properties";
import OpenDialogAction from "@coremedia/studio-client.ext.ui-components/actions/OpenDialogAction";
import IconButton from "@coremedia/studio-client.ext.ui-components/components/IconButton";
import AddItemsPlugin from "@coremedia/studio-client.ext.ui-components/plugins/AddItemsPlugin";
import NestedRulesPlugin from "@coremedia/studio-client.ext.ui-components/plugins/NestedRulesPlugin";
import StudioPlugin from "@coremedia/studio-client.main.editor-components/configuration/StudioPlugin";
import LocalizationManager from "@coremedia/studio-client.main.editor-components/sdk/sites/LocalizationManager";
import LocalizationManagerToolbar from "@coremedia/studio-client.main.editor-components/sdk/sites/LocalizationManagerToolbar";
import Component from "@jangaroo/ext-ts/Component";
import Separator from "@jangaroo/ext-ts/toolbar/Separator";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import CreateSiteDialog from "./CreateSiteDialog";

interface CreateSiteWorkflowStudioPluginConfig extends Config<StudioPlugin> {
}

class CreateSiteWorkflowStudioPlugin extends StudioPlugin {

  declare Config: CreateSiteWorkflowStudioPluginConfig;

  constructor(config: Config<CreateSiteWorkflowStudioPlugin> = null) {
    super(ConfigUtils.apply(Config(CreateSiteWorkflowStudioPlugin, {

      rules: [
        Config(LocalizationManager, {
          plugins: [
            Config(NestedRulesPlugin, {
              rules: [
                Config(LocalizationManagerToolbar, {
                  plugins: [
                    Config(AddItemsPlugin, {
                      before: [
                        Config(Component, { itemId: LocalizationManagerToolbar.OPEN_DOCUMENT_BUTTON_ITEM_ID }),
                      ],
                      items: [
                        Config(IconButton, {
                          itemId: "create-site-btn",
                          tooltip: "Add site",
                          baseAction: new OpenDialogAction({
                            iconCls: CoreIcons_properties.add,
                            dialog: Config(CreateSiteDialog, {}),
                          }),
                        }),
                        Config(Separator, {}),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],

    }), config));
  }
}

export default CreateSiteWorkflowStudioPlugin;
