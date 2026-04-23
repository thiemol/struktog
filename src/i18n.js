const SUPPORTED_UI_LANGUAGES = ["de", "en", "fr", "es"];
const UI_LANGUAGE_STORAGE_KEY = "struktog_settings_ui_language";
const UI_LANGUAGE_AUTO = "auto";

const translations = {
  de: {
    common: {
      ok: "OK",
      cancel: "Abbruch",
      close: "Schließen",
      yes: "Ja",
      no: "Nein",
      undo: "Undo",
      redo: "Redo",
      reset: "Reset",
      settings: "Einstellung",
      remove: "Entfernen",
      move: "Verschieben",
      moveCancel: "Verschieben abbrechen",
      addCase: "Fall hinzufügen",
      addCatch: "Catch hinzufügen",
      addParameter: "Parameter hinzufügen",
      sourcecode: "Quellcode",
    },
    nodes: {
      InputNode: "Eingabe-Feld",
      OutputNode: "Ausgabe-Feld",
      TaskNode: "Anweisung",
      BlockCallNode: "Funktionsaufruf",
      CountLoopNode: "Zählergesteuerte Schleife",
      HeadLoopNode: "Kopfgesteuerte Schleife",
      FootLoopNode: "Fußgesteuerte Schleife",
      BranchNode: "Verzweigung",
      CaseNode: "Fallunterscheidung",
      TryCatchNode: "Try-Catch-Block",
      FunctionNode: "Funktionsblock",
    },
    nav: {
      unnamed: "unbenannt",
      renameTooltip: "Benenne dein Struktogramm.",
      renamePrompt: "Bitte gib einen Namen für dein Struktogramm ein:",
      donate: "Spenden",
      donateTooltip: "Unterstuetze Struktog",
    },
    footer: {
      sourceCode: "Source code",
      sourceTooltip: "Gitlab Repository",
      contributors: "Contributors",
      contributorsTooltip: "Contributors",
      maintainer: "Maintainer Thiemo Leonhardt",
      whatsNewTooltip: "Whats New?",
      imprint: "Impressum",
      imprintTooltip: "Impressum",
      devNotice: "Development branch please use ",
      stableVersion: "stable version",
    },
    editor: {
      chooseElement: "Element wählen:",
      heading: "Editor:",
      trueLabel: "Wahr",
      falseLabel: "Falsch",
      caseSettingsTitle: "Einstellungen der {{node}}: ",
      tryCatchSettingsTitle: "Einstellungen des {{node}}s : ",
      functionSettingsTitle: "Einstellungen des {{node}}s: ",
      numberOfParameters: "Anzahl der Parameter:",
      numberOfCases: "Anzahl der Fälle:",
      numberOfCatches: "Anzahl der Catch-Blöcke:",
      functionReturnType: "Rückgabetyp:",
      functionParameters: "Parameter:",
      functionParameterLabel: "Parameter",
      functionParametersEmpty: "Keine Parameter",
      enableDefaultBranch: "Sonst Zweig einschalten:",
      deleteQuestion:
        "Dieses Element und alle darin erstellten Blöcke löschen?",
      deleteAllQuestion: "Alles löschen?",
      removeParameterTooltip: "Entfernen",
      expandEditorWidth: "Editor auf Seitenbreite",
      limitEditorWidth: "Editor auf 1200px",
    },
    code: {
      translateTo: "Übersetzen in:",
      copyCode: "Kopiere Code",
      showSourcecode: "Quellcode einblenden",
      unsupported:
        "Das Struktogramm enthält Elemente, \nwelche in der gewählten Programmiersprache \nnicht direkt zur Verfügung stehen.\nDeshalb bitte manuell in Code überführen.",
    },
    importExport: {
      startTour: "Tour starten",
      settings: "Einstellungen",
      load: "Laden",
      save: "Speichern",
      imageExport: "Bildexport",
      imageExportFormatTitle: "Bildformat waehlen",
      exportPng: "PNG",
      exportSvg: "SVG",
      settingsTitle: "Einstellungen",
      tabGeneral: "Allgemein",
      tabColors: "Farben",
      profile: "Profil",
      showElements: "Elemente anzeigen",
      language: "Programmiersprache",
      uiLanguage: "Oberflächensprache",
      uiAuto: "Automatisch (Browser)",
      showSourcecode: "Quellcode anzeigen",
      enableShortcuts: "Shortcuts (Alt+1..0) aktivieren",
      restrictFunctionInsertToTop:
        "Funktionsblock nur am Anfang des Struktogramms einfügen",
      resetColors: "Reset Farben",
      colorGroupInputOutput: "Ein- und Ausgabe",
      colorGroupLoops: "Schleifen",
      colorGroupBranching: "Verzweigungen und Fehlerbehandlung",
      colorGroupFunctions: "Funktionen",
      applyGroupColor: "Gruppenfarbe übernehmen",
      atLeastOneElement: "Bitte mindestens ein Element aktiv lassen.",
      invalidJson: "Datei konnte nicht gelesen werden: ungültiges JSON.",
      unknownImportFormat:
        "Datei konnte nicht importiert werden: unbekanntes Format.",
    },
    webtour: {
      titleIntro: "Was ist ein Struktogramm?",
      textIntro:
        "Ein Struktogramm beschreibt einen Algorithmus in klaren, strukturierten Bausteinen. Du planst damit den Programmablauf schrittweise über Sequenz, Verzweigung und Schleife, bevor du ihn als Quellcode formulierst. Der Editor unterstützt dich dabei, diese Bausteine konsistent zu erstellen, logisch zu ordnen und in ausführbaren Code zu überführen.",
      titleStart: "Kurze Tour",
      textStart: "Hier startest du jederzeit diese Einführung.",
      titleNaming: "Struktogramm benennen",
      textNaming:
        "Hier benennst du dein Struktogramm. Dieser Name wird auch für zukünftige JSON- und PNG-Exporte als Dateiname verwendet.",
      titleInsert: "Elemente einfügen",
      textInsert:
        "Wähle hier ein Element aus und füge es per Klick oder Drag-and-Drop ein.",
      titleWorkspace: "Arbeitsfläche",
      textWorkspace:
        "Hier baust du dein Struktogramm auf und bearbeitest die Inhalte direkt.",
      titleElementOptions: "Elementoptionen",
      textElementOptions:
        "An eingefügten Elementen findest du Aktionen wie Entfernen und je nach Typ weitere Optionen.",
      titleFileSettings: "Datei und Einstellungen",
      textFileSettings:
        "Oben findest du Einstellungen sowie Laden, Speichern und Bildexport.",
      titleHistory: "Undo, Redo, Reset",
      textHistory:
        "Diese Leiste enthält Rückgängig, Wiederholen und Zurücksetzen des Diagramms.",
      titleSourcecode: "Quellcode",
      textSourcecode:
        "Mit diesem Button blendest du den Quellcode ein. Sprache und Kopieren stehen dann rechts bereit.",
      back: "Zurück",
      next: "Weiter",
      done: "Fertig",
      finish: "Beenden",
    },
  },
  en: {
    common: {
      ok: "OK",
      cancel: "Cancel",
      close: "Close",
      yes: "Yes",
      no: "No",
      undo: "Undo",
      redo: "Redo",
      reset: "Reset",
      settings: "Settings",
      remove: "Remove",
      move: "Move",
      moveCancel: "Cancel move",
      addCase: "Add case",
      addCatch: "Add catch",
      addParameter: "Add parameter",
      sourcecode: "Source code",
    },
    nodes: {
      InputNode: "Input field",
      OutputNode: "Output field",
      TaskNode: "Statement",
      BlockCallNode: "Block call",
      CountLoopNode: "Count-controlled loop",
      HeadLoopNode: "Head-controlled loop",
      FootLoopNode: "Foot-controlled loop",
      BranchNode: "Branch",
      CaseNode: "Case distinction",
      TryCatchNode: "Try-catch block",
      FunctionNode: "Function block",
    },
    nav: {
      unnamed: "untitled",
      renameTooltip: "Rename your diagram.",
      renamePrompt: "Please enter a name for your diagram:",
      donate: "Donate",
      donateTooltip: "Support Struktog",
    },
    footer: {
      sourceCode: "Source code",
      sourceTooltip: "GitLab repository",
      contributors: "Contributors",
      contributorsTooltip: "Contributors",
      maintainer: "Maintainer Thiemo Leonhardt",
      whatsNewTooltip: "What's new?",
      imprint: "Imprint",
      imprintTooltip: "Imprint",
      devNotice: "Development branch please use ",
      stableVersion: "stable version",
    },
    editor: {
      chooseElement: "Choose element:",
      heading: "Editor:",
      trueLabel: "True",
      falseLabel: "False",
      caseSettingsTitle: "Settings for {{node}}: ",
      tryCatchSettingsTitle: "Settings for {{node}}: ",
      functionSettingsTitle: "Settings for {{node}}: ",
      numberOfParameters: "Number of parameters:",
      numberOfCases: "Number of cases:",
      numberOfCatches: "Number of catch blocks:",
      functionReturnType: "Return type:",
      functionParameters: "Parameters:",
      functionParameterLabel: "Parameter",
      functionParametersEmpty: "No parameters",
      enableDefaultBranch: "Enable else branch:",
      deleteQuestion: "Delete this element and all nested blocks?",
      deleteAllQuestion: "Delete everything?",
      removeParameterTooltip: "Remove",
      expandEditorWidth: "Expand editor to full page width",
      limitEditorWidth: "Limit editor to 1200px",
    },
    code: {
      translateTo: "Translate to:",
      copyCode: "Copy code",
      showSourcecode: "Show source code",
      unsupported:
        "The diagram contains elements\nthat are not directly available\nin the selected programming language.\nPlease convert them to code manually.",
    },
    importExport: {
      startTour: "Start tour",
      settings: "Settings",
      load: "Load",
      save: "Save",
      imageExport: "Image export",
      imageExportFormatTitle: "Choose image format",
      exportPng: "PNG",
      exportSvg: "SVG",
      settingsTitle: "Settings",
      tabGeneral: "General",
      tabColors: "Colors",
      profile: "Profile",
      showElements: "Show elements",
      language: "Programming language",
      uiLanguage: "Interface language",
      uiAuto: "Automatic (browser)",
      showSourcecode: "Show source code",
      enableShortcuts: "Enable shortcuts (Alt+1..0)",
      restrictFunctionInsertToTop:
        "Only allow function blocks at the top of the diagram",
      resetColors: "Reset colors",
      colorGroupInputOutput: "Input and output",
      colorGroupLoops: "Loops",
      colorGroupBranching: "Branching and error handling",
      colorGroupFunctions: "Functions",
      applyGroupColor: "Apply group color",
      atLeastOneElement: "Please keep at least one element enabled.",
      invalidJson: "File could not be read: invalid JSON.",
      unknownImportFormat: "File could not be imported: unknown format.",
    },
    webtour: {
      titleIntro: "What is a Nassi-Shneiderman diagram?",
      textIntro:
        "A Nassi-Shneiderman diagram describes an algorithm using clear, structured building blocks. You plan program flow step by step with sequence, branch, and loop before writing source code. The editor helps you create these blocks consistently, arrange them logically, and transform them into executable code.",
      titleStart: "Quick tour",
      textStart: "You can start this introduction here at any time.",
      titleNaming: "Name your diagram",
      textNaming:
        "You can rename your diagram here. This name is also used for future JSON and PNG export filenames.",
      titleInsert: "Insert elements",
      textInsert:
        "Choose an element here and insert it by click or drag and drop.",
      titleWorkspace: "Workspace",
      textWorkspace: "Build your diagram here and edit content directly.",
      titleElementOptions: "Element options",
      textElementOptions:
        "Inserted elements provide actions like delete and type-specific options.",
      titleFileSettings: "File and settings",
      textFileSettings:
        "At the top you can access settings, load/save, and image export.",
      titleHistory: "Undo, Redo, Reset",
      textHistory:
        "This bar contains undo, redo, and reset actions for the diagram.",
      titleSourcecode: "Source code",
      textSourcecode:
        "Use this button to show source code. Language and copy actions are then available on the right.",
      back: "Back",
      next: "Next",
      done: "Done",
      finish: "Close",
    },
  },
  fr: {
    common: {
      ok: "OK",
      cancel: "Annuler",
      close: "Fermer",
      yes: "Oui",
      no: "Non",
      undo: "Annuler",
      redo: "Rétablir",
      reset: "Réinitialiser",
      settings: "Paramètres",
      remove: "Supprimer",
      move: "Déplacer",
      moveCancel: "Annuler le déplacement",
      addCase: "Ajouter un cas",
      addCatch: "Ajouter un bloc catch",
      addParameter: "Ajouter un paramètre",
      sourcecode: "Code source",
    },
    nodes: {
      InputNode: "Entrée",
      OutputNode: "Sortie",
      TaskNode: "Instruction",
      BlockCallNode: "Appel de bloc",
      CountLoopNode: "Boucle à compteur",
      HeadLoopNode: "Boucle à pré-condition",
      FootLoopNode: "Boucle à post-condition",
      BranchNode: "Branchement",
      CaseNode: "Distinction de cas",
      TryCatchNode: "Bloc try-catch",
      FunctionNode: "Bloc function",
    },
    nav: {
      unnamed: "sans titre",
      renameTooltip: "Renommez votre diagramme.",
      renamePrompt: "Veuillez saisir un nom pour votre diagramme :",
      donate: "Faire un don",
      donateTooltip: "Soutenir Struktog",
    },
    footer: {
      sourceCode: "Code source",
      sourceTooltip: "Dépôt GitLab",
      contributors: "Contributeurs",
      contributorsTooltip: "Contributeurs",
      maintainer: "Mainteneur Thiemo Leonhardt",
      whatsNewTooltip: "Nouveautés ?",
      imprint: "Mentions légales",
      imprintTooltip: "Mentions légales",
      devNotice: "Branche de développement, veuillez utiliser ",
      stableVersion: "la version stable",
    },
    editor: {
      chooseElement: "Choisir un élément :",
      heading: "Éditeur :",
      trueLabel: "Vrai",
      falseLabel: "Faux",
      caseSettingsTitle: "Paramètres de {{node}} : ",
      tryCatchSettingsTitle: "Paramètres de {{node}} : ",
      functionSettingsTitle: "Paramètres de {{node}} : ",
      numberOfParameters: "Nombre de paramètres :",
      numberOfCases: "Nombre de cas :",
      numberOfCatches: "Nombre de blocs catch :",
      functionReturnType: "Type de retour :",
      functionParameters: "Paramètres :",
      functionParameterLabel: "Paramètre",
      functionParametersEmpty: "Aucun paramètre",
      enableDefaultBranch: "Activer la branche sinon :",
      deleteQuestion:
        "Supprimer cet élément et tous les blocs qu'il contient ?",
      deleteAllQuestion: "Tout supprimer ?",
      removeParameterTooltip: "Supprimer",
      expandEditorWidth: "Etendre l'editeur a la largeur de la page",
      limitEditorWidth: "Limiter l'editeur a 1200px",
    },
    code: {
      translateTo: "Traduire vers :",
      copyCode: "Copier le code",
      showSourcecode: "Afficher le code source",
      unsupported:
        "Le diagramme contient des éléments\nqui ne sont pas directement disponibles\ndans le langage sélectionné.\nVeuillez les convertir manuellement en code.",
    },
    importExport: {
      startTour: "Démarrer la visite",
      settings: "Paramètres",
      load: "Charger",
      save: "Enregistrer",
      imageExport: "Exporter l'image",
      imageExportFormatTitle: "Choisir le format d'image",
      exportPng: "PNG",
      exportSvg: "SVG",
      settingsTitle: "Paramètres",
      tabGeneral: "Général",
      tabColors: "Couleurs",
      profile: "Profil",
      showElements: "Afficher les éléments",
      language: "Langage de programmation",
      uiLanguage: "Langue de l'interface",
      uiAuto: "Automatique (navigateur)",
      showSourcecode: "Afficher le code source",
      enableShortcuts: "Activer les raccourcis (Alt+1..0)",
      restrictFunctionInsertToTop:
        "Autoriser les blocs function uniquement en haut du diagramme",
      resetColors: "Réinitialiser les couleurs",
      colorGroupInputOutput: "Entrée et sortie",
      colorGroupLoops: "Boucles",
      colorGroupBranching: "Branchements et erreurs",
      colorGroupFunctions: "Fonctions",
      applyGroupColor: "Appliquer la couleur du groupe",
      atLeastOneElement: "Veuillez laisser au moins un élément activé.",
      invalidJson: "Le fichier ne peut pas être lu : JSON invalide.",
      unknownImportFormat:
        "Le fichier ne peut pas être importé : format inconnu.",
    },
    webtour: {
      titleIntro: "Qu'est-ce qu'un diagramme de Nassi-Shneiderman ?",
      textIntro:
        "Un diagramme de Nassi-Shneiderman décrit un algorithme avec des blocs structurés clairs. Vous planifiez le déroulement du programme étape par étape avec séquence, branchement et boucle avant d'écrire le code source. L'éditeur vous aide à créer ces blocs de manière cohérente, à les organiser logiquement et à les transformer en code exécutable.",
      titleStart: "Visite rapide",
      textStart: "Vous pouvez démarrer cette introduction ici à tout moment.",
      titleNaming: "Nommer le diagramme",
      textNaming:
        "Vous pouvez renommer votre diagramme ici. Ce nom est aussi utilisé pour les futurs noms de fichiers d'export JSON et PNG.",
      titleInsert: "Insérer des éléments",
      textInsert:
        "Choisissez ici un élément et insérez-le par clic ou glisser-déposer.",
      titleWorkspace: "Espace de travail",
      textWorkspace:
        "Construisez votre diagramme ici et modifiez les contenus directement.",
      titleElementOptions: "Options des éléments",
      textElementOptions:
        "Les éléments insérés offrent des actions comme supprimer et des options selon le type.",
      titleFileSettings: "Fichier et paramètres",
      textFileSettings:
        "En haut, vous trouvez les paramètres, le chargement/enregistrement et l'export d'image.",
      titleHistory: "Annuler, Rétablir, Réinitialiser",
      textHistory:
        "Cette barre contient les actions d'annulation, de rétablissement et de réinitialisation du diagramme.",
      titleSourcecode: "Code source",
      textSourcecode:
        "Utilisez ce bouton pour afficher le code source. La langue et la copie sont ensuite disponibles à droite.",
      back: "Retour",
      next: "Suivant",
      done: "Terminer",
      finish: "Fermer",
    },
  },
  es: {
    common: {
      ok: "OK",
      cancel: "Cancelar",
      close: "Cerrar",
      yes: "Sí",
      no: "No",
      undo: "Deshacer",
      redo: "Rehacer",
      reset: "Restablecer",
      settings: "Configuración",
      remove: "Eliminar",
      move: "Mover",
      moveCancel: "Cancelar movimiento",
      addCase: "Agregar caso",
      addCatch: "Agregar bloque catch",
      addParameter: "Agregar parámetro",
      sourcecode: "Código fuente",
    },
    nodes: {
      InputNode: "Entrada",
      OutputNode: "Salida",
      TaskNode: "Instrucción",
      BlockCallNode: "Llamada de bloque",
      CountLoopNode: "Bucle con contador",
      HeadLoopNode: "Bucle de cabecera",
      FootLoopNode: "Bucle de pie",
      BranchNode: "Rama condicional",
      CaseNode: "Distinción de casos",
      TryCatchNode: "Bloque try-catch",
      FunctionNode: "Bloque function",
    },
    nav: {
      unnamed: "sin título",
      renameTooltip: "Renombra tu diagrama.",
      renamePrompt: "Introduce un nombre para tu diagrama:",
      donate: "Donar",
      donateTooltip: "Apoya Struktog",
    },
    footer: {
      sourceCode: "Código fuente",
      sourceTooltip: "Repositorio de GitLab",
      contributors: "Colaboradores",
      contributorsTooltip: "Colaboradores",
      maintainer: "Mantenedor Thiemo Leonhardt",
      whatsNewTooltip: "¿Qué hay de nuevo?",
      imprint: "Aviso legal",
      imprintTooltip: "Aviso legal",
      devNotice: "Rama de desarrollo, utiliza ",
      stableVersion: "la versión estable",
    },
    editor: {
      chooseElement: "Elegir elemento:",
      heading: "Editor:",
      trueLabel: "Verdadero",
      falseLabel: "Falso",
      caseSettingsTitle: "Configuración de {{node}}: ",
      tryCatchSettingsTitle: "Configuración de {{node}}: ",
      functionSettingsTitle: "Configuración de {{node}}: ",
      numberOfParameters: "Cantidad de parámetros:",
      numberOfCases: "Cantidad de casos:",
      numberOfCatches: "Cantidad de bloques catch:",
      functionReturnType: "Tipo de retorno:",
      functionParameters: "Parámetros:",
      functionParameterLabel: "Parámetro",
      functionParametersEmpty: "Sin parámetros",
      enableDefaultBranch: "Activar rama predeterminada:",
      deleteQuestion: "¿Eliminar este elemento y todos los bloques anidados?",
      deleteAllQuestion: "¿Eliminar todo?",
      removeParameterTooltip: "Eliminar",
      expandEditorWidth: "Ampliar editor al ancho completo",
      limitEditorWidth: "Limitar editor a 1200px",
    },
    code: {
      translateTo: "Traducir a:",
      copyCode: "Copiar código",
      showSourcecode: "Mostrar código fuente",
      unsupported:
        "El diagrama contiene elementos\nque no están disponibles directamente\nen el lenguaje de programación seleccionado.\nPor favor, conviértelos manualmente a código.",
    },
    importExport: {
      startTour: "Iniciar tour",
      settings: "Configuración",
      load: "Cargar",
      save: "Guardar",
      imageExport: "Exportar imagen",
      imageExportFormatTitle: "Elegir formato de imagen",
      exportPng: "PNG",
      exportSvg: "SVG",
      settingsTitle: "Configuración",
      tabGeneral: "General",
      tabColors: "Colores",
      profile: "Perfil",
      showElements: "Mostrar elementos",
      language: "Lenguaje de programación",
      uiLanguage: "Idioma de la interfaz",
      uiAuto: "Automático (navegador)",
      showSourcecode: "Mostrar código fuente",
      enableShortcuts: "Activar atajos (Alt+1..0)",
      restrictFunctionInsertToTop:
        "Permitir bloques function solo al inicio del diagrama",
      resetColors: "Restablecer colores",
      colorGroupInputOutput: "Entrada y salida",
      colorGroupLoops: "Bucles",
      colorGroupBranching: "Ramas y manejo de errores",
      colorGroupFunctions: "Funciones",
      applyGroupColor: "Aplicar color del grupo",
      atLeastOneElement: "Mantén al menos un elemento activado.",
      invalidJson: "No se pudo leer el archivo: JSON inválido.",
      unknownImportFormat:
        "No se pudo importar el archivo: formato desconocido.",
    },
    webtour: {
      titleIntro: "¿Qué es un diagrama de Nassi-Shneiderman?",
      textIntro:
        "Un diagrama de Nassi-Shneiderman describe un algoritmo con bloques claros y estructurados. Planificas el flujo del programa paso a paso con secuencia, rama y bucle antes de escribir código fuente. El editor te ayuda a crear estos bloques de forma coherente, ordenarlos lógicamente y transformarlos en código ejecutable.",
      titleStart: "Tour rápido",
      textStart: "Puedes iniciar esta introducción aquí en cualquier momento.",
      titleNaming: "Nombrar el diagrama",
      textNaming:
        "Aquí puedes renombrar tu diagrama. Este nombre también se usa para futuros nombres de archivo en las exportaciones JSON y PNG.",
      titleInsert: "Insertar elementos",
      textInsert:
        "Elige un elemento aquí e insértalo con clic o arrastrar y soltar.",
      titleWorkspace: "Área de trabajo",
      textWorkspace:
        "Aquí construyes tu diagrama y editas el contenido directamente.",
      titleElementOptions: "Opciones del elemento",
      textElementOptions:
        "Los elementos insertados ofrecen acciones como eliminar y otras opciones según el tipo.",
      titleFileSettings: "Archivo y configuración",
      textFileSettings:
        "Arriba encontrarás configuración, cargar/guardar y exportación de imagen.",
      titleHistory: "Deshacer, Rehacer, Restablecer",
      textHistory:
        "Esta barra contiene las acciones de deshacer, rehacer y restablecer del diagrama.",
      titleSourcecode: "Código fuente",
      textSourcecode:
        "Con este botón muestras el código fuente. El idioma y la copia quedan disponibles a la derecha.",
      back: "Atrás",
      next: "Siguiente",
      done: "Listo",
      finish: "Cerrar",
    },
  },
};

