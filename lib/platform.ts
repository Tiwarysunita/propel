export function isCapacitor(): boolean {
  if (typeof window === 'undefined') return false
  return !!(window as unknown as { Capacitor?: { isNative?: boolean } }).Capacitor?.isNative
}
