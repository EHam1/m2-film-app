# M2 Film

**Metadata Editor for Film Photographers**

M2 Film is a desktop application for bulk editing EXIF metadata on scanned film photos. Add timestamps, GPS locations, film stock info, and camera details to organize your film archive.

![M2 Film Screenshot](https://via.placeholder.com/800x500?text=M2+Film+Screenshot)

## Features

- **Batch Metadata Editing** - Edit hundreds of photos at once
- **GPS Location Search** - Add coordinates by searching place names
- **Film Stock & Camera Tags** - Organize by gear and film type
- **Timestamp Management** - Set correct dates for chronological ordering
- **Automatic Backups** - Originals are always safe
- **Retro Interface** - Beautiful vintage UI celebrating analog photography

## Download

**[Download for macOS](https://github.com/eham1/m2-film-app/releases/latest)**

macOS 10.15 (Catalina) or later required.

Windows support coming soon.

## Quick Start

1. Launch M2 Film
2. Drag photos from a single folder into the app
3. Select photos you want to edit
4. Fill in metadata fields (timestamp, location, film stock, camera)
5. Click "Write Changes"
6. Done! Your photos now have complete metadata

## Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get started quickly
- **[Testing Guide](TESTING.md)** - Manual testing checklist  
- **[Build Instructions](BUILD.md)** - Build from source
- **[Project Summary](PROJECT_SUMMARY.md)** - Architecture overview

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
git clone git@github.com:eham1/m2-film-app.git
cd m2-film-app
npm install
npm run dev
```

### Build

```bash
npm run build          # Build source
npm run package:dmg    # Create DMG
npm run release        # Build for distribution
```

## Architecture

### Tech Stack

- **Electron** - Desktop app framework
- **React 19** - UI framework
- **TypeScript** - Type safety
- **exiftool-vendored** - EXIF metadata handling
- **Vite** - Fast bundler

### Project Structure

```
src/
├── main/          # Electron main process
├── renderer/      # React UI
├── preload/       # IPC bridge
├── license/       # License management (stub)
└── pro/           # Pro features (stub)
```

## Pro Version (Coming Soon)

The free version includes all core features. A Pro version is planned with:

- Advanced batch rename
- Preset management
- Cloud backup integration
- Automatic roll grouping
- Priority support

See `src/license/` and `src/pro/` for architecture details.

## Contributing

This is a personal project, but bug reports and feature requests are welcome!

1. Check [existing issues](https://github.com/eham1/m2-film-app/issues)
2. Open a new issue with details
3. PRs are welcome for bug fixes

## License

ISC License - see LICENSE file

## Credits

Built by [Ethan Ham](https://github.com/eham1)

Uses [exiftool-vendored](https://github.com/photostructure/exiftool-vendored.js) by PhotoStructure

## Support

- **Issues**: [GitHub Issues](https://github.com/eham1/m2-film-app/issues)
- **Website**: Coming soon
- **Email**: Support coming soon

---

Made with ❤️ for film photographers
