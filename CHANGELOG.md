# Changelog

All notable changes to the "Terminal Transcript Saver" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-12-17

### Fixed
- Corrected package.json description (Cmd+S → Cmd+Shift+S)
- Fixed README keybinding documentation
- Removed misleading workspace requirement from README

### Changed
- Changed category from "Other" to "Utilities" for better discoverability
- Added bugs and homepage URLs to package.json
- Optimized package size (excluded development files)
- Moved development scripts to .github/scripts/

## [1.1.0] - 2025-12-17

### Added
- File saving functionality with timestamped filenames
- Configurable save location setting
- Desktop fallback when no workspace is open
- ANSI escape code stripping for clean output
- Cross-platform clipboard reading (macOS, Windows, Linux)

### Changed
- Transcripts now save to files instead of clipboard-only
- Improved error messaging
- Better platform detection for clipboard operations

### Features
- **Keyboard Shortcut**: Cmd+Shift+S (Mac) or Ctrl+Shift+S (Windows/Linux) when terminal is focused
- **File Output**: Saves to timestamped `.txt` files
- **Configurable Location**: Custom save directory via settings
- **Clean Output**: Automatically strips ANSI color codes and escape sequences
- **Smart Fallback**: Saves to workspace root or Desktop if no workspace open
- **Cross-platform Support**: Works on macOS, Linux (with xclip/xsel), and Windows

## [1.0.0] - 2025-12-17

### Added
- Initial release of Terminal Transcript Saver extension
- Save active terminal transcript with Cmd+Shift+S
- Support for VS Code terminal integration
- MIT License

[1.1.1]: https://github.com/kylermjensen/vscode-terminal-saver/releases/tag/v1.1.1
[1.1.0]: https://github.com/kylermjensen/vscode-terminal-saver/releases/tag/v1.1.0
[1.0.0]: https://github.com/kylermjensen/vscode-terminal-saver/releases/tag/v1.0.0
