import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function backendChoose() {
    // 1. Tanya nama project ke user
    const projectName = await vscode.window.showInputBox({
        prompt: "Input your Backend project name",
        placeHolder: "example: my-awesome-api",
        validateInput: text => {
            return text && text.length > 0 ? null : "Project name cannot be empty";
        }
    });

    if (!projectName) return; // User batalin (tekan Esc)

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('Buka folder/workspace dulu di VS Code!');
        return;
    }

    const workspacePath = workspaceFolders[0].uri.fsPath;
    const projectPath = path.join(workspacePath, projectName);

    try {
        const structure = [
            { type: 'dir', path: '' },
            { type: 'dir', path: 'routes' },
            { type: 'dir', path: 'controllers' },
            { type: 'dir', path: 'models' },
            { type: 'dir', path: 'services' },
            { 
                type: 'file', 
                path: 'package.json', 
                content: JSON.stringify({
                    name: projectName.toLowerCase().replace(/\s+/g, '-'),
                    version: "1.0.0",
					type: "module",
                    main: "index.js",
					scripts:{"dev":"nodemon index.js"},
                    dependencies: { "express": "^5.2.1", "dotenv": "^17.2.3", "nodemon": "^3.1.11" }
                }, null, 2) 
            },
            { 
                type: 'file', 
                path: 'index.js', 
                content: "import express from 'express';\nconst app = express();\n\napp.listen(3000, () => console.log('Server ready!'));" 
            },
            { 
                type: 'file', 
                path: 'routes/api.js', 
                content: "import express from 'express';\nexport function router () {\n }" 
            },
            { 
                type: 'file', 
                path: 'controllers/controller.js', 
                content: "export function controller () {\n }" 
            },
            { 
                type: 'file', 
                path: 'models/model.js', 
                content: "export function model () {\n }" 
            },
            { 
                type: 'file', 
                path: 'services/service.js', 
                content: "export function service () {\n }" 
            },
        ];

        for (const item of structure) {
            const targetPath = path.join(projectPath, item.path);

            if (item.type === 'dir') {
                fs.mkdirSync(targetPath, { recursive: true });
            } else {
                fs.writeFileSync(targetPath, item.content);
            }
        }

        vscode.window.showInformationMessage(`Backend project '${projectName}' created successfully!`);

    } catch (err) {
        vscode.window.showErrorMessage("Ada error: " + err.message);
    }
}