# Build Assets

This directory contains resources for building and distributing the app.

## Files

- **icon.icns** - App icon (macOS) - TODO: Create 1024x1024 PNG and convert to .icns
- **entitlements.mac.plist** - macOS entitlements for hardened runtime
- **notarize.js** - Apple notarization script (currently a stub)

## Creating an App Icon

1. Design a 1024x1024px PNG icon
2. Use `iconutil` to convert to .icns:

```bash
# Create iconset directory
mkdir icon.iconset

# Generate multiple sizes (or use an automated tool)
sips -z 16 16     icon-1024.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon-1024.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon-1024.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon-1024.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon-1024.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon-1024.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon-1024.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon-1024.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon-1024.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon-1024.png --out icon.iconset/icon_512x512@2x.png

# Convert to icns
iconutil -c icns icon.iconset -o icon.icns
```

Or use online tools like https://cloudconvert.com/png-to-icns

## Code Signing

To sign the app for distribution:

1. Get an Apple Developer account ($99/year)
2. Create a Developer ID Application certificate
3. Set environment variable:
   ```bash
   export APPLE_ID="your@email.com"
   export APPLE_ID_PASSWORD="app-specific-password"
   export APPLE_TEAM_ID="XXXXXXXXXX"
   ```

4. Build with signing:
   ```bash
   npm run release
   ```

## Notarization

Notarization is required for macOS 10.15+ to avoid Gatekeeper warnings.

The `notarize.js` script handles this automatically if credentials are set.

Without notarization, users will need to right-click → Open on first launch.

