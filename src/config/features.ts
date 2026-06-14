function flag(envVar: string, defaultValue: boolean): boolean {
  const val = process.env[envVar]
  if (val === undefined) return defaultValue
  return val !== 'false' && val !== '0'
}

export const features = {
  CHAT:        flag('NEXT_PUBLIC_FEATURE_CHAT', true),
  MULTI_AGENT: flag('NEXT_PUBLIC_FEATURE_MULTI_AGENT', true),
  DASHBOARD:   flag('NEXT_PUBLIC_FEATURE_DASHBOARD', true),
  QR_SHARE:    flag('NEXT_PUBLIC_FEATURE_QR_SHARE', true),
} as const

export type FeatureKey = keyof typeof features
