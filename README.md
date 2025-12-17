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
1. When you press `Cmd+S` in a terminal, it executes VS Code's "Select All" command
2. Copies the selection to clipboard using VS Code's "Copy Selection" command
3. Reads the content from clipboard
4. Strips ANSI escape codes (colors, formatting)
5. Saves clean text to a timestamped file in your workspace root
6. Clears the selection and shows a notification confirming the save

**Technical approach:** Uses VS Code's built-in terminal commands + clipboard to work around API limitations (VS Code doesn't expose terminal buffer content directly to extensions).

## Requirements

- VS Code 1.80.0 or higher
- A workspace folder must be open to save transcripts

## Known Issues

- Briefly selects all terminal content during save (visual flicker)
- Overwrites clipboard temporarily (your previous clipboard content is lost)

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

- [ ] Preserve clipboard content (restore after save)
- [ ] Configurable save location
- [ ] Custom filename templates
- [ ] Command palette command as alternative to hotkey
- [ ] Option to append to existing file instead of creating new one

## Contributing

This is an experimental project. Feel free to fork, modify, or suggest improvements!

## License

MIT

## Author

Kyle Jensen ([@kylermjensen](https://github.com/kylermjensen))