const contentDefaultsByLanguage = {
  de: {
    taskDefault: "Anweisung",
    blockCallDefault: "Blockaufruf",
    branchCondition: "Bedingung",
    caseVariable: "Variable",
    caseLabel: "Fall",
    elseLabel: "Sonst",
    countCondition: "Zählbedingung",
    loopCondition: "Gültigkeitsbedingung",
    catchUndefined: "undefiniert",
    functionKeyword: "function",
    returnTypePlaceholder: "Rückgabetyp",
    inputPrefix: "E",
    outputPrefix: "A",
    trueLabel: "Wahr",
    falseLabel: "Falsch",
    tryLabel: "Try",
    catchLabel: "Catch",
  },
  en: {
    taskDefault: "Statement",
    blockCallDefault: "Block call",
    branchCondition: "Condition",
    caseVariable: "Expression",
    caseLabel: "Case",
    elseLabel: "Else",
    countCondition: "Count condition",
    loopCondition: "Validity condition",
    catchUndefined: "undefined",
    functionKeyword: "function",
    returnTypePlaceholder: "Return type",
    inputPrefix: "I",
    outputPrefix: "O",
    trueLabel: "True",
    falseLabel: "False",
    tryLabel: "Try",
    catchLabel: "Catch",
  },
  fr: {
    taskDefault: "Instruction",
    blockCallDefault: "Appel de bloc",
    branchCondition: "Condition",
    caseVariable: "Expression",
    caseLabel: "Cas",
    elseLabel: "Sinon",
    countCondition: "Condition de comptage",
    loopCondition: "Condition de validité",
    catchUndefined: "indéfini",
    functionKeyword: "function",
    returnTypePlaceholder: "Type de retour",
    inputPrefix: "E",
    outputPrefix: "S",
    trueLabel: "Vrai",
    falseLabel: "Faux",
    tryLabel: "Try",
    catchLabel: "Catch",
  },
  es: {
    taskDefault: "Instrucción",
    blockCallDefault: "Llamada de bloque",
    branchCondition: "Condición",
    caseVariable: "Expresión",
    caseLabel: "Caso",
    elseLabel: "Si no",
    countCondition: "Condición de conteo",
    loopCondition: "Condición de validez",
    catchUndefined: "indefinido",
    functionKeyword: "function",
    returnTypePlaceholder: "Tipo de retorno",
    inputPrefix: "E",
    outputPrefix: "S",
    trueLabel: "Verdadero",
    falseLabel: "Falso",
    tryLabel: "Try",
    catchLabel: "Catch",
  },
};

