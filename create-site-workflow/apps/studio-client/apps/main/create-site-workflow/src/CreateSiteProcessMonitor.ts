import Process from "@coremedia/studio-client.cap-rest-client/workflow/Process";
import PropertyChangeEvent from "@coremedia/studio-client.client-core/data/PropertyChangeEvent";
import { bind } from "@jangaroo/runtime";
import { AnyFunction } from "@jangaroo/runtime/types";

class CreateSiteProcessMonitor {

  #process: Process = null;

  #callback: AnyFunction = null;

  constructor(process: Process, callback: AnyFunction) {
    this.#process = process;
    this.#callback = callback;

    process.addValueChangeListener(bind(this, this.#processChanged));
  }

  #processChanged(event: PropertyChangeEvent): void {
    console.log("PROCESS CHANGED: " + event.newValue);
  }

}

export default CreateSiteProcessMonitor;
