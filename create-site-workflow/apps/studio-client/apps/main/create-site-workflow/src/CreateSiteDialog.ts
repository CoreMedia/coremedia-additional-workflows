import Process from "@coremedia/studio-client.cap-rest-client/workflow/Process";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import StudioDialog from "@coremedia/studio-client.ext.base-components/dialogs/StudioDialog";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import WindowSkin from "@coremedia/studio-client.ext.ui-components/skins/WindowSkin";
import Editor_properties from "@coremedia/studio-client.main.editor-components/Editor_properties";
import AvailableLocalesComboBox from "@coremedia/studio-client.main.editor-components/sdk/translate/AvailableLocalesComboBox";
import WorkflowUtils from "@coremedia/studio-client.main.editor-components/sdk/util/WorkflowUtils";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import BaseField from "@jangaroo/ext-ts/form/field/Base";
import CheckboxField from "@jangaroo/ext-ts/form/field/Checkbox";
import TextField from "@jangaroo/ext-ts/form/field/Text";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import CreateSiteProcessMonitor from "./CreateSiteProcessMonitor";

interface CreateSiteDialogConfig extends Config<StudioDialog> {

}

class CreateSiteDialog extends StudioDialog {

  declare Config: CreateSiteDialogConfig;

  static readonly WORKFLOW_NAME = "CreateSite";

  static readonly TEMPLATE_SITE_ID = "templateSiteId";

  static readonly TARGET_LOCALE = "targetLocale";

  static readonly TARGET_SITE_NAME = "targetSiteName";

  static readonly TARGET_SITE_ID = "targetSiteId";

  static readonly TARGET_SITE_URI_SEGMENT = "targetSiteUriSegment";

  static readonly TARGET_SITE_MANAGER_GROUP = "targetSiteManagerGroup";

  static readonly AUTO_GENERATE_ID_AND_SEGMENT = "autoGenerateIdAndSegment";

  #model: Bean;

