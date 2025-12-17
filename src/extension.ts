import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Map to store terminal buffers
const terminalBuffers = new Map<vscode.Terminal, string>();

export function activate(context: vscode.ExtensionContext) {
    console.log('Terminal Transcript Saver extension activated');

    // Listen to terminal data
    const writeEmitter = vscode.window.onDidWriteTerminalData(e => {
        const currentBuffer = terminalBuffers.get(e.terminal) || '';
        terminalBuffers.set(e.terminal, currentBuffer + e.data);
    });

    // Clean up closed terminals
    const closeEmitter = vscode.window.onDidCloseTerminal(terminal => {
        terminalBuffers.delete(terminal);
    });

    // Register the save command
    const disposable = vscode.commands.registerCommand('terminalTranscriptSaver.save', async () => {
        const activeTerminal = vscode.window.activeTerminal;

        if (!activeTerminal) {
            vscode.window.showErrorMessage('No active terminal found');
            return;
        }

        // Get the terminal buffer content
        const content = terminalBuffers.get(activeTerminal) || '';

        if (!content) {
            vscode.window.showWarningMessage('Terminal buffer is empty');
            return;
        }

        // Strip ANSI escape codes
        const cleanContent = stripAnsi(content);

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const filename = `transcript-${timestamp}.txt`;

        // Get workspace folder (project root)
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }

        const filePath = path.join(workspaceFolder.uri.fsPath, filename);

        // Save to file
        try {
            fs.writeFileSync(filePath, cleanContent, 'utf8');
            vscode.window.showInformationMessage(`Transcript saved: ${filename}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to save transcript: ${error}`);
        }
    });

    context.subscriptions.push(disposable, writeEmitter, closeEmitter);
}

export function deactivate() {
    terminalBuffers.clear();
}

function stripAnsi(text: string): string {
    return text
        .replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '')
        .replace(/\x1b\][0-9];[^\x07]*\x07/g, '')
        .replace(/\x1b[>=]/g, '')
        .replace(/\r/g, '');
}
