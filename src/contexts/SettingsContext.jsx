import { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { municipalInfo as defaults } from '../data/municipalInfo';

const SettingsContext = createContext(null);

const SETTINGS_DOC = doc(db, 'settings', 'municipal');

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaults);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getDoc(SETTINGS_DOC).then((snap) => {
      if (snap.exists()) setSettings({ ...defaults, ...snap.data() });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const saveSettings = async (data) => {
    await setDoc(SETTINGS_DOC, data);
    setSettings(data);
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
