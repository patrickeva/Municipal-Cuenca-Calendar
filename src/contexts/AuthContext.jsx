import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

const AuthContext = createContext(null);

const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // auto-logout after 30 minutes of inactivity

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(undefined); // undefined = still checking
  const idleTimer           = useRef(null);

  const doLogout = useCallback(() => signOut(auth), []);

  const resetIdleTimer = useCallback(() => {
    if (!auth.currentUser) return;
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(doLogout, IDLE_TIMEOUT_MS);
  }, [doLogout]);

  // Listen for Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        resetIdleTimer();
      } else {
        clearTimeout(idleTimer.current);
      }
    });
    return () => { unsub(); clearTimeout(idleTimer.current); };
  }, [resetIdleTimer]);

  // Track user activity — reset idle timer on any interaction
  useEffect(() => {
    if (!user) return;
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, resetIdleTimer, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, resetIdleTimer));
  }, [user, resetIdleTimer]);

  const login  = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => { clearTimeout(idleTimer.current); return signOut(auth); };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
