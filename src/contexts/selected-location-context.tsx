// src/contexts/SelectedLocationContext.tsx
import { createContext } from 'react';
import type { Location } from '@/types/location';

interface SelectedLocationContextType {
  selectedLocation: Location | null;
  selectLocation: (location: Location | null) => void;
}

export const SelectedLocationContext = createContext<
  SelectedLocationContextType | undefined
>(undefined);
