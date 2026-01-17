import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useProfile } from "./ProfileContext";

type LevelUpEvent = {
  habit_id: string;
  oldLevel: number;
  title: string | null;
  newLevel: number;
};

type LevelContextType = {
  levelUps: LevelUpEvent[];
  clearLevelUps:()=>void
};

const LevelContext = createContext<LevelContextType | null>(null);

export function LevelProvider({ children }: { children: React.ReactNode }) {
  const { profile, hasLoaded } = useProfile();

  const previousLevelsRef = useRef<Map<string, number>>(new Map());
  const initializedRef = useRef<Set<string>>(new Set());
  const [levelUps, setLevelUps] = useState<LevelUpEvent[]>([]);
  const clearLevelUps = () => setLevelUps([]);


  useEffect(() => {
    if (!hasLoaded) return;

    const detected: LevelUpEvent[] = [];

    profile.forEach((habit) => {
      const prev = previousLevelsRef.current.get(habit.habit_id);

      if (!initializedRef.current.has(habit.habit_id)) {
        initializedRef.current.add(habit.habit_id)
        previousLevelsRef.current.set(habit.habit_id,habit.lvl);
        return
      }

      if (prev !== undefined && habit.lvl > prev) {
        detected.push({
          habit_id: habit.habit_id,
          title: habit.title,
          oldLevel: prev,
          newLevel: habit.lvl,
        });
      }

      previousLevelsRef.current.set(habit.habit_id, habit.lvl);
    });

    if (detected.length > 0) {
      setLevelUps(detected);
    }
  }, [profile, hasLoaded]);

  return (
    <LevelContext.Provider value={{ levelUps,clearLevelUps }}>
      {children}
    </LevelContext.Provider>
  );
}

export function useLevel() {
  const ctx = useContext(LevelContext);
  if (!ctx) throw new Error("useLevel must be inside LevelProvider");
  return ctx;
}
