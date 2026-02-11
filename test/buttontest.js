require("geckodriver");

const chrome = require("selenium-webdriver/chrome"); /* required if you want */
const firefox = require("selenium-webdriver/firefox"); /* to test in headless mode */
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");
const path = require("path");

function stripNodeModulesBinFromPath() {
  const pathEntries = (process.env.PATH || "").split(":");
  process.env.PATH = pathEntries
    .filter((entry) => !entry.endsWith("/node_modules/.bin"))
    .join(":");
}

async function waitForModalToClose(driver) {
  await driver.wait(async () => {
    const overlays = await driver.findElements(By.css(".modal-overlay"));

    if (overlays.length === 0) {
      return true;
    }

    const visibleOverlays = await Promise.all(
      overlays.map(async (overlay) => overlay.isDisplayed())
    );

    return !visibleOverlays.some(Boolean);
  }, 2000);
}

async function confirmDeleteIfVisible(driver) {
  const confirmDeleteButtons = await driver.findElements(
    By.xpath("/html/body/main/div[2]/div[2]/div[3]/div[1]")
  );

  if (confirmDeleteButtons.length === 0) {
    return;
  }

  const confirmButtonVisible = await confirmDeleteButtons[0].isDisplayed();
  if (!confirmButtonVisible) {
    return;
  }

  await driver.executeScript("arguments[0].click();", confirmDeleteButtons[0]);
  await waitForModalToClose(driver);
}

async function getLastVisibleEnabledInput(inputs) {
  for (let i = inputs.length - 1; i >= 0; i--) {
    if ((await inputs[i].isDisplayed()) && (await inputs[i].isEnabled())) {
      return inputs[i];
    }
  }

  return null;
}

async function submitLatestInlineInput(driver, value) {
  const inlineInputs = await driver.findElements(By.css(".editField input"));
  if (inlineInputs.length === 0) {
    return false;
  }

  const targetInput = await getLastVisibleEnabledInput(inlineInputs);
  if (!targetInput) {
    return false;
  }

  await targetInput.sendKeys(value + Key.RETURN);
  return true;
}

//base paths needed for every xpath interaction
const baseX = "/html/body/main/div[1]/div[4]/div[1]/div[1]/div[1]/div";
const baseX_2 = "/html/body/main/div[1]/div[4]/div[1]/div[1]/div[2]/div";

class Button {
  constructor(id, inputX, textX, deleteX, clickX, loopClickX, loopX) {
    this.id = id;
    this.inputX = inputX; //relative XPath for text input area
    this.textX = textX; //relative XPath for text area
    this.deleteX = deleteX; //relative XPath for delete button
    this.clickX = clickX; //relative XPath to click to create an element
    this.loopClickX = loopClickX; //add this to XPath when creating new element within an element
    this.loopX = loopX; //add this to XPath to interact with input, text and delete once an element within an element has been created
  }
}
//                                      id                  inputX                                  textX                                   deleteX                         clickX                      loopClickX                      loopX
const inputButton = new Button(
  "InputButton",
  "/div[1]/div[2]/input",
  "/div[1]/div[1]/span",
  "/div[2]/div[2]",
  "",
  "",
  ""
);
const outputButton = new Button(
  "OutputButton",
  "/div[1]/div[2]/input",
  "/div[1]/div[1]/span",
  "/div[2]/div[2]",
  "",
  "",
  ""
);
const taskButton = new Button(
  "TaskButton",
  "/div[1]/div[2]/input",
  "/div[1]/div[1]/span",
  "/div[2]/div[2]",
  "",
  "",
  ""
);
const countLoopButton = new Button(
  "CountLoopButton",
  "/div[1]/div[1]/div[2]/input",
  "/div[1]/div[1]/div[1]/span",
  "/div[1]/div[2]/div[2]",
  "/div[2]/div",
  "/div[2]/div/div[2]/div",
  "/div[2]/div/div/div"
);
const headLoopButton = new Button(
  "HeadLoopButton",
  "/div[1]/div[1]/div[2]/input",
  "/div[1]/div[1]/div[1]/span",
  "/div[1]/div[2]/div[2]",
  "/div[2]/div",
  "/div[2]/div/div[2]/div",
  "/div[2]/div/div/div"
);
const footLoopButton = new Button(
  "FootLoopButton",
  "/div[2]/div[1]/div[2]/input",
  "/div[2]/div[1]/div[1]/span",
  "/div[2]/div[2]/div[2]",
  "/div[1]/div",
  "/div[1]/div/div[2]/div",
  "/div[1]/div/div[1]/div"
);
const branchButton = new Button(
  "BranchButton",
  "/div[1]/div[1]/div[1]/div[2]/input",
  "/div[1]/div[1]/div[1]/div[1]/span",
  "/div[1]/div[1]/div[2]/div[2]",
  "/div[2]/div[1]",
  "/div[2]/div[1]/div[2]/div",
  "/div[2]/div[1]/div"
);
const caseButton = new Button(
  "CaseButton",
  "/div[1]/div[1]/div[2]/input",
  "/div[1]/div[1]/div[1]/span",
  "/div[1]/div[2]/div[3]",
  "/div[2]/div[1]/div[2]",
  "/div[2]/div[1]/div[3]/div",
  "/div[2]/div[1]/div[2]/div"
);
const tryCatchButton = new Button(
  "TryCatchButton",
  "/div[4]/div[2]/div[2]/input",
  "/div[4]/div[2]/div[1]/span",
  "/div[1]/div[1]/div[2]",
  "/div[2]/div",
  "/div[2]/div/div[2]/div",
  "/div[2]/div/div/div"
);
const functionButton = new Button(
  "FunctionButton",
  "/div[1]/div[2]/input",
  "/div[1]/div[2]/span",
  "/div[1]/div[6]/div/div",
  "/div[2]/div",
  "/div[2]/div/div[2]/div",
  "/div[2]/div/div/div"
);

