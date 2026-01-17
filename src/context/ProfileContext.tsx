import { createContext, useContext, useState } from "react";
import type { Profile } from "../types/Profile";
import { getProfile } from "../services/ProfileServices";
import { useLoader } from "./LoaderContext";

type ProfileContextType = {
  profile: Profile[];
  hasLoaded: boolean;
  loadProfile: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const {showLoader, hideLoader} = useLoader();

  const loadProfile = async () => {
    showLoader();
    try {
      const res = await getProfile();
      setProfile(res.data);
    } catch (error) {
      console.error("Error Loading Profile", error);
    } finally {
      hideLoader();
      setHasLoaded(true);
    }
  };
  return(
    <ProfileContext.Provider value={{profile,hasLoaded,loadProfile}}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile(){
  const ctx= useContext(ProfileContext)
  if(!ctx) throw new Error("userProfile must be inside ProfileProvider")
    return ctx
}