const contentDefaultAliases = {
  countCondition: ["Zaehlbedingung", "Zahlbedingung", "Zaehl-Bedingung"],
  loopCondition: ["Gueltigkeitsbedingung", "Gultigkeitsbedingung"],
  returnTypePlaceholder: ["Rueckgabetyp", "Ruckgabetyp", "Ruckgabe Typ"],
  taskDefault: ["Anweisung"],
  blockCallDefault: ["Blockaufruf"],
  branchCondition: ["Bedingung"],
  caseVariable: ["Variable"],
  caseLabel: ["Fall"],
  elseLabel: ["Sonst"],
  catchUndefined: ["undefiniert"],
  functionKeyword: ["function"],
  inputPrefix: ["E"],
  outputPrefix: ["A"],
  trueLabel: ["Wahr"],
  falseLabel: ["Falsch"],
  tryLabel: ["Try"],
  catchLabel: ["Catch"],
};

let uiLanguagePreference = UI_LANGUAGE_AUTO;
let resolvedUiLanguage = "de";

function normalizeLanguageCode(value) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === UI_LANGUAGE_AUTO) {
    return UI_LANGUAGE_AUTO;
  }

  for (const lang of SUPPORTED_UI_LANGUAGES) {
    if (normalized === lang || normalized.startsWith(lang + "-")) {
      return lang;
    }
  }

  return null;
}

