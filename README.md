# Terminal Transcript Saver

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/kylermjensen/vscode-terminal-saver)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-VS%20Code-007ACC.svg)](https://code.visualstudio.com/)
[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue.svg?logo=visual-studio-code)](https://marketplace.visualstudio.com/)

> A VS Code extension that saves terminal transcripts with a simple hotkey (`Cmd+Shift+S`).

Perfect for preserving CLI output, debugging sessions, build logs, or conversations with AI coding assistants like Claude Code.

![Demo](./demo.gif)
*Press `Cmd+Shift+S` in any terminal to save a clean transcript*

## Features

- **One-key save:** Press `Cmd+Shift+S` (or `Ctrl+Shift+S` on Windows/Linux) to instantly save terminal content
- **Clean output:** Automatic ANSI escape code removal for readable text files
- **Timestamped files:** Saves as `transcript-YYYY-MM-DD-HHMMSS.txt` for easy organization
- **Workspace integration:** Files saved to workspace root directory
- **Desktop notifications:** Visual confirmation when transcript is saved
- **Works with any terminal:** Compatible with bash, zsh, PowerShell, Python REPL, Node.js, etc.

## Installation

### From VS Code Marketplace (Coming Soon)

1. Open VS Code
2. Press `Cmd+Shift+X` (Extensions view)
3. Search for "Terminal Transcript Saver"
4. Click Install

### Development Installation

For testing or contributing:

```bash
# Clone repository
git clone https://github.com/kylermjensen/vscode-terminal-saver.git
cd vscode-terminal-saver

# Install dependencies
npm install

# Open in VS Code
code .

# Press F5 to launch Extension Development Host
```

### Manual Installation from VSIX

```bash
# Package extension
npm install -g @vscode/vsce
vsce package

# Install locally
code --install-extension terminal-transcript-saver-0.1.0.vsix
```

## Usage

### Basic Usage

1. Open a terminal in VS Code (`` Ctrl+` `` or `Terminal → New Terminal`)
2. Run commands, interact with CLI tools, or use AI coding assistants
3. Focus the terminal window
4. Press `Cmd+Shift+S` (macOS) or `Ctrl+Shift+S` (Windows/Linux)
5. Transcript saved to workspace root as `transcript-YYYY-MM-DD-HHMMSS.txt`

### Common Use Cases

**Preserving AI Coding Sessions:**
```bash
# Work with Claude Code CLI
claude-code "implement feature X"

# Save entire conversation
# Press Cmd+Shift+S
# Output: transcript-2025-12-17-143022.txt
```

**Debugging Build Failures:**
```bash
npm run build
# Build fails with errors
# Press Cmd+Shift+S to save error output
```

**Saving Test Output:**
```bash
pytest -v
# Press Cmd+Shift+S to preserve test results
```

### How It Works

The extension uses a clever workaround for VS Code's API limitations:

1. `Cmd+Shift+S` triggers the extension
2. Executes "Terminal: Select All" command
3. Copies selection to clipboard
4. Reads clipboard content
5. Strips ANSI escape codes (colors, cursor movements)
6. Writes clean text to timestamped file
7. Clears selection and shows notification

**Note:** VS Code doesn't expose terminal buffer content directly to extensions, so this clipboard-based approach is necessary.

## Requirements

- **VS Code:** Version 1.80.0 or higher
- **Workspace:** Must have a folder open to save transcripts

### Platform-specific Requirements

**macOS:** No additional requirements (uses built-in `pbpaste`)

**Windows:** No additional requirements (uses PowerShell `Get-Clipboard`)

**Linux:** Requires one of the following clipboard utilities:
- `xclip` (preferred): `sudo apt-get install xclip`
- `xsel` (fallback): `sudo apt-get install xsel`

## Troubleshooting

### "No workspace folder open" error

**Problem:** Extension requires an active workspace to determine save location.

**Solution:** Open a folder in VS Code (`File → Open Folder`) before saving transcripts.

### Clipboard content is overwritten

**Known Issue:** The extension temporarily uses the clipboard during save, which overwrites your previous clipboard content.

**Workaround:** Copy any important clipboard content before saving terminal transcripts.

**Status:** Clipboard preservation is planned for a future release.

### Terminal flickers during save

**Known Issue:** The "Select All" operation briefly highlights all terminal content, causing a visual flicker.

**Explanation:** This is a side effect of the clipboard-based workaround for API limitations.

**Status:** Unavoidable with current VS Code extension API.

### Transcript contains escape codes

**Problem:** Saved file shows raw ANSI codes like `^[[0m` or `^[[31m`.

**Cause:** ANSI stripping may fail for certain terminal types or unusual escape sequences.

**Solution:** Report the issue with a sample transcript at [GitHub Issues](https://github.com/kylermjensen/vscode-terminal-saver/issues).

### Keybinding conflict with "Save" command

**Problem:** `Cmd+Shift+S` may conflict with VS Code's "Save All" or other extensions.

**Solution:** Customize the keybinding in VS Code settings:

1. Open Command Palette (`Cmd+Shift+P`)
2. Search "Preferences: Open Keyboard Shortcuts"
3. Find "Terminal Transcript Saver: Save Transcript"
4. Assign a different keybinding

### Permission errors when saving

**Problem:** "EACCES: permission denied" when saving transcript.

**Cause:** Workspace root directory is not writable.

**Solution:** Check workspace folder permissions or change save location (configurable save paths coming in future release).

## Roadmap

- [ ] Preserve clipboard content (restore after save)
- [ ] Configurable save location
- [ ] Custom filename templates
- [ ] Command palette command as alternative to hotkey
- [ ] Append to existing file option
- [ ] Filter/search saved transcripts
- [ ] Export to Markdown format
- [ ] Multi-terminal support (save specific terminal by ID)

## Contributing

Contributions welcome! This project follows standard GitHub workflow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit with descriptive message (`git commit -m 'Add configurable save location'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Setup

```bash
git clone https://github.com/kylermjensen/vscode-terminal-saver.git
cd vscode-terminal-saver
npm install
code .
# Press F5 to launch Extension Development Host
```

### Project Structure

```
.
├── package.json          # Extension manifest and metadata
├── tsconfig.json         # TypeScript configuration
├── src/
│   └── extension.ts      # Main extension logic
├── README.md             # This file
└── LICENSE               # MIT license
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Author

**Kyle Jensen**
- GitHub: [@kylermjensen](https://github.com/kylermjensen)

## Acknowledgments

Built for preserving AI coding assistant sessions, debugging output, and terminal workflows.

Inspired by the need to save conversations with [Claude Code](https://claude.com/claude-code) and other CLI-based development tools.