  constructor(config: Config<CreateSiteDialog>) {
    super((() => ConfigUtils.apply(Config(CreateSiteDialog, {
      title: "Create Site",
      stateId: "createSiteDialogState",
      stateful: true,
      modal: true,
      width: 320,
      height: 750,
      constrainHeader: true,
      x: 600,
      y: 200,
      resizable: true,
      draggable: true,
      ui: WindowSkin.GRID_200.getSkin(),

      items: [
        Config(TextField, {
          fieldLabel: "Template",
          plugins: [Config(BindPropertyPlugin, {
            bindTo: ValueExpressionFactory.create(CreateSiteDialog.TEMPLATE_SITE_ID, this.getModel()),
            bidirectional: true,
          })],
        }),
        Config(Container, {
          margin: "20 0 0 0",
          items: [
            Config(TextField, {
              fieldLabel: "Site Name",
              flex: 1,
              plugins: [Config(BindPropertyPlugin, {
                bindTo: ValueExpressionFactory.create(CreateSiteDialog.TARGET_SITE_NAME, this.getModel()),
                bidirectional: true,
              })],
            }),
            Config(AvailableLocalesComboBox, {
              fieldLabel: "Locale",
              flex: 1,
              margin: "0 0 0 10",
              bindTo: ValueExpressionFactory.createFromValue(this.getModel()),
              propertyName: CreateSiteDialog.TARGET_LOCALE,
            }),
          ],
          layout: Config(HBoxLayout, {
            align: "stretch",
            pack: "start",
          }),
          defaults: Config<BaseField>({
            labelAlign: "top",
            labelSeparator: "",
          }),
        }),

        Config(CheckboxField, {
          boxLabel: "Automatically generate Site ID and URI segment",
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: ValueExpressionFactory.create(CreateSiteDialog.AUTO_GENERATE_ID_AND_SEGMENT, this.getModel()),
              bidirectional: true,
            }),
          ],
        }),

        Config(TextField, {
          fieldLabel: "Site ID",
          margin: "0 0 0 25",
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: ValueExpressionFactory.create(CreateSiteDialog.TARGET_SITE_ID, this.getModel()),
              bidirectional: true,
            }),
            Config(BindPropertyPlugin, {
              bindTo: ValueExpressionFactory.create(CreateSiteDialog.AUTO_GENERATE_ID_AND_SEGMENT, this.getModel()),
              componentProperty: "disabled",
            }),
          ],
        }),
        Config(TextField, {
          fieldLabel: "Site URI Segment",
          margin: "0 0 0 25",
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: ValueExpressionFactory.create(CreateSiteDialog.TARGET_SITE_URI_SEGMENT, this.getModel()),
              bidirectional: true,
            }),
            Config(BindPropertyPlugin, {
              bindTo: ValueExpressionFactory.create(CreateSiteDialog.AUTO_GENERATE_ID_AND_SEGMENT, this.getModel()),
              componentProperty: "disabled",
            }),
          ],
        }),
        Config(TextField, {
          fieldLabel: "Site Manager Group",
          margin: "20 0 0 0",
          plugins: [Config(BindPropertyPlugin, {
            bindTo: ValueExpressionFactory.create(CreateSiteDialog.TARGET_SITE_MANAGER_GROUP, this.getModel()),
            bidirectional: true,
          })],
        }),
      ],

      buttons: [
        Config(Button, {
          itemId: "creatBtn",
          text: "Create",
          scale: "small",
          ui: ButtonSkin.FOOTER_PRIMARY.getSkin(),
          handler: () => {
            this.#startCreateSiteWorkflow();
          },
        }),
        Config(Button, {
          itemId: "cancelBtn",
          text: Editor_properties.dialog_defaultCancelButton_text,
          scale: "small",
          ui: ButtonSkin.FOOTER_SECONDARY.getSkin(),
          handler: () => {
            this.close();
          },
        }),
      ],

      defaults: Config<BaseField>({
        labelAlign: "top",
        labelSeparator: "",
        margin: "10 0 0 0",
      }),

      layout: Config(VBoxLayout, {
        align: "stretch",
        pack: "start",
      }),

    }), config))());
  }

  getModel(): Bean {
    if (!this.#model) {
      this.#model = beanFactory._.createLocalBean({});
      this.#model.set(CreateSiteDialog.TEMPLATE_SITE_ID, "country-site-template");
      this.#model.set(CreateSiteDialog.TARGET_SITE_NAME, "New Site");
      this.#model.set(CreateSiteDialog.TARGET_SITE_ID, "new-site-id");
      this.#model.set(CreateSiteDialog.TARGET_LOCALE, "en");
      this.#model.set(CreateSiteDialog.TARGET_SITE_URI_SEGMENT, "new-site");
      this.#model.set(CreateSiteDialog.TARGET_SITE_MANAGER_GROUP, "global-manager");
      this.#model.set(CreateSiteDialog.AUTO_GENERATE_ID_AND_SEGMENT, true);
      this.#model.addValueChangeListener(bind(this, this.#handleModelChange));
    }
    return this.#model;
  }

  #handleModelChange(): void {
    console.log("MODEL CHANGED");
    const siteName = this.getModel().get(CreateSiteDialog.TARGET_SITE_NAME);
    const locale = this.getModel().get(CreateSiteDialog.TARGET_LOCALE);
    const autoGenIDAndSegment = this.getModel().get(CreateSiteDialog.AUTO_GENERATE_ID_AND_SEGMENT);

    if (autoGenIDAndSegment && siteName && locale) {
      const tmpSiteName = siteName.toLowerCase().replaceAll(/[\W_]+/g, "");
      const siteId: string = tmpSiteName + "-" + locale;
      this.#model.set(CreateSiteDialog.TARGET_SITE_ID, siteId.toLowerCase());
      this.#model.set(CreateSiteDialog.TARGET_SITE_URI_SEGMENT, encodeURIComponent(tmpSiteName));
    }

  }

  #startCreateSiteWorkflow(): void {
    const workflowVariables: Record<string, any> = {
      "templateSiteId": this.getModel().get(CreateSiteDialog.TEMPLATE_SITE_ID),
      "targetLocale": this.getModel().get(CreateSiteDialog.TARGET_LOCALE),
      "targetSiteName": this.getModel().get(CreateSiteDialog.TARGET_SITE_NAME),
      "targetSiteId": this.getModel().get(CreateSiteDialog.TARGET_SITE_ID),
      "targetSiteUriSegment": this.getModel().get(CreateSiteDialog.TARGET_SITE_URI_SEGMENT),
      "targetSiteManagerGroup": this.getModel().get(CreateSiteDialog.TARGET_SITE_MANAGER_GROUP),
    };

    WorkflowUtils.startProcess(CreateSiteDialog.WORKFLOW_NAME, workflowVariables,
      (process: Process, error: Error = null): void => {
        // window can be destroyed already
        if (error) {
          WorkflowUtils.showStartProcessErrorDialog();
          return;
        }
        new CreateSiteProcessMonitor(process, this.#onSiteCreated);
      },
    );

    this.close();

  }

  #onSiteCreated(): void {
    console.log("Site CREATED");
  }

}

export default CreateSiteDialog;
