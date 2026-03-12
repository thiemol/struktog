import * as htmlToImage from "html-to-image";

function normalizeJsonInput(payload) {
  if (typeof payload === "string") {
    return JSON.parse(payload);
  }
  return payload;
}

function normalizeBridgeError(result, fallbackCode, fallbackMessage) {
  if (result && result.ok === false) {
    return {
      ok: false,
      code: result.code || fallbackCode,
      error: result.error || fallbackMessage,
    };
  }

  return {
    ok: false,
    code: fallbackCode,
    error: fallbackMessage,
  };
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

    getSelectedNode() {
      return presenter.getSelectedNode();
    },

    getInsertTargets() {
      return presenter.getInsertTargets();
    },

    startInsert(nodeType) {
      try {
        const result = presenter.startInsertByNodeType(nodeType);
        if (result && result.ok) {
          return result;
        }

        const errorResult = normalizeBridgeError(
          result,
          "INTERNAL_ERROR",
          "Failed to start insert mode"
        );
        emitToAndroid({
          type: "insertRejected",
          payload: {
            code: errorResult.code,
            error: errorResult.error,
          },
        });
        return errorResult;
      } catch (error) {
        const message =
          error && error.message ? error.message : "Internal error";
        emitToAndroid({
          type: "insertRejected",
          payload: {
            code: "INTERNAL_ERROR",
            error: message,
          },
        });
        return {
          ok: false,
          code: "INTERNAL_ERROR",
          error: message,
        };
      }
    },

    cancelInsert() {
      try {
        const result = presenter.cancelInsertMode();
        if (result && result.ok) {
          return result;
        }
        return normalizeBridgeError(
          result,
          "INTERNAL_ERROR",
          "Failed to cancel insert mode"
        );
      } catch (error) {
        return {
          ok: false,
          code: "INTERNAL_ERROR",
          error: error.message,
        };
      }
    },

    startMove(uid) {
      try {
        const result = presenter.startMoveByUid(uid);
        if (result && result.ok) {
          return result;
        }

        const errorResult = normalizeBridgeError(
          result,
          "INTERNAL_ERROR",
          "Failed to start move mode"
        );
        emitToAndroid({
          type: "insertRejected",
          payload: {
            code: errorResult.code,
            error: errorResult.error,
          },
        });
        return errorResult;
      } catch (error) {
        const message =
          error && error.message ? error.message : "Internal error";
        emitToAndroid({
          type: "insertRejected",
          payload: {
            code: "INTERNAL_ERROR",
            error: message,
          },
        });
        return {
          ok: false,
          code: "INTERNAL_ERROR",
          error: message,
        };
      }
    },

    getInsertState() {
      return {
        ok: true,
        state: presenter.getInsertState(),
      };
    },

    getInsertNodeTypes() {
      return {
        ok: true,
        nodeTypes: presenter.getInsertNodeTypes(),
      };
    },

    getCapabilities() {
      return {
        canInsert: true,
        canStartInsertMode: true,
        canMove: true,
        canUndoRedo: true,
        canRemoveWithChecks: true,
        canSelectNodes: true,
        canEditBranches: true,
        canEditFunctions: true,
        canEditCases: true,
        canExportJson: true,
        canExportPng: true,
        canExportSvg: true,
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

    selectNode(uid) {
      return presenter.selectNode(uid);
    },

    clearSelectedNode() {
      return presenter.clearSelectedNode();
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
        return presenter.addCase(uid);
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },

    addCatch(uid) {
      try {
        return presenter.addCatch(uid);
      } catch (error) {
        return { ok: false, error: error.message };
      }
    },

    setCaseDefault(uid, enabled) {
      return presenter.setCaseDefault(uid, enabled);
    },

    getCaseSettings(uid) {
      return presenter.getCaseSettings(uid);
    },

    setCaseLabel(uid, text) {
      return presenter.setCaseLabel(uid, text);
    },

    removeCase(uid, force = false) {
      return presenter.removeCase(uid, Boolean(force));
    },

    getTryCatchSettings(uid) {
      return presenter.getTryCatchSettings(uid);
    },

    setCatchLabel(uid, text) {
      return presenter.setCatchLabel(uid, text);
    },

    removeCatch(uid, force = false) {
      return presenter.removeCatch(uid, Boolean(force));
    },

    setBranchCondition(uid, condition) {
      return presenter.setBranchCondition(uid, condition);
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

    async exportSvg(options = {}) {
      try {
        const structogramNode = document.getElementById("structogram");
        if (!structogramNode) {
          return { ok: false, error: "Structogram node not found" };
        }

        const svgOptions =
          options && typeof options === "object" ? options : {};
        const dataUrl = await htmlToImage.toSvg(structogramNode, svgOptions);
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
