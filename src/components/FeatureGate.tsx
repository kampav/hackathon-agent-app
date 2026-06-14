import { features, FeatureKey } from '@/config/features'

interface Props {
  feature: FeatureKey
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function FeatureGate({ feature, children, fallback = null }: Props) {
  if (!features[feature]) return <>{fallback}</>
  return <>{children}</>
}
