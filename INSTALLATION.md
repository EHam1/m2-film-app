# Installing M2 Film on macOS

## Quick Install (2 steps)

### 1. Download
Choose either format:
- **DMG** - Traditional macOS installer (113 MB)
- **ZIP** - Direct app file (109 MB)

### 2. Open the App
**Important:** M2 Film is not yet signed with an Apple Developer certificate, so macOS will block it by default.

#### Method A: Right-Click Method (Easiest)
1. After downloading, locate **M2 Film.app** in your Applications folder or Downloads
2. **Right-click** (or Control+click) on the app
3. Select **"Open"** from the menu
4. Click **"Open"** in the dialog that appears
5. The app will now launch (and future opens will work normally)

#### Method B: Terminal Command (Alternative)
If right-click doesn't work, open Terminal and run:
```bash
xattr -cr "/Applications/M2 Film.app"
```
Then open the app normally.

---

## Why Does macOS Block This App?

M2 Film is currently distributed as **adhoc signed** (no Apple Developer certificate). 

This means:
- ✅ **The app is safe** - All source code is available in this repository
- ⚠️ **macOS Gatekeeper blocks it** - This is normal for unsigned apps
- 🔓 **Easy to bypass** - Just use the right-click method above

In the future, if M2 Film gets an Apple Developer certificate ($99/year), this step won't be necessary.

---

## Troubleshooting

### "M2 Film is damaged and can't be opened"
This usually means the quarantine flag is still set. Run:
```bash
xattr -cr "/Applications/M2 Film.app"
```

### "No application found to open M2 Film"
Make sure you downloaded the correct file for your Mac:
- **Apple Silicon (M1/M2/M3)**: arm64 version ✅
- **Intel Macs**: Not currently supported (coming soon)

### App won't launch at all
1. Check you're running macOS 11 (Big Sur) or later
2. Try deleting the app and re-downloading
3. Make sure you unzipped the file (double-click ZIP files to extract)

### Still having issues?
Open an issue on GitHub with:
- Your macOS version
- The exact error message
- Whether you downloaded DMG or ZIP

---

## System Requirements

- **macOS**: 11.0 (Big Sur) or later
- **Architecture**: Apple Silicon (M1/M2/M3) - arm64
- **Disk Space**: ~300 MB (including temporary files)
- **RAM**: 4 GB minimum

---

## Uninstalling

To remove M2 Film:
1. Drag **M2 Film.app** from Applications to Trash
2. Empty Trash

That's it! M2 Film doesn't install any system-level components.

