// navigation/RootNavigation.ts
import { createRef } from 'react';

// Global navigation reference
export const navigationRef = createRef<any>();

export function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name, params);
}
