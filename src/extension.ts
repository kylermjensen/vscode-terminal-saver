import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
const clipboardy = require('clipboardy');

export function activate(context: vscode.ExtensionContext) {
    console.log('Terminal Transcript Saver extension activated');

    // Register the save command
    const disposable = vscode.commands.registerCommand('terminalTranscriptSaver.save', async () => {
        const activeTerminal = vscode.window.activeTerminal;

        if (!activeTerminal) {
            vscode.window.showErrorMessage('No active terminal found');
            return;
        }

        try {
            // Step 1: Select all terminal content
            await vscode.commands.executeCommand('workbench.action.terminal.selectAll');

            // Small delay to ensure selection completes
            await new Promise(resolve => setTimeout(resolve, 100));

            // Step 2: Copy selection to clipboard
            await vscode.commands.executeCommand('workbench.action.terminal.copySelection');

            // Small delay to ensure clipboard is updated
            await new Promise(resolve => setTimeout(resolve, 100));

            // Step 3: Read from clipboard
            const content = await clipboardy.read();

            if (!content || content.trim().length === 0) {
                vscode.window.showWarningMessage('Terminal content is empty');
                return;
            }

            // Step 4: Strip ANSI escape codes
            const cleanContent = stripAnsi(content);

            // Step 5: Generate filename with timestamp
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            const filename = `transcript-${timestamp}.txt`;

            // Step 6: Get workspace folder (project root)
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder open');
                return;
            }

            const filePath = path.join(workspaceFolder.uri.fsPath, filename);

            // Step 7: Save to file
            fs.writeFileSync(filePath, cleanContent, 'utf8');

            // Step 8: Clear selection (ESC key)
            await vscode.commands.executeCommand('workbench.action.terminal.clearSelection');

            vscode.window.showInformationMessage(`Transcript saved: ${filename}`);

        } catch (error) {
            vscode.window.showErrorMessage(`Failed to save transcript: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    // Cleanup if needed
}

function stripAnsi(text: string): string {
    return text
        .replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '')
        .replace(/\x1b\][0-9];[^\x07]*\x07/g, '')
        .replace(/\x1b[>=]/g, '')
        .replace(/\r/g, '');
}
