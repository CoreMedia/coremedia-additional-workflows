import Process from "@coremedia/studio-client.cap-rest-client/workflow/Process";
import Bean from "@coremedia/studio-client.client-core/data/Bean";
import PropertyChangeEvent from "@coremedia/studio-client.client-core/data/PropertyChangeEvent";
import ValueExpressionFactory from "@coremedia/studio-client.client-core/data/ValueExpressionFactory";
import beanFactory from "@coremedia/studio-client.client-core/data/beanFactory";
import StudioDialog from "@coremedia/studio-client.ext.base-components/dialogs/StudioDialog";
import toastService from "@coremedia/studio-client.ext.toast-components/toastService";
import ValidationState from "@coremedia/studio-client.ext.ui-components/mixins/ValidationState";
import BindPropertyPlugin from "@coremedia/studio-client.ext.ui-components/plugins/BindPropertyPlugin";
import ButtonSkin from "@coremedia/studio-client.ext.ui-components/skins/ButtonSkin";
import WindowSkin from "@coremedia/studio-client.ext.ui-components/skins/WindowSkin";
import editorContext from "@coremedia/studio-client.main.editor-components/sdk/editorContext";
import AvailableLocalesComboBox from "@coremedia/studio-client.main.editor-components/sdk/translate/AvailableLocalesComboBox";
import WorkflowUtils from "@coremedia/studio-client.main.editor-components/sdk/util/WorkflowUtils";
import Site from "@coremedia/studio-client.multi-site-models/Site";
import SitesRemoteBean from "@coremedia/studio-client.multi-site-models/SitesRemoteBean";
import StringUtil from "@jangaroo/ext-ts/String";
import Button from "@jangaroo/ext-ts/button/Button";
import Container from "@jangaroo/ext-ts/container/Container";
import BaseField from "@jangaroo/ext-ts/form/field/Base";
import CheckboxField from "@jangaroo/ext-ts/form/field/Checkbox";
import TextField from "@jangaroo/ext-ts/form/field/Text";
import HBoxLayout from "@jangaroo/ext-ts/layout/container/HBox";
import VBoxLayout from "@jangaroo/ext-ts/layout/container/VBox";
import { as, bind } from "@jangaroo/runtime";
import Config from "@jangaroo/runtime/Config";
import ConfigUtils from "@jangaroo/runtime/ConfigUtils";
import CreateSiteWorkflowStudioPlugin_properties from "./CreateSiteWorkflowStudioPlugin_properties";
import SiteTemplateSelector from "./components/SiteTemplateSelector";

interface CreateSiteDialogConfig extends Config<StudioDialog> {

}

class CreateSiteDialog extends StudioDialog {

  declare Config: CreateSiteDialogConfig;

  static readonly WORKFLOW_NAME = "CreateSite";

  static readonly TEMPLATE_SITES = "templateSites";

  static readonly SELECTED_TEMPLATE_SITE_ID = "selectedTemplateSite";

  static readonly TARGET_LOCALE = "targetLocale";

  static readonly TARGET_SITE_NAME = "targetSiteName";

  static readonly TARGET_SITE_ID = "targetSiteId";

  static readonly TARGET_SITE_URI_SEGMENT = "targetSiteUriSegment";

  static readonly TARGET_SITE_MANAGER_GROUP = "targetSiteManagerGroup";

  static readonly AUTO_GENERATE_ID_AND_SEGMENT = "autoGenerateIdAndSegment";

  #model: Bean;

