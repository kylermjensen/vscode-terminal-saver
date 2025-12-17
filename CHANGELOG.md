# Changelog

All notable changes to the "Terminal Transcript Saver" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-17

### Added
- Initial release of Terminal Transcript Saver extension
- Save active terminal transcript to clipboard with Cmd+Shift+S (Mac)
- Automatic command execution in terminal to capture full transcript
- Support for VS Code terminal integration
- MIT License

### Features
- **Keyboard Shortcut**: Cmd+Shift+S when terminal is focused
- **Clipboard Integration**: Transcript automatically copied to clipboard
- **Terminal Command**: Uses `cat` to capture full terminal buffer content
- **Cross-platform Support**: Works on macOS, Linux, and Windows

[1.0.0]: https://github.com/kylermjensen/vscode-terminal-saver/releases/tag/v1.0.0
