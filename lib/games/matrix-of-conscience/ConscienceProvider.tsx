import React, { createContext, useContext, useState } from 'react';

export type FactionKey = 'faith' | 'reason' | 'instinct';

interface ConscienceContextType {
  userLevel: number;
  setUserLevel: React.Dispatch<React.SetStateAction<number>>;
  cosmicLogs: string[];
  sectorControl: Record<number, string>;
  factions: Record<string, { name: string; color: string; special: string }>;
  triggerCosmicEvent: (event: string) => void;
  unlockedSectors: number[];
  unlockSector: (sectorId: number) => void;
  playerPoints: number;
  addPlayerPoints: (points: number) => void;
  spendPlayerPoints: (points: number) => boolean;
}

const ConscienceContext = createContext<ConscienceContextType | undefined>(undefined);

export function ConscienceProvider({ children }: { children: React.ReactNode }) {
  const [userLevel, setUserLevel] = useState(1);
  const [cosmicLogs, setCosmicLogs] = useState<string[]>(['Initialization complete.']);
  const [sectorControl, setSectorControl] = useState<Record<number, string>>({ 1: 'faith' });
  const [unlockedSectors, setUnlockedSectors] = useState<number[]>([1]);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [factions] = useState({
    faith: { name: 'Faith', color: '#ffb347', special: 'Endurance' },
    reason: { name: 'Reason', color: '#84b6f4', special: 'Logic' },
    instinct: { name: 'Instinct', color: '#ff6961', special: 'Action' }
  });

  const triggerCosmicEvent = (event: string) => setCosmicLogs(prev => [...prev, event]);
  const unlockSector = (sectorId: number) => setUnlockedSectors(prev => Array.from(new Set([...prev, sectorId])));
  const addPlayerPoints = (points: number) => setPlayerPoints(prev => prev + points);
  const spendPlayerPoints = (points: number) => {
    if (playerPoints >= points) {
      setPlayerPoints(prev => prev - points);
      return true;
    }
    return false;
  };

  return (
    <ConscienceContext.Provider value={{ userLevel, setUserLevel, cosmicLogs, sectorControl, factions, triggerCosmicEvent, unlockedSectors, unlockSector, playerPoints, addPlayerPoints, spendPlayerPoints }}>
      {children}
    </ConscienceContext.Provider>
  );
}

export function useConscience() {
  const context = useContext(ConscienceContext);
  if (!context) throw new Error('useConscience must be used within ConscienceProvider');
  return context;
}
