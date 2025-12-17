# Terminal Transcript Saver

> **Status:** 🚧 Work in Progress - Experimental VS Code extension

A VS Code extension that saves terminal transcripts with a simple hotkey.

## Features

- Save terminal content with `Cmd+S` (when terminal is focused)
- Automatic ANSI escape code removal (clean, readable text output)
- Timestamped filenames (`transcript-YYYY-MM-DD-HHMMSS.txt`)
- Saves to workspace root directory
- Desktop notifications on save

## Installation

### Development Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Open the folder in VS Code
4. Press `F5` to launch the Extension Development Host
5. Test the extension in the new VS Code window

### From VSIX (Coming Soon)

Package and install the extension:
```bash
npm install -g @vscode/vsce
vsce package
code --install-extension terminal-transcript-saver-0.1.0.vsix
```

## Usage

1. Open a terminal in VS Code (`` Ctrl+` ``)
2. Use the terminal as normal (e.g., run Claude Code CLI)
3. When you want to save the transcript, press `Cmd+S` while focused in the terminal
4. Find your saved transcript in the workspace root: `transcript-YYYY-MM-DD-HHMMSS.txt`

## How It Works

The extension:
1. Listens to all terminal data writes and buffers the content
2. When you press `Cmd+S` in a terminal, it captures the buffered content
3. Strips ANSI escape codes (colors, formatting)
4. Saves clean text to a timestamped file in your workspace root
5. Shows a notification confirming the save

## Requirements

- VS Code 1.80.0 or higher
- A workspace folder must be open to save transcripts

## Known Issues

- Only captures content written after the extension activates
- Terminal buffer is per-session (cleared when terminal closes)

## Development

Built with:
- TypeScript
- VS Code Extension API

### Project Structure

```
.
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript config
├── src/
│   └── extension.ts      # Main extension code
└── README.md
```

## Roadmap

- [ ] Option to save full terminal history (not just buffered content)
- [ ] Configurable save location
- [ ] Custom filename templates
- [ ] Auto-save on session end
- [ ] Command palette command for manual save

## Contributing

This is an experimental project. Feel free to fork, modify, or suggest improvements!

## License

MIT

## Author

Kyle Jensen ([@kylermjensen](https://github.com/kylermjensen))
