const vscode = require("vscode");

const { UNNEEDED_CONTANTS } = require("./utils");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "prettierrc-extractor.extractPrettierrc",
    function () {
      // Display a message box to the user
      vscode.window.showInformationMessage("Extracting Prettier Info...");

      const editor = vscode.window.activeTextEditor;

      // Get Prettier settings from the active workspace configuration
      const prettierSettings = vscode.workspace.getConfiguration(
        "prettier",
        editor ? editor.document.uri : null
      );
      const prettierObj = {};
      for (const key in prettierSettings) {
        if (UNNEEDED_CONTANTS.indexOf(key) === -1) {
          prettierObj[key] = prettierSettings[key];
        }
      }
      vscode.workspace
        .openTextDocument({ content: JSON.stringify(prettierObj) })
        .then((document) => {
          vscode.window.showTextDocument(document);
        });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
