# Quick Start Guide

## For Developers

### 1. Clone and Install
```bash
git clone git@github.com:EHam1/meta-meta-film.git
cd meta-meta-film
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will open automatically with hot reload enabled.

### 3. Make Changes
- Edit React components in `src/renderer/components/`
- Edit main process code in `src/main/`
- Changes reload automatically

### 4. Build for Production
```bash
npm run build
npm run package:dmg
```

Find your DMG in the `release/` directory.

---

## For End Users

### Installation
1. Download `Meta Meta Film.dmg`
2. Open the DMG file
3. Drag "Meta Meta Film" to Applications
4. Right-click the app and select "Open" (first time only)
5. Click "Open" in the security dialog

### First Use

1. **Launch the app**
   - You'll see the import screen

2. **Load your photos**
   - Drag photos into the window, OR
   - Click to select files
   - ⚠️ All photos must be from the same folder

3. **Select photos to edit**
   - Click to select individual photos
   - Shift+click to select a range
   - Use "Select All" to select everything

4. **Edit metadata**
   - **Timestamp**: Set the date/time the photo was taken
   - **Location**: Search for a place name
   - **Event/Roll**: Give your roll a name (e.g., "NYC Trip - Roll 1")
   - **Film Stock**: Type or select from presets (e.g., "Portra 400")
   - **Camera**: Type or select from presets (e.g., "Leica M6")

5. **Write changes**
   - Make sure "Backup originals" is checked ✅
   - Click "Write Changes"
   - Wait for the processing to complete
   - Success! Your photos now have metadata

### Tips

- **Backups**: Always enabled by default. Backups are saved in a `meta-meta-film-backups` folder next to your photos.

- **Location**: Search for landmarks, addresses, or cities. The app uses OpenStreetMap to find coordinates.

- **Autocomplete**: Start typing film stock or camera names to see suggestions.

- **Batch Editing**: Select multiple photos and edit them all at once. Perfect for roll-by-roll editing!

- **View in Apple Photos**: After writing metadata, open your photos in Apple Photos. You'll see:
  - Correct dates in timeline
  - Locations on the map
  - Title and keywords in info panel

### Troubleshooting

**Photos won't load**
- Make sure all selected photos are from the same folder
- Only JPEG and TIFF files are supported

**Location search not working**
- Check your internet connection
- OpenStreetMap may be temporarily unavailable
- Try a different search term

**Can't open the app**
- Right-click the app and select "Open"
- Go to System Preferences → Security & Privacy
- Click "Open Anyway"

**Backup folder taking up space**
- Safe to delete old backup folders after verifying metadata writes
- Check `meta-meta-film-backups/` folders in your photo directories

---

## Keyboard Shortcuts

- `Cmd+A` - Select all photos (when in the app)
- `Shift+Click` - Select range of photos

---

## Support

- Issues: https://github.com/EHam1/meta-meta-film/issues
- Documentation: See README.md

---

## What's Next?

After using the app:

1. Open your photos in **Apple Photos** or **Google Photos**
2. They should now appear in the correct chronological order
3. Location-tagged photos will appear on the map
4. Search for your camera or film stock to find specific rolls

Enjoy your organized film archive! 📸