function resolveValue(path, language) {
  const keys = path.split(".");
  let result = translations[language];
  for (const key of keys) {
    if (!result || typeof result !== "object" || !(key in result)) {
      return null;
    }
    result = result[key];
  }
  return typeof result === "string" ? result : null;
}

export function detectBrowserLanguage() {
  const languageCandidates = [];
  if (typeof navigator !== "undefined") {
    if (Array.isArray(navigator.languages)) {
      languageCandidates.push(...navigator.languages);
    }
    if (navigator.language) {
      languageCandidates.push(navigator.language);
    }
  }

  for (const candidate of languageCandidates) {
    const normalized = normalizeLanguageCode(candidate);
    if (normalized && normalized !== UI_LANGUAGE_AUTO) {
      return normalized;
    }
  }

  return "de";
}

export function resolveUiLanguage(setting = UI_LANGUAGE_AUTO) {
  const normalized = normalizeLanguageCode(setting);
  if (normalized && normalized !== UI_LANGUAGE_AUTO) {
    return normalized;
  }
  return detectBrowserLanguage();
}

export function initializeI18n() {
  if (typeof Storage !== "undefined") {
    const storedPreference = localStorage.getItem(UI_LANGUAGE_STORAGE_KEY);
    const normalized = normalizeLanguageCode(storedPreference);
    uiLanguagePreference = normalized || UI_LANGUAGE_AUTO;
  }

  resolvedUiLanguage = resolveUiLanguage(uiLanguagePreference);
}

