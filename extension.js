// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { frontendChoose } from './controller/frontend.js';
import { backendChoose } from './controller/backend.js';
import { mobileChoose } from './controller/mobile.js';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fldks-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('fldks-extension.fldksExtension', async function () {
		// The code you place here will be executed every time your command is executed

		const choices = ['Frontend', 'Backend', 'Mobile']

		const choice = await vscode.window.showQuickPick(choices,{
			placeHolder:"Select your project"
		})

		if (choice === 'Frontend') {
			frontendChoose();
		} else if (choice === 'Backend') {
			await backendChoose();
		} else if (choice === 'Mobile') {
			mobileChoose();
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

export { activate, deactivate };
