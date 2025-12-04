# Installing M2 Film on macOS

## Installation (3 steps)

### Step 1: Download
Choose either format:
- **DMG** - Traditional macOS installer (113 MB)
- **ZIP** - Direct app file (109 MB)

### Step 2: Install to Applications
- **If DMG:** Open it and drag M2 Film to Applications folder
- **If ZIP:** Unzip and drag M2 Film.app to Applications folder

### Step 3: Remove Quarantine Flag (REQUIRED)
**Important:** M2 Film is not signed with an Apple Developer certificate, so macOS will quarantine it. You MUST run this Terminal command:

```bash
xattr -cr "/Applications/M2 Film.app"
```

**How to do this:**
1. Open **Terminal** (Applications → Utilities → Terminal)
2. Copy and paste the command above
3. Press Enter
4. No output = success!

Now open M2 Film from Applications - it should launch normally.

---

## Why Does macOS Block This App?

M2 Film is currently distributed **unsigned** (no Apple Developer certificate - costs $99/year). 

This means:
- ✅ **The app is safe** - All source code is [available on GitHub](https://github.com/eham1/m2-film-app)
- ⚠️ **macOS Gatekeeper blocks it** - Says it's "damaged" (it's not)
- 🔓 **Easy to bypass** - Just run the `xattr -cr` command once

**Why not just sign it?** Because I'm a bum and $99/year is steep for a free app. If M2 Film gets popular enough, I'll consider it.

---

## Troubleshooting

### "M2 Film is damaged and can't be opened"
This is the default macOS quarantine message for unsigned apps. Run:
```bash
xattr -cr "/Applications/M2 Film.app"
```
Then try opening again.

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

