# Pro Features

This directory will contain Pro (paid tier) features.

## Planned Pro Features

### 1. Advanced Batch Rename
- Custom filename templates
- Sequential numbering
- Date/time formatting
- Roll-based naming

### 2. Preset Manager
- Save metadata presets
- Quick apply to multiple photos
- Import/export presets
- Shared preset library

### 3. Auto Roll Grouping
- ML-based photo grouping
- Automatic roll detection
- Group metadata editing

### 4. Cloud Backup
- Automatic cloud sync
- Version history
- Cross-device access

## How to Add a Pro Feature

1. Create a new component in this directory
2. Add license check before rendering:
   ```tsx
   import { useAppContext } from '../../renderer/context/AppContext'
   
   const { isProEnabled } = useAppContext()
   if (!isProEnabled) {
     return <ProFeaturePlaceholder 
       featureName="Feature Name"
       description="Feature description"
     />
   }
   ```

3. Export from `/src/pro/index.ts`
4. Add feature flag to PRO_FEATURES object
5. Update pricing page on website

## Feature Gating Pattern

```tsx
// In any component
import { useAppContext } from '../context/AppContext'
import ProFeaturePlaceholder from '../../pro/components/ProFeaturePlaceholder'

function MyComponent() {
  const { isProEnabled } = useAppContext()
  
  if (!isProEnabled) {
    return <ProFeaturePlaceholder 
      featureName="Advanced Feature"
      description="This feature is available in M2 Film Pro"
    />
  }
  
  return <div>Pro feature content</div>
}
```

