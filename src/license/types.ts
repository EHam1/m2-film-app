/**
 * License Management Types
 * 
 * This module defines types for the license key system.
 * When implementing the paywall, expand these types as needed.
 */

export interface LicenseKey {
  key: string
  email: string
  activatedAt?: string
  expiresAt?: string
}

export interface LicenseStatus {
  isValid: boolean
  isPro: boolean
  expiresAt?: string
  error?: string
}

export interface LicenseValidationResult {
  success: boolean
  status?: LicenseStatus
  error?: string
}

// Future: Add more types for license server API, activation flow, etc.

