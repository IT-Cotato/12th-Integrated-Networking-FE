// src/contexts/SelectedLocationContext.tsx
import { createContext } from 'react';
import type { Location } from '@/types/location';

interface SelectedLocationContextType {
  selectedLocation: Location | null;
  selectLocation: (location: Location) => void;
}

export const SelectedLocationContext = createContext<
  SelectedLocationContextType | undefined
>(undefined);

// export function SelectedLocationProvider({ children }: { children: ReactNode }) {
//   const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
//   const selectLocation = (location: Location) => {
//     setSelectedLocation(location);
//   };

//   const value = {
//     selectedLocation,
//     selectLocation,
//   };

//     return (
//         <SelectedLocationContext value={value}>
//          {children}
//         </SelectedLocationContext>
//     )
// }
