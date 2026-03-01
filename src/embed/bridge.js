import * as htmlToImage from "html-to-image";

function normalizeJsonInput(payload) {
  if (typeof payload === "string") {
    return JSON.parse(payload);
  }
  return payload;
}

export function registerEmbedBridge(presenter) {
  const emitToAndroid = (event) => {
    try {
      if (
        window.AndroidBridge &&
        typeof window.AndroidBridge.onEvent === "function"
      ) {
        window.AndroidBridge.onEvent(JSON.stringify(event));
      }
    } catch (error) {
      // ignore bridge callback errors to keep editor responsive
    }
  };

  presenter.setExternalEventHandler(emitToAndroid);

  const bridge = {
    ready() {
      return true;
    },

    getVersion() {
      return __COMMIT_HASH__;
    },

    getTree() {
      return presenter.getModelTree();
    },

    getNode(uid) {
      return presenter.getElementByUid(uid);
    },

    getInsertTargets() {
      return presenter.getInsertTargets();
    },

    getCapabilities() {
      return {
        canInsert: true,
        canMove: true,
        canUndoRedo: true,
        canRemoveWithChecks: true,
        canEditFunctions: true,
        canEditCases: true,
        canExportJson: true,
        canExportPng: true,
      };
    },

    getStructogramMeta() {
      return {
        structoName: presenter.getStructogramName(),
      };
    },

    setStructogramMeta(meta = {}) {
      if (!meta || typeof meta !== "object") {
        return { ok: false, error: "Invalid meta payload" };
      }

      if (Object.prototype.hasOwnProperty.call(meta, "structoName")) {
        presenter.setStructogramName(meta.structoName);
      }

      return {
        ok: true,
        meta: {
          structoName: presenter.getStructogramName(),
        },
      };
    },

    loadJson(payload) {
      try {
        const parsed = normalizeJsonInput(payload);
        const ok = presenter.applyImportedData(parsed);
        return ok ? { ok: true } : { ok: false, error: "Invalid import data" };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },

    exportJson() {
      return JSON.stringify(presenter.getExportPayload());
    },

    applySettings(settings) {
      try {
        presenter.applySettings(settings);
        return { ok: true };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },

    insertAt(targetInsertUid, nodeType) {
      return presenter.insertNodeAt(targetInsertUid, nodeType);
    },

    moveNode(uid, targetInsertUid) {
      return presenter.moveNode(uid, targetInsertUid);
    },

    canRemove(uid) {
      return presenter.canRemove(uid);
    },

    remove(uid, force = false) {
      return presenter.removeNode(uid, Boolean(force));
    },

    removeDirect(uid) {
      return presenter.removeElementDirect(uid)
        ? { ok: true }
        : { ok: false, error: "Node not found" };
    },

    addCase(uid) {
      try {
        presenter.addCase(uid);
        return { ok: true };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },

    addCatch(uid) {
      try {
        presenter.addCatch(uid);
        return { ok: true };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },

    setCaseDefault(uid, enabled) {
      return presenter.setCaseDefault(uid, enabled);
    },

    setFunctionName(uid, name) {
      return presenter.setFunctionName(uid, name);
    },

    setFunctionReturnType(uid, returnType) {
      return presenter.setFunctionReturnType(uid, returnType);
    },

    addFunctionParameter(uid, name = "") {
      return presenter.addFunctionParameter(uid, name);
    },

    setFunctionParameter(uid, index, name) {
      return presenter.setFunctionParameter(uid, index, name);
    },

    removeFunctionParameter(uid, index) {
      return presenter.removeFunctionParameter(uid, index);
    },

    async exportPng(options = {}) {
      try {
        const structogramNode = document.getElementById("structogram");
        if (!structogramNode) {
          return { ok: false, error: "Structogram node not found" };
        }

        const pngOptions =
          options && typeof options === "object" ? options : {};
        const dataUrl = await htmlToImage.toPng(structogramNode, pngOptions);
        return { ok: true, dataUrl };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },

    edit(uid, value, editType = "") {
      try {
        presenter.editElement(uid, String(value), editType);
        return { ok: true };
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },

    undo() {
      presenter.undo();
      return { ok: true };
    },

    redo() {
      presenter.redo();
      return { ok: true };
    },

    reset() {
      presenter.resetModel();
      return { ok: true };
    },
  };

  window.StruktogBridge = bridge;
  emitToAndroid({ type: "ready", payload: { embedMode: true } });
}
