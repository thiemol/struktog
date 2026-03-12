export const SOURCE_CODE_TRANSLATIONS = {
      Python: {
        untranslatable: [],
        InputNode: {
          pre: "",
          post: ' = input("Eingabe")\n',
        },
        OutputNode: {
          pre: "print(",
          post: ")\n",
        },
        TaskNode: {
          pre: "",
          post: "\n",
        },
        BranchNode: {
          pre: "if ",
          post: ":\n",
          between: "else:\n",
        },
        TryCatchNode: {
          pre: "try:\n",
          between: "except",
          post: ":\n",
        },
        CountLoopNode: {
          pre: "for ",
          post: ":\n",
        },
        HeadLoopNode: {
          pre: "while ",
          post: ":\n",
        },
        FunctionNode: {
          pre: "def ",
          between: "(",
          post: "):\n",
        },
        FootLoopNode: {
          prepre: "while True:\n",
          pre: "    if not ",
          post: ":\n        break\n",
        },
        CaseNode: {
          pre: "if ",
          post: ":\n",
        },
        InsertCase: {
          preNormal: "elif ",
          preDefault: "default",
          post: ":\n",
          postpost: "\n",
        },
        leftBracket: "",
        rightBracket: "",
        pseudoSwitch: true,
      },
      "Python ab v3.10": {
        untranslatable: [],
        InputNode: {
          pre: "",
          post: ' = input("Eingabe")\n',
        },
        OutputNode: {
          pre: "print(",
          post: ")\n",
        },
        TaskNode: {
          pre: "",
          post: "\n",
        },
        BranchNode: {
          pre: "if ",
          post: ":\n",
          between: "else:\n",
        },
        TryCatchNode: {
          pre: "try:\n",
          between: "except",
          post: ":\n",
        },
        CountLoopNode: {
          pre: "for ",
          post: ":\n",
        },
        HeadLoopNode: {
          pre: "while ",
          post: ":\n",
        },
        FunctionNode: {
          pre: "def ",
          between: "(",
          post: "):\n",
        },
        FootLoopNode: {
          prepre: "while True:\n",
          pre: "    if not ",
          post: ":\n        break\n",
        },
        CaseNode: {
          pre: "match ",
          post: ":\n",
        },
        InsertCase: {
          preNormal: "case ",
          preDefault: "case _",
          post: ":\n",
          postpost: "\n",
        },
        leftBracket: "",
        rightBracket: "",
        pseudoSwitch: false,
      },
      PHP: {
        untranslatable: [],
        InputNode: {
          pre: "",
          post: ' = readline("Eingabe");\n',
        },
        OutputNode: {
          pre: "echo ",
          post: ";\n",
        },
        TaskNode: {
          pre: "",
          post: ";\n",
        },
        BranchNode: {
          pre: "if (",
          post: ")\n",
          between: "} else {\n",
        },
        TryCatchNode: {
          pre: "try\n",
          between: "catch (",
          post: ")\n",
        },
        CountLoopNode: {
          pre: "for (",
          post: ")\n",
        },
        HeadLoopNode: {
          pre: "while (",
          post: ")\n",
        },
        FootLoopNode: {
          prepre: "do\n",
          pre: "while (",
          post: ");\n",
        },
        FunctionNode: {
          pre: "function ",
          between: "(",
          post: ")\n",
        },
        CaseNode: {
          pre: "switch (",
          post: ")\n",
        },
        InsertCase: {
          preNormal: "case ",
          preDefault: "default",
          post: ":\n",
          postpost: "break;\n",
        },
        leftBracket: "{",
        rightBracket: "}",
        pseudoSwitch: false,
      },
      Java: {
        untranslatable: [],
        InputNode: {
          pre: "",
          post: " = System.console().readLine();\n",
        },
        OutputNode: {
          pre: "System.out.println(",
          post: ");\n",
        },
        TaskNode: {
          pre: "",
          post: ";\n",
        },
        BranchNode: {
          pre: "if (",
          post: ")\n",
          between: "} else {\n",
        },
        TryCatchNode: {
          pre: "try\n",
          between: "catch (",
          post: ")\n",
        },
        CountLoopNode: {
          pre: "for (",
          post: ")\n",
        },
        HeadLoopNode: {
          pre: "while (",
          post: ")\n",
        },
        FootLoopNode: {
          prepre: "do\n",
          pre: "while (",
          post: ");\n",
        },
        FunctionNode: {
          pre: "public void ",
          between: "(",
          post: ")\n",
        },
        CaseNode: {
          pre: "switch (",
          post: ")\n",
        },
        InsertCase: {
          preNormal: "case ",
          preDefault: "default",
          post: ":\n",
          postpost: "break;\n",
        },
        leftBracket: "{",
        rightBracket: "}",
        pseudoSwitch: false,
      },
      "C#": {
        untranslatable: [],
        InputNode: {
          pre: "",
          post: " = Console.ReadLine();\n",
        },
        OutputNode: {
          pre: "Console.WriteLine(",
          post: ");\n",
        },
        TaskNode: {
          pre: "",
          post: ";\n",
        },
        BranchNode: {
          pre: "if (",
          post: ")\n",
          between: "} else {\n",
        },
        TryCatchNode: {
          pre: "try\n",
          between: "catch (",
          post: ")\n",
        },
        CountLoopNode: {
          pre: "for (",
          post: ")\n",
        },
        HeadLoopNode: {
          pre: "while (",
          post: ")\n",
        },
        FootLoopNode: {
          prepre: "do\n",
          pre: "while (",
          post: ");\n",
        },
        FunctionNode: {
          pre: "public void ",
          between: "(",
          post: ")\n",
        },
        CaseNode: {
          pre: "switch (",
          post: ")\n",
        },
        InsertCase: {
          preNormal: "case ",
          preDefault: "default",
          post: ":\n",
          postpost: "break;\n",
        },
        leftBracket: "{",
        rightBracket: "}",
        pseudoSwitch: false,
      },
      "C++": {
        untranslatable: [],
        InputNode: {
          pre: "std::cin >> ",
          post: ";\n",
        },
        OutputNode: {
          pre: "std::cout << ",
          post: ";\n",
        },
        TaskNode: {
          pre: "",
          post: ";\n",
        },
        BranchNode: {
          pre: "if (",
          post: ")\n",
          between: "} else {\n",
        },
        TryCatchNode: {
          pre: "try\n",
          between: "catch (",
          post: ")\n",
        },
        CountLoopNode: {
          pre: "for (",
          post: ")\n",
        },
        HeadLoopNode: {
          pre: "while (",
          post: ")\n",
        },
        FootLoopNode: {
          prepre: "do\n",
          pre: "while (",
          post: ");\n",
        },
        FunctionNode: {
          pre: "void ",
          between: "(",
          post: ")\n",
        },
        CaseNode: {
          pre: "switch (",
          post: ")\n",
        },
        InsertCase: {
          preNormal: "case ",
          preDefault: "default",
          post: ":\n",
          postpost: "break;\n",
        },
        leftBracket: "{",
        rightBracket: "}",
        pseudoSwitch: false,
      },
      C: {
        untranslatable: ["TryCatchNode"],
        InputNode: {
          pre: "scanf(",
          post: ");\n",
        },
        OutputNode: {
          pre: "printf(",
          post: ");\n",
        },
        TaskNode: {
          pre: "",
          post: ";\n",
        },
        BranchNode: {
          pre: "if (",
          post: ")\n",
          between: "} else {\n",
        },
        TryCatchNode: {
          pre: "",
          between: "",
          post: "",
        },
        CountLoopNode: {
          pre: "for (",
          post: ")\n",
        },
        HeadLoopNode: {
          pre: "while (",
          post: ")\n",
        },
        FootLoopNode: {
          prepre: "do\n",
          pre: "while (",
          post: ");\n",
        },
        FunctionNode: {
          pre: "void ",
          between: "(",
          post: ")\n",
        },
        CaseNode: {
          pre: "switch (",
          post: ")\n",
        },
        InsertCase: {
          preNormal: "case ",
          preDefault: "default",
          post: ":\n",
          postpost: "break;\n",
        },
        leftBracket: "{",
        rightBracket: "}",
        pseudoSwitch: false,
      },
    };

