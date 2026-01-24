import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function mobileChoose() {
    const projectName = await vscode.window.showInputBox({
        prompt: "Input your Backend project name",
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
            { type: 'dir', path: 'app' },
            { 
                type: 'file', 
                path: 'package.json', 
                content: JSON.stringify({
                    name: projectName.toLowerCase().replace(/\s+/g, '-'),
                    main: "expo-router/entry",
                    version: "1.0.0",
                    scripts: {
                      start: "expo start",
                      "reset-project": "node ./scripts/reset-project.js",
                      android: "expo start --android",
                      ios: "expo start --ios",
                      web: "expo start --web",
                      test: "jest --watchAll",
                      lint: "expo lint"
                    },
                    jest: {
                      preset: "jest-expo"
                    },
                    dependencies: {
                      "@expo/metro-runtime": "~6.1.2",
                      "@expo/vector-icons": "^15.0.2",
                      "@react-navigation/bottom-tabs": "^7.3.10",
                      "@react-navigation/elements": "^2.3.8",
                      "@react-navigation/native": "^7.1.6",
                      expo: "^54.0.9",
                      "expo-blur": "~15.0.7",
                      "expo-constants": "~18.0.9",
                      "expo-font": "~14.0.8",
                      "expo-haptics": "~15.0.7",
                      "expo-image": "~3.0.8",
                      "expo-linking": "~8.0.8",
                      "expo-router": "~6.0.7",
                      "expo-splash-screen": "~31.0.10",
                      "expo-status-bar": "~3.0.8",
                      "expo-symbols": "~1.0.7",
                      "expo-system-ui": "~6.0.7",
                      "expo-web-browser": "~15.0.7",
                      react: "19.1.0",
                      "react-dom": "19.1.0",
                      "react-native": "0.81.4",
                      "react-native-gesture-handler": "~2.28.0",
                      "react-native-reanimated": "~4.1.0",
                      "react-native-safe-area-context": "~5.6.0",
                      "react-native-screens": "~4.16.0",
                      "react-native-web": "^0.21.0",
                      "react-native-webview": "13.15.0",
                      "react-native-worklets": "0.5.1"
                    },
                    devDependencies: {
                      "@babel/core": "^7.25.2",
                      "@types/react": "^19.1.13",
                      eslint: "^9.25.0",
                      "eslint-config-expo": "~10.0.0",
                      jest: "^29.2.1",
                      "jest-expo": "~54.0.12",
                      typescript: "~5.9.2"
                    },
                  private: true
                }, null, 2) 
            },
            { 
                type: 'file', 
                path: 'tsconfig.json', 
                content: "{\n  \"extends\": \"expo/tsconfig.base\",\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"paths\": {\n      \"@/*\": [\n        \"./*\"\n      ]\n    }\n  },\n  \"include\": [\n    \"**/*.ts\",\n    \"**/*.tsx\",\n    \".expo/types/**/*.ts\",\n    \"expo-env.d.ts\"\n  ]\n}"
            },
            { 
                type: 'file', 
                path: 'README.md', 
                content: "# Welcome to your Expo app 👋\n\nThis is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).\n\n## Get started\n\n1. Install dependencies\n\n   ```bash\n   npm install\n   ```\n\n2. Start the app\n\n   ```bash\n   npx expo start\n   ```\n\nIn the output, you'll find options to open the app in a\n\n- [development build](https://docs.expo.dev/develop/development-builds/introduction/)\n- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)\n- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)\n- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo\n\nYou can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).\n\n## Get a fresh project\n\nWhen you're ready, run:\n\n```bash\nnpm run reset-project\n```\n\nThis command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.\n\n## Learn more\n\nTo learn more about developing your project with Expo, look at the following resources:\n\n- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).\n- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.\n\n## Join the community\n\nJoin our community of developers creating universal apps.\n\n- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.\n- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions."
            },
            { 
                type: 'file', 
                path: 'eslint.config.js', 
                content: "//https://docs.expo.dev/guides/using-eslint/\nconst { defineConfig } = require('eslint/config');\nconst expoConfig = require('eslint-config-expo/flat');\n\nmodule.exports = defineConfig([\n  expoConfig,\n  {\n    ignores: ['dist/*'],\n  },\n]);"
            },
            { 
                type: 'file', 
                path: 'expo-env.d.ts', 
                content: "/// <reference types=\"expo/types\" />\n\n// NOTE: This file should not be edited and should be in your git ignore"
            },
            { 
                type: 'file', 
                path: 'app.json', 
                content:"{\n  \"expo\": {\n    \"name\": \"expo-on-replit\",\n    \"slug\": \"expo-on-replit\",\n    \"version\": \"1.0.0\",\n    \"orientation\": \"portrait\",\n    \"icon\": \"./assets/images/icon.png\",\n    \"scheme\": \"myapp\",\n    \"userInterfaceStyle\": \"automatic\",\n    \"newArchEnabled\": true,\n    \"ios\": {\n      \"supportsTablet\": true\n    },\n    \"android\": {\n      \"adaptiveIcon\": {\n        \"foregroundImage\": \"./assets/images/adaptive-icon.png\",\n        \"backgroundColor\": \"#ffffff\"\n      },\n      \"edgeToEdgeEnabled\": true\n    },\n    \"web\": {\n      \"bundler\": \"metro\",\n      \"output\": \"static\",\n      \"favicon\": \"./assets/images/favicon.png\"\n    },\n    \"plugins\": [\n      \"expo-router\",\n      [\n        \"expo-splash-screen\",\n        {\n          \"image\": \"./assets/images/splash-icon.png\",\n          \"imageWidth\": 200,\n          \"resizeMode\": \"contain\",\n          \"backgroundColor\": \"#ffffff\"\n        }\n      ]\n    ],\n    \"experiments\": {\n      \"typedRoutes\": true\n    }\n  }\n}"
            },
            { 
                type: 'file', 
                path: 'app/index.tsx', 
                content:"import { Text, View } from \"react-native\";\n\nexport default function Index() {\n  return (\n    <View\n      style={{\n        flex: 1,\n        justifyContent: \"center\",\n        alignItems: \"center\",\n      }}\n    >\n      <Text>Edit app/index.tsx to edit this screen.</Text>\n    </View>\n  );\n}"
            },
            { 
                type: 'file', 
                path: 'app/_layout.tsx', 
                content:"import { Stack } from \"expo-router\";\n\nexport default function RootLayout() {\n  return <Stack />;\n}"
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

        vscode.window.showInformationMessage(`Mobile project '${projectName}' created successfully!`);

    } catch (err) {
        vscode.window.showErrorMessage("Ada error: " + err.message);
    }
}