/*
 Copyright (C) 2019-2023 Thiemo Leonhardt, Klaus Ramm, Tom-Maurice Schreiber, Sören Schwab

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import "./assets/favicons/favicons";
import { config } from "./config.js";
import { model } from "./model/main";
import { Presenter } from "./presenter/main";
import { Structogram } from "./views/structogram";
import { CodeView } from "./views/code";
import { ImportExport } from "./views/importExport";
import { WebTour } from "./views/webtour";
import { registerEmbedBridge } from "./embed/bridge";
import {
  generateFooter,
  generateHtmltree,
  highlight,
} from "./helpers/generator";
import { initializeI18n, t } from "./i18n";

import "./assets/scss/structog.scss";

function updateMetaTag(selector, attributeName, attributeValue, content) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function updateDocumentMetadata() {
  const title = t("meta.title");
  const description = t("meta.description");

  document.title = title;
  updateMetaTag('meta[name="description"]', "name", "description", description);
  updateMetaTag('meta[property="og:title"]', "property", "og:title", title);
  updateMetaTag(
    'meta[property="og:description"]',
    "property",
    "og:description",
    description
  );
  updateMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
  updateMetaTag(
    'meta[name="twitter:description"]',
    "name",
    "twitter:description",
    description
  );
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const isSecureContext = window.location.protocol === "https:" || isLocalhost;

  if (!isSecureContext) {
    return;
  }

  navigator.serviceWorker.register("./sw.js").catch((error) => {
    console.error("Service worker registration failed:", error);
  });
}

function resolveAppMode() {
  if (typeof __EMBED_BUILD__ !== "undefined" && __EMBED_BUILD__) {
    return "embed";
  }

  const url = new URL(window.location.href);
  const modeParam = url.searchParams.get("mode");
  if (modeParam === "embed") {
    return "embed";
  }
  return "full";
}

function resolveEmbedUiMode(appMode) {
  if (appMode !== "embed") {
    return "minimal";
  }

  const url = new URL(window.location.href);
  const embedUiParam = url.searchParams.get("embedui");
  if (
    typeof embedUiParam === "string" &&
    embedUiParam.toLowerCase() === "hybrid"
  ) {
    return "hybrid";
  }

  return "minimal";
}

window.onload = function () {
  const appMode = resolveAppMode();
  const isEmbedMode = appMode === "embed";
  const embedUiMode = resolveEmbedUiMode(appMode);
  let configId = null;
  initializeI18n();
  updateDocumentMetadata();
  // manipulate the localStorage before loading the presenter
  if (typeof Storage !== "undefined") {
    const url = new URL(window.location.href);
    const externJson = url.searchParams.get("url");
    if (externJson !== null) {
      fetch(externJson)
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          presenter.readUrl(json);
        });
    }
    configId = url.searchParams.get("config");
    config.loadConfig(configId);
  }

  generateHtmltree({ mode: appMode });

  if (!isEmbedMode) {
    generateFooter();

    const footerSpan = document.querySelector("footer .column span");
    if (footerSpan) {
      const donateLink = document.createElement("div");
      donateLink.classList.add(
        "hand",
        "tooltip",
        "tooltip-top",
        "footerDonateLink"
      );
      donateLink.appendChild(document.createTextNode(t("nav.donate")));
      donateLink.setAttribute("data-tooltip", t("nav.donateTooltip"));
      donateLink.addEventListener("click", () => {
        window.open(
          "https://www.paypal.com/donate?hosted_button_id=5ZRTXH9NUJG5U",
          "_blank"
        );
      });

      footerSpan.appendChild(document.createTextNode("|"));
      footerSpan.appendChild(donateLink);
    }
  }

  // create presenter object
  const presenter = new Presenter(model, { embedMode: isEmbedMode });
  presenter.setExternalEventHandler((event) => {
    if (event && event.type === "uiLanguageChanged") {
      updateDocumentMetadata();
    }
  });
  // TODO: this should not be necessary, but some functions depend on moveId and nextInsertElement
  model.setPresenter(presenter);

  if (!isEmbedMode) {
    const structogramNameNode = document.getElementById("structoName");
    if (structogramNameNode) {
      structogramNameNode.addEventListener("click", () => {
        const structogramName = window.prompt(
          t("nav.renamePrompt"),
          presenter.getStructogramName()
        );
        if (structogramName === null) {
          return;
        }
        presenter.setStructogramName(structogramName);
      });
    }
  }

  // create our view objects
  const structogram = new Structogram(
    presenter,
    document.getElementById("editorDisplay"),
    {
      embedUi: embedUiMode,
    }
  );
  presenter.addView(structogram);
  if (!isEmbedMode) {
    const code = new CodeView(
      presenter,
      document.getElementById("editorDisplay")
    );
    presenter.addView(code);
    const importExport = new ImportExport(
      presenter,
      document.getElementById("Export")
    );
    presenter.addView(importExport);

    const webTour = new WebTour();
    webTour.bindTrigger("#tourInfoButton");
  } else {
    registerEmbedBridge(presenter);
  }

  const hasConfigOverride = Boolean(configId);
  if (hasConfigOverride) {
    presenter.setActiveConfigProfile(configId);
  }
  presenter.applySettings(presenter.getStoredSettings(hasConfigOverride), {
    persist: false,
    rerender: false,
  });

  presenter.init();

  if (!isEmbedMode) {
    highlight();
    registerServiceWorker();
  }
};