export function getSupportedCodeLanguages() {
  return Object.keys(SOURCE_CODE_TRANSLATIONS);
}

function addIndentations(indentLevel) {
  let text = "";
  const defaultIndent = "    ";
  for (let i = 0; i < indentLevel; i += 1) {
    text += defaultIndent;
  }
  return text;
}

function getTranslation(language) {
  if (!Object.prototype.hasOwnProperty.call(SOURCE_CODE_TRANSLATIONS, language)) {
    return null;
  }
  return SOURCE_CODE_TRANSLATIONS[language];
}

function hasNodeType(subTree, nodeType) {
  if (
    !subTree ||
    subTree.type === "Placeholder" ||
    (subTree.type === "InsertNode" && subTree.followElement === null)
  ) {
    return false;
  }

  if (subTree.type === nodeType) {
    return true;
  }

  switch (subTree.type) {
    case "InsertNode":
    case "InputNode":
    case "OutputNode":
    case "TaskNode":
    case "BlockCallNode":
      return hasNodeType(subTree.followElement, nodeType);
    case "BranchNode":
      return (
        hasNodeType(subTree.trueChild, nodeType) ||
        hasNodeType(subTree.falseChild, nodeType) ||
        hasNodeType(subTree.followElement, nodeType)
      );
    case "TryCatchNode": {
      const catches = Array.isArray(subTree.catches) ? subTree.catches : [];
      return (
        hasNodeType(subTree.tryChild, nodeType) ||
        catches.some((catchNode) => hasNodeType(catchNode, nodeType)) ||
        hasNodeType(subTree.catchChild, nodeType) ||
        hasNodeType(subTree.followElement, nodeType)
      );
    }
    case "CountLoopNode":
    case "HeadLoopNode":
    case "FootLoopNode":
    case "FunctionNode":
      return (
        hasNodeType(subTree.child, nodeType) ||
        hasNodeType(subTree.followElement, nodeType)
      );
    case "CaseNode": {
      const cases = Array.isArray(subTree.cases) ? subTree.cases : [];
      return (
        cases.some((caseNode) => hasNodeType(caseNode, nodeType)) ||
        hasNodeType(subTree.defaultNode, nodeType) ||
        hasNodeType(subTree.followElement, nodeType)
      );
    }
    default:
      return false;
  }
}

