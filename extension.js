// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const editor = vscode.window.activeTextEditor;
let decorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: "red",
  color: "white"
});
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "vscode-highlighter" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.highlight",
    function() {
      // The code you place here will be executed every time your command is executed

      let decorationsArray = [];
      let documentContent = editor.document.getText();
      let sourceCodeArr = documentContent.split("\n");

      for (let line = 0; line < sourceCodeArr.length; line++) {
        let text = sourceCodeArr[line];
        let match = /Console\.WriteLine\(".*?"\);/.exec(text);

        if (match !== null && match.index !== undefined) {
          let range = new vscode.Range(
            new vscode.Position(line, match.index),
            new vscode.Position(line, match.index + match[0].length)
          );

          let decoration = {
            range: range
          };

          decorationsArray.push(decoration);
        }
      }

      editor.setDecorations(decorationType, decorationsArray);
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
