# Building Meta Meta Film

## Development Build

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev
```

## Production Build

```bash
# Build the app (creates optimized output in /out directory)
npm run build

# Preview the production build
npm run preview
```

## Package for macOS

### Create unpacked directory (for testing)
```bash
npm run package
```
This creates an unpacked app in `release/mac/Meta Meta Film.app`

### Create DMG installer
```bash
npm run package:dmg
```
This creates a distributable DMG file in `release/Meta Meta Film-1.0.0.dmg`

## Distribution

### Before First Distribution

1. **Code Signing** (Optional but recommended for public distribution)
   - Obtain an Apple Developer certificate
   - Add to package.json:
   ```json
   "mac": {
     "identity": "Your Developer ID"
   }
   ```

2. **Notarization** (Required for macOS 10.15+)
   - Notarize with Apple after building
   - See: https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/

3. **Create App Icon**
   - Design a 1024x1024 icon
   - Convert to .icns format
   - Place in `build/icon.icns`
   - Uncomment icon lines in package.json

### For Testing (No Code Signing)

The built app can be distributed for testing, but users will need to:
1. Right-click the app and select "Open" (first time only)
2. Click "Open" in the security dialog

## File Structure After Build

```
release/
├── mac/
│   └── Meta Meta Film.app    # Unpacked app
├── Meta Meta Film-1.0.0.dmg  # DMG installer
└── Meta Meta Film-1.0.0-mac.zip  # ZIP archive
```

## Troubleshooting

### Build fails with "Cannot find module"
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### App won't open on macOS
- If unsigned: Right-click → Open (first time only)
- Check Console.app for error messages

### ExifTool not working
- exiftool-vendored should handle this automatically
- The binary is downloaded on first run
- Check `~/Library/Application Support/Meta Meta Film/` for logs

## CI/CD

For automated builds, you can use GitHub Actions:

```yaml
name: Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run package:dmg
      - uses: actions/upload-artifact@v3
        with:
          name: dmg
          path: release/*.dmg
```

## Version Management

Update version before releasing:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

This updates both package.json and creates a git tag.