  constructor(config: Config<CreateSiteDialog>) {
    super((() => ConfigUtils.apply(Config(CreateSiteDialog, {
      title: CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_title,
      stateId: "createSiteDialogState",
      stateful: true,
      modal: true,
      width: 450,
      height: 500,
      constrainHeader: true,
      x: 600,
      y: 200,
      resizable: true,
      draggable: true,
      ui: WindowSkin.GRID_200.getSkin(),
      items: [
        Config(SiteTemplateSelector, {
          availableSitesExpression: ValueExpressionFactory.create(CreateSiteDialog.TEMPLATE_SITES, this.getModel()),
          selectedSiteExpression: ValueExpressionFactory.create(CreateSiteDialog.SELECTED_TEMPLATE_SITE_ID, this.getModel()),
        }),
        Config(Container, {
          margin: "20 0 0 0",
          items: [
            Config(TextField, {
              fieldLabel: CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_siteName_fieldLabel,
              flex: 1,
              plugins: [Config(BindPropertyPlugin, {
                bindTo: ValueExpressionFactory.create(CreateSiteDialog.TARGET_SITE_NAME, this.getModel()),
                bidirectional: true,
              })],
            }),
            Config(AvailableLocalesComboBox, {
              fieldLabel: CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_siteLocale_fieldLabel,
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
          boxLabel: CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_autoGenSiteIdAndUri_boxLabel,
          plugins: [
            Config(BindPropertyPlugin, {
              bindTo: ValueExpressionFactory.create(CreateSiteDialog.AUTO_GENERATE_ID_AND_SEGMENT, this.getModel()),
              bidirectional: true,
            }),
          ],
        }),

        Config(TextField, {
          fieldLabel: CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_siteId_fieldLabel,
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
          fieldLabel: CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_siteUriSegment_fieldLabel,
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
          fieldLabel: CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_siteManagerGroup_fieldLabel,
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
          text: CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_createButton_text,
          scale: "small",
          ui: ButtonSkin.FOOTER_PRIMARY.getSkin(),
          handler: () => {
            this.#startCreateSiteWorkflow();
          },
        }),
        Config(Button, {
          itemId: "cancelBtn",
          text: CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_cancelButton_text,
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
      this.#model.set(CreateSiteDialog.TEMPLATE_SITES, []);
      this.#model.set(CreateSiteDialog.SELECTED_TEMPLATE_SITE_ID, undefined);
      this.#model.set(CreateSiteDialog.TARGET_SITE_NAME, CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_siteName_placeholder);
      this.#model.set(CreateSiteDialog.TARGET_SITE_ID, CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_siteId_placeholder);
      this.#model.set(CreateSiteDialog.TARGET_LOCALE, CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_siteLocale_placeholder);
      this.#model.set(CreateSiteDialog.TARGET_SITE_URI_SEGMENT, CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_siteUriSegment_placeholder);
      this.#model.set(CreateSiteDialog.TARGET_SITE_MANAGER_GROUP, CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_siteManagerGroup_placeholder);
      this.#model.set(CreateSiteDialog.AUTO_GENERATE_ID_AND_SEGMENT, true);
      this.#model.addValueChangeListener(bind(this, this.#handleModelChange));
      this.#model.addPropertyChangeListener(CreateSiteDialog.SELECTED_TEMPLATE_SITE_ID, bind(this, this.#handleSiteTemplateChange));
    }
    return this.#model;
  }

  protected override initComponent(): void {
    super.initComponent();

    // Load template sites
    const templateSites = editorContext._.getSitesService()
      .getSites();
    //.filter((site: Site) => site.getId().startsWith(CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_templateSitesIdPrefix));
    this.getModel().set(CreateSiteDialog.TEMPLATE_SITES, templateSites);
  }

  #handleSiteTemplateChange(): void {
    const selectedSiteId: string = this.getModel().get(CreateSiteDialog.SELECTED_TEMPLATE_SITE_ID);
    if (selectedSiteId) {
      const site = editorContext._.getSitesService().getSite(selectedSiteId);
      if (site) {
        this.getModel().set(CreateSiteDialog.TARGET_LOCALE, site.getLocale().getLanguageTag());
      }
    }
  }

  #handleModelChange(): void {
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
    const targetSiteId = this.getModel().get(CreateSiteDialog.TARGET_SITE_ID);
    const targetSiteName = this.getModel().get(CreateSiteDialog.TARGET_SITE_NAME);
    const workflowVariables: Record<string, any> = {
      "templateSiteId": this.getModel().get(CreateSiteDialog.SELECTED_TEMPLATE_SITE_ID),
      "targetLocale": this.getModel().get(CreateSiteDialog.TARGET_LOCALE),
      "targetSiteName": targetSiteName,
      "targetSiteId": targetSiteId,
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

        // listen to site creation and show a toaster
        // note that we cannot use the process state here or process.isCompleted()
        // since the workflow will not be archived and thus is not accessible after completion
        const sitesRemoteBean = as(beanFactory._.getRemoteBean(SitesRemoteBean.PATH), SitesRemoteBean);
        sitesRemoteBean.getAllSites().addPropertyChangeListener(targetSiteId, (event: PropertyChangeEvent) => {
          if (event.oldValue === undefined && event.newValue && event.newValue.siteIndicator) {
            toastService._.showToast(
              CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_toast_siteCreated_title,
              StringUtil.format(CreateSiteWorkflowStudioPlugin_properties.CreateSiteDialog_toast_siteCreated_message, targetSiteName),
              ValidationState.SUCCESS);
          }
        });
      },
    );

    this.close();
  }

}

export default CreateSiteDialog;
