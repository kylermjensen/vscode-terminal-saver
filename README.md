# Terminal Transcript Saver

Save terminal output to a file with `Cmd+Shift+S` on macOS (or `Ctrl+Shift+S` on Windows/Linux).

VS Code terminals are ephemeral—close them and everything's gone. This extension saves clean, readable transcripts with one keypress.

[![Version](https://img.shields.io/visual-studio-marketplace/v/KyleJensen.terminal-transcript-saver.svg)](https://marketplace.visualstudio.com/items?itemName=KyleJensen.terminal-transcript-saver)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/KyleJensen.terminal-transcript-saver.svg)](https://marketplace.visualstudio.com/items?itemName=KyleJensen.terminal-transcript-saver)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## Extension Code

```typescript
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as os from 'os';

export function activate(context: vscode.ExtensionContext) {
    console.log('Terminal Transcript Saver extension activated');

    const disposable = vscode.commands.registerCommand('terminalTranscriptSaver.save', async () => {
        const activeTerminal = vscode.window.activeTerminal;

        if (!activeTerminal) {
            vscode.window.showErrorMessage('No active terminal found');
            return;
        }

        try {
            await vscode.commands.executeCommand('workbench.action.terminal.selectAll');
            await new Promise(resolve => setTimeout(resolve, 100));
            await vscode.commands.executeCommand('workbench.action.terminal.copySelection');
            await new Promise(resolve => setTimeout(resolve, 100));

            const content = readClipboard();
            if (!content || content.trim().length === 0) {
                vscode.window.showWarningMessage('Terminal content is empty');
                return;
            }

            const cleanContent = stripAnsi(content);
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            const filename = `transcript-${timestamp}.txt`;

            const config = vscode.workspace.getConfiguration('terminalTranscriptSaver');
            const customPath = config.get<string>('saveLocation');
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            const saveDir = customPath || (workspaceFolder ? workspaceFolder.uri.fsPath : path.join(os.homedir(), 'Desktop'));
            const filePath = path.join(saveDir, filename);

            fs.writeFileSync(filePath, cleanContent, 'utf8');
            await vscode.commands.executeCommand('workbench.action.terminal.clearSelection');
            vscode.window.showInformationMessage(`Transcript saved: ${filename}`);

        } catch (error) {
            vscode.window.showErrorMessage(`Failed to save transcript: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

function readClipboard(): string {
    const platform = os.platform();
    try {
        if (platform === 'darwin') {
            return execSync('pbpaste', { encoding: 'utf8' });
        } else if (platform === 'win32') {
            return execSync('powershell.exe -command "Get-Clipboard"', { encoding: 'utf8' });
        } else {
            try {
                return execSync('xclip -selection clipboard -o', { encoding: 'utf8' });
            } catch (xclipError) {
                return execSync('xsel --clipboard --output', { encoding: 'utf8' });
            }
        }
    } catch (error) {
        throw new Error(`Failed to read clipboard: ${error}`);
    }
}

function stripAnsi(text: string): string {
    return text
        .replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '')
        .replace(/\x1b\][0-9];[^\x07]*\x07/g, '')
        .replace(/\x1b[>=]/g, '')
        .replace(/\r/g, '');
}
```

## How It Works

Selects all terminal content → copies to clipboard → strips ANSI codes → writes to timestamped file.

Works with bash, zsh, PowerShell, Python REPL, Node REPL, etc.

## Install

**Marketplace:** https://marketplace.visualstudio.com/items?itemName=KyleJensen.terminal-transcript-saver

**Or from command line:**
```bash
code --install-extension KyleJensen.terminal-transcript-saver
```

## Dev Setup

```bash
git clone https://github.com/kylermjensen/vscode-terminal-saver.git
cd vscode-terminal-saver
npm install
code .
# Press F5 to run
```

## Requirements

- VS Code 1.80.0+
- macOS: No additional requirements
- Windows: No additional requirements
- Linux: `xclip` or `xsel` installed

**Note:** If no workspace is open, transcripts save to your Desktop by default.

## Config

Set custom save location in VS Code settings:
```json
{
  "terminalTranscriptSaver.saveLocation": "/path/to/save"
}
```

## Source

**[View on GitHub](https://github.com/kylermjensen/vscode-terminal-saver)**

## License

MIT