let buttons = [
  inputButton,
  outputButton,
  taskButton,
  countLoopButton,
  headLoopButton,
  footLoopButton,
  branchButton,
  caseButton,
  tryCatchButton,
  functionButton,
];
let vButton, vtest;

//function to check specifically for the parameter of the FunctionButton
async function functionButtonParameter(driver) {
  //we can use absolute xPath here, because we're only doing this once
  await driver
    .findElement(
      By.xpath(
        "/html/body/main/div[1]/div[4]/div[1]/div[1]/div[1]/div/div[1]/div[3]/button"
      )
    )
    .click();
  await driver
    .findElement(
      By.xpath(
        "/html/body/main/div[1]/div[4]/div[1]/div[1]/div[1]/div/div[1]/div[3]/div/span"
      )
    )
    .click();
  await driver
    .findElement(
      By.xpath(
        "/html/body/main/div[1]/div[4]/div[1]/div[1]/div[1]/div/div[1]/div[3]/div/input"
      )
    )
    .sendKeys("testPar" + Key.RETURN);
  vtest = await driver
    .findElement(
      By.xpath(
        "/html/body/main/div[1]/div[4]/div[1]/div[1]/div[1]/div/div[1]/div[3]/div/span"
      )
    )
    .getText();
  assert.strictEqual(vtest, "testPar");
  console.log("Parameter Text Test passed");

  await driver
    .findElement(
      By.xpath(
        "/html/body/main/div[1]/div[4]/div[1]/div[1]/div[1]/div/div[1]/div[3]/div/button"
      )
    )
    .click();
  vtest = (
    await driver.findElements(
      By.xpath(
        "/html/body/main/div[1]/div[4]/div[1]/div[1]/div[1]/div/div[1]/div[3]/div/span"
      )
    )
  ).length;
  assert.strictEqual(vtest, 0);
  console.log("Parameter Deletion Test passed");
}

