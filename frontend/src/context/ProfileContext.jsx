import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

const MOCK_PROFILES = [
  { id: 'p1', name: 'Main', avatarUrl: 'https://ui-avatars.com/api/?name=Main&background=151316&color=F5F5F5', isKids: false },
  { id: 'p2', name: 'Partner', avatarUrl: 'https://ui-avatars.com/api/?name=Partner&background=C41E3A&color=F5F5F5', isKids: false },
  { id: 'p3', name: 'Kids', avatarUrl: 'https://ui-avatars.com/api/?name=Kids&background=4CAF50&color=F5F5F5', isKids: true },
];

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [activeProfile, setActiveProfile] = useState(MOCK_PROFILES[0]);

  useEffect(() => {
    const saved = localStorage.getItem('gc_active_profile');
    if (saved) {
      const p = MOCK_PROFILES.find(x => x.id === saved);
      if (p) setActiveProfile(p);
    }
  }, []);

  const switchProfile = (id) => {
    const p = profiles.find(x => x.id === id);
    if (p) {
      setActiveProfile(p);
      localStorage.setItem('gc_active_profile', id);
    }
  };

  return (
    <ProfileContext.Provider value={{ profiles, activeProfile, switchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
