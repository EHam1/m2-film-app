# Testing Meta Meta Film

## Manual Testing Guide

### Setup

1. **Start the app**
   ```bash
   npm run dev
   ```

2. **Prepare test photos**
   - Gather some JPEG or TIFF photos in a single folder
   - Film scans work best for realistic testing

### Test Cases

#### 1. Import Screen
- [ ] App shows import screen on launch
- [ ] Drag and drop photos loads them correctly
- [ ] Click to select files works
- [ ] Error shown if files from multiple folders selected
- [ ] Error shown if unsupported file types selected
- [ ] Error shown if more than 500 photos selected

#### 2. Photo Selection
- [ ] Click to select/deselect individual photos
- [ ] Shift+click selects range of photos
- [ ] "Select All" button selects all photos
- [ ] Selected count badge shows correct number

#### 3. Metadata Editing
- [ ] Timestamp picker works
- [ ] Location search finds places
- [ ] Location results can be clicked to select
- [ ] Selected location shows coordinates
- [ ] Event/Roll name can be entered
- [ ] Film stock autocomplete shows suggestions
- [ ] Camera autocomplete shows suggestions
- [ ] Backup checkbox toggles correctly

#### 4. First-Time Backup Modal
- [ ] Modal appears on first write attempt
- [ ] "Always Backup" sets default correctly
- [ ] "Never Backup" sets default correctly
- [ ] Choice is remembered for next session

#### 5. Writing Metadata
- [ ] Write button disabled when no photos selected
- [ ] Write button disabled when no metadata entered
- [ ] Progress modal appears during write
- [ ] Progress bar updates correctly
- [ ] Success message appears after completion
- [ ] Backup folder created if enabled
- [ ] Photos viewable in Apple Photos with correct metadata

#### 6. Verify EXIF Data
After writing metadata, verify in Apple Photos or another EXIF reader:
- [ ] Timestamp appears correctly
- [ ] Location appears on map view
- [ ] Title shows event/roll name
- [ ] Keywords include film stock and camera

#### 7. Error Handling
- [ ] Graceful handling of write failures
- [ ] Error messages are clear and helpful
- [ ] App doesn't crash on unexpected errors

#### 8. UI/UX
- [ ] Retro film lab aesthetic is present
- [ ] Buttons and inputs are styled correctly
- [ ] Film borders on thumbnails look good
- [ ] Selected state is clearly visible
- [ ] Layout is responsive to window resizing

### Performance Testing

1. **Load 100+ photos**
   - App should remain responsive
   - Thumbnails should load progressively
   - Selection should feel instant

2. **Write to 50+ photos**
   - Progress should update smoothly
   - No UI freezing
   - Backup copying should complete

### Known Limitations (v1)

- Single folder constraint
- No automatic roll grouping
- Thumbnail generation uses full image (not optimized)
- macOS only

## Automated Testing (Future)

Currently manual testing only. Future versions could include:
- Unit tests for services
- Integration tests for IPC
- E2E tests with Playwright