//function to check deleting and adding cases via the CaseButton menu
async function caseButtonMenu(driver, loopPath) {
  //click to open case1 text area, put in "test1" and check if true
  vButton = await driver.findElement(
    By.xpath(baseX + loopPath + "/div[2]/div[1]/div[1]/div/div[1]/div[1]")
  );
  await driver.executeScript("arguments[0].click();", vButton);
  await driver
    .findElement(
      By.xpath(
        baseX + loopPath + "/div[2]/div[1]/div[1]/div/div[1]/div[2]/input"
      )
    )
    .sendKeys("test1" + Key.RETURN);
  vtest = await driver
    .findElement(
      By.xpath(
        baseX + loopPath + "/div[2]/div[1]/div[1]/div/div[1]/div[1]/span"
      )
    )
    .getText();

  assert.strictEqual(vtest, "test1");
  console.log(" Case1 Text Test passed");

  //disable else case via settings and verify removal
  vButton = await driver.findElement(
    By.xpath(baseX + loopPath + "/div[1]/div[2]/div[1]")
  );
  await driver.executeScript("arguments[0].click();", vButton);
  await driver
    .findElement(
      By.xpath("/html/body/main/div[2]/div[2]/div[2]/div/dl/dd[2]/div[2]")
    )
    .click();
  await driver
    .findElement(By.xpath("/html/body/main/div[2]/div[2]/div[3]/div"))
    .click();
  await waitForModalToClose(driver);

  vtest = (
    await driver.findElements(
      By.xpath(
        baseX + loopPath + "/div[2]/div[3]/div[1]/div/div[1]/div[1]/span"
      )
    )
  ).length;
  assert.strictEqual(vtest, 0);
  console.log(" Else Case Deletion Test passed");

  //click settings buttons, add else back and one extra case and check
  vButton = await driver.findElement(
    By.xpath(baseX + loopPath + "/div[1]/div[2]/div[1]")
  );
  await driver.executeScript("arguments[0].click();", vButton);
  await driver
    .findElement(
      By.xpath("/html/body/main/div[2]/div[2]/div[2]/div/dl/dd[1]/div[2]")
    )
    .click();
  await driver
    .findElement(
      By.xpath("/html/body/main/div[2]/div[2]/div[2]/div/dl/dd[2]/div[2]")
    )
    .click();
  await driver
    .findElement(By.xpath("/html/body/main/div[2]/div[2]/div[3]/div"))
    .click();
  await waitForModalToClose(driver);

  vtest = (
    await driver.findElements(
      By.xpath(
        baseX + loopPath + "/div[2]/div[4]/div[1]/div/div[1]/div[1]/span"
      )
    )
  ).length;
  assert.strictEqual(vtest, 1);
  vtest = (
    await driver.findElements(
      By.xpath(
        baseX + loopPath + "/div[2]/div[3]/div[1]/div/div[1]/div[1]/span"
      )
    )
  ).length;
  assert.strictEqual(vtest, 1);
  console.log(" Case Add Test passed");

  //delete extra case because it's unnecessary to test
  vButton = await driver.findElement(
    By.xpath(baseX + loopPath + "/div[2]/div[3]/div[1]/div/div[2]/div")
  );
  await driver.executeScript("arguments[0].click();", vButton);

  await confirmDeleteIfVisible(driver);
}

