import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function frontendChoose () {
		const projectName = await vscode.window.showInputBox({
			prompt: "Input your Frontend project name",
			placeHolder: "example: my-awesome-api",
			validateInput: text => {
				return text && text.length > 0 ? null : "Project name cannot be empty";
			}
		});
	
		if (!projectName) return;
	
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
				{ type: 'dir', path: 'src' },
				// root files
				{ 
					type: 'file', 
					path: 'package.json', 
					content: JSON.stringify({
						name: projectName.toLowerCase().replace(/\s+/g, '-'),
						private: true,
						version: "0.0.0",
						type: "module",
						scripts: {
							dev: "vite",
							build: "tsc -b && vite build",
							lint: "eslint .",
							preview: "vite preview"
						},
						dependencies: {
							react: "^19.1.1",
							"react-dom": "^19.1.1"
						},
						devDependencies: {
							"@eslint/js": "^9.36.0",
							"@types/node": "^24.6.0",
							"@types/react": "^19.1.16",
							"@types/react-dom": "^19.1.9",
							"@vitejs/plugin-react": "^5.0.4",
							eslint: "^9.36.0",
							"eslint-plugin-react-hooks": "^5.2.0",
							"eslint-plugin-react-refresh": "^0.4.22",
							globals: "^16.4.0",
							typescript: "~5.9.3",
							"typescript-eslint": "^8.45.0",
							vite: "^7.1.7"
						}
					}, null, 2) 
				},
				{ 
					type: 'file', 
					path: 'index.html', 
					content: "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>frontend</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>" 
				},
				{ 
					type: 'file', 
					path: '.gitignore', 
					content: "node_modules/\n.env\n.DS_Store\n*.log" 
				},
				{ 
					type: 'file', 
					path: 'eslint.config.js', 
					content:"import js from '@eslint/js'\nimport globals from 'globals'\nimport reactHooks from 'eslint-plugin-react-hooks'\nimport reactRefresh from 'eslint-plugin-react-refresh'\nimport tseslint from 'typescript-eslint'\nimport { defineConfig, globalIgnores } from 'eslint/config'\n\nexport default defineConfig([\n  globalIgnores(['dist']),\n  {\n    files: ['**/*.{ts,tsx}'],\n    extends: [\n      js.configs.recommended,\n      tseslint.configs.recommended,\n      reactHooks.configs['recommended-latest'],\n      reactRefresh.configs.vite,\n    ],\n    languageOptions: {\n      ecmaVersion: 2020,\n      globals: globals.browser,\n    },\n  },\n])"
				},
				{ 
					type: 'file', 
					path: 'vite.config.ts', 
					content: "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\n// https://vite.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n})"
				},
				{ 
					type: 'file', 
					path: 'vite.config.ts', 
					content: "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\n// https://vite.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n})"
				},
				{ 
					type: 'file', 
					path: 'README.md', 
					content: "# React + TypeScript + Vite\n\nThis template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.\n\nCurrently, two official plugins are available:\n\n- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh\n- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh\n\n## React Compiler\n\nThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).\n\n## Expanding the ESLint configuration\n\nIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:\n\n```js\nexport default defineConfig([\n  globalIgnores(['dist']),\n  {\n    files: ['**/*.{ts,tsx}'],\n    extends: [\n      // Other configs...\n\n      // Remove tseslint.configs.recommended and replace with this\n      tseslint.configs.recommendedTypeChecked,\n      // Alternatively, use this for stricter rules\n      tseslint.configs.strictTypeChecked,\n      // Optionally, add this for stylistic rules\n      tseslint.configs.stylisticTypeChecked,\n\n      // Other configs...\n    ],\n    languageOptions: {\n      parserOptions: {\n        project: ['./tsconfig.node.json', './tsconfig.app.json'],\n        tsconfigRootDir: import.meta.dirname,\n      },\n      // other options...\n    },\n  },\n])\n```\n\nYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:\n\n```js\n// eslint.config.js\nimport reactX from 'eslint-plugin-react-x'\nimport reactDom from 'eslint-plugin-react-dom'\n\nexport default defineConfig([\n  globalIgnores(['dist']),\n  {\n    files: ['**/*.{ts,tsx}'],\n    extends: [\n      // Other configs...\n      // Enable lint rules for React\n      reactX.configs['recommended-typescript'],\n      // Enable lint rules for React DOM\n      reactDom.configs.recommended,\n    ],\n    languageOptions: {\n      parserOptions: {\n        project: ['./tsconfig.node.json', './tsconfig.app.json'],\n        tsconfigRootDir: import.meta.dirname,\n      },\n      // other options...\n    },\n  },\n])\n```"
				},
				{ 
					type: 'file', 
					path: 'tsconfig.app.json', 
					content: "{\n  \"compilerOptions\": {\n    \"tsBuildInfoFile\": \"./node_modules/.tmp/tsconfig.app.tsbuildinfo\",\n    \"target\": \"ES2022\",\n    \"useDefineForClassFields\": true,\n    \"lib\": [\"ES2022\", \"DOM\", \"DOM.Iterable\"],\n    \"module\": \"ESNext\",\n    \"types\": [\"vite/client\"],\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"verbatimModuleSyntax\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\",\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"erasableSyntaxOnly\": true,\n    \"noFallthroughCasesInSwitch\": true,\n    \"noUncheckedSideEffectImports\": true\n  },\n  \"include\": [\"src\"]\n}"
				},
				{ 
					type: 'file', 
					path: 'tsconfig.json', 
					content: "{\n  \"files\": [],\n  \"references\": [\n    { \"path\": \"./tsconfig.app.json\" },\n    { \"path\": \"./tsconfig.node.json\" }\n  ]\n}"
				},
				{ 
					type: 'file', 
					path: 'tsconfig.node.json', 
					content: "{\n  \"compilerOptions\": {\n    \"tsBuildInfoFile\": \"./node_modules/.tmp/tsconfig.node.tsbuildinfo\",\n    \"target\": \"ES2023\",\n    \"lib\": [\"ES2023\"],\n    \"module\": \"ESNext\",\n    \"types\": [\"node\"],\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"verbatimModuleSyntax\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"erasableSyntaxOnly\": true,\n    \"noFallthroughCasesInSwitch\": true,\n    \"noUncheckedSideEffectImports\": true\n  },\n  \"include\": [\"vite.config.ts\"]\n}"
				},
				//src files
				{ 
					type: 'file', 
					path: 'src/main.tsx', 
					content: "import { StrictMode } from 'react'\nimport { createRoot } from 'react-dom/client'\nimport App from './App.tsx'\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n)"
			
				},
				{ 
					type: 'file', 
					path: 'src/App.tsx', 
					content: "function App() {\n  return (\n    <>\n      <p>Hello world</p>\n    </>\n  )\n}\n\nexport default App"
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
	
			vscode.window.showInformationMessage(`Frontend project '${projectName}' created successfully!`);
	
		} catch (err) {
			vscode.window.showErrorMessage("Error: " + err.message);
		}
	vscode.window.showInformationMessage('You selected Frontend project!');
}