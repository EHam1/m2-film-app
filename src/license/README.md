# License Management System

This directory contains the scaffolding for the license key system and Pro features.

## Current Status

**NOT IMPLEMENTED** - This is stub code only. The app is currently fully free.

## Architecture

### Files

- **types.ts** - TypeScript interfaces for license keys and validation
- **licenseManager.ts** - Central manager for license storage and checking
- **validateKey.ts** - License key validation against a server

### When Implementing

1. **Choose a license key format**
   - Option A: Simple hash-based keys (offline validation)
   - Option B: JWT tokens (requires server validation)
   - Option C: Use a service like Gumroad/Paddle API

2. **Set up secure storage**
   - Use `electron-store` for encrypted storage
   - Or `keytar` for OS-level credential storage

3. **Create license server API**
   - Endpoint for key validation
   - Database for storing issued licenses
   - Consider using Gumroad's API for payments + licensing

4. **Add activation UI**
   - Modal for entering license key
   - Success/error states
   - Link to purchase Pro

5. **Integrate with Pro features**
   - Check `isProEnabled()` before showing Pro features
   - Show upgrade prompts for locked features

## Pro Features (Planned)

Ideas for Pro tier features:
- Batch rename functionality
- Advanced EXIF templates
- Preset management
- Automatic roll grouping
- Cloud backup integration
- Priority support

## Testing

Before implementing:
- Mock license validation in tests
- Test offline mode handling
- Test expired license behavior
- Test invalid key handling