export function isSourceCodeTranslatable(subTree, language) {
  const translation = getTranslation(language);
  if (!translation) {
    return false;
  }

  for (const nodeType of translation.untranslatable) {
    if (hasNodeType(subTree, nodeType)) {
      return false;
    }
  }

  return true;
}

function buildFunctionHeader(subTree, indentLevel, language, translation) {
  let functionPre = translation.FunctionNode.pre;
  const typedLanguages = ["Java", "C#", "C++", "C"];
  const returnType = (subTree.returnType || "").trim();
  if (typedLanguages.includes(language) && returnType !== "") {
    functionPre = functionPre.replace(/void\s+$/, returnType + " ");
  }

  const params = Array.isArray(subTree.parameters)
    ? subTree.parameters.map((par) => par.parName).join(", ")
    : "";

  return (
    addIndentations(indentLevel) +
    functionPre +
    (subTree.text || "") +
    translation.FunctionNode.between +
    params +
    translation.FunctionNode.post
  );
}

function generateCodeLines(subTree, indentLevel, language, switchVar = false) {
  if (
    !subTree ||
    subTree.type === "Placeholder" ||
    (subTree.type === "InsertNode" && subTree.followElement === null)
  ) {
    return [];
  }

  const translation = getTranslation(language);
  if (!translation) {
    return [];
  }

  const text = subTree.text || "";

  switch (subTree.type) {
    case "InsertNode":
      return generateCodeLines(subTree.followElement, indentLevel, language);
    case "InputNode":
      return [
        addIndentations(indentLevel) +
          translation.InputNode.pre +
          text +
          translation.InputNode.post,
        ...generateCodeLines(subTree.followElement, indentLevel, language),
      ];
    case "OutputNode":
      return [
        addIndentations(indentLevel) +
          translation.OutputNode.pre +
          text +
          translation.OutputNode.post,
        ...generateCodeLines(subTree.followElement, indentLevel, language),
      ];
    case "TaskNode":
    case "BlockCallNode": {
      const taskMappingKey =
        subTree.type === "BlockCallNode" ? "TaskNode" : subTree.type;
      return [
        addIndentations(indentLevel) +
          translation[taskMappingKey].pre +
          text +
          translation[taskMappingKey].post,
        ...generateCodeLines(subTree.followElement, indentLevel, language),
      ];
    }
    case "BranchNode": {
      let lines = [
        addIndentations(indentLevel) +
          translation.BranchNode.pre +
          text +
          translation.BranchNode.post,
      ];
      if (translation.leftBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.leftBracket + "\n");
      }
      lines = lines.concat(generateCodeLines(subTree.trueChild, indentLevel + 1, language));
      const falseContent = generateCodeLines(subTree.falseChild, indentLevel + 1, language);
      if (falseContent.length > 0) {
        lines.push(addIndentations(indentLevel) + translation.BranchNode.between);
        lines = lines.concat(falseContent);
      }
      if (translation.rightBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.rightBracket + "\n");
      }
      return lines.concat(generateCodeLines(subTree.followElement, indentLevel, language));
    }
    case "TryCatchNode": {
      let lines = [
        addIndentations(indentLevel) + translation.TryCatchNode.pre,
      ];
      if (translation.leftBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.leftBracket + "\n");
      }
      lines = lines.concat(generateCodeLines(subTree.tryChild, indentLevel + 1, language));
      if (translation.rightBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.rightBracket + "\n");
      }
      const catches = Array.isArray(subTree.catches) ? subTree.catches : [];
      catches.forEach((catchNode) => {
        let catchHeader = addIndentations(indentLevel) + translation.TryCatchNode.between;
        if (catchNode.text && catchNode.text !== "" && language.includes("Python")) {
          catchHeader += " ";
        }
        catchHeader += (catchNode.text || "") + translation.TryCatchNode.post;
        lines.push(catchHeader);
        if (translation.leftBracket !== "") {
          lines.push(addIndentations(indentLevel) + translation.leftBracket + "\n");
        }
        lines = lines.concat(generateCodeLines(catchNode, indentLevel + 1, language));
        if (translation.rightBracket !== "") {
          lines.push(addIndentations(indentLevel) + translation.rightBracket + "\n");
        }
      });
      return lines.concat(generateCodeLines(subTree.followElement, indentLevel, language));
    }
    case "CountLoopNode": {
      let lines = [
        addIndentations(indentLevel) +
          translation.CountLoopNode.pre +
          text +
          translation.CountLoopNode.post,
      ];
      if (translation.leftBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.leftBracket + "\n");
      }
      lines = lines.concat(generateCodeLines(subTree.child, indentLevel + 1, language));
      if (translation.rightBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.rightBracket + "\n");
      }
      return lines.concat(generateCodeLines(subTree.followElement, indentLevel, language));
    }
    case "HeadLoopNode": {
      let lines = [
        addIndentations(indentLevel) +
          translation.HeadLoopNode.pre +
          text +
          translation.HeadLoopNode.post,
      ];
      if (translation.leftBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.leftBracket + "\n");
      }
      lines = lines.concat(generateCodeLines(subTree.child, indentLevel + 1, language));
      if (translation.rightBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.rightBracket + "\n");
      }
      return lines.concat(generateCodeLines(subTree.followElement, indentLevel, language));
    }
    case "FootLoopNode": {
      let lines = [
        addIndentations(indentLevel) + translation.FootLoopNode.prepre,
      ];
      if (translation.leftBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.leftBracket + "\n");
      }
      lines = lines.concat(generateCodeLines(subTree.child, indentLevel + 1, language));
      if (translation.rightBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.rightBracket + "\n");
      }
      lines.push(
        addIndentations(indentLevel) +
          translation.FootLoopNode.pre +
          text +
          translation.FootLoopNode.post
      );
      return lines.concat(generateCodeLines(subTree.followElement, indentLevel, language));
    }
    case "FunctionNode": {
      let lines = [buildFunctionHeader(subTree, indentLevel, language, translation)];
      if (translation.leftBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.leftBracket + "\n");
      }
      lines = lines.concat(generateCodeLines(subTree.child, indentLevel + 1, language));
      if (translation.rightBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.rightBracket + "\n");
      }
      return lines.concat(generateCodeLines(subTree.followElement, indentLevel, language));
    }
    case "CaseNode": {
      let lines = [];
      if (!translation.pseudoSwitch) {
        lines.push(
          addIndentations(indentLevel) +
            translation.CaseNode.pre +
            text +
            translation.CaseNode.post
        );
      }
      if (translation.leftBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.leftBracket + "\n");
      }
      const cases = Array.isArray(subTree.cases) ? subTree.cases : [];
      cases.forEach((element) => {
        lines = lines.concat(
          generateCodeLines(
            element,
            translation.pseudoSwitch ? indentLevel : indentLevel + 1,
            language,
            translation.pseudoSwitch ? text : false
          )
        );
      });
      if (translation.pseudoSwitch && lines.length > 0) {
        lines[0] = lines[0].replace(/^\s*elif /, `${addIndentations(indentLevel)}if `);
      }
      if (subTree.defaultOn && subTree.defaultNode) {
        const defaultIndent = translation.pseudoSwitch ? indentLevel : indentLevel + 1;
        lines.push(
          addIndentations(defaultIndent) +
            translation.InsertCase.preDefault +
            translation.InsertCase.post
        );
        lines = lines.concat(
          generateCodeLines(
            subTree.defaultNode.followElement,
            translation.pseudoSwitch ? indentLevel + 1 : indentLevel + 2,
            language
          )
        );
        if (!translation.pseudoSwitch && (language === "C#" || language === "Java")) {
          lines.push(
            addIndentations(indentLevel + 2) + translation.InsertCase.postpost
          );
        }
      }
      if (translation.rightBracket !== "") {
        lines.push(addIndentations(indentLevel) + translation.rightBracket + "\n");
      }
      return lines.concat(generateCodeLines(subTree.followElement, indentLevel, language));
    }
    case "InsertCase": {
      let caseHeader = addIndentations(indentLevel) + translation.InsertCase.preNormal;
      if (switchVar) {
        caseHeader += switchVar + " == ";
      }
      caseHeader += text + translation.InsertCase.post;
      let lines = [caseHeader];
      lines = lines.concat(generateCodeLines(subTree.followElement, indentLevel + 1, language));
      if (!translation.pseudoSwitch) {
        lines.push(addIndentations(indentLevel + 1) + translation.InsertCase.postpost);
      }
      return lines;
    }
    default:
      return [];
  }
}

export function generateSourceCode(tree, language) {
  const translation = getTranslation(language);
  if (!translation) {
    return {
      ok: false,
      code: "UNSUPPORTED_LANGUAGE",
      error: "Unsupported source code language",
    };
  }

  const supported = isSourceCodeTranslatable(tree, language);
  return {
    ok: true,
    language,
    supported,
    code: supported ? generateCodeLines(tree, 0, language).join("") : "",
  };
}
