# Contributing to M2 Film

Thanks for your interest in contributing to M2 Film!

## Reporting Bugs

1. Check [existing issues](https://github.com/eham1/m2-film-app/issues) first
2. Open a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - macOS version
   - App version
   - Screenshots if relevant

## Feature Requests

Open an issue with:
- Clear description of the feature
- Use case / why it's needed
- How it might work

## Pull Requests

### Before Submitting

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push and open a PR

### Code Style

- Use TypeScript for all new code
- Follow existing code style
- Run `npm run build` to check for errors
- Test in the dev environment: `npm run dev`

### Testing

- Manual testing is required (see TESTING.md)
- Test on multiple macOS versions if possible
- Verify EXIF data writes correctly

## Development Setup

```bash
git clone your-fork
cd m2-film-app
npm install
npm run dev
```

## Adding Pro Features

Pro features are scaffolded but not implemented. To add a Pro feature:

1. Create feature in `src/pro/features/YourFeature.tsx`
2. Add license check:
   ```tsx
   import { useAppContext } from '../../renderer/context/AppContext'
   
   const { isProEnabled } = useAppContext()
   if (!isProEnabled) {
     return <ProFeaturePlaceholder ... />
   }
   ```
3. Export from `src/pro/index.ts`
4. Update pricing on website
5. Document in `src/pro/features/README.md`

## Architecture

- **Main Process** (`src/main/`) - Electron backend, file operations, EXIF handling
- **Renderer Process** (`src/renderer/`) - React UI
- **Preload** (`src/preload/`) - IPC bridge between main and renderer
- **License** (`src/license/`) - License management (stub)
- **Pro** (`src/pro/`) - Pro features (stub)

Key files:
- `src/main/exifToolService.ts` - EXIF read/write
- `src/main/fileService.ts` - File validation, backups
- `src/renderer/App.tsx` - Main UI state
- `src/renderer/components/MetadataPanel.tsx` - Metadata form

## Questions?

Open an issue with your question!

## License

By contributing, you agree your code will be licensed under the ISC License.

