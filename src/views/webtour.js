export class WebTour {
  constructor() {
    this.hintStorageKey = "struktog_tour_hint_seen_v1";
    this.steps = [
      {
        selector: "#tourInfoButton",
        title: "Kurze Tour",
        text: "Hier startest du jederzeit diese Einführung.",
      },
      {
        selector: "#insertButtons",
        title: "Elemente einfügen",
        text: "Wähle hier ein Element aus und füge es per Klick oder Drag-and-Drop ein.",
      },
      {
        selector: "#structogram",
        title: "Arbeitsfläche",
        text: "Hier baust du dein Struktogramm auf und bearbeitest die Inhalte direkt.",
      },
      {
        selector: ".optionContainer",
        title: "Elementoptionen",
        text: "An eingefügten Elementen findest du Aktionen wie Entfernen und je nach Typ weitere Optionen.",
      },
      {
        selector: "#optionButtons",
        title: "Datei und Einstellungen",
        text: "Oben findest du Einstellungen sowie Laden, Speichern und Bildexport.",
      },
      {
        selector: ".ToggleSourcecode",
        title: "Quellcode",
        text: "Mit diesem Button blendest du den Quellcode ein. Sprache und Kopieren stehen dann rechts bereit.",
      },
      {
        selector: "#struktoOptions1",
        title: "Undo, Redo, Reset",
        text: "Diese Leiste enthält Rückgängig, Wiederholen und Zurücksetzen des Diagramms.",
      },
    ];

    this.currentStepIndex = 0;
    this.isOpen = false;
    this.overlay = null;
    this.card = null;
    this.titleNode = null;
    this.textNode = null;
    this.progressNode = null;
    this.backButton = null;
    this.nextButton = null;
    this.boundKeyHandler = (event) => this.handleKeydown(event);
    this.activeHighlightElement = null;
  }

  bindTrigger(selector = "#tourInfoButton") {
    const button = document.querySelector(selector);
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      this.markHintSeen();
      this.start();
    });

    if (!this.isHintSeen()) {
      button.classList.add("tour-info-hint");
    }
  }

  isHintSeen() {
    if (typeof Storage === "undefined") {
      return true;
    }
    return localStorage.getItem(this.hintStorageKey) === "true";
  }

  markHintSeen() {
    if (typeof Storage !== "undefined") {
      localStorage.setItem(this.hintStorageKey, "true");
    }

    const infoButton = document.getElementById("tourInfoButton");
    if (infoButton) {
      infoButton.classList.remove("tour-info-hint");
    }
  }

  start() {
    if (this.isOpen) {
      return;
    }

    this.markHintSeen();
    this.isOpen = true;
    this.currentStepIndex = 0;
    this.ensureUi();
    this.overlay.classList.add("active");
    document.addEventListener("keydown", this.boundKeyHandler);
    this.renderStep();
  }

  stop() {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    document.removeEventListener("keydown", this.boundKeyHandler);
    this.clearHighlight();
    if (this.overlay) {
      this.overlay.classList.remove("active");
    }
  }

  ensureUi() {
    if (this.overlay) {
      return;
    }

    this.overlay = document.createElement("div");
    this.overlay.classList.add("webtour-overlay");

    this.card = document.createElement("div");
    this.card.classList.add("webtour-card");

    this.titleNode = document.createElement("div");
    this.titleNode.classList.add("webtour-title");

    this.textNode = document.createElement("div");
    this.textNode.classList.add("webtour-text");

    this.progressNode = document.createElement("div");
    this.progressNode.classList.add("webtour-progress");

    const controls = document.createElement("div");
    controls.classList.add("webtour-controls");

    this.backButton = document.createElement("button");
    this.backButton.type = "button";
    this.backButton.classList.add("webtour-button");
    this.backButton.appendChild(document.createTextNode("Zurück"));
    this.backButton.addEventListener("click", () => this.previousStep());

    this.nextButton = document.createElement("button");
    this.nextButton.type = "button";
    this.nextButton.classList.add("webtour-button", "webtour-button-primary");
    this.nextButton.addEventListener("click", () => this.nextStep());

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("webtour-button");
    closeButton.appendChild(document.createTextNode("Beenden"));
    closeButton.addEventListener("click", () => this.stop());

    controls.appendChild(this.backButton);
    controls.appendChild(this.nextButton);
    controls.appendChild(closeButton);

    this.card.appendChild(this.titleNode);
    this.card.appendChild(this.textNode);
    this.card.appendChild(this.progressNode);
    this.card.appendChild(controls);

    this.overlay.appendChild(this.card);
    document.body.appendChild(this.overlay);
  }

  previousStep() {
    if (this.currentStepIndex <= 0) {
      return;
    }
    this.currentStepIndex -= 1;
    this.renderStep();
  }

  nextStep() {
    if (this.currentStepIndex >= this.steps.length - 1) {
      this.stop();
      return;
    }
    this.currentStepIndex += 1;
    this.renderStep();
  }

  renderStep() {
    if (!this.isOpen) {
      return;
    }

    this.clearHighlight();

    const step = this.steps[this.currentStepIndex];
    this.titleNode.textContent = step.title;
    this.textNode.textContent = step.text;
    this.progressNode.textContent =
      String(this.currentStepIndex + 1) + " / " + String(this.steps.length);

    this.backButton.disabled = this.currentStepIndex === 0;
    this.nextButton.textContent =
      this.currentStepIndex === this.steps.length - 1 ? "Fertig" : "Weiter";

    const target = this.getVisibleTarget(step.selector);
    if (!target) {
      this.centerCard();
      return;
    }

    this.activeHighlightElement = target;
    target.classList.add("webtour-highlight");
    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    this.positionCardNearTarget(target);
  }

  getVisibleTarget(selector) {
    const nodes = document.querySelectorAll(selector);
    for (const node of nodes) {
      const rect = node.getBoundingClientRect();
      const visible = rect.width > 0 && rect.height > 0;
      if (visible) {
        return node;
      }
    }
    return null;
  }

  positionCardNearTarget(target) {
    this.card.classList.remove("webtour-card-center");

    const cardWidth = 320;
    const gap = 12;
    const rect = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = rect.left;
    left = Math.max(12, Math.min(left, viewportWidth - cardWidth - 12));

    let top = rect.bottom + gap;
    const estimatedCardHeight = 180;
    if (top + estimatedCardHeight > viewportHeight - 12) {
      top = Math.max(12, rect.top - estimatedCardHeight - gap);
    }

    this.card.style.left = String(Math.round(left)) + "px";
    this.card.style.top = String(Math.round(top)) + "px";
  }

  centerCard() {
    this.card.classList.add("webtour-card-center");
    this.card.style.left = "50%";
    this.card.style.top = "50%";
  }

  clearHighlight() {
    if (this.activeHighlightElement) {
      this.activeHighlightElement.classList.remove("webtour-highlight");
      this.activeHighlightElement = null;
    }
  }

  handleKeydown(event) {
    if (!this.isOpen) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      this.stop();
      return;
    }

    if (event.key === "ArrowRight" || event.key === "Enter") {
      event.preventDefault();
      this.nextStep();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.previousStep();
    }
  }
}
