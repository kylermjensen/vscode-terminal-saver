# VS Code Extension for Terminal Transcript Saving - Specification

## Context

This is an alternative approach to the bash script + AppleScript solution. The original problem and requirements remain the same (see `spec.md`), but we're using VS Code's Extension API for more reliable access to terminal content.

## Why Extension Approach

**Problems with Script Approach:**
- AppleScript timing issues (focus, delays)
- Unreliable automation of Cmd+A/Cmd+C
- Only captured partial content in testing

**Extension Advantages:**
- Direct access to VS Code terminal buffer via API
- No timing issues or automation fragility
- More reliable terminal content capture
- Better VS Code integration

## Original Requirements (from spec.md)

### Hard Requirements
1. Works in VS Code integrated terminal ✓
2. Captures terminal output from Claude Code CLI sessions ✓
3. Saves to persistent file format ✓
4. User can trigger the save action on demand ✓
5. Output must be clean readable text (no ANSI codes) ✓

### Soft Requirements
1. Minimal friction - hotkey (Cmd+S) ✓
2. Files named with timestamps ✓
3. Saves to project root ✓
4. macOS (but extension works cross-platform) ✓
5. Notify on success ✓

## Technical Approach

### Architecture

```
[User presses Cmd+S in terminal]
    ↓
[VS Code Extension activated]
    ↓
[Extension reads active terminal buffer via API]
    ↓
[Strip ANSI escape codes]
    ↓
[Save to project root with timestamp]
    ↓
[Show VS Code notification]
```

### VS Code Extension API Usage

**Key APIs:**
1. `vscode.window.activeTerminal` - Get active terminal instance
2. `vscode.window.onDidWriteTerminalData` - Access terminal output
3. `vscode.workspace.workspaceFolders` - Get project root path
4. `vscode.window.showInformationMessage` - User notification
5. Command registration for keybinding

**Implementation Strategy:**
- Extension maintains a buffer of terminal output
- When user triggers save command, read from buffer
- Process and save to file

## Extension Structure

```
vscode-terminal-saver/
├── package.json           # Extension manifest
├── src/
│   ├── extension.ts       # Main extension code
│   └── ansiStripper.ts    # ANSI code removal utility
├── tsconfig.json          # TypeScript config
└── README.md              # Extension documentation
```

## Implementation Plan

### Phase 1: Extension Scaffold
1. Create extension project structure
2. Set up TypeScript compilation
3. Configure package.json (name, activation events, commands, keybindings)
4. Create basic extension activation

### Phase 2: Terminal Buffer Capture
1. Get active terminal instance
2. Access terminal buffer content
3. Handle terminal data events
4. Store terminal output in memory buffer

### Phase 3: Save Functionality
1. Implement ANSI stripping (reuse Perl regex logic)
2. Generate timestamp filename
3. Write to project root directory
4. Handle file system errors

### Phase 4: User Interface
1. Register save command
2. Bind to Cmd+S when terminal focused
3. Add VS Code notification on success/failure
4. Add status bar indicator (optional)

### Phase 5: Testing & Polish
1. Test with Claude Code CLI sessions
2. Verify ANSI stripping works
3. Test keybinding conflicts
4. Handle edge cases (no workspace, permission errors)

## Success Criteria

- [ ] Extension installs and activates in VS Code
- [ ] Cmd+S in terminal triggers save command
- [ ] Captures full terminal buffer content
- [ ] Output matches WYSIWYG (no ANSI codes)
- [ ] Files saved with timestamp to project root
- [ ] User receives notification on save
- [ ] Works reliably with Claude Code CLI

## Technical Details

### Package.json Configuration

```json
{
  "name": "terminal-transcript-saver",
  "displayName": "Terminal Transcript Saver",
  "description": "Save terminal transcripts with Cmd+S",
  "version": "0.1.0",
  "engines": {
    "vscode": "^1.80.0"
  },
  "activationEvents": [
    "onCommand:terminalTranscriptSaver.save"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "terminalTranscriptSaver.save",
        "title": "Save Terminal Transcript"
      }
    ],
    "keybindings": [
      {
        "command": "terminalTranscriptSaver.save",
        "key": "cmd+s",
        "when": "terminalFocus"
      }
    ]
  }
}
```

### ANSI Stripping

Reuse proven regex from bash script:
```typescript
function stripAnsi(text: string): string {
  return text
    .replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '')
    .replace(/\x1b\][0-9];[^\x07]*\x07/g, '')
    .replace(/\x1b[>=]/g, '')
    .replace(/\r/g, '');
}
```

## Comparison to Script Approach

| Aspect | Script + AppleScript | VS Code Extension |
|--------|---------------------|-------------------|
| Reliability | Low (timing issues) | High (direct API) |
| Setup | Keybinding config | Install extension |
| Maintenance | Bash script edits | TypeScript code |
| Cross-platform | macOS only | All platforms |
| Terminal access | Clipboard automation | Direct buffer API |
| Complexity | Simple script | More code (~200 lines) |

## Development Requirements

- Node.js and npm
- TypeScript
- VS Code Extension API knowledge
- Testing: Run extension in Extension Development Host

## Deployment Options

1. **Local Development**: Install unpacked extension
2. **VSIX Package**: Bundle for manual installation
3. **VS Code Marketplace**: Publish publicly (optional)

## Open Questions

- Should we buffer all terminal output or only capture on-demand?
- How much terminal history to capture (all scrollback vs. visible only)?
- Should extension work without a workspace folder open?

## Next Steps

1. Create extension project structure
2. Implement terminal buffer capture
3. Add save command with ANSI stripping
4. Test with Claude Code CLI
5. Package as VSIX for installation