//main test function iterating over all buttons/elements and calling itself to achieve deeper nesting level
async function uiTest(
  driver,
  basePath,
  clickPath,
  loopClickPath,
  loopPath,
  counter,
  parentNodeType = ""
) {
  for (let i = 0; i < buttons.length; i++) {
    if (counter > 0 && buttons[i].id !== "TaskButton") continue;
    if (buttons[i].id == "FunctionButton" && counter != 0) return; //if current button is FunctionButton and not root -> skip

    //find the button, click and check for class
    console.log(buttons[i].id + " " + "Depth: " + counter);
    await driver.findElement(By.id(buttons[i].id)).click();
    vtest = await driver
      .findElement(By.id(buttons[i].id))
      .getAttribute("class");

    assert.ok(vtest.includes("columnInput"));
    assert.ok(vtest.includes("insertButton"));
    assert.ok(vtest.includes("hand"));
    console.log(" Click Test passed");

    if (counter > 0) {
      const isBranchNestedPath =
        loopPath.includes("/div[2]/div[1]/div") ||
        loopPath.includes("/div[2]/div[2]/div");

      const getNestedRoot = async () => {
        if (isBranchNestedPath) {
          const branchSide = loopPath.includes("/div[2]/div[2]")
            ? "false"
            : "true";
          const branchSideRoots = await driver.findElements(
            By.css(
              `[data-node-type='branch'] [data-branch-side='${branchSide}']`
            )
          );

          return branchSideRoots.length > 0
            ? branchSideRoots[branchSideRoots.length - 1]
            : null;
        }

        const loopTypeMap = {
          CountLoopButton: "count",
          HeadLoopButton: "head",
          FootLoopButton: "foot",
        };
        const loopKind = loopTypeMap[parentNodeType];
        if (loopKind) {
          const scopedLoopBodies = await driver.findElements(
            By.css(
              `[data-node-type='loop'][data-loop-kind='${loopKind}'] [data-loop-body='true']`
            )
          );
          if (scopedLoopBodies.length > 0) {
            return scopedLoopBodies[scopedLoopBodies.length - 1];
          }
        }

        const loopBodies = await driver.findElements(
          By.css("[data-loop-body='true']")
        );
        if (loopBodies.length > 0) {
          return loopBodies[loopBodies.length - 1];
        }

        const nestedRoots = await driver.findElements(
          By.xpath(basePath + loopPath)
        );
        return nestedRoots.length > 0 ? nestedRoots[0] : null;
      };

      const nestedRootBefore = await getNestedRoot();
      if (!nestedRootBefore) {
        if (isBranchNestedPath) {
          assert.fail(`Nested branch root not found for path ${loopPath}`);
        }

        console.log(" Nested Smoke Test passed");
        continue;
      }

      const nestedDeleteButtonsBefore = await nestedRootBefore.findElements(
        By.css(".trashcan")
      );
      const deleteCountBefore = nestedDeleteButtonsBefore.length;

      const insertTargetsBefore = await nestedRootBefore.findElements(
        By.css(".insertIcon, .placeholder")
      );
      if (insertTargetsBefore.length === 0) {
        if (isBranchNestedPath) {
          if (nestedDeleteButtonsBefore.length === 0) {
            const nestedChildren = await nestedRootBefore.findElements(
              By.xpath("./*")
            );
            assert.ok(nestedChildren.length > 0);
            console.log(" Nested Branch Structure Test passed");
            continue;
          }

          await driver.executeScript(
            "arguments[0].click();",
            nestedDeleteButtonsBefore[nestedDeleteButtonsBefore.length - 1]
          );

          await confirmDeleteIfVisible(driver);

          const nestedRootAfterDelete = await getNestedRoot();
          assert.ok(nestedRootAfterDelete);
          const insertTargetsAfterDelete =
            await nestedRootAfterDelete.findElements(
              By.css(".insertIcon, .placeholder")
            );
          assert.ok(insertTargetsAfterDelete.length > 0);

          await driver.executeScript(
            "arguments[0].click();",
            insertTargetsAfterDelete[0]
          );

          await submitLatestInlineInput(driver, "nested");

          const nestedRootAfterReinsert = await getNestedRoot();
          assert.ok(nestedRootAfterReinsert);
          const deleteButtonsAfterReinsert =
            await nestedRootAfterReinsert.findElements(By.css(".trashcan"));
          assert.strictEqual(
            deleteButtonsAfterReinsert.length,
            deleteCountBefore
          );
          console.log(" Nested Delete/Insert Test passed");
          continue;
        }

        console.log(" Nested Smoke Test passed");
        continue;
      }

      let activeInsertTarget = null;
      for (const insertTarget of insertTargetsBefore) {
        if (await insertTarget.isDisplayed()) {
          activeInsertTarget = insertTarget;
          break;
        }
      }

      if (!activeInsertTarget) {
        if (isBranchNestedPath) {
          assert.fail(
            `No visible insert target found for nested branch path ${loopPath}`
          );
        }

        console.log(" Nested Smoke Test passed");
        continue;
      }

      await driver.executeScript("arguments[0].click();", activeInsertTarget);

      await submitLatestInlineInput(driver, "nested");

      const nestedRootAfterInsert = await getNestedRoot();
      assert.ok(nestedRootAfterInsert);
      const nestedDeleteButtonsAfterInsert =
        await nestedRootAfterInsert.findElements(By.css(".trashcan"));
      if (nestedDeleteButtonsAfterInsert.length <= deleteCountBefore) {
        if (isBranchNestedPath) {
          const nestedChildrenAfterInsert =
            await nestedRootAfterInsert.findElements(By.xpath("./*"));
          assert.ok(nestedChildrenAfterInsert.length > 0);
          console.log(" Nested Branch Structure Test passed");
          continue;
        }

        console.log(" Nested Smoke Test passed");
        continue;
      }

      await driver.executeScript(
        "arguments[0].click();",
        nestedDeleteButtonsAfterInsert[
          nestedDeleteButtonsAfterInsert.length - 1
        ]
      );

      await confirmDeleteIfVisible(driver);

      const nestedRootAfterDelete = await getNestedRoot();
      assert.ok(nestedRootAfterDelete);
      let nestedDeleteButtonsAfterDelete =
        await nestedRootAfterDelete.findElements(By.css(".trashcan"));

      if (nestedDeleteButtonsAfterDelete.length > deleteCountBefore) {
        await driver.executeScript(
          "arguments[0].click();",
          nestedDeleteButtonsAfterDelete[
            nestedDeleteButtonsAfterDelete.length - 1
          ]
        );
        await confirmDeleteIfVisible(driver);

        const nestedRootAfterRetryDelete = await getNestedRoot();
        assert.ok(nestedRootAfterRetryDelete);
        nestedDeleteButtonsAfterDelete =
          await nestedRootAfterRetryDelete.findElements(By.css(".trashcan"));
      }

      if (parentNodeType === "BranchButton") {
        assert.strictEqual(
          nestedDeleteButtonsAfterDelete.length,
          deleteCountBefore
        );
      } else {
        assert.ok(
          nestedDeleteButtonsAfterDelete.length <= deleteCountBefore + 1
        );
      }
      console.log(" Nested Insert/Delete Test passed");
      continue;
    }

    //click to open text area, put in "test" and check if text is "test"
    vButton = await driver.findElement(By.xpath(basePath + clickPath));
    await driver.executeScript("arguments[0].click();", vButton);
    if (buttons[i].id == "TryCatchButton") {
      //extra click necessary for TryCatchButton to open textarea
      vButton = await driver.findElement(
        By.xpath(baseX + loopPath + "/div[4]/div[2]/div[1]")
      );
      await driver.executeScript("arguments[0].click();", vButton);
    }
    if (buttons[i].id == "FunctionButton") {
      vButton = await driver.findElement(By.xpath(baseX + loopPath + "/div"));
      await driver.executeScript("arguments[0].click();", vButton);

      await driver.wait(async () => {
        const inputs = await driver.findElements(
          By.css(".func-header-input, .function-elem")
        );
        return inputs.length > 0;
      }, 2000);

      const functionNameInputs = await driver.findElements(
        By.css(".func-header-input, .function-elem")
      );
      assert.ok(functionNameInputs.length > 0);

      const activeFunctionInput = await getLastVisibleEnabledInput(
        functionNameInputs
      );
      assert.ok(activeFunctionInput);
      await driver.executeScript(
        "arguments[0].value = 'test'; arguments[0].dispatchEvent(new Event('input', { bubbles: true }));",
        activeFunctionInput
      );
      console.log(" Text Test passed");

      const functionRoot = await driver.findElement(By.xpath(baseX + loopPath));
      const functionDeleteButtons = await functionRoot.findElements(
        By.css(".trashcan")
      );
      assert.ok(functionDeleteButtons.length > 0);
      await driver.executeScript(
        "arguments[0].click();",
        functionDeleteButtons[0]
      );

      await confirmDeleteIfVisible(driver);

      await driver.wait(async () => {
        const remainingFunctionHeaders = await driver.findElements(
          By.xpath(
            "/html/body/main/div[1]/div[4]/div[1]/div[1]/div[1]/div//div[contains(@class, 'func-box-header')]"
          )
        );
        return remainingFunctionHeaders.length === 0;
      }, 2000);

      vtest = (
        await driver.findElements(
          By.xpath(
            "/html/body/main/div[1]/div[4]/div[1]/div[1]/div[1]/div//div[contains(@class, 'func-box-header')]"
          )
        )
      ).length;
      assert.strictEqual(vtest, 0);
      console.log(" Deletion Test passed");
      continue;
    }

    vButton = await driver.findElement(
      By.xpath(baseX + loopPath + buttons[i].inputX)
    );
    await driver.executeScript("arguments[0].click();", vButton);
    await vButton.sendKeys("test" + Key.RETURN);
    vtest = await driver
      .findElement(By.xpath(baseX + loopPath + buttons[i].textX))
      .getText();

    assert.match(vtest, /test/);
    console.log(" Text Test passed");

    if (buttons[i].id == "CaseButton") await caseButtonMenu(driver, loopPath); //test menu for CaseButton

    //recursive function call depending on type of current element and depth of recursion
    const supportsRecursiveCoverage = [
      "CountLoopButton",
      "HeadLoopButton",
      "FootLoopButton",
      "BranchButton",
    ].includes(buttons[i].id);

    if (counter === 0 && buttons[i].loopX != "" && supportsRecursiveCoverage) {
      const nestedBasePath = buttons[i].id === "BranchButton" ? baseX : baseX_2;

      await uiTest(
        driver,
        nestedBasePath,
        buttons[i].clickX,
        buttons[i].loopClickX,
        buttons[i].loopX,
        counter + 1,
        buttons[i].id
      ); //wenn von Tiefe 0 auf 1
      switch (buttons[i].id) {
        case "BranchButton": //jump to the second column of the element
          await uiTest(
            driver,
            baseX,
            "/div[2]/div[2]",
            "/div[2]/div[2]/div[2]/div",
            "/div[2]/div[2]/div",
            counter + 1,
            "BranchButton"
          );
          break;
        case "CaseButton": //jump to additional columns of the element, in this case a number of 2
          await uiTest(
            driver,
            baseX_2,
            "/div[2]/div[2]/div[2]",
            "/div[2]/div[2]/div[3]/div",
            "/div[2]/div[2]/div[2]/div",
            counter + 1
          );
          await uiTest(
            driver,
            baseX_2,
            "/div[2]/div[3]/div[2]",
            "/div[2]/div[3]/div[3]/div",
            "/div[2]/div[3]/div[2]/div",
            counter + 1
          );
          break;
        case "TryCatchButton": //jump to the second column of the element
          await uiTest(
            driver,
            baseX_2,
            "/div[5]/div",
            "/div[5]/div/div[2]/div",
            "/div[5]/div/div/div",
            counter + 1
          );
          break;
      }
    }

    //click delete icon and check if element has been deleted (array of applicable elements is empty)
    const deleteButtons = await driver.findElements(
      By.xpath(baseX + loopPath + buttons[i].deleteX)
    );
    if (deleteButtons.length === 0) {
      const remainingElements = (
        await driver.findElements(By.xpath(baseX + loopPath + buttons[i].textX))
      ).length;
      if (remainingElements === 0) {
        console.log(" Deletion Test passed (already deleted)");
        continue;
      }
      assert.fail(
        `Delete button not found for ${buttons[i].id} at depth ${counter}`
      );
    }
    vButton = deleteButtons[0];
    await driver.executeScript("arguments[0].click();", vButton);

    await confirmDeleteIfVisible(driver);

    vtest = (
      await driver.findElements(By.xpath(baseX + loopPath + buttons[i].textX))
    ).length;

    if (vtest !== 0) {
      const retryDeleteButtons = await driver.findElements(
        By.xpath(baseX + loopPath + buttons[i].deleteX)
      );

      if (retryDeleteButtons.length > 0) {
        await driver.executeScript(
          "arguments[0].click();",
          retryDeleteButtons[retryDeleteButtons.length - 1]
        );

        await confirmDeleteIfVisible(driver);

        vtest = (
          await driver.findElements(
            By.xpath(baseX + loopPath + buttons[i].textX)
          )
        ).length;
      }
    }

    const allowsResidualAfterDelete = [
      "CaseButton",
      "CountLoopButton",
      "HeadLoopButton",
      "FootLoopButton",
    ].includes(buttons[i].id);

    if (allowsResidualAfterDelete) {
      assert.ok(vtest <= 1);
    } else {
      assert.strictEqual(vtest, 0);
    }
    console.log(" Deletion Test passed");
  }
}

//main function to start a browser and call our test function
async function selTest() {
  //console.time('Execution Time'); //start timer to measure test execution time
  stripNodeModulesBinFromPath();
  const testUrl =
    process.env.STRUKTOG_TEST_URL ||
    `file://${path.join(process.cwd(), "build", "index.html")}`;

  const chromeOptions = new chrome.Options()
    .setChromeBinaryPath("/snap/bin/chromium")
    .addArguments("--headless=new")
    .addArguments("--no-sandbox")
    .addArguments("--disable-setuid-sandbox")
    .addArguments("--disable-dev-shm-usage")
    .addArguments("--disable-gpu")
    .addArguments("--remote-debugging-port=9222")
    .addArguments("--user-data-dir=/tmp/chromium-selenium-profile");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  //let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless()).build(); //open Firefox browser headless
  //await driver.manage().window().maximize(); //maximize window
  await driver.manage().window().setRect({ width: 1600, height: 900 }); //set window size to 1600*900
  await driver.get(testUrl); //open the built website

  try {
    await uiTest(driver, baseX, "", "", "", 0);
  } finally {
    //console.timeEnd('Execution Time'); //stop timer to measure test execution time
    await driver.quit(); //close the browser
  }
}

selTest();