export function getUiLanguagePreference() {
  return uiLanguagePreference;
}

export function getUiLanguage() {
  return resolvedUiLanguage;
}

export function setUiLanguagePreference(preference, persist = true) {
  const normalized = normalizeLanguageCode(preference) || UI_LANGUAGE_AUTO;
  uiLanguagePreference = normalized;
  resolvedUiLanguage = resolveUiLanguage(uiLanguagePreference);

  if (persist && typeof Storage !== "undefined") {
    localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, uiLanguagePreference);
  }
}

export function getUiLanguageStorageKey() {
  return UI_LANGUAGE_STORAGE_KEY;
}

export function getSupportedUiLanguages() {
  return [...SUPPORTED_UI_LANGUAGES];
}

export function getUiLanguageSelectOptions() {
  return [
    { value: UI_LANGUAGE_AUTO, label: t("importExport.uiAuto") },
    { value: "de", label: "Deutsch" },
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
    { value: "es", label: "Español" },
  ];
}

export function getNodeLabel(nodeType) {
  return t("nodes." + nodeType);
}

function normalizeContentValue(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function getContentDefault(key, language = null) {
  const targetLanguage = language || resolvedUiLanguage;
  if (
    targetLanguage in contentDefaultsByLanguage &&
    key in contentDefaultsByLanguage[targetLanguage]
  ) {
    return contentDefaultsByLanguage[targetLanguage][key];
  }
  return contentDefaultsByLanguage.de[key] || "";
}

export function isContentDefaultValue(value, key) {
  const normalizedValue = normalizeContentValue(value);
  if (normalizedValue === "") {
    return false;
  }

  const aliases = [];
  for (const language of SUPPORTED_UI_LANGUAGES) {
    aliases.push(getContentDefault(key, language));
  }
  if (key in contentDefaultAliases) {
    aliases.push(...contentDefaultAliases[key]);
  }

  return aliases.some(
    (candidate) => normalizeContentValue(candidate) === normalizedValue
  );
}

export function localizeContentDefault(value, key, language = null) {
  if (!isContentDefaultValue(value, key)) {
    return value;
  }
  return getContentDefault(key, language);
}

export function t(key, params = {}) {
  let result = resolveValue(key, resolvedUiLanguage);
  if (result === null) {
    result = resolveValue(key, "de");
  }
  if (result === null) {
    return key;
  }

  return result.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, paramKey) => {
    if (Object.prototype.hasOwnProperty.call(params, paramKey)) {
      return String(params[paramKey]);
    }
    return match;
  });
}

initializeI18n();
