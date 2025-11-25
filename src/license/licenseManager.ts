/**
 * License Manager
 * 
 * Handles license key storage, validation, and Pro feature access.
 * 
 * FUTURE IMPLEMENTATION:
 * - Store license key securely (use electron-store or keytar)
 * - Validate with license server API
 * - Handle offline validation with cached responses
 * - Implement trial period logic
 * - Add license activation/deactivation UI
 */

import type { LicenseKey, LicenseStatus } from './types'

class LicenseManager {
  private licenseKey: LicenseKey | null = null
  
  /**
   * Load license key from secure storage
   * TODO: Implement with electron-store or keytar
   */
  async loadLicense(): Promise<LicenseKey | null> {
    // Stub: Always return null (no Pro license)
    return null
  }
  
  /**
   * Save license key to secure storage
   * TODO: Implement with electron-store or keytar
   */
  async saveLicense(key: LicenseKey): Promise<void> {
    // Stub: Do nothing for now
    console.log('[LicenseManager] saveLicense called (stub)')
  }
  
  /**
   * Check current license status
   * TODO: Call validation service and check expiration
   */
  async getStatus(): Promise<LicenseStatus> {
    // Stub: Always return free tier
    return {
      isValid: true,
      isPro: false
    }
  }
  
  /**
   * Check if Pro features are enabled
   */
  async isProEnabled(): Promise<boolean> {
    const status = await this.getStatus()
    return status.isPro
  }
  
  /**
   * Clear license (for testing or logout)
   */
  async clearLicense(): Promise<void> {
    this.licenseKey = null
    // TODO: Remove from secure storage
  }
}

// Singleton instance
export const licenseManager = new LicenseManager()

